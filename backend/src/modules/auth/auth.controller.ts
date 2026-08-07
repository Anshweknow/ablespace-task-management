import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '@/common/decorators/current-user.decorator';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import {
  AuthResponseEntity,
  SafeUserEntity,
} from './entities/auth-response.entity';
@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}
  @Post('register') @ApiOkResponse({ type: AuthResponseEntity }) register(
    @Body() dto: RegisterDto,
  ) {
    return this.auth.register(dto);
  }
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: AuthResponseEntity })
  login(@Body() dto: LoginDto) {
    return this.auth.login(dto);
  }
  @Post('guest')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: AuthResponseEntity })
  guest() {
    return this.auth.guestLogin();
  }
  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: SafeUserEntity })
  me(@CurrentUser() user: { id: string }) {
    return this.auth.me(user.id);
  }
  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  logout() {
    return this.auth.logout();
  }
}
