// services/auth.service.ts
import * as jwt from "jsonwebtoken";
import { UserRepository } from "../repositories/user.repository";
import { comparePassword, hashPassword } from "../utils/password";

export class AuthService {
  private userRepository: UserRepository;
  private JWT_SECRET = process.env.JWT_SECRET || "default_secret";

  constructor() {
    this.userRepository = new UserRepository();
  }

  async register(userData: { name: string; email: string; password: string }) {
    const existingUser = await this.userRepository.findByEmail(userData.email);

    if (existingUser) {
      throw new Error("El usuario ya existe");
    }

    const hashedPassword = await hashPassword(userData.password);
    const user = await this.userRepository.create({
      ...userData,
      password: hashedPassword,
    });

    return this.generateToken(user);
  }

  async login(credentials: { email: string; password: string }) {
    const user = await this.userRepository.findByEmail(credentials.email);

    if (!user) {
      throw new Error("Credenciales inválidas");
    }

    const isPasswordValid = await comparePassword(
      credentials.password,
      user.password
    );

    if (!isPasswordValid) {
      throw new Error("Credenciales inválidas");
    }

    return this.generateToken(user);
  }

  private generateToken(user: { id: number; email: string }) {
    return jwt.sign({ id: user.id, email: user.email }, this.JWT_SECRET, {
      expiresIn: "1h",
    });
  }

  verifyToken(token: string) {
    try {
      return jwt.verify(token, this.JWT_SECRET);
    } catch (error) {
      throw new Error("Token inválido");
    }
  }
}
