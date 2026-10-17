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
  constructor(message = "Resource not found", details?: any) {
    super(404, message, details);
  }
}

export class BadRequestError extends AppError {
  constructor(message = "Bad request", details?: any) {
    super(400, message, details);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized", details?: any) {
    super(401, message, details);
  }
}
