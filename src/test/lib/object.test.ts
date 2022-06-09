import assert from 'assert';

import { getValue, setValue } from '../../lib/object.js';

describe('object', () => {

    // See https://datatracker.ietf.org/doc/html/rfc6901
    const data = {
        'foo': ['bar', 'baz'],
        '': 0,
        'a/b': 1,
        'c%d': 2,
        'e^f': 3,
        'g|h': 4,
        'i\\j': 5,
        'k"l': 6,
        ' ': 7,
        'm~n': 8
    };

    const expectations = {
        '': data,
        '/foo': ['bar', 'baz'],
        '/foo/0': 'bar',
        '/': 0,
        '/a~1b': 1,
        '/c%d': 2,
        '/e^f': 3,
        '/g|h': 4,
        '/i\\j': 5,
        '/k"l': 6,
        '/ ': 7,
        '/m~0n': 8,
    };

    describe('getValue', () => {

        it('passes JSON pointer getter spec', () => {
            for (const [key, expected] of Object.entries(expectations)) {
                const res = getValue(data, key);
                assert.deepStrictEqual(res, expected);
            }
        });

        it('gets nested values', () => {
            const obj = {
                foo: {
                    bar: ['one', 'two'],
                },
            };
            assert.deepStrictEqual(getValue(obj, 'foo'), { bar: ['one', 'two'] });
            assert.deepStrictEqual(getValue(obj, 'foo.bar'), ['one', 'two']);
            assert.deepStrictEqual(getValue(obj, 'foo.bar.0'), 'one');
            assert.deepStrictEqual(getValue(obj, 'foo.bar.1'), 'two');
        });

    });

    describe('setValue', () => {

        it('passes JSON pointer setter spec', () => {
            const keys = Object.keys(expectations).slice(1);
            for (const key of keys) {
                const obj = JSON.parse(JSON.stringify(data));
                setValue(obj, key, 'new');
                const exp = getValue(obj, key);
                assert.strictEqual(exp, 'new');
            }
        });

        it('does not modify if key is empty', () => {
            const obj = { foo: { bar: [1, 2] } };
            setValue(obj, '', 'new');
            assert.deepStrictEqual(obj, { foo: { bar: [1, 2] } });
        });

        it('inserts an empty key if key is /', () => {
            const obj = { foo: { bar: [1, 2] } };
            setValue(obj, '/', 'new');
            assert.deepStrictEqual(obj, { '': 'new', foo: { bar: [1, 2] } });
        });

        it('inserts an array item', () => {
            const obj = { foo: { bar: [1, 2] } };
            setValue(obj, '/foo/bar/-', 'new');
            assert.deepStrictEqual(obj, { foo: { bar: [1, 2, 'new'] } });
        });

        it('creates an array in the middle', () => {
            const obj = {};
            setValue(obj, '/foo/-/bar', 'new');
            assert.deepStrictEqual(obj, { foo: [{ bar: 'new' }] });
        });

        it('assigns to existing objects', () => {
            const obj = { foo: { bar: 1 } };
            setValue(obj, '/foo/baz', 'new');
            assert.deepStrictEqual(obj, { foo: { bar: 1, baz: 'new' } });
        });

    });

});
