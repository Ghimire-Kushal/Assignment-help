const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { Readable } = require("stream");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const ALLOWED_MIMES = [
  "image/jpeg", "image/png", "image/gif", "image/webp",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/zip",
];

/**
 * Custom multer StorageEngine that streams files to Cloudinary (SDK v2).
 * Falls back to disk storage when credentials are missing.
 */
class CloudinaryStreamStorage {
  _handleFile(req, file, cb) {
    const folder = `edunexus/${req.user?.id ?? "anonymous"}`;
    const isImage = file.mimetype.startsWith("image/");

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: isImage ? "image" : "raw",
        ...(isImage && { transformation: [{ quality: "auto", fetch_format: "auto" }] }),
      },
      (error, result) => {
        if (error || !result) return cb(error ?? new Error("Cloudinary upload failed."));
        cb(null, {
          fieldname: file.fieldname,
          originalname: file.originalname,
          mimetype: file.mimetype,
          path: result.secure_url,       // multer-compatible: accessible as file.path
          secure_url: result.secure_url,
          filename: result.public_id,    // multer-compatible: accessible as file.filename
          public_id: result.public_id,
          size: result.bytes,
        });
      }
    );

    const readable = new Readable();
    readable._read = () => {};

    file.stream.on("data", (chunk) => readable.push(chunk));
    file.stream.on("end", () => readable.push(null));
    file.stream.on("error", (err) => cb(err));

    readable.pipe(uploadStream);
  }

  _removeFile(req, file, cb) {
    if (file.public_id) {
      cloudinary.uploader.destroy(file.public_id).then(() => cb()).catch(cb);
    } else {
      cb();
    }
  }
}

const diskFallback = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${unique}-${file.originalname}`);
  },
});

function hasCloudinaryCredentials() {
  return !!(
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
  );
}

function buildUpload(opts = {}) {
  return multer({
    storage: hasCloudinaryCredentials() ? new CloudinaryStreamStorage() : diskFallback,
    limits: { fileSize: (opts.maxSizeMB ?? 20) * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
      const allowed = opts.mimes ?? ALLOWED_MIMES;
      if (allowed.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error(`File type ${file.mimetype} is not allowed.`));
      }
    },
  });
}

const upload = buildUpload();

module.exports = { cloudinary, upload, buildUpload };
