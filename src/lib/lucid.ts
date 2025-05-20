// src/utils/storeHash.ts
import { Lucid, Blockfrost, Data } from "lucid-cardano";
import dotenv from "dotenv";
import contract from "../../contracts/store-hash/plutus.json";

dotenv.config();

let lucid: Lucid | null = null;

/**
 * Initialize Lucid and wallet if not already initialized.
 */
async function getLucid(): Promise<Lucid> {
  if (!lucid) {
    lucid = await Lucid.new(
      new Blockfrost(
        process.env.BLOCKFROST_API_URL!,
        process.env.BLOCKFROST_API_KEY!
      ),
      process.env.NETWORK as "Mainnet" | "Preprod" | "Preview"
    );

    lucid.selectWalletFromPrivateKey(process.env.PRIVATE_KEY!);
  }

  return lucid;
}

/**
 * Store a hash on-chain using the Aiken smart contract.
 * @param value string to store as hash
 */
export async function storeHash(value: string): Promise<string> {
  const lucid = await getLucid();

  const hashBytes = Data.Bytes(new TextEncoder().encode(value) as any);

  const tx = await lucid
    .newTx()
    .payToContract(
      contract.validators[0].address,
      { inline: hashBytes as any },
      { scriptRef: contract.validators[0] }
    )
    .complete();

  const signedTx = await tx.sign().complete();
  const txHash = await signedTx.submit();

  return txHash;
}
