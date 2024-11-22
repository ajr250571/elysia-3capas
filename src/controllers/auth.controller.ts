// controllers/auth.controller.ts
import { Elysia } from "elysia";
import { AuthService } from "../services/auth.service";
import { LoginSchema, RegisterSchema } from "../schemas/user.schema";

export const authController = (app: Elysia) => {
  const authService = new AuthService();

  return app.group("/auth", (app) =>
    app
      .post("/register", async ({ body }) => authService.register(body), {
        body: RegisterSchema,
      })
      .post("/login", async ({ body }) => authService.login(body), {
        body: LoginSchema,
      })
  );
};
