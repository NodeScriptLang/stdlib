export class InvalidDateError extends Error {
    override name = this.constructor.name;
    override message = 'Invalid date';
}

export function parseDate(value: any) {
    // TODO check for invalid dates
    if (!value) {
        return new Date();
    }
    if (value instanceof Date || typeof value === 'string' || typeof value === 'number') {
        return new Date(value);
    }
    throw new InvalidDateError();
}
