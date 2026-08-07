import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '@/modules/auth/auth.module';
import { PrismaModule } from '@/prisma/prisma.module';
import { TasksModule } from '@/modules/tasks/tasks.module';
import { validate } from '@/config/env.validation';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, validate }),
    PrismaModule,
    AuthModule,
    TasksModule,
  ],
})
export class AppModule {}
