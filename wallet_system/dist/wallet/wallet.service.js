"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let WalletService = class WalletService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getBalance(userId) {
        try {
            const userWithWallet = await this.prisma.user.findUnique({
                where: { id: userId },
                include: { wallet: true }
            });
            if (!userWithWallet || !userWithWallet.wallet) {
                throw new common_1.NotFoundException('Wallet not found for the given user');
            }
            return userWithWallet.wallet.balance;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            else {
                throw new Error("getting balance failed: " + error.message);
            }
        }
    }
    async addAmount(dto, userId) {
        return await this.prisma.$transaction(async (prisma) => {
            try {
                const user = await prisma.user.findUnique({
                    where: { id: userId },
                    include: { wallet: true }
                });
                if (!user || !user.wallet) {
                    throw new common_1.NotFoundException('Wallet not found for the given user ID');
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
            }
            catch (error) {
                if (error instanceof common_1.NotFoundException || common_1.UnauthorizedException) {
                    throw error;
                }
                else {
                    throw new Error("Adding amount failed: " + error.message);
                }
            }
        });
    }
    async withdrawAmount(dto, userId) {
        return await this.prisma.$transaction(async (prisma) => {
            try {
                const userWithWallet = await prisma.user.findUnique({
                    where: { id: userId },
                    include: { wallet: true }
                });
                if (!userWithWallet || !userWithWallet.wallet) {
                    throw new common_1.NotFoundException('Wallet not found for the given user');
                }
                if (userWithWallet.wallet.balance < parseFloat(dto.amount)) {
                    throw new common_1.BadRequestException('Insufficient funds in the wallet');
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
            }
            catch (error) {
                if (error instanceof common_1.NotFoundException || common_1.BadRequestException) {
                    throw error;
                }
                else {
                    throw new Error("Withdrawing amount failed: " + error.message);
                }
            }
        });
    }
};
exports.WalletService = WalletService;
exports.WalletService = WalletService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], WalletService);
//# sourceMappingURL=wallet.service.js.map