const profiles = {
  caesar: { category: 'Classic encryption', risk: 'Critical', note: 'Only 26 possible shifts. Anyone can brute-force it in seconds.' },
  vigenere: { category: 'Classic encryption', risk: 'Critical', note: 'A repeating keyword exposes patterns and is not safe against modern analysis.' },
  atbash: { category: 'Classic encryption', risk: 'Critical', note: 'There is no secret key; this is a fixed alphabet reversal.' },
  xor: { category: 'Reversible transformation', risk: 'Critical', note: 'Repeating-key XOR leaks patterns. It is not modern encryption.' },
  sha256: { category: 'One-way hashing', risk: 'Context dependent', note: 'Good for integrity checks, but raw SHA-256 is not password storage.' }
};

export default function SecurityInspector({ algorithm, key, text }) {
  const profile = profiles[algorithm];
  const keyHint = algorithm === 'vigenere' && key.length < 8 ? 'Use a longer keyword for the learning exercise—though it is still not secure.'
    : algorithm === 'xor' && key.length < 12 ? 'Short repeating keys make patterns even easier to detect.'
      : algorithm === 'caesar' ? 'Every shift has only 26 possible values.' : 'No key is used for this transformation.';
  return <aside className="inspector" aria-labelledby="inspector-title">
    <div><p className="eyebrow">SECURITY INSPECTOR</p><h3 id="inspector-title">Know the trade-off</h3></div>
    <dl><div><dt>Category</dt><dd>{profile.category}</dd></div><div><dt>Production risk</dt><dd className="risk">{profile.risk}</dd></div><div><dt>Input size</dt><dd>{text.length.toLocaleString()} characters</dd></div></dl>
    <p>{profile.note}</p><p className="inspector-tip"><strong>Key check:</strong> {keyHint}</p>
  </aside>;
}
