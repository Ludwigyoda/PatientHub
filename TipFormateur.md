# NOTES D'ARCHITECTURE ET TIPS (Déplacés depuis .env)

## TIP 1 — Ne code jamais un outil en dur
Toujours config DB, Sinon tu tues le data-driven.

## TIP 2 — Versionning outils
Ne casse jamais les anciennes données patient.

## TIP 3 — Moteur runtime unique
UN seul endpoint et pas 20 controllers.

## TIP 4 — JSON schema
(https://ajv.js.org/)
Tu stockes schema validation dans DB.

## TIP 5 — Logging obligatoire
Log chaque action
exemple :
    audit_logs
    - user
    - action
    - tool
    - date

## TIP 6 — Sécurité
À faire absolument :
- JWT + refresh
- audit logs
- validation JSON stricte
- rate limit
- RBAC (patient / admin)
- encryption données sensibles
- backup

## Idée d'architecture :
BACK (NestJS)
├── auth
├── patients
├── tools
├── runtime (moteur data-driven)
└── data

FRONT (React)
├── login
├── dashboard patient
├── tool renderer dynamique
