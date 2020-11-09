import jsonwebtoken from "jsonwebtoken";
import mongoose from "mongoose";

// An interface that describes the properties that a User Document has
export interface ISignUpPayload {
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
  public static SignToken = (user: ISignUpPayload): { jwt: string } => {
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

  public static SpoofToken = (): [string] => {
    // Build a JWT Payload {id, email, password}
    const payload = {
      id: new mongoose.Types.ObjectId().toHexString(),
      email: "test@test.com",
      password: "abcd1234",
    };

    // Create the JWT
    const session = TokenManager.SignToken(payload);

    // Turn the session into JSON
    const sessionJSON = JSON.stringify(session);

    // Take the JSON and encode it as base64
    const base64Session = Buffer.from(sessionJSON).toString("base64");

    // Return the cookie with the encoded data as a string
    // Supertest prefers the strings to be in an array
    return [`express:sess=${base64Session}`];
  };

  public static VerifyToken = (token: string): IUserPayload => {
    const { JWT_SECRET } = process.env;
    return jsonwebtoken.verify(token, JWT_SECRET!) as IUserPayload;
  };
}
