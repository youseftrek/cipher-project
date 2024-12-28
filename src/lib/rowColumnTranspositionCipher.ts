export function encryptRowColumnTransposition(plainText: string, key: string): string {
  const keyOrder = key.split('').map((_, i) => i).sort((a, b) => key[a].localeCompare(key[b]));
  const columns = key.length;
  const rows = Math.ceil(plainText.length / columns);
  const matrix: string[][] = Array(rows).fill(null).map(() => Array(columns).fill(''));

  let index = 0;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      if (index < plainText.length) {
        matrix[i][j] = plainText[index++];
      } else {
        matrix[i][j] = 'X'; // Padding
      }
    }
  }

  let cipherText = '';
  for (const col of keyOrder) {
    for (let row = 0; row < rows; row++) {
      cipherText += matrix[row][col];
    }
  }

  return cipherText;
}

export function decryptRowColumnTransposition(cipherText: string, key: string): string {
  const keyOrder = key.split('').map((_, i) => i).sort((a, b) => key[a].localeCompare(key[b]));
  const columns = key.length;
  const rows = Math.ceil(cipherText.length / columns);
  const matrix: string[][] = Array(rows).fill(null).map(() => Array(columns).fill(''));

  let index = 0;
  for (const col of keyOrder) {
    for (let row = 0; row < rows; row++) {
      if (index < cipherText.length) {
        matrix[row][col] = cipherText[index++];
      }
    }
  }

  let plainText = '';
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      if (matrix[i][j] !== 'X') {
        plainText += matrix[i][j];
      }
    }
  }

  return plainText;
}

