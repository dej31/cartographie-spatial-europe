# Atlas du spatial européen

Cartographie interactive de l'écosystème spatial européen : observation de la Terre, météorologie, défense et sécurité, télécommunications, navigation, science et exploration, lanceurs.

Contenu (octobre 2026) :

- **161 programmes**, avec pour chacun le financeur, le maître d'ouvrage, le maître d'œuvre, la plateforme, les instruments, l'application, le budget (avec un indice de confiance), le planning, l'orbite, les filiations, les convergences et les acteurs impliqués.
- **197 acteurs**, dont 37 laboratoires et organismes de recherche, répartis dans 20 pays.
- **205 relations sourcées** :
  - entre organisations : groupe, filiale, coentreprise, consortium, acquisition, fusion ;
  - entre un acteur et un programme : maître d'œuvre, sous-traitant, fournisseur, opérateur, utilisateur, financeur, partenaire scientifique.
- **192 unités** (satellites et vols), 42 contrats publics, 17 levées de fonds, 37 lignées, 50 convergences et 401 liens sources.
- **Part de la France dans les programmes de l'ESA** : souscription française au CM25 quand elle est publiée, barème du programme scientifique, sinon « non documenté ».
- **59 opportunités industrielles** (MLI, harnais, structures), **69 événements commerciaux** datés et **11 établissements** documentés, chacun avec ses sources.
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
| 6 | Prospection | Deux modes. **Opportunités métiers** (par défaut) : MLI, harnais et structures, statut confirmée / probable / à surveiller, score explicable sur 18, filtres (métier, statut, pays, acteur, programme, phase, confiance), tri par échéance ou par score, prochaines actions, journal des événements, export CSV. **Programmes** : programmes en développement ou en projet, acheteur, attributaire, jalons, budget ; export CSV |
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
- `#opp/<identifiant>` ouvre une opportunité, par exemple `#opp/galg2-lot2`.
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
- `src/data10.js` (phase 4) : finalistes M7 non retenus (M-MATISSE, THESEUS), statut « Non retenu », OneSat et Space Inspire
- `src/data12.js` (veille d'octobre 2026) : faits issus de la veille, rattachés à leurs sources publiques ; part de la France dans les programmes ESA (`frEsa`, tables `FR_ESA` et `FR_MAP`)
- `src/data11.js` (prospection par métier) : `OPPORTUNITES`, `EVENEMENTS`, `SITES`, référentiels `METIERS`, `PHASES`, `OPP_STATUTS`, `EVT_TYPES`, fonction `scoreOpp`, acteur Axon' Cable

### Modèle des opportunités (`OPPORTUNITES`)

`{ id, titre, prog, acheteur[], client, site, lot, metiers[], phase, ech{d, doc, lib}, qte{n, lib}, fab{mode, txt}, four[], valeur, statut, lotDoc, vol, bc, sources[{u, t, pub, verif}], action, note? }`

- `statut` : `confirmee` (consultation ou besoin d'achat publié), `probable` (engin documenté en développement ou en production, sous-traitance non prouvée), `surveiller` (programme en amont, lot attribué ou fenêtre passée).
- `ech` : prochaine échéance documentée ; `doc: false` signale une estimation.
- `four` : fournisseurs actuels cités par une source.
- `valeur` : toujours vide tant qu'aucune méthode défendable n'existe.
- `sources` : date de publication (`pub`, `null` si non documentée) et date de vérification (`verif`).

### Score (sur 18, six critères de 0 à 3, poids égaux)

Adéquation technique, maturité industrielle, volume, proximité de la décision, accessibilité du donneur d'ordre, qualité et fraîcheur des sources. Le budget d'un programme n'entre jamais dans le score. L'accessibilité est un jugement commercial : « non évaluée » (0) par défaut, elle se saisit sur chaque fiche et n'est gardée que dans le navigateur de l'utilisateur. Le détail du calcul est affiché sous chaque opportunité et en bas de la vue.

### Modèle des relations (`RELATIONS`)

`{ de, vers, type, part?, a?, txt, bc, src }`

- `de` et `vers` : identifiant d'acteur ou de programme, ou nom libre pour une entité hors de l'atlas (par exemple « Kongsberg Gruppen »).
- `type` : nature de la relation (voir la liste ci-dessus).
- `part` : participation au capital, si elle est publiée.
- `a` : année.
- `bc` : indice de confiance.
- `src` : source (obligatoire).

Une relation acteur → programme ajoute automatiquement le programme à la liste de l'acteur.

## Compteur de visites

Le site publié compte ses visites avec GoatCounter (https://atlas-spatial.goatcounter.com) : sans cookie, sans donnée personnelle. Chaque vue et chaque fiche (`#prospection`, `#fiche/sterna`…) est comptée séparément, seulement sur github.io (pas en local ni pendant les tests). Pour exclure ses propres visites, ouvrir une fois le site avec `#toggle-goatcounter` dans chaque navigateur utilisé.

## Consulter

Ouvrir `index.html` dans un navigateur. La page est publiée par GitHub Pages depuis la branche `main`, dossier racine.

## Mettre à jour et vérifier

```bash
python3 build.py          # régénère index.html et dist/atlas.html
node tools/check.js       # contrôles de cohérence (identifiants, références, doublons, sources)
node tools/smoke.js       # test navigateur (Playwright) : 13 vues, liens directs, opportunités, bureau et mobile
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

Données compilées en octobre 2026 à partir de sources publiques. Le détail des phases 2 à 4 est dans `audit/rapport_phase2.md`, `audit/rapport_phase3.md` et `audit/rapport_phase4.md` ; la prospection par métier dans `audit/diagnostic_prospection_metiers.md` et `audit/rapport_prospection_metiers.md`.
