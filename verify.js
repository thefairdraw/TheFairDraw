function fairRandomVerify(items, seed) {
    if (!seed || seed.length !== 64 || !/^[0-9a-fA-F]{64}$/.test(seed)) {
        throw new Error('Seed must be 64 hex characters!');
    }
    if (!items || items.length < 1) {
        throw new Error('List must contain at least one item!');
    }
    let itemsStr = items.join(',');
    let inputStr = seed + '|' + itemsStr;
    let msg = new TextEncoder().encode(inputStr);
    let len = msg.length * 8;
    msg = new Uint8Array([...msg, 0x80, ...Array((64 - (msg.length + 1) % 64) % 64).fill(0)]);
    let view = new DataView(new ArrayBuffer(8));
    view.setBigUint64(0, BigInt(len), false);
    msg = new Uint8Array([...msg, ...new Uint8Array(view.buffer)]);
    let K = [
        0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
        0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
        0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
        0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
        0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
        0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
        0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
        0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
    ];
    let H = [0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19];
    for (let i = 0; i < msg.length; i += 64) {
        let W = new Array(64);
        for (let j = 0; j < 16; j++) W[j] = (msg[i + j*4] << 24) | (msg[i + j*4 + 1] << 16) | (msg[i + j*4 + 2] << 8) | msg[i + j*4 + 3];
        for (let j = 16; j < 64; j++) {
            let s0 = ((W[j-15] >>> 7) | (W[j-15] << 25)) ^ ((W[j-15] >>> 18) | (W[j-15] << 14)) ^ (W[j-15] >>> 3);
            let s1 = ((W[j-2] >>> 17) | (W[j-2] << 15)) ^ ((W[j-2] >>> 19) | (W[j-2] << 13)) ^ (W[j-2] >>> 10);
            W[j] = (W[j-16] + s0 + W[j-7] + s1) >>> 0;
        }
        let a = H[0], b = H[1], c = H[2], d = H[3], e = H[4], f = H[5], g = H[6], h = H[7];
        for (let j = 0; j < 64; j++) {
            let S1 = ((e >>> 6) | (e << 26)) ^ ((e >>> 11) | (e << 21)) ^ ((e >>> 25) | (e << 7));
            let ch = (e & f) ^ (~e & g);
            let temp1 = (h + S1 + ch + K[j] + W[j]) >>> 0;
            let S0 = ((a >>> 2) | (a << 30)) ^ ((a >>> 13) | (a << 19)) ^ ((a >>> 22) | (a << 10));
            let maj = (a & b) ^ (a & c) ^ (b & c);
            let temp2 = (S0 + maj) >>> 0;
            h = g; g = f; f = e; e = (d + temp1) >>> 0; d = c; c = b; b = a; a = (temp1 + temp2) >>> 0;
        }
        H[0] = (H[0] + a) >>> 0; H[1] = (H[1] + b) >>> 0; H[2] = (H[2] + c) >>> 0; H[3] = (H[3] + d) >>> 0;
        H[4] = (H[4] + e) >>> 0; H[5] = (H[5] + f) >>> 0; H[6] = (H[6] + g) >>> 0; H[7] = (H[7] + h) >>> 0;
    }
    let hash = Array.from(H, x => ('00000000' + x.toString(16)).slice(-8)).join('');
    let lastBytes = parseInt(hash.slice(-8), 16);
    let selectedIndex = lastBytes % items.length;
    let selectedItem = items[selectedIndex];
    return {
        seed: seed,
        hash: hash,
        selected_item: selectedItem,
        index: selectedIndex,
        items_count: items.length
    };
}
