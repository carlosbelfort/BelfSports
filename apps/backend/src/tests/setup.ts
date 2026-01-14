import { execSync } from "child_process";
import { app } from "../server";

beforeAll(() => {
  process.env.NODE_ENV = "test";

  execSync("npx prisma db push", { stdio: "ignore" });
  execSync("npx prisma db seed", { stdio: "ignore" });
});

afterAll(async () => {
  await app.close();
});
