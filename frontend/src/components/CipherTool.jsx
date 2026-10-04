import { useState } from 'react';
import { decrypt, encrypt, hash } from '../services/api.js';
import SecurityInspector from './SecurityInspector.jsx';

const labels = { caesar: 'Shift (0–25)', vigenere: 'Keyword (letters only)', atbash: 'No key needed', xor: 'XOR key', sha256: 'No key needed' };

export default function CipherTool({ onComplete }) {
  const [text, setText] = useState(''); const [algorithm, setAlgorithm] = useState('caesar'); const [key, setKey] = useState('3');
  const [result, setResult] = useState(''); const [error, setError] = useState(''); const [notice, setNotice] = useState(''); const [loading, setLoading] = useState(false);
  const isHash = algorithm === 'sha256'; const keyRequired = !['atbash', 'sha256'].includes(algorithm);
  const clearMessages = () => { setError(''); setNotice(''); };
  const changeAlgorithm = (value) => { setAlgorithm(value); setKey(value === 'caesar' ? '3' : ''); setResult(''); clearMessages(); };
  const updateText = (value) => { setText(value); setResult(''); clearMessages(); };
  const run = async (operation) => { clearMessages(); setLoading(true); try { const data = operation === 'hash' ? await hash({ text }) : await (operation === 'encrypt' ? encrypt : decrypt)({ text, algorithm, key }); setResult(data.result); setNotice(operation === 'hash' ? 'Hash generated successfully.' : `Text ${operation}ed successfully.`); onComplete(); } catch (err) { setError(err.message); } finally { setLoading(false); } };
  const copy = async () => { try { await navigator.clipboard.writeText(result); setNotice('Copied result to clipboard.'); } catch { setError('Clipboard access was not available. Select and copy the result manually.'); } };
  const swap = () => { const oldText = text; setText(result); setResult(oldText); clearMessages(); };
  return <section id="tool" className="section tool-section"><p className="eyebrow">INTERACTIVE LAB</p><h2>Transform your text</h2><div className="tool-layout"><div className="tool-card">
    <label htmlFor="algorithm">Algorithm</label><select id="algorithm" value={algorithm} onChange={(event) => changeAlgorithm(event.target.value)}><option value="caesar">Caesar Cipher</option><option value="vigenere">Vigenère Cipher</option><option value="atbash">Atbash Cipher</option><option value="xor">XOR Cipher</option><option value="sha256">SHA-256 Hash</option></select>
    <label htmlFor="input">{isHash ? 'Text to hash' : 'Input text'}</label><textarea id="input" value={text} onChange={(event) => updateText(event.target.value)} placeholder="Type or paste text here…" maxLength="10000" aria-describedby="input-help" /><p id="input-help" className="field-help">Up to 10,000 characters. Your text is processed by the API and is never saved to history.</p>
    {keyRequired ? <><label htmlFor="key">{labels[algorithm]}</label><input id="key" value={key} onChange={(event) => { setKey(event.target.value); setResult(''); clearMessages(); }} inputMode={algorithm === 'caesar' ? 'numeric' : 'text'} /></> : <p className="key-note">{labels[algorithm]}</p>}
    <div className="actions">{isHash ? <button onClick={() => run('hash')} disabled={loading}>{loading ? 'Generating…' : 'Generate Hash'}</button> : <><button onClick={() => run('encrypt')} disabled={loading}>{loading ? 'Working…' : 'Encrypt'}</button><button className="secondary" onClick={() => run('decrypt')} disabled={loading}>Decrypt</button></>}<button className="ghost" onClick={() => { setText(''); setResult(''); clearMessages(); }}>Clear</button></div>
    {error && <div role="alert" className="error">{error}</div>}{notice && <div role="status" className="notice">{notice}</div>}
    <label htmlFor="result">Result</label><textarea id="result" value={result} readOnly placeholder="Your result appears here." aria-live="polite" /><div className="result-actions"><button className="secondary" onClick={copy} disabled={!result}>Copy result</button><button className="secondary" onClick={swap} disabled={!result || isHash}>Swap input/output</button></div>
    {algorithm === 'xor' && <p className="warning"><strong>Learning only:</strong> basic repeating-key XOR is not secure for real secrets.</p>}{isHash && <p className="warning"><strong>One-way:</strong> SHA-256 is hashing, not encryption, and cannot be decrypted.</p>}
  </div><SecurityInspector algorithm={algorithm} key={key} text={text} /></div></section>;
}
