# Portfolio WebApp

Eine moderne, vollständig selbst entwickelte Portfolio-Website, bestehend aus einem React-Frontend und einem Node.js-Backend. Das Projekt demonstriert den kompletten Entwicklungszyklus – von der UI-Entwicklung über Backend-Integration bis hin zu Tests, Docker-Containerisierung und automatisiertem Deployment.

🌐 **Live:** [alper42.github.io/portfolio](https://alper42.github.io/portfolio)

---

## Tech Stack

### Frontend
| Technologie | Verwendung |
|---|---|
| React 19 | UI-Framework |
| Vite | Build-Tool |
| CSS (Custom Properties) | Styling & Theming |
| Vitest + Testing Library | Unit-Tests |
| GitHub Pages | Hosting |

### Backend
| Technologie | Verwendung |
|---|---|
| Node.js + Express | REST API |
| Resend | E-Mail-Versand |
| Docker | Containerisierung |
| Render | Hosting |

---

## Features

- **Hero-Sektion** mit animiertem Typewriter-Effekt (simulierter Code)
- **Skills-Sektion** mit Scroll-Reveal-Animationen
- **Projekte-Sektion** mit interaktiver Projektliste
- **Kontaktformular** mit Backend-Anbindung und E-Mail-Versand via Resend
- **Custom Cursor** mit Trail-Animation
- **Responsive Navigation** mit aktivem Scroll-Tracking
- **Scroll-Reveal Hook** (`useScrollReveal`) für sanfte Einblendungen

---

## Projektstruktur

```
portfolio/                  # Frontend (React + Vite)
├── src/
│   ├── components/
│   │   ├── Cursor.jsx       # Custom Cursor mit Trail
│   │   ├── Navbar.jsx       # Fixierte Navigation mit Scroll-Tracking
│   │   ├── Hero.jsx         # Hero mit Typewriter-Animation
│   │   ├── Skills.jsx       # Skills-Grid mit Scroll-Reveal
│   │   ├── Projects.jsx     # Projektliste
│   │   └── Contact.jsx      # Kontaktformular mit API-Anbindung
│   ├── hooks/
│   │   └── useScrollReveal.js
│   ├── styles/
│   │   └── global.css
│   └── main.jsx
├── Dockerfile
├── vite.config.js
└── package.json

portfolio-backend/          # Backend (Node.js + Express)
├── server.js               # Express-Server mit /send Endpoint
├── Dockerfile.backend
└── package.json
```

---

## Tests

Das Frontend enthält Unit-Tests für alle Hauptkomponenten (Vitest + Testing Library):

```bash
npm run test
```

| Komponente | Getestete Szenarien |
|---|---|
| `Hero` | Name, Buttons und Beschreibung werden gerendert |
| `Navbar` | Navigation wird korrekt angezeigt |
| `Contact` | Formular, Erfolgsmeldung, Fehlerbehandlung |

---

## Deployment

### Frontend → GitHub Pages

```bash
npm run build
npm run deploy
```

Der `deploy`-Befehl baut das Projekt und veröffentlicht den `dist`-Ordner automatisch auf GitHub Pages.

### Backend → Render

Das Backend läuft auf [Render](https://render.com) als Docker-Container. Bei jedem Push auf `main` wird automatisch neu deployed.

---

## Autor

**Alper Caliskan**
- GitHub: [@alper42](https://github.com/alper42)
- Website: [alper42.github.io/portfolio](https://alper42.github.io/portfolio)
