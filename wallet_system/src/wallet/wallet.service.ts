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
        return await this.prisma.$transaction(async (prisma) => {
            try {
                const user = await prisma.user.findUnique({
                    where: { id: parseInt(dto.userId) },
                    include: { wallet: true }
                });

                if (!user || !user.wallet) {
                    throw new NotFoundException('Wallet not found for the given user ID');
                }

                const updatedWallet = await prisma.wallet.update({
                    where: { id: user.walletId },
                    data: { balance: { increment: parseFloat(dto.amount) } }
                });

                await prisma.transaction.create({
                    data: {
                        type: 'deposit',
                        amount: parseFloat(dto.amount),
                        walletId: user.walletId
                    }
                });

                return `Wallet updated successfully. New balance: ${updatedWallet.balance}`;
            } catch (error) {
                if (error instanceof NotFoundException) {
                    throw error;
                } else {
                    throw new Error("Adding amount failed: " + error.message);
                }
            }
        });
    }


    async withdrawAmount(dto: WalletDto): Promise<string> {
        return await this.prisma.$transaction(async (prisma) => {
            try {
                const userWithWallet = await prisma.user.findUnique({
                    where: { id: parseInt(dto.userId) },
                    include: { wallet: true }
                });

                if (!userWithWallet || !userWithWallet.wallet) {
                    throw new NotFoundException('Wallet not found for the given user');
                }

                if (userWithWallet.wallet.balance < parseFloat(dto.amount)) {
                    throw new BadRequestException('Insufficient funds in the wallet');
                }

                const updatedWallet = await prisma.wallet.update({
                    where: { id: userWithWallet.wallet.id },
                    data: { balance: { decrement: parseFloat(dto.amount) } }
                });

                await prisma.transaction.create({
                    data: {
                        type: 'withdrawal',
                        amount: parseFloat(dto.amount),
                        walletId: userWithWallet.wallet.id
                    }
                });

                return `Amount withdrawn successfully. New balance: ${updatedWallet.balance}`;

            } catch (error) {
                if (error instanceof NotFoundException || BadRequestException) {
                    throw error;
                } else {
                    throw new Error("Withdrawing amount failed: " + error.message);
                }
            }
        });
    }

}
