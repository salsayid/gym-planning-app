import React from 'react';
const USERS = ['sayid','yassein','ahmed','tawfik'];
export function IdentitySelect({ onChoose }){
  return (
    <div className="identity-select">
      <h1>Select Identity</h1>
      <div className="identity-select-grid">
        {USERS.map(u => (
          <button key={u} className="identity-btn" onClick={()=>onChoose(u)}>{u.charAt(0).toUpperCase()+u.slice(1)}</button>
        ))}
      </div>
      <p className="small" style={{marginTop:'1.25rem'}}>Identity stored locally only.</p>
    </div>
  );
}
