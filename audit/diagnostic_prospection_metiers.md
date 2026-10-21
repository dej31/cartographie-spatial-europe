# Diagnostic – Prospection orientée métiers (MLI, harnais, structures)

Atlas du spatial européen · 21 octobre 2026 · étape 1 du brief, avant toute modification du code

## 1. Ce qui existe déjà (vérifié dans le dépôt)

### Données utilisables

| Élément | État | Réutilisable pour la prospection |
|---|---|---|
| Programmes | 157 au total : 59 en développement, 5 en projet, 79 en service | Base des opportunités |
| Statuts, phases | Statut seulement (`op`, `dev`, `plan`, `fin`, `ann`, `nr`) ; pas de phase industrielle (A, B, C/D, production) | Phase à ajouter |
| Jalons | 73 jalons futurs (année + libellé) | Calendrier prévisionnel |
| Unités, parc | 191 unités ; 1 135 satellites prévus au total dans `PARC` | Quantités, quand elles sont documentées |
| Champ `pros` | 21 programmes, texte libre | Point de départ, à structurer |
| Acteurs | 190 acteurs : 13 maîtres d'œuvre, 32 équipementiers, 29 NewSpace, 37 laboratoires… | Acheteurs potentiels |
| Sites | Champ `v` (ville) seulement ; 15 acteurs avec plusieurs villes ; aucun établissement distinct | Établissements à ajouter |
| Relations | 194 relations sourcées, dont 26 « maître d'œuvre » | Lien acheteur → programme |
| Contrats | 42 contrats datés (année), dont 27 en 2024-2026 | Événements « attribution de contrat » |
| Sources | `LIENS` par programme et source par relation ; aucune date de publication ni de vérification par source | Dates à ajouter |
| Confiance | Indice A, B ou C partout | Réutilisé tel quel |

### Fonctions réutilisables dans l'interface

- **Vue Prospection** :
  - cartes par programme ;
  - filtres famille, horizon, recherche, « sans maître d'œuvre » ;
  - tri par jalon ou par nom ;
  - export CSV ;
  - repère « à attribuer ».
- Fiches programmes et acteurs avec liens directs (`#fiche/…`, `#acteur/…`) et bouton « Copier le lien ».
- Recherche globale, vue Réseau (rôles des acteurs par programme), historique du navigateur.
- Style et composants : cartes, puces de filtre, indicateurs, pastilles de statut, indice de confiance.

## 2. Manques constatés

**Aucune donnée métier.** Une recherche dans toutes les données (programmes, acteurs, relations) donne :
- **MLI et isolation thermique** : 0 occurrence ;
- **harnais et câblage** : 0 occurrence ;
- **structures et panneaux** : 4 mentions générales seulement (Beyond Gravity, MT Aerospace, coiffes et structures d'Ariane 6). Aucun lot, aucun fournisseur, aucun mode de fabrication interne ou externe.

L'atlas décrit **qui construit quel satellite**, mais pas **qui fabrique ses sous-ensembles**. C'est le principal manque pour ce brief.

**Autres manques :**
- **Phase industrielle** absente : on ne sait pas si un programme est en étude, en développement ou en production série.
- **Établissements** absents : par exemple Airbus Toulouse, Friedrichshafen ou Getafe ; Thales Alenia Space Cannes, Toulouse ou Turin.
- **Cadences** : quelques valeurs documentées (OneWeb Gen 2, IRIS², U-Space vise un satellite par semaine en 2027), mais pas de champ dédié.
- **Événements** commerciaux : pas de liste datée. Les contrats et jalons existent mais ne sont pas typés.
- **Date de vérification** : une seule date globale (« octobre 2026 »), pas par source.
- **Actions commerciales** : rien dans le modèle. C'est normal pour un atlas public.

**Limite technique.** Le site est public (GitHub Pages). Toute information de prospection publiée devient visible de tous, concurrents compris : cibles, priorités, actions commerciales.

## 3. Couverture du marché par segment

Légende de confiance de l'évaluation : **A** = vérifiée dans les données ; **B** = vérifiée dans les données, mais les trous sont estimés à partir de sources publiques connues.

| Segment | Acteurs couverts (extrait) | Programmes connus | Trous de couverture | Sources pour compléter | Confiance |
|---|---|---|---|---|---|
| Télécoms et constellations | Airbus DS, Thales Alenia Space, OHB, SWISSto12, Aerospacelab, Alén Space, Eutelsat, SES, Hispasat | IRIS², OneSat, Space Inspire, HummingSat, Sateliot, Kinéis, SATCOMBw 4, Syracuse, SICRAL 3 | OneWeb Gen 2 sans fiche propre (669 satellites Airbus) ; commandes géostationnaires des opérateurs ; chaîne d'équipementiers | Communiqués des opérateurs, Space Intel Report, rapports annuels d'Airbus et de Thales | B |
| Observation optique et radar | Airbus, Thales Alenia Space, OHB, ICEYE, Creotech, Satlantis, Open Cosmos | Copernicus et Sentinel NG, Earth Explorers, CO3D, Pléiades Neo Next, IRIDE, programmes nationaux | Cadence de production des constellations (IRIDE, ICEYE) ; sous-traitants des plateformes | ESA EMITS, ASI, presse spécialisée | B |
| Météorologie et climat | Airbus, Thales Alenia Space, OHB Sweden, EUMETSAT | MTG, MetOp-SG, EPS-Sterna, Aeolus-2, TRUTHS | Équipe d'une trentaine d'entreprises d'EPS-Sterna, non détaillée | Communiqués d'OHB, EUMETSAT | B |
| Navigation | Airbus, Thales Alenia Space, OHB, GMV | Galileo 2e génération, Celeste, EGEP | Suite de la constellation Celeste ; prochains lots de Galileo | EUSPA, ESA | B |
| Défense et sécurité | Airbus, Thales Alenia Space, OHB, ICEYE, U-Space, Rheinmetall | CSO et IRIS, CERES, SARah, SPOCK, POLSARIS, MikroGlob, ISTARI, PAZ 2, ARES | Syracuse V ; constellations allemandes annoncées ; information souvent confidentielle | DGA, AID, BAAINBw, presse défense | B |
| Science et exploration | Thales Alenia Space, Airbus, OHB, Sener, laboratoires | PLATO, ARIEL, LISA, NewAthena, EnVision, Argonaut, ExoMars, Gateway | Modules du Gateway et suite des modules de service d'Orion sans détail des lots | ESA, NASA, rapports industriels | B |
| Transport spatial, lanceurs, véhicules | ArianeGroup, Avio, MT Aerospace, Beyond Gravity, Isar, RFA, PLD, MaiaSpace, The Exploration Company | Ariane 6, Vega-C, European Launcher Challenge, Themis, Callisto, ASTRIS, Space Rider, cargo | Cadence d'Ariane 6 non chiffrée ; structures des micro-lanceurs | Arianespace, European Spaceflight | B |
| Service en orbite et démonstrateurs | D-Orbit, ClearSpace, Astroscale UK et France, Exotrail, Infinite Orbits | RISE, ClearSpace-1, ELSA-M, ARES | Programmes d'Infinite Orbits et d'Exotrail sans fiche | Communiqués des entreprises, ESA | B |
| Petits satellites et NewSpace | U-Space, Hemeria, Aerospacelab, Open Cosmos, EnduroSat, Alén Space, Creotech, Kuva, Loft | Constellations clientes, programme grec, Constellation Atlantique, REVALTO | Capacités de production et intégration interne ou externe non documentées | Levées de fonds, offres d'emploi, presse régionale | B |
| Programmes nationaux, marchés institutionnels | CNES, DLR, ASI, AEE, DGA, AID, UK Space Command | France 2030, programmes nationaux d'observation et de télécoms | Appels à projets et consultations ouverts non suivis | BOAMP et PLACE (France), TED (UE), ESA-STAR et EMITS, CNES | A |

## 4. Proposition de modifications ciblées

### Modèle de données (nouveau fichier `src/data11.js`, sans toucher aux fichiers existants)

**`OPPORTUNITES`**, une entrée par opportunité industrielle :

| Champ | Contenu |
|---|---|
| `id`, `titre` | Identifiant et intitulé |
| `prog`, `acheteur`, `moe` | Programme, acheteur potentiel et maître d'œuvre, par identifiant |
| `site` | Établissement, seulement s'il est documenté |
| `lot` | Équipement ou lot concerné |
| `metiers` | Liste parmi MLI, harnais, structure |
| `phase` | Étude, développement, qualification, production série |
| `calendrier` | Année et libellé |
| `quantite` | Quantité ou cadence, si documentée |
| `fabrication` | Interne, externe ou inconnu, avec fournisseur actuel si connu |
| `valeur` | Seulement avec une méthode explicite, sinon vide |
| `statut` | Confirmée, probable ou à surveiller |
| `sources` | URL, date de publication, date de vérification |
| `bc` | Niveau de confiance |
| `action` | Prochaine action générique (par exemple « identifier l'acheteur structures du site ») |

**`EVENEMENTS`** : date, type parmi les 9 du brief, acteur, programme, métiers concernés, texte, source, date de vérification, confiance, opportunité liée.

**`SITES`** : établissements industriels documentés (acteur, ville, activité), pour les grands maîtres d'œuvre et les fabricants de plateformes.

### Règles de qualification, appliquées sans exception

- **Confirmée** : consultation, appel d'offres ou besoin publié (source obligatoire).
- **Probable** : production ou développement documenté d'un engin qui contient nécessairement des MLI, des harnais ou des structures. Le recours à la sous-traitance n'est pas prouvé, et la fiche le dit.
- **À surveiller** : programme en amont (phase A ou B, sélection, annonce) susceptible de créer un besoin.

Aucune opportunité ne sera classée « confirmée » sans document d'achat.

### Score explicable, sur 18 points (6 critères notés de 0 à 3)

Le budget total d'un programme n'entre jamais dans le score.

| Critère | Base de calcul |
|---|---|
| Adéquation technique | 3 : lot métier documenté ; 2 : engin complet en fabrication ; 1 : sous-ensemble incertain ; 0 : pas de matériel de vol |
| Maturité industrielle | 3 : production série ; 2 : réalisation (C/D) ; 1 : développement (B) ; 0 : étude |
| Volume ou récurrence | Selon le nombre d'unités documentées : 3 au-delà de 20, 2 de 5 à 20, 1 de 2 à 4, 0 pour une seule |
| Proximité de la décision | Événement d'achat attendu : 3 dans les 12 mois, 2 dans les 24 mois, 1 au-delà, 0 inconnu |
| Accessibilité du donneur d'ordre | Jugement commercial : saisi par l'utilisateur, « non évalué » par défaut |
| Qualité et fraîcheur | 3 : confiance A vérifiée depuis moins de 6 mois ; 2 : confiance B ; 1 : confiance C ; 0 : source de plus de 2 ans |

Chaque carte affichera le détail des six notes et leur justification.

### Interface : faire évoluer l'onglet Prospection, sans en créer un autre

- Deux modes : « Opportunités métiers » (nouveau, par défaut) et « Programmes » (la vue actuelle, conservée).
- Filtres :
  - métier (MLI, harnais, structure) ;
  - statut (confirmée, probable, à surveiller), avec un code couleur et un libellé ;
  - pays, acteur, programme, phase, niveau de confiance.
- Tri par échéance ou par score.
- Liens vers les fiches et les sources ; export CSV.
- Journal des événements commerciaux, filtrable.
- Liste des prochaines actions.

### Données à constituer (recherche web, comme lors des phases précédentes)

Environ 30 à 50 opportunités et 40 à 60 événements, en priorité sur les programmes à forte récurrence :
- OneWeb Gen 2 et IRIS² ;
- OneSat et Space Inspire ;
- Galileo 2e génération ;
- Sentinel NG ;
- les constellations militaires ;
- Ariane 6 ;
- les plateformes NewSpace (U-Space, Aerospacelab, Open Cosmos…).

L'adéquation métier d'une opportunité ne sera « documentée » que si une source cite le lot (MLI, harnais, structure) ou le fournisseur. Sinon, elle restera « probable » ou « à surveiller ».

## 5. Points à valider avant d'implémenter

1. **Visibilité.** Le site est public. Je propose :
   - les faits (opportunités, événements, sources) restent publics ;
   - les éléments propres à ta démarche (accessibilité du donneur d'ordre, prochaines actions, notes) sont saisis dans le navigateur, sauvegardés seulement sur ton poste et exportables en fichier, jamais publiés.

   Autre option : publier aussi les actions, ou garder toute la couche prospection hors du site public.
2. **Pondération du score** : six critères à poids égal, ou une pondération différente (par exemple l'adéquation technique comptant double) ?
3. **Périmètre géographique** : Europe uniquement, ou aussi les donneurs d'ordre non européens implantés en Europe ?
4. **Volume de la première vague** : environ 40 opportunités sourcées, ou un pilote plus court (10 à 15) pour valider le format ?

## 6. Limites connues dès maintenant

- Les besoins de sous-traitance MLI, harnais et structures sont rarement publiés. La majorité des opportunités sera donc « probable » ou « à surveiller ».
- Les choix de fabrication interne ou externe des maîtres d'œuvre sont peu documentés publiquement. Ils seront notés « inconnu » par défaut.
- Les consultations publiques (BOAMP, TED, ESA-STAR) ne peuvent pas être suivies en continu depuis un site statique. Elles seront relevées manuellement, avec une date de vérification.
