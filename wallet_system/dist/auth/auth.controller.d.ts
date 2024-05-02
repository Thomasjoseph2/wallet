import { AuthService } from "./auth.service";
import { SignInDto, SignUpDto } from "./dto";
import { User } from "@prisma/client";
import { Request } from 'express';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signup(dto: SignUpDto): Promise<import("./dto").UserResponse>;
    signin(dto: SignInDto): Promise<import("./dto").UserResponse>;
    logout(user: User, req: Request): Promise<string>;
}
