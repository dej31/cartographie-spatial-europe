/* ============================================================
   Atlas du spatial européen — phase 4 (21 octobre 2026)
   Missions finalistes non retenues ; hors vue Prospection.
   ============================================================ */
STATUTS.nr = "Non retenu";

PROGRAMMES.push(
  { id: "mmatisse", n: "M-MATISSE", d: "esc", sub: "Finaliste M7 non retenue : environnement de Mars",
    fin: "ESA – programme scientifique (étude de phase A)", moa: "ESA",
    moe: "Aucun (mission non retenue)", g: [], plat: "Deux satellites aux instruments identiques",
    instr: "Mesures de particules et de champs autour de Mars",
    app: "Comprendre comment le vent solaire agit sur l'atmosphère, l'ionosphère et la magnétosphère de Mars, pour éclairer son habitabilité et son évolution.",
    bud: "Non documenté", bc: "C",
    y0: 2022, y1: 2026, jal: [[2022, "Parmi les cinq concepts encore en lice (nov.)"], [2026, "Plasma Observatory recommandé à sa place (11 juin)"]],
    st: "nr", pred: [], succ: [],
    note: "Un des trois finalistes de la mission M7, avec THESEUS et Plasma Observatory. Non retenu : ce n'est pas un programme en cours." },
  { id: "theseus", n: "THESEUS", d: "esc", sub: "Finaliste M7 non retenue : sursauts gamma et Univers lointain",
    fin: "ESA – programme scientifique (étude de phase A)", moa: "ESA",
    moe: "Aucun (mission non retenue)", g: [], plat: "Mission à plusieurs instruments",
    instr: "Instruments de haute énergie",
    app: "Étudier les événements brefs et très énergétiques du cosmos, surtout les sursauts gamma : les proches accompagnent des ondes gravitationnelles, les lointains renseignent sur les premières galaxies.",
    bud: "Non documenté", bc: "C",
    y0: 2022, y1: 2026, jal: [[2022, "Parmi les cinq concepts encore en lice (nov.)"], [2026, "Plasma Observatory recommandé à sa place (11 juin)"]],
    st: "nr", pred: [], succ: [],
    note: "Un des trois finalistes de la mission M7, avec M-MATISSE et Plasma Observatory. Non retenu : ce n'est pas un programme en cours." }
);
(function () {
  const pl = PROGRAMMES.find(p => p.id === "plasma");
  if (pl) pl.note += " Les deux autres finalistes, M-MATISSE et THESEUS, n'ont pas été retenus.";
})();
CONVERGENCES.push(
  { type: "Compétition", a: "plasma", b: "mmatisse", titre: "Sélection M7 : Plasma Observatory contre M-MATISSE", txt: "Deux missions de physique des plasmas en concurrence pour le même créneau ; Plasma Observatory a été recommandé en juin 2026." },
  { type: "Compétition", a: "plasma", b: "theseus", titre: "Sélection M7 : Plasma Observatory contre THESEUS", txt: "Le troisième finaliste, consacré aux sursauts gamma, n'a pas été retenu." }
);
Object.assign(LIENS, {
  mmatisse: [L("Agence", "ESA – Les trois finalistes de la mission M7", "https://www.esa.int/Science_Exploration/Space_Science/Final_three_for_ESA_s_next_medium_science_mission"),
    L("Agence", "ESA – Présentation publique des trois finalistes", "https://www.cosmos.esa.int/web/m7-public-presentation")],
  theseus: [L("Agence", "ESA – Les trois finalistes de la mission M7", "https://www.esa.int/Science_Exploration/Space_Science/Final_three_for_ESA_s_next_medium_science_mission"),
    L("Agence", "ESA – Présentation publique des trois finalistes", "https://www.cosmos.esa.int/web/m7-public-presentation")]
});
addLien("plasma", L("Agence", "ESA – Présentation publique des trois finalistes", "https://www.cosmos.esa.int/web/m7-public-presentation"));

/* ---------- Gammes de satellites télécoms reconfigurables ---------- */
DOMAINES.plf = { fam: "tel", nom: "Satellites télécoms reconfigurables", resume: "Les nouvelles gammes géostationnaires « définies par logiciel » des deux grands maîtres d'œuvre européens : couverture, bande et puissance reconfigurables en orbite." };
PROGRAMMES.push(
  { id: "onesat", n: "OneSat (Airbus)", d: "plf", sub: "Gamme géostationnaire reconfigurable d'Airbus",
    fin: "Airbus et clients opérateurs (financements publics du développement non documentés ici)", moa: "Opérateurs clients : Inmarsat (Viasat), Optus, Thaicom, SCT (Oman)…",
    moe: "Airbus Defence and Space", g: ["airbus"], plat: "OneSat",
    instr: "Charge utile Ka à haut débit entièrement reconfigurable, formation de faisceaux flexible",
    app: "Vendre des satellites géostationnaires dont la couverture et la capacité se reprogramment en orbite, pour suivre la demande.",
    bud: "Non documenté (charges comptables d'Airbus sur le programme en 2023 et 2024)", bc: "B",
    y0: 2019, y1: 2035, jal: [[2019, "Première commande : Inmarsat GX7, 8 et 9"], [2020, "Commande d'Optus-11"], [2023, "Commande de Thaicom ; charge de 428 M$ chez Airbus"], [2025, "OmanSat-1, 10e satellite sous contrat (nov.)"], [2027, "Mise en service visée des GX7 à 9 (Viasat)"]],
    st: "dev", pred: [], succ: [],
    note: "Aucun satellite livré fin 2025. Optus-11, prévu en 2023, a environ quatre ans de retard dû à des problèmes de logiciel ; l'UIT a refusé en juillet 2026 la prolongation demandée par l'Australie.",
    pros: "Fabrication en série de 10 satellites sous contrat, avec un calendrier tendu : chaîne d'approvisionnement et essais sous pression jusqu'en 2028." },
  { id: "spaceinspire", n: "Space Inspire (Thales Alenia Space)", d: "plf", sub: "Gamme géostationnaire ultra-flexible de Thales Alenia Space",
    fin: "CNES (phases A et B), puis France 2030 (phase C/D, opérée par le CNES) ; soutien de l'ESA ; clients opérateurs", moa: "Opérateurs clients : Arabsat, Eutelsat (Flexsat)…",
    moe: "Thales Alenia Space ; partenaires Liebherr Aerospace, Saft, Coredux, Hemeria ; fournisseur ArianeGroup", g: ["tas"], plat: "Space Inspire (classe 20 kW, 3 à 4 t à sec)",
    instr: "Numérisation de la charge utile, antennes actives, formation numérique des faisceaux, boucles fluides à pompage mécanique, propulsion électrique",
    app: "Offrir des satellites géostationnaires reconfigurables en orbite, conçus autour d'une plateforme et d'une charge utile surtout françaises.",
    bud: "Non documenté", bc: "C",
    y0: 2020, y1: 2035, jal: [[2020, "Intégrée au volet spatial de France 2030"], [2022, "Commandes d'Arabsat (mai) et d'Eutelsat Flexsat (déc.), 6e satellite de la gamme"], [2027, "Premier lancement prévu"]],
    st: "dev", pred: ["artes"], succ: [],
    note: "18 nouveaux équipements et sous-systèmes issus de la R&D du CNES, plus de 10 fournisseurs français, durée de vie de 15 ans. Thales Alenia Space connaît aussi des retards sur cette gamme (Space Intel Report, février 2024).",
    pros: "Plus de 10 fournisseurs français engagés ; montée en cadence attendue avec le premier lancement de 2027." }
);
Object.assign(ORBITES, { onesat: "Géostationnaire", spaceinspire: "Géostationnaire" });
PROGRAMMES.forEach(p => { if (ORBITES[p.id] && !p.orb) p.orb = ORBITES[p.id]; });
Object.assign(PARC, {
  onesat: { orb: 0, srv: 0, prv: 10, m: null, bc: "A" },
  spaceinspire: { orb: 0, srv: 0, prv: 6, m: null, bc: "B" }
});
LIGNEES.forEach(l => l.etapes.forEach(e => { if (e[0] === "Space Inspire") e[2] = "spaceinspire"; if (e[0] === "OneSat") e[2] = "onesat"; }));
(function () {
  const add = (id, ...prs) => { const a = ACTEURS.find(x => x.id === id); if (a) prs.forEach(p => { if (!a.pr.includes(p)) a.pr.push(p); }); };
  add("airbus-ds", "onesat"); add("tas", "spaceinspire"); add("cnes", "spaceinspire"); add("hemeria", "spaceinspire");
  add("arianegroup", "spaceinspire"); add("eutelsat-group", "spaceinspire");
})();
RELATIONS.push(
  { de: "airbus-ds", vers: "onesat", type: "maître d'œuvre", txt: "Concepteur et constructeur de la gamme ; 10 satellites sous contrat (nov. 2025).", bc: "A", src: "https://www.satellitetoday.com/manufacturing/2025/11/24/airbus-secures-omansat-1-deal-for-onesat-platform/" },
  { de: "tas", vers: "spaceinspire", type: "maître d'œuvre", txt: "Maître d'œuvre industriel de la gamme.", bc: "A", src: "https://cnes.fr/en/projects/space-inspire" },
  { de: "cnes", vers: "spaceinspire", type: "financeur", txt: "Phases A et B, puis opérateur de la phase C/D financée par France 2030 ; équipe projet intégrée avec Thales Alenia Space.", bc: "A", src: "https://cnes.fr/en/projects/space-inspire" },
  { de: "hemeria", vers: "spaceinspire", type: "partenaire", txt: "Partenaire industriel de la gamme (CNES).", bc: "A", src: "https://cnes.fr/en/projects/space-inspire" },
  { de: "arianegroup", vers: "spaceinspire", type: "fournisseur", txt: "Fournisseur français cité par le CNES.", bc: "A", src: "https://cnes.fr/en/projects/space-inspire" },
  { de: "eutelsat-group", vers: "spaceinspire", type: "utilisateur", txt: "Satellite Flexsat commandé en décembre 2022, plus de 100 Gbit/s sur les Amériques.", bc: "A", src: "https://satelliteprome.com/news/eutelsat-selects-thales-to-build-flexible-software-defined-satellite/" }
);
Object.assign(LIENS, {
  onesat: [L("Référence", "Via Satellite – OmanSat-1, 10e OneSat (nov. 2025)", "https://www.satellitetoday.com/manufacturing/2025/11/24/airbus-secures-omansat-1-deal-for-onesat-platform/"),
    L("Référence", "Advanced Television – L'UIT refuse le délai d'Optus-11 (juil. 2026)", "https://www.advanced-television.com/2026/07/16/itu-denies-australias-request-for-satellite-launch-delay/"),
    L("Référence", "Space Intel Report – Articles sur OneSat", "https://www.spaceintelreport.com/tag/onesat")],
  spaceinspire: [L("Agence", "CNES – Space Inspire", "https://cnes.fr/projets/space-inspire"),
    L("Référence", "SatellitePro ME – Eutelsat commande Flexsat (déc. 2022)", "https://satelliteprome.com/news/eutelsat-selects-thales-to-build-flexible-software-defined-satellite/"),
    L("Référence", "Via Satellite – Arabsat commande un satellite défini par logiciel (mai 2022)", "https://www.satellitetoday.com/manufacturing/2022/05/02/arabsat-orders-software-defined-geo-satellite-from-thales/")]
});
CONVERGENCES.push(
  { type: "Compétition", a: "onesat", b: "spaceinspire", titre: "OneSat contre Space Inspire", txt: "Les deux maîtres d'œuvre européens se disputent le marché des satellites géostationnaires reconfigurables ; selon le CNES, ils ont remporté tous les contrats ouverts jusqu'ici (13 satellites : 7 pour Airbus, 6 pour Thales Alenia Space)." }
);
