# Shredlink TypeScript Example

This is a TypeScript example for the `shredlink-node-client@0.1.1` package, demonstrating how to subscribe to Solana transactions using the Shredlink service.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Build the TypeScript project:
```bash
npm run build
```

3. Run the compiled JavaScript:
```bash
npm start
```

**For development** (runs TypeScript directly without building):
```bash
npm run dev
```

## Configuration

Before running, make sure to:

1. Update the `shredlinkUrl` in `src/index.ts` with your actual Shredlink service URL
2. Join the Discord server for URL access: https://discord.gg/TR2pxMTz

## Example Output

When running, you'll see output like:
```
🚀 Connected to Shredlink, listening for new mints...
🪙 NEW MINT: ABC123... | TX HASH: DEF456...
🪙 NEW MINT: GHI789... | TX HASH: JKL012...
```