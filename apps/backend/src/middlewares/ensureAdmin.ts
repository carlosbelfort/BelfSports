import type { Request, Response, NextFunction } from "express";

export function ensureAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.user.role !== "ADMIN") {
    return res.status(403).json({ message: "Acesso negado" });
  }

  return next();
}