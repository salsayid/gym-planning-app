# Gym Sync

Minimal real-time daily coordination for a 4‑person lifting squad.

**Live App:** https://crunchers-gym-sync.web.app/

## Why

I don’t really like working out alone, so I go with a few of my friends. We get in, lift, and we go out. But lately it’s been getting harder to set up times, figure out what to lift, and even coordinate a session. It gets annoying when, for example, I have a pull session and someone else has a leg session, so when we finally meet we’re on different days of the split (push / pull / legs, PPL). I built this to remove that back‑and‑forth. With a lightweight React + Vite frontend, Firestore for real‑time data, Firebase Hosting (optional Cloud Function), plain CSS for styling, and no formal auth (identity stored locally), we can quickly lock in together.

* Update - But as I would soon come to realize, there is no fancy application, algorithm, or planner good enough to get these guys working together.  The 3 of them are animals. I've since accepted my fate, I am cooked. Had I known that I was working on a tool for barbarians, I would have immediately halted and not have spent another single second in development for this project. But hey, its okay, this is what life is all about. I got the chance to work with a lot of new technologies, and I learned a lot througout the development of this project.
* `participantCard.jsx` is also great :)
---

## Features (MVP)

- Realtime updates (Firestore snapshot listener)
- “Lift today?” toggle (Yes / No / Clear)
- Focus selection: Push / Pull / Legs
- Time slot chips (mobile‑friendly horizontal scroll)
- Basic consensus logic (majority focus + overlapping times)
- Manual daily reset (scheduled function scaffold included)
- Mobile‑first responsive CSS
- Local identity selection (no auth friction)

---

## Tech Stack

| Layer        | Choice |
|--------------|--------|
| Frontend     | React 18 + Vite |
| Styling      | Plain CSS (custom properties, mobile-first) |
| Realtime DB  | Firebase Firestore |
| Hosting      | Firebase Hosting |
| Functions    | (Optional) Cloud Functions (daily reset skeleton) |
| State Mgmt   | Custom React hooks |
| Auth         | None (identity stored in `localStorage`) |

---

## Quick Start

```bash
git clone https://github.com/salsayid/gym-planning-app.git
cd gym-planning-app
npm install
npm run dev
