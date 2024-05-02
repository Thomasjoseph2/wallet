import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { WalletDto } from './dto';

@Injectable()
export class WalletService {
    constructor(private prisma: PrismaService) { }



    async getBalance(userId: number): Promise<number> {

        try {
            // Fetch the user along with the associated wallet using the relation defined in Prisma schema
            const userWithWallet = await this.prisma.user.findUnique({
                where: { id: userId },
                include: { wallet: true } // Include the wallet in the result
            });

            if (!userWithWallet || !userWithWallet.wallet) {
                throw new NotFoundException('Wallet not found for the given user');
            }

            return userWithWallet.wallet.balance; // Return the balance from the wallet
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error; // Re-throw custom error for correct response other wise it will throw the error in the catch block
            } else {
                throw new Error("getting balance failed: " + error.message);
            }
        }

    }


    async addAmount(dto: WalletDto): Promise<string> {
        try {
            const user = await this.prisma.user.findUnique({
                where: { id: parseInt(dto.userId) },
                include: { wallet: true }
            });

            if (!user || !user.wallet) {
                throw new NotFoundException('Wallet not found for the given user ID');
            }

            const updatedWallet = await this.prisma.wallet.update({
                where: { id: user.walletId }, // Use walletId retrieved from user
                data: { balance: { increment: parseInt(dto.amount) } }
            });

            return `Wallet updated successfully. New balance: ${updatedWallet.balance}`;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error; // Re-throw custom error for correct response other wise it will throw the error in the catch block
            } else {
                throw new Error("Signin failed: " + error.message);
            }
        }

    }

    async withdrawAmount(dto: WalletDto): Promise<string> {
        try {
            const userWithWallet = await this.prisma.user.findUnique({
                where: { id: parseInt(dto.userId) },
                include: { wallet: true }
            });

            if (!userWithWallet || !userWithWallet.wallet) {
                throw new NotFoundException('Wallet not found for the given user');
            }

            if (userWithWallet.wallet.balance < parseInt(dto.amount)) {
                throw new BadRequestException('Insufficient funds in the wallet');
            }

            const updatedWallet = await this.prisma.wallet.update({
                where: { id: userWithWallet.wallet.id },
                data: { balance: { decrement: parseInt(dto.amount) } }
            });

            return `Amount withdrawn successfully. New balance: ${updatedWallet.balance}`;

        } catch (error) {
            if (error instanceof NotFoundException || BadRequestException) {
                throw error; // Re-throw custom error for correct response other wise it will throw the error in the catch block
            }
            else {
                throw new Error("Signin failed: " + error.message);
            }
        }
    }
}
