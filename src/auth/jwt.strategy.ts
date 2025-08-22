// src/auth/jwt.strategy.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../users/schemas/user.schema';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly configService: ConfigService,
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) {
        // Lấy giá trị secret ra một biến riêng
        const secret = configService.get<string>('JWT_SECRET');

        // Kiểm tra xem secret có tồn tại không. Nếu không, ném lỗi ngay khi khởi tạo.
        // Điều này giúp ứng dụng "fail-fast" (dừng sớm) nếu cấu hình sai.
        if (!secret) {
            throw new Error('JWT secret key is not defined in the environment variables.');
        }

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            // Bây giờ, TypeScript biết chắc chắn rằng 'secret' là một string.
            secretOrKey: secret,
        });
    }

    async validate(payload: any) {
        const user = await this.userModel.findById(payload.sub).lean();
        if (!user) throw new UnauthorizedException();
        return user; // Trả về toàn bộ thông tin user
    }
}