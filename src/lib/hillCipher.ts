function validateKey(key: number[]): boolean {
  const size = Math.sqrt(key.length);
  return size % 1 === 0; // Ensures the key forms a square matrix
}

function modInverse(a: number, m: number): number {
  for (let x = 1; x < m; x++) {
    if ((a * x) % m === 1) return x;
  }
  return -1;
}

function matrixInverse(key: number[], size: number): number[] | null {
  const determinant = calculateDeterminant(key, size);
  const determinantMod = determinant % 26;
  const inverseDet = modInverse(determinantMod, 26);

  if (inverseDet === -1) return null;

  const adjugate = adjugateMatrix(key, size);
  return adjugate.map((val) => (val * inverseDet + 26) % 26);
}

function calculateDeterminant(matrix: number[], size: number): number {
  if (size === 2) {
    return matrix[0] * matrix[3] - matrix[1] * matrix[2];
  }
  // Extend this for larger matrices if needed
  throw new Error(
    "Determinant calculation for larger matrices is not implemented"
  );
}

function adjugateMatrix(matrix: number[], size: number): number[] {
  if (size === 2) {
    return [matrix[3], -matrix[1], -matrix[2], matrix[0]];
  }
  // Extend this for larger matrices if needed
  throw new Error(
    "Adjugate calculation for larger matrices is not implemented"
  );
}

function multiplyMatrix(
  matrix: number[],
  vector: number[],
  size: number
): number[] {
  const result = Array(size).fill(0);
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      result[i] += matrix[i * size + j] * vector[j];
    }
    result[i] %= 26;
  }
  return result;
}

function chunkString(str: string, size: number): string[] {
  const chunks = [];
  for (let i = 0; i < str.length; i += size) {
    chunks.push(str.slice(i, i + size));
  }
  return chunks;
}

function encryptHill(text: string, key: number[]): string {
  const size = Math.sqrt(key.length);
  const paddedText = text.padEnd(Math.ceil(text.length / size) * size, "X");
  const chunks = chunkString(paddedText, size);
  const result: string[] = [];

  chunks.forEach((chunk) => {
    const vector = chunk.split("").map((char) => char.charCodeAt(0) - 65);
    const encryptedVector = multiplyMatrix(key, vector, size);
    result.push(
      encryptedVector.map((value) => String.fromCharCode(value + 65)).join("")
    );
  });

  return result.join("");
}

function decryptHill(text: string, key: number[]): string {
  const size = Math.sqrt(key.length);
  const inverseKey = matrixInverse(key, size);

  if (!inverseKey) {
    throw new Error("Matrix inverse not possible for the given key.");
  }

  const chunks = chunkString(text, size);
  const result: string[] = [];

  chunks.forEach((chunk) => {
    const vector = chunk.split("").map((char) => char.charCodeAt(0) - 65);
    const decryptedVector = multiplyMatrix(inverseKey, vector, size);
    result.push(
      decryptedVector
        .map((value) => String.fromCharCode(((value + 26) % 26) + 65))
        .join("")
    );
  });

  return result.join("");
}

export { validateKey, encryptHill, decryptHill };
