/* ============================================================
   Atlas du spatial européen — phase 2 (octobre 2026)
   Enrichissement après l'audit de couverture :
   - 23 programmes, 3 domaines, statut « Annulé »
   - ≈ 80 acteurs, catégorie « Laboratoires & recherche »
   - identifiants stables des acteurs, pays UE / ESA
   - relations industrielles (groupes, filiales, coentreprises, rôles par programme)
   - contrats reliés aux acteurs, stade de l'engagement
   - corrections (FORUM, Harmony, IRIS, Jason-3, ClearSpace, Vigil, ICEYE…)
   Règle : aucune donnée inventée. Ce qui n'est pas publié est noté
   « non documenté » ; les incertitudes portent l'indice C ou une note.
   ============================================================ */

/* ---------- 1. Référentiels ---------- */
STATUTS.ann = "Annulé";

Object.assign(DOMAINES, {
  nvx: { fam: "nav", nom: "Évolutions & navigation en orbite basse", resume: "La R&D qui prépare les générations suivantes de Galileo et la nouvelle couche de navigation en orbite basse (LEO-PNT), plus robuste au brouillage." },
  ona: { fam: "obs", nom: "Programmes nationaux & bilatéraux civils", resume: "Missions d'un pays ou de deux partenaires, hors Copernicus : hyperspectral allemand et italien, carbone français, altimétrie franco-américaine, constellations ibérique et grecque." },
  msp: { fam: "met", nom: "Météorologie de l'espace", resume: "Surveiller le Soleil pour prévoir les tempêtes géomagnétiques qui menacent satellites, réseaux électriques et GNSS. Financé par le programme Space Safety de l'ESA." }
});
DOMAINES.sec.resume = "Protéger la Terre et les satellites : astéroïdes et débris. Programme Space Safety de l'ESA et service SST de l'UE. La météo de l'espace (Vigil) est rangée en Météorologie.";

CAT_ACTEURS.lab = "Laboratoires & recherche";

Object.assign(PAYS, { NL: "Pays-Bas", AT: "Autriche", PT: "Portugal", GR: "Grèce", RO: "Roumanie" });

/* Appartenance à l'UE et statut à l'ESA (23 États membres en 2026, dont la Slovénie depuis 2025) */
const PAYS_INFO = {
  FR: { ue: true, esa: "membre" }, DE: { ue: true, esa: "membre" }, IT: { ue: true, esa: "membre" }, ES: { ue: true, esa: "membre" },
  BE: { ue: true, esa: "membre" }, NL: { ue: true, esa: "membre" }, LU: { ue: true, esa: "membre" }, AT: { ue: true, esa: "membre" },
  PT: { ue: true, esa: "membre" }, GR: { ue: true, esa: "membre" }, FI: { ue: true, esa: "membre" }, SE: { ue: true, esa: "membre" },
  DK: { ue: true, esa: "membre" }, PL: { ue: true, esa: "membre" }, CZ: { ue: true, esa: "membre" }, RO: { ue: true, esa: "membre" },
  GB: { ue: false, esa: "membre" }, CH: { ue: false, esa: "membre" }, NO: { ue: false, esa: "membre" },
  BG: { ue: true, esa: "à vérifier" }
};

/* ---------- 2. Nouveaux programmes ---------- */
PROGRAMMES.push(
  /* Navigation */
  { id: "egep", n: "EGEP (European GNSS Evolution Programme)", d: "nvx", sub: "R&D de l'ESA pour les futures générations de navigation",
    fin: "ESA (programme optionnel)", moa: "ESA",
    moe: "Nombreux contrats d'études et de démonstration ; pas de maître d'œuvre unique", g: [], plat: "—",
    instr: "Études système, horloges, signaux, récepteurs",
    app: "Préparer les évolutions de Galileo et d'EGNOS avant que l'UE ne finance leur réalisation.",
    bud: "Non documenté", bc: "C",
    y0: 2007, y1: 2030, jal: [[2012, "Poursuite décidée au Conseil ministériel de Naples"]],
    st: "op", pred: [], succ: ["galg2"],
    note: "Programme de R&D, pas un système en orbite. Les travaux de navigation de l'ESA se poursuivent aussi dans le programme FutureNAV, dont relève Celeste." },

  { id: "celeste", n: "Celeste (LEO-PNT)", d: "nvx", sub: "Démonstrateur européen de navigation en orbite basse",
    fin: "ESA", moa: "ESA",
    moe: "Deux contrats parallèles : GMV (avec OHB) et Thales Alenia Space (segment spatial chez Thales Alenia Space Italie)", g: ["tas", "autre"], plat: "Petits satellites",
    instr: "Charges utiles de navigation multi-bandes",
    app: "Tester un complément à Galileo depuis l'orbite basse : signaux plus forts, plus difficiles à brouiller, acquisition plus rapide.",
    bud: "Non documenté", bc: "C",
    y0: 2026, y1: 2030, jal: [[2026, "Lancement des deux premiers satellites (28 mars, Electron)"], [2027, "Lancements suivants prévus"]],
    st: "dev", pred: [], succ: [],
    note: "Constellation de démonstration de 11 satellites prévue. Ce n'est pas encore un service opérationnel." },

  /* Observation : FutureEO */
  { id: "scouts", n: "Scouts (FutureEO)", d: "sci", sub: "Petites missions d'observation rapides et peu coûteuses",
    fin: "ESA – programme FutureEO", moa: "ESA",
    moe: "Selon la mission ; HydroGNSS : SSTL (Royaume-Uni)", g: ["airbus"], plat: "Petits satellites",
    instr: "HydroGNSS : réflectométrie des signaux GNSS",
    app: "Tester une mesure nouvelle en trois ans environ, avec environ 35 M€ par mission (conception, construction, exploitation).",
    bud: "≈ 35 M€ par mission", bc: "A",
    y0: 2020, y1: 2030, jal: [[2025, "HydroGNSS, premier Scout, lancé (28 nov.)"]],
    st: "op", pred: [], succ: [],
    note: "Complète les grandes missions Earth Explorers. SSTL, maître d'œuvre de HydroGNSS, exploite aussi les satellites et diffuse les données." },

  { id: "phisat", n: "Φsat (Phi-sat)", d: "sci", sub: "Intelligence artificielle embarquée sur petits satellites",
    fin: "ESA – programme FutureEO", moa: "ESA",
    moe: "Φsat-2 : Open Cosmos", g: ["autre"], plat: "CubeSats",
    instr: "Caméras multispectrales et processeur d'IA embarqué",
    app: "Trier et traiter les images à bord pour ne descendre que l'utile.",
    bud: "Non documenté", bc: "C",
    y0: 2020, y1: 2028, jal: [[2020, "Φsat-1 lancé (Vega VV16)"], [2024, "Φsat-2 lancé"]],
    st: "op", pred: [], succ: [] },

  /* Observation : programmes nationaux et bilatéraux */
  { id: "swot", n: "SWOT", d: "ona", sub: "Altimétrie à large fauchée des océans et des eaux continentales",
    fin: "CNES et NASA, avec l'Agence spatiale canadienne et l'UK Space Agency", moa: "CNES et NASA (JPL)",
    moe: "Plateforme fournie par le CNES (Thales Alenia Space) ; radar KaRIn du JPL", g: ["tas"], plat: "Plateforme CNES",
    instr: "Radar interféromètre KaRIn (NASA), altimètre de nadir et DORIS (CNES)",
    app: "Mesurer la hauteur des océans, des lacs et des rivières sur une large bande, et pas seulement sous la trace du satellite.",
    bud: "NASA 807,4 M$, CNES 340 M€ (hors exploitation), UK 12,2 M£, Canada 15,4 M$ CA", bc: "A",
    y0: 2022, y1: 2026, jal: [[2015, "Le CNES choisit Thales Alenia Space"], [2022, "Lancement (déc., Falcon 9)"]],
    st: "op", pred: ["jason"], succ: [],
    note: "Prolonge l'altimétrie franco-américaine de la série Jason avec une technique nouvelle (interférométrie à large fauchée)." },

  { id: "microcarb", n: "MicroCarb", d: "ona", sub: "Mesure du CO₂ atmosphérique par microsatellite",
    fin: "CNES, avec l'UK Space Agency et l'UE", moa: "CNES",
    moe: "Satellite livré par Thales Alenia Space Royaume-Uni ; instrument Airbus DS", g: ["tas", "airbus"], plat: "Myriade (CNES)",
    instr: "Spectromètre à réseau (précision ≈ 1 ppm, pixel 4,5 × 9 km)",
    app: "Cartographier sources et puits de CO₂ : première mission européenne dédiée, précurseur de CO2M.",
    bud: "Non documenté", bc: "C",
    y0: 2025, y1: 2030, jal: [[2022, "Instrument livré (déc.)"], [2024, "Satellite livré au CNES (janv.)"], [2025, "Lancement (26 juil. UTC, Vega-C VV27)"]],
    st: "op", pred: [], succ: [],
    note: "Partenaires scientifiques : CNRS, CEA, Météo-France et des universités. Lancé avec CO3D." },

  { id: "enmap", n: "EnMAP", d: "ona", sub: "Imageur hyperspectral allemand",
    fin: "Allemagne (DLR, Agence spatiale allemande)", moa: "DLR",
    moe: "OHB System (satellite et instrument)", g: ["ohb"], plat: "OHB",
    instr: "Imageur hyperspectral (visible à infrarouge court)",
    app: "Analyser sols, végétation, eau et minéraux grâce à plusieurs centaines de bandes spectrales.",
    bud: "Non documenté", bc: "C",
    y0: 2022, y1: 2027, jal: [[2022, "Lancement (1er avr., Falcon 9)"]],
    st: "op", pred: [], succ: [],
    note: "Direction scientifique : GFZ (Potsdam). Une des références de la future mission Copernicus CHIME." },

  { id: "prisma", n: "PRISMA et PRISMA Seconde Génération", d: "ona", sub: "Hyperspectral italien",
    fin: "Italie (ASI)", moa: "ASI",
    moe: "OHB Italia (maître d'œuvre) ; PRISMA SG : satellite et plateforme PRIMA-S par Thales Alenia Space, charge utile Leonardo", g: ["ohb"], plat: "PRISMA SG : PRIMA-S (Thales Alenia Space)",
    instr: "Imageur hyperspectral et caméra panchromatique (Leonardo)",
    app: "Imagerie hyperspectrale pour l'environnement, l'agriculture et la géologie.",
    bud: "Non documenté", bc: "C",
    y0: 2019, y1: 2036, jal: [[2019, "PRISMA lancé (Vega)"], [2026, "PRISMA SG : contrat plateforme (juil.)"], [2031, "PRISMA SG : lancement prévu"]],
    st: "op", pred: [], succ: [],
    note: "Une seule fiche pour les deux générations : PRISMA SG est la suite directe de PRISMA, avec la même ASI comme maître d'ouvrage." },

  { id: "atlantic", n: "Constellation Atlantique", d: "ona", sub: "Constellation hispano-portugaise de petits satellites",
    fin: "UE (fonds de relance), Espagne, Portugal ; Royaume-Uni via l'UK Space Agency", moa: "Espagne et Portugal, coordination ESA",
    moe: "Espagne : Open Cosmos (8 satellites, contrat d'oct. 2025) ; précurseurs Satlantis ; Portugal : satellites radar ICEYE", g: ["autre"], plat: "Petits satellites",
    instr: "Caméras multispectrales, réflectométrie GNSS, récepteurs AIS et IoT (Espagne) ; radar SAR (Portugal)",
    app: "Gestion des catastrophes, surveillance maritime et environnementale de l'Atlantique, avec une revisite visée de 24 h.",
    bud: "Non documenté (Espagne : + 325 M€ décidés en 2026 pour 3 satellites supplémentaires)", bc: "B",
    y0: 2025, y1: 2035, jal: [[2025, "Précurseur Garai A (janv.)"], [2026, "Garai B et premiers radars portugais"], [2027, "Satellites espagnols Open Cosmos"]],
    st: "dev", pred: [], succ: [],
    note: "Espagne : 11 satellites prévus ; Portugal : 8 plus des radars ICEYE exploités par l'armée de l'air ; Royaume-Uni : 1 satellite pionnier." },

  { id: "grece", n: "Programme national grec de micro-satellites", d: "ona", sub: "Première capacité spatiale nationale de la Grèce",
    fin: "Grèce, via la Facilité pour la reprise et la résilience de l'UE (« Greece 2.0 »)", moa: "Ministère grec de la Gouvernance numérique ; mise en œuvre avec l'ESA et le Hellenic Space Center",
    moe: "Optique : Open Cosmos Aegean ; incendies : OroraTech ; CubeSats : universités et PME grecques", g: ["autre"], plat: "Micro-satellites et CubeSats",
    instr: "Imageurs optiques (jusqu'à 90 cm), capteurs infrarouges thermiques, charges de démonstration",
    app: "Surveillance des incendies, observation du territoire, démonstrations de télécommunications.",
    bud: "Non documenté (suite annoncée : HELLAS-SPACE 2.0, 350 M€)", bc: "B",
    y0: 2025, y1: 2032, jal: [[2025, "Premiers CubeSats (nov.)"], [2026, "Hellenic Fire System (mai) ; Hyperion GR-1 (juil.)"]],
    st: "op", pred: [], succ: [],
    note: "13 satellites annoncés pour le volet micro-satellites, dont 7 construits en Grèce par Open Cosmos Aegean ; 7 missions CubeSats suivies par l'ESA. Les décomptes diffèrent selon les sources." },

  /* Observation militaire nationale */
  { id: "mikroglob", n: "MikroGlob", d: "dob", sub: "Constellation optique militaire polonaise",
    fin: "Pologne (Défense)", moa: "Agence de l'armement polonaise",
    moe: "Creotech Instruments (plateforme HyperSat)", g: ["autre"], plat: "HyperSat (Creotech)",
    instr: "Caméras visible et proche infrarouge",
    app: "Donner à l'armée polonaise une imagerie optique souveraine, en complément du radar de POLSARIS.",
    bud: "550 M PLN (contrat Creotech)", bc: "A",
    y0: 2024, y1: 2032, jal: [[2024, "Contrat (20 déc.)"], [2026, "Premier satellite (juil.), constellation complète (oct.)"]],
    st: "op", pred: [], succ: [],
    note: "Exploité par l'unité de reconnaissance géospatiale ARGUS. À distinguer de MikroSAR, le volet radar (voir POLSARIS)." },

  { id: "luxeosys", n: "LUXEOSys", d: "dob", sub: "Satellite d'observation à double usage du Luxembourg",
    fin: "Luxembourg (Défense)", moa: "Direction de la défense du Luxembourg",
    moe: "OHB Italia (satellite et segment sol)", g: ["ohb"], plat: "OHB Italia",
    instr: "Imageur très haute résolution (détails non publiés)",
    app: "Défense, sécurité, aide humanitaire, catastrophes et climat ; images partagées avec l'UE, l'OTAN et l'ONU.",
    bud: "Non documenté", bc: "C",
    y0: 2025, y1: 2032, jal: [[2025, "Lancement (26 août, Falcon 9)"], [2026, "Exploitation complète prévue"]],
    st: "op", pred: [], succ: [],
    note: "Jusqu'à 100 images par jour d'environ 10 × 10 km. Durée de vie 7 ans, prolongeable de 3 ans." },

  /* Météorologie */
  { id: "sterna", n: "EPS-Sterna", d: "met", sub: "Constellation de micro-satellites de sondage micro-ondes",
    fin: "États membres d'EUMETSAT", moa: "EUMETSAT (achat par l'ESA)",
    moe: "OHB Sweden ; instruments micro-ondes Omnisys (Suède)", g: ["ohb"], plat: "Micro-satellites dérivés de l'Arctic Weather Satellite",
    instr: "Sondeurs micro-ondes de température et d'humidité",
    app: "Rafraîchir plus souvent les profils d'humidité et de température, notamment aux hautes latitudes, en complément de MetOp-SG.",
    bud: "Non documenté (contrat satellites : 248 M€)", bc: "A",
    y0: 2024, y1: 2042, jal: [[2024, "Précurseur ESA : Arctic Weather Satellite (août)"], [2026, "Approbation EUMETSAT (janv.) ; contrat OHB (mars)"], [2029, "Premiers satellites prévus"]],
    st: "dev", pred: [], succ: [],
    note: "Trois générations de six satellites sont annoncées, pour 20 satellites au total selon la même source : écart non expliqué. Durée d'exploitation prévue : 13 ans." },

  /* Télécommunications */
  { id: "scylight", n: "ScyLight", d: "opt", sub: "Programme ARTES de l'ESA pour les communications optiques et quantiques",
    fin: "ESA – ARTES (programme optionnel)", moa: "ESA",
    moe: "Selon les projets ; démonstrateur de réseau multi-orbites HydRON : Thales Alenia Space", g: ["tas"], plat: "—",
    instr: "Terminaux laser, réseaux optiques, distribution quantique de clés",
    app: "Faire mûrir les liaisons laser entre satellites et vers le sol, et la cryptographie quantique.",
    bud: "Non documenté", bc: "C",
    y0: 2016, y1: 2030, jal: [],
    st: "op", pred: ["edrs"], succ: [],
    note: "Nom complet : SeCure and Laser communication Technology. Programme de R&D : il finance des projets, ce n'est pas un système unique." },

  { id: "ntn", n: "Space for 5G/6G et connectivité directe (D2D)", d: "tin", sub: "Ligne ARTES pour les réseaux non terrestres",
    fin: "ESA – ARTES", moa: "ESA",
    moe: "Cofinancement de projets industriels ; exemples documentés : OQ Technology, Sateliot", g: ["autre"], plat: "—",
    instr: "Normes 3GPP NTN, IoT et voix vers terminaux standards",
    app: "Intégrer les satellites aux réseaux mobiles 5G puis 6G, jusqu'à la connexion directe d'un téléphone ou d'un objet au satellite.",
    bud: "Non documenté", bc: "C",
    y0: 2021, y1: 2030, jal: [[2022, "Programme ESA validant la technologie de Sateliot (oct.)"], [2024, "Étude d'OQ Technology sur la connexion directe (févr.)"], [2025, "Livre blanc ESA sur le D2D (sept.)"]],
    st: "op", pred: ["artes"], succ: [],
    note: "Pôle 5G/6G de l'ESA au centre ECSAT de Harwell (Royaume-Uni). Le marché D2D est aujourd'hui dominé par des acteurs américains ; ce programme vise des pilotes européens." },

  /* Science */
  { id: "xmm", n: "XMM-Newton", d: "esc", sub: "Observatoire spatial en rayons X (pierre angulaire de l'ESA)",
    fin: "ESA – programme scientifique", moa: "ESA",
    moe: "Dornier Satellitensysteme (aujourd'hui Airbus DS Allemagne)", g: ["airbus"], plat: "—",
    instr: "Trois télescopes X à miroirs emboîtés, caméras EPIC, spectromètres RGS, moniteur optique",
    app: "Étudier les objets les plus chauds et violents de l'Univers : trous noirs, amas de galaxies, étoiles à neutrons.",
    bud: "689 M€ aux conditions de 1999 (construction, lancement et deux ans d'exploitation)", bc: "B",
    y0: 1999, y1: 2029, jal: [[1999, "Lancement (10 déc., Ariane 5)"], [2023, "Prolongation à fin 2026, indicativement 2029"]],
    st: "op", pred: [], succ: ["newathena"],
    note: "Toujours en service plus de 25 ans après son lancement. NewAthena est la prochaine grande mission X de l'ESA." },

  { id: "cheops", n: "CHEOPS", d: "esc", sub: "Caractérisation d'exoplanètes (première mission « S » de l'ESA)",
    fin: "ESA et Suisse, avec un consortium de 11 pays", moa: "ESA et Université de Berne",
    moe: "Airbus DS Espagne", g: ["airbus"], plat: "AS-250 (Airbus)",
    instr: "Télescope de 32 cm pour photométrie de précision",
    app: "Mesurer finement la taille d'exoplanètes déjà connues lors de leurs transits.",
    bud: "Non documenté", bc: "C",
    y0: 2019, y1: 2029, jal: [[2019, "Lancement (18 déc., Soyouz)"], [2026, "Seconde prolongation jusqu'à fin 2029 (juin)"]],
    st: "op", pred: [], succ: ["plato"],
    note: "Mission dirigée par l'Université de Berne avec l'Université de Genève (centre d'opérations scientifiques)." },

  { id: "proba3", n: "Proba-3", d: "esc", sub: "Vol en formation de précision et éclipses artificielles",
    fin: "ESA – programme technologique GSTP", moa: "ESA",
    moe: "Sener (Espagne) ; coronographe ASPIICS par un consortium mené par le Centre spatial de Liège", g: ["autre"], plat: "Deux satellites : occulteur et coronographe",
    instr: "Coronographe ASPIICS ; radiomètre DARA",
    app: "Deux satellites alignés à 150 m créent une éclipse artificielle pour observer la couronne solaire, et démontrent le vol en formation au millimètre.",
    bud: "Non documenté", bc: "C",
    y0: 2024, y1: 2027, jal: [[2024, "Lancement (5 déc., PSLV)"], [2025, "Premiers vols en formation autonomes et premières images de la couronne"]],
    st: "op", pred: [], succ: [],
    note: "Mission technologique avant tout, rangée ici avec la science solaire qu'elle produit." },

  /* Exploration */
  { id: "msr", n: "Mars Sample Return / Earth Return Orbiter", d: "exh", sub: "Retour d'échantillons martiens avec la NASA (abandonné)",
    fin: "ESA – exploration ; NASA", moa: "ESA (Earth Return Orbiter)",
    moe: "Earth Return Orbiter : Airbus DS (contrat de 491 M€, 2020)", g: ["airbus"], plat: "Orbiteur à propulsion électrique",
    instr: "Capture et rapatriement du conteneur d'échantillons",
    app: "Rapporter sur Terre les échantillons prélevés par le rover Perseverance.",
    bud: "Contrat ERO : 491 M€ (2020)", bc: "A",
    y0: 2020, y1: 2026, jal: [[2020, "Contrat ERO à Airbus (oct.)"], [2023, "Revue NASA : budget et calendrier « irréalistes »"], [2026, "Le Sénat américain coupe le financement (janv.) ; les États membres de l'ESA demandent l'arrêt de l'ERO (mars)"]],
    st: "ann", pred: [], succ: [],
    note: "Statut en mars 2026 : MSR « n'est pas prévu d'être poursuivi » (ESA). L'ESA discute avec Airbus de la sortie du contrat et de la réutilisation de technologies, comme la propulsion électrique." },

  { id: "spacerider", n: "Space Rider", d: "exh", sub: "Laboratoire orbital réutilisable sans équipage",
    fin: "ESA (contribution majoritaire de l'Italie)", moa: "ESA",
    moe: "Co-maîtres d'œuvre : Thales Alenia Space (module de rentrée) et Avio (module de service)", g: ["tas", "lanc"], plat: "Module de rentrée et module de service dérivé de Vega",
    instr: "Soute d'environ 600 kg pour expériences en microgravité",
    app: "Mener des expériences en orbite pendant environ deux mois puis revenir se poser au sol.",
    bud: "≈ 346 M€ souscrits aux conseils ministériels 2019, 2022 et 2025, hors lanceur ; plus 38 M€ apportés par l'Italie en 2025", bc: "B",
    y0: 2020, y1: 2033, jal: [[2020, "Contrats aux co-maîtres d'œuvre (déc.)"], [2028, "Vol inaugural prévu (1er trimestre)"]],
    st: "dev", pred: [], succ: [], host: "vega",
    note: "Descend du démonstrateur de rentrée IXV (2015). Masse au lancement jusqu'à 4,9 t." },

  /* Lanceurs */
  { id: "flpp", n: "FLPP (Future Launchers Preparatory Programme)", d: "lnc", sub: "Préparation des technologies des futurs lanceurs",
    fin: "ESA (programme optionnel)", moa: "ESA",
    moe: "Contrats multiples ; ArianeGroup pour Prometheus et Themis", g: ["lanc"], plat: "—",
    instr: "Moteur réutilisable Prometheus, démonstrateur d'étage réutilisable Themis",
    app: "Réduire les risques et les coûts des lanceurs suivants en testant les technologies en amont.",
    bud: "Non documenté", bc: "C",
    y0: 2004, y1: 2030, jal: [],
    st: "op", pred: [], succ: ["themis"],
    note: "Programme de R&D. Prometheus et Themis en sont issus." },

  { id: "astris", n: "ASTRIS", d: "lnc", sub: "Étage supérieur additionnel pour Ariane 6",
    fin: "ESA", moa: "ESA",
    moe: "ArianeGroup (filiale allemande)", g: ["lanc"], plat: "Étage additionnel monté sur Ariane 6",
    instr: "—",
    app: "Placer les charges sur plusieurs orbites ou directement en géostationnaire ; évolue vers un véhicule de transfert orbital.",
    bud: "Contrat initial 90 M€ (2021) ; ≈ 100 M€ décidés au CM25", bc: "A",
    y0: 2021, y1: 2032, jal: [[2021, "Contrat ESA (juil.)"], [2025, "Réorientation vers un véhicule de transfert (CM25)"], [2028, "Qualification au sol prévue"], [2029, "Premier vol visé"]],
    st: "dev", pred: [], succ: [], host: "ariane6",
    note: "Le premier vol était d'abord prévu en 2027." },

  { id: "boost", n: "Boost!", d: "lnn", sub: "Soutien de l'ESA aux services de transport spatial commerciaux",
    fin: "ESA (programme optionnel)", moa: "ESA",
    moe: "Cofinancement : HyImpulse, Isar Aerospace, Orbex, Rocket Factory Augsburg", g: ["autre"], plat: "—",
    instr: "—",
    app: "Aider les jeunes lanceurs à franchir l'étape coûteuse entre développement et premiers vols commerciaux.",
    bud: "Non documenté (extensions de contrats : 44,2 M€)", bc: "A",
    y0: 2020, y1: 2026, jal: [[2020, "Premier contrat (Orbex)"], [2024, "Quatre extensions de contrats, 44,2 M€"]],
    st: "op", pred: [], succ: [],
    note: "Prédécesseur du European Launcher Challenge, qui a pris le relais au CM25 avec environ 900 M€." }
);

/* ---------- 3. Corrections de programmes existants ---------- */
(function () {
  const P = id => PROGRAMMES.find(p => p.id === id);
  Object.assign(P("forum"), {
    moe: "Airbus DS Royaume-Uni (contrat de juin 2022) ; instrument OHB ; mécanismes de balayage Sener", g: ["airbus"],
    bud: "Contrat satellite : 160 M€ (2022)", bc: "A",
    jal: [[2022, "Contrat à Airbus (juin)"], [2027, "Lancement prévu depuis Kourou"]]
  });
  Object.assign(P("harmony"), {
    moe: "OHB System (contrat d'oct. 2024, consortium de 45 entreprises de 15 pays) ; radars Thales Alenia Space Italie ; caméras infrarouges ABB (Canada)", g: ["ohb"],
    bud: "Contrat industriel : plus de 280 M€ (2024)", bc: "A",
    jal: [[2024, "Contrat à OHB (oct.)"], [2029, "Lancement prévu"]]
  });
  Object.assign(P("wivern"), { moe: "Non attribué publiquement (sélection confirmée le 23 sept. 2025)" });
  Object.assign(P("sng"), {
    moe: "Sentinel-1NG : Thales Alenia Space Italie, radars Airbus DS Allemagne (contrat de juin 2026) ; 2NG : phase A/B confiée à deux industriels en parallèle, dont OHB System (janv. 2024, 6 M€ chacun), réalisation non attribuée ; 3NG : non attribué publiquement"
  });
  Object.assign(P("csosuite"), {
    moe: "Études confiées par la DGA à Airbus DS et à Thales Alenia Space ; commande non notifiée au 30 sept. 2026", g: ["airbus", "tas"],
    instr: "Deux satellites, EHRmin et EHRmax",
    bud: "≈ 1 Md€ pour la commande attendue, segment sol inclus", bc: "C",
    jal: [[2019, "Lancement du programme"], [2026, "Commande annoncée comme imminente"]],
    note: "IRIS = Instruments de renseignement et d'imagerie spatiale, successeur de CSO. Ne pas confondre avec IRIS², la constellation de télécommunications de l'UE. Selon la presse, Airbus porterait le segment sol et Thales Alenia Space les instruments : information non confirmée par le ministère."
  });
  const iris2 = P("iris2");
  iris2.note = (iris2.note ? iris2.note + " " : "") + "Ne pas confondre avec IRIS, le successeur militaire français de CSO.";
  Object.assign(P("jason"), {
    st: "op", y1: 2026,
    note: "Jason-3 est toujours en service : après un incident de transmission des données (mode survie fin août 2026), la récupération était annoncée pour le 3 septembre 2026 (NOAA). Sentinel-6 a repris le rôle de mission de référence."
  });
  Object.assign(P("clearspace"), {
    moe: "ClearSpace (Suisse), maître d'œuvre", bud: "Contrat ESA : 86 M€ (nov. 2020)", bc: "A",
    y0: 2020, y1: 2029,
    jal: [[2020, "Contrat ESA (nov.)"], [2023, "Cible initiale (adaptateur VESPA) touchée par un débris"], [2024, "Nouvelle cible : le satellite PROBA-1 (avril)"], [2028, "Lancement prévu"]],
    note: "Mission ClearSpace-1, recentrée sur la capture de PROBA-1. Le calendrier a glissé de 2025-2026 à 2028 (état en février 2026)."
  });
  Object.assign(P("vigil"), { d: "msp" });
  Object.assign(P("polsaris"), {
    note: "Contrat MikroSAR (14 mai 2025) : consortium ICEYE Polska et WZŁ-1, 3 satellites plus 3 en option, 860 M PLN TTC options incluses. 4 satellites en orbite sur 6 prévus en octobre 2026. Volet optique : MikroGlob."
  });
  const themis = P("themis"); if (themis && !themis.pred.includes("flpp")) themis.pred.push("flpp");
  const plato = P("plato"); if (plato && !plato.pred.includes("cheops")) plato.pred.push("cheops");
  const na = P("newathena"); if (na && !na.pred.includes("xmm")) na.pred.push("xmm");
  const ga = P("galg2"); if (ga && !ga.pred.includes("egep")) ga.pred.push("egep");
})();

/* Orbites des nouveaux programmes */
Object.assign(ORBITES, {
  celeste: "Orbite basse", scouts: "Héliosynchrone (orbite basse)", phisat: "Héliosynchrone (orbite basse)",
  swot: "Non héliosynchrone, ≈ 890 km, inclinaison ≈ 77,6°", microcarb: "Héliosynchrone, 650 km", enmap: "Héliosynchrone, ≈ 650 km",
  prisma: "Héliosynchrone (orbite basse)", atlantic: "Orbites basses", grece: "Orbites basses, héliosynchrones pour la plupart",
  mikroglob: "Héliosynchrone (orbite basse)", luxeosys: "Héliosynchrone, ≈ 450 km", sterna: "Orbites basses polaires",
  xmm: "Très elliptique (période ≈ 48 h)", cheops: "Héliosynchrone (orbite basse)", proba3: "Très elliptique (apogée ≈ 60 000 km)",
  spacerider: "Orbite basse, puis retour et atterrissage"
});
PROGRAMMES.forEach(p => { if (ORBITES[p.id] && !p.orb) p.orb = ORBITES[p.id]; });

/* Parc : seulement les comptages documentés ; m: null = masse non publiée */
Object.assign(PARC, {
  celeste: { orb: 2, srv: 2, prv: 9, m: null, bc: "A" },
  scouts: { orb: 2, srv: 2, prv: 0, m: null, bc: "A" },
  phisat: { orb: 2, srv: 1, prv: 0, m: null, bc: "B" },
  swot: { orb: 1, srv: 1, prv: 0, m: 2200, bc: "A" },
  microcarb: { orb: 1, srv: 1, prv: 0, m: 180, bc: "A" },
  enmap: { orb: 1, srv: 1, prv: 0, m: 1000, bc: "A" },
  prisma: { orb: 1, srv: 1, prv: 1, m: null, bc: "B" },
  atlantic: { orb: 4, srv: 4, prv: 16, m: null, bc: "B" },
  grece: { orb: 9, srv: 9, prv: 10, m: null, bc: "C" },
  mikroglob: { orb: 4, srv: 4, prv: 0, m: null, bc: "A" },
  luxeosys: { orb: 1, srv: 1, prv: 0, m: null, bc: "A" },
  sterna: { orb: 1, srv: 1, prv: 20, m: null, bc: "B" },
  xmm: { orb: 1, srv: 1, prv: 0, m: 3764, bc: "A" },
  cheops: { orb: 1, srv: 1, prv: 0, m: null, bc: "A" },
  proba3: { orb: 2, srv: 2, prv: 0, m: null, bc: "A" },
  polsaris: { orb: 4, srv: 4, prv: 2, m: 100, bc: "C" }
});

/* Unités : satellites et vols */
Object.assign(UNITES, {
  celeste: [
    ["Celeste IOD-1", "28 mars 2026", "Electron (Nouvelle-Zélande)", "op", "Satellite GMV, avec OHB"],
    ["Celeste IOD-2", "28 mars 2026", "Electron (Nouvelle-Zélande)", "op", "Satellite Thales Alenia Space"],
    ["9 satellites suivants", "2027 (prévu)", "Non documenté", "dev", "Constellation de démonstration de 11 satellites"]],
  scouts: [
    ["HydroGNSS-1", "28 nov. 2025", "Falcon 9 (Transporter-15)", "op", "SSTL ; réflectométrie GNSS (humidité des sols, zones humides, glace)"],
    ["HydroGNSS-2", "28 nov. 2025", "Falcon 9 (Transporter-15)", "op", "Satellite jumeau"]],
  phisat: [
    ["Φsat-1", "3 sept. 2020", "Vega VV16 (Kourou)", "fin", "Premier essai d'IA embarquée (processeur Intel Myriad 2) ; mission de démonstration, date de fin non documentée"],
    ["Φsat-2", "16 août 2024", "Falcon 9 (Transporter-11)", "op", "Open Cosmos ; plusieurs applications d'IA téléversables"]],
  swot: [["SWOT", "16 déc. 2022", "Falcon 9 (Vandenberg)", "op", "≈ 2,2 t ; radar KaRIn, altimètre de nadir, DORIS"]],
  microcarb: [["MicroCarb", "26 juil. 2025 (UTC)", "Vega-C VV27 (Kourou)", "op", "180 kg ; lancé avec CO3D"]],
  enmap: [["EnMAP", "1er avr. 2022", "Falcon 9 (Cap Canaveral)", "op", "≈ 1 t ; imageur hyperspectral"]],
  prisma: [
    ["PRISMA", "22 mars 2019", "Vega VV14 (Kourou)", "op", "Hyperspectral et panchromatique"],
    ["PRISMA Seconde Génération", "2031 (prévu)", "Non documenté", "dev", "OHB Italia, plateforme PRIMA-S, charge utile Leonardo"]],
  atlantic: [
    ["Garai A (précurseur espagnol)", "14 janv. 2025", "Falcon 9 (Transporter-12)", "op", "Satlantis ; instrument ISIM-90"],
    ["Garai B (précurseur espagnol)", "30 mars 2026", "Falcon 9 (Transporter-16)", "op", "Satlantis ; instrument ISIM-170"],
    ["Radar portugais n° 1", "30 mars 2026", "Falcon 9 (Transporter-16)", "op", "ICEYE ; exploité par l'armée de l'air portugaise"],
    ["Radar portugais n° 2", "3 mai 2026", "Falcon 9", "op", "ICEYE"],
    ["8 satellites espagnols", "2027 (livraison prévue)", "Non documenté", "dev", "Open Cosmos ; optique, réflectométrie GNSS, AIS, IoT"],
    ["Satellite pionnier britannique", "2026 (prévu)", "Non documenté", "dev", "Open Cosmos, pour l'UK Space Agency"]],
  grece: [
    ["MICE-1 et PHASMA (LAMARR, DIRAC)", "28 nov. 2025", "Falcon 9 (Transporter-15)", "op", "CubeSats : PRISMA Electronics ; Libre Space Foundation"],
    ["DUTHSat-2", "Non documenté", "Non documenté", "op", "Université Démocrite de Thrace"],
    ["Hellenic Fire System (4 satellites)", "mai 2026", "Falcon 9 (Vandenberg)", "op", "OroraTech ; détection d'incendies par infrarouge thermique"],
    ["Hyperion GR-1", "7 juil. 2026", "Falcon 9 (Cap Canaveral)", "op", "Open Cosmos Aegean ; premier de 7 satellites optiques"]],
  mikroglob: [
    ["MikroGlob-1", "7 juil. 2026", "Non documenté", "op", "Creotech, plateforme HyperSat"],
    ["MikroGlob-2, -3 et -4", "2026", "Falcon 9 (Transporter-18)", "op", "Constellation complète début octobre 2026"]],
  luxeosys: [["LUXEOSys", "26 août 2025", "Falcon 9 (Vandenberg)", "op", "OHB Italia ; exploitation complète prévue début 2026"]],
  sterna: [
    ["Arctic Weather Satellite (précurseur ESA)", "16 août 2024", "Falcon 9 (Transporter-11)", "op", "OHB Sweden ; trois ans du contrat au lancement"],
    ["EPS-Sterna, première série", "2029 (prévu)", "Non documenté (achat EUMETSAT)", "dev", "Six satellites annoncés"]],
  xmm: [["XMM-Newton", "10 déc. 1999", "Ariane 5 (Kourou)", "op", "3 764 kg ; prolongé à fin 2026, indicativement 2029"]],
  cheops: [["CHEOPS", "18 déc. 2019", "Soyouz-Fregat (Kourou)", "op", "Prolongé jusqu'à fin 2029"]],
  proba3: [
    ["Proba-3 Coronagraph", "5 déc. 2024", "PSLV-XL (Sriharikota)", "op", "Porte le coronographe ASPIICS"],
    ["Proba-3 Occulter", "5 déc. 2024", "PSLV-XL (Sriharikota)", "op", "Porte le disque occulteur ; vol en formation à 150 m"]],
  msr: [["Earth Return Orbiter", "Non lancé", "—", "ann", "Arrêt demandé par les États membres en mars 2026"]],
  spacerider: [["Space Rider, premier vol", "2028 (prévu)", "Vega-C+ (Kourou)", "dev", "Module de rentrée TAS, module de service Avio"]],
  astris: [["ASTRIS, premier vol", "2029 (visé)", "Ariane 6", "dev", "Qualification au sol prévue fin 2028"]]
});
UNITES.jason = UNITES.jason.map(r => r[0] === "Jason-3" ? ["Jason-3", "17 janv. 2016", "Falcon 9 (Vandenberg)", "op", "Altimètre Poseidon-3B ; incident de transmission août-sept. 2026, récupération annoncée le 3 sept. (NOAA)"] : r);

/* Lignées */
LIGNEES.forEach(l => {
  if (l.titre === "Proteus et Myriade (CNES)") {
    l.etapes = [["Proteus : Jason-1", 2001, "jason"], ["Proteus : Jason-2", 2008, "jason"], ["Proteus : SMOS", 2009, "smos"], ["Proteus : Jason-3", 2016, "jason"], ["Myriade : MicroCarb", 2025, "microcarb"]];
    l.note = "Les mini-plateformes françaises en orbite basse : Proteus (≈ 500 kg) et Myriade (≈ 100 à 200 kg).";
  }
  l.etapes.forEach(e => { if (e[0] === "CHEOPS") e[2] = "cheops"; });
  if (l.titre === "Altimétrie océanique") l.branches.push(["SWOT (large fauchée)", 2022, "swot"]);
});
LIGNEES.push(
  { type: "mission", titre: "Sondage micro-ondes à petits satellites", note: "Un démonstrateur ESA construit en trois ans devient une constellation opérationnelle d'EUMETSAT.",
    etapes: [["Arctic Weather Satellite", 2024, "sterna"], ["EPS-Sterna", 2029, "sterna"]], branches: [] },
  { type: "mission", titre: "Rayons X européens", note: "La grande mission X suivante de l'ESA succède à un observatoire lancé en 1999.",
    etapes: [["XMM-Newton", 1999, "xmm"], ["NewAthena", 2037, "newathena"]], branches: [] },
  { type: "mission", titre: "Hyperspectral italien", note: "La seconde génération garde le même maître d'ouvrage et le même maître d'œuvre.",
    etapes: [["PRISMA", 2019, "prisma"], ["PRISMA SG", 2031, "prisma"]], branches: [] }
);

/* Convergences */
CONVERGENCES.push(
  { type: "Complémentarité", a: "celeste", b: "galg2", titre: "Navigation en orbite basse en appui de Galileo", txt: "Celeste teste une couche de satellites en orbite basse qui renforcerait Galileo face au brouillage, sans le remplacer." },
  { type: "Complémentarité", a: "sterna", b: "metopsg", titre: "EPS-Sterna et MetOp-SG", txt: "Des micro-satellites rafraîchissent les sondages micro-ondes entre deux passages des grands satellites polaires." },
  { type: "Complémentarité", a: "mikroglob", b: "polsaris", titre: "Pologne : optique et radar", txt: "La Pologne achète séparément un volet optique (MikroGlob, Creotech) et un volet radar (MikroSAR, ICEYE)." },
  { type: "Public-privé", a: "atlantic", b: "iceye", titre: "Constellation Atlantique : NewSpace et fonds européens", txt: "Deux États montent une constellation avec des fonds de relance de l'UE et des fournisseurs NewSpace (Open Cosmos, Satlantis, ICEYE)." },
  { type: "Coopération internationale", a: "swot", b: "jason", titre: "SWOT : la coopération CNES-NASA continue", txt: "Après Topex/Poseidon et Jason, le CNES et la NASA partagent à nouveau une mission d'altimétrie, cette fois à large fauchée." }
);

/* ---------- 4. Identifiants des acteurs existants ---------- */
const slugActeur = n => n.split(" (")[0].normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
ACTEURS.forEach(a => { if (!a.id) a.id = slugActeur(a.n); });
/* Identifiants courts lisibles pour les acteurs les plus cités */
Object.entries({
  "ESA (Agence spatiale européenne)": "esa", "Commission européenne (DG DEFIS)": "commission", "Airbus Defence and Space": "airbus-ds",
  "Thales Alenia Space": "tas", "OHB SE": "ohb-se", "Thales (groupe)": "thales", "SSTL (Surrey Satellite Technology)": "sstl",
  "Kongsberg Satellite Services (KSAT)": "ksat", "Swedish Space Corporation (SSC)": "ssc", "Rocket Factory Augsburg (RFA)": "rfa",
  "Agence spatiale polonaise (POLSA)": "polsa", "Commandement de l'Espace (CDE)": "cde", "Agencia Espacial Española (AEE)": "aee",
  "Banque européenne d'investissement (BEI)": "bei", "Isar Aerospace": "isar", "PLD Space": "pld"
}).forEach(([n, id]) => { const a = ACTEURS.find(x => x.n === n); if (a) a.id = id; });

/* Précisions sur des acteurs existants */
(function () {
  const A = id => ACTEURS.find(a => a.id === id);
  A("ksat").m += " À ne pas confondre avec Kongsberg Defence & Aerospace : deux sociétés distinctes du groupe Kongsberg.";
  const ic = A("iceye"); if (ic) ic.m += " Acteur dual : constellation commerciale et systèmes souverains de défense (SPOCK, POLSARIS, Portugal).";
  const dlr = A("dlr"); if (dlr) dlr.m += " L'Agence spatiale allemande fait partie du DLR.";
})();

/* ---------- 5. Nouveaux acteurs ----------
   id : identifiant stable ; u : site officiel ou page source ; grp : groupe (identifiant ou nom) */
ACTEURS.push(
  /* Institutions et agences */
  { id: "aed", n: "Agence européenne de défense (AED)", c: "inst", p: "EU", v: "Bruxelles", t: "Agence de l'UE", y: 2004,
    m: "Soutient la coopération de défense entre États membres de l'UE, y compris des projets et études de capacités spatiales.", k: "", kb: "", pr: [], u: "https://eda.europa.eu" },
  { id: "aid", n: "Agence de l'innovation de défense (AID)", c: "inst", p: "FR", v: "Paris", t: "Ministère des Armées", y: 2018,
    m: "Finance l'innovation de défense, dont des projets spatiaux de start-up et de laboratoires.", k: "", kb: "", pr: [], u: "https://www.defense.gouv.fr/aid" },
  { id: "cdti", n: "CDTI", c: "inst", p: "ES", v: "Madrid", t: "Entité publique", y: 1977,
    m: "Centre pour le développement technologique et l'innovation. Il a représenté l'Espagne à l'ESA jusqu'à la création de l'AEE.", k: "", kb: "", pr: [], u: "https://www.cdti.es" },
  { id: "inta", n: "INTA", c: "inst", p: "ES", v: "Torrejón de Ardoz", t: "Organisme public de recherche (Défense)", y: 1942,
    m: "Institut national de technique aérospatiale : technologies, petits satellites nationaux, station sol de Maspalomas.", k: "", kb: "", pr: [], u: "https://www.inta.es" },
  { id: "ukspacecommand", n: "UK Space Command", c: "inst", p: "GB", v: "High Wycombe", t: "Ministère de la Défense", y: 2021,
    m: "Commandement interarmées britannique de l'espace : pilote les capacités spatiales militaires, dont Skynet.", k: "", kb: "", pr: ["skynet"], u: "https://www.gov.uk/government/organisations/uk-space-command" },
  { id: "catapult", n: "Satellite Applications Catapult", c: "inst", p: "GB", v: "Harwell", t: "Centre d'innovation", y: 2013,
    m: "Centre public britannique qui aide les entreprises à développer des applications et services satellitaires.", k: "", kb: "", pr: [], u: "https://sa.catapult.org.uk" },
  { id: "nso", n: "Netherlands Space Office (NSO)", c: "inst", p: "NL", v: "La Haye", t: "Agence nationale", y: 2009,
    m: "Agence spatiale des Pays-Bas : représente le pays à l'ESA ; a cofinancé l'instrument TROPOMI de Sentinel-5P.", k: "", kb: "", pr: ["s5p"], u: "https://www.spaceoffice.nl" },
  { id: "belspo", n: "BELSPO", c: "inst", p: "BE", v: "Bruxelles", t: "Administration fédérale", y: null,
    m: "Politique scientifique fédérale belge : porte la contribution de la Belgique à l'ESA.", k: "", kb: "", pr: [], u: "https://www.belspo.be" },
  { id: "sso", n: "Swiss Space Office (SSO)", c: "inst", p: "CH", v: "Berne", t: "Administration fédérale (SEFRI)", y: null,
    m: "Service spatial de la Confédération, rattaché au secrétariat d'État à la formation, à la recherche et à l'innovation.", k: "", kb: "", pr: [], u: "https://www.sbfi.admin.ch/space" },
  { id: "snsa", n: "Agence spatiale suédoise (Rymdstyrelsen)", c: "inst", p: "SE", v: "Solna", t: "Agence nationale", y: 1972,
    m: "Finance la recherche spatiale suédoise et la participation de la Suède à l'ESA.", k: "", kb: "", pr: [], u: "https://www.rymdstyrelsen.se" },
  { id: "nosa", n: "Agence spatiale norvégienne (Norsk Romsenter)", c: "inst", p: "NO", v: "Oslo", t: "Agence nationale", y: 1987,
    m: "Représente la Norvège à l'ESA et coordonne la politique spatiale nationale.", k: "", kb: "", pr: [], u: "https://www.romsenter.no" },
  { id: "ffg", n: "FFG – Agence aéronautique et spatiale (ALR)", c: "inst", p: "AT", v: "Vienne", t: "Agence nationale de financement", y: 2004,
    m: "L'agence autrichienne de financement de la recherche porte la délégation spatiale de l'Autriche.", k: "", kb: "", pr: [], u: "https://www.ffg.at" },
  { id: "ptspace", n: "Portugal Space", c: "inst", p: "PT", v: "Lisbonne", t: "Agence nationale", y: 2019,
    m: "Agence spatiale portugaise ; partie prenante de la Constellation Atlantique.", k: "", kb: "", pr: ["atlantic"], u: "https://ptspace.pt" },
  { id: "hsc", n: "Hellenic Space Center", c: "inst", p: "GR", v: "Athènes (Chalandri)", t: "Organisme public", y: 2019,
    m: "A remplacé l'Agence spatiale hellénique en 2019 : politique spatiale grecque, représentation à l'ESA, appui au programme national de micro-satellites.", k: "", kb: "", pr: ["grece"], u: "https://en.wikipedia.org/wiki/Hellenic_Space_Center" },
  { id: "businessfinland", n: "Business Finland", c: "inst", p: "FI", v: "Helsinki", t: "Agence publique d'innovation", y: 2018,
    m: "Représente la Finlande à l'ESA et finance l'innovation, dont l'écosystème NewSpace finlandais.", k: "", kb: "", pr: [], u: "https://www.businessfinland.fi" },
  { id: "rosa", n: "Agence spatiale roumaine (ROSA)", c: "inst", p: "RO", v: "Bucarest", t: "Agence nationale", y: 1991,
    m: "Coordonne le programme spatial roumain et la participation de la Roumanie à l'ESA (membre depuis 2011).", k: "", kb: "", pr: [], u: "https://www.rosa.ro" },

  /* Laboratoires et organismes de recherche */
  { id: "cnrs", n: "CNRS (Insu)", c: "lab", p: "FR", v: "Paris", t: "Organisme de recherche", y: 1939,
    m: "Ses laboratoires conçoivent avec le CNES une grande partie des instruments scientifiques français (LATMOS, LAM, LESIA, IAS, APC, IPGP, IRAP…).", k: "", kb: "", pr: ["microcarb"], u: "https://www.cnrs.fr" },
  { id: "latmos", n: "LATMOS", c: "lab", p: "FR", v: "Guyancourt", t: "Laboratoire CNRS, UVSQ, Sorbonne Université", y: 2009,
    m: "Atmosphères terrestre et planétaires ; responsable du spectromètre UV PHEBUS de BepiColombo.", k: "", kb: "", pr: ["bepi"], u: "https://www.latmos.ipsl.fr" },
  { id: "lam", n: "LAM (Laboratoire d'astrophysique de Marseille)", c: "lab", p: "FR", v: "Marseille", t: "Laboratoire CNRS, Aix-Marseille Université, CNES", y: 2000,
    m: "A conduit le développement de l'instrument infrarouge NISP d'Euclid.", k: "", kb: "", pr: ["euclid"], u: "https://www.lam.fr" },
  { id: "lesia", n: "LESIA", c: "lab", p: "FR", v: "Meudon", t: "Laboratoire Observatoire de Paris – PSL, CNRS", y: null,
    m: "Physique solaire et planétaire ; responsabilité scientifique de l'instrument d'ondes radio RPW de Solar Orbiter.", k: "", kb: "", pr: ["solo"], u: "https://lesia.obspm.fr" },
  { id: "ias", n: "IAS (Institut d'astrophysique spatiale)", c: "lab", p: "FR", v: "Orsay", t: "Laboratoire CNRS, Université Paris-Saclay", y: null,
    m: "Instruments spatiaux d'astrophysique et de planétologie, dont le microscope hyperspectral MicrOmega du rover ExoMars.", k: "", kb: "", pr: ["exomars"], u: "https://www.ias.universite-paris-saclay.fr" },
  { id: "apc", n: "APC (AstroParticule et Cosmologie)", c: "lab", p: "FR", v: "Paris", t: "Laboratoire CNRS, Université Paris Cité", y: 2005,
    m: "Pilote la contribution française à la mission d'ondes gravitationnelles LISA.", k: "", kb: "", pr: ["lisa"], u: "https://apc.u-paris.fr" },
  { id: "ipgp", n: "IPGP (Institut de physique du globe de Paris)", c: "lab", p: "FR", v: "Paris", t: "Établissement de recherche", y: 1921,
    m: "Géophysique terrestre et planétaire ; responsable du sismomètre SEIS de la mission martienne InSight (NASA).", k: "", kb: "", pr: [], u: "https://www.ipgp.fr" },
  { id: "obspm", n: "Observatoire de Paris – PSL", c: "lab", p: "FR", v: "Paris", t: "Grand établissement", y: 1667,
    m: "Astronomie et astrophysique ; contribue au traitement des données de Gaia ; héberge le LESIA.", k: "", kb: "", pr: ["gaia"], u: "https://www.observatoiredeparis.psl.eu" },
  { id: "cea", n: "CEA (Irfu)", c: "lab", p: "FR", v: "Saclay", t: "Organisme de recherche", y: 1945,
    m: "Instruments d'astrophysique : imageur de MIRI (JWST), caméra ECLAIRs (SVOM) ; partenaire scientifique de MicroCarb.", k: "", kb: "", pr: ["microcarb"], u: "https://www.cea.fr" },
  { id: "mpg", n: "Société Max Planck (MPS, MPE, AEI)", c: "lab", p: "DE", v: "Munich", t: "Organisme de recherche", y: 1948,
    m: "Instituts spatiaux : MPS (Göttingen) responsable de l'instrument PHI de Solar Orbiter ; AEI (Hanovre) moteur scientifique de LISA ; MPE (Garching) pour l'astronomie X.", k: "", kb: "", pr: ["solo", "lisa"], u: "https://www.mpg.de" },
  { id: "fraunhofer", n: "Fraunhofer-Gesellschaft", c: "lab", p: "DE", v: "Munich", t: "Organisme de recherche appliquée", y: 1949,
    m: "Plusieurs instituts travaillent pour le spatial : optique de précision, électronique, matériaux.", k: "", kb: "", pr: [], u: "https://www.fraunhofer.de" },
  { id: "inaf", n: "INAF", c: "lab", p: "IT", v: "Rome", t: "Institut national d'astrophysique", y: 1999,
    m: "Contribue à de nombreux instruments de l'ESA ; l'Italie fournit notamment le télescope d'ARIEL.", k: "", kb: "", pr: ["ariel"], u: "https://www.inaf.it" },
  { id: "cnr", n: "CNR", c: "lab", p: "IT", v: "Rome", t: "Organisme de recherche", y: 1923,
    m: "Conseil national de la recherche ; instituts actifs en télédétection et en sciences de l'atmosphère.", k: "", kb: "", pr: [], u: "https://www.cnr.it" },
  { id: "iac", n: "IAC (Instituto de Astrofísica de Canarias)", c: "lab", p: "ES", v: "La Laguna", t: "Consortium public de recherche", y: 1975,
    m: "Centre d'astrophysique espagnol ; participe à des missions spatiales de l'ESA.", k: "", kb: "", pr: [], u: "https://www.iac.es" },
  { id: "ieec", n: "IEEC", c: "lab", p: "ES", v: "Barcelone", t: "Institut de recherche", y: 1996,
    m: "Institut d'études spatiales de Catalogne ; participe à la mission Scout HydroGNSS.", k: "", kb: "", pr: ["scouts"], u: "https://www.ieec.cat" },
  { id: "kuleuven", n: "KU Leuven", c: "lab", p: "BE", v: "Louvain", t: "Université", y: 1425,
    m: "Recherche en astronomie et en ingénierie spatiale.", k: "", kb: "", pr: [], u: "https://www.kuleuven.be" },
  { id: "tudelft", n: "TU Delft", c: "lab", p: "NL", v: "Delft", t: "Université", y: 1842,
    m: "Faculté d'ingénierie aérospatiale ; programme de CubeSats Delfi.", k: "", kb: "", pr: [], u: "https://www.tudelft.nl" },
  { id: "chalmers", n: "Chalmers", c: "lab", p: "SE", v: "Göteborg", t: "Université", y: 1829,
    m: "Radioastronomie et instruments micro-ondes ; gère l'observatoire spatial d'Onsala.", k: "", kb: "", pr: [], u: "https://www.chalmers.se" },
  { id: "kth", n: "KTH", c: "lab", p: "SE", v: "Stockholm", t: "Université", y: 1827,
    m: "Physique spatiale et petits satellites, dont le satellite scientifique suédois MATS.", k: "", kb: "", pr: [], u: "https://www.kth.se" },
  { id: "ethz", n: "ETH Zurich", c: "lab", p: "CH", v: "Zurich", t: "Université", y: 1855,
    m: "Contributions suisses à LISA et à des instruments planétaires.", k: "", kb: "", pr: ["lisa"], u: "https://ethz.ch" },
  { id: "epfl", n: "EPFL (eSpace)", c: "lab", p: "CH", v: "Lausanne", t: "Université", y: 1969,
    m: "Centre spatial eSpace ; ClearSpace en est issue (2018).", k: "", kb: "", pr: ["clearspace"], u: "https://www.epfl.ch" },
  { id: "unibe", n: "Université de Berne", c: "lab", p: "CH", v: "Berne", t: "Université", y: 1834,
    m: "Dirige CHEOPS avec l'Université de Genève ; spectromètre NIM sur JUICE ; caméra CaSSIS de l'orbiteur ExoMars TGO.", k: "", kb: "", pr: ["cheops", "juice", "exomars"], u: "https://www.unibe.ch" },
  { id: "sron", n: "SRON", c: "lab", p: "NL", v: "Leiden", t: "Institut national de recherche spatiale", y: 1983,
    m: "Institut néerlandais de recherche spatiale ; partenaire de TROPOMI (Sentinel-5P).", k: "", kb: "", pr: ["s5p"], u: "https://www.sron.nl" },
  { id: "tno", n: "TNO", c: "lab", p: "NL", v: "La Haye", t: "Organisme de recherche appliquée", y: 1932,
    m: "Optique et instruments spatiaux ; a développé TROPOMI avec Airbus Pays-Bas.", k: "", kb: "", pr: ["s5p"], u: "https://www.tno.nl" },
  { id: "knmi", n: "KNMI", c: "lab", p: "NL", v: "De Bilt", t: "Institut météorologique national", y: 1854,
    m: "Responsable scientifique de TROPOMI (Sentinel-5P).", k: "", kb: "", pr: ["s5p"], u: "https://www.knmi.nl" },
  { id: "ralspace", n: "RAL Space (STFC)", c: "lab", p: "GB", v: "Harwell", t: "Laboratoire national", y: null,
    m: "Département spatial du STFC : conception d'instruments, ingénierie et traitement de données.", k: "", kb: "", pr: [], u: "https://www.ralspace.stfc.ac.uk" },
  { id: "mssl", n: "MSSL (UCL)", c: "lab", p: "GB", v: "Holmbury St Mary", t: "Laboratoire universitaire", y: 1966,
    m: "Laboratoire spatial de l'University College London : responsable de l'imageur VIS d'Euclid, co-direction de SMILE.", k: "", kb: "", pr: ["euclid", "smile"], u: "https://www.ucl.ac.uk/mssl" },
  { id: "bira", n: "Institut royal d'aéronomie spatiale (BIRA-IASB)", c: "lab", p: "BE", v: "Bruxelles", t: "Établissement scientifique fédéral", y: 1964,
    m: "Chimie atmosphérique terrestre et planétaire ; responsable du spectromètre NOMAD de l'orbiteur ExoMars TGO.", k: "", kb: "", pr: ["exomars"], u: "https://www.aeronomie.be" },
  { id: "csl", n: "Centre spatial de Liège (CSL)", c: "lab", p: "BE", v: "Liège", t: "Centre de l'Université de Liège", y: null,
    m: "Instruments optiques et essais : imageur EUI de Solar Orbiter, coronographe ASPIICS de Proba-3.", k: "", kb: "", pr: ["solo", "proba3"], u: "https://www.csl.uliege.be" },
  { id: "irf", n: "IRF (Institut suédois de physique spatiale)", c: "lab", p: "SE", v: "Kiruna", t: "Institut public", y: 1957,
    m: "Physique des plasmas spatiaux ; dirige l'ensemble d'instruments PEP de JUICE.", k: "", kb: "", pr: ["juice"], u: "https://www.irf.se" },
  { id: "dtu", n: "DTU Space", c: "lab", p: "DK", v: "Kongens Lyngby", t: "Institut universitaire", y: null,
    m: "Institut spatial de l'Université technique du Danemark : magnétomètres et caméras stellaires, dont ceux de Swarm.", k: "", kb: "", pr: ["swarm"], u: "https://www.space.dtu.dk" },
  { id: "fmi", n: "FMI (Institut météorologique finlandais)", c: "lab", p: "FI", v: "Helsinki", t: "Institut public", y: 1838,
    m: "Service météorologique national doté d'une recherche spatiale : instruments scientifiques et exploitation de données satellitaires.", k: "", kb: "", pr: [], u: "https://www.fmi.fi" },
  { id: "vtt", n: "VTT", c: "lab", p: "FI", v: "Espoo", t: "Centre de recherche technologique", y: 1942,
    m: "Centre national finlandais de recherche technologique, avec des activités spatiales (instruments, électronique).", k: "", kb: "", pr: [], u: "https://www.vttresearch.com" },
  { id: "cbk", n: "CBK PAN", c: "lab", p: "PL", v: "Varsovie", t: "Institut de l'Académie polonaise des sciences", y: 1977,
    m: "Centre de recherche spatiale polonais : instruments scientifiques pour des missions de l'ESA.", k: "", kb: "", pr: [], u: "https://www.cbk.waw.pl" },
  { id: "vito", n: "VITO", c: "lab", p: "BE", v: "Mol", t: "Organisme de recherche", y: 1991,
    m: "Recherche technologique flamande ; traitement de données d'observation de la Terre (PROBA-V, services de couverture terrestre).", k: "", kb: "", pr: [], u: "https://vito.be" },
  { id: "nlr", n: "NLR (Royal Netherlands Aerospace Centre)", c: "lab", p: "NL", v: "Amsterdam", t: "Organisme de recherche", y: 1919,
    m: "Centre néerlandais de recherche aérospatiale, avec des activités d'ingénierie spatiale.", k: "", kb: "", pr: [], u: "https://www.nlr.org" },

  /* Maîtres d'œuvre, équipementiers, propulsion */
  { id: "ohb-system", n: "OHB System AG", c: "moe", p: "DE", v: "Brême", t: "Filiale d'OHB SE", y: null,
    m: "Principale filiale de maîtrise d'œuvre d'OHB : Galileo, SARah, Hera, Heinrich Hertz, EnMAP, Harmony.", k: "", kb: "", pr: ["galg1", "sarah", "hera", "hh", "enmap", "harmony", "plato", "co2m"], u: "https://www.ohb.de", grp: "ohb-se" },
  { id: "ohb-sweden", n: "OHB Sweden", c: "moe", p: "SE", v: "Solna", t: "Filiale d'OHB SE", y: null,
    m: "Petits satellites ; maître d'œuvre de l'Arctic Weather Satellite et d'EPS-Sterna (contrat de 248 M€, mars 2026).", k: "Contrat EPS-Sterna : 248 M€ (2026)", kb: "A", pr: ["sterna"], u: "https://www.ohb-sweden.se", grp: "ohb-se" },
  { id: "creotech", n: "Creotech Instruments", c: "moe", p: "PL", v: "Piaseczno", t: "Société cotée", y: null,
    m: "Constructeur polonais de micro-satellites (plateforme HyperSat) ; maître d'œuvre de MikroGlob.", k: "Contrat MikroGlob : 550 M PLN (2024)", kb: "A", pr: ["mikroglob"], u: "https://creotech.pl" },
  { id: "deimos", n: "Deimos", c: "aval", p: "ES", v: "Tres Cantos (Madrid)", t: "Filiale d'Indra", y: null,
    m: "Ingénierie de mission, dynamique du vol, segment sol. Ancienne branche spatiale d'Elecnor, rachetée par Indra en 2024.", k: "", kb: "", pr: [], u: "https://en.wikipedia.org/wiki/Elecnor_Deimos", grp: "indra" },
  { id: "kda", n: "Kongsberg Defence & Aerospace", c: "equip", p: "NO", v: "Kongsberg", t: "Société du groupe Kongsberg", y: null,
    m: "Mécanismes d'attache et de séparation des propulseurs d'Ariane 6, capteurs de niveau des réservoirs, barrière optique de sécurité. À ne pas confondre avec KSAT.", k: "", kb: "", pr: ["ariane6"], u: "https://www.kongsberg.com", grp: "Kongsberg Gruppen" },
  { id: "nammo", n: "Nammo", c: "equip", p: "NO", v: "Raufoss", t: "Groupe industriel", y: 1998,
    m: "Allumeurs des moteurs à poudre et petits moteurs de séparation d'Ariane 6 ; moteurs d'apogée (Nammo UK).", k: "", kb: "", pr: ["ariane6"], u: "https://www.nammo.com" },
  { id: "europropulsion", n: "Europropulsion", c: "lanc", p: "FR", v: "France", t: "Coentreprise ArianeGroup / Avio", y: null,
    m: "Moteur à propergol solide P120C, commun aux propulseurs d'Ariane 6 et au premier étage de Vega-C.", k: "", kb: "", pr: ["ariane6", "vega"], u: "https://en.wikipedia.org/wiki/P120C" },
  { id: "hyimpulse", n: "HyImpulse", c: "lanc", p: "DE", v: "Neuenstadt am Kocher", t: "Start-up", y: 2018,
    m: "Lanceur à propulsion hybride ; soutenu par le programme Boost! de l'ESA.", k: "", kb: "", pr: ["boost"], u: "https://www.hyimpulse.de" },
  { id: "thrustme", n: "ThrustMe", c: "equip", p: "FR", v: "Verrières-le-Buisson", t: "Start-up", y: 2017,
    m: "Propulsion électrique à l'iode pour petits satellites.", k: "", kb: "", pr: [], u: "https://www.thrustme.fr" },
  { id: "enpulsion", n: "Enpulsion", c: "equip", p: "AT", v: "Wiener Neustadt", t: "Start-up", y: 2016,
    m: "Propulseurs électriques à émission de champ (FEEP) pour petits satellites.", k: "", kb: "", pr: [], u: "https://www.enpulsion.com" },
  { id: "gomspace", n: "GomSpace", c: "equip", p: "DK", v: "Aalborg", t: "Société cotée", y: 2007,
    m: "Nanosatellites et sous-systèmes pour CubeSats.", k: "", kb: "", pr: [], u: "https://gomspace.com" },
  { id: "bertin", n: "Bertin Technologies", c: "equip", p: "FR", v: "Montigny-le-Bretonneux", t: "Entreprise industrielle", y: 1956,
    m: "Instrumentation et systèmes, dont des activités optiques et électroniques pour le spatial.", k: "", kb: "", pr: [], u: "https://www.bertin-technologies.com" },
  { id: "lynred", n: "Lynred", c: "equip", p: "FR", v: "Veurey-Voroize", t: "Coentreprise Thales / Safran", y: 2019,
    m: "Détecteurs infrarouges, y compris pour le spatial. Née du rapprochement de Sofradir et ULIS.", k: "", kb: "", pr: [], u: "https://www.lynred.com" },
  { id: "3dplus", n: "3D PLUS", c: "equip", p: "FR", v: "Buc", t: "Filiale de HEICO", y: 1995,
    m: "Modules électroniques empilés et durcis pour l'espace.", k: "", kb: "", pr: [], u: "https://www.3d-plus.com", grp: "HEICO" },
  { id: "e2v", n: "Teledyne e2v", c: "equip", p: "GB", v: "Chelmsford", t: "Filiale de Teledyne", y: null,
    m: "Capteurs d'imagerie CCD et CMOS : détecteurs de Gaia, de l'imageur VIS d'Euclid et de PLATO.", k: "", kb: "", pr: ["gaia", "euclid", "plato"], u: "https://www.teledyne-e2v.com", grp: "Teledyne Technologies" },
  { id: "cilas", n: "Cilas", c: "equip", p: "FR", v: "Orléans", t: "Filiale de Safran et MBDA", y: 1966,
    m: "Optique et lasers : filtres, miroirs et revêtements pour le spatial.", k: "", kb: "", pr: [], u: "https://www.cilas.com", grp: "safran" },
  { id: "amos", n: "AMOS", c: "equip", p: "BE", v: "Liège", t: "Entreprise industrielle", y: null,
    m: "Optique et mécanique de précision : télescopes, miroirs et bancs optiques pour le spatial et l'astronomie.", k: "", kb: "", pr: [], u: "https://www.amos.be" },
  { id: "seso", n: "Thales SESO", c: "equip", p: "FR", v: "Aix-en-Provence", t: "Filiale de Thales", y: null,
    m: "Optique de grande précision pour le spatial : miroirs et sous-ensembles de télescopes.", k: "", kb: "", pr: [], u: "https://satsearch.co/suppliers/thales-seso", grp: "thales" },
  { id: "sds", n: "Safran Data Systems", c: "aval", p: "FR", v: "Les Ulis", t: "Filiale de Safran", y: null,
    m: "Stations sol, télémesure et systèmes de réception de données satellitaires.", k: "", kb: "", pr: [], u: "https://www.safran-group.com", grp: "safran" },
  { id: "stmicro", n: "STMicroelectronics", c: "equip", p: "FR", v: "Crolles (siège à Genève)", t: "Groupe franco-italien coté", y: 1987,
    m: "Composants électroniques, dont des gammes durcies pour le spatial et des composants pour les constellations.", k: "", kb: "", pr: [], u: "https://www.st.com" },

  /* NewSpace, opérateurs et services */
  { id: "oqtec", n: "OQ Technology", c: "nsdat", p: "LU", v: "Luxembourg", t: "Start-up", y: 2016,
    m: "Opérateur 5G IoT par satellite ; contrats ESA sur la connexion directe aux terminaux (2024).", k: "", kb: "", pr: ["ntn"], u: "https://www.oqtec.space" },
  { id: "sateliot", n: "Sateliot", c: "nsdat", p: "ES", v: "Barcelone", t: "Start-up", y: 2018,
    m: "Constellation 5G IoT conforme à la norme 3GPP NTN ; technologie validée par un programme de l'ESA (2022).", k: "", kb: "", pr: ["ntn"], u: "https://sateliot.space" },
  { id: "lacuna", n: "Lacuna Space", c: "nsdat", p: "GB", v: "Royaume-Uni", t: "Start-up", y: null,
    m: "IoT par satellite à très bas débit (protocole LoRa).", k: "", kb: "", pr: [], u: "" },
  { id: "neuraspace", n: "Neuraspace", c: "nsdat", p: "PT", v: "Coimbra", t: "Start-up", y: 2020,
    m: "Gestion du trafic spatial et évitement de collisions assistés par IA.", k: "", kb: "", pr: [], u: "https://www.neuraspace.com" },
  { id: "okapi", n: "OKAPI:Orbits", c: "nsdat", p: "DE", v: "Brunswick", t: "Start-up", y: 2018,
    m: "Logiciels de surveillance de l'espace et d'évitement de collisions pour les opérateurs.", k: "", kb: "", pr: [], u: "https://www.okapiorbits.com" },
  { id: "kayrros", n: "Kayrros", c: "nsdat", p: "FR", v: "Paris", t: "Start-up", y: 2016,
    m: "Analyse de données satellitaires pour l'énergie et le climat ; quantifie les fuites de méthane à partir des données Copernicus (Sentinel-5P).", k: "", kb: "", pr: ["s5p"], u: "https://www.kayrros.com" },
  { id: "liveeo", n: "LiveEO", c: "nsdat", p: "DE", v: "Berlin", t: "Start-up", y: 2018,
    m: "Surveillance d'infrastructures linéaires (réseaux électriques, voies ferrées) par imagerie satellitaire.", k: "", kb: "", pr: [], u: "https://www.live-eo.com" },
  { id: "hellas-libre", n: "Libre Space Foundation", c: "nsdat", p: "GR", v: "Athènes", t: "Fondation", y: null,
    m: "Matériel spatial libre et réseau de stations SatNOGS ; satellites PHASMA du programme grec.", k: "", kb: "", pr: ["grece"], u: "https://libre.space" },
  { id: "planetek-hellas", n: "Planetek Hellas", c: "aval", p: "GR", v: "Athènes", t: "Filiale de Planetek Italia", y: null,
    m: "Géoinformation et segment sol ; mission OptiSat du programme grec.", k: "", kb: "", pr: ["grece"], u: "https://www.planetek.it" },
  { id: "planet", n: "Planet Labs (filiale allemande)", c: "nsdat", p: "DE", v: "Berlin", t: "Filiale européenne d'un groupe américain", y: null,
    m: "Constellations PlanetScope et SkySat. Mission contributrice de Copernicus depuis un contrat ESA de janvier 2025 ; contrat pluriannuel avec l'Agence spatiale allemande (2024).", k: "", kb: "", pr: [], u: "https://investors.planet.com/news/news-details/2025/Planet-Signs-Deal-with-European-Space-Agency-ESA-Joining-the-Copernicus-Contributing-Missions/default.aspx" },
  { id: "spire", n: "Spire Global (implantations européennes)", c: "nsdat", p: "GB", v: "Glasgow ; Luxembourg", t: "Filiales européennes d'un groupe américain", y: null,
    m: "Nanosatellites de radio-occultation et de suivi des navires ; fournit des données météo à EUMETSAT (contrats renouvelés depuis 2021).", k: "", kb: "", pr: [], u: "https://ir.spire.com/news-events/press-releases/detail/267/eumetsat-awards-spire-global-3-million-contract-renewal" },
  { id: "astroscale-uk", n: "Astroscale UK", c: "nsorb", p: "GB", v: "Harwell", t: "Filiale britannique d'Astroscale (Japon)", y: null,
    m: "Mission ELSA-M de retrait de satellites en fin de vie, pour Eutelsat OneWeb, dans un partenariat avec l'ESA et l'UK Space Agency.", k: "", kb: "", pr: [], u: "https://www.astroscale.com/news/astroscale-uk-secures-contract-for-final-phase-of-elsa-m-in-orbit-demonstration" }
);

/* Programmes nouvellement documentés pour des acteurs existants */
(function () {
  const add = (id, ...prs) => { const a = ACTEURS.find(x => x.id === id); if (a) prs.forEach(p => { if (!a.pr.includes(p)) a.pr.push(p); }); };
  add("esa", "celeste", "scouts", "xmm", "cheops", "proba3", "spacerider", "flpp", "boost");
  add("cnes", "swot", "microcarb");
  add("dlr", "enmap");
  add("asi", "prisma", "spacerider");
  add("eumetsat", "sterna");
  add("uk-space-agency", "microcarb", "swot", "atlantic");
  add("airbus-ds", "forum", "microcarb", "msr", "cheops", "xmm", "csosuite");
  add("tas", "swot", "microcarb", "spacerider", "celeste", "scylight", "prisma", "harmony", "csosuite");
  add("ohb-italia", "luxeosys", "prisma");
  add("leonardo", "prisma");
  add("avio", "spacerider");
  add("arianegroup", "astris", "flpp");
  add("isar", "boost"); add("rfa", "boost"); add("orbex", "boost");
  add("sstl", "scouts");
  add("gmv", "celeste");
  add("sener", "proba3", "forum");
  add("aac-clyde-space", "sterna");
  add("open-cosmos", "phisat", "atlantic", "grece");
  add("ororatech", "grece");
  add("satlantis", "atlantic");
  add("iceye", "atlantic");
  add("clearspace", "clearspace");
})();

/* ---------- 6. Relations ----------
   de / vers : identifiant d'acteur ou de programme, ou nom libre pour une entité hors atlas.
   type : filiale, participation, coentreprise, consortium, partenariat, acquisition, fusion, projet de fusion, essaimage,
          maître d'œuvre, sous-traitant, fournisseur, opérateur, utilisateur, financeur, partenaire scientifique.
   bc : indice de confiance ; src : source. */
const RELATIONS = [
  /* Groupes, filiales, coentreprises */
  { de: "thales", vers: "tas", type: "coentreprise", part: "67 %", txt: "Thales détient 67 % de Thales Alenia Space, Leonardo 33 % (« Space Alliance »).", bc: "B", src: "https://www.thalesaleniaspace.com" },
  { de: "leonardo", vers: "tas", type: "coentreprise", part: "33 %", txt: "Leonardo détient 33 % de Thales Alenia Space.", bc: "B", src: "https://www.thalesaleniaspace.com" },
  { de: "leonardo", vers: "telespazio", type: "coentreprise", part: "67 %", txt: "Leonardo détient 67 % de Telespazio, Thales 33 %.", bc: "B", src: "https://www.telespazio.com" },
  { de: "thales", vers: "telespazio", type: "coentreprise", part: "33 %", txt: "Thales détient 33 % de Telespazio.", bc: "B", src: "https://www.telespazio.com" },
  { de: "telespazio", vers: "e-geos", type: "filiale", part: "80 %", txt: "e-GEOS est détenue par Telespazio (80 %) et l'ASI (20 %).", bc: "B", src: "https://www.e-geos.it" },
  { de: "airbus-ds", vers: "sstl", type: "filiale", txt: "SSTL appartient à Airbus Defence and Space.", bc: "B", src: "https://www.sstl.co.uk" },
  { de: "airbus-ds", vers: "jena-optronik", type: "filiale", txt: "Jena-Optronik est une filiale d'Airbus Defence and Space.", bc: "B", src: "https://www.jena-optronik.de" },
  { de: "airbus-ds", vers: "arianegroup", type: "coentreprise", part: "50 %", txt: "ArianeGroup est une coentreprise d'Airbus et de Safran à parts égales.", bc: "B", src: "https://ariane.group" },
  { de: "safran", vers: "arianegroup", type: "coentreprise", part: "50 %", txt: "Safran détient 50 % d'ArianeGroup.", bc: "B", src: "https://ariane.group" },
  { de: "arianegroup", vers: "arianespace", type: "filiale", txt: "Arianespace, l'opérateur de lancement, est une filiale d'ArianeGroup.", bc: "B", src: "https://www.arianespace.com" },
  { de: "arianegroup", vers: "maiaspace", type: "filiale", txt: "MaiaSpace est une filiale d'ArianeGroup créée en 2022.", bc: "B", src: "https://maia-space.com" },
  { de: "arianegroup", vers: "europropulsion", type: "coentreprise", part: "50 %", txt: "Europropulsion est détenue à parts égales par ArianeGroup et Avio.", bc: "B", src: "https://en.wikipedia.org/wiki/P120C" },
  { de: "avio", vers: "europropulsion", type: "coentreprise", part: "50 %", txt: "Avio détient 50 % d'Europropulsion.", bc: "B", src: "https://en.wikipedia.org/wiki/P120C" },
  { de: "ohb-se", vers: "ohb-system", type: "filiale", txt: "OHB System AG est la principale filiale de maîtrise d'œuvre du groupe OHB.", bc: "A", src: "https://defence-industry.eu/ohb-system-signs-contract-for-the-development-the-next-generation-of-sentinel-2-satellites/" },
  { de: "ohb-se", vers: "ohb-italia", type: "filiale", txt: "OHB Italia est la filiale italienne du groupe OHB.", bc: "B", src: "https://www.ohb-italia.it" },
  { de: "ohb-se", vers: "ohb-sweden", type: "filiale", txt: "OHB Sweden est une filiale d'OHB SE.", bc: "A", src: "https://www.placera.se/pressmeddelanden/ohb-ohb-wins-eur-248-million-contract-for-satellite-constellation-to-monitor-the-arctic-20260318" },
  { de: "safran", vers: "sds", type: "filiale", txt: "Safran Data Systems est une filiale de Safran (ex-Zodiac Data Systems).", bc: "B", src: "https://www.safran-group.com" },
  { de: "thales", vers: "lynred", type: "coentreprise", part: "50 %", txt: "Lynred est une coentreprise de Thales et Safran.", bc: "B", src: "https://www.lynred.com" },
  { de: "safran", vers: "lynred", type: "coentreprise", part: "50 %", txt: "Safran détient la moitié de Lynred.", bc: "B", src: "https://www.lynred.com" },
  { de: "safran", vers: "cilas", type: "acquisition", a: 2022, txt: "Safran et MBDA ont repris Cilas en 2022.", bc: "B", src: "https://www.cilas.com" },
  { de: "thales", vers: "seso", type: "filiale", txt: "Thales SESO est une filiale de Thales.", bc: "B", src: "https://satsearch.co/suppliers/thales-seso" },
  { de: "Kongsberg Gruppen", vers: "kda", type: "filiale", txt: "Kongsberg Defence & Aerospace appartient au groupe norvégien Kongsberg.", bc: "B", src: "https://www.kongsberg.com/news/news-archive/2025/35-years-of-partnership-powering-europes-access-to-space/" },
  { de: "Kongsberg Gruppen", vers: "ksat", type: "participation", txt: "KSAT est détenue par Kongsberg et Space Norway. Société distincte de Kongsberg Defence & Aerospace.", bc: "B", src: "https://www.ksat.no" },
  { de: "indra", vers: "deimos", type: "acquisition", a: 2024, txt: "Indra rachète Deimos, la branche spatiale d'Elecnor, pour relancer son activité spatiale.", bc: "B", src: "https://www.atalayar.com/en/articulo/economy-and-business/indra-resuscitates-its-space-subsidiary-and-expands-its-capabilities-with-deimos-space/20240816140512204176.html" },
  { de: "Teledyne Technologies", vers: "e2v", type: "acquisition", a: 2017, txt: "Teledyne a racheté e2v en 2017.", bc: "B", src: "https://www.teledyne-e2v.com" },
  { de: "HEICO", vers: "3dplus", type: "filiale", txt: "3D PLUS appartient au groupe américain HEICO.", bc: "B", src: "https://www.3d-plus.com" },
  { de: "RUAG", vers: "beyond-gravity", type: "fusion", a: 2022, txt: "La branche spatiale de RUAG est devenue Beyond Gravity en 2022.", bc: "B", src: "https://www.beyondgravity.com" },
  { de: "aac-clyde-space", vers: "Omnisys Instruments", type: "acquisition", txt: "AAC Clyde Space a racheté Omnisys, fournisseur des instruments micro-ondes d'EPS-Sterna.", bc: "B", src: "https://www.inderes.fi/releases/aac-clyde-space-welcomes-eumetsat-green-light-for-eps-sterna" },
  { de: "eutelsat-group", vers: "OneWeb", type: "fusion", a: 2023, txt: "Eutelsat et OneWeb ont fusionné en 2023.", bc: "B", src: "https://www.eutelsat.com" },
  { de: "ses", vers: "Intelsat", type: "acquisition", a: 2025, txt: "SES a finalisé le rachat d'Intelsat en 2025.", bc: "B", src: "https://www.ses.com" },
  { de: "rheinmetall", vers: "iceye", type: "coentreprise", txt: "Rheinmetall et ICEYE ont créé une coentreprise pour les satellites radar de défense (SPOCK).", bc: "B", src: "https://www.rheinmetall.com" },
  { de: "iceye", vers: "ICEYE Polska", type: "filiale", txt: "ICEYE Polska mène le consortium MikroSAR (POLSARIS) avec WZŁ-1.", bc: "A", src: "https://defence24.com/geopolitics/poland-enters-a-new-era-in-satellite-reconnaissance" },
  { de: "open-cosmos", vers: "Open Cosmos Aegean", type: "filiale", txt: "Filiale grecque d'Open Cosmos, qui construit 7 satellites du programme grec à Pallini.", bc: "A", src: "https://www.greeknewsagenda.gr/greece-gains-national-earth-observation-capabilities-for-the-first-time/" },
  { de: "epfl", vers: "clearspace", type: "essaimage", a: 2018, txt: "ClearSpace est issue de l'EPFL.", bc: "B", src: "https://www.epfl.ch" },
  { de: "airbus-ds", vers: "Projet Bromo", type: "projet de fusion", a: 2025, part: "35 %", txt: "Protocole d'octobre 2025 pour regrouper les activités spatiales d'Airbus (35 %), Thales (32,5 %) et Leonardo (32,5 %) dans une société basée à Toulouse. Pas encore notifié à Bruxelles en juin 2026 ; OHB et Indra s'y opposent.", bc: "A", src: "https://www.grosswald.org/europe-space-merger-project-bromo-airbus-leonardo-thales-ohb-opposition/" },
  { de: "thales", vers: "Projet Bromo", type: "projet de fusion", a: 2025, part: "32,5 %", txt: "Thales apporterait sa part de Thales Alenia Space et de Telespazio.", bc: "A", src: "https://www.grosswald.org/europe-space-merger-project-bromo-airbus-leonardo-thales-ohb-opposition/" },
  { de: "leonardo", vers: "Projet Bromo", type: "projet de fusion", a: 2025, part: "32,5 %", txt: "Leonardo apporterait ses activités spatiales.", bc: "A", src: "https://www.grosswald.org/europe-space-merger-project-bromo-airbus-leonardo-thales-ohb-opposition/" },
  { de: "eutelsat-group", vers: "iris2", type: "consortium", txt: "Membre du consortium SpaceRISE, concessionnaire d'IRIS², avec SES et Hispasat.", bc: "A", src: "https://www.airbus.com/en/newsroom/press-releases/2026-09-airbus-starts-the-development-of-iris2-satellites-on-behalf-of-eutelsat" },
  { de: "ses", vers: "iris2", type: "consortium", txt: "Membre du consortium SpaceRISE.", bc: "A", src: "https://www.airbus.com/en/newsroom/press-releases/2026-09-airbus-starts-the-development-of-iris2-satellites-on-behalf-of-eutelsat" },
  { de: "hispasat", vers: "iris2", type: "consortium", txt: "Membre du consortium SpaceRISE.", bc: "A", src: "https://www.airbus.com/en/newsroom/press-releases/2026-09-airbus-starts-the-development-of-iris2-satellites-on-behalf-of-eutelsat" },
  { de: "astroscale-uk", vers: "eutelsat-group", type: "partenariat", txt: "Mission ELSA-M : retrait d'un satellite OneWeb en fin de vie.", bc: "A", src: "https://www.astroscale.com/news/astroscale-uk-secures-contract-for-final-phase-of-elsa-m-in-orbit-demonstration" },
  { de: "spire", vers: "eumetsat", type: "fournisseur", txt: "Données de radio-occultation achetées par EUMETSAT (contrats renouvelés, 3 M€ en 2025).", bc: "A", src: "https://ir.spire.com/news-events/press-releases/detail/267/eumetsat-awards-spire-global-3-million-contract-renewal" },
  { de: "planet", vers: "esa", type: "fournisseur", a: 2025, txt: "Contrat pluriannuel : PlanetScope devient mission contributrice de Copernicus.", bc: "A", src: "https://investors.planet.com/news/news-details/2025/Planet-Signs-Deal-with-European-Space-Agency-ESA-Joining-the-Copernicus-Contributing-Missions/default.aspx" },

  /* Rôles par programme */
  { de: "airbus-ds", vers: "forum", type: "maître d'œuvre", txt: "Airbus DS Royaume-Uni, contrat de 160 M€ (2022).", bc: "A", src: "https://www.esa.int/Space_in_Member_States/Czechia/Kontrakt_na_navrh_a_vyrobu_druzice_FORUM_pro_ESA" },
  { de: "ohb-se", vers: "forum", type: "fournisseur", txt: "Instrument de FORUM.", bc: "A", src: "https://www.esa.int/Space_in_Member_States/Czechia/Kontrakt_na_navrh_a_vyrobu_druzice_FORUM_pro_ESA" },
  { de: "sener", vers: "forum", type: "fournisseur", txt: "Mécanismes de balayage.", bc: "B", src: "https://www.satnow.com/news/details/414-sener-aeroespacial-will-supply-scanner-mechanisms-for-the-forum-mission" },
  { de: "ohb-system", vers: "harmony", type: "maître d'œuvre", txt: "Contrat de plus de 280 M€ (oct. 2024).", bc: "A", src: "https://defence-industry.eu/ohb-signs-eur-280-million-contract-with-esa-for-two-earth-observation-satellites/" },
  { de: "tas", vers: "harmony", type: "sous-traitant", txt: "Charges utiles radar (Thales Alenia Space Italie).", bc: "A", src: "https://www.thalesgroup.com/en/news-centre/press-releases/thales-alenia-space-signs-contract-ohb-develop-two-radar-instruments" },
  { de: "ohb-sweden", vers: "sterna", type: "maître d'œuvre", txt: "Contrat de 248 M€ (mars 2026).", bc: "A", src: "https://www.placera.se/pressmeddelanden/ohb-ohb-wins-eur-248-million-contract-for-satellite-constellation-to-monitor-the-arctic-20260318" },
  { de: "aac-clyde-space", vers: "sterna", type: "fournisseur", txt: "Instruments micro-ondes via sa filiale Omnisys.", bc: "B", src: "https://www.inderes.fi/releases/aac-clyde-space-welcomes-eumetsat-green-light-for-eps-sterna" },
  { de: "eumetsat", vers: "sterna", type: "opérateur", txt: "Achète via l'ESA, lance, exploite et diffuse les données.", bc: "A", src: "https://www.placera.se/pressmeddelanden/ohb-ohb-wins-eur-248-million-contract-for-satellite-constellation-to-monitor-the-arctic-20260318" },
  { de: "gmv", vers: "celeste", type: "maître d'œuvre", txt: "Un des deux contrats parallèles, avec OHB.", bc: "A", src: "https://www.esa.int/Applications/Satellite_navigation/Celeste_s_first_satellites_launched_to_explore_LEO-based_satellite_navigation" },
  { de: "tas", vers: "celeste", type: "maître d'œuvre", txt: "Second contrat parallèle ; segment spatial chez Thales Alenia Space Italie.", bc: "A", src: "https://www.esa.int/Applications/Satellite_navigation/Celeste_s_first_satellites_launched_to_explore_LEO-based_satellite_navigation" },
  { de: "ohb-se", vers: "celeste", type: "sous-traitant", txt: "Partenaire principal de GMV.", bc: "A", src: "https://www.esa.int/Applications/Satellite_navigation/Celeste_s_first_satellites_launched_to_explore_LEO-based_satellite_navigation" },
  { de: "sstl", vers: "scouts", type: "maître d'œuvre", txt: "HydroGNSS : construit, exploite et diffuse les données.", bc: "A", src: "https://www.esa.int/Newsroom/Press_Releases/ESA_s_HydroGNSS_mission_launched_to_scout_for_water" },
  { de: "open-cosmos", vers: "phisat", type: "maître d'œuvre", txt: "Φsat-2, avec CGI, Ubotica, KP Labs et d'autres partenaires.", bc: "A", src: "https://en.wikipedia.org/wiki/Phi-Sat-2" },
  { de: "tas", vers: "swot", type: "maître d'œuvre", txt: "Plateforme du satellite pour le CNES (choix de 2015).", bc: "A", src: "https://www.satellitetoday.com/technology/2015/01/06/cnes-picks-thales-alenia-space-to-build-swot-satellite/" },
  { de: "cnes", vers: "swot", type: "financeur", txt: "340 M€ hors exploitation ; plateforme, altimètre de nadir, DORIS, segment de contrôle.", bc: "A", src: "https://www.jpl.nasa.gov/press-kits/swot/quick-facts/" },
  { de: "uk-space-agency", vers: "swot", type: "financeur", txt: "12,22 M£.", bc: "A", src: "https://www.jpl.nasa.gov/press-kits/swot/quick-facts/" },
  { de: "tas", vers: "microcarb", type: "maître d'œuvre", txt: "Thales Alenia Space Royaume-Uni a livré le satellite au CNES (janv. 2024).", bc: "A", src: "https://cnes.fr/en/projects/microcarb" },
  { de: "airbus-ds", vers: "microcarb", type: "fournisseur", txt: "Instrument livré au CNES en décembre 2022.", bc: "A", src: "https://cnes.fr/en/projects/microcarb" },
  { de: "uk-space-agency", vers: "microcarb", type: "partenaire", txt: "Partenaire de la mission.", bc: "A", src: "https://cnes.fr/en/projects/microcarb" },
  { de: "cnrs", vers: "microcarb", type: "partenaire scientifique", txt: "Partenaire scientifique.", bc: "A", src: "https://cnes.fr/en/projects/microcarb" },
  { de: "cea", vers: "microcarb", type: "partenaire scientifique", txt: "Partenaire scientifique.", bc: "A", src: "https://cnes.fr/en/projects/microcarb" },
  { de: "ohb-system", vers: "enmap", type: "maître d'œuvre", txt: "Satellite et instrument hyperspectral.", bc: "A", src: "https://www.dlr.de/en/latest/news/2022/02/20220401_german-satellite-enmap-launches-successfully" },
  { de: "ohb-italia", vers: "prisma", type: "maître d'œuvre", txt: "PRISMA SG : exécution de la mission et intégration.", bc: "A", src: "https://satnews.com/2026/07/29/thales-alenia-space-secures-platform-development-contract-for-italys-prisma-second-generation-hyperspectral-mission/" },
  { de: "tas", vers: "prisma", type: "sous-traitant", txt: "PRISMA SG : satellite et plateforme PRIMA-S, sous contrat d'OHB Italia.", bc: "A", src: "https://satnews.com/2026/07/29/thales-alenia-space-secures-platform-development-contract-for-italys-prisma-second-generation-hyperspectral-mission/" },
  { de: "leonardo", vers: "prisma", type: "fournisseur", txt: "Charge utile hyperspectrale.", bc: "A", src: "https://satnews.com/2026/07/29/thales-alenia-space-secures-platform-development-contract-for-italys-prisma-second-generation-hyperspectral-mission/" },
  { de: "open-cosmos", vers: "atlantic", type: "maître d'œuvre", txt: "Huit satellites espagnols (oct. 2025) et satellite pionnier britannique.", bc: "B", src: "https://en.wikipedia.org/wiki/Atlantic_Constellation" },
  { de: "satlantis", vers: "atlantic", type: "fournisseur", txt: "Précurseurs Garai A et B.", bc: "B", src: "https://en.wikipedia.org/wiki/Atlantic_Constellation" },
  { de: "iceye", vers: "atlantic", type: "fournisseur", txt: "Satellites radar portugais.", bc: "B", src: "https://en.wikipedia.org/wiki/Atlantic_Constellation" },
  { de: "ororatech", vers: "grece", type: "fournisseur", txt: "Hellenic Fire System (4 satellites) et plateforme de détection d'incendies.", bc: "A", src: "https://ororatech.com/resources/news-blog/greece-launches-world-s-first-national-wildfire-satellite-system" },
  { de: "open-cosmos", vers: "grece", type: "maître d'œuvre", txt: "Via Open Cosmos Aegean : 7 satellites optiques, dont Hyperion GR-1.", bc: "A", src: "https://www.greeknewsagenda.gr/greece-gains-national-earth-observation-capabilities-for-the-first-time/" },
  { de: "hsc", vers: "grece", type: "partenaire", txt: "Appui à la mise en œuvre.", bc: "A", src: "https://www.greeknewsagenda.gr/greece-gains-national-earth-observation-capabilities-for-the-first-time/" },
  { de: "hellas-libre", vers: "grece", type: "maître d'œuvre", txt: "CubeSats PHASMA (LAMARR et DIRAC).", bc: "A", src: "https://resilience.esa.int/?p=26260" },
  { de: "planetek-hellas", vers: "grece", type: "maître d'œuvre", txt: "Mission OptiSat.", bc: "A", src: "https://resilience.esa.int/?p=26260" },
  { de: "creotech", vers: "mikroglob", type: "maître d'œuvre", txt: "Contrat de 550 M PLN (déc. 2024).", bc: "A", src: "https://spidersweb.pl/2026/10/mikroglob-w-komplecie-na-orbicie.html" },
  { de: "ohb-italia", vers: "luxeosys", type: "maître d'œuvre", txt: "Satellite et segment sol décentralisé.", bc: "A", src: "https://gouvernement.lu/fr/actualites/toutes_actualites/communiques/2025/08-aout/27-luxembourg-space.html" },
  { de: "airbus-ds", vers: "msr", type: "maître d'œuvre", txt: "Earth Return Orbiter, 491 M€ (2020) ; sortie du contrat en discussion (2026).", bc: "A", src: "https://europeanspaceflight.com/esa-member-states-call-for-cancellation-of-earth-return-orbiter/" },
  { de: "tas", vers: "spacerider", type: "maître d'œuvre", txt: "Co-maître d'œuvre : module de rentrée.", bc: "B", src: "https://en.wikipedia.org/wiki/Space_Rider" },
  { de: "avio", vers: "spacerider", type: "maître d'œuvre", txt: "Co-maître d'œuvre : module de service.", bc: "B", src: "https://en.wikipedia.org/wiki/Space_Rider" },
  { de: "arianegroup", vers: "astris", type: "maître d'œuvre", txt: "Filiale allemande d'ArianeGroup, contrat de 90 M€ (2021).", bc: "A", src: "https://europeanspaceflight.com/?p=5740" },
  { de: "hyimpulse", vers: "boost", type: "bénéficiaire", txt: "Extension de contrat Boost! (2024).", bc: "A", src: "https://www.esa.int/Enabling_Support/Space_Transportation/Boost/Committed_to_boosting_European_launch_services" },
  { de: "isar", vers: "boost", type: "bénéficiaire", txt: "Extension de contrat Boost! (2024).", bc: "A", src: "https://www.esa.int/Enabling_Support/Space_Transportation/Boost/Committed_to_boosting_European_launch_services" },
  { de: "rfa", vers: "boost", type: "bénéficiaire", txt: "Extension de contrat Boost! (2024).", bc: "A", src: "https://www.esa.int/Enabling_Support/Space_Transportation/Boost/Committed_to_boosting_European_launch_services" },
  { de: "orbex", vers: "boost", type: "bénéficiaire", txt: "Premier contrat en 2020, extension en 2024.", bc: "A", src: "https://www.esa.int/Enabling_Support/Space_Transportation/Boost/Committed_to_boosting_European_launch_services" },
  { de: "sener", vers: "proba3", type: "maître d'œuvre", txt: "Maître d'œuvre de la mission.", bc: "B", src: "https://www.group.sener/en/noticias/proba-3-carries-out-its-first-autonomous-formation-flying-operations-in-orbit/" },
  { de: "csl", vers: "proba3", type: "fournisseur", txt: "Coronographe ASPIICS (consortium mené par le CSL).", bc: "B", src: "https://arxiv.org/pdf/2511.01679" },
  { de: "csl", vers: "solo", type: "fournisseur", txt: "Imageur ultraviolet extrême EUI.", bc: "B", src: "https://www.csl.uliege.be" },
  { de: "airbus-ds", vers: "cheops", type: "maître d'œuvre", txt: "Airbus DS Espagne.", bc: "B", src: "https://cheops.unibe.ch" },
  { de: "unibe", vers: "cheops", type: "partenaire scientifique", txt: "Dirige la mission avec l'Université de Genève.", bc: "A", src: "https://ggba.swiss/en/esa-extends-the-cheops-space-telescope-mission-until-2029/" },
  { de: "unibe", vers: "juice", type: "partenaire scientifique", txt: "Spectromètre de neutres NIM (ensemble PEP).", bc: "B", src: "https://www.unibe.ch" },
  { de: "unibe", vers: "exomars", type: "partenaire scientifique", txt: "Caméra CaSSIS de l'orbiteur TGO.", bc: "B", src: "https://www.unibe.ch" },
  { de: "irf", vers: "juice", type: "partenaire scientifique", txt: "Direction de l'ensemble d'instruments plasma PEP.", bc: "B", src: "https://www.irf.se" },
  { de: "bira", vers: "exomars", type: "partenaire scientifique", txt: "Spectromètre NOMAD de l'orbiteur TGO.", bc: "B", src: "https://www.aeronomie.be" },
  { de: "ias", vers: "exomars", type: "partenaire scientifique", txt: "Microscope hyperspectral MicrOmega du rover.", bc: "B", src: "https://www.ias.universite-paris-saclay.fr" },
  { de: "latmos", vers: "bepi", type: "partenaire scientifique", txt: "Spectromètre ultraviolet PHEBUS.", bc: "B", src: "https://www.latmos.ipsl.fr" },
  { de: "lam", vers: "euclid", type: "partenaire scientifique", txt: "Instrument infrarouge NISP.", bc: "B", src: "https://www.lam.fr" },
  { de: "mssl", vers: "euclid", type: "partenaire scientifique", txt: "Imageur visible VIS.", bc: "B", src: "https://www.ucl.ac.uk/mssl" },
  { de: "mssl", vers: "smile", type: "partenaire scientifique", txt: "Co-direction scientifique de la mission.", bc: "B", src: "https://www.ucl.ac.uk/mssl" },
  { de: "lesia", vers: "solo", type: "partenaire scientifique", txt: "Instrument d'ondes radio et plasma RPW.", bc: "B", src: "https://lesia.obspm.fr" },
  { de: "mpg", vers: "solo", type: "partenaire scientifique", txt: "MPS : magnétographe PHI.", bc: "B", src: "https://www.mps.mpg.de" },
  { de: "mpg", vers: "lisa", type: "partenaire scientifique", txt: "AEI (Hanovre), pilier scientifique de LISA.", bc: "B", src: "https://www.aei.mpg.de" },
  { de: "apc", vers: "lisa", type: "partenaire scientifique", txt: "Contribution française (centre de données).", bc: "B", src: "https://apc.u-paris.fr" },
  { de: "ethz", vers: "lisa", type: "partenaire scientifique", txt: "Contribution suisse.", bc: "B", src: "https://ethz.ch" },
  { de: "obspm", vers: "gaia", type: "partenaire scientifique", txt: "Traitement des données (consortium DPAC).", bc: "B", src: "https://www.observatoiredeparis.psl.eu" },
  { de: "inaf", vers: "ariel", type: "partenaire scientifique", txt: "Télescope (contribution italienne).", bc: "B", src: "https://www.inaf.it" },
  { de: "ieec", vers: "scouts", type: "partenaire scientifique", txt: "Participation à HydroGNSS.", bc: "B", src: "https://www.ieec.cat/en/?p=41717" },
  { de: "sron", vers: "s5p", type: "partenaire scientifique", txt: "Partenaire de TROPOMI.", bc: "B", src: "https://www.sron.nl" },
  { de: "tno", vers: "s5p", type: "partenaire scientifique", txt: "Conception de TROPOMI avec Airbus Pays-Bas.", bc: "B", src: "https://www.tno.nl" },
  { de: "knmi", vers: "s5p", type: "partenaire scientifique", txt: "Responsable scientifique de TROPOMI.", bc: "B", src: "https://www.knmi.nl" },
  { de: "nso", vers: "s5p", type: "financeur", txt: "Financement néerlandais de TROPOMI.", bc: "B", src: "https://www.spaceoffice.nl" },
  { de: "dtu", vers: "swarm", type: "fournisseur", txt: "Magnétomètres vectoriels et caméras stellaires.", bc: "B", src: "https://www.space.dtu.dk" },
  { de: "kayrros", vers: "s5p", type: "utilisateur", txt: "Quantification des fuites de méthane à partir des données Copernicus.", bc: "A", src: "https://www.businesswire.com/news/home/20200330005801/en" },
  { de: "kda", vers: "ariane6", type: "fournisseur", txt: "Mécanismes d'attache et de séparation des propulseurs, capteurs de niveau, barrière optique.", bc: "A", src: "https://www.esa.int/Enabling_Support/Space_Transportation/Ariane/Ariane_6_made_in_Norway" },
  { de: "nammo", vers: "ariane6", type: "fournisseur", txt: "Allumeurs des propulseurs, moteurs de séparation, composants de sécurité.", bc: "A", src: "https://www.esa.int/Enabling_Support/Space_Transportation/Ariane/Ariane_6_made_in_Norway" },
  { de: "europropulsion", vers: "ariane6", type: "fournisseur", txt: "Moteurs P120C des propulseurs.", bc: "B", src: "https://en.wikipedia.org/wiki/P120C" },
  { de: "europropulsion", vers: "vega", type: "fournisseur", txt: "Moteur P120C du premier étage de Vega-C.", bc: "B", src: "https://en.wikipedia.org/wiki/P120C" },
  { de: "e2v", vers: "gaia", type: "fournisseur", txt: "Détecteurs CCD du plan focal.", bc: "B", src: "https://www.teledyne-e2v.com" },
  { de: "e2v", vers: "euclid", type: "fournisseur", txt: "Détecteurs CCD de l'imageur VIS.", bc: "B", src: "https://www.teledyne-e2v.com" },
  { de: "e2v", vers: "plato", type: "fournisseur", txt: "Détecteurs CCD des caméras.", bc: "B", src: "https://www.teledyne-e2v.com" },
  { de: "oqtec", vers: "ntn", type: "bénéficiaire", txt: "Contrat ESA d'étude sur la connexion directe (2024).", bc: "A", src: "https://www.gsma.com/get-involved/gsma-membership/gsma_resources/oq-technology-signs-contract-with-esa-for-direct-to-cell-feasibility-study/" },
  { de: "sateliot", vers: "ntn", type: "bénéficiaire", txt: "Technologie 5G IoT validée par un programme de l'ESA (2022).", bc: "A", src: "https://sateliot.space/2022/10/19/european-space-agency-programme-affirms-sateliots-technology-to-connect-5g-iot-standard-devices-from-a-satellite/" },
  { de: "tas", vers: "scylight", type: "maître d'œuvre", txt: "Démonstrateur de réseau optique multi-orbites HydRON.", bc: "A", src: "https://www.thalesgroup.com/en/news-centre/press-releases/thales-alenia-space-and-esa-sign-contract-hydron-demonstrate-first-multi" },
  { de: "airbus-ds", vers: "csosuite", type: "sous-traitant", txt: "Études confiées par la DGA ; segment sol selon la presse (non confirmé).", bc: "C", src: "https://www.opex360.com/2026/09/30/le-ministere-des-armees-serait-sur-le-point-de-commander-les-deux-nouveaux-satellites-dobservation-du-programme-iris/" },
  { de: "tas", vers: "csosuite", type: "sous-traitant", txt: "Études confiées par la DGA ; instruments selon la presse (non confirmé).", bc: "C", src: "https://www.opex360.com/2026/09/30/le-ministere-des-armees-serait-sur-le-point-de-commander-les-deux-nouveaux-satellites-dobservation-du-programme-iris/" },
  { de: "ukspacecommand", vers: "skynet", type: "opérateur", txt: "Pilote les capacités spatiales militaires britanniques.", bc: "B", src: "https://www.gov.uk/government/organisations/uk-space-command" },
  { de: "ptspace", vers: "atlantic", type: "maître d'ouvrage", txt: "Partie portugaise de la constellation.", bc: "B", src: "https://ptspace.pt/portugal-reinforces-its-presence-in-space-with-the-launch-of-new-satellites/" },
  { de: "epfl", vers: "clearspace", type: "partenaire scientifique", txt: "ClearSpace est issue de l'EPFL.", bc: "B", src: "https://www.epfl.ch" }
];
/* Toute relation acteur → programme alimente aussi la liste des programmes de l'acteur */
RELATIONS.forEach(r => {
  const a = ACTEURS.find(x => x.id === r.de);
  if (a && PROGRAMMES.some(p => p.id === r.vers) && !a.pr.includes(r.vers)) a.pr.push(r.vers);
});

/* ---------- 7. Contrats : identifiants d'acteurs, stade, nouveaux contrats ----------
   act : identifiant(s) de l'acteur ; eng : annonce | signe | verse (seulement si documenté) */
(function () {
  const map = {
    "Airbus DS": "airbus-ds", "Thales Alenia Space": "tas", "Airbus DS + Thales Alenia Space": ["airbus-ds", "tas"],
    "The Exploration Company": "the-exploration-company", "ICEYE (avec Rheinmetall)": ["iceye", "rheinmetall"], "ICEYE": "iceye",
    "Isar Aerospace": "isar", "Rocket Factory Augsburg": "rfa", "MaiaSpace": "maiaspace", "PLD Space": "pld", "Orbex": "orbex",
    "OHB Italia": "ohb-italia", "SWISSto12": "swissto12"
  };
  CONTRATS.forEach(c => {
    if (c.ent === "OHB") c.act = (c.prog === "hera" || c.prog === "hh") ? "ohb-system" : "ohb-se";
    else if (map[c.ent]) c.act = map[c.ent];
    if (c.lib.indexOf("European Launcher Challenge") === 0) c.eng = "annonce";
  });
  LEVEES.forEach(l => {
    const a = ACTEURS.find(x => x.n === l.ent || x.n.split(" (")[0] === l.ent || x.id === slugActeur(l.ent));
    if (a) l.act = a.id;
    if (l.ent === "OHB") l.act = "ohb-se";
    if (l.ent === "Eutelsat") l.act = "eutelsat-group";
    if (l.ent === "ICEYE") { l.fam = "obs"; l.note = (l.note ? l.note + ". " : "") + "Rangé en observation comme la fiche ICEYE ; acteur dual (défense : SPOCK, POLSARIS)"; }
  });
  CONTRATS.forEach(c => { if (c.prog === "vigil") c.fam = "met"; });
})();
CONTRATS.push(
  { a: 2020, lib: "ClearSpace-1, retrait de débris", ent: "ClearSpace", act: "clearspace", grp: "autre", fin: "ESA", fam: "def", m: 86, bc: "A", prog: "clearspace", eng: "signe" },
  { a: 2020, lib: "Earth Return Orbiter (Mars Sample Return)", ent: "Airbus DS", act: "airbus-ds", grp: "airbus", fin: "ESA", fam: "exp", m: 491, bc: "A", prog: "msr", eng: "signe", note: "Arrêt demandé par les États membres en mars 2026" },
  { a: 2021, lib: "ASTRIS, étage additionnel d'Ariane 6", ent: "ArianeGroup", act: "arianegroup", grp: "lanc", fin: "ESA", fam: "lan", m: 90, bc: "A", prog: "astris", eng: "signe" },
  { a: 2022, lib: "FORUM, satellite", ent: "Airbus DS", act: "airbus-ds", grp: "airbus", fin: "ESA", fam: "obs", m: 160, bc: "A", prog: "forum", eng: "signe" },
  { a: 2024, lib: "Sentinel-2NG, phase A/B (un des deux contrats parallèles)", ent: "OHB", act: "ohb-system", grp: "ohb", fin: "UE / ESA", fam: "obs", m: 6, bc: "A", prog: "sng", eng: "signe" },
  { a: 2024, lib: "Harmony, deux satellites", ent: "OHB", act: "ohb-system", grp: "ohb", fin: "ESA", fam: "obs", m: 280, bc: "A", prog: "harmony", eng: "signe", note: "« Plus de 280 M€ »" },
  { a: 2024, lib: "Boost!, quatre extensions de contrats", ent: "HyImpulse, Isar, Orbex, RFA", act: ["hyimpulse", "isar", "orbex", "rfa"], grp: "autre", fin: "ESA", fam: "lan", m: 44.22, bc: "A", prog: "boost", eng: "signe", note: "Montant total des quatre extensions" },
  { a: 2024, lib: "MikroGlob, constellation optique", ent: "Creotech Instruments", act: "creotech", grp: "autre", fin: "Défense nationale", fam: "def", m: 128, bc: "C", prog: "mikroglob", eng: "signe", note: "550 M PLN, converti à environ 4,3 PLN par euro" },
  { a: 2026, lib: "EPS-Sterna, satellites", ent: "OHB Sweden", act: "ohb-sweden", grp: "ohb", fin: "EUMETSAT (via l'ESA)", fam: "met", m: 248, bc: "A", prog: "sterna", eng: "signe" }
);

/* ---------- 8. Liens sources des nouvelles fiches et compléments ---------- */
const L = (t, l, u) => [t, l, u];
Object.assign(LIENS, {
  egep: [L("Agence", "ESA – Le programme EGEP", "https://www.esa.int/Applications/Satellite_navigation/GNSS_Evolution/About_the_European_GNSS_Evolution_Programme")],
  celeste: [L("Agence", "ESA – Lancement des premiers satellites Celeste (mars 2026)", "https://www.esa.int/Applications/Satellite_navigation/Celeste_s_first_satellites_launched_to_explore_LEO-based_satellite_navigation"),
    L("Référence", "Inside GNSS – Date de lancement de Celeste", "https://insidegnss.com/esas-celeste-target-launch-date-confirmed/")],
  scouts: [L("Agence", "ESA – Lancement de HydroGNSS, premier Scout", "https://www.esa.int/Newsroom/Press_Releases/ESA_s_HydroGNSS_mission_launched_to_scout_for_water"),
    L("Industriel", "SSTL – HydroGNSS-1 et -2 lancés", "https://sstl.co.uk/media-hub/latest-news/2025/hydrognss-1-2-successfully-launched-–-sstl-celebrates-first-signals,-safe-deployment-and-two-healt")],
  phisat: [L("Agence", "ESA – Φsat-2 démontre l'IA pour l'observation de la Terre", "https://esa.int/Applications/Observing_the_Earth/Phsat-2/New_satellite_demonstrates_the_power_of_AI_for_Earth_observation"),
    L("Référence", "Wikipédia – Φsat-2", "https://en.wikipedia.org/wiki/Phi-Sat-2")],
  swot: [L("Agence", "NASA JPL – SWOT en chiffres", "https://www.jpl.nasa.gov/press-kits/swot/quick-facts/"),
    L("Industriel", "Via Satellite – Le CNES choisit Thales Alenia Space (2015)", "https://www.satellitetoday.com/technology/2015/01/06/cnes-picks-thales-alenia-space-to-build-swot-satellite/")],
  microcarb: [L("Agence", "CNES – MicroCarb", "https://cnes.fr/en/projects/microcarb"),
    L("Industriel", "Thales Alenia Space – Lancement de MicroCarb", "https://www.thalesaleniaspace.com/en/press-releases/microcarb-europes-first-mission-monitor-and-map-atmospheric-carbon-dioxide")],
  enmap: [L("Agence", "DLR – Lancement d'EnMAP (avril 2022)", "https://www.dlr.de/en/latest/news/2022/02/20220401_german-satellite-enmap-launches-successfully"),
    L("Agence", "DLR – Mission EnMAP", "https://www.dlr.de/en/ar/topics-missions/earth-climate/land-areas/enmap")],
  prisma: [L("Référence", "SatNews – PRISMA SG : contrat de plateforme (juil. 2026)", "https://satnews.com/2026/07/29/thales-alenia-space-secures-platform-development-contract-for-italys-prisma-second-generation-hyperspectral-mission/"),
    L("Industriel", "Thales Alenia Space – PRISMA SG", "https://thalesaleniaspace.com/en/press-releases/thales-alenia-space-develop-satellite-and-provide-platform-prisma-second-0")],
  atlantic: [L("Référence", "Wikipédia – Constellation Atlantique", "https://en.wikipedia.org/wiki/Atlantic_Constellation"),
    L("Agence", "Portugal Space – Lancement de nouveaux satellites", "https://ptspace.pt/portugal-reinforces-its-presence-in-space-with-the-launch-of-new-satellites/")],
  grece: [L("Référence", "Greek News Agenda – Première capacité d'observation nationale", "https://www.greeknewsagenda.gr/greece-gains-national-earth-observation-capabilities-for-the-first-time/"),
    L("Agence", "ESA – Programme grec de connectivité", "https://resilience.esa.int/?p=26260"),
    L("Industriel", "OroraTech – Hellenic Fire System", "https://ororatech.com/resources/news-blog/greece-launches-world-s-first-national-wildfire-satellite-system")],
  mikroglob: [L("Référence", "Spider's Web – MikroGlob complet en orbite (oct. 2026)", "https://spidersweb.pl/2026/10/mikroglob-w-komplecie-na-orbicie.html"),
    L("Référence", "Defence24 – MikroGlob et MikroSAR", "https://defence24.com/geopolitics/poland-enters-a-new-era-in-satellite-reconnaissance")],
  luxeosys: [L("Agence", "Gouvernement du Luxembourg – Lancement de LUXEOSys", "https://gouvernement.lu/fr/actualites/toutes_actualites/communiques/2025/08-aout/27-luxembourg-space.html"),
    L("Référence", "Gunter's Space Page – NAOS (LUXEOSys)", "https://space.skyrocket.de/doc_sdat/luxeosys.htm")],
  sterna: [L("Industriel", "OHB – Contrat EPS-Sterna de 248 M€ (mars 2026)", "https://www.placera.se/pressmeddelanden/ohb-ohb-wins-eur-248-million-contract-for-satellite-constellation-to-monitor-the-arctic-20260318"),
    L("Référence", "Wikipédia – EPS-Sterna", "https://en.wikipedia.org/wiki/EPS-Sterna")],
  scylight: [L("Agence", "ESA – Le programme ScyLight", "https://www.esa.int/Applications/Connectivity_and_Secure_Communications/One_beam_many_possibilities_the_ScyLight_programme_patch"),
    L("Industriel", "Thales Alenia Space – Contrat HydRON", "https://www.thalesgroup.com/en/news-centre/press-releases/thales-alenia-space-and-esa-sign-contract-hydron-demonstrate-first-multi")],
  ntn: [L("Agence", "ESA – Connectivité directe (D2D)", "https://resilience.esa.int/artes-4-0-programme-overview/space-for-5g-6g-sustainable-connectivity/direct-to-device-d2d"),
    L("Agence", "ESA – Livre blanc D2D (2025)", "https://connectivity.esa.int/sites/default/files/2025-09/ESA_D2D_White%20Paper.pdf")],
  xmm: [L("Agence", "ESA – Prolongation des missions scientifiques (mars 2023)", "https://sci.esa.int/web/director-desk/-/extended-life-for-esa-s-science-missions"),
    L("Référence", "Wikipédia – XMM-Newton", "https://en.wikipedia.org/wiki/XMM-Newton")],
  cheops: [L("Référence", "GGBa – CHEOPS prolongé jusqu'en 2029", "https://ggba.swiss/en/esa-extends-the-cheops-space-telescope-mission-until-2029/"),
    L("Référence", "Université de Genève – Prolongation de CHEOPS (2026)", "https://www.unige.ch/medias/en/2026/la-mission-spatiale-cheops-est-prolongee")],
  proba3: [L("Agence", "ESA – Proba-3 en orbite (déc. 2024)", "https://www.esa.int/Enabling_Support/Space_Engineering_Technology/Proba-3/Eclipse-making_double_satellite_Proba-3_enters_orbit"),
    L("Industriel", "Sener – Premiers vols en formation autonomes", "https://www.group.sener/en/noticias/proba-3-carries-out-its-first-autonomous-formation-flying-operations-in-orbit/"),
    L("Référence", "arXiv – Premiers résultats d'ASPIICS", "https://arxiv.org/pdf/2511.01679")],
  msr: [L("Référence", "European Spaceflight – Les États membres demandent l'arrêt de l'ERO (mars 2026)", "https://europeanspaceflight.com/esa-member-states-call-for-cancellation-of-earth-return-orbiter/")],
  spacerider: [L("Référence", "Wikipédia – Space Rider", "https://en.wikipedia.org/wiki/Space_Rider"),
    L("Agence", "ASI – Space Rider", "https://www.asi.it/en/space-transportation/space-rider")],
  flpp: [L("Agence", "ESA – FLPP prépare les futurs lanceurs", "https://www.esa.int/Our_Activities/Launchers/New_Technologies/FLPP_preparing_for_Europe_s_next-generation_launcher"),
    L("Agence", "ESA – Prometheus", "https://www.esa.int/Enabling_Support/Space_Transportation/Future_space_transportation/Prometheus")],
  astris: [L("Agence", "ESA – ASTRIS pour Ariane 6", "https://www.esa.int/Enabling_Support/Space_Transportation/Ariane/Ariane_6_targets_new_missions_with_Astris_kick_stage"),
    L("Référence", "European Spaceflight – 100 M€ pour ASTRIS au CM25", "https://europeanspaceflight.com/?p=5740")],
  boost: [L("Agence", "ESA – Boost!", "https://www.esa.int/Enabling_Support/Space_Transportation/Boost/Committed_to_boosting_European_launch_services")]
});
const addLien = (id, l) => { LIENS[id] = (LIENS[id] || []).concat([l]); };
addLien("forum", L("Agence", "ESA – Contrat FORUM à Airbus (juin 2022)", "https://www.esa.int/Space_in_Member_States/Czechia/Kontrakt_na_navrh_a_vyrobu_druzice_FORUM_pro_ESA"));
addLien("harmony", L("Industriel", "OHB – Contrat Harmony de 280 M€ (oct. 2024)", "https://defence-industry.eu/ohb-signs-eur-280-million-contract-with-esa-for-two-earth-observation-satellites/"));
addLien("harmony", L("Industriel", "Thales Alenia Space – Radars de Harmony", "https://www.thalesgroup.com/en/news-centre/press-releases/thales-alenia-space-signs-contract-ohb-develop-two-radar-instruments"));
addLien("wivern", L("Agence", "ESA – WIVERN, 11e Earth Explorer (sept. 2025)", "https://www.esa.int/Applications/Observing_the_Earth/FutureEO/ESA_selects_WIVERN_as_11th_Earth_Explorer_mission"));
addLien("csosuite", L("Référence", "Opex360 – Commande IRIS attendue (sept. 2026)", "https://www.opex360.com/2026/09/30/le-ministere-des-armees-serait-sur-le-point-de-commander-les-deux-nouveaux-satellites-dobservation-du-programme-iris/"));
addLien("jason", L("Agence", "NOAA OSPO – Jason-3, incident et récupération (sept. 2026)", "https://ospo.noaa.gov/data/messages/2026/09/MSG_20260902_1528.html"));
addLien("clearspace", L("Référence", "Wikipédia – ClearSpace-1", "https://en.wikipedia.org/wiki/ClearSpace-1"));
addLien("polsaris", L("Référence", "Defence24 – Contrat MikroSAR", "https://defence24.com/geopolitics/poland-enters-a-new-era-in-satellite-reconnaissance"));
addLien("sng", L("Industriel", "OHB – Phase A/B de Sentinel-2NG (janv. 2024)", "https://defence-industry.eu/ohb-system-signs-contract-for-the-development-the-next-generation-of-sentinel-2-satellites/"));

/* ---------- 9. Budgets, sources, glossaire ---------- */
BUDGETS.forEach(b => {
  if (b.nom.startsWith("Conférence ministérielle") && !/Périmètre/.test(b.txt)) {
    b.txt += " Périmètre : total des souscriptions des 23 États membres à Brême (nov. 2025), tous programmes confondus ; l'ESA demandait 22,25 Md€, d'où le chiffre de 22,3 Md€ parfois cité.";
    b.src = "cm25dlr";
  }
});
Object.assign(SOURCES, {
  cm25dlr: ["DLR – Conseil ministériel 2025 : 22,1 Md€ souscrits", "https://www.dlr.de/en/latest/news/2025/germany-invests-5-4-billion-euros-in-the-future-of-european-space/the-leading-members-of-the-german-delegation-at-the-esa-council-meeting-at-ministerial-level-2025"],
  cm25esf: ["European Spaceflight – Bilan du CM25 par programme", "https://europeanspaceflight.com/?p=5630"],
  bromo: ["Großwald – Projet Bromo : état en juin 2026", "https://www.grosswald.org/europe-space-merger-project-bromo-airbus-leonardo-thales-ohb-opposition/"],
  norway: ["ESA – Ariane 6 « made in Norway »", "https://www.esa.int/Enabling_Support/Space_Transportation/Ariane/Ariane_6_made_in_Norway"]
});
GLOSSAIRE.push(
  ["LEO-PNT", "Positionnement, navigation et datation depuis l'orbite basse : une couche de satellites plus proches, aux signaux plus forts, en complément de Galileo."],
  ["D2D (direct-to-device)", "Connexion directe d'un téléphone ou d'un objet standard à un satellite, sans antenne dédiée."],
  ["NTN", "Non-Terrestrial Networks : volet des normes mobiles 3GPP (5G, puis 6G) qui intègre les satellites aux réseaux."],
  ["Scout", "Petite mission d'observation de l'ESA (FutureEO), environ 35 M€ et trois ans de développement."],
  ["Hyperspectral", "Imagerie en centaines de bandes spectrales étroites, qui permet d'identifier matériaux, minéraux ou état de la végétation."],
  ["Étage additionnel (kick stage)", "Petit étage placé au-dessus du lanceur pour déposer les charges sur plusieurs orbites."],
  ["Filiale / coentreprise", "Filiale : société contrôlée par un groupe. Coentreprise : société détenue par plusieurs groupes (ex. Thales Alenia Space, ArianeGroup)."],
  ["Contrat annoncé, signé, versé", "Trois stades d'un engagement public : une réservation ou intention annoncée, un contrat signé, puis des sommes effectivement payées. L'atlas indique le stade quand il est publié."],
  ["Membre de l'ESA ≠ membre de l'UE", "Le Royaume-Uni, la Suisse et la Norvège sont membres de l'ESA sans être dans l'UE. L'ESA n'est pas une agence de l'UE."]
);
