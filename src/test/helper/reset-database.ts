import { Database } from '../../database';

export async function resetDatabase(database: Database) {
  const { manager, entityMetadatas } = database.getDataSource();
  const truncateQuery = entityMetadatas.reduce((query, { name: table }) => {
    return `${query} TRUNCATE TABLE ${table} RESTART IDENTITY CASCADE;`
  }, '');
  await manager.query(truncateQuery)
}