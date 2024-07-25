import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { ApiOkResponse  } from '@nestjs/swagger';
import { LoginRequestDto } from '../dto/login.request.dto';
import { LoginResponseDto } from '../dto/login.response.dto';
import { ApiResponse } from 'src/transactions/dto/api-reponse.dto';

@Controller('auth')
export class AuthController {
    constructor( 
    private readonly authService: AuthService) {
    }

    @ApiOkResponse({
        description: 'Login de usuario',
        type: ApiResponse<LoginResponseDto>,
        isArray: false
      })
       @Post()
      createUser(@Body() login: LoginRequestDto):Promise<ApiResponse<LoginResponseDto>> {
        return this.authService.login(login)
      }
    
}
