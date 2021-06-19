import {
    Column,
    Entity,
    getRepository,
    PrimaryGeneratedColumn,
    Repository,
} from 'typeorm';

@Entity({
    name: 'accounts',
})
export class Account {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({
        type: 'varchar',
        length: 32,
        unique: true,
    })
    name: string;

    @Column({
        type: 'varchar',
        length: 255,
    })
    password: string;

    @Column({
        type: 'int',
        default: 0,
    })
    premdays: number;

    @Column({
        type: 'int',
        unsigned: true,
    })
    lastday: number;

    @Column({
        type: 'varchar',
        length: 255,
        default: '',
    })
    email: string;

    @Column({
        type: 'varchar',
        length: 32,
        default: '',
    })
    key: string;

    @Column({
        type: 'tinyint',
        default: 0,
    })
    blocked: boolean;

    @Column({
        type: 'int',
    })
    warnings: number;

    @Column({
        type: 'int',
    })
    group_id: number;
}

export function AccountRepository(): Repository<Account> {
    return getRepository(Account);
}
