import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AppModule } from './../src/app.module';

describe('App bootstrap (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('starts Nest and initializes the TypeORM data source', () => {
    const dataSource = app.get(DataSource);

    expect(app).toBeDefined();
    expect(dataSource.isInitialized).toBe(true);
  });
});
