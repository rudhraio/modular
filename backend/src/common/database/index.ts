import { DataSource } from 'typeorm';
import config from '../configs';

const ormConfig: any = {
    "type": config.database.type,
    "host": config.database.host,
    "port": config.database.port,
    "username": config.database.username,
    "password": config.database.password,
    "database": config.database.db,
    "schema": config.database.schema,
    "entities": ["src/common/database/models/**/*.ts"],
    "migrations": ["src/common/database/migrations/*.ts"],
    "cli": {
        "entitiesDir": "src/common/database/models",
        "migrationsDir": "src/common/database/migrations"
    }
}
export const AppDataSource = new DataSource(ormConfig);
