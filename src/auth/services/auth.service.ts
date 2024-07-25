import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Usuario } from '../model/usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginResponseDto } from '../dto/login.response.dto';
import { ApiResponse } from 'src/transactions/dto/api-reponse.dto';
import { LoginRequestDto } from '../dto/login.request.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Usuario)
        private readonly usersService: Repository<Usuario>,
        private readonly jwtService: JwtService,
    ) { }

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.usersService.findOne({ where: { nombreUsuario: username } });

        if (user && bcrypt.compareSync(password, user.password)) {
            const { password, ...result } = user;
            console.log(result)
            return result;
        }
        return null;
    }

    async login(user: LoginRequestDto): Promise<ApiResponse<LoginResponseDto>> {
        const validatedUser = await this.validateUser(user.username, user.password);

        if (!validatedUser) {
            throw new UnauthorizedException('Credenciales inválidas');
        }

        const payload = { username: user.username, sub: user.username };
        const response = new LoginResponseDto();
        response.token = this.jwtService.sign(payload);

        return new ApiResponse(1, 'Login exitoso', response);
    }
}
