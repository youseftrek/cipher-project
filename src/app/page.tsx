"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BookLock } from "lucide-react";
import { decryptOnePad, encryptOnePad } from "@/lib/onePadCipher";
import { decryptHill, encryptHill, validateKey } from "@/lib/hillCipher";
import {
  decryptMonoalphabetic,
  encryptMonoalphabetic,
} from "@/lib/monoalphabeticCipher";
import {
  decryptPolyalphabetic,
  encryptPolyalphabetic,
} from "@/lib/polyalphabeticCipher";
import { decryptRailFence, encryptRailFence } from "@/lib/railFenceCipher";
import { decryptPlayfair, encryptPlayfair } from "@/lib/playfairCipher";
import {
  decryptRowColumnTransposition,
  encryptRowColumnTransposition,
} from "@/lib/rowColumnTranspositionCipher";

const cipherDescriptions = {
  onePad: "Encrypts each character with a unique key character.",
  hill: "Uses matrix multiplication for encryption and decryption.",
  monoalphabetic: "Substitutes each letter with another based on a fixed key.",
  polyalphabetic: "Uses multiple substitution alphabets based on a keyword.",
  railFence: "Writes the message in a zigzag pattern and reads off in rows.",
  playfair: "Uses a 5x5 matrix of letters for encrypting pairs of letters.",
  rowColumnTransposition: "Rearranges the order of characters based on a key.",
};

export default function CipherTool() {
  const [selectedCipher, setSelectedCipher] = useState("onePad");
  const [inputText, setInputText] = useState("");
  const [dynamicKey, setDynamicKey] = useState<string | string[]>("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setDynamicKey(selectedCipher === "hill" ? "" : "");
  }, [selectedCipher]);

  const handleEncrypt = () => {
    setError("");
    try {
      let encryptedText = "";
      switch (selectedCipher) {
        case "onePad":
          encryptedText = encryptOnePad(inputText, dynamicKey as string);
          break;
        case "hill":
          const hillKey = (dynamicKey as string).split(",").map(Number);
          if (!validateKey(hillKey)) {
            throw new Error(
              "Invalid Hill Cipher key. Please ensure it forms a valid square matrix."
            );
          }
          encryptedText = encryptHill(inputText, hillKey);
          break;
        case "monoalphabetic":
          encryptedText = encryptMonoalphabetic(
            inputText,
            dynamicKey as string
          );
          break;
        case "polyalphabetic":
          encryptedText = encryptPolyalphabetic(
            inputText,
            dynamicKey as string
          );
          break;
        case "railFence":
          encryptedText = encryptRailFence(
            inputText,
            parseInt(dynamicKey as string)
          );
          break;
        case "playfair":
          encryptedText = encryptPlayfair(inputText, dynamicKey as string);
          break;
        case "rowColumnTransposition":
          encryptedText = encryptRowColumnTransposition(
            inputText,
            dynamicKey as string
          );
          break;
      }
      setResult(encryptedText);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleDecrypt = () => {
    setError("");
    try {
      let decryptedText = "";
      switch (selectedCipher) {
        case "onePad":
          decryptedText = decryptOnePad(inputText, dynamicKey as string);
          break;
        case "hill":
          const hillKey = (dynamicKey as string).split(",").map(Number);
          if (!validateKey(hillKey)) {
            throw new Error(
              "Invalid Hill Cipher key. Please ensure it forms a valid square matrix."
            );
          }
          decryptedText = decryptHill(inputText, hillKey);
          break;
        case "monoalphabetic":
          decryptedText = decryptMonoalphabetic(
            inputText,
            dynamicKey as string
          );
          break;
        case "polyalphabetic":
          decryptedText = decryptPolyalphabetic(
            inputText,
            dynamicKey as string
          );
          break;
        case "railFence":
          decryptedText = decryptRailFence(
            inputText,
            parseInt(dynamicKey as string)
          );
          break;
        case "playfair":
          decryptedText = decryptPlayfair(inputText, dynamicKey as string);
          break;
        case "rowColumnTransposition":
          decryptedText = decryptRowColumnTransposition(
            inputText,
            dynamicKey as string
          );
          break;
      }
      setResult(decryptedText);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const renderKeyInput = () => {
    switch (selectedCipher) {
      case "onePad":
        return (
          <Input
            id="key"
            value={dynamicKey as string}
            onChange={(e) => setDynamicKey(e.target.value)}
            placeholder="Enter key (same length as input)"
          />
        );
      case "hill":
        return (
          <div className="space-y-2">
            <Input
              id="key"
              value={dynamicKey as string}
              onChange={(e) => setDynamicKey(e.target.value)}
              placeholder="Enter key numbers separated by commas (e.g., 1,2,3,4 for 2x2 matrix)"
            />
            <p className="text-gray-500 text-sm">
              Enter a square matrix of numbers (e.g., 4 numbers for 2x2, 9 for
              3x3)
            </p>
          </div>
        );
      case "monoalphabetic":
        return (
          <Input
            id="key"
            value={dynamicKey as string}
            onChange={(e) => setDynamicKey(e.target.value)}
            placeholder="Enter permutation of the alphabet"
          />
        );
      case "polyalphabetic":
        return (
          <Input
            id="key"
            value={dynamicKey as string}
            onChange={(e) => setDynamicKey(e.target.value)}
            placeholder="Enter repeating key string"
          />
        );
      case "railFence":
        return (
          <Input
            id="key"
            type="number"
            value={dynamicKey as string}
            onChange={(e) => setDynamicKey(e.target.value)}
            placeholder="Enter number of rails"
          />
        );
      case "playfair":
        return (
          <Input
            id="key"
            value={dynamicKey as string}
            onChange={(e) => setDynamicKey(e.target.value)}
            placeholder="Enter 5x5 matrix key"
          />
        );
      case "rowColumnTransposition":
        return (
          <Input
            id="key"
            value={dynamicKey as string}
            onChange={(e) => setDynamicKey(e.target.value)}
            placeholder="Enter column order"
          />
        );
      default:
        return null;
    }
  };

  return (
    <Card className="justify-center items-center bg-secondary/20 mx-auto w-full max-w-3xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <BookLock className="text-primary" /> Cipher Tool
        </CardTitle>
        <CardDescription>
          Encrypt and decrypt messages using various cipher algorithms
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="cipher-select">Select Cipher Algorithm</Label>
            <Select onValueChange={setSelectedCipher} value={selectedCipher}>
              <SelectTrigger id="cipher-select">
                <SelectValue placeholder="Select a cipher" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="onePad">One-Time Pad</SelectItem>
                <SelectItem value="hill">Hill Cipher</SelectItem>
                <SelectItem value="monoalphabetic">
                  Monoalphabetic Cipher
                </SelectItem>
                <SelectItem value="polyalphabetic">
                  Polyalphabetic Cipher
                </SelectItem>
                <SelectItem value="railFence">Rail Fence Cipher</SelectItem>
                <SelectItem value="playfair">Playfair Cipher</SelectItem>
                <SelectItem value="rowColumnTransposition">
                  Row Column Transposition Cipher
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          {
            <p className="text-muted-foreground text-sm">
              {
                cipherDescriptions[
                  selectedCipher as keyof typeof cipherDescriptions
                ]
              }
            </p>
          }

          <div>
            <Label htmlFor="input-text">Input Text</Label>
            <Input
              id="input-text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter text to encrypt or decrypt"
            />
          </div>

          <div>
            <Label htmlFor="key">Key</Label>
            {renderKeyInput()}
          </div>

          <div className="flex space-x-2">
            <Button onClick={handleEncrypt}>Encrypt</Button>
            <Button onClick={handleDecrypt}>Decrypt</Button>
          </div>

          {error && <div className="text-red-500">{error}</div>}

          {result && (
            <div>
              <Label htmlFor="result">Result</Label>
              <Input id="result" value={result} readOnly />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
