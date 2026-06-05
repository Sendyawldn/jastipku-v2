import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import type { Request } from "express";
import { AUTH_COOKIE_NAME, JWT_ALGORITHM, JwtPayload } from "./auth.constants";

type RequestWithCookies = Request & {
  cookies?: Record<string, string | undefined>;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    const secret = configService.get<string>("JWT_ACCESS_TOKEN_SECRET");

    if (!secret) {
      throw new Error("Missing required configuration: JWT_ACCESS_TOKEN_SECRET");
    }

    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: RequestWithCookies) =>
          request.cookies?.[AUTH_COOKIE_NAME] ?? null,
      ]),
      secretOrKey: secret,
      algorithms: [JWT_ALGORITHM],
    });
  }

  validate(payload: JwtPayload) {
    return payload;
  }
}
