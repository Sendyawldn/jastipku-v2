import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getRoot() {
    return {
      name: "Jastipku API",
      status: "bootstrapped",
    };
  }
}
