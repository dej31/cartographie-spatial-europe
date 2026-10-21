# Rapport de mise en œuvre – phase 2

Atlas du spatial européen · 20 octobre 2026 · dépôt local `dej31/cartographie-spatial-europe`

## 0. Préambule

**Point de départ.**
- Le dépôt était propre (`git status` vide), au commit `9d67689`.
- Le PDF « Audit de couverture – Atlas du spatial européen.pdf » n'était pas joint. J'ai utilisé le rapport d'audit d'origine, rédigé dans la session précédente (Claude Doc du même nom), qui en est la source.

**Provenance des informations.** Ce rapport distingue trois natures d'information :
- **(audit)** : relevé dans le rapport d'audit ;
- **(vérifié)** : confirmé sur une source externe consultée le 20 octobre 2026, citée dans les données ;
- **(modélisation)** : choix de structure ou de classement fait par moi, et justifié.

## 1. Changements structurels (modélisation)

| Changement | Détail | Effet dans l'interface |
|---|---|---|
| Nouveau fichier `src/data8.js` | Chargé après `data7.js` ; `build.py` et `page.html` ont chacun une ligne de plus | Aucun changement d'architecture |
| Catégorie d'acteurs `lab` | « Laboratoires & recherche » | Nouveau filtre, compteur dans l'en-tête |
| Identifiants stables des acteurs (`id`) | Générés à partir du nom pour les 93 acteurs existants ; identifiants courts pour les plus cités (`esa`, `tas`, `airbus-ds`, `ohb-se`…) | Liens directs `#acteur/<id>` |
| Champs acteur `u` (site ou source) et `grp` (groupe) | Facultatifs | Lien « Site ou source », ligne « Groupe » |
| `PAYS_INFO` | Appartenance à l'UE et statut à l'ESA | Badges « UE », « hors UE », « ESA » sur chaque acteur |
| Liste `RELATIONS` (129 entrées) | `de`, `vers`, `type`, `part`, `a`, `txt`, `bc`, `src` (source obligatoire) | Relations sur la fiche acteur ; « Acteurs impliqués » avec leur rôle sur la fiche programme ; section « Structure industrielle » ; tableau des acquisitions et fusions |
| Contrats : `act` et `eng` | Lien vers l'acteur par identifiant ; stade « annoncé », « signé » ou « versé », seulement quand il est publié | Bénéficiaire cliquable et stade affichés dans Finances |
| Statut `ann` (« Annulé ») | Utilisé pour Mars Sample Return / Earth Return Orbiter | Pastille dédiée |
| 3 domaines | `nvx` Évolutions & navigation en orbite basse ; `ona` Programmes nationaux & bilatéraux civils ; `msp` Météorologie de l'espace | Vue Domaines |
| Navigation par adresse | Écoute de `hashchange` ; liens `#fiche/<id>` et `#acteur/<id>` | Le bouton « précédent » et les liens partagés fonctionnent |
| En-tête et vue Domaines | Compteurs recalculés (programmes, acteurs, laboratoires, filiations, convergences, relations) ; texte « 7 familles, 21 domaines » calculé | — |

Aucune fonctionnalité n'a été retirée. Aucune fiche n'a été simplifiée. Aucun identifiant de programme n'a changé.

## 2. Programmes ajoutés (24)

| Fiche | Domaine | Points clés (vérifié) |
|---|---|---|
| EGEP | Navigation, évolutions | Programme de R&D de l'ESA ; prédécesseur de Galileo 2e génération |
| Celeste (LEO-PNT) | Navigation, évolutions | 2 satellites lancés le 28 mars 2026 (Electron) ; GMV avec OHB, et Thales Alenia Space ; 11 satellites prévus |
| Scouts | Science ESA | HydroGNSS, premier Scout (SSTL), lancé le 28 nov. 2025 ; environ 35 M€ par mission |
| Φsat | Science ESA | Φsat-1 (2020), Φsat-2 (16 août 2024, Open Cosmos) |
| SWOT | Nationaux et bilatéraux | CNES et NASA ; NASA 807,4 M$, CNES 340 M€ ; plateforme Thales Alenia Space |
| MicroCarb | Nationaux et bilatéraux | Lancé le 26 juil. 2025 (Vega-C) ; satellite Thales Alenia Space Royaume-Uni, instrument Airbus, plateforme Myriade, 180 kg |
| EnMAP | Nationaux et bilatéraux | DLR ; OHB System ; lancé le 1er avril 2022 |
| PRISMA et PRISMA SG | Nationaux et bilatéraux | Une seule fiche pour les deux générations ; PRISMA SG : OHB Italia, plateforme Thales Alenia Space, charge utile Leonardo, lancement en 2031 |
| Constellation Atlantique | Nationaux et bilatéraux | Espagne et Portugal ; Open Cosmos, Satlantis, ICEYE ; + 325 M€ côté espagnol (2026) |
| Programme grec de micro-satellites | Nationaux et bilatéraux | Fonds de relance de l'UE ; Hellenic Fire System (OroraTech, mai 2026), Hyperion GR-1 (Open Cosmos Aegean, juil. 2026), CubeSats |
| MikroGlob | Observation militaire | Pologne ; Creotech ; 550 M PLN ; 4 satellites en orbite (oct. 2026) |
| LUXEOSys | Observation militaire | Luxembourg ; OHB Italia ; lancé le 26 août 2025 |
| Swing (ajout du 21 oct.) | Météorologie de l'espace | Premier nanosatellite de météo de l'espace de l'ESA ; Hemeria, contrat de 9,8 M€ (2024) ; centre d'opérations Planetek ; lancement prévu en 2027 |
| EPS-Sterna | Météorologie | EUMETSAT ; OHB Sweden, contrat de 248 M€ (mars 2026) ; précurseur : Arctic Weather Satellite (2024) |
| ScyLight | Liaisons optiques | Ligne ARTES ; démonstrateur HydRON (Thales Alenia Space) |
| Space for 5G/6G et D2D | Télécoms UE & R&D | Ligne ARTES ; projets documentés d'OQ Technology et de Sateliot |
| XMM-Newton | Science spatiale | Lancé le 10 déc. 1999 ; 689 M€ (conditions de 1999) ; prolongé à fin 2026, indicativement 2029 |
| CHEOPS | Science spatiale | Université de Berne ; Airbus DS Espagne ; prolongé jusqu'à fin 2029 (juin 2026) |
| Proba-3 | Science spatiale | Lancé le 5 déc. 2024 ; Sener ; coronographe ASPIICS (consortium mené par le Centre spatial de Liège) |
| Mars Sample Return / ERO | Exploration | Contrat Airbus de 491 M€ (2020) ; NASA : financement coupé (janv. 2026) ; arrêt de l'ERO demandé par les États membres (mars 2026) ; statut « Annulé » |
| Space Rider | Exploration | Thales Alenia Space et Avio ; vol inaugural prévu au 1er trimestre 2028 ; ≈ 346 M€ souscrits de 2019 à 2025 |
| FLPP | Lanceurs institutionnels | Programme préparatoire ; à l'origine de Prometheus et Themis |
| ASTRIS | Lanceurs institutionnels | ArianeGroup ; 90 M€ (2021) puis ≈ 100 M€ (CM25) ; premier vol visé en 2029 |
| Boost! | Micro-lanceurs | 44,2 M€ d'extensions en 2024 (HyImpulse, Isar, Orbex, RFA) |

**Choix de ne pas créer de fiche (modélisation).**
- **MikroSAR** : déjà représenté par POLSARIS. J'ai complété sa note avec le contrat de mai 2025, 860 M PLN.
- **PRISMA SG** : regroupé avec PRISMA dans une seule fiche.
- **Arctic Weather Satellite** : traité comme unité d'EPS-Sterna.
- **YODA, TOUTATIS, EGIDE** : restent dans ARES.

Chaque nouvelle fiche a de 1 à 3 sources et ses unités. Le parc n'est renseigné que quand le décompte est publié ; une masse non publiée est notée `null`.

## 3. Programmes corrigés

| Programme | Correction | Source |
|---|---|---|
| FORUM | Maître d'œuvre : Airbus DS Royaume-Uni (juin 2022), contrat de 160 M€ ; instrument OHB ; mécanismes Sener | ESA, Sener |
| Harmony | Maître d'œuvre : OHB System (oct. 2024), plus de 280 M€ ; radars Thales Alenia Space Italie | OHB, Thales |
| WIVERN | Sélection confirmée le 23 sept. 2025 ; maître d'œuvre non publié | ESA |
| Sentinel NG | 2NG : phase A/B confiée à deux industriels, dont OHB System (janv. 2024, 6 M€ chacun) ; 3NG non attribué | OHB |
| IRIS (successeur de CSO) | 2 satellites (EHRmin, EHRmax) ; études confiées à Airbus DS et Thales Alenia Space ; commande d'environ 1 Md€ non notifiée au 30 sept. 2026 (indice C) ; note anti-confusion avec IRIS² | Opex360 |
| IRIS² | Note anti-confusion avec IRIS | — |
| Jason | Jason-3 encore en service ; incident août-sept. 2026, récupération annoncée le 3 sept. ; statut du programme passé de « Terminé » à « En service » | NOAA OSPO |
| ClearSpace | Contrat ESA de 86 M€ (nov. 2020) ; nouvelle cible PROBA-1 (avril 2024) ; lancement prévu en 2028 | Wikipédia (sources ESA) |
| Vigil | Déplacé dans « Météorologie de l'espace » (famille Météorologie) ; contrat reclassé en Météo | Modélisation : mission de surveillance solaire, mal trouvée en Défense & sécurité |
| POLSARIS | Contrat MikroSAR, 4 satellites sur 6 en orbite | Defence24, Spider's Web |
| Lignée Proteus / Myriade | Jason-2, Jason-3 et MicroCarb reliés | — |
| Lignée exoplanètes | CHEOPS relié à sa fiche | — |
| Filiations | FLPP → Themis, CHEOPS → PLATO, XMM-Newton → NewAthena, EGEP → Galileo 2e génération | ESA |
| Conférence ministérielle 2025 | 22,1 Md€ confirmé : total des souscriptions des 23 États membres. Le chiffre de 22,3 Md€ parfois cité vient de la demande initiale de l'ESA (22,25 Md€) | DLR, European Spaceflight |
| ICEYE (levées de fonds) | Famille passée de Défense à Observation, comme la fiche ; caractère dual noté sur l'acteur | Modélisation |
| KSAT | Note : société distincte de Kongsberg Defence & Aerospace | — |

## 4. Acteurs ajoutés (84)

**Institutions (16).** Agence européenne de défense, Agence de l'innovation de défense, CDTI, INTA, UK Space Command, Satellite Applications Catapult, Netherlands Space Office, BELSPO, Swiss Space Office, agences suédoise et norvégienne, FFG (Autriche), Portugal Space, Hellenic Space Center, Business Finland, ROSA (Roumanie).

**Industrie (21).**
- Maîtres d'œuvre : OHB System, OHB Sweden, Creotech.
- Services : Deimos (racheté par Indra), Safran Data Systems.
- Équipementiers : Kongsberg Defence & Aerospace, Nammo, ThrustMe, Enpulsion, GomSpace, Bertin Technologies, Lynred, 3D PLUS, Teledyne e2v, Cilas, AMOS, Thales SESO, STMicroelectronics.
- Lancement : Europropulsion, HyImpulse.

**NewSpace et services (11).** OQ Technology, Sateliot, Lacuna Space, Neuraspace, OKAPI:Orbits, Kayrros, LiveEO, Libre Space Foundation, Planetek Hellas, Planet Labs (filiale allemande), Spire Global (implantations européennes), Astroscale UK.

**Règle pour les acteurs non européens (modélisation).** Un acteur non européen n'est retenu qu'avec une filiale, une implantation industrielle ou un contrat européen documentés.
- **Retenus** : Planet (Berlin, contrat Copernicus de 2025), Spire (Glasgow et Luxembourg, contrats EUMETSAT), Astroscale UK (ELSA-M avec Eutelsat OneWeb).
- **Non retenus** faute d'activité européenne documentée trouvée : Satellogic, GHGSat, EarthDaily.
- **Non retenus pour d'autres raisons** :
  - CGI : activité européenne réelle, mais rôle par programme insuffisamment documenté. CGI apparaît comme partenaire de Φsat-2, à arbitrer.
  - SAB Aerospace : informations publiques insuffisantes.
  - Institut d'Optique : activité spatiale non centrale.

**Répartition par pays.** La France passe de 31 % à 28 % des acteurs (49 sur 177).
- Pays-Bas : 0 → 6 acteurs.
- Belgique : 2 → 8.
- Royaume-Uni : 6 → 14.
- Espagne : 9 → 15.
- Suède : 2 → 7.
- Nouveaux pays : Autriche, Portugal, Grèce, Roumanie.

Je n'ai pas cherché d'objectif chiffré par pays.

## 5. Laboratoires et organismes de recherche (36)

CNRS (Insu), LATMOS, LAM, LESIA, IAS, APC, IPGP, Observatoire de Paris, CEA (Irfu), Société Max Planck (MPS, MPE, AEI), Fraunhofer, INAF, CNR, IAC, IEEC, KU Leuven, TU Delft, Chalmers, KTH, ETH Zurich, EPFL, Université de Berne, SRON, TNO, KNMI, RAL Space, MSSL, BIRA-IASB, Centre spatial de Liège, IRF, DTU Space, FMI, VTT, CBK PAN, VITO, NLR.

Un lien vers un programme n'est posé que pour un instrument ou un rôle nommé. Exemples :
- NISP d'Euclid → LAM ;
- VIS d'Euclid → MSSL ;
- RPW de Solar Orbiter → LESIA ;
- PHI de Solar Orbiter → MPS ;
- PEP de JUICE → IRF ;
- CHEOPS → Université de Berne ;
- TROPOMI → KNMI, SRON, TNO ;
- ASPIICS et EUI → CSL ;
- NOMAD → BIRA ;
- MicrOmega → IAS ;
- PHEBUS → LATMOS.

Pour KU Leuven, TU Delft, Chalmers, KTH, IAC, CNR, Fraunhofer, FMI, VTT, CBK PAN et NLR, l'activité est décrite sans lien vers un programme.

Aucune entité « moyen d'essais » n'a été créée, et il n'existe pas de catégorie « essai ».

## 6. Relations industrielles ajoutées (129)

- **Groupes, filiales, coentreprises, participations (≈ 35).**
  - Thales et Leonardo → Thales Alenia Space (67 % et 33 %), puis → Telespazio (33 % et 67 %).
  - Telespazio → e-GEOS.
  - Airbus DS → SSTL, Jena-Optronik.
  - Airbus et Safran → ArianeGroup, puis → Arianespace, MaiaSpace.
  - ArianeGroup et Avio → Europropulsion.
  - OHB SE → OHB System, OHB Italia, OHB Sweden.
  - Safran → Safran Data Systems, Cilas.
  - Thales et Safran → Lynred ; Thales → Thales SESO.
  - Kongsberg → KDA et KSAT, présentées comme sociétés distinctes.
  - HEICO → 3D PLUS ; ICEYE → ICEYE Polska ; Open Cosmos → Open Cosmos Aegean.
- **Acquisitions, fusions, essaimages, projets.**
  - Indra → Deimos (2024), Teledyne → e2v (2017), RUAG → Beyond Gravity (2022).
  - Eutelsat-OneWeb (2023), SES → Intelsat (2025).
  - AAC Clyde Space → Omnisys, EPFL → ClearSpace.
  - Projet Bromo (Airbus 35 %, Thales 32,5 %, Leonardo 32,5 % ; protocole d'octobre 2025, non notifié à Bruxelles en juin 2026).
- **Consortium et partenariats.** SpaceRISE pour IRIS² ; Astroscale UK avec Eutelsat ; Spire avec EUMETSAT ; Planet avec l'ESA.
- **Rôles par programme (≈ 85).** Maître d'œuvre, sous-traitant, fournisseur, opérateur, utilisateur, financeur, partenaire scientifique ou bénéficiaire. Chaque rôle a sa source et son indice de confiance.

Je n'ai posé aucune lignée sur une simple ressemblance. La filiation « Elite » citée dans l'audit n'est pas documentée : je ne l'ai pas créée (voir § 9).

## 7. Contrats

- **Contrats existants.** Les 24 contrats sont reliés à leurs acteurs par identifiant. Les réservations du European Launcher Challenge sont marquées « annoncé ».
- **Contrats ajoutés (9), tous signés :**
  - ClearSpace-1, 86 M€ (2020) ;
  - Earth Return Orbiter, 491 M€ (2020) ;
  - ASTRIS, 90 M€ (2021) ;
  - FORUM, 160 M€ (2022) ;
  - Sentinel-2NG phase A/B, 6 M€ (2024) ;
  - Harmony, 280 M€ (2024) ;
  - Boost!, 44,2 M€ (2024) ;
  - MikroGlob, ≈ 128 M€ (550 M PLN converti, indice C) ;
  - EPS-Sterna, 248 M€ (2026).
- **Levées.** Toutes sont reliées à un acteur.
- **Sommes versées.** Aucune n'est publiée pour ces contrats : le stade « versé » n'est utilisé nulle part.

## 8. Principales sources

- **Agences** : ESA (pages Celeste, HydroGNSS, Φsat-2, Proba-3, WIVERN, ASTRIS, Boost!, FLPP, ScyLight, D2D, FORUM, prolongations scientifiques, Ariane 6 « made in Norway », programme grec), CNES (MicroCarb), DLR (EnMAP, CM25), NASA JPL (SWOT), NOAA OSPO (Jason-3), gouvernement du Luxembourg (LUXEOSys), Portugal Space.
- **Industriels** : OHB (EPS-Sterna, Harmony, Sentinel-2NG), Thales Alenia Space (Harmony, PRISMA SG, HydRON, MicroCarb), Sener (Proba-3, FORUM), SSTL, OroraTech, Astroscale, Spire, Planet, Sateliot, OQ Technology, Kongsberg.
- **Presse et références** : European Spaceflight (CM25, ERO, ASTRIS), Opex360 (IRIS), Defence24 et Spider's Web (MikroGlob, MikroSAR), Greek News Agenda, Großwald (projet Bromo), SatNews, Wikipédia (Space Rider, Constellation Atlantique, EPS-Sterna, ClearSpace-1, XMM-Newton, Φsat-2, Hellenic Space Center), arXiv (ASPIICS).

## 9. Informations encore incertaines

| Sujet | Incertitude |
|---|---|
| EPS-Sterna | « 3 générations de 6 satellites » contre « 20 satellites » dans la même source |
| Programme grec | 13, 15 ou 18 micro-satellites selon les sources ; budget du volet micro-satellites non publié |
| IRIS | Montant et répartition Airbus / Thales Alenia Space issus de la presse, non confirmés par le ministère (indice C) |
| MikroGlob | Conversion PLN → € approximative ; lanceur du premier satellite non documenté |
| Φsat-1 | Date de fin de mission non documentée |
| Relations en confiance B | Parts de capital de Telespazio, e-GEOS, KSAT ; Cilas (Safran et MBDA) ; acquisition d'Omnisys par AAC Clyde Space ; rôles des laboratoires ; Deimos (finalisation du rachat par Indra à confirmer) |
| Bulgarie | Statut à l'ESA non vérifié (« à vérifier ») |
| Lignée « Elite » | Citée dans l'audit, non documentée : non créée |
| Budgets en confiance C | Toujours 69 programmes historiques en C. Je les ai revus sans en promouvoir aucun : il faut une source primaire par programme |
| Masses | Non publiées pour Celeste, HydroGNSS, Proba-3, CHEOPS, EPS-Sterna, programme grec, MikroGlob, LUXEOSys |
| Sources uniques | Pléiades Neo Next, SAR-Lupe, Hispasat, Andøya, SaxaVord, Esrange, EGEP, Φsat, XMM-Newton, MSR et Boost! n'ont encore qu'une ou deux sources |

## 10. Évolutions restant à arbitrer

1. **Vigil.** Je l'ai déplacé en Météorologie de l'espace : à confirmer, ou à remettre en Sécurité spatiale.
2. **Acteurs non européens.** Faut-il inclure CGI, Satellogic, GHGSat ou EarthDaily s'ils ont une activité européenne documentée ?
3. **« Poleos ».** Le nom de la suite polonaise de Pléiades Neo n'est toujours pas confirmé.
4. **Projet Bromo.** Le modéliser comme acteur dès sa création effective ?
5. **Deux fiches pour PRISMA ?** Séparer PRISMA et PRISMA SG si une comparaison chiffrée l'exige.
6. **Mission ≠ programme.** Ajouter un niveau « mission » distinct, pour Copernicus ou les Earth Explorers par exemple.
7. **Images Wikimedia.** Vérifier les licences une par une avant toute réutilisation hors du site.

## 11. Contrôles exécutés

| Contrôle | Commande | Résultat |
|---|---|---|
| Syntaxe JavaScript des données et de `app.js` | `node tools/check.js` (évaluation et `vm.Script`) | OK |
| Unicité des identifiants et des noms (programmes, acteurs, relations) | `node tools/check.js` | 0 doublon |
| Références (filiations, embarquement, lignées, convergences, unités, parc, liens, visuels, suites, acteurs → programmes, relations, contrats, levées, sources des budgets) | `node tools/check.js` | 0 erreur ; 11 avertissements « une seule source » |
| Catégories, domaines, statuts et pays pris en charge | `node tools/check.js` | OK |
| Construction officielle | `python3 build.py` | `index.html` et `dist/atlas.html` régénérés (≈ 413 ko) |
| Navigateur, bureau 1400 × 900 et mobile 390 × 844 | `node tools/smoke.js` | 10 vues ouvertes par `#hash`, aucun débordement horizontal, aucune erreur JS, 134 fiches ouvertes par `#fiche/<id>`, `#acteur/<id>`, filtre Laboratoires (36), clic acteur depuis une fiche, liens acteurs dans Finances : **aucune erreur** |
| Inspection visuelle | Captures des vues principales | En-tête, Domaines, fiche EPS-Sterna, fiche acteur, structure industrielle : conformes |
| Configuration GitHub Pages | Lecture de `.gitignore` et des fichiers à la racine | Inchangée : `index.html` à la racine, branche `main` |

**Non vérifié.** L'existence en ligne de chaque URL de site officiel, faute d'accès réseau depuis le terminal. Les URL des sources de faits viennent de résultats de recherche ; plusieurs sites officiels d'acteurs sont des pages d'accueil saisies à la main et non revérifiées une par une.

## 12. Fichiers modifiés

- `build.py` : ajout de `data8.js`
- `src/page.html` : emplacement `/*__DATA8__*/` et styles (badges, relations, structure, statut « Annulé », compteurs sur 3 colonnes)
- `src/app.js` : acteurs impliqués, relations, structure industrielle, liens contrats → acteurs, `hashchange`, liens directs, compteurs
- `src/data8.js` (nouveau)
- `tools/check.js` et `tools/smoke.js` (nouveaux)
- `index.html` et `dist/atlas.html` (régénérés)
- `README.md`
- `audit/rapport_phase2.md` (ce fichier)

Les fichiers `data.js` à `data7.js` n'ont pas été modifiés : toutes les corrections passent par `data8.js`, ce qui garde l'historique lisible.

## 13. Commandes réellement exécutées

`git status --short`, `git log --oneline`, lecture des fichiers (`sed`, `grep`), `python3 build.py`, `node tools/check.js`, `node tools/smoke.js <dossier de captures>`, scripts Python d'édition ciblée, `git diff --stat`.

## 14. Publication

**Aucune publication distante n'a été faite** : ni `git commit`, ni `git push`, ni mise à jour de l'artefact Claude. Les modifications sont dans la copie de travail locale, prêtes à être relues et publiées.
