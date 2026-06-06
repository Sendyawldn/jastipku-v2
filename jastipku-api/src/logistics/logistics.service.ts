import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class LogisticsService {
  private readonly logger = new Logger(LogisticsService.name);

  async calculateShippingCost(originCity: string, destinationCity: string, weight: number) {
    this.logger.log(`Mock calculating shipping from ${originCity} to ${destinationCity} for weight ${weight}g`);
    
    // Mock fixed cost logic
    // In reality, this would make an HTTP request to RajaOngkir API
    return {
      origin: originCity,
      destination: destinationCity,
      weight,
      results: [
        {
          code: "jne",
          name: "Jalur Nugraha Ekakurir (JNE)",
          costs: [
            {
              service: "REG",
              description: "Layanan Reguler",
              cost: [
                {
                  value: 15000,
                  etd: "2-3",
                  note: "",
                },
              ],
            },
          ],
        },
      ],
    };
  }
}
