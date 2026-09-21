import { useEffect, useState } from 'react';
import {
  getPlayers,
  getTeams,
  createPlayer,
  updatePlayer,
  deletePlayer,
  teamIdOf,
} from './api.js';
import PlayerForm from './PlayerForm.jsx';

export default function PlayersPanel() {
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  // Id of the player whose dropdown is mid-request, so we can disable it.
  const [saving, setSaving] = useState(null);

  async function reload() {
    try {
      const [playerList, teamList] = await Promise.all([
        getPlayers(),
        getTeams(),
      ]);
      setPlayers(playerList);
      setTeams(teamList);
      setError(null);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    reload();
  }, []);

  async function handleSubmit(player) {
    try {
      if (editing) {
        await updatePlayer(editing.playerId, player);
      } else {
        await createPlayer(player);
      }
      setEditing(null);
      await reload();
    } catch (e) {
      setError(e.message);
    }
  }

  async function handleDelete(id) {
    if (!confirm('Usunąć tego zawodnika?')) return;
    try {
      await deletePlayer(id);
      if (editing?.playerId === id) setEditing(null);
      await reload();
    } catch (e) {
      setError(e.message);
    }
  }

  // Assigning a club straight from the row: send the whole player back
  // with the new teamId, because the endpoint is a PUT, not a PATCH.
  async function handleTeamChange(player, value) {
    setSaving(player.playerId);
    try {
      await updatePlayer(player.playerId, {
        firstName: player.firstName,
        lastName: player.lastName,
        position: player.position,
        teamId: value === '' ? null : Number(value),
      });
      await reload();
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(null);
    }
  }

  function startEditing(player) {
    setEditing({
      playerId: player.playerId,
      firstName: player.firstName ?? '',
      lastName: player.lastName ?? '',
      position: player.position ?? '',
      teamId: teamIdOf(player) ?? '',
    });
  }

  return (
    <section>
      <PlayerForm
        key={editing?.playerId ?? 'new'}
        initial={editing}
        teams={teams}
        onSubmit={handleSubmit}
        onCancel={() => setEditing(null)}
      />

      {error && <p className="error">Błąd: {error}</p>}

      {teams.length === 0 && !loading && (
        <p className="muted">
          Brak drużyn — dropdown będzie pusty, dopóki nie dodasz klubów.
        </p>
      )}

      {loading ? (
        <p className="muted">Ładowanie…</p>
      ) : players.length === 0 ? (
        <p className="muted">Brak zawodników. Dodaj pierwszego powyżej.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Zawodnik</th>
              <th>Pozycja</th>
              <th>Klub</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {players.map((player) => (
              <tr key={player.playerId}>
                <td>{player.playerId}</td>
                <td>
                  {player.firstName} {player.lastName}
                </td>
                <td>{player.position || <span className="muted">—</span>}</td>
                <td>
                  <select
                    value={teamIdOf(player) ?? ''}
                    disabled={saving === player.playerId}
                    onChange={(e) => handleTeamChange(player, e.target.value)}
                  >
                    <option value="">— bez klubu —</option>
                    {teams.map((team) => (
                      <option key={team.teamId} value={team.teamId}>
                        {team.name}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="actions">
                  <button onClick={() => startEditing(player)}>Edytuj</button>
                  <button
                    className="danger"
                    onClick={() => handleDelete(player.playerId)}
                  >
                    Usuń
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}
