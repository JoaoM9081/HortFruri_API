import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DataSource } from 'typeorm';
import { AppModule } from '../app.module';

describe('Database connectivity', () => {
  let app: INestApplication;
  let dataSource: DataSource;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    dataSource = app.get(DataSource);
  });

  afterAll(async () => {
    if (app) {
      await app.close();
    }
  });

  it('connects to Postgres and creates tables from the mapped entities', async () => {
    expect(dataSource.isInitialized).toBe(true);

    const currentDatabaseResult = await dataSource.query(
      'SELECT current_database() AS name',
    );
    const currentDatabase = currentDatabaseResult[0]?.name;

    expect(currentDatabase).toBeTruthy();

    const expectedTables = dataSource.entityMetadatas.map(
      (metadata) => metadata.tableName,
    );

    const tables = await dataSource.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
        AND table_type = 'BASE TABLE'
    `);
    const actualTables = tables.map(
      (table: { table_name: string }) => table.table_name,
    );

    expect(actualTables).toEqual(expect.arrayContaining(expectedTables));
  });
});
