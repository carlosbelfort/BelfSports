import request from "supertest";
import { app } from "../server";

describe("Auth", () => {
  it("deve logar como ADMIN", async () => {
    const res = await request(app.server).post("/auth/login").send({
      email: "admin@belfsports.com",
      password: "123456",
    });

    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  it("deve retornar 401 para credenciais inválidas", async () => {
    const res = await request(app.server).post("/auth/login").send({
      email: "admin@belfsports.com",
      password: "errada",
    });

    expect(res.status).toBe(401);
  });
});

beforeAll(async () => {
  await app.ready();
});
