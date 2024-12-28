export function encryptOnePad(plainText: string, key: string): string {
  if (plainText.length !== key.length) {
    throw new Error("Key must be the same length as the plain text");
  }

  const encryptedText = plainText
    .toUpperCase()
    .split('')
    .map((char, index) => {
      if (char.match(/[A-Z]/)) {
        const plainCode = char.charCodeAt(0) - 65;
        const keyCode = key[index].toUpperCase().charCodeAt(0) - 65;
        return String.fromCharCode(((plainCode + keyCode) % 26) + 65);
      }
      return char;
    })
    .join('');

  return encryptedText;
}

export function decryptOnePad(cipherText: string, key: string): string {
  if (cipherText.length !== key.length) {
    throw new Error("Key must be the same length as the cipher text");
  }

  const decryptedText = cipherText
    .toUpperCase()
    .split('')
    .map((char, index) => {
      if (char.match(/[A-Z]/)) {
        const cipherCode = char.charCodeAt(0) - 65;
        const keyCode = key[index].toUpperCase().charCodeAt(0) - 65;
        return String.fromCharCode(((cipherCode - keyCode + 26) % 26) + 65);
      }
      return char;
    })
    .join('');

  return decryptedText;
}

