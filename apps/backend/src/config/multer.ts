import multer from "fastify-multer";
import fs from "fs";
import path from "path";

// Define a pasta de upload relativa ao diretório do backend
const uploadDir = path.resolve("uploads");

// Cria a pasta se não existir
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

export const upload = multer({
  dest: uploadDir,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});