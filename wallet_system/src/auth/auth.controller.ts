import { Body, Controller, Req, HttpCode, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignInDto, SignUpDto } from "./dto";
import { GetUser } from "./decorator";
import { User } from "@prisma/client";
import { JwtGuard } from "./guard";
import { Request } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }
    

    @Post('signup')
    signup(@Body() dto: SignUpDto) {
        return this.authService.signup(dto)
    }
    @HttpCode(HttpStatus.OK)
    @Post('signin')
    signin(@Body() dto: SignInDto) {
        return this.authService.login(dto)
    }
    @UseGuards(JwtGuard)
    @Post('logout')
    @UseGuards(JwtGuard)  // Assuming JwtGuard is being used to protect the route
    async logout(@GetUser() user: User, @Req() req: Request) {  // Correctly type the 'req' parameter
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1]; // Bearer token
        return this.authService.logout(user, token);
    }
}