import React from 'react';
import { describeConsensus } from '../logic/consensus';
export function ConsensusBar({ consensus, data }){
  if(!data) return null;
  const message = describeConsensus(consensus || {});
  const conflict = message.toLowerCase().includes('conflict');
  return (
    <div className={"consensus-bar" + (conflict? ' conflict':'')}>
      <div>{message}</div>
      <div style={{fontSize:'.65rem',opacity:.8}}>Auto-reset 4am</div>
    </div>
  );
}
