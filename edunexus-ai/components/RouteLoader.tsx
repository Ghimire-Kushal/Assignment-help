"use client";
import { useEffect, useState, useCallback } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

function RouteLoaderInner() {
  const pathname      = usePathname();
  const searchParams  = useSearchParams();
  const [loading, setLoading] = useState(false);

  const show = useCallback(() => { setLoading(true);  }, []);
  const hide = useCallback(() => { setLoading(false); }, []);

  useEffect(() => {
    show();
    const t = setTimeout(hide, 350);
    return () => clearTimeout(t);
  }, [pathname, searchParams, show, hide]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="route-loader"
          initial={{ scaleX: 0, opacity: 1 }}
          animate={{ scaleX: 0.85 }}
          exit={{ scaleX: 1, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          style={{ originX: 0 }}
          className="fixed top-0 left-0 right-0 z-[9999] h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-400"
        />
      )}
    </AnimatePresence>
  );
}

export function RouteLoader() {
  return (
    <RouteLoaderInner />
  );
}
