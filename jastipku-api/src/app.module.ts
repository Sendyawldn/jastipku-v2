import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { BullModule } from "@nestjs/bull";
import { CacheModule } from "@nestjs/cache-manager";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { HealthController } from "./health/health.controller";
import { PrismaModule } from "./prisma/prisma.module";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { TripsModule } from "./trips/trips.module";
import { OrdersModule } from "./orders/orders.module";
import { WithdrawalsModule } from "./withdrawals/withdrawals.module";
import { ReviewsModule } from "./reviews/reviews.module";
import { PaymentsModule } from "./payments/payments.module";
import { LogisticsModule } from "./logistics/logistics.module";
import { ChatModule } from "./chat/chat.module";
import { NotificationsModule } from "./notifications/notifications.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    BullModule.forRoot({
      redis: {
        host: "localhost", // Assuming docker-compose redis is mapped to localhost during dev
        port: 6379,
      },
    }),
    CacheModule.register({ isGlobal: true }),
    PrismaModule,
    UsersModule,
    AuthModule,
    TripsModule,
    OrdersModule,
    WithdrawalsModule,
    ReviewsModule,
    PaymentsModule,
    LogisticsModule,
    ChatModule,
    NotificationsModule,
  ],
  controllers: [AppController, HealthController],
  providers: [AppService],
})
export class AppModule {}
