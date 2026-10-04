const info = [
  ['Caesar Cipher', 'Encryption', 'Moves each letter by a fixed number of positions. HELLO + 3 becomes KHOOR.', 'Very easy to break by trying 26 shifts. Use only for learning.'],
  ['Vigenère Cipher', 'Encryption', 'Uses a repeating word as shifting positions, so each letter can move differently.', 'Historically important, but vulnerable to modern analysis. Use only for learning.'],
  ['Atbash Cipher', 'Encryption', 'Reverses the alphabet: A ↔ Z, B ↔ Y. The same operation encrypts and decrypts.', 'A fixed substitution with no key; not suitable for protecting data.'],
  ['XOR Cipher', 'Encryption', 'Combines each byte with a repeating key using XOR. CipherLab returns Base64 ciphertext.', 'A reusable XOR key is not modern secure encryption. Never use it for secrets.'],
  ['SHA-256', 'Hashing', 'A one-way cryptographic hash that produces a fixed 64-character digest.', 'Hashes cannot be decrypted. Password storage needs a salted, slow password-hashing algorithm instead.']
];
export default function AlgorithmInfo() { return <section id="learn" className="section"><p className="eyebrow">LEARN THE BASICS</p><h2>Know what each tool does</h2><div className="info-grid">{info.map(([name, type, works, warning]) => <article className="info-card" key={name}><span className={type === 'Hashing' ? 'tag hash' : 'tag'}>{type}</span><h3>{name}</h3><p>{works}</p><p className="warning"><strong>Limit:</strong> {warning}</p></article>)}</div></section>; }
