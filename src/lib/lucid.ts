import { Lucid, Blockfrost, Data, fromHex } from "lucid-cardano";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

let lucid: Lucid;

export async function initLucid() {
  lucid = await Lucid.new(
    new Blockfrost(
      process.env.BLOCKFROST_API_URL!,
      process.env.BLOCKFROST_API_KEY!
    ),
    process.env.NETWORK as "Mainnet" | "Preprod" | "Preview"
  );

  // Load wallet from private key or seed
  lucid.selectWalletFromPrivateKey(process.env.PRIVATE_KEY!);

  return lucid;
}
