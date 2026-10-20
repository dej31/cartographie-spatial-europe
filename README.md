# Atlas du spatial européen

Cartographie interactive du marché satellitaire européen : observation de la Terre, météorologie, défense, télécommunications et navigation.

Pour chacun des 62 programmes : financeur, maître d'ouvrage, maître d'œuvre, plateforme, instruments, application, budget (avec indice de confiance), planning, filiations et convergences.

## Les 8 vues

| # | Vue | Contenu |
|---|-----|---------|
| 0 | Mécanique du marché | Chaîne financeur → utilisateur, trois circuits types, grandes enveloppes budgétaires, notions clés |
| 1 | Carte des domaines | 5 familles, 9 domaines, tous les programmes |
| 2 | Fiches programmes | Fiche standardisée, recherche et filtres |
| 3 | Frise 1977-2045 | Réalisé et prévu, jalons de lancement |
| 4 | Généalogie | Filiations de missions et de plateformes industrielles |
| 5 | Convergences | Charges hébergées, échanges d'images, partenariats public-privé… |
| 6 | Lecture industrielle | Maîtrises d'œuvre, sites, tendances (consolidation, défense, constellations) |
| 7 | Glossaire & sources | Sigles, indice de confiance, sources |

## Consulter

Ouvrir `index.html` dans un navigateur, ou activer GitHub Pages (Settings → Pages → branche `main`, dossier racine).

## Mettre à jour les données

Toutes les données sont dans `src/data.js`. Après modification :

```bash
python3 build.py
```

Le script régénère `index.html` (page autonome pour GitHub Pages) et `dist/atlas.html`.

## Indice de confiance

- **A** : vérifié sur une source récente (octobre 2026)
- **B** : publié et connu, non revérifié
- **C** : estimation, ordre de grandeur ou donnée non publique

Données compilées en octobre 2026 à partir de sources publiques, listées dans la vue Glossaire & sources.
