# LEGER — Guide vidéos démo produit

Comment produire, compresser et déployer les vidéos démo qui apparaissent
dans la section **"Cómo funciona"** de chaque page produit.

---

## 1. Workflow global

```
adskull.io (génération)
        │
        ▼   MP4 ~10-15 MB
Dossier source local  E:\lmoudni AI\Panama COD Store\videos-src\
        │
        ▼   FFmpeg (compression)
Videos compressées ~2-3 MB (mp4 + webm optionnel)
        │
        ▼   PUSH.bat
frontend/public/videos/
        │
        ▼   git push → Easypanel rebuild
Site en production
```

Le composant `<DemoVideo>` (`frontend/src/components/demo-video.tsx`) :
- lit `product.demoVideo` depuis `products.ts`,
- lit `/videos/{slug}-demo.mp4` (+ webm si présent),
- joue **muet, en boucle, auto-play** uniquement quand visible à l'écran
  (économie batterie / data),
- **se cache silencieusement** si le fichier n'existe pas encore.

---

## 2. Fichiers attendus

Dépose ces fichiers dans `E:\lmoudni AI\Panama COD Store\videos-src\` :

| Produit | Nom obligatoire | Format | Ratio recommandé |
|---|---|---|---|
| Roll-On | `roll-on-demo.mp4` | H.264 | 9:16 (1080×1920) |
| Medias | `medias-demo.mp4` | H.264 | 9:16 (1080×1920) |
| Bruma | `bruma-demo.mp4` | H.264 | 9:16 (1080×1920) |
| Kit Completo | `kit-demo.mp4` | H.264 | 9:16 (1080×1920) |
| Duo Bruma+Roll-On | `duo-bruma-rollon-demo.mp4` | H.264 | 9:16 (1080×1920) |

Alternatifs WebM (optionnels, réduisent la bande passante d'env. 30%) :
`roll-on-demo.webm`, `medias-demo.webm`, `bruma-demo.webm`, `kit-demo.webm`,
`duo-bruma-rollon-demo.webm`.

`PUSH.bat` copie automatiquement tout ce qui existe dans ce dossier vers
`frontend/public/videos/` avant de pousser sur GitHub.

---

## 3. Configuration adskull.io

Quand tu génères une vidéo dans adskull pour l'utiliser sur le site (et
pas seulement en pub) :

- **Ratio** : `9:16` (1080×1920) → format story, s'intègre bien au design
  centré de la section "Cómo funciona".
- **Durée** : 8-15s (les vidéos plus longues perdent l'attention avant même
  que l'utilisateur lise le reste de la page).
- **Voix off** : optionnelle (elle ne sera **pas entendue** en autoplay muet,
  mais reste utile si l'utilisateur active le son). Privilégie du texte à
  l'écran pour communiquer le message clé.
- **Watermark / logo** : ajoute discrètement le logo LÉGER en bas ou haut de
  la vidéo (le vidéo n'a pas de contexte "landing page" en soi).
- **Export** : télécharge en MP4 (H.264, 30fps).

---

## 4. Commandes FFmpeg

Prérequis : installer FFmpeg (`winget install ffmpeg` ou télécharger sur
[ffmpeg.org](https://ffmpeg.org/download.html) et l'ajouter au PATH).

### 4.1 Compresser un MP4 (obligatoire)

Vise ~2-3 MB pour une vidéo de 10-15s. Command à lancer depuis
`E:\lmoudni AI\Panama COD Store\videos-src\` :

```powershell
ffmpeg -i input.mp4 `
  -vcodec libx264 -crf 26 -preset slow `
  -vf "scale=1080:1920,fps=30" `
  -movflags +faststart `
  -an `
  roll-on-demo.mp4
```

Options clés :
- `-crf 26` : qualité (18 = quasi lossless, 28 = médiocre). 24-26 est le sweet
  spot pour du contenu web muet.
- `-preset slow` : compression plus efficace (une seule fois, ça vaut le coup).
- `-movflags +faststart` : place les métadonnées au début du fichier pour que
  la vidéo commence à lire avant d'être entièrement téléchargée.
- `-an` : **retire l'audio** (inutile, on lit en muet — gain de ~200 KB).
- `scale=1080:1920` : force la résolution 9:16 (adapte si adskull sort autre chose).

Si le fichier obtenu dépasse encore 3 MB, monte le `-crf` à 28 ou baisse la
résolution à `720:1280`.

### 4.2 Exporter aussi en WebM (optionnel, -30% de poids)

```powershell
ffmpeg -i input.mp4 `
  -vcodec libvpx-vp9 -crf 32 -b:v 0 `
  -vf "scale=1080:1920,fps=30" `
  -an `
  roll-on-demo.webm
```

VP9 est plus lourd à encoder mais plus léger à télécharger — utile pour
Chrome / Firefox / Edge (Safari retombe sur le MP4 automatiquement).

### 4.3 Batch (les 3 produits d'un coup)

Placer les fichiers sources dans `videos-src/` sous les noms
`roll-on-source.mp4`, `medias-source.mp4`, `bruma-source.mp4` puis :

```powershell
$products = @("roll-on", "medias", "bruma")
foreach ($p in $products) {
  ffmpeg -i "$p-source.mp4" `
    -vcodec libx264 -crf 26 -preset slow `
    -vf "scale=1080:1920,fps=30" `
    -movflags +faststart -an `
    "$p-demo.mp4"
}
```

---

## 5. Poster (image de couverture)

Le composant `<DemoVideo>` utilise l'image du produit existante comme poster
par défaut (ex: `/images/roll-on-1.png`). C'est OK.

Si tu veux un poster custom (par exemple la première frame de la vidéo), tu
peux l'extraire en une commande :

```powershell
ffmpeg -i roll-on-demo.mp4 -ss 00:00:00.5 -vframes 1 -q:v 2 roll-on-poster.jpg
```

Puis mettre à jour le champ `poster` du produit dans `products.ts` :

```ts
demoVideo: {
  src: "/videos/roll-on-demo.mp4",
  poster: "/images/roll-on-poster.jpg", // <— nouveau poster custom
  ...
},
```

---

## 6. Déploiement

Une fois les vidéos dans `videos-src/` :

1. Double-clic sur `PUSH.bat` à la racine du projet.
2. Il copie les vidéos vers `frontend/public/videos/`, commit et push.
3. Sur Easypanel : **Rebuild without cache** sur le service frontend.
4. Vérifier que les vidéos s'affichent sur :
   - `https://soyleger.store/roll-on`
   - `https://soyleger.store/medias-compresion`
   - `https://soyleger.store/bruma`
   - `https://soyleger.store/kit-completo`
   - `https://soyleger.store/bruma-rollon`

Ouvrir les DevTools → onglet Network → filtre `mp4` : chaque vidéo doit peser
**≤ 3 MB** et se charger en `206 Partial Content` (indique que le
`preload="metadata"` fonctionne correctement).

---

## 7. Check-list qualité

Avant d'envoyer sur le site :

- [ ] Vidéo lue en muet reste **compréhensible** (utilise du texte overlay).
- [ ] Poids ≤ 3 MB par fichier.
- [ ] Ratio 9:16 (ou 1:1) — pas 16:9 (paraît minuscule en mobile centré).
- [ ] Boucle propre : la dernière frame doit se raccorder à la première sans
      cut brusque.
- [ ] Aucune information critique dans les 10% haut/bas (safe area).
- [ ] Logo LÉGER visible (petit, discret).

---

## 8. Ajouter la vidéo à un nouveau produit

**Les 5 produits/offres existants (Roll-On, Medias, Bruma, Kit Completo, Duo
Bruma+Roll-On) sont déjà configurés** — il te suffit de déposer les vidéos
dans `videos-src/` et lancer `PUSH.bat`.

Si tu veux ajouter une vidéo à un **nouveau produit** (ex : futur Duo
Roll-On+Medias) :

1. Ouvrir `frontend/src/lib/products.ts`.
2. Localiser le produit et ajouter le bloc `demoVideo` à côté de `images` :

```ts
demoVideo: {
  src: "/videos/nouveau-produit-demo.mp4",
  webm: "/videos/nouveau-produit-demo.webm",
  poster: "/images/nouveau-produit.png",
  aspectRatio: "9/16" as const,
  caption: "Description courte de la vidéo.",
},
```

3. Déposer `nouveau-produit-demo.mp4` dans `videos-src/`.
4. Ajouter les lignes de copie dans `PUSH.bat` (section `Copie videos demo`) :

```bat
if exist "%VIDEOS_SRC%\nouveau-produit-demo.mp4" copy /Y "%VIDEOS_SRC%\nouveau-produit-demo.mp4" "%VIDEOS_DEST%\nouveau-produit-demo.mp4"
if exist "%VIDEOS_SRC%\nouveau-produit-demo.webm" copy /Y "%VIDEOS_SRC%\nouveau-produit-demo.webm" "%VIDEOS_DEST%\nouveau-produit-demo.webm"
```

5. Si le produit utilise `ProductLandingPage` (comme Roll-On, Medias, Bruma),
   la vidéo s'intègre automatiquement. Si c'est une page custom (comme Kit ou
   Duo), importe `<DemoVideo>` et place-le dans la section appropriée :

```tsx
import { DemoVideo } from "@/components/demo-video";

// ...dans le JSX de la section :
{product.demoVideo && (
  <DemoVideo video={product.demoVideo} className="mb-10 sm:mb-12" />
)}
```

6. Push et rebuild sur Easypanel.
