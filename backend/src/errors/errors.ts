export class AppError {
  status: number;
  message: string;
  details?: any;

  constructor(status: number, message: string, details?: any) {
    this.status = status;
    this.message = message;
    this.details = details;
  }
}

export class NotFoundError extends AppError {
  constructor(
    msg: string = "Sem autorizacao para acessar recurso",
    details?: any,
  ) {
    super(404, msg, details);
  }
}

export class BadRequestError extends AppError {
  constructor(msg: string = "Dados mal formatados", details?: any) {
    super(400, msg, details);
  }
}

export class UnauthorizedError extends AppError {
  constructor(
    msg: string = "Sem autorizacao para acessar recurso",
    details?: any,
  ) {
    super(401, msg, details);
  }
}

export class Conflict extends AppError {
  constructor(msg: string = "Dados ja cadastrados no sistema", details?: any) {
    super(409, msg, details);
  }
}
