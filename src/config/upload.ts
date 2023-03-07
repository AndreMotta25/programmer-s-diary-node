import crypto from 'crypto';
import { Request } from 'express';
import multer from 'multer';

export const upload = (file: string) => {
  return {
    storage: multer.diskStorage({
      destination: file,
      filename: (req, file, callback) => {
        const hex = crypto.randomBytes(16).toString('hex');
        callback(null, `${hex}-${file.originalname}`);
      },
    }),
  };
};

export const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  if (
    !file.originalname.endsWith('.jpg') &&
    !file.originalname.endsWith('.png')
  ) {
    return cb(null, false);
  }
  return cb(null, true);
};
