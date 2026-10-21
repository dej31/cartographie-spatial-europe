# Rapport de mise en œuvre – phase 3 (prospection)

Atlas du spatial européen · 21 octobre 2026

## Demande

- Ajouter photos et dimensions sur un maximum de fiches.
- Étoffer les programmes en développement ou en projet, dans un objectif de prospection commerciale.
- Ajouter les acteurs signalés comme absents : REVALTO, U-Space et ses programmes, Sateliot, Satlantis France, Astroscale France, ELSA-M.
- Faire une recherche approfondie pour trouver d'autres acteurs et programmes.

## Ce qui était déjà présent

- **Sateliot** : présent dans l'annuaire depuis la phase 2, sans fiche pour sa constellation. Celle-ci est maintenant ajoutée.
- **U-Space** : présent, mais sans programme lié. Il est désormais relié à ARES pour la démonstration TOUTATIS.
- **Satlantis** : présent (Espagne). Sa filiale française est ajoutée.
- **Astroscale UK** : présent. ELSA-M et Astroscale France sont ajoutés.

## Nouvelle vue « Prospection »

Elle liste les 62 programmes en développement ou en projet, ainsi que ceux en service qui portent des opportunités documentées. Chaque carte indique :
- l'acheteur ;
- l'attributaire connu ;
- un repère « à attribuer ou non publié » ;
- le dernier et le prochain jalon ;
- le budget avec son indice de confiance ;
- les opportunités documentées ;
- le nombre d'acteurs et de sources.

Les filtres portent sur la famille, l'horizon du prochain jalon, une recherche libre et le seul critère « sans maître d'œuvre attribué ». La liste filtrée s'exporte en CSV (séparateur point-virgule, compatible Excel).

Le champ `pros` ne contient que des faits sourcés (appel d'offres attendu, sous-traitance en cours, mission pas encore adoptée…). Je n'ai fait aucune estimation de marché.

## Programmes ajoutés (18)

| Fiche | Points clés |
|---|---|
| REVALTO (ex-H2R) | Appel d'offres CNES et France 2030 remporté par BWI (juin 2025) ; Hemeria (plateforme, intégration, opérations), Anywaves (altimètre) |
| ELSA-M | Astroscale UK ; 520 kg ; lancement par Isar Aerospace (mars 2026) ; 13,95 M€ ESA et UK Space Agency |
| Constellation Sateliot | 4 satellites (2024), 5 commandés à Alén Space (2025), plus de 100 visés |
| EnVision | Thales Alenia Space (janv. 2025, ≈ 367 M€) ; instruments NASA, ASI, DLR, BELSPO, CNES |
| TRUTHS | Airbus Royaume-Uni ; lancement visé en 2030 |
| Aeolus-2 | Airbus, contrat initial de juillet 2026 ; ESA et EUMETSAT |
| NGGM | Gravimétrie laser ; lancement visé en 2032 ; maître d'œuvre non publié |
| RISE | D-Orbit, 119,6 M€ ; lancement visé en 2028 |
| Plasma Observatory (M7) | Recommandée en juin 2026, décision finale en novembre 2026 |
| ERS et EOGS | Programme ESA d'environ 1 Md€ décidé au CM25 ; études EOGS confiées à ICEYE et Leonardo (sept. 2026) |
| Callisto | CNES, DLR, JAXA ; premier vol en 2027 ; 14 m |
| SATCOMBw étape 4 | Plus de 100 satellites ; attribution attendue fin 2026 - début 2027 ; coentreprise OHB-Rheinmetall |
| ISTARI | Tyche et Juno (SSTL), Oberon (Airbus, 127 M£) |
| PAZ 2 | Airbus Espagne pour Hisdesat ; en service mi-2031 |
| SICRAL 3 | Thales Alenia Space et Telespazio ; 159 M€ pour les phases B et C |
| TRISHNA | CNES et ISRO ; instrument Airbus ; lancement en 2027 |
| SVOM | CNES et CNSA ; en service depuis juin 2024 |
| ALTIUS | Redwire Space (ex-QinetiQ Space) ; lancement en 2027 |

## Corrections

- **IRIS²** :
  - Airbus construit les 66 premiers satellites ;
  - Thales Alenia Space fournit les charges utiles gouvernementales (≈ 500 M€) ;
  - Aerospacelab fournit 264 plateformes ;
  - SES fournit la couche en orbite moyenne ;
  - Hispasat assure le segment sol ;
  - la constellation compte 348 satellites (septembre 2026).
- **Retour de cargo** : contrat ALADDIN de 760 M€ attribué à The Exploration Company (septembre 2026).
- **ARES** : TOUTATIS est confié à U-Space avec MBDA (sélection de l'AID, 2024).
- **QinetiQ Space** : rebaptisé Redwire Space (rachat de 2022). L'identifiant est conservé.
- **U-Space** : année de création corrigée de 2019 à 2018.

## Acteurs ajoutés (13)

ONERA, BWI, Anywaves, Satlantis France, Astroscale France, Alén Space, Syntony (en cours de rachat par Safran), Steel Electronique, Isaware, EIDEL, Planetek Italia, MBDA, OHB Rheinmetall Space Networks.

J'ai aussi ajouté **56 relations** (groupes, rachats, rôles par programme) et **8 contrats**.

## Photos et dimensions

**49 fiches illustrées au lieu de 10** : 32 photos et 30 schémas à l'échelle humaine. Les dimensions et les masses viennent des pages Wikipédia ou des agences citées, recopiées telles qu'elles sont écrites.

**Limite importante.** Depuis cet environnement, le terminal n'a pas accès à Wikimedia Commons. J'ai donc choisi les photos d'après le nom du fichier et sa catégorie sur Commons, sans les voir. J'ai retenu en priorité les noms explicites (« model », « maquette », « spacecraft », « illustration »), mais un fichier peut ne pas montrer exactement ce que son nom laisse penser. À vérifier en ligne :
- `Solar_Orbiter_ESA20813950.jpg`
- `LISA.jpg`
- `ESA_Biomass_Satellite_seeing_wood_through_trees.png`
- la photo de Jason-2, utilisée pour toute la série Jason

**Programmes sans photo libre trouvée** : Envisat, GOCE, SMOS, Swarm, EarthCARE, TerraSAR-X, Sentinel-6, CHEOPS, Proba-3, Space Rider, Pléiades et la plupart des programmes militaires. Leur fiche affiche les dimensions quand elles sont publiées.

## Contrôles

- `python3 build.py` : construction réussie.
- `node tools/check.js` : aucune erreur. 7 programmes n'ont encore qu'une source.
- `node tools/smoke.js` (bureau et mobile) : aucune erreur.
  - 11 vues ouvertes, aucun débordement horizontal.
  - 153 fiches ouvertes sans erreur.
  - Prospection : 63 cartes, dont 6 sans maître d'œuvre attribué ; le filtre et l'export CSV fonctionnent.
- Non vérifié : l'affichage réel des photos (accès réseau bloqué pendant les tests).

## Fichiers modifiés

- `src/data9.js` (nouveau)
- `src/app.js` : vue Prospection, export CSV, texte du marqueur ◧
- `src/page.html` : section `v-prospection`, styles
- `build.py`
- `tools/smoke.js`
- `README.md`
- `index.html` et `dist/atlas.html` (régénérés)
- `audit/rapport_phase3.md`

Rien n'a été poussé sur GitHub.
