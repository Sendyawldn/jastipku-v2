import type { Response } from "express";
import { AUTH_COOKIE_NAME } from "./auth.constants";

const sameSiteValues = ["lax", "strict", "none"] as const;
type SameSiteValue = (typeof sameSiteValues)[number];

export function authCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.AUTH_COOKIE_SECURE === "true",
    sameSite: resolveSameSite(process.env.AUTH_COOKIE_SAME_SITE),
    path: "/",
    maxAge: resolveAccessTokenMaxAgeMs(),
  };
}

export function setAuthCookie(response: Response, token: string) {
  response.cookie(AUTH_COOKIE_NAME, token, authCookieOptions());
}

export function clearAuthCookie(response: Response) {
  response.clearCookie(AUTH_COOKIE_NAME, {
    path: "/",
    sameSite: resolveSameSite(process.env.AUTH_COOKIE_SAME_SITE),
    secure: process.env.AUTH_COOKIE_SECURE === "true",
  });
}

function resolveSameSite(value: string | undefined): SameSiteValue {
  if (sameSiteValues.includes(value as SameSiteValue)) {
    return value as SameSiteValue;
  }

  return "lax";
}

function resolveAccessTokenMaxAgeMs() {
  const configuredSeconds = Number(process.env.JWT_ACCESS_TOKEN_TTL_SECONDS);

  if (Number.isFinite(configuredSeconds) && configuredSeconds > 0) {
    return configuredSeconds * 1000;
  }

  return 15 * 60 * 1000;
}
