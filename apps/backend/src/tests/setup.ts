import { execSync } from "child_process";
import { beforeAll, afterAll } from "vitest";
import { app } from "../server";

beforeAll(async () => {
  process.env.NODE_ENV = "test";

  execSync("npx prisma db push", { stdio: "inherit" });
  execSync("npx prisma db seed", { stdio: "inherit" });

  await app.ready();
}, 30000);
