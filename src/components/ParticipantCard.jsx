import React, { useRef, useEffect } from 'react';
import { TimeChips } from './TimeChips';

export function ParticipantCard({ name, self, data, consensus, onUpdate, majorityFocus }){
  const p = data || { canLift:null, focus:null, times:[] };
  const can = p.canLift === true;
  const cannot = p.canLift === false;
  const focusConflict = can && p.focus && majorityFocus && p.focus !== majorityFocus;

  // (You can remove the pulse logic if you already did for stability)
  const ref = useRef(null);
  const lastUpdatedRef = useRef(p.updatedAt);
  useEffect(()=>{
    if(p.updatedAt && p.updatedAt !== lastUpdatedRef.current){
      lastUpdatedRef.current = p.updatedAt;
      if(ref.current){
        const el = document.createElement('div');
        el.className='card-update-pulse';
        ref.current.appendChild(el);
        setTimeout(()=> el.remove(), 900);
      }
    }
  },[p.updatedAt]);

  function setCanLift(v){ onUpdate({ canLift: v, focus: v? p.focus : null, times: v? p.times: [] }); }
  function setFocus(f){ onUpdate({ focus:f }); }
  function setTimes(t){ onUpdate({ times:t }); }

  return (
    <div ref={ref} className={
      "card" +
      (can? ' can':'') +
      (cannot? ' cannot':'') +
      (focusConflict? ' conflict':'')
    }>
      <h3>{name.charAt(0).toUpperCase()+name.slice(1)}</h3>

      {/* Prompt 1: Lift today? */}
      <div className="prompt-label">Lift today?</div>
      <div className="toggle-row">
        <button
          className={"toggle" + (can? ' active':'')}
          onClick={()=>setCanLift(true)}
        >Yes</button>
        <button
          className={"toggle no" + (cannot? ' active':'')}
          onClick={()=>setCanLift(false)}
        >No</button>
        <button
          className="toggle"
          disabled={p.canLift===null}
          onClick={()=>setCanLift(null)}
        >Clear</button>
      </div>

      {/* Prompt 2: What do you wanna lift? */}
      <div className="prompt-label">What do you wanna lift?</div>
      <div className="focus-row">
        <div className="segment">
          {['push','pull','legs'].map(f => (
            <button
              key={f}
              disabled={!can}
              onClick={()=>setFocus(f)}
              className={p.focus===f? 'active':''}
            >{f}</button>
          ))}
        </div>
      </div>

      {/* Prompt 3: What time works? */}
      <div className="prompt-label">What time works?</div>
      <div className="time-row">
        <TimeChips
          value={p.times || []}
            onChange={setTimes}
            consensusTimes={self ? (consensus?.commonTimes || []) : []}
        />
      </div>

      <div className="timestamp">
        {p.updatedAt ? new Date(p.updatedAt).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}) : '—'}
      </div>
      {self && <div className="notice">You</div>}
    </div>
  );
}
