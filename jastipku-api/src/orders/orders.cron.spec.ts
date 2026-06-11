import { Test, TestingModule } from '@nestjs/testing';
import { OrdersCronService } from './orders.cron';
import { PrismaService } from '../prisma/prisma.service';

describe('OrdersCronService', () => {
  let service: OrdersCronService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    order: {
      findMany: jest.fn(),
      update: jest.fn(),
    },
    user: {
      update: jest.fn(),
    },
    transaction: {
      create: jest.fn(),
    },
    $transaction: jest.fn(async (cb) => {
      return cb(mockPrismaService);
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersCronService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<OrdersCronService>(OrdersCronService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should not process anything if no orders to complete', async () => {
    mockPrismaService.order.findMany.mockResolvedValueOnce([]);

    await service.handleAutoCompletion();

    expect(mockPrismaService.order.findMany).toHaveBeenCalled();
    expect(mockPrismaService.$transaction).not.toHaveBeenCalled();
  });

  it('should auto-complete orders and add balance to traveler', async () => {
    const mockOrder = {
      id: 1,
      travelerId: 10,
      totalItemPrice: { toNumber: () => 100000 },
      serviceFee: { toNumber: () => 20000 },
    };

    mockPrismaService.order.findMany.mockResolvedValueOnce([mockOrder]);

    await service.handleAutoCompletion();

    expect(mockPrismaService.order.findMany).toHaveBeenCalled();
    expect(mockPrismaService.$transaction).toHaveBeenCalled();

    // Verify order updated
    expect(mockPrismaService.order.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: { status: 'COMPLETED' },
    });

    // Verify traveler balance incremented
    expect(mockPrismaService.user.update).toHaveBeenCalledWith({
      where: { id: 10 },
      data: {
        balance: {
          increment: 120000,
        },
      },
    });

    // Verify transaction log created
    expect(mockPrismaService.transaction.create).toHaveBeenCalledWith({
      data: {
        userId: 10,
        type: 'REVENUE',
        amount: 120000,
        description: 'Escrow released for Order #1 (Auto-completed)',
        relatedOrderId: 1,
      },
    });
  });
});
