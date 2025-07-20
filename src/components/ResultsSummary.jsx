import React from 'react';
import { summarizeParticipants, summarizeGroup } from '../logic/summarize';

export function ResultsSummary({ participants, consensus }) {
  if (!participants) return null;
  const rows = summarizeParticipants(participants);
  const groupLine = summarizeGroup(consensus);

  return (
    <div className="results-summary">
      {groupLine && <div className="results-group">{groupLine}</div>}
      <ul className="results-list">
        {rows.map(r => (
          <li key={r.name} className={`res-item status-${r.status}`}>
            <span className="res-name">{r.name}</span>
            <span className="res-focus">{r.focus || (r.status==='yes' ? '—' : '')}</span>
            <span className="res-window">
              {r.status === 'yes'
                ? (r.windowText || 'no times')
                : (r.status === 'no' ? '—' : '')}
            </span>
            <span className="res-line">{r.line}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
