export const DATE_TZ_OFFSET_MIN = 0; // adjust if you want a custom day boundary
export function todayId() {
  const d = new Date();
  // shift for custom boundary if needed
  return d.toISOString().slice(0,10);
}
export const DEFAULT_TIMES = ["11:00", "11:30","12:00", "12:30", "13:00","13:30","14:00", "14:30", "15:00", "15:30", "16:00", "16:30","17:00","17:30","18:00","18:30","19:00","19:30","20:00","Later"];
export function formatTime(t){
  if(t === 'Later') return 'Later';
  const [h,m]=t.split(':');
  const hour = parseInt(h,10);
  const ampm = hour >=12 ? 'pm':'am';
  const hour12 = ((hour+11)%12)+1;
  return `${hour12}:${m}${ampm}`;
}
