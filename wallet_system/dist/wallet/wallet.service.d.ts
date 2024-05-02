import { PrismaService } from 'src/prisma/prisma.service';
import { WalletDto } from './dto';
export declare class WalletService {
    private prisma;
    constructor(prisma: PrismaService);
    getBalance(userId: number): Promise<number>;
    addAmount(dto: WalletDto, userId: number): Promise<string>;
    withdrawAmount(dto: WalletDto, userId: number): Promise<string>;
}
