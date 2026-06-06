import { Module } from "@nestjs/common";
import { BullModule } from "@nestjs/bull";
import { NotificationsService } from "./notifications.service";
import { EmailProcessor } from "./email.processor";

@Module({
  imports: [
    BullModule.registerQueue({
      name: "email",
    }),
  ],
  providers: [NotificationsService, EmailProcessor],
  exports: [NotificationsService],
})
export class NotificationsModule {}
