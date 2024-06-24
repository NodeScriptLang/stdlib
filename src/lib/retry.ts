export interface RetryOptions {
    retries?: number;
    initialDelay?: number;
    maxDelay?: number;
}

export async function withRetry<T>(asyncFn: () => Promise<T>, opts: RetryOptions = {}): Promise<T> {
    const retries = opts.retries ?? 1;
    const initialDelay = opts.initialDelay ?? 500;
    const maxDelay = opts.initialDelay ?? 5000;
    const maxAttempts = 1 + (Math.min(Math.max(retries, 0), 10) || 0);
    let lastError = null;
    let delay = initialDelay;
    for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
        try {
            return await asyncFn();
        } catch (error: any) {
            lastError = error;
            // Retry only on 5xx and connection errors
            if (error.status >= 500) {
                await new Promise(r => setTimeout(r, delay));
                delay = Math.max(delay * 2, maxDelay);
            } else {
                break;
            }
        }
    }
    throw lastError;
}
