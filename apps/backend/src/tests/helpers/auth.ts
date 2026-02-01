import { app } from "../../server";

export async function loginAs(email: string, password = "123456") {
  const response = await app.inject({
    method: "POST",
    url: "/auth/login",
    payload: { email, password },
  });

  return JSON.parse(response.body).token;
}
