import { describe, it, expect, beforeAll } from "vitest";
import { app } from "../server";

//Usei app.inject para testar as rotas de eventos porque ele evita dependência de rede,
// multipart e torna os testes mais determinísticos no Fastify.

describe("Events - Fluxo principal", () => {
  let adminToken: string;
  let organizerToken: string;

  beforeAll(async () => {
    await app.ready();

    // Login ADMIN
    const adminLogin = await app.inject({
      method: "POST",
      url: "/auth/login",
      payload: {
        email: "admin@belfsports.com",
        password: "123456",
      },
    });

    adminToken = JSON.parse(adminLogin.body).token;

    // Login ORGANIZER
    const organizerLogin = await app.inject({
      method: "POST",
      url: "/auth/login",
      payload: {
        email: "org@belfsports.com",
        password: "123456",
      },
    });

    organizerToken = JSON.parse(organizerLogin.body).token;
  });

  it("ORGANIZER pode criar evento", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/events",
      headers: {
        authorization: `Bearer ${organizerToken}`,
      },
      payload: {
        title: "Evento Teste",
        location: "São Paulo",
        date: new Date().toISOString(),
      },
    });

    expect(response.statusCode).toBe(201);
  });

  it("ADMIN pode listar eventos aprovados", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/events",
      headers: {
        authorization: `Bearer ${adminToken}`,
      },
    });

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(JSON.parse(response.body))).toBe(true);
  });

  it("Usuário não autenticado recebe 401", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/events",
    });

    expect(response.statusCode).toBe(401);
  });
});
