/* ============================================================
   Atlas du spatial européen — orbites, parc de satellites,
   suites commerciales, SWISSto12 / HummingSat
   ============================================================ */

/* ---- Nouveau programme et nouvel acteur ---- */
PROGRAMMES.push(
  { id: "hummingsat", n: "HummingSat (SWISSto12)", d: "tin", sub: "Petit satellite géostationnaire d'environ 1 tonne",
    fin: "SWISSto12 et ESA (partenariat ARTES, financé par les États membres)", moa: "ESA, en partenariat avec SWISSto12",
    moe: "SWISSto12 (Suisse)", g: ["autre"], plat: "HummingSat, ≈ 1 t, ≈ 1,5 m³",
    instr: "Charges utiles radiofréquence imprimées en 3D",
    app: "Offrir aux opérateurs un satellite géostationnaire compact et moins cher, pour une région ou un besoin précis.",
    bud: "Soutien ESA : 30 M€ (2022) puis 73 M€ (janv. 2026)", bc: "A",
    y0: 2027, y1: 2040, jal: [[2022, "Partenariat ESA"], [2023, "Phase 2 de production"], [2026, "73 M€ supplémentaires de l'ESA"], [2027, "1er lancement visé (Intelsat)"]],
    st: "dev", pred: ["artes"], succ: [],
    note: "Quatre satellites commandés : un pour Intelsat, trois pour Viasat. Premier lancement repoussé de 2025 à 2027 au plus tôt." }
);
ACTEURS.push(
  { n: "SWISSto12", c: "nsdat", p: "CH", v: "Lausanne", t: "Scale-up", y: 2011,
    m: "Pièces radiofréquence imprimées en 3D, puis petits satellites géostationnaires HummingSat.", k: "73 M€ de financement ESA (janv. 2026), après 30 M€ en 2022", kb: "A", pr: ["hummingsat"] }
);
CONTRATS.push(
  { a: 2017, lib: "Heinrich Hertz, satellite démonstrateur", ent: "OHB", grp: "ohb", fin: "Défense nationale", fam: "tel", m: 310.5, bc: "A", prog: "hh", note: "Contrat de la DLR, avec une part financée par la Bundeswehr" },
  { a: 2022, lib: "HummingSat, partenariat ARTES (phase 1)", ent: "SWISSto12", grp: "autre", fin: "ESA", fam: "tel", m: 30, bc: "A", prog: "hummingsat" },
  { a: 2026, lib: "HummingSat, financement complémentaire", ent: "SWISSto12", grp: "autre", fin: "ESA", fam: "tel", m: 73, bc: "A", prog: "hummingsat" }
);
CONVERGENCES.push(
  { type: "Public-privé", a: "hummingsat", b: "artes", titre: "HummingSat, né d'un partenariat ARTES", txt: "L'ESA co-finance le développement du satellite de SWISSto12, qui en vend ensuite des exemplaires à Intelsat et Viasat." }
);
Object.assign(LIENS, {
  hummingsat: [["Industriel", "European Spaceflight – 73 M€ pour HummingSat", "https://europeanspaceflight.com/swissto12-secures-e73-million-in-new-esa-funding-for-hummingsat-project/"],
               ["Agence", "ESA – HummingSat", "https://www.esa.int/Applications/Connectivity_and_Secure_Communications/HummingSat_a_new_chapter_in_space_innovation_unveiled"]]
});
UNITES.hummingsat = [
  ["HummingSat Intelsat", "2027 au plus tôt", "Ariane 6 (prévu)", "dev", "Premier exemplaire commandé"],
  ["HummingSat Viasat (×3)", "après 2027", "—", "dev", "Trois exemplaires commandés"]];
/* Pléiades : prolongation officielle */
(function () {
  const p = PROGRAMMES.find(x => x.id === "pleiades");
  p.y1 = 2028; p.jal.push([2025, "Exploitation prolongée jusqu'à fin 2028"]);
  p.note = "Volet optique du système franco-italien ORFEO. Les deux satellites étaient toujours pleinement opérationnels en 2025 ; le CNES et Airbus ont prolongé leur exploitation jusqu'à fin 2028.";
  UNITES.pleiades = [
    ["Pléiades 1A", "17 déc. 2011", "Soyouz (Kourou)", "op", "Télescope HiRI, 70 cm ; exploitation prolongée jusqu'à fin 2028"],
    ["Pléiades 1B", "2 déc. 2012", "Soyouz (Kourou)", "op", "Idem"]];
})();
LIENS.pleiades.push(["Agence", "CNES – Pléiades prolongé jusqu'à fin 2028", "https://cnes.fr/en/press-releases/airbus-cnes-continue-pleiades-mission-end-2028"]);

/* ---- Orbites ---- */
const ORBITES = {
  s1: "Héliosynchrone, 693 km", s2: "Héliosynchrone, 786 km", s3: "Héliosynchrone, 814 km",
  s4: "Géostationnaire (instrument à bord de MTG-S)", s5p: "Héliosynchrone, 824 km", s5: "Héliosynchrone, ≈ 830 km (à bord de MetOp-SG A)",
  s6: "Non héliosynchrone, 1 336 km, inclinaison 66°", co2m: "Héliosynchrone, ≈ 735 km",
  lstm: "Héliosynchrone (orbite basse)", cristal: "Quasi polaire (orbite basse)", chime: "Héliosynchrone (orbite basse)",
  cimr: "Héliosynchrone (orbite basse)", rosel: "Héliosynchrone (orbite basse)", sng: "Héliosynchrone (orbite basse)",
  ers: "Héliosynchrone, ≈ 785 km", envisat: "Héliosynchrone, ≈ 800 km", jason: "Non héliosynchrone, 1 336 km, inclinaison 66°",
  goce: "Héliosynchrone, ≈ 255 km (très basse, propulsion ionique)", smos: "Héliosynchrone, ≈ 758 km", cryosat: "Quasi polaire, ≈ 717 km, inclinaison 92°",
  swarm: "Polaire, 460 à 530 km", aeolus: "Héliosynchrone, ≈ 320 km", earthcare: "Héliosynchrone, ≈ 393 km", biomass: "Héliosynchrone, ≈ 666 km",
  flex: "Héliosynchrone, ≈ 814 km, en tandem avec Sentinel-3", forum: "Héliosynchrone (orbite basse)", harmony: "Héliosynchrone, en formation avec Sentinel-1", wivern: "Héliosynchrone (orbite basse)",
  mop: "Géostationnaire", msg: "Géostationnaire", mtg: "Géostationnaire", metop: "Héliosynchrone, ≈ 817 km", metopsg: "Héliosynchrone, ≈ 835 km",
  spot: "Héliosynchrone, 822 km (SPOT 1 à 5), 694 km (SPOT 6 et 7)", pleiades: "Héliosynchrone, 694 km", pneo: "Héliosynchrone, 620 km", pneonext: "Orbite basse",
  co3d: "Héliosynchrone (orbite basse)", terrasar: "Héliosynchrone, 514 km", iceye: "Orbites basses, ≈ 500 à 600 km",
  helios: "Héliosynchrone, ≈ 680 km", cso: "Héliosynchrone, ≈ 800 km (CSO-1 et 3) et ≈ 480 km (CSO-2)", csosuite: "Orbite basse",
  sarlupe: "Quasi polaire, ≈ 500 km", sarah: "Orbites basses", csk: "Héliosynchrone, 619 km", iride: "Orbites basses", paz: "Héliosynchrone, 514 km, même orbite que TerraSAR-X",
  spock: "Orbites basses", polsaris: "Orbites basses",
  syracuse: "Géostationnaire", satcombw: "Géostationnaire", sicral: "Géostationnaire", athenafidus: "Géostationnaire", spainsat: "Géostationnaire", skynet: "Géostationnaire",
  eutelsat: "Géostationnaire et orbite basse (OneWeb, ≈ 1 200 km)", ses: "Géostationnaire et orbite moyenne (O3b mPOWER, ≈ 8 000 km)", hispasat: "Géostationnaire",
  kineis: "Orbite basse, ≈ 650 km", iris2: "Orbites basse et moyenne", hh: "Géostationnaire", hummingsat: "Géostationnaire",
  egnos: "Géostationnaire (charges hébergées)", galg1: "Orbite moyenne, 23 222 km, inclinaison 56°", galg2: "Orbite moyenne, 23 222 km",
  rosetta: "Héliocentrique, puis autour de la comète 67P", gaia: "Point de Lagrange L2 (1,5 million de km)", bepi: "Orbite de Mercure",
  juice: "Croisière interplanétaire, puis orbite de Ganymède", euclid: "Point de Lagrange L2", solo: "Héliocentrique, jusqu'à 0,28 UA du Soleil",
  smile: "Orbite terrestre très elliptique", plato: "Point de Lagrange L2", ariel: "Point de Lagrange L2", cometint: "Point de Lagrange L2, en attente d'une comète",
  lisa: "Héliocentrique, à la suite de la Terre", newathena: "Point de Lagrange (L1 ou L2, à confirmer)",
  exomars: "Orbite martienne (TGO) ; surface de Mars (rover)", gateway: "Orbite de halo autour de la Lune", argonaut: "Surface lunaire", moonlight: "Orbite lunaire",
  iss: "Orbite basse, ≈ 400 km", esm: "Translunaire, avec Orion", cargo: "Orbite basse, vers l'ISS puis les stations commerciales",
  hera: "Système binaire Didymos-Dimorphos", ramses: "Accompagnement de l'astéroïde Apophis", vigil: "Point de Lagrange L5", clearspace: "Orbite basse",
  ceres: "Orbite basse", ares: "Orbite basse et géostationnaire", edrs: "Géostationnaire", euroqci: "Orbite basse"
};
PROGRAMMES.forEach(p => { if (ORBITES[p.id]) p.orb = ORBITES[p.id]; });

/* ---- Parc de satellites ----
   orb : mis en orbite (succès) · srv : en service · prv : prévus · m : masse typique au lancement (kg)
   cst : grande constellation (≥ 20 satellites), exclue par défaut du recensement par taille
   bc  : confiance sur la masse (A, B, C) */
const PARC = {
  s1: { orb: 4, srv: 3, prv: 0, m: 2300, bc: "A" }, s2: { orb: 3, srv: 3, prv: 1, m: 1140, bc: "B" }, s3: { orb: 3, srv: 3, prv: 1, m: 1250, bc: "B" },
  s5p: { orb: 1, srv: 1, prv: 0, m: 820, bc: "B" }, s6: { orb: 2, srv: 2, prv: 1, m: 1190, bc: "B" },
  co2m: { orb: 0, srv: 0, prv: 3, m: 1800, bc: "C" }, lstm: { orb: 0, srv: 0, prv: 2, m: 2000, bc: "C" }, cristal: { orb: 0, srv: 0, prv: 2, m: 2000, bc: "C" },
  chime: { orb: 0, srv: 0, prv: 2, m: 2000, bc: "C" }, cimr: { orb: 0, srv: 0, prv: 2, m: 2500, bc: "C" }, rosel: { orb: 0, srv: 0, prv: 2, m: 3000, bc: "C" },
  sng: { orb: 0, srv: 0, prv: 8, m: 2500, bc: "C" },
  ers: { orb: 2, srv: 0, prv: 0, m: 2400, bc: "B" }, envisat: { orb: 1, srv: 0, prv: 0, m: 8200, bc: "B" }, jason: { orb: 4, srv: 1, prv: 0, m: 550, bc: "C" },
  goce: { orb: 1, srv: 0, prv: 0, m: 1050, bc: "B" }, smos: { orb: 1, srv: 1, prv: 0, m: 660, bc: "B" }, cryosat: { orb: 1, srv: 1, prv: 0, m: 720, bc: "B" },
  swarm: { orb: 3, srv: 3, prv: 0, m: 470, bc: "B" }, aeolus: { orb: 1, srv: 0, prv: 0, m: 1360, bc: "B" }, earthcare: { orb: 1, srv: 1, prv: 0, m: 2350, bc: "B" },
  biomass: { orb: 1, srv: 1, prv: 0, m: 1250, bc: "B" }, flex: { orb: 1, srv: 1, prv: 0, m: 470, bc: "B" }, forum: { orb: 0, srv: 0, prv: 1, m: 1100, bc: "C" },
  harmony: { orb: 0, srv: 0, prv: 2, m: 500, bc: "C" }, wivern: { orb: 0, srv: 0, prv: 1, m: 1500, bc: "C" },
  mop: { orb: 7, srv: 0, prv: 0, m: 700, bc: "B" }, msg: { orb: 4, srv: 3, prv: 0, m: 2040, bc: "B" }, mtg: { orb: 3, srv: 3, prv: 3, m: 3700, bc: "A" },
  metop: { orb: 3, srv: 2, prv: 0, m: 4085, bc: "B" }, metopsg: { orb: 1, srv: 1, prv: 5, m: 4000, bc: "B" },
  spot: { orb: 7, srv: 0, prv: 0, m: 1800, bc: "C" }, pleiades: { orb: 2, srv: 2, prv: 0, m: 970, bc: "B" }, pneo: { orb: 2, srv: 2, prv: 0, m: 920, bc: "A" },
  co3d: { orb: 4, srv: 4, prv: 0, m: 285, bc: "C" }, terrasar: { orb: 2, srv: 2, prv: 0, m: 1340, bc: "B" },
  iceye: { orb: 72, srv: 72, prv: 0, m: 100, bc: "C", cst: true },
  helios: { orb: 4, srv: 0, prv: 0, m: 4200, bc: "B" }, cso: { orb: 3, srv: 3, prv: 0, m: 3500, bc: "B" }, sarlupe: { orb: 5, srv: 0, prv: 0, m: 770, bc: "B" },
  sarah: { orb: 3, srv: 3, prv: 0, m: 2500, bc: "C" }, csk: { orb: 7, srv: 5, prv: 1, m: 2000, bc: "C" }, paz: { orb: 1, srv: 1, prv: 0, m: 1400, bc: "B" },
  syracuse: { orb: 4, srv: 4, prv: 0, m: 3700, bc: "C" }, satcombw: { orb: 2, srv: 2, prv: 2, m: 2440, bc: "B" }, sicral: { orb: 3, srv: 2, prv: 1, m: 3000, bc: "C" },
  athenafidus: { orb: 1, srv: 1, prv: 0, m: 3080, bc: "A" }, spainsat: { orb: 2, srv: 2, prv: 0, m: 6000, bc: "C" }, skynet: { orb: 0, srv: 0, prv: 1, m: 6000, bc: "C" },
  hh: { orb: 1, srv: 1, prv: 0, m: 3400, bc: "C" }, hummingsat: { orb: 0, srv: 0, prv: 4, m: 1000, bc: "A" },
  eutelsat: { orb: 640, srv: 640, prv: 569, m: 150, bc: "C", cst: true, lib: "OneWeb uniquement (flotte géostationnaire non comptée)" },
  kineis: { orb: 25, srv: 25, prv: 0, m: 30, bc: "C", cst: true }, iris2: { orb: 0, srv: 0, prv: 350, m: null, bc: "C", cst: true },
  galg1: { orb: 36, srv: 29, prv: 4, m: 733, bc: "B", cst: true, lib: "GIOVE, IOV et FOC" }, galg2: { orb: 0, srv: 0, prv: 12, m: 2300, bc: "C" },
  rosetta: { orb: 1, srv: 0, prv: 0, m: 3000, bc: "B" }, gaia: { orb: 1, srv: 0, prv: 0, m: 2030, bc: "B" }, bepi: { orb: 1, srv: 1, prv: 0, m: 4100, bc: "B" },
  juice: { orb: 1, srv: 1, prv: 0, m: 6000, bc: "B" }, euclid: { orb: 1, srv: 1, prv: 0, m: 2000, bc: "B" }, solo: { orb: 1, srv: 1, prv: 0, m: 1800, bc: "B" },
  smile: { orb: 1, srv: 1, prv: 0, m: 2200, bc: "C" }, plato: { orb: 0, srv: 0, prv: 1, m: 2100, bc: "C" }, ariel: { orb: 0, srv: 0, prv: 1, m: 1500, bc: "C" },
  cometint: { orb: 0, srv: 0, prv: 1, m: 1000, bc: "C" }, lisa: { orb: 0, srv: 0, prv: 3, m: 2000, bc: "C" }, newathena: { orb: 0, srv: 0, prv: 1, m: 6000, bc: "C" },
  exomars: { orb: 1, srv: 1, prv: 0, m: 3700, bc: "B", lib: "Orbiteur TGO (le rover n'est pas compté)" }, moonlight: { orb: 0, srv: 0, prv: 1, m: 280, bc: "C" },
  hera: { orb: 1, srv: 1, prv: 0, m: 1130, bc: "B" }, ramses: { orb: 0, srv: 0, prv: 1, m: 1000, bc: "C" }, vigil: { orb: 0, srv: 0, prv: 1, m: 2200, bc: "C" },
  clearspace: { orb: 0, srv: 0, prv: 1, m: 500, bc: "C" }, ceres: { orb: 3, srv: 3, prv: 0, m: 500, bc: "C" }, edrs: { orb: 1, srv: 1, prv: 0, m: 3200, bc: "C", lib: "EDRS-C (EDRS-A est une charge hébergée)" },
  euroqci: { orb: 0, srv: 0, prv: 1, m: 400, bc: "C" }
};
const CLASSES_MASSE = [
  ["Nano (< 10 kg)", 0, 10], ["Micro (10 à 100 kg)", 10, 100], ["Mini (100 à 500 kg)", 100, 500],
  ["Moyen (500 à 2 500 kg)", 500, 2500], ["Grand (plus de 2 500 kg)", 2500, Infinity]
];

/* ---- Suites commerciales : du programme au produit ---- */
const SUITES = [
  { de: "spot", type: "Société de commercialisation", titre: "SPOT → Spot Image → Airbus (OneAtlas)", annee: 1982,
    txt: "Pour vendre les images SPOT, le CNES crée Spot Image en 1982. La société devient la branche imagerie d'Astrium, puis d'Airbus, qui commercialise aujourd'hui Pléiades, Pléiades Neo et SPOT via OneAtlas.", bc: "B" },
  { de: "spot", type: "Satellites exportés", titre: "SPOT 6 et 7 → PerúSAT-1 et Azersky", annee: 2014,
    txt: "La technologie de SPOT 6 et 7 (instrument NAOMI) est vendue à l'export : SPOT 7 est cédé à l'Azerbaïdjan (Azersky) et Airbus construit PerúSAT-1 pour le Pérou, lancé en 2016.", bc: "B" },
  { de: "pleiades", type: "Plateforme exportée", titre: "Pléiades → AstroSat-1000 → Falcon Eye (Émirats arabes unis)", annee: 2013,
    txt: "La plateforme de Pléiades devient un produit d'Airbus. Elle sert notamment aux deux satellites militaires Falcon Eye, vendus aux Émirats par Airbus et Thales Alenia Space ; Falcon Eye 1 est perdu au lancement en 2019, Falcon Eye 2 lancé en 2020.", bc: "B" },
  { de: "pneo", type: "Satellites exportés", titre: "Pléiades Neo → S950 VHR → deux satellites pour la Pologne", annee: 2023,
    txt: "Airbus vend à la Pologne deux satellites optiques très haute résolution dérivés de Pléiades Neo (plateforme S950 VHR), avec accès immédiat aux images de la constellation. Lancement prévu en 2027 depuis Kourou.", bc: "A" },
  { de: "pneo", type: "Produit commercial", titre: "Pléiades Neo → Pléiades Neo Next", annee: 2026,
    txt: "Airbus finance seul la génération suivante, classe 20 cm, qui complète sa constellation commerciale à partir de 2028.", bc: "A" },
  { de: "terrasar", type: "Satellite exporté", titre: "TerraSAR-X → PAZ (Espagne)", annee: 2018,
    txt: "Le satellite radar du partenariat DLR-Airbus est décliné pour l'Espagne. PAZ vole sur la même orbite et ses images sont commercialisées avec celles de TerraSAR-X.", bc: "A" },
  { de: "edrs", type: "Service commercial", titre: "EDRS → SpaceDataHighway", annee: 2016,
    txt: "Le relais laser développé en partenariat avec l'ESA est exploité commercialement par Airbus, qui vend la capacité de transmission aux opérateurs de satellites.", bc: "A" },
  { de: "artes", type: "Plateforme commerciale", titre: "ARTES (Neosat) → Spacebus Neo et Eurostar Neo", annee: 2019,
    txt: "Le programme Neosat de l'ESA a financé deux nouvelles plateformes géostationnaires, vendues ensuite à l'export et aux armées : Syracuse IV, SpainSat NG, Skynet 6A, satellites d'opérateurs.", bc: "B" },
  { de: "artes", type: "Plateforme commerciale", titre: "ARTES → SmallGEO → Electra", annee: 2017,
    txt: "La petite plateforme géostationnaire d'OHB, co-financée par l'ESA, a été vendue à Hispasat, reprise pour MTG et Heinrich Hertz, puis déclinée en version électrique avec SES.", bc: "B" },
  { de: "artes", type: "Produit commercial", titre: "ARTES → HummingSat (SWISSto12)", annee: 2026,
    txt: "Un partenariat ESA fait émerger un satellite géostationnaire d'une tonne, déjà vendu en quatre exemplaires à Intelsat et Viasat.", bc: "A" },
  { de: "eutelsat", type: "Ligne de production", titre: "OneWeb → production en série chez Airbus", annee: 2026,
    txt: "La constellation OneWeb a créé chez Airbus une chaîne de production de satellites en série. Eutelsat a commandé 340 puis 229 satellites de nouvelle génération en 2026.", bc: "A" },
  { de: "metopsg", type: "Service commercial", titre: "Argos → Kinéis", annee: 2018,
    txt: "Le système de collecte de données Argos, embarqué sur les satellites météo depuis 1978, est transformé en constellation commerciale dédiée à l'Internet des objets.", bc: "A" },
  { de: "iceye", type: "Systèmes souverains", titre: "Constellation commerciale ICEYE → SPOCK et POLSARIS", annee: 2025,
    txt: "Le chemin inverse : un produit commercial devient une capacité militaire souveraine, vendue à l'Allemagne et à la Pologne.", bc: "A" },
  { de: "csk", type: "Société de commercialisation", titre: "COSMO-SkyMed → e-GEOS", annee: 2000,
    txt: "Les images radar du système dual italien sont vendues sur le marché civil par e-GEOS, filiale de Telespazio et de l'ASI.", bc: "B" }
];
Object.assign(SOURCES, {
  pologne: ["Airbus – Satellites optiques pour la Pologne (janv. 2023)", "https://www.airbus.com/sites/g/files/jlcbta136/files/2023-01/FR-Airbus-SpS-Press-Release-Airbus-to-provide-Poland-with-a-very-high-resolution-optical-satellite-system_0.pdf"],
  pleiades28: ["CNES – Pléiades prolongé jusqu'à fin 2028", "https://cnes.fr/en/press-releases/airbus-cnes-continue-pleiades-mission-end-2028"],
  swissto12: ["European Spaceflight – 73 M€ pour HummingSat", "https://europeanspaceflight.com/swissto12-secures-e73-million-in-new-esa-funding-for-hummingsat-project/"]
});
