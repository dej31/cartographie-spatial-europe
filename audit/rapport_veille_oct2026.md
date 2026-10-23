# Rapport – vague de veille et part de la France (ESA)

Atlas du spatial européen · 23 octobre 2026

## Demande

- Intégrer la veille marketing et les numéros 245 à 248 d'Aerospatium, pour le spatial uniquement.
- Afficher la part de la France dans les programmes de l'ESA.
- Ajouter ReOrbit.

## Méthode

- **Rien n'est cité depuis Aerospatium ni depuis la veille interne.** Chaque fait est rattaché à sa source publique d'origine : communiqué d'industriel ou d'agence, presse en accès libre. Toutes les sources sont vérifiées le 23 octobre 2026.
- **Les analyses commerciales de la veille interne ne sont pas reprises** : lignes « opportunité à creuser » et « voir CRM ».
- **Les faits sans source publique retrouvée sont écartés** (liste plus bas).

## Part de la France dans les programmes de l'ESA

Nouveau champ `frEsa`, affiché sur chaque fiche (« Part de la France (ESA) ») et ajouté à l'export CSV des programmes.

- **Programmes facultatifs : 29 fiches.** La part est calculée par l'atlas : souscription française ÷ total souscrit, par ligne du document ESA/C-M(2025)100 rev.5 (CM25, novembre 2025). Exemples :
  - Copernicus CSC-4 : 23,0 % ;
  - SEATS Ariane 6 : 52,6 % ;
  - connectivité sécurisée (IRIS²), élément 1 : 48,8 % ;
  - LEO-PNT : 16,5 % ;
  - E3P : 11,5 % ;
  - European Launcher Challenge : 19,8 %, part commune à tous les lanceurs.
- **Aucune souscription française au CM25 : 2 fiches** (Moonlight, Space Rider étape 3.1).
- **Programme scientifique obligatoire : 16 fiches.** Mention « barème fondé sur le revenu national ». L'ESA parle de « Gross National Product », et non de PIB.
- **Non documenté : 39 fiches.** Programmes ESA dont la ligne de souscription n'a pas été rattachée avec certitude : programmes plus anciens, EUMETSAT, Earth Watch, GSTP, etc.

**Limites.**
- Les lignes du document sont exprimées dans des conditions économiques différentes.
- Une ligne couvre souvent plusieurs missions : la part est celle de l'enveloppe, pas de la mission.
- Les souscriptions des conseils antérieurs (2019, 2022) ne sont pas intégrées.

## Ajouts et corrections

- **Nouveaux programmes** :
  - NigComSat-2A (Thales Alenia Space) ;
  - GovSat-2 (Thales Alenia Space, Luxembourg) ;
  - constellation militaire belge (environ 200 M€, 2030) ;
  - deux petits satellites géostationnaires ReOrbit pour SLI (150 M€).
- **Nouveaux acteurs** : ReOrbit, Spacebel, Sirius Space Services, Space Inventor, Osmos X, Défense belge.
- **Corrections** :
  - **IRIS²** : plateformes MEO confiées à OHB (près de 1 Md€) et charges utiles réalisées par SES ; lancements de la couche L2 en 2030.
  - **Ariane 6** : anomalie de turbopompe, six vols au plus en 2026 ; une dizaine de lancements commandés au Sommet de Paris.
  - **Orbex** : cessation d'activité le 18 février 2026 (statut « Annulé »).
  - **Gateway** : abandonné par la NASA le 24 mars 2026 (statut « Annulé ») ; le sort du matériel européen n'est pas tranché.
  - **SpainSat NG** : NG II perdu ; NG III commandé, lancement au 3e trimestre 2030.
  - **CERES** : CASSIOPÉE confié à Airbus et Unseenlabs (relève d'ici 2032).
  - **Space Inspire** : 7e satellite (Es'hailSat, exploité avec Türksat).
  - **European Launcher Challenge** : contrats d'Isar, RFA et PLD Space ; MaiaFactory ; Latitude depuis Oman.
  - **The Exploration Company** : série C de 450 M$.
  - **Constellation Atlantique** : deux radars portugais de plus.
  - **Fiches d'acteurs complétées** : Open Cosmos, U-Space, Infinite Orbits, HyPrSpace, Unseenlabs.
- **Prospection** :
  - 12 opportunités ajoutées : CASSIOPÉE, SpainSat NG III, NigComSat-2A, GovSat-2, constellation belge, ReOrbit, Isar, PLD Space et RFA, HyPrSpace, Spacebel, Constellr et Space Inventor, TAC ;
  - 8 opportunités mises à jour, dont la couche MEO d'IRIS², qui passe de « à surveiller » à « probable » ;
  - 27 événements ajoutés.

## Faits écartés faute de source publique retrouvée

- La liste des fournisseurs de la ligne OneWeb de Toulouse (MDA, Busek, Crisa, Matra Électronique, STI, Sodern) et sa cadence de 16 à 20 satellites par mois.
- L'extension de Beyond Gravity à Linköping (196 modules d'adaptateurs par mois).
- Les cadences de 12 puis 15 lancements d'Ariane 6 par an : seules les 9 à 10 de 2027 sont sourcées.
- L'estimation du budget d'IRIS² à 15,6 Md€.
- Le contrat entre Exotrail et Creotech (Camila), et la démonstration de désorbitation d'un satellite OneWeb.
- Le nom « Galo » de la constellation belge et la candidature d'Aerospacelab.
- Le montant de 4 M€ et le calendrier 2027-2029 du projet TAC.
- Les usines de Sirius Space Services.
- La masse d'une tonne des satellites ReOrbit : la masse n'est pas publiée.

## Contrôles

- `node tools/check.js` : aucune erreur. Nouveau contrôle : la part française reste dans ses bornes.
- `node tools/smoke.js` (bureau et mobile) : aucune erreur. Résultats :
  - 59 opportunités et 69 événements affichés ;
  - part française affichée sur CO2M (23 %), barème scientifique affiché sur PLATO ;
  - les 161 fiches s'ouvrent.

## Fichiers modifiés

- `src/data12.js` (nouveau)
- `src/app.js` : champ « Part de la France (ESA) », export CSV
- `src/page.html`
- `build.py`
- `tools/check.js`, `tools/smoke.js`
- `README.md`
- `audit/rapport_veille_oct2026.md`
- `index.html`, `dist/atlas.html`
