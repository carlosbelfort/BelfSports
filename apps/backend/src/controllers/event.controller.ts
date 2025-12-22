import { Request, Response } from "express"
import prisma from "../lib/prisma"

class EventController {
  async list(req: Request, res: Response) {
    const events = await prisma.event.findMany()
    return res.json(events)
  }

  async create(req: Request, res: Response) {
    const { title, description, date } = req.body

    const event = await prisma.event.create({
      data: { title, description, date: new Date(date) },
    })

    return res.status(201).json(event)
  }
}

export default new EventController()