import { Environment, Paddle } from "@paddle/paddle-node-sdk";

const apiKey = process.env.PADDLE_API_KEY;
const env = process.env.PADDLE_ENV === "production"
  ? Environment.production
  : Environment.sandbox;

let cached: Paddle | null = null;

export function getPaddle(): Paddle {
  if (!apiKey) {
    throw new Error("PADDLE_API_KEY is not set");
  }
  if (!cached) {
    cached = new Paddle(apiKey, { environment: env });
  }
  return cached;
}
