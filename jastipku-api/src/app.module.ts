import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { HealthController } from "./health/health.controller";
import { PrismaModule } from "./prisma/prisma.module";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { TripsModule } from "./trips/trips.module";
import { OrdersModule } from "./orders/orders.module";

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule, UsersModule, AuthModule, TripsModule, OrdersModule],
  controllers: [AppController, HealthController],
  providers: [AppService],
})
export class AppModule {}
