export abstract class CustomError extends Error {
  public abstract statusCode: number;

  protected constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  public abstract serializeErrors(): { message: string; field?: string }[];
}
