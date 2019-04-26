import multer from 'multer'
import crypto from 'crypto'
import path from 'path'


let storage = multer.diskStorage({
  destination: `${__dirname}/uploads`,
  filename: (_req, _file, cb) => {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      if (err) return cb(err, '');
      cb(null, raw.toString('hex') + path.extname(_file.originalname))
    })
  }
})

export const uploads = multer({ storage: storage })
