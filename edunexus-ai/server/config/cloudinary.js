const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const isImage = file.mimetype.startsWith("image/");
    return {
      folder: `edunexus/${req.user?.id ?? "anonymous"}`,
      resource_type: isImage ? "image" : "raw",
      allowed_formats: ["jpg", "jpeg", "png", "gif", "webp", "pdf", "doc", "docx", "ppt", "pptx", "xls", "xlsx", "zip"],
      transformation: isImage ? [{ quality: "auto", fetch_format: "auto" }] : undefined,
    };
  },
});

const localDiskFallback = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${unique}-${file.originalname}`);
  },
});

function buildUpload(opts = {}) {
  const useCloud =
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET;

  return multer({
    storage: useCloud ? storage : localDiskFallback,
    limits: { fileSize: opts.maxSizeMB ? opts.maxSizeMB * 1024 * 1024 : 20 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
      const allowed = opts.mimes ?? [
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
