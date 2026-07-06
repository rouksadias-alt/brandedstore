// Authoritative order validation now lives in the backend (backend/app/schemas/orders.py).
// This file only keeps the data shared with the UI (the provinces dropdown).
export const PANAMA_PROVINCES = [
  "Panamá",
  "Panamá Oeste",
  "Colón",
  "Coclé",
  "Veraguas",
  "Herrera",
  "Los Santos",
  "Chiriquí",
  "Bocas del Toro",
  "Darién",
  "Comarca Guna Yala",
  "Comarca Emberá-Wounaan",
  "Comarca Ngäbe-Buglé",
] as const;
