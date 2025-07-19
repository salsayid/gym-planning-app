import React from 'react';
import { IdentitySelect } from './components/IdentitySelect';
import { Dashboard } from './components/Dashboard';
import { useIdentity } from './hooks/useIdentity';
import { useDayDoc } from './hooks/useDayDoc';
import './styles.css';
export default function App(){
  const { identity, choose, clear } = useIdentity();
  const { data, consensus, loading, offline, updateParticipant, resetDay } = useDayDoc();
  return (
    <div className="app-shell">
      <div className="header">
        <div className="logo">GymSync</div>
        {identity && <button className="reset-btn" onClick={clear} title="Switch User">{identity}</button>}
      </div>
      {!identity && <IdentitySelect onChoose={choose} />}
      {identity && (
        loading ? <p>Loading...</p> : <Dashboard identity={identity} day={data} consensus={consensus} onUpdate={(user,patch)=>{ if(user===identity) updateParticipant(user,patch); }} onReset={resetDay} offline={offline} />
      )}
      <div className="footer">v0.1 MVP • Real-time squad sync</div>
    </div>
  );
}
