const crypto = require('crypto');
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
});

//sign
const sign = crypto.createSign('SHA256');
sign.update('IBM internship');
sign.end();
const signature = sign.sign(privateKey);

//verify
const verify = crypto.createVerify('SHA256');
verify.update('IBM internship');
verify.end();
console.log("Verify the value : " + verify.verify(publicKey, signature));
// Prints: true or false


//encrypt
const encrypt = (data) => {
 let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
 let encrypted = cipher.update(data);
 encrypted = Buffer.concat([encrypted, cipher.final()]);
 return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
}

//decrypt
const decrypt = (data) => {
 let iv = Buffer.from(data.iv, 'hex');
 let encryptedText = Buffer.from(data.encryptedData, 'hex');
 let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
 let decrypted = decipher.update(encryptedText);
 decrypted = Buffer.concat([decrypted, decipher.final()]);
 return decrypted.toString();
}

const hw = encrypt("Hello Sir");
console.log(hw);
console.log(decrypt(hw));