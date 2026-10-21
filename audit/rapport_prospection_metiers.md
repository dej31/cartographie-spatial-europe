# Rapport de mise en œuvre – prospection par métier (MLI, harnais, structures)

Atlas du spatial européen · 21 octobre 2026

Le diagnostic préalable (étape 1) est dans `audit/diagnostic_prospection_metiers.md`. Choix validés avant l'implémentation :
- **Visibilité** : tout publier (faits et prochaines actions) ;
- **Score** : six critères à poids égal ;
- **Périmètre** : Europe, plus les implantations en Europe d'acteurs non européens ;
- **Volume** : vague complète, environ 40 opportunités.

## Ce qui a été fait

### Données (`src/data11.js`, nouveau)

- **47 opportunités** : 1 confirmée, 34 probables, 12 à surveiller.
  - Par métier : structures 46, harnais 45, MLI 40. Une opportunité peut concerner plusieurs métiers.
  - Toutes les opportunités renseignent :
    - le programme, l'acheteur, le client final, le site (s'il est documenté), le lot, la phase et l'échéance ;
    - la quantité, le mode de fabrication (interne, externe ou inconnu), les fournisseurs cités et la confiance ;
    - les sources, avec leur date de publication et leur date de vérification (21 oct. 2026) ;
    - la prochaine action.
  - Le champ **valeur est vide partout** : je n'ai trouvé aucune méthode défendable pour l'estimer.
- **42 événements commerciaux** datés, répartis sur les 9 types du brief :
  - 18 attributions de contrat ;
  - 4 lancements de constellation ;
  - 4 augmentations de cadence ;
  - 4 fournisseurs documentés ;
  - 3 nouvelles tranches ;
  - 3 passages en production ;
  - 2 consultations ;
  - 2 ouvertures de site ;
  - 2 nouvelles missions.
- **11 établissements** documentés :
  - Airbus Toulouse et Getafe ;
  - Thales Alenia Space, Space Smart Factory de Rome ;
  - Aerospacelab, megafactory de Charleroi ;
  - U-Space, U-Zine ;
  - Hemeria, Toulouse ;
  - OHB Sweden, Kista ;
  - MT Aerospace, Augsbourg ;
  - Beyond Gravity, Berndorf et Linköping ;
  - Axon' Cable, Montmirail.
- **Un acteur ajouté** : Axon' Cable. **Trois relations « fournisseur »** ajoutées sur OneWeb : Axon' Cable, Beyond Gravity et Hemeria.
- **Fiche Hemeria complétée** : harnais (label PME du CNES, environ 20 000 connecteurs par an), structures et MLI.

### Règles de qualification appliquées

- **Confirmée** : consultation ou besoin d'achat publié.
  - Une seule opportunité remplit ce critère : le lot 2 de Galileo 2e génération (avis de planification de l'ESA du 1er mars 2026, procédure prévue au 4e trimestre 2026).
  - La fiche précise que ce besoin est publié **au niveau des satellites complets**. Les lots MLI, harnais et structure relèveront des maîtres d'œuvre retenus.
- **Probable** : un engin documenté est en développement ou en production, et il contient forcément ces sous-ensembles. Le recours à la sous-traitance n'est pas prouvé, et chaque fiche le dit.
- **À surveiller** : programme en amont, lot déjà attribué (coiffes d'Ariane 6 à Beyond Gravity, structures et réservoirs à MT Aerospace), ou fenêtre d'achat probablement passée (Galileo, lot 1).

### Score explicable sur 18

Six critères notés de 0 à 3, à poids égal. Le calcul est fait par la fonction `scoreOpp` dans `src/data11.js`, la même qu'utilisent l'interface et les contrôles.

| Critère | Règle |
|---|---|
| Adéquation technique | 3 : une source cite le lot ou son fournisseur ; 2 : engin complet en fabrication ; 1 : matériel de vol prévu ; 0 : pas de matériel de vol |
| Maturité | 3 : série ; 2 : C/D ; 1 : B ; 0 : étude ou phase non documentée |
| Volume | 3 : plus de 20 unités ; 2 : de 5 à 20 ; 1 : de 2 à 4 ; 0 : une seule unité ou quantité inconnue |
| Proximité | 3 : échéance documentée dans les 12 mois ; 2 : dans les 24 mois ; 1 : au-delà, ou date estimée ; 0 : échéance inconnue ou passée |
| Accessibilité | Saisie par l'utilisateur sur chaque fiche, gardée dans son seul navigateur ; « non évaluée » (0) par défaut |
| Qualité | 3 : confiance A vérifiée depuis moins de 6 mois ; 2 : confiance A ou B ; 1 : confiance C ; 0 : source la plus récente de plus de 2 ans |

Une date donnée par la seule année est comptée au 31 décembre de cette année, ce qui reste prudent. Le budget d'un programme n'intervient jamais.

**Premier classement, avant toute saisie de l'accessibilité :**
- OneWeb nouvelle génération : 14 (669 satellites en série à Toulouse, premières livraisons fin 2026) ;
- Open Cosmos : 14 ;
- ICEYE, U-Space, Sateliot : 13 ;
- montée en cadence d'Ariane 6 : 12.

**Point d'attention.** Les coiffes et les structures d'Ariane 6 obtiennent 12 points alors qu'elles sont « à surveiller ». Le lot y est documenté (adéquation à 3), mais il est déjà attribué. Le score et le statut mesurent deux choses différentes : il faut lire les deux.

### Interface (onglet Prospection)

- **Deux modes** : « Opportunités métiers », affiché par défaut, et « Programmes », la vue précédente, conservée telle quelle.
- **Filtres** :
  - métier et statut, par puces ;
  - pays, acteur, programme, phase et confiance, par listes ;
  - recherche libre.
- **Tri** par échéance ou par score.
- **Fiches** :
  - les trois statuts se distinguent par la couleur, le libellé et la bordure (pleine ou en pointillés) ;
  - liens vers les fiches programme et acteur, et vers les sources ;
  - détail du score dépliable ;
  - bouton « Copier le lien », qui donne une adresse en `#opp/<identifiant>`.
- **Listes en bas de vue** :
  - « Prochaines actions », par score décroissant ;
  - « Journal des événements commerciaux », filtrable par type et soumis aux filtres du haut.
- **Export CSV** : toutes les colonnes, dont le détail des six notes et les sources datées.
- **Recherche globale** : elle trouve aussi les opportunités.

## Couverture du marché après cette vague

| Famille | Confirmées | Probables | À surveiller | Principaux trous |
|---|---|---|---|---|
| Télécoms et constellations | 0 | 8 | 1 | Constructeur de la couche en orbite moyenne d'IRIS² ; commandes géostationnaires des opérateurs |
| Observation | 0 | 11 | 3 | Sous-traitants des Sentinel ; constellations nationales (IRIDE) non traitées ici |
| Météorologie | 0 | 3 | 0 | Équipe d'OHB Sweden pour EPS-Sterna non détaillée |
| Navigation | 1 | 1 | 1 | Candidats au lot 2 de Galileo |
| Défense | 0 | 5 | 3 | Information souvent confidentielle (SATCOMBw 4, IRIS, SICRAL 3) |
| Science et exploration | 0 | 4 | 2 | Lots des consortiums EnVision et Argonaut |
| Lanceurs | 0 | 2 | 2 | Fournisseurs de harnais et d'isolation d'Ariane 6 |

## Contrôles

- `python3 build.py` : construction réussie.
- `node tools/check.js` : **aucune erreur**. Nouveaux contrôles :
  - identifiants uniques ;
  - références vers des programmes, acteurs, sites et opportunités existants ;
  - métier, phase, statut et type d'événement valides ;
  - sources en https avec dates bien formées, aucune date d'événement dans le futur ;
  - champ valeur vide ;
  - une opportunité confirmée doit préciser le niveau du besoin publié ;
  - un lot documenté doit citer un fournisseur ;
  - score compris dans les bornes.
- `node tools/smoke.js` (bureau 1 400 px et mobile 390 px) : **aucune erreur**. Résultats :
  - 47 fiches, 42 événements et 47 actions affichés ;
  - filtres métier (40 MLI) et statut (1 confirmée) ;
  - filtre acteur (4 opportunités avec Hemeria) et tri par score ;
  - saisie de l'accessibilité (score de 14 à 17) ;
  - export CSV et lien direct `#opp/galg2-lot2` ;
  - mode « Programmes » inchangé ;
  - aucun débordement horizontal ;
  - les 157 fiches s'ouvrent.

## Limites

- **Peu de besoins réellement publiés.** Les consultations de sous-traitance MLI, harnais et structures ne le sont presque jamais. TED n'est pas lisible depuis cet environnement (accès refusé), et je n'ai trouvé aucune consultation récente de l'ESA ou du CNES sur ces lots. Le seul appel d'offres MLI repéré date de 2021 et n'a pas été retenu.
- **Avis Galileo lu sur un site relais.** L'avis du lot 2 vient d'auftragone : sa référence officielle n'y est pas visible. Il faut le confirmer sur le portail de l'ESA.
- **Fournisseurs de la génération 1 seulement.** Ceux de OneWeb (Beyond Gravity, Axon' Cable) sont documentés pour la première génération. Pour la nouvelle génération, seuls les panneaux solaires (Rocket Lab) sont publiés.
- **Dates de lancement divergentes pour IRIS²** : 2029 selon Brussels Times, 2030 selon European Spaceflight. La fiche le signale.
- **Dates de publication manquantes.** Quand elle n'est ni dans l'adresse ni dans la page lue, la date de publication est « non documentée ». La qualité est alors notée sur l'indice de confiance seul.
- **Accessibilité gardée dans le navigateur.** Elle n'est ni partagée ni sauvegardée ailleurs. Dans une navigation privée, elle peut être perdue.
- **Prochaines actions publiques.** Comme convenu, elles sont visibles de tous sur le site, concurrents compris.
- **Hemeria.** Elle apparaît comme partenaire, fournisseur ou maître d'œuvre sur 4 opportunités (OneWeb, Space Inspire, REVALTO, Swing). C'est documenté, mais à lire en connaissant ta position.

## Fichiers modifiés

- `src/data11.js` (nouveau)
- `src/app.js` : modes de la vue Prospection, opportunités, score, actions, journal, export CSV, lien `#opp/…`, recherche globale
- `src/page.html` : marqueur `/*__DATA11__*/`, styles
- `build.py`
- `tools/check.js`, `tools/smoke.js`
- `README.md`
- `audit/diagnostic_prospection_metiers.md`, `audit/rapport_prospection_metiers.md`
- `index.html`, `dist/atlas.html` (régénérés)

Rien n'a été poussé sur GitHub.
