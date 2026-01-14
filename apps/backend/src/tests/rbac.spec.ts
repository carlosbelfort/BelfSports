import request from "supertest";
import { app } from "../server";
import { loginAs } from "./helpers/auth";

describe("RBAC - Controle de acesso", () => {
  let userToken: string;

  beforeAll(async () => {
    await app.ready();
    userToken = await loginAs("user@belfsports.com");
  });

  it("USER não deve criar evento", async () => {
    const response = await request(app.server)
      .post("/events")
      .set("Authorization", `Bearer ${userToken}`)
      .send({
        title: "Evento proibido",
        date: "2026-01-01",
        location: "Local X",
      });

    expect(response.status).toBe(403);
  });
});