import React from 'react';
import { DEFAULT_TIMES, formatTime } from '../utils/time';
export function TimeChips({ value, onChange, consensusTimes }){
  function toggle(t){
    let next = value.includes(t) ? value.filter(x=>x!==t) : [...value, t];
    onChange(next);
  }
  return (
    <div className="time-chips">
      {DEFAULT_TIMES.map(t => {
        const sel = value.includes(t);
        const all = consensusTimes && consensusTimes.includes(t);
        return <button key={t} type="button" onClick={()=>toggle(t)} className={"chip" + (sel? ' sel':'') + (all? ' all':'')}>{t==='Later'? 'Later' : formatTime(t)}</button>;
      })}
    </div>
  );
}
