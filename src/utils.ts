export function ip2int(ip: string): number {
    const d = ip.split('.');
    return (+d[3] << 24) + (+d[2] << 16) + (+d[1] << 8) + +d[0];
}
