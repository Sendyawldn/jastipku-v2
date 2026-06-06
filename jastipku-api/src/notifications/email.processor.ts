import { Process, Processor } from "@nestjs/bull";
import { Logger } from "@nestjs/common";
import { Job } from "bull";
import * as nodemailer from "nodemailer";

@Processor("email")
export class EmailProcessor {
  private readonly logger = new Logger(EmailProcessor.name);
  private transporter: nodemailer.Transporter;

  constructor() {
    // Mock Ethereal Email transport
    this.transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: "test@ethereal.email",
        pass: "mockpassword",
      },
    });
  }

  @Process("send")
  async handleSend(job: Job<{ to: string; subject: string; body: string }>) {
    this.logger.log(`Processing email job for ${job.data.to}`);
    try {
      const info = await this.transporter.sendMail({
        from: '"Jastipku Platform" <noreply@jastipku.com>',
        to: job.data.to,
        subject: job.data.subject,
        text: job.data.body,
      });
      this.logger.log(`Email sent: ${info.messageId}`);
    } catch (error) {
      this.logger.error(`Failed to send email to ${job.data.to}`, error);
      throw error;
    }
  }
}
