import { BadRequestException, Body, Controller, Get, NotFoundException, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { WalletService } from './wallet.service';
import { GetUser } from 'src/auth/decorator';
import { User } from '@prisma/client';
import { WalletDto } from './dto';
import { validate } from 'class-validator';

@Controller('wallet')
@UseGuards(JwtGuard)
export class WalletController {
    constructor(private walletService: WalletService) { }

    @Get('get-balance')
    async getBalance(@GetUser() user: User) {
        // We assume user is always present because JwtGuard ensures authentication
        if (!user) {
            throw new NotFoundException('User not found ,try to login again or try after some time');
        }
        return this.walletService.getBalance(user.id);
    }

    @Post('add-amount')
    async addAmount(@Body() dto: WalletDto) {
        // Validate the DTO to ensure data integrity
        const errors = await validate(dto);
        if (errors.length > 0) {
            throw new BadRequestException('Validation failed: ' + JSON.stringify(errors));
        }
        return this.walletService.addAmount(dto);
    }


    @Post('withdraw-amount')
    async withdrawAmount(@Body() dto: WalletDto) {
        // Validate the DTO to ensure data integrity
        const errors = await validate(dto);
        if (errors.length > 0) {
            throw new BadRequestException('Validation failed: ' + JSON.stringify(errors));
        }
        return this.walletService.withdrawAmount(dto);
    }
}
