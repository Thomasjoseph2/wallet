import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { GetUser } from 'src/auth/decorator';
import { User } from '@prisma/client';


@UseGuards(JwtGuard)
@Controller('users')

export class UserController {

    @Get('profile')
    getMe(@GetUser() user: User) {
        try {
            return user
        } catch (error) {
            throw new Error("action failed: " + error.message);

        }
    }
}
