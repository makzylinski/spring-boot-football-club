async function handle(response) {
  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || `HTTP ${response.status}`);
  }
  // DELETE returns an empty body, so only parse when there is something to parse.
  return response.status === 204 ? null : response.json();
}

function send(url, method, body) {
  return fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }).then(handle);
}

/* ---------- leagues ---------- */

export function getLeagues() {
  return fetch('/api/leagues').then(handle);
}

export function createLeague(league) {
  return send('/api/leagues', 'POST', league);
}

export function updateLeague(id, league) {
  return send(`/api/leagues/${id}`, 'PUT', league);
}

export function deleteLeague(id) {
  return fetch(`/api/leagues/${id}`, { method: 'DELETE' }).then(handle);
}

/* ---------- teams ---------- */

export function getTeams() {
  return fetch('/api/teams').then(handle);
}

/* ---------- players ---------- */

export function getPlayers() {
  return fetch('/api/players').then(handle);
}

export function createPlayer(player) {
  return send('/api/players', 'POST', player);
}

export function updatePlayer(id, player) {
  return send(`/api/players/${id}`, 'PUT', player);
}

export function deletePlayer(id) {
  return fetch(`/api/players/${id}`, { method: 'DELETE' }).then(handle);
}

/* The backend may serialize the relation either as a nested `team` object
   (plain entity) or as a flat `teamId` (DTO). Read both shapes. */
export function teamIdOf(player) {
  return player.teamId ?? player.team?.teamId ?? null;
}
