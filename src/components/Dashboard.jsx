import React from 'react';
import { ParticipantCard } from './ParticipantCard';
import { ConsensusBar } from './ConsensusBar';
import { ResetButton } from './ResetButton';

const ORDER = ['sayid', 'yassein', 'ahmed', 'tawfik']; // fixed order prevents reflow/reorder jumps

export function Dashboard({ identity, day, consensus, onUpdate, onReset, offline }){
  const participants = day?.participants || {};

  return (
    <div>
      <ConsensusBar consensus={consensus} data={day} />
      {offline && <div className="offline">Offline – changes will sync later</div>}

      <div className="grid" style={{ marginTop:'1rem' }}>
        {ORDER.map(name => (
          <ParticipantCard
            key={name}
            name={name}
            self={identity === name}
            data={participants[name]}
            consensus={consensus}
            majorityFocus={consensus?.majorityFocus}
            onUpdate={patch => onUpdate(name, patch)}
          />
        ))}
      </div>

      <div style={{ marginTop:'1.25rem' }}>
        <ResetButton onReset={onReset} />
      </div>
    </div>
  );
}
