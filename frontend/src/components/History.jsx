import { useEffect, useState } from 'react';
import { getHistory } from '../services/api.js';
export default function History({ refresh }) {
  const [operations, setOperations] = useState([]); const [message, setMessage] = useState('');
  useEffect(() => { getHistory().then(({ operations }) => setOperations(operations)).catch(() => setMessage('History is available when the API and PostgreSQL are configured.')); }, [refresh]);
  return <section id="history" className="section"><p className="eyebrow">PRIVATE BY DESIGN</p><h2>Operation history</h2><p>Only safe metadata is stored—never your text, results, or keys.</p>{message && <p className="muted">{message}</p>}{operations.length ? <div className="history">{operations.map((item) => <div key={item.id} className="history-row"><strong>{item.algorithm}</strong><span>{item.operation}</span><span>{item.inputLength} → {item.outputLength} characters</span><time>{new Date(item.createdAt).toLocaleString()}</time></div>)}</div> : !message && <div className="empty">No saved operations yet. Configure PostgreSQL to enable shared metadata history.</div>}</section>;
}
