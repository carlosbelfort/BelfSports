import type { Request, Response } from "express"
import { prisma } from "../lib/prisma"


class PhotoController {
  async upload(req: Request, res: Response) {    
    const { filename } = req.body

    const photo = await prisma.photo.create({
      data: { filename },
    })
    return res.status(201).json(photo)
  }

  async listApproved(req: Request, res: Response) {
    const photos = await prisma.photo.findMany({
      where: { approved: true },
    })

    return res.json(photos)
  }
  
}

export default new PhotoController()