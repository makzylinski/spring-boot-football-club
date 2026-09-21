const BASE = '/api/leagues';

async function handle(response) {
  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || `HTTP ${response.status}`);
  }
  // DELETE returns an empty body, so only parse when there is something to parse.
  return response.status === 204 ? null : response.json();
}

export function getLeagues() {
  return fetch(BASE).then(handle);
}

export function createLeague(league) {
  return fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(league),
  }).then(handle);
}

export function updateLeague(id, league) {
  return fetch(`${BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(league),
  }).then(handle);
}

export function deleteLeague(id) {
  return fetch(`${BASE}/${id}`, { method: 'DELETE' }).then(handle);
}
