import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User, UserRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
import { PrismaService } from '@/prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}
  private safe(user: User) {
    const { password: _, ...safeUser } = user;
    return safeUser;
  }
  private sign(user: User) {
    return this.jwt.sign({ sub: user.id, email: user.email, role: user.role });
  }
  private authResponse(user: User) {
    return { accessToken: this.sign(user), user: this.safe(user) };
  }
  async register(dto: RegisterDto) {
    const exists = await this.prisma.user.findUnique({
      where: { email: dto.email.toLowerCase() },
    });
    if (exists) throw new ConflictException('Email is already registered');
    const password = await bcrypt.hash(dto.password, 12);
    const user = await this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email.toLowerCase(),
        password,
        role: UserRole.USER,
      },
    });
    return this.authResponse(user);
  }
  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email.toLowerCase() },
    });
    if (!user || !(await bcrypt.compare(dto.password, user.password)))
      throw new UnauthorizedException('Invalid credentials');
    return this.authResponse(user);
  }
  async guestLogin() {
    const email = `guest-${randomUUID()}@guest.local`;
    const password = await bcrypt.hash(randomUUID(), 12);
    const user = await this.prisma.user.create({
      data: { name: 'Guest User', email, password, role: UserRole.GUEST },
    });
    return this.authResponse(user);
  }
  async me(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new UnauthorizedException();
    return this.safe(user);
  }
  async logout() {
    return { message: 'Logged out' };
  }
}
