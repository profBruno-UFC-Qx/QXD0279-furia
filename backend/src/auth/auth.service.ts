import { AuthRepository } from "./auth.repository.ts";

export class AuthService {
  constructor(private authRepository: AuthRepository) {}

  async registerStudent() {}

  async registerTeacher() {}

  async login() {}
}
