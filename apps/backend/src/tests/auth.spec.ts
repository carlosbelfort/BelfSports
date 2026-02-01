import { describe, it, expect } from "vitest";
import { app } from "../server";

describe("Auth", () => {
  it("deve logar como ADMIN", async () => {
    const res = await app.inject({
      method: "POST",
      url: "/auth/login",
      payload: {
        email: "admin@belfsports.com",
        password: "123456",
      },
    });

    const body = JSON.parse(res.body);

    expect(res.statusCode).toBe(200);
    expect(body.token).toBeDefined();
  });

  it("deve logar como ORGANIZER", async () => {
    const res = await app.inject({
      method: "POST",
      url: "/auth/login",
      payload: {
        email: "org@belfsports.com",
        password: "123456",
      },
    });

    const body = JSON.parse(res.body);

    expect(res.statusCode).toBe(200);
    expect(body.token).toBeDefined();
  });

  it("deve retornar 401 para credenciais inválidas", async () => {
    const res = await app.inject({
      method: "POST",
      url: "/auth/login",
      payload: {
        email: "admin@belfsports.com",
        password: "errada",
      },
    });

    expect(res.statusCode).toBe(401);
  });
});

