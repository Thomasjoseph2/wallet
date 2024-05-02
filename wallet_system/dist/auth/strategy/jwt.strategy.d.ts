import { ConfigService } from "@nestjs/config";
import { Strategy } from 'passport-jwt';
import { PrismaService } from "src/prisma/prisma.service";
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private config;
    private prisma;
    constructor(config: ConfigService, prisma: PrismaService);
    validate(req: Request, payload: {
        sub: number;
        email: string;
    }): Promise<import("../dto").UserResponse>;
}
export {};
