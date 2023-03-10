import { readFile, writeFile } from 'fs/promises';
import { glob } from 'glob';
import path from 'path';
import semver from 'semver';

const versionBump = process.argv.at(-1);

if (!['major', 'minor', 'patch'].includes(versionBump)) {
    throw new Error('Expected major|minor|patch arg');
}

const cwd = process.cwd();

const files = await glob('src/nodes/**/*.ts', {
    cwd,
});

for (const filename of files) {
    const file = path.resolve(cwd, filename);
    const text = await readFile(file, 'utf-8');
    const newText = text.replace(/version: '(\d+\.\d+\.\d+)'/ig, (match, ver) => {
        const newVer = semver.inc(ver, versionBump);
        return `version: '${newVer}'`;
    });
    await writeFile(file, newText, 'utf-8');
}
