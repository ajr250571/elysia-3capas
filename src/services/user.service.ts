// services/user.service.ts
import { User } from "@prisma/client";
import { UserRepository } from "../repositories/user.repository";

export class UserService {
  private repository: UserRepository;

  constructor() {
    this.repository = new UserRepository();
  }

  getAllUsers() {
    return this.repository.findAll();
  }

  getUserById(id: number) {
    const user = this.repository.findById(id);
    if (!user) {
      throw new Error("Usuario no encontrado");
    }
    return user;
  }
}
