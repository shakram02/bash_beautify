import { existsSync } from 'fs';

export function exists(path: string) {
    return existsSync(path);
}