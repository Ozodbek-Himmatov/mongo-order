import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class OwnerAuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) { }
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest();
        const authHeader = req.headers.authorization;
        if (!authHeader)
            throw new UnauthorizedException({
                message: "The user NOT authorized",
            });
        const bearer = authHeader.split(' ')[0];
        const token = authHeader.split(' ')[1];
        if (bearer !== 'Bearer' || !token) {
            throw new UnauthorizedException({
                message: "Please, Log In",
            });
        }
        let user: any;
        try {
            user = this.jwtService.verify(token, {
                secret: process.env.REFRESH_TOKEN_KEY,
            });
        } catch (error) {
            throw new UnauthorizedException({
                message: "Log in Again",
            });
        }
        if (!user.is_owner) {
            throw new UnauthorizedException({
                message: 'You are Not Admin!',
            });
        }
        req.user = user;
        return true;
    }
}
