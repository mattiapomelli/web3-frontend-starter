export class ValidationError extends Error {
  data: Record<string, string>;

  constructor(data: Record<string, string>) {
    super();
    this.name = "ValidationError";
    this.data = data;
  }
}

export class ForbiddenError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ForbiddenError";
    this.message = message;
  }
}

export class UnauthorizedError extends Error {
  constructor() {
    super();
    this.name = "UnauthorizedError";
  }
}
