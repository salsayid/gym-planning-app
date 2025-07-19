export function computeConsensus(participants){
  const entries = Object.entries(participants || {});
  const yes = entries.filter(([,p]) => p.canLift === true);
  if(!yes.length) return { canLiftCount:0 };
  const focusCounts = yes.reduce((acc,[,p])=>{ if(p.focus) acc[p.focus]=(acc[p.focus]||0)+1; return acc;},{});
  let majorityFocus=null, majorityCount=0;
  for(const f in focusCounts){ if(focusCounts[f]>majorityCount){ majorityFocus=f; majorityCount=focusCounts[f]; } }
  const alignedOnFocus = yes.filter(([,p])=>p.focus===majorityFocus).length;
  const timeSets = yes.map(([,p]) => new Set(p.times||[]));
  let commonTimes=[];
  if(timeSets.length){
    const first=[...timeSets[0]];
    commonTimes = first.filter(t => timeSets.every(s=>s.has(t)));
  }
  const proposedTime = commonTimes[0] || null;
  return { canLiftCount: yes.length, majorityFocus, alignedOnFocus, commonTimes, proposedTime };
}
export function describeConsensus(c){
  if(!c || c.canLiftCount<2) return 'Waiting for more people to opt in';
  if(!c.majorityFocus) return `${c.canLiftCount} can lift — pick a focus`;
  if(c.alignedOnFocus < 2) return `Conflict on focus`; // simplified
  if(!c.proposedTime) return `Focus: ${c.majorityFocus.toUpperCase()} — choose overlapping time`;
  return `${c.canLiftCount} can lift: ${c.majorityFocus.toUpperCase()} at ${c.proposedTime}`;
}
