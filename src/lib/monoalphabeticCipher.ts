export function encryptMonoalphabetic(plainText: string, key: string): string {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const encryptedText = plainText
    .toUpperCase()
    .split('')
    .map(char => {
      const index = alphabet.indexOf(char);
      return index !== -1 ? key[index] : char;
    })
    .join('');

  return encryptedText;
}

export function decryptMonoalphabetic(cipherText: string, key: string): string {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const decryptedText = cipherText
    .toUpperCase()
    .split('')
    .map(char => {
      const index = key.indexOf(char);
      return index !== -1 ? alphabet[index] : char;
    })
    .join('');

  return decryptedText;
}

