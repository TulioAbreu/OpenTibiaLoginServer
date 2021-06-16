import {ip2int} from '.';

describe('ip2int', () => {
    it('should parse all ips correctly', () => {
        const fakeIP = '12.345.678.90';
        expect(ip2int(fakeIP)).toBe(1234567890);
    });
});
