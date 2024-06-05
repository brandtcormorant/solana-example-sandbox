import { getBase58Codec } from "@solana/codecs";
import { createKeyPairFromBytes } from "@solana/keys";

const codec = getBase58Codec();

export async function getKeypairFromEnvironment(variableName: string = 'PRIVATE_KEY'): Promise<CryptoKeyPair> {
  const privateKey = process.env[variableName];

  if (!privateKey) {
    throw new Error(`Environment variable ${variableName} not found`);
  }

  return getKeypairFromPrivateKey(privateKey);
}

export async function getKeypairFromPrivateKey(privateKey: string): Promise<CryptoKeyPair> {
  let decodedPrivateKey
console.log('string to bytes', privateKey)
  try {
    decodedPrivateKey = new Uint8Array(codec.encode(privateKey))
  } catch (error) {
    console.error(`Error decoding private key: ${error}`)
  }
console.log('first one?', decodedPrivateKey)
  if (!decodedPrivateKey) {
    const json = JSON.parse(privateKey)
    decodedPrivateKey = Uint8Array.from(json)
  }    
  console.log('second one?', decodedPrivateKey)

  if (decodedPrivateKey) {
    return createKeyPairFromBytes(decodedPrivateKey)
  }
  
  throw new Error('Invalid private key')
}
