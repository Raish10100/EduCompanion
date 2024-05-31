import path from 'path';
import multer from 'multer'   //* reference: https://www.npmjs.com/package/multer

const upload = multer({
    dest: 'uploads/',
    limits: {fileSize: '50MB'},  // 50 mb is max limit of file
    storage: multer.diskStorage({
        destination: 'uploads/',
        filename: (req, file, cb) => {
            cb(null, file.originalname);
        },
    }),
    fileFilter: (req, file, cb) => {
        let ext = path.extname(file.originalname);
        if (
            ext !== ".jpg" &&
            ext !== ".jpeg" &&
            ext !== ".webp" &&
            ext !== ".png" &&
            ext !== ".mp4"
          ) {
            cb(new Error(`Unsupported file type! ${ext}`), false);
            return;
          }

          cb(null, true);
    }
});

export default upload;
