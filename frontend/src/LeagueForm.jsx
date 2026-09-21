import { useState } from 'react';

const EMPTY = { name: '', numberOfTeams: '' };

export default function LeagueForm({ initial, onSubmit, onCancel }) {
  const [form, setForm] = useState(
    initial
      ? { name: initial.name ?? '', numberOfTeams: initial.numberOfTeams ?? '' }
      : EMPTY
  );

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit({
      name: form.name.trim(),
      numberOfTeams: Number(form.numberOfTeams) || 0,
    });
    if (!initial) setForm(EMPTY);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Nazwa ligi"
        required
      />
      <input
        name="numberOfTeams"
        type="number"
        min="0"
        value={form.numberOfTeams}
        onChange={handleChange}
        placeholder="Liczba drużyn"
      />
      <button type="submit">{initial ? 'Zapisz zmiany' : 'Dodaj'}</button>
      {initial && (
        <button type="button" className="secondary" onClick={onCancel}>
          Anuluj
        </button>
      )}
    </form>
  );
}
