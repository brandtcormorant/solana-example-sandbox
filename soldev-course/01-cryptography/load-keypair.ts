import 'dotenv/config'
import { getKeypairFromEnvironment, getKeypairFromPrivateKey } from '../../lib/keypair';

const PRIVATE_KEY = process.env.PRIVATE_KEY;

if (!PRIVATE_KEY) {
  throw new Error('Environment variable PRIVATE_KEY not found');
}

const keypairFromEnv = await getKeypairFromEnvironment('PRIVATE_KEY');
const keypairFromPrivateKey = await getKeypairFromPrivateKey(PRIVATE_KEY);

const data = new Uint8Array([1, 2, 3, 4, 5]);
const signatureFromEnv = await crypto.subtle.sign('Ed25519', keypairFromEnv.privateKey, data);
const signatureFromPrivateKey = await crypto.subtle.sign('Ed25519', keypairFromPrivateKey.privateKey, data);

console.log(`The signature from the environment keypair is:`, new Uint8Array(signatureFromEnv));
console.log(`The signature from the private key is:`, new Uint8Array(signatureFromPrivateKey));

const verifiedFromEnv = await crypto.subtle.verify('Ed25519', keypairFromEnv.publicKey, signatureFromPrivateKey, data);
const verifiedFromPrivateKey = await crypto.subtle.verify('Ed25519', keypairFromPrivateKey.publicKey, signatureFromEnv, data);

console.log(`The signature from the environment keypair is verified:`, verifiedFromEnv);
console.log(`The signature from the private key is verified:`, verifiedFromPrivateKey);
