// controllers/user.controller.ts
import { Elysia, t } from "elysia";
import { UserService } from "../services/user.service";

export const userController = (app: Elysia) => {
  const userService = new UserService();

  return app.group("/users", (app) =>
    app
      .get("/", () => userService.getAllUsers())
      .get(
        "/:id",
        ({ params: { id } }) => userService.getUserById(Number(id)),
        { params: t.Object({ id: t.Numeric() }) }
      )
  );
};
