import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    {
      name: "static-files-redirect",
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const staticFiles = {
            "/robots.txt": "public/robots.txt",
            "/sitemap.xml": "public/sitemap.xml",
            "/site.webmanifest": "public/site.webmanifest",
          };
          const requestedPath = req.url?.split("?")[0] ?? "";
          const filePath =
            staticFiles[requestedPath as keyof typeof staticFiles];

          if (filePath) {
            try {
              const content = fs.readFileSync(path.resolve(filePath));
              const contentType =
                {
                  ".txt": "text/plain",
                  ".xml": "application/xml",
                  ".webmanifest": "application/manifest+json",
                }[path.extname(filePath)] ?? "application/octet-stream";

              res.setHeader("Content-Type", contentType);
              res.end(content);
              return;
            } catch (error) {
              console.error(`Error serving ${filePath}:`, error);
            }
          }
          next();
        });
      },
      configurePreviewServer(server) {
        server.middlewares.use((req, res, next) => {
          const staticFiles = {
            "/robots.txt": "public/robots.txt",
            "/sitemap.xml": "public/sitemap.xml",
            "/site.webmanifest": "public/site.webmanifest",
          };
          const requestedPath = req.url?.split("?")[0] ?? "";
          const filePath =
            staticFiles[requestedPath as keyof typeof staticFiles];

          if (filePath) {
            try {
              const content = fs.readFileSync(path.resolve(filePath));
              const contentType =
                {
                  ".txt": "text/plain",
                  ".xml": "application/xml",
                  ".webmanifest": "application/manifest+json",
                }[path.extname(filePath)] ?? "application/octet-stream";

              res.setHeader("Content-Type", contentType);
              res.end(content);
              return;
            } catch (error) {
              console.error(`Error serving ${filePath}:`, error);
            }
          }
          next();
        });
      },
    },
  ],
  base: "/",
  root: process.cwd(),
  publicDir: "public",
  build: {
    outDir: "dist",
    assetsDir: "assets",
  },
});
