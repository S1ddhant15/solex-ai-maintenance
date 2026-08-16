# 🤖 Solex AI Maintenance Assistant

## Overview

Solex AI Maintenance Assistant (SAMA) is a web-based AI-powered maintenance support application designed for solar module manufacturing plants.

The application helps technicians and engineers quickly diagnose machine faults, search alarm codes, manage preventive maintenance, and track work orders.

---

## Features

- 🔐 Central portal access guard
- 🏭 Live machine condition dashboard
- ⏱️ Machine cycle-time and line takt monitoring
- 📈 Production vs plan and rejection-rate monitoring
- 🛠️ Maintenance / breakdown visibility
- 🎛️ Quality process-parameter view
- ✅ Controlled parameter change requests, approval and audit trail
- 🏠 Dashboard
- 🤖 AI Maintenance Chat
- ⚙️ Machine Library
- 🔍 Alarm Lookup
- 📅 Preventive Maintenance
- 📋 Work Order Management
- 📊 Analytics Dashboard
- ⚙️ Settings
- 🧠 Machine Knowledge Base
- 🚨 Alarm Database

---

## Project Structure

```
solex-ai-maintenance/
│
├── index.html
├── home.html
│
├── pages/
│   ├── dashboard.html
│   ├── operations.html
│   ├── chat.html
│   ├── machines.html
│   ├── machine.html
│   ├── alarms.html
│   ├── pm.html
│   ├── workorder.html
│   ├── analytics.html
│   └── settings.html
│
├── css/
│   ├── style.css
│   └── operations.css
│
├── js/
│   ├── app.js
│   ├── database.js
│   ├── knowledge.js
│   ├── alarmDatabase.js
│   ├── chat.js
│   ├── aiEngine.js
│   ├── portalGuard.js
│   └── operations.js
│
├── data/
│   ├── machines.json
│   └── knowledge.json
│
└── assets/
```

---

## Technologies

- HTML5
- CSS3
- JavaScript (ES6)
- JSON
- Chart.js

---

## Future Enhancements

- OpenAI Integration
- QR Code Scanner
- Voice Commands
- Power BI Integration
- Maintenance History
- Spare Parts Management
- Technician Management
- Predictive Maintenance

## Important deployment note

The live values in `js/operations.js` are clearly marked prototype data. For plant deployment, replace them with authenticated API responses from MES/MySQL. Never connect browser JavaScript directly to a PLC. Parameter changes must use a server-side approval and machine-write service with allowlisted tags, engineering limits and an immutable audit log.

---

Developed for Solex Energies Ltd.
