import crypto from "crypto";
import { getEnvVar } from "../processor";
import { AESConfig } from "./encryptor.constants";
class Encrypt {
  constructor() {}

  private formatCipher(
    cipher: crypto.Cipher,
    data: string,
    inputFormat: crypto.Encoding,
    outputFormat: crypto.Encoding
  ): string {
    return (
      cipher.update(data, inputFormat, outputFormat) +
      cipher.final(outputFormat)
    );
  }

  encrypt(data: string): string {
    const cipher = crypto.createCipheriv(
      AESConfig.name,
      AESConfig.key,
      AESConfig.initVector
    );

    return this.formatCipher(
      cipher,
      data,
      AESConfig.cipherFormat,
      AESConfig.outputFormat
    );
  }

  decrypt(encryptedData: string): string {
    const decipher = crypto.createDecipheriv(
      AESConfig.name,
      AESConfig.key,
      AESConfig.initVector
    );

    return this.formatCipher(
      decipher,
      encryptedData,
      AESConfig.outputFormat,
      AESConfig.cipherFormat
    );
  }

  decryptClientEncryption(encryptedData: string): string {
    return crypto
      .privateDecrypt(
        {
          key: getEnvVar("RSA_PRIVATE_KEY"),
          padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
          oaepHash: "sha256",
        },
        Buffer.from(encryptedData)
      )
      .toString();
  }
}

const Encryptor = new Encrypt();
export default Encryptor;
