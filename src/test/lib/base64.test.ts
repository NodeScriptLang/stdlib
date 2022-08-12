import assert from 'assert';

import { base64ToBuffer, base64ToString, bufferToBase64, stringToBase64 } from '../../lib/base64.js';

describe('Base64', () => {

    it('encodes UTF-8 strings', () => {
        assert.strictEqual(stringToBase64(''), '');
        assert.strictEqual(stringToBase64('H'), 'SA==');
        assert.strictEqual(stringToBase64('He'), 'SGU=');
        assert.strictEqual(stringToBase64('Hel'), 'SGVs');
        assert.strictEqual(stringToBase64('Hell'), 'SGVsbA==');
        assert.strictEqual(stringToBase64('Hello'), 'SGVsbG8=');
        assert.strictEqual(stringToBase64('Hello '), 'SGVsbG8g');
        assert.strictEqual(stringToBase64('Hello World'), 'SGVsbG8gV29ybGQ=');
        assert.strictEqual(stringToBase64('Привет 👋'), '0J/RgNC40LLQtdGCIPCfkYs=');
    });

    it('decodes into UTF-8', () => {
        assert.strictEqual(base64ToString(''), '');
        assert.strictEqual(base64ToString('SA=='), 'H');
        assert.strictEqual(base64ToString('SGU='), 'He');
        assert.strictEqual(base64ToString('SGVs'), 'Hel');
        assert.strictEqual(base64ToString('SGVsbA=='), 'Hell');
        assert.strictEqual(base64ToString('SGVsbG8='), 'Hello');
        assert.strictEqual(base64ToString('SGVsbG8g'), 'Hello ');
        assert.strictEqual(base64ToString('SGVsbG8gV29ybGQ='), 'Hello World');
        assert.strictEqual(base64ToString('0J/RgNC40LLQtdGCIPCfkYs='), 'Привет 👋');
    });

    it('encodes into Base64Url', () => {
        assert.strictEqual(stringToBase64('Привет 👋', true), '0J_RgNC40LLQtdGCIPCfkYs');
    });

    it('decodes from Base64Url', () => {
        assert.strictEqual(base64ToString('0J_RgNC40LLQtdGCIPCfkYs', true), 'Привет 👋');
    });

    const numbers = [...Array(256).keys()];

    it('encodes/decodes binary data', () => {
        const buffer = new Uint8Array(numbers).buffer;
        const encoded = bufferToBase64(buffer);
        assert.ok(encoded.startsWith, 'AAECAwQFBg');
        const decoded = base64ToBuffer(encoded);
        assert.deepStrictEqual(decoded, buffer);
    });

});
