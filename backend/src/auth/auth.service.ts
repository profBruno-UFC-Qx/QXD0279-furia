import { AuthRepository } from "./auth.repository.ts";

export class AuthService {
  constructor(private authRepository: AuthRepository) {}

  async register() {}

  async login() {}
}
