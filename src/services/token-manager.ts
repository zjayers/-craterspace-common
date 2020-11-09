import { Document } from "mongoose";
import jsonwebtoken from "jsonwebtoken";

// An interface that describes the properties that a User Document has
export interface IUserDoc extends Document {
  id?: string;
  email: string;
  password: string;
}

export interface IUserPayload {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: IUserPayload;
    }
  }
}

export class TokenManager {
  public static SignToken = (user: IUserDoc): { jwt: string } => {
    // Generate JSON Web Token
    const { JWT_SECRET } = process.env;

    return {
      jwt: jsonwebtoken.sign(
        {
          id: user.id,
          email: user.email,
        },
        JWT_SECRET!
      ),
    };
  };

  public static VerifyToken = (token: string): IUserPayload => {
    const { JWT_SECRET } = process.env;
    return jsonwebtoken.verify(token, JWT_SECRET!) as IUserPayload;
  };
}
