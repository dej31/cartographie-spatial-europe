/* ============================================================
   Atlas du spatial européen — phase 3 (21 octobre 2026)
   Prospection des programmes en développement, nouveaux programmes et acteurs,
   photos et dimensions. Règle inchangée : aucune donnée inventée ;
   ce qui n'est pas publié est « non documenté ».
   pros : opportunités ou étapes d'achat documentées, utiles à la prospection.
   ============================================================ */

/* ---------- 1. Nouveaux programmes ---------- */
PROGRAMMES.push(
  { id: "revalto", n: "REVALTO (ex-H2R)", d: "ona", sub: "Constellation d'altimètres miniaturisés pour l'hydrologie",
    fin: "France 2030 (État), opéré par le CNES pour le ministère de la Transition écologique", moa: "CNES (appel d'offres H2R) ; titulaire : BWI",
    moe: "BWI (pilote de la mission et des données) ; Hemeria (plateforme, intégration, opérations) ; Anywaves (altimètre radar)", g: ["autre"], plat: "Plateforme Hemeria",
    instr: "Altimètres radar miniaturisés",
    app: "Mesurer le niveau des eaux continentales toutes les 48 h sur 10 000 points du globe, pour anticiper crues et sécheresses.",
    bud: "Non documenté", bc: "C",
    y0: 2025, y1: 2032, jal: [[2025, "BWI remporte l'appel d'offres du CNES (26 juin)"], [2025, "Lancement du projet REVALTO à Toulouse (17 sept.)"]],
    st: "dev", pred: [], succ: [],
    note: "Deux premiers satellites de démonstration, puis une constellation. Nombre de satellites et dates de lancement non publiés.",
    pros: "Constellation à construire après les deux démonstrateurs : chaîne industrielle toulousaine (Hemeria, Anywaves), segment sol et traitement des données à préciser." },

  { id: "elsam", n: "ELSA-M", d: "sec", sub: "Retrait commercial d'un satellite en fin de vie",
    fin: "Astroscale (majoritairement) ; UK Space Agency via ARTES de l'ESA (partenariat Sunrise avec Eutelsat OneWeb)", moa: "Astroscale UK ; client : Eutelsat OneWeb",
    moe: "Astroscale UK (Harwell)", g: ["autre"], plat: "Véhicule de service de 520 kg",
    instr: "Système de capture et de rendez-vous",
    app: "Capturer puis désorbiter un satellite OneWeb hors service vers 1 200 km d'altitude.",
    bud: "Phase finale : 13,95 M€ (ESA et UK Space Agency, via Eutelsat OneWeb, 2024)", bc: "A",
    y0: 2024, y1: 2028, jal: [[2024, "Financement de la phase finale (juil.)"], [2026, "Isar Aerospace choisi comme lanceur (16 mars)"]],
    st: "dev", pred: [], succ: [],
    note: "Suite des démonstrateurs ELSA-d et ADRAS-J. En mars 2026, Astroscale ne publiait pas de date de lancement (2026 était visé en 2024).",
    pros: "Premier service commercial de retrait en Europe ; modèle à suivre pour les opérateurs de constellations." },

  { id: "sateliotc", n: "Constellation Sateliot", d: "tcm", sub: "5G IoT par satellite, norme 3GPP NTN",
    fin: "Capitaux privés ; technologie validée par un programme de l'ESA (2022)", moa: "Sateliot",
    moe: "Alén Space (Nigrán, Espagne)", g: ["autre"], plat: "Nanosatellites Alén Space",
    instr: "Charge utile 5G NB-IoT",
    app: "Connecter des objets IoT standard directement au satellite, sans terminal dédié.",
    bud: "Non documenté (engagements commerciaux déclarés : ≈ 270 M€)", bc: "B",
    y0: 2024, y1: 2030, jal: [[2024, "4 satellites commerciaux lancés (août)"], [2025, "Commande de 5 satellites à Alén Space (juil.)"], [2026, "Lancement des 5 suivants prévu"]],
    st: "op", pred: [], succ: [],
    note: "Plus de 100 satellites visés à terme, selon Sateliot.",
    pros: "Extension prévue au-delà de 100 satellites : fabrication en série, lancements groupés." },

  { id: "envision", n: "EnVision", d: "esc", sub: "Mission européenne vers Vénus (classe M)",
    fin: "ESA – programme scientifique, avec la NASA", moa: "ESA",
    moe: "Thales Alenia Space (contrat du 28 janv. 2025)", g: ["tas"], plat: "—",
    instr: "Radar VenSAR (NASA), sondeur SRS (ASI), spectromètres VenSpec-M (DLR), VenSpec-H (BELSPO), VenSpec-U (CNES), radioscience",
    app: "Étudier Vénus du noyau à l'atmosphère, et comprendre pourquoi elle a divergé de la Terre.",
    bud: "Contrat industriel ≈ 367 M€ (2025)", bc: "B",
    y0: 2025, y1: 2040, jal: [[2025, "Contrat à Thales Alenia Space (28 janv.)"]],
    st: "dev", pred: [], succ: [],
    note: "Lancement prévu dans les années 2030.",
    pros: "Sous-traitance de la sonde en cours de constitution par Thales Alenia Space ; instruments achetés par les agences nationales." },

  { id: "truths", n: "TRUTHS", d: "sci", sub: "Étalon spatial du rayonnement solaire et terrestre",
    fin: "ESA, pour plusieurs États membres ; Royaume-Uni pilote", moa: "ESA",
    moe: "Airbus DS Royaume-Uni ; détecteurs de l'imageur hyperspectral : Teledyne e2v", g: ["airbus"], plat: "—",
    instr: "Radiomètre solaire absolu cryogénique, spectromètre imageur hyperspectral, système d'étalonnage embarqué",
    app: "Mesurer le rayonnement avec une précision de référence, pour étalonner les autres satellites et le suivi du climat.",
    bud: "Contrat de la phase suivante : 109,3 M€ (2023)", bc: "B",
    y0: 2023, y1: 2035, jal: [[2023, "Contrat Airbus signé à la COP28 (déc.)"], [2030, "Lancement visé"]],
    st: "dev", pred: [], succ: [] },

  { id: "aeolus2", n: "Aeolus-2", d: "met", sub: "Lidar spatial de mesure des vents",
    fin: "ESA et EUMETSAT", moa: "ESA, avec EUMETSAT",
    moe: "Airbus DS (contrat initial de conception et construction, juil. 2026)", g: ["airbus"], plat: "—",
    instr: "Lidar Doppler ultraviolet et détecteur d'aérosols",
    app: "Mesurer les profils de vent pour améliorer la prévision météo, à la suite du démonstrateur Aeolus.",
    bud: "Non documenté", bc: "C",
    y0: 2026, y1: 2040, jal: [[2026, "Autorisation de démarrer donnée à Airbus (juil.)"]],
    st: "dev", pred: ["aeolus"], succ: [],
    note: "Orbite de 450 km, durée de vie de 5,5 ans, données livrées en moins de 120 minutes.",
    pros: "Contrat initial seulement : la suite du développement et la sous-traitance du lidar sont à venir." },

  { id: "nggm", n: "NGGM (Next Generation Gravity Mission)", d: "sci", sub: "Gravimétrie par interférométrie laser",
    fin: "ESA", moa: "ESA",
    moe: "Non publié dans les sources consultées ; électronique de l'instrument (modèle d'ingénierie) : SpaceTech GmbH, avec Guizzo Space et Airbus DS", g: [], plat: "—",
    instr: "Mesure laser de la distance entre satellites",
    app: "Suivre les variations du champ de gravité (eau, glaces, océans). Volet européen de la constellation MAGIC avec GRACE-C.",
    bud: "Non documenté", bc: "C",
    y0: 2026, y1: 2040, jal: [[2026, "Modèle d'ingénierie de l'électronique de l'instrument validé (juin)"], [2032, "Lancement visé"]],
    st: "dev", pred: [], succ: [],
    pros: "Phases B2/C en préparation à l'ESA (2026) : maîtrise d'œuvre et sous-traitance à suivre." },

  { id: "rise", n: "RISE", d: "sec", sub: "Prolongation de vie de satellites géostationnaires",
    fin: "ESA – programme Space Safety ; cofinancement D-Orbit", moa: "ESA",
    moe: "D-Orbit (véhicule GEA)", g: ["autre"], plat: "GEA (D-Orbit)",
    instr: "Système d'amarrage",
    app: "S'amarrer à un satellite géostationnaire, le manœuvrer et le relâcher, puis vendre ce service aux opérateurs.",
    bud: "Contrat ESA : 119,6 M€ (oct. 2024), hors cofinancement D-Orbit", bc: "A",
    y0: 2024, y1: 2032, jal: [[2024, "Contrat (14 oct.)"], [2028, "Lancement visé"]],
    st: "dev", pred: [], succ: [] },

  { id: "plasma", n: "Plasma Observatory (M7)", d: "esc", sub: "Sept sondes pour étudier la magnétosphère",
    fin: "ESA – programme scientifique", moa: "ESA",
    moe: "Non attribué (mission recommandée en juin 2026)", g: [], plat: "Sept sondes identiques en deux tétraèdres imbriqués",
    instr: "Mesures de particules et de champs",
    app: "Comprendre comment les particules sont accélérées et comment l'énergie circule dans la magnétosphère.",
    bud: "Non documenté", bc: "C",
    y0: 2026, y1: 2040, jal: [[2026, "Recommandée comme mission M7 (11 juin)"], [2026, "Décision finale attendue (nov.)"]],
    st: "plan", pred: [], succ: [],
    note: "Lancement visé au milieu des années 2030. Laboratoires impliqués : Observatoire de Paris (LIRA), LPP, INAF.",
    pros: "Mission non encore adoptée : les appels d'offres industriels viendront après la décision de novembre 2026." },

  { id: "ersres", n: "ERS (European Resilience from Space) et EOGS", d: "dob", sub: "Programme spatial de l'ESA pour la sécurité et la défense",
    fin: "ESA (programme optionnel décidé au CM25) ; études EOGS financées par la Commission européenne", moa: "ESA, pour l'UE et les États membres",
    moe: "Études d'architecture du service gouvernemental d'observation de l'UE (EOGS) : ICEYE et Leonardo (sept. 2026)", g: ["autre"], plat: "—",
    instr: "Volets observation (750 M€), navigation (250 M€) et connectivité (en appui d'IRIS²)",
    app: "Mettre les capacités spatiales européennes au service de la sécurité et préparer EOGS, le futur service gouvernemental d'observation de l'UE.",
    bud: "≈ 1 Md€ (750 M€ observation, 250 M€ navigation)", bc: "B",
    y0: 2025, y1: 2032, jal: [[2025, "Programme lancé au CM25 (nov.)"], [2026, "Deux études EOGS en parallèle : ICEYE et Leonardo (sept.)"]],
    st: "dev", pred: [], succ: [],
    pros: "Architecture EOGS en cours de définition : segments spatial, sol, traitement et diffusion seront achetés ensuite." },

  { id: "callisto", n: "Callisto", d: "lnc", sub: "Démonstrateur d'étage réutilisable franco-germano-japonais",
    fin: "CNES, DLR, JAXA", moa: "CNES, DLR, JAXA",
    moe: "Développé par les trois agences", g: [], plat: "Démonstrateur de 14 m",
    instr: "—",
    app: "Démontrer le décollage et l'atterrissage verticaux d'un étage réutilisable, pour les futurs lanceurs européens et japonais.",
    bud: "Non documenté", bc: "C",
    y0: 2025, y1: 2028, jal: [[2027, "Premier vol d'essai prévu à Kourou"]],
    st: "dev", pred: [], succ: [],
    note: "Le premier vol, attendu en 2026, a glissé à 2027 (appel du CNES de sept. 2025). Environ 14 m de haut, 1,1 m de diamètre, 3,5 t au décollage." },

  { id: "satcombw4", n: "SATCOMBw étape 4", d: "dtl", sub: "Constellation militaire allemande en orbite basse",
    fin: "Bundeswehr (plan spatial de 35 Md€ d'ici 2030)", moa: "BAAINBw",
    moe: "Non attribué ; coentreprise OHB Rheinmetall Space Networks (juin 2026) candidate", g: [], plat: "—",
    instr: "Télécommunications sécurisées",
    app: "Relier en temps réel chars, drones et soldats par une constellation de plus de 100 satellites en orbite basse.",
    bud: "Non documenté (part du plan de 35 Md€)", bc: "C",
    y0: 2026, y1: 2035, jal: [[2026, "Annonce du plan de 35 Md€ (févr.) ; coentreprise OHB-Rheinmetall (11 juin)"], [2027, "Attribution attendue au tournant 2026-2027"], [2029, "Capacité initiale visée (jusqu'à 40 satellites)"], [2030, "Pleine capacité visée"]],
    st: "plan", pred: ["satcombw"], succ: [],
    note: "En mars 2026, Airbus a annoncé vouloir s'associer à OHB et Rheinmetall (Bloomberg) ; l'annonce de la coentreprise en juin ne le mentionne pas.",
    pros: "Gros appel d'offres attendu fin 2026 - début 2027 : fabrication en série, charges utiles, segment sol. Autres constellations allemandes annoncées (alerte, reconnaissance) : premières attributions de constellations de renseignement attendues dès avril 2026." },

  { id: "istari", n: "ISTARI (Tyche, Juno, Oberon)", d: "dob", sub: "Constellation britannique de renseignement",
    fin: "Ministère britannique de la Défense", moa: "UK Space Command",
    moe: "Tyche et Juno : SSTL ; Oberon : Airbus DS Royaume-Uni (127 M£)", g: ["airbus"], plat: "Petits satellites",
    instr: "Optique (Tyche, Juno) ; radar SAR (Oberon, 2 satellites d'environ 400 kg)",
    app: "Déployer d'ici 2031 une constellation croissante de satellites d'observation militaire.",
    bud: "Oberon : 127 M£ (2025)", bc: "A",
    y0: 2024, y1: 2031, jal: [[2024, "Tyche lancé (Falcon 9, vol groupé)"], [2025, "Contrat Oberon à Airbus (févr.)"], [2027, "Lancements de Juno et Oberon prévus"]],
    st: "dev", pred: [], succ: [],
    pros: "Constellation appelée à grandir jusqu'en 2031 : nouvelles commandes de satellites à prévoir." },

  { id: "paz2", n: "PAZ 2", d: "dob", sub: "Deux satellites radar espagnols",
    fin: "Espagne (Défense)", moa: "Hisdesat",
    moe: "Airbus DS Espagne (Getafe), à la tête d'un consortium de plus de 15 entreprises espagnoles", g: ["airbus"], plat: "Airbus",
    instr: "Radar SAR bande X, résolution meilleure que 25 cm",
    app: "Imagerie radar de jour comme de nuit pour la défense espagnole, avec une offre commerciale.",
    bud: "Non documenté", bc: "C",
    y0: 2025, y1: 2045, jal: [[2025, "Contrat (juil.)"], [2026, "Accord de commercialisation des images avec Airbus (janv.)"], [2031, "Premier satellite en service visé (mi-2031)"]],
    st: "dev", pred: ["paz"], succ: [],
    note: "Environ 65 % du contenu des satellites doit venir de l'industrie espagnole." },

  { id: "sicral3", n: "SICRAL 3", d: "dtl", sub: "Télécommunications militaires italiennes, 2 satellites géostationnaires",
    fin: "Ministère italien de la Défense", moa: "Teledife (Secrétariat général de la Défense)",
    moe: "Thales Alenia Space (système, segment spatial, charges UHF, SHF et Ka) ; Telespazio (segment sol, mise à poste)", g: ["tas"], plat: "—",
    instr: "Charges utiles UHF, SHF et Ka",
    app: "Succéder à SICRAL 2 pour les communications sécurisées des forces italiennes.",
    bud: "Phases B et C : ≈ 159 M€ (2021)", bc: "A",
    y0: 2021, y1: 2040, jal: [[2021, "Contrat des phases B et C (juin)"]],
    st: "dev", pred: ["sicral"], succ: [] },

  { id: "trishna", n: "TRISHNA", d: "ona", sub: "Imagerie infrarouge thermique franco-indienne",
    fin: "CNES et ISRO", moa: "CNES et ISRO",
    moe: "Instrument infrarouge thermique : Airbus (pour le CNES), cryoréfrigérateurs Thales ; capteur optique : ISRO", g: ["airbus"], plat: "—",
    instr: "Imageur infrarouge thermique (résolution de 57 à 90 m) et capteur optique",
    app: "Mesurer la température de surface pour suivre l'eau des cultures, les villes et les côtes, tous les 3 jours.",
    bud: "Non documenté", bc: "C",
    y0: 2020, y1: 2032, jal: [[2020, "Début du développement de l'instrument (4 juin)"], [2027, "Lancement prévu"]],
    st: "dev", pred: [], succ: [] },

  { id: "svom", n: "SVOM", d: "esc", sub: "Chasse aux sursauts gamma, mission franco-chinoise",
    fin: "CNES et CNSA", moa: "CNES et CNSA",
    moe: "Satellite chinois ; instruments français ECLAIRs et MXT (CNES, avec le CEA et le CNRS)", g: [], plat: "—",
    instr: "ECLAIRs (caméra X et gamma grand champ), MXT (télescope X) et deux instruments chinois",
    app: "Détecter et localiser les sursauts gamma, les explosions les plus violentes de l'Univers.",
    bud: "Non documenté", bc: "C",
    y0: 2024, y1: 2029, jal: [[2024, "Lancement (22 juin, Longue Marche 2C)"]],
    st: "op", pred: [], succ: [],
    note: "950 kg, orbite d'environ 625 km ; durée prévue de 3 ans, plus 2 ans possibles." },

  { id: "altius", n: "ALTIUS", d: "sci", sub: "Profils d'ozone par visée au limbe",
    fin: "ESA, financement principal belge, avec le Canada, le Luxembourg et la Roumanie", moa: "ESA",
    moe: "Redwire Space (ex-QinetiQ Space, Belgique)", g: ["autre"], plat: "Redwire Space",
    instr: "Spectromètre imageur au limbe",
    app: "Mesurer les profils verticaux d'ozone et d'autres gaz de l'atmosphère.",
    bud: "Non documenté", bc: "C",
    y0: 2025, y1: 2032, jal: [[2025, "Plateforme assemblée en Belgique (juil.)"], [2027, "Lancement prévu (Vega-C)"]],
    st: "dev", pred: [], succ: [],
    note: "266 kg au lancement, orbite héliosynchrone de 668 km. Mission proposée par l'Institut royal d'aéronomie spatiale de Belgique. Le lancement commun avec FLEX était prévu à l'origine ; FLEX est parti avec Sentinel-3C en septembre 2026 : co-passager d'ALTIUS à vérifier." }
);

/* ---------- 2. Corrections et compléments ---------- */
(function () {
  const P = id => PROGRAMMES.find(p => p.id === id);
  Object.assign(P("iris2"), {
    moe: "Airbus DS : 66 premiers satellites en orbite basse (couche souveraine) ; Thales Alenia Space : charges utiles gouvernementales des 330 satellites en orbite basse (≈ 500 M€) ; Aerospacelab : 264 plateformes ; SES : couche de 18 satellites en orbite moyenne ; Hispasat : segment sol ; Eutelsat : chef de file de l'orbite basse dans SpaceRISE",
    g: ["airbus", "tas", "autre"],
    note: "Septembre 2026 : 348 satellites dans la constellation principale, liaisons optiques entre satellites, services à partir de 2029 ; contrat industriel global attendu au-delà de 3 Md€. Ne pas confondre avec IRIS, le successeur militaire français de CSO.",
    pros: "Contrat industriel global de plus de 3 Md€ en cours de répartition : sous-traitance des plateformes (Airbus, Aerospacelab), des charges utiles (Thales Alenia Space) et du segment sol (Hispasat)."
  });
  P("iris2").jal.push([2026, "Choix des industriels (sept.)"]);
  Object.assign(P("cargo"), {
    moe: "Phase 1 : The Exploration Company et Thales Alenia Space ; phase 2 (ALADDIN) : The Exploration Company, capsule Nyx",
    bud: "Phase 1 : 25 M€ par entreprise (2024) ; phase 2 ALADDIN : 760 M€ à The Exploration Company, dont 310 M€ pour la démonstration et 450 M€ optionnels (2026)", bc: "A",
    note: "Logique « à la NASA » : l'agence achète un service au lieu de posséder le véhicule. The Exploration Company finance 40 % de la démonstration, l'ESA 60 %."
  });
  P("cargo").jal.push([2026, "Contrat ALADDIN à The Exploration Company (sept.)"]);
  Object.assign(P("ares"), {
    moe: "Plusieurs industriels selon les briques ; TOUTATIS : U-Space avec MBDA (choisis par l'Agence de l'innovation de défense, 2024)",
    pros: "Programme découpé en démonstrateurs successifs (YODA, TOUTATIS, EGIDE) : appels de l'AID et de la DGA réguliers."
  });
  const csos = P("csosuite"); csos.pros = "Commande d'environ 1 Md€ annoncée comme imminente fin 2026 ; le ministère envisagerait aussi de petits satellites pour la revisite.";
  const sng = P("sng"); sng.pros = "Sentinel-2NG et 3NG : maîtres d'œuvre de réalisation non attribués.";
  const wiv = P("wivern"); wiv.pros = "Mission sélectionnée en 2025 sans maître d'œuvre publié : appel d'offres de réalisation à suivre.";
  const sterna = P("sterna"); sterna.pros = "Lancements à acheter par EUMETSAT ; une trentaine d'entreprises dans l'équipe d'OHB Sweden.";
  const cel = P("celeste"); cel.pros = "9 satellites de démonstration encore à lancer à partir de 2027.";
  const na = P("newathena"); if (na) na.pros = "Adoption prévue en 2027 : maître d'œuvre à désigner ensuite.";
  const swg = P("swing"); swg.pros = "Petite mission avec un réseau d'équipementiers européens : modèle des futures missions de météo de l'espace.";
})();

/* Orbites, parc, unités */
Object.assign(ORBITES, {
  revalto: "Non documentée", elsam: "Orbite basse (cible vers 1 200 km)", sateliotc: "Orbite basse",
  envision: "Orbite autour de Vénus", truths: "Polaire (orbite basse)", aeolus2: "Orbite basse, 450 km",
  rise: "Géostationnaire", plasma: "Orbites terrestres très elliptiques (non précisé)", trishna: "Héliosynchrone, 761 km",
  svom: "Orbite basse, ≈ 625 km", altius: "Héliosynchrone, 668 km", paz2: "Orbite basse", sicral3: "Géostationnaire",
  satcombw4: "Orbite basse", istari: "Orbite basse"
});
PROGRAMMES.forEach(p => { if (ORBITES[p.id] && !p.orb) p.orb = ORBITES[p.id]; });
Object.assign(PARC, {
  revalto: { orb: 0, srv: 0, prv: 2, m: null, bc: "B" },
  elsam: { orb: 0, srv: 0, prv: 1, m: 520, bc: "A" },
  sateliotc: { orb: 4, srv: 4, prv: 5, m: null, bc: "A" },
  envision: { orb: 0, srv: 0, prv: 1, m: null, bc: "A" },
  truths: { orb: 0, srv: 0, prv: 1, m: null, bc: "A" },
  aeolus2: { orb: 0, srv: 0, prv: 1, m: null, bc: "A" },
  rise: { orb: 0, srv: 0, prv: 1, m: null, bc: "A" },
  plasma: { orb: 0, srv: 0, prv: 7, m: null, bc: "A" },
  satcombw4: { orb: 0, srv: 0, prv: 40, m: null, bc: "C" },
  istari: { orb: 1, srv: 1, prv: 3, m: null, bc: "A" },
  paz2: { orb: 0, srv: 0, prv: 2, m: null, bc: "A" },
  sicral3: { orb: 0, srv: 0, prv: 2, m: null, bc: "A" },
  trishna: { orb: 0, srv: 0, prv: 1, m: null, bc: "A" },
  svom: { orb: 1, srv: 1, prv: 0, m: 950, bc: "A" },
  altius: { orb: 0, srv: 0, prv: 1, m: 266, bc: "A" }
});
Object.assign(UNITES, {
  sateliotc: [
    ["4 satellites commerciaux", "août 2024", "Falcon 9", "op", "Construits avec Alén Space"],
    ["5 satellites suivants", "2026 (prévu)", "Non documenté", "dev", "Alén Space, Nigrán"]],
  istari: [
    ["Tyche", "2024", "Falcon 9 (vol groupé)", "op", "SSTL ; optique, 150 kg"],
    ["Juno", "2027 (prévu)", "Non documenté", "dev", "SSTL ; optique"],
    ["Oberon 1 et 2", "2027 (prévu)", "Non documenté", "dev", "Airbus DS Royaume-Uni ; radar, ≈ 400 kg chacun"]],
  paz2: [["PAZ 2 A et B", "Non documenté", "Non documenté", "dev", "Premier satellite en service visé mi-2031"]],
  sicral3: [["SICRAL 3A et 3B", "Non documenté", "Non documenté", "dev", "Thales Alenia Space ; mise à poste par Telespazio"]],
  svom: [["SVOM", "22 juin 2024", "Longue Marche 2C", "op", "950 kg ; ECLAIRs et MXT"]],
  elsam: [["ELSA-M", "Non documenté", "Isar Aerospace", "dev", "520 kg ; capture d'un satellite OneWeb"]],
  altius: [["ALTIUS", "2027 (prévu)", "Vega-C (Kourou)", "dev", "266 kg ; Redwire Space"]],
  revalto: [["2 satellites de démonstration", "Non documenté", "Non documenté", "dev", "Données de démonstration fournies par BWI"]]
});

/* Lignées et convergences */
LIGNEES.push(
  { type: "mission", titre: "Lidar de vent", note: "Le démonstrateur scientifique devient une mission opérationnelle avec EUMETSAT.",
    etapes: [["Aeolus", 2018, "aeolus"], ["Aeolus-2", 2032, "aeolus2"]], branches: [] }
);
LIGNEES.forEach(l => { if (l.titre === "Radar bande X germano-espagnol") l.etapes.push(["PAZ 2", 2031, "paz2"]); });
CONVERGENCES.push(
  { type: "Complémentarité", a: "callisto", b: "themis", titre: "Deux démonstrateurs de réutilisation", txt: "Callisto (CNES, DLR, JAXA) et Themis (ESA, ArianeGroup) préparent chacun le retour d'un premier étage pour les futurs lanceurs." },
  { type: "Public-privé", a: "elsam", b: "eutelsat", titre: "Retrait de débris acheté par un opérateur", txt: "Eutelsat OneWeb sert de client et de cible à ELSA-M, avec un soutien de l'ESA et de l'UK Space Agency." },
  { type: "Public-privé", a: "revalto", b: "copsvc", titre: "Un service de données acheté plutôt qu'un satellite", txt: "Avec REVALTO, l'État (France 2030) achète un service hydrologique à une jeune entreprise, qui construit la constellation avec ses partenaires." }
);

/* ---------- 3. Acteurs ---------- */
(function () {
  const A = id => ACTEURS.find(a => a.id === id);
  const q = A("qinetiq-space");
  if (q) Object.assign(q, { n: "Redwire Space (ex-QinetiQ Space)", t: "Filiale de Redwire (États-Unis) depuis 2022", m: "Plateformes de petits satellites, mécanismes et instruments ; maître d'œuvre d'ALTIUS. Rachetée à QinetiQ par Redwire en 2022 pour 32 M€.", grp: "Redwire" });
  const u = A("u-space");
  if (u) Object.assign(u, { y: 2018, m: u.m + " Retenue par l'Agence de l'innovation de défense avec MBDA pour la démonstration TOUTATIS (2 satellites) ; usine de Montaudran ; levée de 24 M€ (nov. 2025).", u: "https://www.u-space.fr/en/u-space-defense-innovation-defense/" });
  const tec = A("the-exploration-company"); if (tec) tec.k = "Contrat ESA ALADDIN : 760 M€ (sept. 2026)", tec.kb = "A";
})();
ACTEURS.push(
  { id: "onera", n: "ONERA", c: "lab", p: "FR", v: "Palaiseau", t: "Établissement public de recherche", y: 1946,
    m: "Centre français de recherche aérospatiale : propulsion, optique, radar ; a développé le radar GRAVES de surveillance de l'espace.", k: "", kb: "", pr: [], u: "https://www.onera.fr" },
  { id: "bwi", n: "BWI (Blue Water Intelligence)", c: "nsdat", p: "FR", v: "Toulouse", t: "Start-up", y: 2022,
    m: "Services d'hydrologie par intelligence artificielle ; titulaire de l'appel d'offres du CNES pour REVALTO (2025).", k: "", kb: "", pr: ["revalto"], u: "https://bwi.earth/fr/h2r-revalto-hydrologie-spatiale/" },
  { id: "anywaves", n: "Anywaves", c: "equip", p: "FR", v: "Toulouse", t: "PME", y: null,
    m: "Antennes et charges utiles radiofréquence ; conçoit l'altimètre radar miniaturisé de REVALTO. Fusion avec le luxembourgeois EmTroniX annoncée en 2026.", k: "", kb: "", pr: ["revalto"], u: "https://anywaves.com/news/anywaves-joins-bwi-and-hemeria-on-the-revalto-mission/" },
  { id: "satlantis-france", n: "Satlantis France", c: "nsdat", p: "FR", v: "Bidart", t: "Filiale de Satlantis (Espagne)", y: 2024,
    m: "Filiale française inaugurée le 10 octobre 2024 : traitement et valorisation des images satellitaires.", k: "", kb: "", pr: [], u: "https://www.satlantis.com/inauguration-of-satlantis-france/", grp: "satlantis" },
  { id: "astroscale-france", n: "Astroscale France", c: "nsorb", p: "FR", v: "Toulouse", t: "Filiale d'Astroscale (Japon)", y: 2023,
    m: "Centre technique de services en orbite à Toulouse (assemblage, intégration et essais) ; étude financée par le CNES sur le retrait de débris français.", k: "", kb: "", pr: [], u: "https://www.astroscale.com/news/astroscale-france-selects-toulouse-as-on-orbit-servicing-technical-hub", grp: "Astroscale Holdings" },
  { id: "alen-space", n: "Alén Space", c: "nsdat", p: "ES", v: "Nigrán", t: "PME", y: null,
    m: "Constructeur espagnol de nanosatellites ; fabrique les satellites de Sateliot.", k: "", kb: "", pr: ["sateliotc"], u: "https://sateliot.space/2025/07/03/sateliot-advances-its-constellation-with-5-new-satellites-manufactured-by-alen-space-2/" },
  { id: "syntony", n: "Syntony", c: "equip", p: "FR", v: "Toulouse", t: "PME, en cours de rachat par Safran", y: 2015,
    m: "Récepteurs et simulateurs GNSS, dont des récepteurs pour constellations en orbite basse ; instrument Aquila de Swing. Accord de rachat par Safran Electronics & Defense signé le 13 février 2026.", k: "", kb: "", pr: ["swing"], u: "https://www.gpsworld.com/safran-acquires-syntony-to-strengthen-position-in-resilient-pnt-market/" },
  { id: "steel", n: "Steel Electronique", c: "equip", p: "FR", v: "France", t: "PME", y: null,
    m: "Électronique ; réalise avec le CNES le moniteur de radiations DREAM de Swing.", k: "", kb: "", pr: ["swing"], u: "https://www.esa.int/Space_Safety/Space_weather/Swing_mission_overview" },
  { id: "isaware", n: "Isaware", c: "equip", p: "FI", v: "Finlande", t: "PME", y: null,
    m: "Instruments spatiaux ; moniteur de rayons X XFM-NS de Swing.", k: "", kb: "", pr: ["swing"], u: "https://www.esa.int/Space_Safety/Space_weather/Swing_mission_overview" },
  { id: "eidel", n: "EIDEL", c: "equip", p: "NO", v: "Norvège", t: "PME", y: null,
    m: "Instruments spatiaux ; sonde de Langmuir m-NLP de Swing.", k: "", kb: "", pr: ["swing"], u: "https://www.esa.int/Space_Safety/Space_weather/Swing_mission_overview" },
  { id: "planetek-italia", n: "Planetek Italia", c: "aval", p: "IT", v: "Bari", t: "Entreprise", y: null,
    m: "Géoinformation et opérations ; exploite le centre d'opérations de Swing ; maison mère de Planetek Hellas.", k: "", kb: "", pr: ["swing"], u: "https://www.planetek.it" },
  { id: "mbda", n: "MBDA", c: "equip", p: "FR", v: "Le Plessis-Robinson", t: "Groupe européen de défense", y: 2001,
    m: "Groupe européen de missiles ; partenaire d'U-Space pour la démonstration spatiale de défense TOUTATIS.", k: "", kb: "", pr: ["ares"], u: "https://www.u-space.fr/en/u-space-defense-innovation-defense/" },
  { id: "ohb-rheinmetall", n: "OHB Rheinmetall Space Networks", c: "moe", p: "DE", v: "Brême", t: "Coentreprise OHB / Rheinmetall", y: 2026,
    m: "Coentreprise créée le 11 juin 2026, après accord de l'Office fédéral des cartels, pour viser SATCOMBw étape 4.", k: "", kb: "", pr: ["satcombw4"], u: "https://esut.de/2026/06/meldungen/71796/ohb-und-rheinmetall-gruenden-joint-venture-fuer-satcombw-4/" }
);
(function () {
  const ph = ACTEURS.find(a => a.id === "planetek-hellas"); if (ph) ph.grp = "planetek-italia";
  const add = (id, ...prs) => { const a = ACTEURS.find(x => x.id === id); if (a) prs.forEach(p => { if (!a.pr.includes(p)) a.pr.push(p); }); };
  add("hemeria", "revalto"); add("cnes", "revalto", "trishna", "svom", "envision");
  add("astroscale-uk", "elsam"); add("isar", "elsam"); add("eutelsat-group", "elsam");
  add("sateliot", "sateliotc"); add("tas", "envision", "sicral3", "iris2"); add("airbus-ds", "truths", "aeolus2", "paz2", "istari", "trishna", "iris2");
  add("e2v", "truths"); add("mpg", "nggm"); add("d-orbit", "rise"); add("iceye", "ersres"); add("leonardo", "ersres");
  add("obspm", "plasma"); add("inaf", "plasma"); add("hisdesat", "paz2"); add("telespazio", "sicral3");
  add("cea", "svom"); add("cnrs", "svom"); add("qinetiq-space", "altius"); add("bira", "altius");
  add("sstl", "istari"); add("ukspacecommand", "istari"); add("u-space", "ares"); add("aid", "ares");
  add("aerospacelab", "iris2"); add("the-exploration-company", "cargo"); add("thales", "trishna");
  add("esa", "envision", "truths", "aeolus2", "nggm", "rise", "plasma", "ersres", "altius"); add("eumetsat", "aeolus2");
  add("baainbw", "satcombw4"); add("rheinmetall", "satcombw4"); add("ohb-se", "satcombw4");
  add("dlr", "callisto"); add("dlr", "envision"); add("asi", "envision"); add("belspo", "envision", "altius");
})();

/* ---------- 4. Relations ---------- */
RELATIONS.forEach(r => { if (r.de === "Planetek Italia") r.de = "planetek-italia"; });
RELATIONS.push(
  { de: "ohb-se", vers: "ohb-rheinmetall", type: "coentreprise", txt: "Coentreprise avec Rheinmetall créée en juin 2026 (parts non publiées).", bc: "A", src: "https://esut.de/2026/06/meldungen/71796/ohb-und-rheinmetall-gruenden-joint-venture-fuer-satcombw-4/" },
  { de: "rheinmetall", vers: "ohb-rheinmetall", type: "coentreprise", txt: "Coentreprise avec OHB créée en juin 2026 (parts non publiées).", bc: "A", src: "https://esut.de/2026/06/meldungen/71796/ohb-und-rheinmetall-gruenden-joint-venture-fuer-satcombw-4/" },
  { de: "satlantis", vers: "satlantis-france", type: "filiale", a: 2024, txt: "Filiale française inaugurée à Bidart le 10 octobre 2024.", bc: "A", src: "https://www.satlantis.com/inauguration-of-satlantis-france/" },
  { de: "Astroscale Holdings", vers: "astroscale-france", type: "filiale", a: 2023, txt: "Astroscale France SAS, filiale d'Astroscale Holdings.", bc: "A", src: "https://www.astroscale.com/news/astroscale-france-selects-toulouse-as-on-orbit-servicing-technical-hub" },
  { de: "Astroscale Holdings", vers: "astroscale-uk", type: "filiale", txt: "Filiale britannique d'Astroscale.", bc: "B", src: "https://www.astroscale.com" },
  { de: "safran", vers: "syntony", type: "acquisition", a: 2026, txt: "Accord signé le 13 février 2026 pour acquérir 100 % de Syntony, sous réserve des autorisations.", bc: "A", src: "https://www.gpsworld.com/safran-acquires-syntony-to-strengthen-position-in-resilient-pnt-market/" },
  { de: "anywaves", vers: "EmTroniX", type: "fusion", a: 2026, txt: "Fusion avec le luxembourgeois EmTroniX (antennes et radio logicielle) annoncée début 2026.", bc: "A", src: "https://space-agency.public.lu/en/news-events/news/2026/anywaves-and-emtronix-join-forces-in-luxembourg.html" },
  { de: "Redwire", vers: "qinetiq-space", type: "acquisition", a: 2022, txt: "Redwire rachète QinetiQ Space NV pour 32 M€.", bc: "A", src: "https://www.satellitetoday.com/finance/2022/10/03/redwire-to-acquire-belgian-firm-qinetiq-space-nv/" },
  { de: "planetek-italia", vers: "planetek-hellas", type: "filiale", txt: "Planetek Hellas est la filiale grecque de Planetek Italia.", bc: "B", src: "https://www.planetek.it" },

  { de: "bwi", vers: "revalto", type: "maître d'œuvre", txt: "Titulaire de l'appel d'offres du CNES (26 juin 2025) ; pilote la mission et les données.", bc: "A", src: "https://cnes.fr/sites/default/files/2025-07/CP035-2025_-_CNES_BWI.pdf" },
  { de: "hemeria", vers: "revalto", type: "fournisseur", txt: "Plateforme satellite, intégration et opérations.", bc: "A", src: "https://anywaves.com/news/anywaves-joins-bwi-and-hemeria-on-the-revalto-mission/" },
  { de: "anywaves", vers: "revalto", type: "fournisseur", txt: "Altimètre radar miniaturisé.", bc: "A", src: "https://anywaves.com/news/anywaves-joins-bwi-and-hemeria-on-the-revalto-mission/" },
  { de: "cnes", vers: "revalto", type: "maître d'ouvrage", txt: "Opère l'appel d'offres France 2030 pour le ministère de la Transition écologique.", bc: "A", src: "https://bwi.earth/fr/h2r-revalto-hydrologie-spatiale/" },
  { de: "astroscale-uk", vers: "elsam", type: "maître d'œuvre", txt: "Assemblé dans les salles propres de Harwell.", bc: "A", src: "https://www.space.com/astroscale-elsa-m-space-debris-removal-funding" },
  { de: "isar", vers: "elsam", type: "fournisseur", txt: "Lancement (annonce du 16 mars 2026).", bc: "A", src: "https://www.astroscale.com/news/astroscale-selects-isar-aerospace-to-launch-elsa-m-in-orbit-demonstration" },
  { de: "eutelsat-group", vers: "elsam", type: "utilisateur", txt: "Client et cible : un satellite OneWeb hors service.", bc: "A", src: "https://www.astroscale.com/news/astroscale-selects-isar-aerospace-to-launch-elsa-m-in-orbit-demonstration" },
  { de: "alen-space", vers: "sateliotc", type: "maître d'œuvre", txt: "4 satellites en orbite (2024) et 5 en fabrication (2025).", bc: "A", src: "https://sateliot.space/2025/07/03/sateliot-advances-its-constellation-with-5-new-satellites-manufactured-by-alen-space-2/" },
  { de: "sateliot", vers: "sateliotc", type: "opérateur", txt: "Opère la constellation et commercialise le service.", bc: "A", src: "https://sateliot.space/2025/07/03/sateliot-advances-its-constellation-with-5-new-satellites-manufactured-by-alen-space-2/" },
  { de: "tas", vers: "envision", type: "maître d'œuvre", txt: "Contrat signé le 28 janvier 2025.", bc: "A", src: "https://www.esa.int/Science_Exploration/Space_Science/Envision/Signed_and_sealed_Envision_can_move_towards_construction" },
  { de: "airbus-ds", vers: "truths", type: "maître d'œuvre", txt: "Airbus Royaume-Uni (contrat de déc. 2023).", bc: "A", src: "https://www.esa.int/Applications/Observing_the_Earth/TRUTHS/Contract_secures_next_step_for_TRUTHS_climate_mission" },
  { de: "e2v", vers: "truths", type: "fournisseur", txt: "Système de détection de l'imageur hyperspectral.", bc: "A", src: "https://www.esa.int/Applications/Observing_the_Earth/TRUTHS/Contract_secures_next_step_for_TRUTHS_climate_mission" },
  { de: "airbus-ds", vers: "aeolus2", type: "maître d'œuvre", txt: "Contrat initial de conception et de construction (juil. 2026).", bc: "A", src: "https://www.satnow.com/news/details/5470-airbus-awarded-aeolus-2-wind-sensing-satellite-contract" },
  { de: "mpg", vers: "nggm", type: "partenaire scientifique", txt: "AEI : modèle d'ingénierie de l'électronique de l'instrument.", bc: "A", src: "https://www.aei.mpg.de/1458992/aei-milestone-for-space-mission" },
  { de: "d-orbit", vers: "rise", type: "maître d'œuvre", txt: "Construit et exploite le véhicule GEA ; contrat ESA de 119,6 M€.", bc: "A", src: "https://europeanspaceflight.com/?p=3871" },
  { de: "iceye", vers: "ersres", type: "sous-traitant", txt: "Étude d'architecture EOGS (sept. 2026).", bc: "A", src: "https://www.esa.int/ESA_Multimedia/Images/2026/09/ESA_signs_contracts_with_ICEYE_and_Leonardo_for_Europe_s_EOGS_blueprint" },
  { de: "leonardo", vers: "ersres", type: "sous-traitant", txt: "Étude d'architecture EOGS en parallèle (sept. 2026).", bc: "A", src: "https://www.esa.int/ESA_Multimedia/Images/2026/09/ESA_signs_contracts_with_ICEYE_and_Leonardo_for_Europe_s_EOGS_blueprint" },
  { de: "obspm", vers: "plasma", type: "partenaire scientifique", txt: "LIRA : logiciel de vol des instruments de particules.", bc: "A", src: "https://lira.observatoiredeparis.psl.eu/Selection-of-the-Plasma-Observatory-mission-by-ESA" },
  { de: "inaf", vers: "plasma", type: "partenaire scientifique", txt: "Participation italienne à la mission.", bc: "B", src: "https://lira.observatoiredeparis.psl.eu/Selection-of-the-Plasma-Observatory-mission-by-ESA" },
  { de: "ohb-rheinmetall", vers: "satcombw4", type: "candidat", txt: "Créée pour répondre à l'appel d'offres.", bc: "A", src: "https://esut.de/2026/06/meldungen/71796/ohb-und-rheinmetall-gruenden-joint-venture-fuer-satcombw-4/" },
  { de: "baainbw", vers: "satcombw4", type: "maître d'ouvrage", txt: "Acheteur pour la Bundeswehr.", bc: "B", src: "https://satnews.com/2026/02/28/germany-commits-e35-billion-to-leo-resilience-and-non-kinetic-deterrence/" },
  { de: "airbus-ds", vers: "istari", type: "maître d'œuvre", txt: "Oberon : 2 satellites radar, 127 M£.", bc: "A", src: "https://theaviationist.com/2025/02/11/airbus-contracted-to-build-oberon-isr-satellite-pair-for-uk-ministry-of-defence/" },
  { de: "sstl", vers: "istari", type: "maître d'œuvre", txt: "Satellites optiques Tyche et Juno.", bc: "A", src: "https://theaviationist.com/2025/02/11/airbus-contracted-to-build-oberon-isr-satellite-pair-for-uk-ministry-of-defence/" },
  { de: "ukspacecommand", vers: "istari", type: "opérateur", txt: "Déploie la constellation d'ici 2031.", bc: "A", src: "https://theaviationist.com/2025/02/11/airbus-contracted-to-build-oberon-isr-satellite-pair-for-uk-ministry-of-defence/" },
  { de: "airbus-ds", vers: "paz2", type: "maître d'œuvre", txt: "Conception, assemblage et essais à Getafe ; consortium de plus de 15 entreprises espagnoles.", bc: "A", src: "https://www.airbus.com/en/newsroom/press-releases/2025-07-airbus-awarded-hisdesat-contract-to-build-paz-2-satellites-reinforcing-spains-sovereign-space" },
  { de: "hisdesat", vers: "paz2", type: "maître d'ouvrage", txt: "Conduit le programme pour le ministère espagnol de la Défense.", bc: "A", src: "https://www.airbus.com/en/newsroom/press-releases/2025-07-airbus-awarded-hisdesat-contract-to-build-paz-2-satellites-reinforcing-spains-sovereign-space" },
  { de: "tas", vers: "sicral3", type: "maître d'œuvre", txt: "Système, segment spatial et charges utiles.", bc: "A", src: "https://www.edrmagazine.eu/thales-alenia-space-and-telespazio-win-contract-for-sicral-3-secure-satellite-communications-system-and-associated-ground-segment" },
  { de: "telespazio", vers: "sicral3", type: "sous-traitant", txt: "Segment sol, mise à poste et essais en orbite.", bc: "A", src: "https://www.edrmagazine.eu/thales-alenia-space-and-telespazio-win-contract-for-sicral-3-secure-satellite-communications-system-and-associated-ground-segment" },
  { de: "airbus-ds", vers: "trishna", type: "fournisseur", txt: "Instrument infrarouge thermique, développé pour le CNES depuis le 4 juin 2020.", bc: "A", src: "https://cnes.fr/en/projects/trishna" },
  { de: "thales", vers: "trishna", type: "fournisseur", txt: "Cryoréfrigérateurs.", bc: "B", src: "https://satelliteprome.com/news/thales-delivers-new-generation-of-cryocoolers-for-trishna-mission" },
  { de: "cnes", vers: "trishna", type: "maître d'ouvrage", txt: "Instrument infrarouge thermique ; partenaire de l'ISRO.", bc: "A", src: "https://cnes.fr/en/projects/trishna" },
  { de: "cnes", vers: "svom", type: "maître d'ouvrage", txt: "Instruments français ECLAIRs et MXT ; partenaire de la CNSA.", bc: "A", src: "https://cnes.fr/en/projects/svom" },
  { de: "cea", vers: "svom", type: "partenaire scientifique", txt: "Partenaire de la mission.", bc: "A", src: "https://cnes.fr/en/projects/svom" },
  { de: "cnrs", vers: "svom", type: "partenaire scientifique", txt: "Partenaire de la mission.", bc: "A", src: "https://cnes.fr/en/projects/svom" },
  { de: "qinetiq-space", vers: "altius", type: "maître d'œuvre", txt: "Maître d'œuvre du consortium industriel.", bc: "A", src: "https://en.wikipedia.org/wiki/ALTIUS" },
  { de: "bira", vers: "altius", type: "partenaire scientifique", txt: "A proposé la mission.", bc: "A", src: "https://en.wikipedia.org/wiki/ALTIUS" },
  { de: "u-space", vers: "ares", type: "maître d'œuvre", txt: "TOUTATIS : 2 satellites (action en orbite basse et surveillance), avec MBDA, démonstration fin 2025 - début 2026.", bc: "A", src: "https://www.u-space.fr/en/u-space-defense-innovation-defense/" },
  { de: "mbda", vers: "ares", type: "partenaire", txt: "Partenaire d'U-Space pour TOUTATIS.", bc: "A", src: "https://www.u-space.fr/en/u-space-defense-innovation-defense/" },
  { de: "aid", vers: "ares", type: "financeur", txt: "A confié la démonstration TOUTATIS (2024).", bc: "A", src: "https://www.u-space.fr/en/u-space-defense-innovation-defense/" },
  { de: "the-exploration-company", vers: "cargo", type: "maître d'œuvre", txt: "ALADDIN : 760 M€ (sept. 2026), capsule Nyx.", bc: "A", src: "https://www.brusselstimes.com/2312252/e760m-esa-contract-marks-bold-push-for-european-autonomy-in-space" },
  { de: "airbus-ds", vers: "iris2", type: "maître d'œuvre", txt: "Conception et construction des 66 premiers satellites en orbite basse (Toulouse).", bc: "A", src: "https://runwaygirlnetwork.com/2026/09/eutelsat-inks-key-agreements-for-oneweb-replenishment-iris%C2%B2-buildout/" },
  { de: "tas", vers: "iris2", type: "fournisseur", txt: "Charges utiles gouvernementales des 330 satellites en orbite basse (≈ 500 M€).", bc: "A", src: "https://runwaygirlnetwork.com/2026/09/eutelsat-inks-key-agreements-for-oneweb-replenishment-iris%C2%B2-buildout/" },
  { de: "aerospacelab", vers: "iris2", type: "fournisseur", txt: "264 plateformes de satellites.", bc: "A", src: "https://runwaygirlnetwork.com/2026/09/eutelsat-inks-key-agreements-for-oneweb-replenishment-iris%C2%B2-buildout/" },
  { de: "syntony", vers: "swing", type: "fournisseur", txt: "Instrument de radio-occultation GNSS Aquila.", bc: "A", src: "https://www.esa.int/Space_Safety/Space_weather/Swing_mission_overview" },
  { de: "steel", vers: "swing", type: "fournisseur", txt: "Moniteur de radiations DREAM, avec le CNES.", bc: "A", src: "https://www.esa.int/Space_Safety/Space_weather/Swing_mission_overview" },
  { de: "isaware", vers: "swing", type: "fournisseur", txt: "Moniteur de rayons X XFM-NS.", bc: "A", src: "https://www.esa.int/Space_Safety/Space_weather/Swing_mission_overview" },
  { de: "eidel", vers: "swing", type: "fournisseur", txt: "Sonde de Langmuir m-NLP.", bc: "A", src: "https://www.esa.int/Space_Safety/Space_weather/Swing_mission_overview" }
);

/* ---------- 5. Contrats ---------- */
CONTRATS.push(
  { a: 2021, lib: "SICRAL 3, phases B et C", ent: "Thales Alenia Space + Telespazio", act: ["tas", "telespazio"], grp: "tas", fin: "Défense nationale", fam: "def", m: 159, bc: "A", prog: "sicral3", eng: "signe" },
  { a: 2023, lib: "TRUTHS, phase suivante", ent: "Airbus DS", act: "airbus-ds", grp: "airbus", fin: "ESA", fam: "obs", m: 109.3, bc: "B", prog: "truths", eng: "signe" },
  { a: 2024, lib: "ELSA-M, phase finale", ent: "Astroscale UK", act: "astroscale-uk", grp: "autre", fin: "ESA / UK Space Agency", fam: "def", m: 13.95, bc: "A", prog: "elsam", eng: "signe", note: "Versé via Eutelsat OneWeb" },
  { a: 2024, lib: "RISE, prolongation de vie en géostationnaire", ent: "D-Orbit", act: "d-orbit", grp: "autre", fin: "ESA", fam: "def", m: 119.6, bc: "A", prog: "rise", eng: "signe", note: "Hors cofinancement de D-Orbit" },
  { a: 2025, lib: "EnVision, sonde vers Vénus", ent: "Thales Alenia Space", act: "tas", grp: "tas", fin: "ESA", fam: "exp", m: 367, bc: "B", prog: "envision", eng: "signe" },
  { a: 2025, lib: "Oberon, 2 satellites radar", ent: "Airbus DS", act: "airbus-ds", grp: "airbus", fin: "Défense nationale", fam: "def", m: 149, bc: "C", prog: "istari", eng: "signe", note: "127 M£, converti à environ 1,17 € par livre" },
  { a: 2026, lib: "ALADDIN, cargo vers l'ISS (Nyx)", ent: "The Exploration Company", act: "the-exploration-company", grp: "autre", fin: "ESA", fam: "exp", m: 760, bc: "A", prog: "cargo", eng: "signe", note: "Dont 310 M€ pour la démonstration et 450 M€ optionnels" },
  { a: 2026, lib: "IRIS², charges utiles gouvernementales", ent: "Thales Alenia Space", act: "tas", grp: "tas", fin: "UE / SpaceRISE", fam: "tel", m: 500, bc: "B", prog: "iris2", note: "Montant annoncé, « environ 500 M€ »" }
);

/* ---------- 6. Liens sources ---------- */
Object.assign(LIENS, {
  revalto: [L("Industriel", "BWI – REVALTO, un nouveau chapitre pour l'hydrologie spatiale", "https://bwi.earth/fr/h2r-revalto-hydrologie-spatiale/"),
    L("Agence", "CNES – BWI remporte l'appel d'offres (juil. 2025)", "https://cnes.fr/sites/default/files/2025-07/CP035-2025_-_CNES_BWI.pdf"),
    L("Industriel", "Anywaves rejoint BWI et Hemeria", "https://anywaves.com/news/anywaves-joins-bwi-and-hemeria-on-the-revalto-mission/")],
  elsam: [L("Industriel", "Astroscale – Isar Aerospace lancera ELSA-M (mars 2026)", "https://www.astroscale.com/news/astroscale-selects-isar-aerospace-to-launch-elsa-m-in-orbit-demonstration"),
    L("Référence", "Space.com – Financement de la phase finale (2024)", "https://www.space.com/astroscale-elsa-m-space-debris-removal-funding")],
  sateliotc: [L("Industriel", "Sateliot – 5 nouveaux satellites Alén Space (juil. 2025)", "https://sateliot.space/2025/07/03/sateliot-advances-its-constellation-with-5-new-satellites-manufactured-by-alen-space-2/"),
    L("Industriel", "Sateliot – Validation par un programme de l'ESA (2022)", "https://sateliot.space/2022/10/19/european-space-agency-programme-affirms-sateliots-technology-to-connect-5g-iot-standard-devices-from-a-satellite/")],
  envision: [L("Agence", "ESA – EnVision passe en construction (janv. 2025)", "https://www.esa.int/Science_Exploration/Space_Science/Envision/Signed_and_sealed_Envision_can_move_towards_construction"),
    L("Référence", "Space Insider – Contrat de 367 M€", "https://spaceinsider.tech/2025/01/28/thales-alenia-space-secures-367-million-esa-contract-for-venus-mission")],
  truths: [L("Agence", "ESA – Contrat pour la suite de TRUTHS", "https://www.esa.int/Applications/Observing_the_Earth/TRUTHS/Contract_secures_next_step_for_TRUTHS_climate_mission"),
    L("Référence", "SatNow – Contrat de 109,3 M€ à Airbus", "https://satnow.com/news/details/1391-airbus-awarded-109-3-million-contract-for-advancement-of-esa-s-truths-mission")],
  aeolus2: [L("Référence", "SatNow – Contrat Aeolus-2 à Airbus (juil. 2026)", "https://www.satnow.com/news/details/5470-airbus-awarded-aeolus-2-wind-sensing-satellite-contract"),
    L("Référence", "European Spaceflight – Choix du maître d'œuvre d'Aeolus-2", "https://europeanspaceflight.com/esa-is-preparing-to-announce-aeolus-2-prime-contractor/")],
  nggm: [L("Référence", "AEI – Jalon pour NGGM (juin 2026)", "https://www.aei.mpg.de/1458992/aei-milestone-for-space-mission"),
    L("Agence", "DLR – Étude de phase A de NGGM", "https://www.dlr.de/en/si/research-transfer/projects/nggm-phase-a-study")],
  rise: [L("Référence", "European Spaceflight – Contrat de 119 M€ à D-Orbit", "https://europeanspaceflight.com/?p=3871"),
    L("Agence", "ESA – RISE, prolonger les missions en géostationnaire", "https://www.esa.int/ESA_Multimedia/Images/2025/09/RISE_Extending_missions_in_geostationary_orbit")],
  plasma: [L("Référence", "Observatoire de Paris – Sélection de Plasma Observatory", "https://lira.observatoiredeparis.psl.eu/Selection-of-the-Plasma-Observatory-mission-by-ESA"),
    L("Agence", "ESA – Les trois finalistes M7", "https://www.esa.int/Science_Exploration/Space_Science/Final_three_for_ESA_s_next_medium_science_mission")],
  ersres: [L("Agence", "ESA – Contrats EOGS à ICEYE et Leonardo (sept. 2026)", "https://www.esa.int/ESA_Multimedia/Images/2026/09/ESA_signs_contracts_with_ICEYE_and_Leonardo_for_Europe_s_EOGS_blueprint"),
    L("Référence", "Defence24 – L'ESA se lance dans la défense européenne", "https://defence24.com/geopolitics/esa-launches-into-european-defence"),
    L("Référence", "European Spaceflight – Proposition d'1 Md€", "https://europeanspaceflight.com/esa-proposes-e1b-budget-to-align-european-space-capabilities-for-defence/")],
  callisto: [L("Agence", "CNES – Callisto", "https://cnes.fr/en/projects/callisto"),
    L("Référence", "European Spaceflight – Premier vol repoussé à 2027", "https://europeanspaceflight.com/cnes-call-reveals-inaugural-callisto-flight-test-pushed-to-2027/")],
  satcombw4: [L("Référence", "ESUT – Coentreprise OHB-Rheinmetall (juin 2026)", "https://esut.de/2026/06/meldungen/71796/ohb-und-rheinmetall-gruenden-joint-venture-fuer-satcombw-4/"),
    L("Référence", "SatNews – Plan spatial allemand de 35 Md€", "https://satnews.com/2026/02/28/germany-commits-e35-billion-to-leo-resilience-and-non-kinetic-deterrence/"),
    L("Référence", "Heise – Airbus veut s'associer à Rheinmetall et OHB", "https://www.heise.de/en/news/SATCOMBw-Now-Airbus-also-wants-a-consortium-with-Rheinmetall-and-OHB-11203054.html")],
  istari: [L("Référence", "The Aviationist – Contrat Oberon à Airbus", "https://theaviationist.com/2025/02/11/airbus-contracted-to-build-oberon-isr-satellite-pair-for-uk-ministry-of-defence/")],
  paz2: [L("Industriel", "Airbus – Contrat PAZ 2 (juil. 2025)", "https://www.airbus.com/en/newsroom/press-releases/2025-07-airbus-awarded-hisdesat-contract-to-build-paz-2-satellites-reinforcing-spains-sovereign-space"),
    L("Industriel", "Airbus – Commercialisation des images PAZ 2 (janv. 2026)", "https://www.airbus.com/en/newsroom/press-releases/2026-01-airbus-and-hisdesat-sign-a-commercialisation-agreement-for-paz-2-satellite-imagery")],
  sicral3: [L("Référence", "EDR Magazine – Contrat SICRAL 3", "https://www.edrmagazine.eu/thales-alenia-space-and-telespazio-win-contract-for-sicral-3-secure-satellite-communications-system-and-associated-ground-segment"),
    L("Industriel", "Thales Alenia Space – SICRAL 3", "https://www.thalesaleniaspace.com/en/press-releases/thales-alenia-space-and-telespazio-win-contract-sicral-3-secure-satellite")],
  trishna: [L("Agence", "CNES – TRISHNA", "https://cnes.fr/en/projects/trishna"),
    L("Référence", "eoPortal – TRISHNA", "https://www.eoportal.org/satellite-missions/trishna")],
  svom: [L("Agence", "CNES – SVOM", "https://cnes.fr/en/projects/svom"),
    L("Référence", "Site de la mission SVOM", "https://www.svom.eu/en/the-svom-mission/")],
  altius: [L("Référence", "Wikipédia – ALTIUS", "https://en.wikipedia.org/wiki/ALTIUS"),
    L("Agence", "BIRA-IASB – ALTIUS", "https://altius.aeronomie.be")]
});
addLien("iris2", L("Référence", "Runway Girl Network – Industriels d'IRIS² et renouvellement OneWeb (sept. 2026)", "https://runwaygirlnetwork.com/2026/09/eutelsat-inks-key-agreements-for-oneweb-replenishment-iris%C2%B2-buildout/"));
addLien("cargo", L("Référence", "Brussels Times – Contrat ALADDIN de 760 M€", "https://www.brusselstimes.com/2312252/e760m-esa-contract-marks-bold-push-for-european-autonomy-in-space"));
addLien("ares", L("Industriel", "U-Space – Sélection pour TOUTATIS", "https://www.u-space.fr/en/u-space-defense-innovation-defense/"));
addLien("boost", L("Agence", "ESA – Vidéo Boost!", "https://www.esa.int/ESA_Multimedia/Videos/2024/06/Boost"));
addLien("msr", L("Référence", "Aerospace America – L'ESA repense ses plans martiens", "https://aerospaceamerica.aiaa.org/european-space-agency-rethinks-mars-plans-as-it-kicks-off-a-mission-dense-2026/"));
addLien("egep", L("Référence", "ESA – Image du programme EGEP", "https://www.esa.int/ESA_Multimedia/Images/2012/11/European_GNSS_Evolution_Programme_EGEP"));

/* ---------- 7. Photos (Wikimedia Commons) et dimensions ----------
   Fichiers choisis d'après leur nom et leur catégorie sur Commons ; dimensions tirées des pages citées. */
const WP = t => "https://en.wikipedia.org/wiki/" + t;
Object.assign(VISUELS, {
  s3: { img: "Maquette_Sentinel_3_DSC_0047.JPG", leg: "Maquette de Sentinel-3", corps: [2.2, 3.71], dimsTxt: "Corps : 3,71 × 2,20 × 2,21 m", extras: [], masse: "1 250 kg", bc: "B", src: ["Wikipédia – Sentinel-3", WP("Sentinel-3")] },
  s5p: { img: "Sentinel_5P_model.jpg", leg: "Maquette de Sentinel-5P", corps: null, dimsTxt: "3,35 m × 5,63 m (hauteur × diamètre, selon la source)", extras: [], masse: "900 kg", bc: "B", src: ["Wikipédia – Sentinel-5P", WP("Sentinel-5_Precursor")] },
  s6: { img: null, leg: "", corps: [4.17, 5.13], dimsTxt: "5,13 × 4,17 × 2,34 m", extras: [], masse: "1 192 kg", bc: "B", src: ["Wikipédia – Sentinel-6", WP("Sentinel-6_Michael_Freilich")], vide: "Pas de photo libre trouvée sur Wikimedia Commons." },
  envisat: { img: null, leg: "", corps: [5, 10], env: 26, dimsTxt: "26 × 10 × 5 m en orbite (panneau solaire compris)", extras: [], masse: "8 211 kg", bc: "B", src: ["Wikipédia – Envisat", WP("Envisat")], vide: "Pas de photo libre trouvée sur Wikimedia Commons." },
  jason: { img: "OSTM-Jason-2-Spacecraft.jpg", leg: "Jason-2 (OSTM), illustration de la NASA", corps: null, dimsTxt: "Dimensions non publiées sur la source consultée", extras: [], masse: "553 kg (Jason-3)", bc: "B", src: ["Wikipédia – Jason-3", WP("Jason-3")] },
  goce: { img: null, leg: "", corps: [5, 1.1], dimsTxt: "5 × 1,1 m", extras: [], masse: "Non précisée sur la source consultée", bc: "B", src: ["Wikipédia – GOCE", WP("Gravity_Field_and_Steady-State_Ocean_Circulation_Explorer")], vide: "Pas de photo libre trouvée sur Wikimedia Commons." },
  smos: { img: null, leg: "", corps: [2.4, 2.3], dimsTxt: "Corps : 2,4 × 2,3 m ; antenne MIRAS d'environ 8 m", extras: [["Antenne MIRAS", 8]], masse: "658 kg", bc: "B", src: ["Wikipédia – SMOS", WP("Soil_Moisture_and_Ocean_Salinity")], vide: "Pas de photo libre trouvée sur Wikimedia Commons." },
  cryosat: { img: "Cryosat2_test_iabg_ottobrunn.jpg", leg: "CryoSat-2 en essais à l'IABG (Ottobrunn)", corps: [2.3, 4.6], dimsTxt: "4,6 × 2,3 m", extras: [], masse: "720 kg (750 kg selon le texte de la source)", bc: "B", src: ["Wikipédia – CryoSat-2", WP("CryoSat-2")] },
  swarm: { img: null, leg: "", corps: [9.1, 0.85], dimsTxt: "9,1 × 1,5 × 0,85 m (mât compris)", extras: [], masse: "468 kg par satellite", bc: "B", src: ["Wikipédia – Swarm", WP("Swarm_(spacecraft)")], vide: "Pas de photo libre trouvée sur Wikimedia Commons." },
  aeolus: { img: "ADM-Aeolus_model.jpg", leg: "Maquette d'Aeolus", corps: [1.9, 2.0], dimsTxt: "1,74 × 1,9 × 2 m", extras: [], masse: "1 366 kg", bc: "B", src: ["Wikipédia – Aeolus", WP("ADM-Aeolus")] },
  earthcare: { img: null, leg: "", corps: null, dimsTxt: "2,5 × 19 m (panneau solaire compris)", extras: [["Longueur avec le panneau solaire", 19]], masse: "2 350 kg", bc: "B", src: ["Wikipédia – EarthCARE", WP("EarthCARE")], vide: "Pas de photo libre trouvée sur Wikimedia Commons." },
  biomass: { img: "ESA_Biomass_Satellite_seeing_wood_through_trees.png", leg: "Biomass (illustration ESA)", esa: true, corps: null, dimsTxt: "10 × 12 × 20 m déployé ; antenne radar de 12 m de diamètre", extras: [["Antenne radar (diamètre)", 12]], masse: "1 170 kg", bc: "B", src: ["Wikipédia – Biomass", WP("Biomass_(satellite)")] },
  terrasar: { img: null, leg: "", corps: null, dimsTxt: "Dimensions non publiées sur la source consultée", extras: [], masse: "1 230 kg", bc: "B", src: ["Wikipédia – TerraSAR-X", WP("TerraSAR-X")], vide: "Pas de photo libre trouvée sur Wikimedia Commons." },
  metop: { img: "MetOp-A_&_-B_spacecraft_model.png", leg: "Modèle de MetOp-A et -B", corps: [3.4, 6.2], replie: true, dimsTxt: "6,2 × 3,4 × 3,4 m sous la coiffe ; 17,6 × 6,5 × 5,2 m déployé", extras: [], masse: "Environ 4 t (texte de la source)", bc: "B", src: ["Wikipédia – MetOp", WP("MetOp")] },
  metopsg: { img: "MetOp_Second_Generation_A-type_satellite_ESA511182.jpg", leg: "Satellite MetOp-SG de type A", esa: true, corps: null, dimsTxt: "Dimensions non publiées sur la source consultée", extras: [], masse: "≈ 4 t", bc: "B", src: ["Wikipédia – MetOp-SG", WP("MetOp-SG")] },
  spot: { img: "Satellite_Spot_1_Musee_du_Bourget_P1020363.JPG", leg: "SPOT 1 exposé au musée de l'Air et de l'Espace du Bourget", corps: null, dimsTxt: "Dimensions non publiées sur la source consultée", extras: [], masse: "1 800 kg (SPOT 1)", bc: "B", src: ["Wikipédia – SPOT", WP("SPOT_(satellite)")] },
  rosetta: { img: "Rosetta_spacecraft_model.png", leg: "Modèle de la sonde Rosetta", corps: [2.1, 2.8], dimsTxt: "Corps : 2,8 × 2,1 × 2 m ; 64 m² de panneaux solaires", extras: [], masse: "3 000 kg avec l'atterrisseur Philae", bc: "B", src: ["Wikipédia – Rosetta", WP("Rosetta_(spacecraft)")] },
  gaia: { img: "Gaia_spacecraft_360_Gaia_Sky.jpg", leg: "Gaia (rendu du logiciel Gaia Sky)", corps: null, dimsTxt: "4,6 × 2,3 m ; pare-soleil de 10 m de diamètre", extras: [["Pare-soleil (diamètre)", 10]], masse: "2 029 kg", bc: "B", src: ["Wikipédia – Gaia", WP("Gaia_(spacecraft)")] },
  bepi: { img: "BepiColombo_spacecraft_model.png", leg: "Modèle de BepiColombo", corps: [2.2, 2.4], dimsTxt: "Orbiteur MPO : 2,4 × 2,2 × 1,7 m", extras: [], masse: "4 100 kg au lancement (ensemble)", bc: "B", src: ["Wikipédia – BepiColombo", WP("BepiColombo")] },
  euclid: { img: "Euclid_spacecraft_ESA24912474.jpg", leg: "Le télescope spatial Euclid", esa: true, corps: [3.1, 4.5], dimsTxt: "4,5 × 3,1 m", extras: [], masse: "2 000 kg", bc: "B", src: ["Wikipédia – Euclid", WP("Euclid_(spacecraft)")] },
  solo: { img: "Solar_Orbiter_ESA20813950.jpg", leg: "Solar Orbiter (image ESA)", esa: true, corps: [2.5, 3.1], dimsTxt: "2,5 × 3,1 × 2,7 m", extras: [], masse: "1 800 kg", bc: "B", src: ["Wikipédia – Solar Orbiter", WP("Solar_Orbiter")] },
  plato: { img: "PLATO_spacecraft.jpg", leg: "PLATO (illustration)", corps: null, dimsTxt: "Dimensions non publiées sur la source consultée", extras: [], masse: "2 134 kg, dont 103 kg d'ergols", bc: "B", src: ["Wikipédia – PLATO", WP("PLATO_(spacecraft)")] },
  xmm: { img: "Artist_rendering_of_the_XMM-Newton_telescope_with_Earth_in_background.jpg", leg: "XMM-Newton (vue d'artiste)", corps: null, dimsTxt: "Dimensions non retenues", extras: [], masse: "3 764 kg au lancement", bc: "A", src: ["Wikipédia – XMM-Newton", WP("XMM-Newton")] },
  ariane5: { img: "Ariane_5ECA_on_its_way_to_launch_pad_ELA-3.jpg", leg: "Ariane 5 ECA en route vers le pas de tir ELA-3", corps: [5.4, 52], lanceur: true, dimsTxt: "46 à 52 m de haut, 5,4 m de diamètre", extras: [], masse: "≈ 777 t au décollage", bc: "B", src: ["Wikipédia – Ariane 5", WP("Ariane_5")] },
  vega: { img: "Maquette_Vega_C_DSC_0020.JPG", leg: "Maquette de Vega-C", corps: [3.4, 34.8], lanceur: true, dimsTxt: "34,8 m de haut, 3,4 m de diamètre", extras: [], masse: "≈ 210 t au décollage", bc: "B", src: ["Wikipédia – Vega C", WP("Vega_C")] },
  iss: { img: "Columbus_module_-_cropped.jpg", leg: "Le module européen Columbus", corps: [4.5, 6.9], dimsTxt: "Columbus : 6,9 m de long, 4,5 m de diamètre", extras: [], masse: "10 300 kg (Columbus)", bc: "B", src: ["Wikipédia – Columbus", WP("Columbus_(ISS_module)")] },
  exomars: { img: "ExoMars_Trace_Gas_Orbiter.jpg", leg: "ExoMars Trace Gas Orbiter", corps: null, dimsTxt: "Dimensions non publiées sur la source consultée", extras: [], masse: "4 332 kg (orbiteur et Schiaparelli au lancement)", bc: "B", src: ["Wikipédia – ExoMars TGO", WP("ExoMars_Trace_Gas_Orbiter")] },
  swot: { img: "Illustration_of_the_Surface_Water_and_Ocean_Topography_satellite.jpg", leg: "SWOT (illustration)", corps: [5, 5], env: 14.9, dimsTxt: "14,9 × 5 × 5 m", extras: [], masse: "2 200 kg", bc: "B", src: ["Wikipédia – SWOT", WP("Surface_Water_and_Ocean_Topography")] },
  lisa: { img: "LISA.jpg", leg: "LISA (illustration)", corps: null, dimsTxt: "Trois satellites distants de 2,5 millions de km", extras: [], masse: "8 212 kg au lancement (ensemble)", bc: "B", src: ["Wikipédia – LISA", WP("Laser_Interferometer_Space_Antenna")] },
  iceye: { img: "ICEYE_SAR_satellite_Netherlands_2.jpg", leg: "Satellite radar ICEYE", corps: null, dimsTxt: "", extras: [], masse: "", bc: "", src: null },
  gateway: { img: "Gateway_-_Full_Configuration_Hero_Image_-_121123.png", leg: "Gateway, configuration complète (NASA)", corps: null, dimsTxt: "", extras: [], masse: "", bc: "", src: null },
  smile: { img: "ESA_and_Airbus_engineers_test_Smile_spacecraft_boom_ESA506838.png", leg: "Essai du mât de SMILE par l'ESA et Airbus", esa: true, corps: null, dimsTxt: "Dimensions non publiées sur la source consultée", extras: [], masse: "2 250 kg", bc: "B", src: ["Wikipédia – SMILE", WP("SMILE_(spacecraft)")] },
  callisto: { img: null, leg: "", corps: [1.1, 14], lanceur: true, dimsTxt: "≈ 14 m de haut, 1,1 m de diamètre", extras: [], masse: "3 500 kg au décollage", bc: "A", src: ["European Spaceflight – Callisto", "https://europeanspaceflight.com/cnes-call-reveals-inaugural-callisto-flight-test-pushed-to-2027/"], vide: "Pas de photo libre trouvée sur Wikimedia Commons." },
  elsam: { img: null, leg: "", corps: null, dimsTxt: "Dimensions non publiées", extras: [], masse: "520 kg", bc: "A", src: ["Astroscale – ELSA-M", "https://www.astroscale.com/news/astroscale-selects-isar-aerospace-to-launch-elsa-m-in-orbit-demonstration"], vide: "Pas de photo libre trouvée sur Wikimedia Commons." },
  svom: { img: null, leg: "", corps: null, dimsTxt: "Dimensions non publiées sur la source consultée", extras: [], masse: "950 kg", bc: "A", src: ["CNES – SVOM", "https://cnes.fr/en/projects/svom"], vide: "Pas de photo libre trouvée sur Wikimedia Commons." },
  altius: { img: null, leg: "", corps: null, dimsTxt: "Dimensions non publiées sur la source consultée", extras: [], masse: "266 kg au lancement", bc: "B", src: ["Wikipédia – ALTIUS", WP("ALTIUS")], vide: "Pas de photo libre trouvée sur Wikimedia Commons." },
  microcarb: { img: null, leg: "", corps: null, dimsTxt: "Dimensions non publiées sur la source consultée", extras: [], masse: "180 kg", bc: "A", src: ["CNES – MicroCarb", "https://cnes.fr/en/projects/microcarb"], vide: "Pas de photo libre trouvée sur Wikimedia Commons." },
  enmap: { img: null, leg: "", corps: null, dimsTxt: "Dimensions non publiées sur la source consultée", extras: [], masse: "≈ 1 t", bc: "A", src: ["DLR – Lancement d'EnMAP", "https://www.dlr.de/en/latest/news/2022/02/20220401_german-satellite-enmap-launches-successfully"], vide: "Pas de photo libre trouvée sur Wikimedia Commons." },
  spacerider: { img: null, leg: "", corps: null, dimsTxt: "Longueur d'au moins 8,04 m (module de rentrée et module de service)", extras: [["Longueur de l'ensemble", 8.04]], masse: "Jusqu'à 4,9 t au lancement ; 2,85 t à l'atterrissage", bc: "B", src: ["Wikipédia – Space Rider", WP("Space_Rider")], vide: "Pas de photo libre trouvée sur Wikimedia Commons." }
});

/* Le même satellite ICEYE et la station Gateway n'ont pas d'échelle publiée : photo seule. */
SOURCES.commons = ["Wikimedia Commons – photos et illustrations libres de droits", "https://commons.wikimedia.org"];
GLOSSAIRE.push(
  ["Prospection", "Vue de l'atlas qui liste les programmes en développement ou en projet, avec acheteur, attributaire, prochain jalon et opportunités documentées."],
  ["EOGS", "Earth Observation Governmental Service : futur service gouvernemental d'observation de la Terre de l'UE, préparé par le programme ERS de l'ESA."]
);
