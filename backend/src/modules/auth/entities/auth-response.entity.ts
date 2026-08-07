import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
export class SafeUserEntity {
  @ApiProperty() id: string;
  @ApiProperty() name: string;
  @ApiProperty() email: string;
  @ApiProperty({ enum: UserRole }) role: UserRole;
  @ApiProperty() createdAt: Date;
  @ApiProperty() updatedAt: Date;
}
export class AuthResponseEntity {
  @ApiProperty() accessToken: string;
  @ApiProperty({ type: SafeUserEntity }) user: SafeUserEntity;
}
