import { Controller, Get, ServiceUnavailableException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Controller("health")
export class HealthController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get("live")
  live() {
    return {
      status: "ok",
    };
  }

  @Get("ready")
  async ready() {
    try {
      await this.prismaService.$connect();

      return {
        status: "ok",
        dependencies: {
          database: "ready",
        },
      };
    } catch {
      throw new ServiceUnavailableException({
        status: "error",
        dependencies: {
          database: "unavailable",
        },
      });
    }
  }
}
