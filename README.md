# Atlas du spatial européen

Cartographie interactive de l'écosystème spatial européen : observation de la Terre, météorologie, défense et sécurité, télécommunications, navigation, science et exploration, lanceurs.

Pour chacun des 108 programmes : financeur, maître d'ouvrage, maître d'œuvre, plateforme, instruments, application, budget (avec indice de confiance), planning, filiations et convergences.

## Les 10 vues

| # | Vue | Contenu |
|---|-----|---------|
| 0 | Mécanique | Chaîne financeur → utilisateur, cinq circuits types, grandes enveloppes, notions clés |
| 1 | Domaines | 7 familles, 18 domaines, tous les programmes |
| 2 | Fiches | Fiche standardisée par programme, recherche et filtres |
| 3 | Acteurs | 92 acteurs : institutions, grands groupes, équipementiers, opérateurs, NewSpace, financeurs |
| 4 | Frise | 1965-2045, réalisé et prévu, jalons |
| 5 | Généalogie | Filiations de missions et de plateformes |
| 6 | Convergences | Charges hébergées, troc, échanges d'images, partenariats public-privé… |
| 7 | Industrie | Maîtrises d'œuvre, sites, tendances |
| 8 | Finances | Tableau de bord filtrable : contrats publics, levées de fonds, séries annuelles |
| 9 | Glossaire | Sigles, indice de confiance, sources |

## Organisation des données

- `src/data.js` : programmes satellites de la première version
- `src/data2.js` : science, exploration, lanceurs, sécurité et défense spatiales, liaisons optiques, services
- `src/data3.js` : annuaire des acteurs
- `src/data4.js` : données financières (contrats, levées, séries)

## Consulter

Ouvrir `index.html` dans un navigateur, ou activer GitHub Pages (Settings → Pages → branche `main`, dossier racine).

## Mettre à jour les données

Les données sont dans `src/data*.js`. Après modification :

```bash
python3 build.py
```

Le script régénère `index.html` (page autonome pour GitHub Pages) et `dist/atlas.html`.

## Indice de confiance

- **A** : vérifié sur une source récente (octobre 2026)
- **B** : publié et connu, non revérifié
- **C** : estimation, ordre de grandeur ou donnée non publique

Données compilées en octobre 2026 à partir de sources publiques, listées dans la vue Glossaire & sources.
