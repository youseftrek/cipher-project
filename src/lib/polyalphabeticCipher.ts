export function encryptPolyalphabetic(plainText: string, key: string): string {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let encryptedText = '';
  let keyIndex = 0;

  for (const char of plainText.toUpperCase()) {
    if (alphabet.includes(char)) {
      const charIndex = alphabet.indexOf(char);
      const keyChar = key[keyIndex % key.length].toUpperCase();
      const keyShift = alphabet.indexOf(keyChar);
      const encryptedChar = alphabet[(charIndex + keyShift) % 26];
      encryptedText += encryptedChar;
      keyIndex++;
    } else {
      encryptedText += char;
    }
  }

  return encryptedText;
}

export function decryptPolyalphabetic(cipherText: string, key: string): string {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let decryptedText = '';
  let keyIndex = 0;

  for (const char of cipherText.toUpperCase()) {
    if (alphabet.includes(char)) {
      const charIndex = alphabet.indexOf(char);
      const keyChar = key[keyIndex % key.length].toUpperCase();
      const keyShift = alphabet.indexOf(keyChar);
      const decryptedChar = alphabet[(charIndex - keyShift + 26) % 26];
      decryptedText += decryptedChar;
      keyIndex++;
    } else {
      decryptedText += char;
    }
  }

  return decryptedText;
}

