import { config } from './services/config';

export function getMotdId(account_id?: number): number {
    return config.motd.id;
}

export function getMotd(account_id?: number): string {
    return config.motd.text;
}
