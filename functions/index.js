const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
function blankDoc(dateStr){
  return { date: dateStr, participants: ['sayid','yassein','ahmed','tawfik'].reduce((a,n)=>{a[n]={canLift:null,focus:null,times:[],updatedAt:null};return a;},{}), createdAt: Date.now() };
}
exports.dailyReset = functions.pubsub.schedule('0 9 * * *').timeZone('America/Chicago').onRun(async () => {
  const d = new Date();
  const dateStr = d.toISOString().slice(0,10);
  const ref = admin.firestore().collection('days').doc(dateStr);
  const snap = await ref.get();
  if(!snap.exists) {
    await ref.set(blankDoc(dateStr));
  }
  return null;
});
