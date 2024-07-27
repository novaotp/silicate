import multer, { diskStorage } from 'multer';

/** @deprecated Use {@link taskStorage} instead. */
const storage = diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/tasks');
    },
    filename: (req, file, cb) => {
        file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8');
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const taskStorage = storage;
/** @deprecated Use {@link taskUpload} instead. */
export const upload = multer({ storage: taskStorage });
export const taskUpload = upload;

const avatarStorage = diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/avatars');
    },
    filename: (req, file, cb) => {
        file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8');
        cb(null, Date.now() + '-' + file.originalname);
    }
});
export const avatarUpload = multer({ storage: avatarStorage });
