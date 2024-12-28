export function encryptRailFence(plainText: string, rails: number): string {
  const fence: string[][] = Array(rails).fill(null).map(() => []);
  let rail = 0;
  let direction = 1;

  for (const char of plainText) {
    fence[rail].push(char);
    rail += direction;

    if (rail === 0 || rail === rails - 1) {
      direction *= -1;
    }
  }

  return fence.flat().join('');
}

export function decryptRailFence(cipherText: string, rails: number): string {
  const fence: string[][] = Array(rails).fill(null).map(() => []);
  let rail = 0;
  let direction = 1;

  // Mark positions in the fence
  for (let i = 0; i < cipherText.length; i++) {
    fence[rail][i] = '*';
    rail += direction;

    if (rail === 0 || rail === rails - 1) {
      direction *= -1;
    }
  }

  // Fill the fence with ciphertext characters
  let index = 0;
  for (let i = 0; i < rails; i++) {
    for (let j = 0; j < cipherText.length; j++) {
      if (fence[i][j] === '*' && index < cipherText.length) {
        fence[i][j] = cipherText[index++];
      }
    }
  }

  // Read off the plaintext
  let plainText = '';
  rail = 0;
  direction = 1;

  for (let i = 0; i < cipherText.length; i++) {
    plainText += fence[rail][i];
    rail += direction;

    if (rail === 0 || rail === rails - 1) {
      direction *= -1;
    }
  }

  return plainText;
}

