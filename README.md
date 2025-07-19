# Gym Sync
Minimal real-time daily coordination for a 4-person lifting squad.

## Quick Start
```bash
npm install
npm run dev
```
Add your Firebase config in `src/firebase.js`.

Deploy (after `firebase init`):
```bash
npm run build
firebase deploy
```

## Env Setup
1. Create Firebase project, enable Firestore.
2. Replace config in `firebase.js`.
3. (Optional) Deploy function: `firebase deploy --only functions`.

## Future Hardening
- Tighten security rules (per-identity write constraints).
- Add offline write queue.
- Add auth w/ custom claims restricting which participant key you can edit.
