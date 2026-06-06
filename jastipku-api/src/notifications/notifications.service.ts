import { Injectable, Logger } from "@nestjs/common";
import { InjectQueue } from "@nestjs/bull";
import { Queue } from "bull";

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);

  constructor(@InjectQueue("email") private readonly emailQueue: Queue) {}

  async sendEmail(to: string, subject: string, body: string) {
    this.logger.log(`Queueing email to ${to}`);
    await this.emailQueue.add("send", { to, subject, body }, { attempts: 3 });
  }
}
