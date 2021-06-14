export function ip2int(ip: string): number {
    let ipChunks = ip.split('.');
    return ((+ipChunks[3]) << 24) + ((+ipChunks[2]) << 16) + ((+ipChunks[1]) << 8) + (+ipChunks[0]);
}
