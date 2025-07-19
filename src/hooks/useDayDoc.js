import { useCallback, useEffect, useState } from 'react';
import { db, doc, onSnapshot, setDoc, updateDoc, serverTimestamp } from '../firebase';
import { todayId } from '../utils/time';
import { computeConsensus } from '../logic/consensus';

const BLANK_PARTICIPANTS = ['sayid','yassein','ahmed','tawfik'].reduce((acc,n)=>{acc[n]={canLift:null,focus:null,times:[],updatedAt:null};return acc;},{});

export function useDayDoc(){
  const [dayId] = useState(todayId());
  const [data,setData]=useState(null);
  const [consensus,setConsensus]=useState(null);
  const [loading,setLoading]=useState(true);
  const [offline,setOffline]=useState(!navigator.onLine);
  useEffect(()=>{
    function onOff(){ setOffline(!navigator.onLine); }
    window.addEventListener('online',onOff); window.addEventListener('offline',onOff);
    return ()=>{ window.removeEventListener('online',onOff); window.removeEventListener('offline',onOff); };
  },[]);
  useEffect(()=>{
    const ref = doc(db,'days',dayId);
    const unsub = onSnapshot(ref, async snap => {
      if(!snap.exists()) {
        await setDoc(ref, { date: dayId, participants: BLANK_PARTICIPANTS });
        return;
      }
      const d = snap.data();
      setData(d);
      setConsensus(computeConsensus(d.participants));
      setLoading(false);
      localStorage.setItem('gymSyncLastDoc', JSON.stringify(d));
    }, err => { console.error(err); setLoading(false); });
    const cached = localStorage.getItem('gymSyncLastDoc');
    if(cached && !data){ try { const j=JSON.parse(cached); setData(j); setConsensus(computeConsensus(j.participants)); } catch(e){} }
    return unsub;
  },[dayId]);
  const updateParticipant = useCallback(async (user, patch) => {
    if(!data) return;
    const ref = doc(db,'days',dayId);
    const newParticipants = { ...data.participants, [user]: { ...data.participants[user], ...patch, updatedAt: Date.now() } };
    setData(d=>({ ...d, participants: newParticipants }));
    setConsensus(computeConsensus(newParticipants));
    try {
      await updateDoc(ref, { participants: newParticipants, updatedAt: serverTimestamp() });
    } catch(e){ console.warn('update failed', e); }
  },[data, dayId]);
  const resetDay = useCallback(async ()=>{
    const ref = doc(db,'days',dayId);
    await setDoc(ref, { date: dayId, participants: BLANK_PARTICIPANTS, resetAt: Date.now() });
  },[dayId]);
  return { dayId, data, consensus, loading, offline, updateParticipant, resetDay };
}
