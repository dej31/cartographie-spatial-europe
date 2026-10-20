/* ============================================================
   Atlas du spatial européen — unités de chaque série
   [unité, date de lancement, lanceur, statut, particularités / instruments]
   Statut : op, dev, plan, fin (mêmes codes que les programmes).
   Indice global : dates historiques B (publiées, non revérifiées une à une),
   dates 2024-2026 A (vérifiées lors de la construction).
   ============================================================ */

/* ---- Nouveaux programmes ---- */
PROGRAMMES.push(
  { id: "newathena", n: "NewAthena", d: "esc", sub: "Mission L : grand observatoire en rayons X",
    fin: "ESA – programme scientifique, avec la NASA et la JAXA", moa: "ESA",
    moe: "Non attribué (adoption prévue en 2027) ; instrument X-IFU sous maîtrise d'œuvre du CNES", g: [], plat: "—",
    instr: "Spectromètre X-IFU (consortium mené par la France, CNES et IRAP) et imageur grand champ WFI",
    app: "Étudier l'Univers chaud et énergétique : amas de galaxies, trous noirs et formation des grandes structures.",
    bud: "Non publié", bc: "C",
    y0: 2037, y1: 2045, jal: [[2023, "Mission redimensionnée (nov.)"], [2027, "Adoption prévue"], [2037, "Lancement visé"]],
    st: "dev", pred: [], succ: [],
    note: "Version redimensionnée en 2023 du projet Athena, jugé trop coûteux. Priorité confirmée à la conférence ministérielle de 2025, avec LISA." },
  { id: "athenafidus", n: "Athena-Fidus", d: "dtl", sub: "Satellite télécoms dual franco-italien",
    fin: "France (DGA, CNES) et Italie (Défense, ASI)", moa: "DGA, CNES, Segredifesa, ASI",
    moe: "Thales Alenia Space", g: ["tas"], plat: "Spacebus 4000B2",
    instr: "Charge utile large bande en bandes EHF et Ka",
    app: "Communications haut débit pour les forces françaises, italiennes et belges et pour la sécurité civile des deux pays.",
    bud: "Non publié", bc: "C",
    y0: 2014, y1: 2029, jal: [[2014, "Lancement (6 févr., Ariane 5)"]],
    st: "op", pred: [], succ: ["iris2"],
    note: "Satellite dual : il porte à la fois des usages militaires et civils, et il est financé par deux pays." }
);

/* SICRAL redevient une fiche dédiée aux satellites militaires italiens */
(function () {
  const s = PROGRAMMES.find(p => p.id === "sicral");
  s.n = "SICRAL";
  s.sub = "Télécoms militaires italiennes";
  s.fin = "Défense italienne, avec la France pour SICRAL 2";
  s.moa = "Défense italienne (Segredifesa), avec la DGA pour SICRAL 2";
  s.app = "Communications militaires italiennes ; SICRAL 2 est partagé avec la France.";
  s.jal = [[2001, "SICRAL 1"], [2009, "SICRAL 1B"], [2015, "SICRAL 2"]];
  /* SARah : dates corrigées (SARah-1 en 2022, SARah-2 et 3 en 2023) */
  const sa = PROGRAMMES.find(p => p.id === "sarah");
  sa.y0 = 2022; sa.jal = [[2022, "SARah-1 (18 juin)"], [2023, "SARah-2 et 3 (déc.)"]]; sa.st = "op";
  /* Sentinel-2 : pas de photo libre du satellite trouvée */
  if (typeof VISUELS !== "undefined" && VISUELS.s2) {
    VISUELS.s2.img = null;
    VISUELS.s2.vide = "Pas de photo libre de droits du satellite trouvée sur Wikimedia Commons.";
  }
})();

CONVERGENCES.forEach(c => { if (c.titre === "SICRAL 2 et Athena-Fidus") { c.b = "athenafidus"; } });
CONVERGENCES.push(
  { type: "Vol partagé", a: "syracuse", b: "hh", titre: "Le dernier Ariane 5 : Syracuse 4B et Heinrich Hertz", txt: "Le 5 juillet 2023, le dernier vol d'Ariane 5 a emporté ensemble un satellite militaire français et un démonstrateur télécoms allemand." }
);

Object.assign(LIENS, {
  newathena: [["Agence", "CNES – Athena", "https://cnes.fr/en/projects/athena"], ["Agence", "ESA Cosmos – Calendrier d'Athena", "https://cosmos.esa.int/web/athena/schedule"]],
  athenafidus: [["Agence", "CNES – Athena-Fidus en détails", "https://cnes.fr/projets/athena-fidus/en-details"], ["Industriel", "Thales Alenia Space – Exploitation d'Athena-Fidus", "https://www.thalesaleniaspace.com/fr/press-releases/thales-alenia-space-va-assurer-les-operations-des-satellites-syracuse-3-athena-fidus"], ["Référence", "Gunter's Space Page – Athena-Fidus", "https://space.skyrocket.de/doc_sdat/athena-fidus.htm"]]
});
LIENS.sicral = (LIENS.sicral || []).filter(l => !l[1].includes("Athena-Fidus en détails"));

/* ---- Unités de chaque série ---- */
const UNITES = {
  s1: [
    ["Sentinel-1A", "3 avr. 2014", "Soyouz (Kourou)", "op", "Radar C-SAR"],
    ["Sentinel-1B", "25 avr. 2016", "Soyouz (Kourou)", "fin", "Radar C-SAR ; panne d'alimentation en déc. 2021, mission arrêtée en 2022"],
    ["Sentinel-1C", "5 déc. 2024", "Vega-C (Kourou)", "op", "Radar C-SAR + récepteur AIS pour le suivi des navires"],
    ["Sentinel-1D", "4 nov. 2025", "Ariane 6 (Kourou)", "op", "Radar C-SAR + récepteur AIS ; mise en service en 2026"]],
  s2: [
    ["Sentinel-2A", "23 juin 2015", "Vega (Kourou)", "op", "Imageur MSI ; campagne prolongée depuis 2025"],
    ["Sentinel-2B", "7 mars 2017", "Vega (Kourou)", "op", "Imageur MSI"],
    ["Sentinel-2C", "5 sept. 2024", "Vega (Kourou), dernier vol de Vega", "op", "Imageur MSI ; remplace 2A"],
    ["Sentinel-2D", "≈ 2028", "—", "plan", "Imageur MSI ; satellite construit, en stockage"]],
  s3: [
    ["Sentinel-3A", "16 févr. 2016", "Rockot (Plesetsk)", "op", "OLCI, SLSTR, altimètre SRAL, radiomètre MWR"],
    ["Sentinel-3B", "25 avr. 2018", "Rockot (Plesetsk)", "op", "Mêmes instruments"],
    ["Sentinel-3C", "15 sept. 2026", "Vega-C (Kourou), avec FLEX", "op", "Mêmes instruments ; recette en orbite"],
    ["Sentinel-3D", "≈ 2028", "—", "plan", "Satellite construit, en stockage"]],
  s4: [
    ["Sentinel-4A", "1er juil. 2025", "Falcon 9, à bord de MTG-S1", "op", "Spectromètre UVN"],
    ["Sentinel-4B", "≈ 2035", "À bord de MTG-S2", "plan", "Spectromètre UVN"]],
  s5: [
    ["Sentinel-5A", "13 août 2025", "Ariane 62, à bord de MetOp-SG A1", "op", "Spectromètre UVNS"],
    ["Sentinel-5B", "≈ 2033", "À bord de MetOp-SG A2", "plan", "Spectromètre UVNS"],
    ["Sentinel-5C", "≈ 2039", "À bord de MetOp-SG A3", "plan", "Spectromètre UVNS"]],
  s6: [
    ["Sentinel-6A « Michael Freilich »", "21 nov. 2020", "Falcon 9 (Vandenberg)", "op", "Altimètre Poseidon-4, radiomètre AMR-C, radio-occultation GNSS"],
    ["Sentinel-6B", "17 nov. 2025", "Falcon 9 (Vandenberg)", "op", "Mêmes instruments"],
    ["Sentinel-6C", "≈ 2030", "—", "plan", "Continuité de la série"]],
  co2m: [["CO2M-A", "≈ 2027", "—", "dev", "Spectromètre CO2I, polarimètre, imageur de nuages"], ["CO2M-B", "≈ 2028", "—", "dev", "Idem"], ["CO2M-C", "≈ 2029", "—", "dev", "Idem"]],
  lstm: [["LSTM-A", "≈ 2028", "—", "dev", "Imageur infrarouge thermique"], ["LSTM-B", "≈ 2030", "—", "dev", "Idem"]],
  cristal: [["CRISTAL-A", "≈ 2028", "—", "dev", "Altimètre bi-fréquence IRIS, radiomètre"], ["CRISTAL-B", "≈ 2034", "—", "plan", "Idem"]],
  chime: [["CHIME-A", "≈ 2029", "—", "dev", "Spectromètre hyperspectral"], ["CHIME-B", "≈ 2031", "—", "plan", "Idem"]],
  cimr: [["CIMR-A", "≈ 2029", "—", "dev", "Radiomètre micro-ondes"], ["CIMR-B", "≈ 2035", "—", "plan", "Idem"]],
  rosel: [["ROSE-L A", "≈ 2029", "—", "dev", "Radar bande L"], ["ROSE-L B", "≈ 2031", "—", "plan", "Idem"]],
  sng: [
    ["Sentinel-1NG A", "≈ 2033", "—", "dev", "Radar bande C (Airbus) ; contrat de juin 2026"],
    ["Sentinel-1NG B", "≈ 2034", "—", "dev", "Idem"],
    ["Sentinel-2NG A", "≈ 2033", "—", "plan", "Imageur optique"],
    ["Sentinel-2NG B", "≈ 2035", "—", "plan", "Idem"],
    ["Sentinel-3NG Topographie A", "≈ 2034", "—", "plan", "Altimétrie"],
    ["Sentinel-3NG Optique A", "≈ 2035", "—", "plan", "Couleur et température de surface"],
    ["Sentinel-3NG Topographie B", "≈ 2036", "—", "plan", "Altimétrie"],
    ["Sentinel-3NG Optique B", "≈ 2037", "—", "plan", "Idem"]],
  ers: [
    ["ERS-1", "17 juil. 1991", "Ariane 4 (Kourou)", "fin", "Radar SAR, altimètre, diffusiomètre, radiomètre ATSR"],
    ["ERS-2", "21 avr. 1995", "Ariane 4 (Kourou)", "fin", "Mêmes instruments + spectromètre d'ozone GOME ; arrêté en 2011"]],
  jason: [
    ["Topex/Poseidon", "10 août 1992", "Ariane 4 (Kourou)", "fin", "Altimètres Topex (NASA) et Poseidon (CNES)"],
    ["Jason-1", "7 déc. 2001", "Delta II (Vandenberg)", "fin", "Altimètre Poseidon-2, plateforme Proteus"],
    ["Jason-2", "20 juin 2008", "Delta II (Vandenberg)", "fin", "Altimètre Poseidon-3"],
    ["Jason-3", "17 janv. 2016", "Falcon 9 (Vandenberg)", "op", "Altimètre Poseidon-3B ; relayé par Sentinel-6 (statut récent à vérifier)"]],
  cryosat: [
    ["CryoSat", "8 oct. 2005", "Rockot (Plesetsk)", "fin", "Perdu au lancement"],
    ["CryoSat-2", "8 avr. 2010", "Dnepr (Baïkonour)", "op", "Altimètre radar interférométrique SIRAL"]],
  swarm: [["Swarm A, B et C", "22 nov. 2013", "Rockot (Plesetsk)", "op", "Trois satellites identiques : magnétomètres, instruments de champ électrique"]],
  mop: [["Meteosat-1 à 7", "1977 à 1997", "Delta puis Ariane", "fin", "Radiomètre MVIRI ; Meteosat-7 a servi jusqu'en 2017"]],
  msg: [
    ["Meteosat-8 (MSG-1)", "28 août 2002", "Ariane 5 (Kourou)", "fin", "Imageur SEVIRI, radiomètre GERB"],
    ["Meteosat-9 (MSG-2)", "21 déc. 2005", "Ariane 5 (Kourou)", "op", "Idem"],
    ["Meteosat-10 (MSG-3)", "5 juil. 2012", "Ariane 5 (Kourou)", "op", "Idem"],
    ["Meteosat-11 (MSG-4)", "15 juil. 2015", "Ariane 5 (Kourou)", "op", "Idem"]],
  mtg: [
    ["MTG-I1 (Meteosat-12)", "13 déc. 2022", "Ariane 5 (Kourou)", "op", "Imageur FCI + détecteur d'éclairs LI"],
    ["MTG-S1 (Meteosat-13)", "1er juil. 2025", "Falcon 9 (Cap Canaveral)", "op", "Sondeur infrarouge IRS + Sentinel-4 (UVN)"],
    ["MTG-I2 (Meteosat-14)", "27 août 2026", "Ariane 62 (Kourou)", "op", "Imageur FCI + détecteur d'éclairs LI ; recette en orbite"],
    ["MTG-I3 et MTG-I4", "à partir de la fin des années 2020", "—", "plan", "Imageurs de relève"],
    ["MTG-S2", "≈ 2035", "—", "plan", "Sondeur IRS + Sentinel-4B"]],
  metop: [
    ["MetOp-A", "19 oct. 2006", "Soyouz (Baïkonour)", "fin", "IASI, ASCAT, GOME-2, AVHRR, instruments NOAA ; désorbité en 2021"],
    ["MetOp-B", "17 sept. 2012", "Soyouz (Baïkonour)", "op", "Mêmes instruments"],
    ["MetOp-C", "7 nov. 2018", "Soyouz (Kourou)", "op", "Mêmes instruments"]],
  metopsg: [
    ["MetOp-SG A1", "13 août 2025", "Ariane 62 (Kourou)", "op", "Série A, sondage et imagerie : METimage, IASI-NG, MWS, 3MI, radio-occultation, Sentinel-5"],
    ["MetOp-SG B1", "prévu déc. 2026", "Ariane 62 (Kourou)", "dev", "Série B, micro-ondes : diffusiomètre SCA, imageurs MWI et ICI, radio-occultation, Argos-4"],
    ["MetOp-SG A2 et B2", "années 2030", "—", "plan", "Relève des deux séries"],
    ["MetOp-SG A3 et B3", "années 2030-2040", "—", "plan", "Idem ; A3 porte Sentinel-5C"]],
  spot: [
    ["SPOT 1", "22 févr. 1986", "Ariane 1", "fin", "Instruments HRV, 10 à 20 m"],
    ["SPOT 2 et 3", "1990 et 1993", "Ariane 4", "fin", "Instruments HRV"],
    ["SPOT 4", "24 mars 1998", "Ariane 4", "fin", "Instruments HRVIR + capteur Végétation"],
    ["SPOT 5", "4 mai 2002", "Ariane 4", "fin", "Instruments HRG (2,5 à 5 m) + stéréo HRS"],
    ["SPOT 6", "9 sept. 2012", "PSLV (Inde)", "fin", "Instrument NAOMI, 1,5 m ; financé par Astrium"],
    ["SPOT 7", "30 juin 2014", "PSLV (Inde)", "fin", "Idem ; vendu à l'Azerbaïdjan (Azersky)"]],
  pleiades: [
    ["Pléiades 1A", "17 déc. 2011", "Soyouz (Kourou)", "op", "Télescope HiRI, 70 cm (statut récent à vérifier)"],
    ["Pléiades 1B", "2 déc. 2012", "Soyouz (Kourou)", "op", "Idem (statut récent à vérifier)"]],
  pneo: [
    ["Pléiades Neo 3", "29 avr. 2021", "Vega (Kourou)", "op", "Imageur 30 cm"],
    ["Pléiades Neo 4", "17 août 2021", "Vega (Kourou)", "op", "Imageur 30 cm"],
    ["Pléiades Neo 5 et 6", "21 déc. 2022", "Vega-C (Kourou)", "fin", "Perdus lors de l'échec du lanceur"]],
  co3d: [["CO3D 1 à 4", "juil. 2025", "Vega-C (Kourou), avec MicroCarb", "op", "Quatre satellites identiques, imageurs stéréo 50 cm"]],
  terrasar: [
    ["TerraSAR-X", "15 juin 2007", "Dnepr (Baïkonour)", "op", "Radar bande X"],
    ["TanDEM-X", "21 juin 2010", "Dnepr (Baïkonour)", "op", "Radar bande X ; vole en formation serrée avec TerraSAR-X"]],
  helios: [
    ["Helios IA", "7 juil. 1995", "Ariane 4 (Kourou)", "fin", "Optique visible"],
    ["Helios IB", "3 déc. 1999", "Ariane 4 (Kourou)", "fin", "Optique visible"],
    ["Helios IIA", "18 déc. 2004", "Ariane 5 (Kourou)", "fin", "Optique visible et infrarouge"],
    ["Helios IIB", "18 déc. 2009", "Ariane 5 (Kourou)", "fin", "Optique visible et infrarouge"]],
  cso: [
    ["CSO-1", "19 déc. 2018", "Soyouz (Kourou)", "op", "Reconnaissance, orbite d'environ 800 km"],
    ["CSO-2", "29 déc. 2020", "Soyouz (Kourou)", "op", "Identification, orbite plus basse (≈ 480 km), images plus fines"],
    ["CSO-3", "6 mars 2025", "Ariane 6 (Kourou)", "op", "Reconnaissance ; premier vol commercial d'Ariane 6"]],
  sarlupe: [["SAR-Lupe 1 à 5", "déc. 2006 à juil. 2008", "Kosmos-3M (Plesetsk)", "fin", "Cinq satellites radar bande X"]],
  sarah: [
    ["SARah-1", "18 juin 2022", "Falcon 9 (Vandenberg)", "op", "Radar à antenne active, construit par Airbus ; ≈ 4 t"],
    ["SARah-2 et 3", "déc. 2023", "Falcon 9 (Vandenberg)", "op", "Radars à réflecteur, construits par OHB ; ≈ 1,8 t chacun"]],
  csk: [
    ["COSMO-SkyMed 1 et 2", "juin et déc. 2007", "Delta II (Vandenberg)", "fin", "Radar bande X, 1re génération"],
    ["COSMO-SkyMed 3", "25 oct. 2008", "Delta II (Vandenberg)", "fin", "Idem"],
    ["COSMO-SkyMed 4", "6 nov. 2010", "Delta II (Vandenberg)", "op", "Idem"],
    ["CSG-1", "18 déc. 2019", "Soyouz (Kourou)", "op", "Radar bande X, 2e génération"],
    ["CSG-2", "31 janv. 2022", "Falcon 9 (Cap Canaveral)", "op", "Idem"],
    ["CSG-3", "janv. 2026", "Falcon 9", "op", "Idem"],
    ["CSG-4", "≈ 2027", "Vega-C (Kourou)", "dev", "Idem"]],
  syracuse: [
    ["Syracuse 3A", "13 oct. 2005", "Ariane 5 (Kourou)", "op", "Bandes SHF et EHF"],
    ["Syracuse 3B", "11 août 2006", "Ariane 5 (Kourou)", "op", "Idem"],
    ["Syracuse 4A", "24 oct. 2021", "Ariane 5 (Kourou)", "op", "Bandes X et Ka militaire, durci"],
    ["Syracuse 4B", "5 juil. 2023", "Ariane 5 (Kourou), dernier vol", "op", "Idem"]],
  sicral: [
    ["SICRAL 1", "7 févr. 2001", "Ariane 4 (Kourou)", "fin", "Bandes UHF, SHF, EHF"],
    ["SICRAL 1B", "20 avr. 2009", "Zenit (Sea Launch)", "op", "Idem"],
    ["SICRAL 2", "26 avr. 2015", "Ariane 5 (Kourou)", "op", "Bandes UHF et SHF ; partagé avec la France"],
    ["SICRAL 3", "à venir", "—", "dev", "En développement"]],
  athenafidus: [["Athena-Fidus", "6 févr. 2014", "Ariane 5 (Kourou)", "op", "Bandes EHF et Ka ; 3 080 kg ; durée de vie de 15 ans"]],
  spainsat: [
    ["SpainSat NG I", "29 janv. 2025", "Falcon 9", "op", "Bandes X, Ka militaire et UHF"],
    ["SpainSat NG II", "oct. 2025", "Falcon 9", "op", "Idem"]],
  satcombw: [
    ["COMSATBw-1", "1er oct. 2009", "Ariane 5 (Kourou)", "op", "Satellite de l'étape 2"],
    ["COMSATBw-2", "21 mai 2010", "Ariane 5 (Kourou)", "op", "Idem"],
    ["Étape 3 (2 satellites)", "fin des années 2020", "—", "dev", "Contrat Airbus de 2024"]],
  galg1: [
    ["GIOVE-A", "28 déc. 2005", "Soyouz (Baïkonour)", "fin", "Premier satellite d'essai (SSTL)"],
    ["GIOVE-B", "27 avr. 2008", "Soyouz (Baïkonour)", "fin", "Second satellite d'essai, horloge à maser passif"],
    ["IOV 1 à 4", "oct. 2011 et oct. 2012", "Soyouz (Kourou)", "op", "Validation en orbite, construits par Astrium et Thales Alenia Space"],
    ["FOC 1 et 2", "22 août 2014", "Soyouz (Kourou)", "op", "Laissés sur une mauvaise orbite après une anomalie du lanceur"],
    ["FOC, lancements 2015-2021", "2015 à 2021", "Soyouz puis Ariane 5 (4 satellites par vol)", "op", "Satellites OHB, charges utiles SSTL"],
    ["FOC, lancements L12 et L13", "avr. et sept. 2024", "Falcon 9", "op", "Recours à SpaceX pendant la transition vers Ariane 6"],
    ["FOC, lancement L14 (SAT 33 et 34)", "17 déc. 2025", "Ariane 6 (Kourou)", "op", "Premier lancement Galileo sur Ariane 6"]],
  galg2: [
    ["Lot 1 : 6 satellites", "à partir de 2026 (annoncé)", "Ariane 6", "dev", "Construits par Airbus DS Allemagne"],
    ["Lot 2 : 6 satellites", "à partir de 2026 (annoncé)", "Ariane 6", "dev", "Construits par Thales Alenia Space Italie"]],
  kineis: [["25 nanosatellites", "2024 à 2025, en 5 lancements", "Electron (Rocket Lab)", "op", "Charges de collecte de données dérivées d'Argos"]],
  ariane6: [
    ["VA262", "9 juil. 2024", "Ariane 62", "fin", "Vol inaugural ; anomalie de l'étage supérieur en fin de mission"],
    ["VA263", "6 mars 2025", "Ariane 62", "fin", "CSO-3, premier vol commercial"],
    ["VA264", "13 août 2025", "Ariane 62", "fin", "MetOp-SG A1 et Sentinel-5"],
    ["VA265", "4 nov. 2025", "Ariane 62", "fin", "Sentinel-1D"],
    ["VA266", "17 déc. 2025", "Ariane 62", "fin", "Galileo L14"],
    ["VA267", "12 févr. 2026", "Ariane 64", "fin", "1er Ariane 64 : 32 satellites Amazon Leo"],
    ["VA268", "30 avr. 2026", "Ariane 64", "fin", "32 satellites Amazon Leo"],
    ["VA269", "17 juin 2026", "Ariane 64", "fin", "36 satellites Amazon Leo"],
    ["VA270", "27 août 2026", "Ariane 62", "fin", "MTG-I2"],
    ["VA271", "23 nov. 2026 (prévu)", "Ariane 64", "plan", "36 satellites Amazon Leo"]],
  vega: [
    ["VV21", "13 juil. 2022", "Vega-C", "fin", "Vol inaugural de Vega-C"],
    ["VV22", "21 déc. 2022", "Vega-C", "fin", "Échec : perte de Pléiades Neo 5 et 6"],
    ["VV24", "5 sept. 2024", "Vega", "fin", "Sentinel-2C, dernier vol de Vega"],
    ["VV25", "5 déc. 2024", "Vega-C", "fin", "Retour en vol : Sentinel-1C"],
    ["VV26", "29 avr. 2025", "Vega-C", "fin", "Biomass"],
    ["VV27", "juil. 2025", "Vega-C", "fin", "CO3D et MicroCarb"],
    ["VV29", "19 mai 2026", "Vega-C", "fin", "SMILE"],
    ["VV30", "15 sept. 2026", "Vega-C", "fin", "Sentinel-3C et FLEX"],
    ["VV31", "déc. 2026 (prévu)", "Vega-C", "plan", "Satellites IRIDE"]],
  isar: [
    ["Vol 1", "30 mars 2025", "Spectrum (Andøya)", "fin", "Échec 30 s après le décollage"],
    ["Vol 2", "5 sept. 2026", "Spectrum (Andøya)", "fin", "Orbite atteinte, charges utiles larguées"]]
};
