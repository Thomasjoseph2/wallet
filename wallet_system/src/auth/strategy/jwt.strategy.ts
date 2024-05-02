import { Injectable, UnauthorizedException, Request } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from "src/prisma/prisma.service";
import { createUserResponse } from "../dto";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        private config: ConfigService,
        private prisma: PrismaService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get('JWT_SECRET'),
            passReqToCallback: true  // Important to pass the request to the callback
        });
    }

    async validate(req: Request, payload: { sub: number, email: string }) {
        const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req as any);

        // Check if the token is blacklisted
        const blacklisted = await this.prisma.blacklistedToken.findUnique({
            where: { token },
        });
        if (blacklisted) {
            throw new UnauthorizedException('Token is blacklisted and cannot be used.');
        }

        // Retrieve the user from the database
        const user = await this.prisma.user.findUnique({
            where: { id: payload.sub }
        });

        if (!user) {
            throw new UnauthorizedException('No user found with this id.');
        }

        // Optionally include the token in the user response if needed
        const userResponse = createUserResponse(user);
        return userResponse;
    }
}
