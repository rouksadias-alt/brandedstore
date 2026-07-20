# /public/videos/

Dossier des vidéos démo servies statiquement par Next.js.

## Fichiers attendus

Pour que la section "Cómo funciona" / "Tu ritual" affiche une vidéo sur chaque
page produit, dépose exactement ces fichiers ici (les chemins sont déjà cablés
dans `src/lib/products.ts` → champ `demoVideo`) :

| Produit | Vidéo principale | Alt WebM (optionnel) | Ratio |
|---|---|---|---|
| Roll-On | `roll-on-demo.mp4` | `roll-on-demo.webm` | 9:16 |
| Medias | `medias-demo.mp4` | `medias-demo.webm` | 9:16 |
| Bruma | `bruma-demo.mp4` | `bruma-demo.webm` | 9:16 |
| Kit Completo | `kit-demo.mp4` | `kit-demo.webm` | 9:16 |
| Duo Bruma+Roll-On | `duo-bruma-rollon-demo.mp4` | `duo-bruma-rollon-demo.webm` | 9:16 |

Si un fichier est absent, la vidéo se cache automatiquement (le composant
`<DemoVideo>` intercepte l'erreur `onError`) — donc pas de casse.

## Consignes

- **Durée** : 8-15 secondes.
- **Muet** : la vidéo joue sans son (autoplay muted loop). Pas de voix off
  utile — utilise du texte à l'écran si besoin.
- **Taille cible** : ≤ 3 MB par vidéo (idéalement 1.5-2.5 MB).
- **Ratio** : 9:16 recommandé (1080×1920px), s'affiche comme une story mobile
  au centre de la section. Alternatif : 1:1 (1080×1080).
- **Codec** : H.264 (mp4) obligatoire, VP9 (webm) optionnel pour économiser
  ~30% de bande passante sur navigateurs compatibles.

Voir `leger-store/LEGER_VIDEOS_GUIDE.md` pour les commandes FFmpeg exactes.
