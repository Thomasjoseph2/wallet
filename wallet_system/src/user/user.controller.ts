import { Controller, Get, NotFoundException, Req, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { GetUser } from 'src/auth/decorator';
import { User } from '@prisma/client';
import { UserService } from './user.service';


@UseGuards(JwtGuard)
@Controller('users')

export class UserController {
  constructor(private userService:UserService){}
    @Get('profile')
    getMe(@GetUser() user: User) {
        try {
            return user
        } catch (error) {
            throw new Error("action failed: " + error.message);

        }
    }
    @Get('transactions')
    async getTransactins(@GetUser() user:User){
        // We assume user is always present because JwtGuard ensures authentication
        if (!user) {
            throw new NotFoundException('User not found ,try to login again or try after some time');
        }
        return this.userService.getTransactions(user.id);

    }


}
