import multer from 'multer'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import { cloudinary } from './cloudinary'

export const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'spots',
    allowed_formats: ['jpg', 'png', 'jpeg'],
  },
})

export const upload = multer({ storage })