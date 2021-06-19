import {Connection, createConnection} from 'typeorm';
import type {Maybe} from '../utils/maybe';
import {Account} from './account';

interface ConnectionOptions {
    url: string;
}

class Database {
    private connection: Maybe<Connection>;
    constructor() {
        this.connection = undefined;
    }

    async connect(options: ConnectionOptions): Promise<boolean> {
        if (this.connection) {
            return false;
        }
        console.log('Connecting to database...');
        try {
            this.connection = await createConnection({
                type: 'mysql',
                ...options,
                entities: [Account],
            });
            if (!this.connection.isConnected) {
                await this.connection.connect();
            }
            return true;
        } catch (error) {
            console.error(`Failed connecting to Database. Reason: ${error}`);
            return false;
        }
    }

    async disconnect(): Promise<boolean> {
        if (!this.connection) {
            return false;
        }
        await this.connection.close();
        return true;
    }
}

export default new Database();
