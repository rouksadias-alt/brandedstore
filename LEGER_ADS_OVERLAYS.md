# LEGER — On-Screen Text Overlays (OST) · Kit Completo

Overlays de texte à afficher par-dessus les vidéos générées avec **adskull.io** (ou tout autre éditeur vidéo).

## Convention

- **Timecode** : `[start-end]` en secondes, aligné avec les scripts de `LEGER_ADS_SCRIPTS.md`.
- **Texte** : exact, en espagnol Panama, prêt à coller.
- **Style** : suggestion de traitement (couleur, taille, position).
- **Emphasis** : mot(s) à surligner en vert menta (`#1a473e`) ou or (`#a59063`).

### Palette de sous-titres

- Texte principal : **blanc** (`#ffffff`) sur fond translucide sombre (`rgba(0,0,0,0.35)`).
- Highlight positif : fond **vert menta** (`#1a473e`) + texte blanc.
- Highlight urgence / alerte : fond **rouge doux** (`#c1443a`) ou emoji `🚨`.
- Highlight offre / prix : fond **or** (`#a59063`) + texte blanc.
- Police : bold, sans-serif, taille très large (bottom-third safe area).

### Position par défaut

- **HOOK** : centre écran, énorme (60-70% de la largeur).
- **BEATS** : bottom-third, karaoke-style (mot par mot animé).
- **CTA final** : plein écran, centré, avec logo LÉGER en haut.

---

## SCRIPT 1 — Pattern Interrupt

| Timecode | Texte | Style | Emphasis |
|---|---|---|---|
| `[0-3s]` | `NO LAS IGNORES 🚨` | Centre, gigantesque, rouge doux | `IGNORES` |
| `[3-8s]` | `= tu circulación pidiendo ayuda` | Bottom-third, karaoke | `circulación pidiendo ayuda` |
| `[8-11s]` | `3 PASOS · 1 SOLUCIÓN` | Bottom-third, or | `3 PASOS` |
| `[11-14s]` | `Roll-On · Medias · Bruma` | Bottom-third, blanc | tous en gras |
| `[14-17s]` | `Grado farmacéutico` | Bottom-third, vert menta | `farmacéutico` |
| `[17-20s]` | `+500 clientas · 4.8★` | Bottom-third, or | `+500` et `4.8★` |
| `[20-25s]` | `$59 (antes $112)` | Centre, énorme, or | `$59` en rouge, `$112` barré |
| `[20-25s]` | `PAGO CONTRA ENTREGA` | Sous le prix, vert menta | tout |
| `[20-25s]` | `soyleger.store` | Bas de l'écran, blanc | — |

**End card (dernière frame, freeze 2s après la vidéo)** :
```
KIT LÉGER
$59 · PAGO CONTRA ENTREGA
soyleger.store/kit-completo
```

---

## SCRIPT 2 — Autoridad "Clima Tropical"

| Timecode | Texte | Style | Emphasis |
|---|---|---|---|
| `[0-3s]` | `32°C + 85% humedad = 🚨` | Centre, gigantesque, sur mapa animado | `32°C` et `85%` |
| `[3-10s]` | `Calor + humedad + horas de pie` | Bottom-third, blanc, apparition mot par mot | `horas de pie` |
| `[3-10s]` | `= piernas pesadas` | Ligne 2, vert menta | `piernas pesadas` |
| `[10-14s]` | `Centella Asiática` | Overlay sur Roll-On, or | tout |
| `[14-16s]` | `Bambú + Grafeno · 15-20mmHg` | Overlay sur Medias, or | `15-20mmHg` |
| `[16-18s]` | `Castaño de Indias` | Overlay sur Bruma, or | tout |
| `[18-24s]` | `FARMACIA $112+` | Gauche split-screen, texte barré rouge | tout |
| `[18-24s]` | `LÉGER $59` | Droite split-screen, or | `$59` |
| `[24-30s]` | `30 DÍAS DE GARANTÍA` | Centre, vert menta | `30 DÍAS` |
| `[24-30s]` | `soyleger.store/kit-completo` | Bas, blanc | — |

**End card** :
```
KIT LÉGER — GRADO FARMACÉUTICO
$59 · 30 DÍAS DE GARANTÍA
Envío 24-48h · Contra entrega
```

---

## SCRIPT 3 — Testimonio "Cajera de Albrook" (UGC)

Style **TikTok karaoke** — mots animés un par un, jaune vif (`#ffde59`) sur ombre noire pour feel UGC brut.

| Timecode | Texte | Style | Emphasis |
|---|---|---|---|
| `[0-3s]` | `8 HORAS DE PIE · ALBROOK` | Centre, karaoke jaune | `8 HORAS` |
| `[3-9s]` | `Piernas de tronco · Todos los días` | Bottom-third, karaoke | `Todos los días` |
| `[9-13s]` | `Una compañera me pasó esto 👇` | Centre, karaoke + emoji | `esto` |
| `[13-18s]` | `3 productos · 3 momentos del día` | Bottom-third, karaoke | `3 momentos` |
| `[18-25s]` | `2 SEMANAS · SIN HINCHAZÓN` | Centre, énorme, vert menta | `2 SEMANAS` |
| `[25-30s]` | `$59 · Pago contra entrega` | Bottom-third, or | `$59` |
| `[25-30s]` | `soyleger.store` | Bas, blanc | — |

**Notes UGC** :
- Ne pas mettre l'end card corporate à la fin — laisser un dernier plan "selfie" avec le kit dans la main + un simple `soyleger.store` en overlay natif TikTok-style.
- Ajouter un compteur `.5x speed` ou effet zoom léger sur "juzga tú misma" pour donner l'aspect authentique.

---

## SCRIPT 4 — Elimination Frame "Probé de Todo"

| Timecode | Texte | Style | Emphasis |
|---|---|---|---|
| `[0-3s]` | `PROBÉ DE TODO ❌` | Centre, gigantesque, rouge | `TODO` |
| `[3-6s]` | `Cremas ❌` | Overlay sur crème générique, rouge | tout |
| `[6-8s]` | `Medias baratas ❌` | Overlay sur medias, rouge | tout |
| `[8-10s]` | `Trucos caseros ❌` | Overlay sur bolsa de hielo, rouge | tout |
| `[10-14s]` | `SISTEMA COMPLETO ✅` | Centre, énorme, vert menta | tout |
| `[14-17s]` | `3 PASOS` | Sous "sistema completo", or | tout |
| `[17-22s]` | `+500 clientas · 4.8★` | Bottom-third, or | `+500` et `4.8★` |
| `[22-25s]` | `$59 · CONTRA ENTREGA` | Centre, énorme, or | `$59` |
| `[22-25s]` | `30 días de garantía` | Sous le prix, vert menta | `30 días` |
| `[22-25s]` | `soyleger.store/kit-completo` | Bas, blanc | — |

**Effets recommandés** :
- Sur les `❌` : petit "snap" sonore + shake caméra de 0.2s.
- Sur le `✅` : transition douce cross-fade + un léger "swoosh".

**End card** :
```
KIT LÉGER — LA SOLUCIÓN COMPLETA
$59 · 30 días de garantía
soyleger.store
```

---

## SCRIPT 5 — Educational "Señales de Alerta"

Format infographique — beaucoup de texte, chaque señal doit rester lisible **au moins 1.5s**.

| Timecode | Texte | Style | Emphasis |
|---|---|---|---|
| `[0-3s]` | `5 SEÑALES 🚨` | Centre, gigantesque, rouge doux | `5 SEÑALES` |
| `[0-3s]` | `de que tu circulación grita por ayuda` | Sous le hook, blanc | `circulación grita` |
| `[3-6s]` | `1. HINCHAZÓN` | Left-third, or, icône tobillo hinchado | `1` en rouge |
| `[6-8s]` | `2. CALAMBRES NOCTURNOS` | Left-third, or, icône luna | `2` en rouge |
| `[8-10s]` | `3. MARCA DE LA MEDIA` | Left-third, or, icône pierna con marca | `3` en rouge |
| `[10-12s]` | `4. ARAÑITAS NUEVAS` | Left-third, or, icône vasos | `4` en rouge |
| `[12-14s]` | `5. PIERNAS PESADAS 📉` | Left-third, or, icône reloj | `5` en rouge |
| `[14-18s]` | `EN PANAMÁ: PEOR` | Centre, énorme, rouge | `PEOR` |
| `[18-22s]` | `NO LO IGNORES` | Centre, vert menta | tout en gras |
| `[22-26s]` | `KIT LÉGER · 3 PASOS` | Bottom-third, or | `3 PASOS` |
| `[26-30s]` | `GRADO FARMACÉUTICO` | Bottom-third, vert menta | tout |
| `[30-35s]` | `$59 · Pago Contra Entrega` | Centre, énorme, or | `$59` |
| `[30-35s]` | `Envío 24-48h · 30 días de garantía` | Sous le prix, blanc | `24-48h` et `30 días` |
| `[30-35s]` | `soyleger.store` | Bas, blanc | — |

**End card** :
```
KIT LÉGER — CIENCIA CIRCULATORIA
Roll-On · Medias · Bruma
$59 · Contra entrega · 30 días de garantía
soyleger.store/kit-completo
```

---

## Ressources partagées pour tous les scripts

### Logos & branding

- Logo LÉGER (monogramme) : `frontend/src/app/icon.png` (favicon utilisé sur soyleger.store).
- Couleur primaire (vert menta / Pharma Teal) : `#1a473e`.
- Accent or : `#a59063`.
- Crème fond : `#f7f9f5`.

### Templates de textes réutilisables

Copie-colle rapide dans adskull ou éditeur :

**Hook générique remplaçable** :
```
[EMOJI ALERTA] [PROBLEMA EN 3-5 MOTS]
```

**Prix bloc** :
```
$59 (antes $112)
AHORRA $53
```

**CTA universel** :
```
PAGO CONTRA ENTREGA
Envío 24-48h · 30 días de garantía
soyleger.store/kit-completo
```

**Trust bar (bottom persistante sur toute la durée si souhaité)** :
```
+500 clientas felices · 4.8★ · Pago Contra Entrega
```

### Fonts

- Titres : bold sans-serif (Inter Bold, Poppins Bold, ou Concrette Bold).
- Sous-titres : bold, karaoke-style (Segoe UI Black ou équivalent).
- **Toujours** : text stroke noir 2px pour lisibilité, quelle que soit la scène.

---

## Check-list avant export final

- [ ] Sous-titres présents pendant **100% de la durée** (85% des vues sans son).
- [ ] Hook lisible en **< 1 seconde** (test : screenshot à 0.5s, encore compréhensible ?).
- [ ] Prix + CTA visibles pendant **au moins 3 secondes** finales.
- [ ] URL `soyleger.store` orthographiée correctement.
- [ ] Ratio **9:16** (1080x1920px min).
- [ ] Aucun texte dans les **10% supérieurs** (safe zone caméra) ni **20% inférieurs** (barre UI TikTok/Reels).
- [ ] Emoji `🚨`, `❌`, `✅`, `📉`, `★` rendus correctement (pas de tofu `☐`).
- [ ] Version alt sans le prix (pour whitelisting / éviter policy Meta si $ mentionné) prête si besoin.
