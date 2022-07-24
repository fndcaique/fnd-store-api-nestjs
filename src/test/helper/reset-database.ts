import { Database } from '../../database';

export async function resetDatabase(database: Database) {
  const { manager, entityMetadatas } = database.getDataSource();
  const truncateQuery = entityMetadatas.reduce((query, { tableName }) => {
    return `${query} TRUNCATE TABLE "${tableName}" RESTART IDENTITY CASCADE;`
  }, '');
  await manager.query(truncateQuery)
}