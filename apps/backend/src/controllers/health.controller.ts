import type { Request, Response } from "express"

class HealthController {
  check(req: Request, res: Response) {
    return res.json({ status: "ok" })
  }
}

export default new HealthController()