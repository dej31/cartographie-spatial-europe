/* ============================================================
   Atlas du spatial européen — livraison 3 : données financières
   Trois jeux séparés, à ne pas additionner entre eux.
   Montants en millions d'euros (M€). bc : indice de confiance.
   ============================================================ */

/* ---- 1. Contrats et engagements publics ----
   a : année · lib : objet · ent : bénéficiaire · grp : groupe (clé GROUPES ou nom) ·
   fin : type de financeur · fam : famille · m : M€ · prog : id de programme */
const CONTRATS = [
  { a: 2014, lib: "MetOp-SG, contrat satellites", ent: "Airbus DS", grp: "airbus", fin: "ESA / EUMETSAT", fam: "met", m: 1300, bc: "B", prog: "metopsg" },
  { a: 2015, lib: "Sentinel-1C et 1D", ent: "Thales Alenia Space", grp: "tas", fin: "UE / ESA", fam: "obs", m: 400, bc: "B", prog: "s1" },
  { a: 2020, lib: "LSTM (Sentinel-8)", ent: "Airbus DS", grp: "airbus", fin: "UE / ESA", fam: "obs", m: 389, bc: "A", prog: "lstm" },
  { a: 2020, lib: "CIMR et CHIME (part du lot de 1,3 Md€ avec LSTM)", ent: "Thales Alenia Space", grp: "tas", fin: "UE / ESA", fam: "obs", m: 911, bc: "C", prog: "chime", note: "Déduit : 1,3 Md€ moins les 389 M€ de LSTM" },
  { a: 2020, lib: "Hera, construction", ent: "OHB", grp: "ohb", fin: "ESA", fam: "def", m: 129.4, bc: "A", prog: "hera" },
  { a: 2021, lib: "Galileo 2e génération, deux lots de 6 satellites", ent: "Airbus DS + Thales Alenia Space", grp: "consortium", fin: "UE / ESA", fam: "nav", m: 1470, bc: "B", prog: "galg2", note: "Répartition entre les deux non publiée" },
  { a: 2021, lib: "Modules de service Orion ESM 4 à 6", ent: "Airbus DS", grp: "airbus", fin: "ESA", fam: "exp", m: 625, bc: "C", prog: "esm", note: "738 M$ convertis au cours de 2021" },
  { a: 2024, lib: "SATCOMBw étape 3", ent: "Airbus DS", grp: "airbus", fin: "Défense nationale", fam: "def", m: 2100, bc: "A", prog: "satcombw" },
  { a: 2024, lib: "ExoMars Rosalind Franklin", ent: "Thales Alenia Space", grp: "tas", fin: "ESA", fam: "exp", m: 522, bc: "A", prog: "exomars" },
  { a: 2024, lib: "Vigil, météo spatiale", ent: "Airbus DS", grp: "airbus", fin: "ESA", fam: "def", m: 340, bc: "A", prog: "vigil" },
  { a: 2024, lib: "Retour de cargo, phase 1", ent: "The Exploration Company", grp: "autre", fin: "ESA", fam: "exp", m: 25, bc: "A", prog: "cargo" },
  { a: 2024, lib: "Retour de cargo, phase 1", ent: "Thales Alenia Space", grp: "tas", fin: "ESA", fam: "exp", m: 25, bc: "A", prog: "cargo" },
  { a: 2025, lib: "Argonaut, élément de descente lunaire", ent: "Thales Alenia Space", grp: "tas", fin: "ESA", fam: "exp", m: 862, bc: "A", prog: "argonaut" },
  { a: 2025, lib: "SPOCK, constellation radar", ent: "ICEYE (avec Rheinmetall)", grp: "autre", fin: "Défense nationale", fam: "def", m: 1700, bc: "A", prog: "spock" },
  { a: 2025, lib: "POLSARIS, constellation radar", ent: "ICEYE", grp: "autre", fin: "Défense nationale", fam: "def", m: 200, bc: "A", prog: "polsaris" },
  { a: 2025, lib: "European Launcher Challenge (réservation)", ent: "Isar Aerospace", grp: "autre", fin: "ESA", fam: "lan", m: 205.65, bc: "A", prog: "isar", note: "Montant réservé, contrats-cadres signés en 2026" },
  { a: 2025, lib: "European Launcher Challenge (réservation)", ent: "Rocket Factory Augsburg", grp: "autre", fin: "ESA", fam: "lan", m: 190.51, bc: "A", prog: "rfa" },
  { a: 2025, lib: "European Launcher Challenge (réservation)", ent: "MaiaSpace", grp: "lanc", fin: "ESA", fam: "lan", m: 184.3, bc: "A", prog: "maiaspace" },
  { a: 2025, lib: "European Launcher Challenge (réservation)", ent: "PLD Space", grp: "autre", fin: "ESA", fam: "lan", m: 169.1, bc: "A", prog: "pld" },
  { a: 2025, lib: "European Launcher Challenge (réservation)", ent: "Orbex", grp: "autre", fin: "ESA", fam: "lan", m: 34.9, bc: "A", prog: "orbex" },
  { a: 2026, lib: "Ramses, contrat principal", ent: "OHB Italia", grp: "ohb", fin: "ESA", fam: "def", m: 81.2, bc: "B", prog: "ramses", note: "Année d'attribution à confirmer" }
];

/* ---- 2. Levées de fonds et financements privés ----
   ty : equity (capital) ou dette */
const LEVEES = [
  { a: 2020, ent: "Isar Aerospace", p: "DE", ty: "Capital", fam: "lan", m: 75, bc: "B", note: "Tour mené par Lakestar" },
  { a: 2023, ent: "Isar Aerospace", p: "DE", ty: "Capital", fam: "lan", m: 152, bc: "C", note: "Série C de 165 M$, convertie" },
  { a: 2024, ent: "Isar Aerospace", p: "DE", ty: "Capital", fam: "lan", m: 65, bc: "C", note: "70 M$ dont le fonds d'innovation de l'OTAN, convertis" },
  { a: 2025, ent: "Isar Aerospace", p: "DE", ty: "Dette", fam: "lan", m: 150, bc: "A" },
  { a: 2025, ent: "ICEYE", p: "FI", ty: "Capital", fam: "def", m: 200, bc: "A" },
  { a: 2025, ent: "EnduroSat", p: "BG", ty: "Capital", fam: "obs", m: 90, bc: "A" },
  { a: 2025, ent: "Eutelsat", p: "FR", ty: "Capital", fam: "tel", m: 1500, bc: "A", note: "Recapitalisation d'un groupe coté, État français en tête" },
  { a: 2026, ent: "Eutelsat", p: "FR", ty: "Dette", fam: "tel", m: 975, bc: "A", note: "Crédit export pour les satellites OneWeb" },
  { a: 2026, ent: "ICEYE", p: "FI", ty: "Capital", fam: "def", m: 150, bc: "A", note: "Février" },
  { a: 2026, ent: "ICEYE", p: "FI", ty: "Dette", fam: "def", m: 300, bc: "A", note: "Crédit renouvelable, 7 banques" },
  { a: 2026, ent: "ICEYE", p: "FI", ty: "Capital", fam: "def", m: 450, bc: "A", note: "Série F, part primaire ; plus 550 M€ de cessions secondaires" },
  { a: 2026, ent: "Isar Aerospace", p: "DE", ty: "Capital", fam: "lan", m: 270, bc: "A", note: "Série D, avec KfW Capital" },
  { a: 2026, ent: "PLD Space", p: "ES", ty: "Capital", fam: "lan", m: 180, bc: "A", note: "Série C" },
  { a: 2026, ent: "PLD Space", p: "ES", ty: "Dette", fam: "lan", m: 30, bc: "A", note: "Prêt BEI" },
  { a: 2026, ent: "The Exploration Company", p: "DE", ty: "Capital", fam: "exp", m: 387, bc: "A", note: "Série C (450 M$)" },
  { a: 2026, ent: "D-Orbit", p: "IT", ty: "Capital", fam: "exp", m: 100, bc: "C", note: "« Plus de 100 M€ » : seuil minimum retenu" },
  { a: 2026, ent: "OHB", p: "DE", ty: "Capital", fam: "obs", m: 900, bc: "B", note: "Placement d'actions, montant relevé jusqu'à ≈ 900 M€" }
];

/* ---- 3. Séries annuelles (Md€) ---- */
const SERIES = [
  { id: "esa", nom: "Budget annuel de l'ESA", src: "Communications annuelles de l'ESA",
    pts: [[2015, 4.43, "B"], [2016, 5.25, "B"], [2017, 5.75, "B"], [2018, 5.60, "B"], [2019, 5.72, "B"], [2020, 6.68, "B"], [2021, 6.49, "B"], [2022, 7.15, "B"], [2023, 7.08, "B"], [2024, 7.79, "A"], [2025, 7.68, "B"], [2026, 8.26, "C"]],
    note: "2026 déduit de la hausse annoncée de 7,6 %. L'UE apporte environ 1,7 Md€ par an au budget de l'ESA." },
  { id: "inst", nom: "Budgets spatiaux publics européens (tous)", src: "Rapport ESA sur l'économie spatiale 2026",
    pts: [[2024, 12.05, "C"], [2025, 13.5, "A"]], note: "2024 déduit de la hausse de 12 %. Comprend les budgets civils et militaires nationaux, l'UE et l'ESA." },
  { id: "ind", nom: "Ventes de l'industrie spatiale européenne", src: "Eurospace",
    pts: [[2024, 8.86, "C"], [2025, 10.9, "A"]], note: "2024 déduit de la hausse de 23 %." },
  { id: "vc", nom: "Investissement privé dans le spatial européen", src: "ESA (2024-2025) ; Tech.eu (2026)",
    pts: [[2024, 1.52, "C"], [2025, 1.4, "A"], [2026, 3.8, "A"]], note: "Méthodes différentes : l'ESA compte 1,4 Md€ en 2025, Tech.eu 1,1 Md€. 2026 : au 20 octobre, près de la moitié en dette." }
];

/* Contributions nationales à l'ESA (M€) */
const CONTRIB = [
  { p: "Allemagne", a: 2024, m: 1170, bc: "A" },
  { p: "France", a: 2024, m: 1050, bc: "A" },
  { p: "Italie", a: 2024, m: 881, bc: "A" }
];

Object.assign(SOURCES, {
  esa25: ["European Spaceflight – Budget initial 2025 de l'ESA", "https://europeanspaceflight.com/?p=4201"],
  esa26: ["Space Intel Report – Budget 2026 de l'ESA en hausse de 7,6 %", "https://www.spaceintelreport.com/?p=108992"],
  ecoesa: ["Universe Space Tech – Rapport ESA sur l'économie spatiale 2026", "https://universemagazine.com/en/esa-report-shows-how-defense-is-changing-the-structure-of-space-budgets/"]
});
