import { t } from "elysia";

export const UserSchema = t.Object({
  id: t.Number(),
  name: t.String(),
  email: t.String(),
});

export const LoginSchema = t.Object({
  email: t.String({
    format: "email",
    description: "Email del usuario",
  }),
  password: t.String({
    minLength: 6,
    description: "Contraseña del usuario",
  }),
});

export const RegisterSchema = t.Object({
  name: t.String({
    description: "Nombre del usuario",
  }),
  email: t.String({
    format: "email",
    description: "Email del usuario",
  }),
  password: t.String({
    minLength: 6,
    description: "Contraseña del usuario",
  }),
});
