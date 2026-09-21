import { useEffect, useState } from 'react';
import {
  getLeagues,
  createLeague,
  updateLeague,
  deleteLeague,
} from './api.js';
import LeagueForm from './LeagueForm.jsx';

export default function App() {
  const [leagues, setLeagues] = useState([]);
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  async function reload() {
    try {
      setLeagues(await getLeagues());
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

  async function handleSubmit(league) {
    try {
      if (editing) {
        await updateLeague(editing.leagueId, league);
      } else {
        await createLeague(league);
      }
      setEditing(null);
      await reload();
    } catch (e) {
      setError(e.message);
    }
  }

  async function handleDelete(id) {
    if (!confirm('Usunąć tę ligę?')) return;
    try {
      await deleteLeague(id);
      if (editing?.leagueId === id) setEditing(null);
      await reload();
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <main>
      <h1>Ligi</h1>

      <LeagueForm
        key={editing?.leagueId ?? 'new'}
        initial={editing}
        onSubmit={handleSubmit}
        onCancel={() => setEditing(null)}
      />

      {error && <p className="error">Błąd: {error}</p>}

      {loading ? (
        <p className="muted">Ładowanie…</p>
      ) : leagues.length === 0 ? (
        <p className="muted">Brak lig. Dodaj pierwszą powyżej.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nazwa</th>
              <th>Liczba drużyn</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {leagues.map((league) => (
              <tr key={league.leagueId}>
                <td>{league.leagueId}</td>
                <td>{league.name}</td>
                <td>{league.numberOfTeams}</td>
                <td className="actions">
                  <button onClick={() => setEditing(league)}>Edytuj</button>
                  <button
                    className="danger"
                    onClick={() => handleDelete(league.leagueId)}
                  >
                    Usuń
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}
