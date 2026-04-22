import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

type ParsedDatabaseUrl = {
  database?: string;
  host?: string;
  password?: string;
  port?: number;
  username?: string;
};

const parseDatabaseUrl = (rawUrl?: string): ParsedDatabaseUrl => {
  if (!rawUrl) {
    return {};
  }

  const normalizedUrl = rawUrl.replace(/^jdbc:/, '');
  const url = new URL(normalizedUrl);

  return {
    database: url.pathname.replace(/^\//, '') || undefined,
    host: url.hostname || undefined,
    password: url.password || undefined,
    port: url.port ? Number(url.port) : undefined,
    username: url.username || undefined,
  };
};

const parsePort = (value?: string, fallback = 5432): number => {
  const parsedValue = Number(value);

  return Number.isNaN(parsedValue) ? fallback : parsedValue;
};

export const buildTypeOrmOptions = (
  configService: ConfigService,
): TypeOrmModuleOptions => {
  const databaseFromUrl = parseDatabaseUrl(configService.get<string>('DB_URL'));

  return {
    type: 'postgres',
    host: configService.get<string>('DB_HOST') ?? databaseFromUrl.host ?? 'localhost',
    port: parsePort(
      configService.get<string>('DB_PORT'),
      databaseFromUrl.port ?? 5432,
    ),
    username:
      configService.get<string>('DB_USER') ??
      databaseFromUrl.username ??
      configService.get<string>('POSTGRES_USER') ??
      'postgres',
    password:
      configService.get<string>('DB_PASSWORD') ??
      databaseFromUrl.password ??
      configService.get<string>('POSTGRES_PASSWORD') ??
      'postgres',
    database:
      configService.get<string>('DB_NAME') ??
      databaseFromUrl.database ??
      configService.get<string>('POSTGRES_DB') ??
      'postgres',
    autoLoadEntities: true,
    synchronize: true,
  };
};
