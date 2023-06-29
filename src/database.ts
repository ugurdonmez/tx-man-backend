import { DataSource } from 'typeorm';
import * as dotenv from "dotenv";
dotenv.config();

export const appDataSource = new DataSource({
    type: 'sqlite',
    database: ':memory:',
    entities: [__dirname + '/entities/*.ts'],
    synchronize: true,
});

appDataSource.initialize();
