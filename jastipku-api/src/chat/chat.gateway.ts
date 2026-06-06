import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { PrismaService } from "../prisma/prisma.service";

@WebSocketGateway({ cors: { origin: "*" } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server!: Server;

  constructor(private readonly prisma: PrismaService) {}

  handleConnection(client: Socket) {
    // In real app, extract user from JWT token here and associate with client.id
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage("joinOrderRoom")
  async handleJoinRoom(
    @MessageBody() orderId: number,
    @ConnectedSocket() client: Socket,
  ) {
    client.join(`order_${orderId}`);
    
    // Fetch previous messages
    const messages = await this.prisma.chatMessage.findMany({
      where: { orderId },
      orderBy: { createdAt: "asc" },
      take: 50,
    });
    
    client.emit("messageHistory", messages);
  }

  @SubscribeMessage("sendMessage")
  async handleSendMessage(
    @MessageBody() data: { orderId: number; senderId: number; message: string },
    @ConnectedSocket() client: Socket,
  ) {
    const chatMessage = await this.prisma.chatMessage.create({
      data: {
        orderId: data.orderId,
        senderId: data.senderId,
        message: data.message,
      },
      include: {
        sender: { select: { name: true } },
      },
    });

    this.server.to(`order_${data.orderId}`).emit("newMessage", chatMessage);
  }
}
