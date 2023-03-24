import {
        BadRequestException,
        ForbiddenException,
        HttpException,
        HttpStatus,
        Injectable,
        UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login-user.dto';
import { Response } from 'express';
import { AdminService } from '../admin/admin.service';
import { Admin } from '../admin/schemas/admin.schema';

@Injectable()
export class AuthService {
        constructor(
                private readonly adminService: AdminService,
                private readonly jwtService: JwtService,
        ) { }

        async login(loginDto: LoginDto, res: Response) {
                const { username, password } = loginDto;
                const admin = await this.adminService.findOneByUsername(username);
                if (!admin) {
                        throw new HttpException(`NO such Admin`, HttpStatus.BAD_REQUEST);
                }
                const isMatchPass = await bcrypt.compare(password, admin.hashed_password);
                if (!isMatchPass) {
                        throw new UnauthorizedException(`Admin NOT registered`);
                }
                const tokens = await this.getToken(admin, admin.id);

                const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
                const updatedUser = await this.adminService.update(admin.id, {
                        hashed_token: hashed_refresh_token,
                });

                res.cookie('refresh_token', tokens.refresh_token, {
                        maxAge: 15 * 24 * 60 * 60 * 1000,
                        httpOnly: true,
                });
                const response = {
                        message: 'ADMIN LOGIN',
                        user: updatedUser,
                        tokens,
                };
                return response;
        }

        async logout(refreshToken: string, res: Response) {
                const userData = await this.jwtService.verify(refreshToken, {
                        secret: process.env.REFRESH_TOKEN_KEY,
                });
                if (!userData) {
                        throw new ForbiddenException('User NOT found');
                }
                const logOutUser = await this.adminService.update(userData.id, {
                        hashed_token: null,
                });
                res.clearCookie('refresh_token');
                const response = {
                        message: 'User Logged OUT',
                        user: logOutUser[1][0],
                };
                return response;
        }

        private async getToken(admin: Admin, id: string) {
                const payload = {
                        id,
                        is_active: admin.is_active,
                        is_owner: admin.is_creator,
                };
                const [accessToken, refreshToken] = await Promise.all([
                        this.jwtService.signAsync(payload, {
                                secret: process.env.ACCESS_TOKEN_KEY,
                                expiresIn: process.env.ACCESS_TOKEN_TIME,
                        }),
                        this.jwtService.signAsync(payload, {
                                secret: process.env.REFRESH_TOKEN_KEY,
                                expiresIn: process.env.REFRESH_TOKEN_TIME,
                        }),
                ]);
                return { access_token: accessToken, refresh_token: refreshToken };
        }
}
