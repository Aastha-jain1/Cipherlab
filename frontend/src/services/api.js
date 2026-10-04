async function request(path, body) {
  const response = await fetch(`/api${path}`, { method: body ? 'POST' : 'GET', headers: body ? { 'Content-Type': 'application/json' } : undefined, body: body ? JSON.stringify(body) : undefined });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || 'Something went wrong.');
  return data;
}
export const encrypt = (body) => request('/cipher/encrypt', body);
export const decrypt = (body) => request('/cipher/decrypt', body);
export const hash = (body) => request('/hash', body);
export const getHistory = () => request('/history');
