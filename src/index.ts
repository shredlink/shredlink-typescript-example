import { 
  ShredlinkServiceClient,
  SubscribeTransactionsRequest,
  SubscribeRequestFilterTransactions,
  Transaction
} from 'shredlink-node-client';
import * as grpc from '@grpc/grpc-js';
import * as bs58 from 'bs58';

async function main(): Promise<void> {
  try {
    // Replace with your actual Shredlink URL
    const shredlinkUrl = 'localhost:50051'; // Ask url in ticket https://discord.gg/TR2pxMTz
    const credentials = grpc.credentials.createInsecure();
    const client = new ShredlinkServiceClient(shredlinkUrl, credentials);

    // TRANSACTIONS SUBSCRIBE EXAMPLE
    const request = pumpfunNewMintRequest();
    
    // Subscribe to transactions (bidirectional stream)
    const stream = client.subscribeTransactions();

    console.log('🚀 Connected to Shredlink, listening for new mints...');

    // Send subscription request
    stream.write(request);

    // Handle streaming responses
    stream.on('data', (response) => {
      if (response.getTransaction()?.getTransaction()) {
        const transaction = response.getTransaction()!.getTransaction()!;
        const signatures = transaction.getSignaturesList();
        if (signatures.length > 0) {
          const txHash = bs58.encode(signatures[0] as Uint8Array);
          const mintAddress = extractMintAddress(transaction);
          
          console.log(`🪙 NEW MINT: ${mintAddress || 'Unknown'} | TX HASH: ${txHash}`);
        }
      }
    });

    stream.on('error', (error) => {
      console.error('Stream error:', error);
    });

    stream.on('end', () => {
      console.log('Stream ended');
    });

    // ENTRIES SUBSCRIBE EXAMPLE (commented out like in Rust version)
    // const entriesStream = await client.subscribeEntries({});
    
    // for await (const slotEntry of entriesStream) {
    //   // Note: You'd need to implement bincode deserialization for TypeScript
    //   // or use a different serialization format
    //   console.log(`slot ${slotEntry.slot}, entries: ${slotEntry.entries.length}`);
    // }

  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

function pumpfunNewMintRequest() {
  const TARGET_MINT_AUTHORITY = 'TSLvdd1pWpHVjahSpsvCXUbgwsL3JAcvokwaKt1eokM';

  const request = new SubscribeTransactionsRequest();
  const filter = new SubscribeRequestFilterTransactions();
  
  filter.setAccountRequiredList([TARGET_MINT_AUTHORITY]);
  filter.setAccountIncludeList([]);
  filter.setAccountExcludeList([]);

  request.getTransactionsMap().set('pumpfun', filter);

  return request;
}

function extractMintAddress(transaction: any): string | undefined {
  const message = transaction.getMessage();
  if (message) {
    const accountKeys = message.getAccountKeysList();
    if (accountKeys.length > 1) {
      return bs58.encode(accountKeys[1] as Uint8Array);
    }
  }
  return undefined;
}

// Run the main function
main().catch(console.error); 