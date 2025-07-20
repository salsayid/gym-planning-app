import { formatTime } from '../utils/time';

export function summarizeParticipants(participants) {
  const order = ['sayid','yassein','ahmed','tawfik'];
  return order.map(name => {
    const p = participants[name] || {};
    if (p.canLift === false) {
      return {
        name,
        status: 'no',
        focus: null,
        times: [],
        line: `${cap(name)} is out today`
      };
    }
    if (p.canLift === null || p.canLift === undefined) {
      return {
        name,
        status: 'unset',
        focus: null,
        times: [],
        line: `${cap(name)} hasn’t answered yet`
      };
    }
    // canLift === true
    const times = Array.isArray(p.times) ? [...p.times].sort() : [];
    let windowText = 'no times yet';
    if (times.length === 1) {
      windowText = formatTime(times[0]);
    } else if (times.length > 1) {
      windowText = `${formatTime(times[0])} – ${formatTime(times[times.length - 1])}`;
    }
    const focus = p.focus || 'no focus';
    const line = `${cap(name)} wants ${focus}${times.length ? `; window: ${windowText}` : ''}`;
    return {
      name,
      status: 'yes',
      focus: p.focus || null,
      times,
      windowText: times.length ? windowText : null,
      line
    };
  });
}

export function summarizeGroup(consensus) {
  if (!consensus) return null;
  const { canLiftCount, majorityFocus, commonTimes } = consensus;
  if (!canLiftCount) return 'Nobody has opted in yet';
  if (canLiftCount === 1) return 'Waiting for others';
  if (!majorityFocus) return `${canLiftCount} can lift — choose a focus`;
  if (commonTimes && commonTimes.length) {
    const first = commonTimes[0];
    return `${canLiftCount} can lift • Focus: ${majorityFocus.toUpperCase()} • Overlap: ${first}`;
  }
  return `${canLiftCount} can lift • Focus: ${majorityFocus.toUpperCase()} • No overlapping time yet`;
}

function cap(s){ return s.charAt(0).toUpperCase() + s.slice(1); }
