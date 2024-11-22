// index.ts
import { Elysia } from "elysia";
import { userController } from "./controllers/user.controller";
import { authController } from "./controllers/auth.controller";
import { authMiddleware } from "./middleware/auth.middleware";
import { swagger } from "@elysiajs/swagger";

const app = new Elysia()
  .use(swagger({ path: "/swagger" }))
  .use(authController)
  .use(authMiddleware)
  .use(userController)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
