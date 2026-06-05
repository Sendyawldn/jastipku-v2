import type { UserRole } from "../prisma/prisma-client";

export const AUTH_COOKIE_NAME = "jastipku_access_token";

export const JWT_ALGORITHM = "HS256";

export type JwtPayload = {
  sub: number;
  email: string;
  role: UserRole;
};
