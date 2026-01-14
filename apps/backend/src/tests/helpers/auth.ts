import request from "supertest";
import { app } from "../../server";

export async function loginAs(email: string, password = "123456") {
  const response = await request(app.server)
    .post("/auth/login")
    .send({ email, password });

  return response.body.token;
}