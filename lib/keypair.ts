export function getKeypairFromEnvironment(variableName: string = 'PRIVATE_KEY') {
  const privateKey = process.env[variableName];

  if (!privateKey) {
    throw new Error(`Environment variable ${variableName} not found`);
  }

  // TODO: try parsing from base58 string to Uint8Array
  // TODO: if not base58, try parsing from json string of Uint8Array
  // TODO: use createKeyPairFromBytes to create keypair from Uint8Array
}
