import dotenv from 'dotenv';
dotenv.config(); // For loading environment variables from .env file in development mode
export default function getEnv(name: string): string {
    // eslint-disable-next-line no-process-env
    if (process.env[name]) return process.env[name]!;

    const error = new Error(`Missing environment variable found: ${name}`);
    console.error(error);
    process.exit(1);
}
