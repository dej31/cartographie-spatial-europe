# Atlas du spatial européen

Cartographie interactive de l'écosystème spatial européen : observation de la Terre, météorologie, défense et sécurité, télécommunications, navigation, science et exploration, lanceurs.

Contenu (octobre 2026) :

- **134 programmes**, avec pour chacun le financeur, le maître d'ouvrage, le maître d'œuvre, la plateforme, les instruments, l'application, le budget (avec un indice de confiance), le planning, l'orbite, les filiations, les convergences et les acteurs impliqués.
- **177 acteurs**, dont 36 laboratoires et organismes de recherche, répartis dans 20 pays.
- **129 relations sourcées** :
  - entre organisations : groupe, filiale, coentreprise, consortium, acquisition, fusion ;
  - entre un acteur et un programme : maître d'œuvre, sous-traitant, fournisseur, opérateur, utilisateur, financeur, partenaire scientifique.
- **179 unités** (satellites et vols), 33 contrats publics, 17 levées de fonds, 36 lignées, 43 convergences et 315 liens sources.

## Les 10 vues

| # | Vue | Contenu |
|---|-----|---------|
| 0 | Mécanique | Chaîne financeur → utilisateur, cinq circuits types, grandes enveloppes, notions clés |
| 1 | Domaines | 7 familles, 21 domaines, tous les programmes |
| 2 | Fiches | Fiche standardisée par programme, recherche et filtres, acteurs impliqués avec leur rôle |
| 3 | Acteurs | Annuaire filtrable (10 catégories dont « Laboratoires & recherche »), statut UE / ESA du pays, groupe, relations sourcées, structure industrielle, acquisitions et fusions |
| 4 | Frise | 1965-2045, réalisé et prévu, jalons |
| 5 | Généalogie | Filiations de missions et de plateformes, suites commerciales |
| 6 | Convergences | Charges hébergées, troc, échanges d'images, partenariats public-privé… |
| 7 | Industrie | Parc de satellites (par taille et famille), maîtrises d'œuvre, sites, tendances |
| 8 | Finances | Contrats publics (reliés aux acteurs, avec le stade : annoncé, signé ou versé quand il est publié), levées de fonds, séries annuelles |
| 9 | Glossaire | Sigles, indice de confiance, sources |

## Liens directs

- `#domaines`, `#fiches`, `#acteurs`… ouvrent une vue. Le bouton « précédent » du navigateur fonctionne.
- `#fiche/<identifiant>` ouvre une fiche programme, par exemple `#fiche/sterna`.
- `#acteur/<identifiant>` ouvre un acteur, par exemple `#acteur/ohb-sweden`.

## Organisation des données

Les fichiers sont chargés dans cet ordre. Chacun complète ou corrige les précédents, sans les réécrire.

- `src/data.js` : référentiels (familles, domaines, statuts, groupes), 62 premiers programmes, lignées, convergences, budgets, sources, glossaire
- `src/data2.js` : science, exploration, lanceurs, sécurité et défense spatiales, liaisons optiques, services
- `src/data3.js` : annuaire des acteurs (première version), pays
- `src/data4.js` : données financières (contrats, levées, séries)
- `src/data5.js` : liens sources par programme, pilote visuels et échelle (10 programmes)
- `src/data6.js` : unités de chaque série, NewAthena, Athena-Fidus
- `src/data7.js` : orbites, parc de satellites, suites commerciales, SWISSto12 / HummingSat
- `src/data8.js` (phase 2) :
  - 23 programmes et 3 domaines, statut « Annulé » ;
  - 84 acteurs, catégorie « Laboratoires & recherche », identifiants stables des acteurs, statut UE / ESA des pays ;
  - liste `RELATIONS` ;
  - contrats reliés aux acteurs (`act`), avec leur stade (`eng`) ;
  - corrections et sources complémentaires.

### Modèle des relations (`RELATIONS`)

`{ de, vers, type, part?, a?, txt, bc, src }`

- `de` et `vers` : identifiant d'acteur ou de programme, ou nom libre pour une entité hors de l'atlas (par exemple « Kongsberg Gruppen »).
- `type` : nature de la relation (voir la liste ci-dessus).
- `part` : participation au capital, si elle est publiée.
- `a` : année.
- `bc` : indice de confiance.
- `src` : source (obligatoire).

Une relation acteur → programme ajoute automatiquement le programme à la liste de l'acteur.

## Consulter

Ouvrir `index.html` dans un navigateur. La page est publiée par GitHub Pages depuis la branche `main`, dossier racine.

## Mettre à jour et vérifier

```bash
python3 build.py          # régénère index.html et dist/atlas.html
node tools/check.js       # contrôles de cohérence (identifiants, références, doublons, sources)
node tools/smoke.js       # test navigateur (Playwright) : 10 vues, liens directs, bureau et mobile
```

`tools/check.js` s'arrête sur une erreur dès qu'une référence est cassée. Exemples : programme inexistant, acteur inconnu, relation sans source, identifiant en double.

## Indice de confiance

- **A** : vérifié sur une source récente (octobre 2026)
- **B** : publié et connu, non revérifié
- **C** : estimation, ordre de grandeur ou donnée non publique

« Non documenté » signifie que l'information n'est pas publique ou n'a pas été trouvée. Cela ne veut pas dire qu'elle est nulle.

## Règles de périmètre

- Les acteurs non européens n'apparaissent qu'au titre d'une filiale, d'une implantation ou d'une contribution documentée en Europe : Planet (Berlin), Spire (Glasgow, Luxembourg), Astroscale UK. Une simple présence commerciale ne suffit pas.
- Les centres et moyens d'essais ne sont pas des entités de l'atlas. Les entreprises qui en proposent peuvent figurer comme acteurs industriels.
- Les laboratoires ne sont retenus que si leur activité spatiale est documentée : instrument, mission ou rôle scientifique nommé.

Les photos du pilote sont servies depuis Wikimedia Commons. Leurs licences sont libres ; le crédit et la licence figurent sur la page de chaque fichier.

Données compilées en octobre 2026 à partir de sources publiques. Le détail de la phase 2 est dans `audit/rapport_phase2.md`.
