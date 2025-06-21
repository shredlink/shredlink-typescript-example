# Shredlink TypeScript Example

This is a TypeScript example for the `shredlink-node-client@0.1.1` package, demonstrating how to subscribe to Solana transactions using the Shredlink service.

## Setup

1. Install dependencies:
```bash
npm install
```

3. Run the example:
```bash
npm start
```

Or run directly with ts-node:
```bash
npm run dev
```

## Configuration

Before running, make sure to:

1. Update the `shredlinkUrl` in `src/index.ts` with your actual Shredlink service URL
2. Join the Discord server for URL access: https://discord.gg/sskBrcfX

## Example Output

When running, you'll see output like:
```
🚀 Connected to Shredlink, listening for new mints...
🪙 NEW MINT: ABC123... | TX HASH: DEF456...
🪙 NEW MINT: GHI789... | TX HASH: JKL012...
```