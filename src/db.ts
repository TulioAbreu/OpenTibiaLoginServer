import * as mysql from 'mysql2/promise';
import {RowDataPacket} from 'mysql2/promise';

import Config from './config';
import {Account, AccountRepository} from './models/account';
import {Maybe} from './utils/maybe';

export interface Character {
    id: number;
    name: string;
    world_id: number;
    level: number;
    sex: number;
    vocation: number;
    lookbody: number;
    lookfeet: number;
    lookhead: number;
    looklegs: number;
    looktype: number;
    lookaddons: number;
}

class DB {
    private conn: mysql.Pool = null;
    tables = {};
    // settings
    hasPlayersOnline = false;
    hasWorldIdInPlayersOnline = false;
    hasOnlineInPlayers = false;
    hasWorldIdInPlayers = false;
    hasServerConfig = false;
    hasLiveCasts = false;
    hasCams = false;

    start = async () => {
        if (this.conn) {
            throw 'DB has already started';
        }
        // check connection
        await this.conn.query('SELECT 1');
        // try to auto detect what kind of database it is
        // first load details about this database
        const raw_tables_and_columns = await this.query(
            'SELECT TABLE_NAME as `table`, COLUMN_NAME as `column` FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA LIKE ?',
            [Config.mysql.database],
        );
        raw_tables_and_columns.forEach((table_column) => {
            if (!this.tables[table_column.table]) {
                this.tables[table_column.table] = [];
            }
            this.tables[table_column.table].push(table_column.column);
        });

        // now set settings
        this.hasPlayersOnline = 'players_online' in this.tables;
        this.hasWorldIdInPlayersOnline =
            this.hasPlayersOnline &&
            this.tables['players_online'].includes('world_id');
        this.hasOnlineInPlayers = this.tables['players'].includes('online');
        this.hasWorldIdInPlayers = this.tables['players'].includes('world_id');
        this.hasServerConfig = 'server_config' in this.tables;
        this.hasLiveCasts = 'live_casts' in this.tables;
        this.hasCams = 'cams' in this.tables;
    };

    async stop() {
        await this.conn.end();
    }

    query = async (query: string, params?: any[]): Promise<RowDataPacket[]> => {
        const [result, fields] = await this.conn.execute<RowDataPacket[]>(
            query,
            params,
        );
        return result;
    };

    async loadAccountById(id: number): Promise<Maybe<Account>> {
        const account = AccountRepository().findOne(id);
        if (!account) {
            return null;
        }
        return account;
    }

    async loadAccountByName(name: string): Promise<Account> {
        const account = AccountRepository().findOne({
            name: name,
        });
        if (!account) {
            return null;
        }
        return account;
    }

    loadCharactersByAccountId = async (
        accountId: number | string,
    ): Promise<Character[]> => {
        const characters = await this.query(
            'SELECT * FROM `players` where `account_id` = ?',
            [accountId],
        );
        const ret: Character[] = [];
        for (let i = 0; i < characters.length; ++i) {
            ret.push(this.parseCharacter(characters[i]));
        }
        return ret;
    };

    parseCharacter = (character: RowDataPacket): Character => {
        return {
            id: character.id,
            name: character.name,
            world_id: character.world_id || 0,
            level: character.level || 1,
            sex: character.sex || 0,
            vocation: character.vocation || 0,
            looktype: character.looktype || 128,
            lookbody: character.lookbody || 0,
            lookfeet: character.lookfeet || 0,
            lookhead: character.lookhead || 0,
            looklegs: character.looklegs || 0,
            lookaddons: character.lookaddons || 0,
        };
    };

    getPlayersOnline = async (world_id?: number): Promise<number> => {
        // todo: add option for limit by ip
        // todo: dont count afk players
        if (this.hasPlayersOnline) {
            if (this.hasWorldIdInPlayersOnline && world_id) {
                return (
                    await this.query(
                        'SELECT COUNT(*) as count FROM `players_online` WHERE `world_id` = ?',
                        [world_id],
                    )
                )[0].count;
            }
            return (
                await this.query(
                    'SELECT COUNT(*) as count FROM `players_online`',
                )
            )[0].count;
        } else if (this.hasOnlineInPlayers) {
            if (this.hasWorldIdInPlayers && world_id) {
                return (
                    await this.query(
                        'SELECT COUNT(*) as count FROM `players` WHERE `online` = 1 and `world_id` = ?',
                        [world_id],
                    )
                )[0].count;
            }
            return (
                await this.query(
                    'SELECT COUNT(*) as count FROM `players` WHERE `online` = 1',
                )
            )[0].count;
        }
        return 0;
    };

    getOnlineRecord = async (world_id?: number): Promise<number> => {
        if (this.hasServerConfig) {
            const result = await this.query(
                "SELECT `value` FROM `server_config` WHERE `config` = 'players_record'",
            );
            if (result.length == 1) {
                return result[0].value;
            }
        }
        return 0;
    };
}

export default new DB();
