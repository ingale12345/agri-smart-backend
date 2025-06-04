import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as fs from 'fs';
import * as path from 'path';

export function UploadFile(fieldName: string, folderName: string) {
  // const uploadPath = path.join(__dirname, 'uploads', folderName);
  const uploadPath = path.join(process.cwd(), 'uploads', folderName);

  // Ensure the folder exists
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }

  return applyDecorators(
    UseInterceptors(
      FileInterceptor(fieldName, {
        storage: diskStorage({
          destination: (_req, _file, cb) => {
            cb(null, uploadPath);
          },
          filename: (_req, file, cb) => {
            const ext = path.extname(file.originalname);
            const name = path
              .basename(file.originalname, ext)
              .replace(/\s+/g, '-');
            const uniqueSuffix = Date.now();
            cb(null, `${uniqueSuffix}-${name}${ext}`);
          },
        }),
      }),
    ),
  );
}
