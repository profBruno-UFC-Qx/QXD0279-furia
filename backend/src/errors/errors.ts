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
  constructor(details?: any) {
    super(404, "Resource not found", details);
  }
}

export class BadRequestError extends AppError {
  constructor(details?: any) {
    super(400, "Bad request", details);
  }
}

export class UnauthorizedError extends AppError {
  constructor(details?: any) {
    super(401, "Unauthorized", details);
  }
}

export class Conflict extends AppError {
  constructor(details?: any) {
    super(409, "Entity already exists", details);
  }
}
