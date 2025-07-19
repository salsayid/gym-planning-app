import React, { useState } from 'react';
export function ResetButton({ onReset }){
  const [confirm, setConfirm] = useState(false);
  if(!confirm) return <button className="reset-btn" onClick={()=>setConfirm(true)}>Reset Day</button>;
  return (
    <div style={{display:'flex', gap:'.5rem'}}>
      <button className="reset-btn" onClick={()=>{onReset(); setConfirm(false);}}>Confirm Reset</button>
      <button className="reset-btn" onClick={()=>setConfirm(false)}>Cancel</button>
    </div>
  );
}
