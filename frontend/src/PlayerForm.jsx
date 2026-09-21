import { useState } from 'react';

const EMPTY = { firstName: '', lastName: '', position: '', teamId: '' };

export default function PlayerForm({ initial, teams, onSubmit, onCancel }) {
  const [form, setForm] = useState(initial ?? EMPTY);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit({
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      position: form.position.trim(),
      teamId: form.teamId === '' ? null : Number(form.teamId),
    });
    if (!initial) setForm(EMPTY);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="firstName"
        value={form.firstName}
        onChange={handleChange}
        placeholder="Imię"
        required
      />
      <input
        name="lastName"
        value={form.lastName}
        onChange={handleChange}
        placeholder="Nazwisko"
        required
      />
      <input
        name="position"
        value={form.position}
        onChange={handleChange}
        placeholder="Pozycja"
      />
      <select name="teamId" value={form.teamId ?? ''} onChange={handleChange}>
        <option value="">— bez klubu —</option>
        {teams.map((team) => (
          <option key={team.teamId} value={team.teamId}>
            {team.name}
          </option>
        ))}
      </select>
      <button type="submit">{initial ? 'Zapisz zmiany' : 'Dodaj'}</button>
      {initial && (
        <button type="button" className="secondary" onClick={onCancel}>
          Anuluj
        </button>
      )}
    </form>
  );
}
