import { PrismaService } from "src/prisma/prisma.service";
import { SignInDto, SignUpDto } from "./dto";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { User } from "@prisma/client";
export declare class AuthService {
    private prisma;
    private jwt;
    private config;
    constructor(prisma: PrismaService, jwt: JwtService, config: ConfigService);
    signup(dto: SignUpDto): Promise<import("./dto").UserResponse>;
    login(dto: SignInDto): Promise<import("./dto").UserResponse>;
    signToken(userId: number, email: string): Promise<string>;
    logout(user: User, token: string): Promise<string>;
}
