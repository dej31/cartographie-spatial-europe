# Atlas du spatial européen

Cartographie interactive de l'écosystème spatial européen : observation de la Terre, météorologie, défense et sécurité, télécommunications, navigation, science et exploration, lanceurs.

Contenu (octobre 2026) :

- **155 programmes**, avec pour chacun le financeur, le maître d'ouvrage, le maître d'œuvre, la plateforme, les instruments, l'application, le budget (avec un indice de confiance), le planning, l'orbite, les filiations, les convergences et les acteurs impliqués.
- **190 acteurs**, dont 37 laboratoires et organismes de recherche, répartis dans 20 pays.
- **188 relations sourcées** :
  - entre organisations : groupe, filiale, coentreprise, consortium, acquisition, fusion ;
  - entre un acteur et un programme : maître d'œuvre, sous-traitant, fournisseur, opérateur, utilisateur, financeur, partenaire scientifique.
- **191 unités** (satellites et vols), 42 contrats publics, 17 levées de fonds, 37 lignées, 47 convergences et 362 liens sources.
- **49 fiches illustrées** : 32 photos libres de Wikimedia Commons, des dimensions et des masses sourcées, 30 schémas à l'échelle humaine.

## Les 13 vues

| # | Vue | Contenu |
|---|-----|---------|
| 0 | Vue d'ensemble | Indicateurs clés, jalons de l'année suivante, plus gros contrats récents, acteurs les plus connectés, programmes à attribuer, accès rapides |
| 1 | Mécanique | Chaîne financeur → utilisateur, cinq circuits types, grandes enveloppes, notions clés |
| 2 | Domaines | 7 familles, 21 domaines, tous les programmes |
| 3 | Fiches | Fiche standardisée par programme, recherche et filtres, acteurs impliqués avec leur rôle, lien partageable |
| 4 | Acteurs | Annuaire filtrable et fiche acteur complète : groupe, programmes et rôles, relations par nature, partenaires, concurrents potentiels (calcul indicatif), sources |
| 5 | Réseau | Cartographie interactive : autour d'un acteur ou d'un programme, groupes et filiales, réseau complet ; liens typés capital, contrat, coopération ou participation ; filtres pays, domaine, type d'acteur, période |
| 6 | Prospection | Programmes en développement ou en projet : acheteur, attributaire, jalons, budget, opportunités documentées ; export CSV |
| 7 | Frise | 1965-2045, réalisé et prévu, jalons |
| 8 | Généalogie | Filiations de missions et de plateformes, suites commerciales |
| 9 | Convergences | Charges hébergées, troc, échanges d'images, partenariats public-privé, compétitions |
| 10 | Industrie | Parc de satellites (par taille et famille), maîtrises d'œuvre, sites, tendances |
| 11 | Finances | Contrats publics reliés aux acteurs, levées de fonds, séries annuelles |
| 12 | Glossaire | Sigles, indice de confiance, sources |

## Liens directs

- **Recherche globale** sous les onglets (raccourci « / ») : programmes, acteurs, laboratoires, pays, sigles.
- `#domaines`, `#fiches`, `#acteurs`, `#reseau`, `#prospection`… ouvrent une vue. Les boutons « précédent » et « suivant » du navigateur fonctionnent.
- `#fiche/<identifiant>` ouvre une fiche programme, par exemple `#fiche/sterna`.
- `#acteur/<identifiant>` ouvre la fiche d'un acteur, par exemple `#acteur/ohb-sweden`.
- `#reseau/A:<acteur>` ou `#reseau/P:<programme>` centre la cartographie, par exemple `#reseau/A:airbus-ds`.
- Chaque fiche a un bouton « Copier le lien ».

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
  - 24 programmes et 3 domaines, statut « Annulé » ;
  - 84 acteurs, catégorie « Laboratoires & recherche », identifiants stables des acteurs, statut UE / ESA des pays ;
  - liste `RELATIONS` ;
  - contrats reliés aux acteurs (`act`), avec leur stade (`eng`) ;
  - corrections et sources complémentaires.
- `src/data9.js` (phase 3) : 18 programmes et 13 acteurs orientés prospection, champ `pros` (opportunités documentées), structure industrielle d'IRIS² et contrat ALADDIN, 39 fiches illustrées supplémentaires (`VISUELS`).
- `src/data10.js` (phase 4) : finalistes M7 non retenus (M-MATISSE, THESEUS), statut « Non retenu »

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

Données compilées en octobre 2026 à partir de sources publiques. Le détail des phases 2 à 4 est dans `audit/rapport_phase2.md`, `audit/rapport_phase3.md` et `audit/rapport_phase4.md`.
