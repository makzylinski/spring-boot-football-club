import { useState } from 'react';
import LeaguesPanel from './LeaguesPanel.jsx';
import PlayersPanel from './PlayersPanel.jsx';

const TABS = [
  { id: 'leagues', label: 'Ligi' },
  { id: 'players', label: 'Zawodnicy' },
];

export default function App() {
  const [tab, setTab] = useState('leagues');

  return (
    <main>
      <h1>Football Club</h1>

      <nav className="tabs">
        {TABS.map(({ id, label }) => (
          <button
            key={id}
            className={tab === id ? 'tab active' : 'tab'}
            onClick={() => setTab(id)}
          >
            {label}
          </button>
        ))}
      </nav>

      {tab === 'leagues' ? <LeaguesPanel /> : <PlayersPanel />}
    </main>
  );
}
