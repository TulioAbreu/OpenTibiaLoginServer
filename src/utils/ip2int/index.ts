export function ip2int(ip: string): number {
    return parseInt(ip.replace(/\./g, ''), 10);
}
