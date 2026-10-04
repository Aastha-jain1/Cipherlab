import { useState } from 'react';
import CipherTool from './components/CipherTool.jsx';
import AlgorithmInfo from './components/AlgorithmInfo.jsx';
import History from './components/History.jsx';

export default function App() {
  const [refresh, setRefresh] = useState(0);
  return <><a className="skip-link" href="#main-content">Skip to main content</a><header><a className="brand" href="#home">CIPHER<span>LAB</span></a><nav aria-label="Main navigation"><a href="#tool">Tool</a><a href="#learn">Learn</a><a href="#history">History</a></nav></header><main id="main-content"><section id="home" className="hero"><p className="eyebrow">CRYPTOGRAPHY LEARNING WORKBENCH</p><h1>Encrypt. Decrypt.<br/><em>Understand.</em></h1><p>Explore classic ciphers and SHA-256 in a clear, hands-on lab. Built for learning—not for protecting sensitive information.</p><a className="button-link" href="#tool">Start encrypting ↓</a></section><CipherTool onComplete={() => setRefresh((value) => value + 1)} /><AlgorithmInfo /><History refresh={refresh} /></main><footer>CipherLab · Educational cryptography tools · Do not use classic ciphers to secure real data.</footer></>;
}
