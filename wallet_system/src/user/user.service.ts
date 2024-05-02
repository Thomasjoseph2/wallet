import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }

    async getTransactions(userId: number): Promise<object> {
        try {
            // Fetch the user along with the wallet and transactions
            const userWithTransactions = await this.prisma.user.findUnique({
                where: { id: userId },
                include: {
                    wallet: {
                        include: {
                            transactions: true // Include all transactions related to the wallet
                        }
                    }
                }
            });

            // Check if the user was found
            if (!userWithTransactions) {
                throw new NotFoundException(`User with ID ${userId} not found.`);
            }

            // Accessing the transactions from the user's wallet
            // If there is no wallet or transactions, you might want to handle that case too
            if (!userWithTransactions.wallet) {
                throw new NotFoundException(`No wallet found for User ID ${userId}.`);
            }

            return userWithTransactions.wallet.transactions;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error; // Re-throw the NotFoundException for handling at a higher level
            } else {
                throw new Error(`Getting transactions failed: ${error.message}`);
            }
        }
    }
}
