# Rapport de mise en œuvre – phase 4 (cartographie et expérience utilisateur)

Atlas du spatial européen · 21 octobre 2026

## 1. M-MATISSE et THESEUS

Deux fiches au nouveau statut « Non retenu ». Ce sont les deux finalistes de la mission M7 écartés : le 11 juin 2026, Plasma Observatory a été recommandé à leur place.

- Les fiches sont exclues de la vue Prospection.
- Deux convergences de type « Compétition » relient ces missions à Plasma Observatory.
- Sources : pages ESA des trois finalistes et de leur présentation publique.

## 2. Vue « Réseau »

### Ce qu'elle représente

| Élément | Représentation |
|---|---|
| Lien de capital | Trait plein violet : groupe, filiale, coentreprise, participation, rachat, fusion, projet de fusion, essaimage |
| Contrat | Tirets orange : maître d'œuvre, sous-traitant, fournisseur, bénéficiaire, candidat |
| Coopération | Pointillés verts : partenaire, partenaire scientifique, consortium, financeur, maître d'ouvrage, utilisateur, opérateur |
| Participation simple | Pointillés gris : acteur relié à un programme sans rôle documenté |
| Nœuds | Disque plein pour un acteur, cercle pour un laboratoire, carré à la couleur de sa famille pour un programme, petit disque gris pour une entité hors atlas |

Chaque nature se distingue par la couleur et par le style du trait, pour rester lisible sans couleur.

### Modes

- **Autour d'un acteur ou d'un programme** : liens directs ou liens des liens.
- **Groupes et filiales** : les ensembles capitalistiques, disposés en blocs séparés.
- **Réseau complet filtré**.

### Filtres

Pays des acteurs, domaine des programmes, types d'acteurs, période et natures de liens. Un bouton remet tous les filtres à zéro.

### Navigation

- Un clic sur un nœud recentre la carte et ajoute une étape dans l'historique.
- Zoom par boutons ou Ctrl + molette ; déplacement de la carte au doigt ou à la souris.
- Les noms des nœuds peuvent être affichés ou masqués.

### Panneau latéral

Il donne la version texte de la carte :
- relations groupées par nature, avec leurs sources ;
- partenaires présents sur les mêmes programmes ;
- **concurrents potentiels** : acteurs de même catégorie présents dans les mêmes domaines de programmes. Ce calcul est indicatif ; l'interface précise qu'il ne s'agit pas d'une concurrence documentée.

**Correction technique.** Certains acteurs et programmes partagent un identifiant : ICEYE, Kinéis, SES, Isar… Le réseau distingue désormais les nœuds acteurs (`A:`) et programmes (`P:`). Sans cela, la coentreprise Rheinmetall-ICEYE s'affichait comme un lien vers le programme ICEYE.

## 3. Expérience utilisateur

- **Recherche globale** sous les onglets, accessible sur toutes les vues :
  - résultats instantanés (programmes, acteurs, laboratoires, pays, sigles) ;
  - navigation au clavier (flèches, Entrée, Échap) ;
  - raccourci « / ».
- **Fiche acteur complète**, à l'adresse `#acteur/<identifiant>` :
  - identité, statut UE et ESA du pays, groupe ;
  - programmes avec leur rôle, relations par nature ;
  - partenaires, concurrents potentiels et sources ;
  - boutons « Copier le lien », « Voir dans le réseau » et « Fermer ».
- **Liens partageables** : un bouton « Copier le lien » sur chaque fiche programme, fiche acteur et focus du réseau. La fiche programme gagne aussi un bouton « Voir dans le réseau ».
- **Filtres réinitialisables** dans les vues Fiches, Acteurs, Prospection et Réseau.
- **Vue d'ensemble**, nouvel onglet d'accueil :
  - indicateurs : programmes par statut, acteurs, relations, programmes à attribuer ;
  - quatre accès rapides : un programme, un acteur, qui travaille avec qui, des marchés à prendre ;
  - programmes par famille, jalons de l'année suivante, plus gros contrats récents ;
  - acteurs les plus connectés, programmes sans maître d'œuvre publié.
- **Mobile** : la carte et son panneau s'empilent, les filtres passent sur une colonne, sans débordement horizontal (test à 390 px de large).

## 4. Contrôles

- `node tools/check.js` : aucune erreur (155 programmes, 190 acteurs, 188 relations).
- `node tools/smoke.js`, en bureau (1400 px) et en mobile (390 px) : aucune erreur.
  - 13 vues ouvertes sans débordement horizontal.
  - Recherche « hemeria » puis Entrée : la fiche acteur s'ouvre.
  - Réseau autour d'Airbus DS : 23 nœuds.
  - Clic sur SSTL : la carte se recentre ; « précédent » ramène à Airbus DS.
  - Vue Groupes et filiales : 47 nœuds ; réseau complet : 244 nœuds.
  - Bouton précédent, Prospection et export CSV : fonctionnent.
  - 155 fiches programmes ouvertes sans erreur.
- Inspection visuelle des captures : réseau autour d'un acteur, groupes et filiales, fiche acteur, vue d'ensemble, mobile.

## 5. Limites

- La disposition de la carte est calculée dans le navigateur (simulation de forces). En mode « Réseau complet » sans filtre, plus de 200 nœuds rendent la carte dense : il vaut mieux filtrer par domaine ou par pays.
- Les concurrents potentiels sont calculés, pas sourcés. Ils servent de piste de prospection, pas d'analyse de marché.
