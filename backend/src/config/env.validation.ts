import { plainToInstance, Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
  validateSync,
} from 'class-validator';
class Env {
  @IsString() @IsNotEmpty() DATABASE_URL: string;
  @IsString() @IsNotEmpty() JWT_SECRET: string;
  @IsString() @IsOptional() JWT_EXPIRES_IN = '1d';
  @Type(() => Number)
@IsInt()
@Min(1)
@IsOptional()
PORT = 4000;
  @IsString() @IsOptional() FRONTEND_URL = 'http://localhost:3000';
}
export function validate(config: Record<string, unknown>) {
  const validated = plainToInstance(Env, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validated, { skipMissingProperties: false });
  if (errors.length) throw new Error(errors.toString());
  return validated;
}
