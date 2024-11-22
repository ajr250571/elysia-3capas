// middleware/auth.middleware.ts
import { Elysia } from "elysia";
import { AuthService } from "../services/auth.service";

export const authMiddleware = (app: Elysia) => {
  const authService = new AuthService();

  return app.derive(async ({ headers }) => {
    const token = headers.authorization?.replace("Bearer ", "");

    if (!token) {
      throw new Error("Token no proporcionado");
    }

    const decoded = authService.verifyToken(token);
    return { user: decoded };
  });
};
