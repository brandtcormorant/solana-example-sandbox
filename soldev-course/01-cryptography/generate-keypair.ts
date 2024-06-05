import { getBase58Codec } from "@solana/codecs";

const codec = getBase58Codec();

// In the new version of @solana/keys, the generateKeyPair function is now an async function
// We would use it like this:
// const keypairExample = await generateKeyPair();

// However, the private key can not be exported, so we can't log it
// This is a useful security feature enabled by the WebCrypto API
// and enforced by the new version of @solana/keys https://github.com/solana-labs/solana-web3.js/blob/master/packages/keys/src/key-pair.ts#L16

// Not having access to the private key makes providing a secure environment for the keypair easier,
// as the private key can't be accidentally logged or exposed to the wrong parties.
// However, it also means that the private key can't be used to do things like generate a 12 words mnemonic.
// In that case, the keypair should be created separately and stored securely, then imported.

// To be able to generate a private key and its base58 encoding, we create an extractable keypair using the WebCrypto API:
const keypair = await crypto.subtle.generateKey("Ed25519", true, ["sign", "verify"]);

// To get the public & private keys we export them to ArrayBuffer then transform them to Uint8Array
const publicKeyData = await crypto.subtle.exportKey("raw", keypair.publicKey);
const privateKeyData = await crypto.subtle.exportKey("pkcs8", keypair.privateKey);

const publicKey = new Uint8Array(publicKeyData);
const privateKey = new Uint8Array(privateKeyData).slice(16);

console.log("The public key is:", publicKey, publicKey.length);
console.log("The private key is:", privateKey, privateKey.length);

// We can now convert the keys to a base58 string using the codec
const publicKeyBase58 = codec.decode(publicKey);
const privateKeyBase58 = codec.decode(privateKey);
const fullKey = codec.decode(new Uint8Array([...privateKey, ...publicKey]));

console.log("The public key is:", publicKeyBase58, publicKeyBase58.length);
console.log("The private key is:", privateKeyBase58, privateKeyBase58.length);
console.log("Full key", fullKey);

// To learn more about the WebCrypto API, visit the MDN Web Docs:
// https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API
