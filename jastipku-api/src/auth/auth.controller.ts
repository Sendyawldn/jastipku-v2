import { Body, Controller, Get, Post, Res, UseGuards } from "@nestjs/common";
import type { Response } from "express";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { AuthService } from "./auth.service";
import { clearAuthCookie, setAuthCookie } from "./auth-cookie";
import { CurrentUser } from "./current-user.decorator";
import type { JwtPayload } from "./auth.constants";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from "@nestjs/swagger";

@ApiTags("Authentication")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: "Register a new user" })
  @ApiResponse({ status: 201, description: "User successfully registered." })
  @ApiResponse({ status: 400, description: "Bad Request." })
  @Post("register")
  register(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }

  @ApiOperation({ summary: "Login and receive JWT token in cookie" })
  @ApiResponse({ status: 200, description: "Successfully logged in." })
  @ApiResponse({ status: 401, description: "Invalid credentials." })
  @Post("login")
  async login(@Body() body: LoginDto, @Res({ passthrough: true }) res: Response) {
    const result = await this.authService.login(body);
    setAuthCookie(res, result.accessToken);

    return {
      user: result.user,
    };
  }

  @ApiOperation({ summary: "Logout and clear JWT cookie" })
  @ApiResponse({ status: 200, description: "Successfully logged out." })
  @Post("logout")
  logout(@Res({ passthrough: true }) res: Response) {
    clearAuthCookie(res);

    return {
      loggedOut: true,
    };
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Get current authenticated user's profile" })
  @ApiResponse({ status: 200, description: "Returns the current user payload." })
  @ApiResponse({ status: 401, description: "Unauthorized." })
  @Get("me")
  @UseGuards(JwtAuthGuard)
  me(@CurrentUser() user: JwtPayload) {
    return {
      user,
    };
  }
}
