import { useState } from 'react';
const KEY='gymSyncIdentity';
export function useIdentity(){
  const [identity,setIdentity]=useState(()=> localStorage.getItem(KEY) || null);
  function choose(id){ setIdentity(id); localStorage.setItem(KEY,id); }
  function clear(){ setIdentity(null); localStorage.removeItem(KEY); }
  return { identity, choose, clear };
}
