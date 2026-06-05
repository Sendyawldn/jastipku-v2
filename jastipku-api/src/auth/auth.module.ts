import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JWT_ALGORITHM } from "./auth.constants";
import { JwtStrategy } from "./jwt.strategy";
import { RolesGuard } from "./roles.guard";
import { UsersModule } from "../users/users.module";

@Module({
  imports: [
    ConfigModule,
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const secret = configService.get<string>("JWT_ACCESS_TOKEN_SECRET");

        if (!secret) {
          throw new Error(
            "Missing required configuration: JWT_ACCESS_TOKEN_SECRET",
          );
        }

        return {
          secret,
          signOptions: {
            algorithm: JWT_ALGORITHM,
            expiresIn: Number(
              configService.get<string>("JWT_ACCESS_TOKEN_TTL_SECONDS") ??
                "900",
            ),
          },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, RolesGuard],
  exports: [JwtModule, PassportModule, JwtStrategy, RolesGuard],
})
export class AuthModule {}
