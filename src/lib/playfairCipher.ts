function createPlayfairMatrix(key: string): string[][] {
  const alphabet = "ABCDEFGHIKLMNOPQRSTUVWXYZ"; // 'J' is excluded
  const matrix: string[][] = Array(5)
    .fill(null)
    .map(() => Array(5).fill(""));
  const usedChars = new Set();

  let row = 0;
  let col = 0;

  // Fill the matrix with the key
  for (const char of key.toUpperCase().replace(/J/g, "I")) {
    if (!usedChars.has(char) && alphabet.includes(char)) {
      matrix[row][col] = char;
      usedChars.add(char);
      col++;
      if (col === 5) {
        col = 0;
        row++;
      }
    }
  }

  // Fill the remaining spaces with unused letters
  for (const char of alphabet) {
    if (!usedChars.has(char)) {
      matrix[row][col] = char;
      col++;
      if (col === 5) {
        col = 0;
        row++;
      }
    }
  }

  return matrix;
}

function findPosition(matrix: string[][], char: string): [number, number] {
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      if (matrix[i][j] === char) {
        return [i, j];
      }
    }
  }
  return [-1, -1]; // Return an invalid position if character not found
}

export function encryptPlayfair(plainText: string, key: string): string {
  const matrix = createPlayfairMatrix(key);
  // Replace 'J' with 'I' and handle spaces or non-alphabetic characters
  const text = plainText
    .toUpperCase()
    .replace(/J/g, "I")
    .replace(/[^A-Z]/g, "");

  // Split the text into digraphs (pairs of characters)
  const pairs: string[] = [];
  for (let i = 0; i < text.length; i += 2) {
    if (i + 1 < text.length && text[i] === text[i + 1]) {
      pairs.push(text[i] + "X"); // Insert 'X' if two characters are the same
      i--; // Move one step back to process the next character
    } else {
      pairs.push(text[i] + (i + 1 < text.length ? text[i + 1] : "X"));
    }
  }

  return pairs
    .map((pair) => {
      const [a, b] = pair.split("");
      const [rowA, colA] = findPosition(matrix, a);
      const [rowB, colB] = findPosition(matrix, b);

      if (rowA === rowB) {
        // Same row: shift columns to the right
        return matrix[rowA][(colA + 1) % 5] + matrix[rowB][(colB + 1) % 5];
      } else if (colA === colB) {
        // Same column: shift rows down
        return matrix[(rowA + 1) % 5][colA] + matrix[(rowB + 1) % 5][colB];
      } else {
        // Rectangle: swap columns
        return matrix[rowA][colB] + matrix[rowB][colA];
      }
    })
    .join("");
}

export function decryptPlayfair(cipherText: string, key: string): string {
  const matrix = createPlayfairMatrix(key);
  // Ensure the ciphertext only contains letters (i.e., no spaces or numbers)
  const text = cipherText.toUpperCase().replace(/[^A-Z]/g, "");

  const pairs = text.match(/[A-Z]{2}/g) || [];

  return pairs
    .map((pair) => {
      const [a, b] = pair.split("");
      const [rowA, colA] = findPosition(matrix, a);
      const [rowB, colB] = findPosition(matrix, b);

      if (rowA === rowB) {
        // Same row: shift columns to the left
        return (
          matrix[rowA][(colA - 1 + 5) % 5] + matrix[rowB][(colB - 1 + 5) % 5]
        );
      } else if (colA === colB) {
        // Same column: shift rows up
        return (
          matrix[(rowA - 1 + 5) % 5][colA] + matrix[(rowB - 1 + 5) % 5][colB]
        );
      } else {
        // Rectangle: swap columns
        return matrix[rowA][colB] + matrix[rowB][colA];
      }
    })
    .join("");
}
