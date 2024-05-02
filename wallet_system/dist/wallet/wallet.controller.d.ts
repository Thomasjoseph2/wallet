import { WalletService } from './wallet.service';
import { User } from '@prisma/client';
import { WalletDto } from './dto';
export declare class WalletController {
    private walletService;
    constructor(walletService: WalletService);
    getBalance(user: User): Promise<number>;
    addAmount(user: User, dto: WalletDto): Promise<string>;
    withdrawAmount(user: User, dto: WalletDto): Promise<string>;
}
