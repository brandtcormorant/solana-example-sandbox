import { getBase58Codec } from "@solana/codecs";

const codec = getBase58Codec();

// In the new version of @solana/keys, the generateKeyPair function is now an async function
// We would use it like this:
// const keypairExample = await generateKeyPair();

// However, the secret key can not be exported, so we can't log it
// This is a useful security feature enabled by the WebCrypto API
// and enforced by the new version of @solana/keys https://github.com/solana-labs/solana-web3.js/blob/master/packages/keys/src/key-pair.ts#L16

// Not having access to the secret key makes providing a secure environment for the keypair easier,
// as the secret key can't be accidentally logged or exposed to the wrong parties.
// However, it also means that the secret key can't be used in the browser, as it can't be exported.
// In that case, the secret key should be created separately and stored securely, then imported.

// To be able to generate a private key and its base58 encoding, we create an extractable keypair using the WebCrypto API:
const keypair = await crypto.subtle.generateKey('Ed25519', true, ['sign', 'verify']);

// To get the public & private keys we export them to ArrayBuffer then transform them to Uint8Array
const publicKeyData = await crypto.subtle.exportKey('raw', keypair.publicKey);
const privateKeyData = await crypto.subtle.exportKey('pkcs8', keypair.privateKey);

const publicKey = new Uint8Array(publicKeyData)
const privateKey = new Uint8Array(privateKeyData)

// We can now convert the keys to a base58 string
console.log(`The public key is:`, codec.decode(publicKey));
console.log(`The private key is:`, codec.decode(privateKey));
console.log(`✅ Finished!`);

// To learn more about the WebCrypto API, visit the MDN Web Docs:
// https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API
