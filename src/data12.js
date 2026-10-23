/* ============================================================
   Atlas du spatial européen — vague de veille (23 octobre 2026)
   Faits repérés dans la veille marketing et la presse spécialisée,
   chacun rattaché à sa source publique d'origine.
   Part de la France dans les programmes de l'ESA (souscriptions CM25).
   ============================================================ */
const V12 = "2026-10-23";
const S2 = (u, t, pub) => S(u, t, pub, V12);
const P12 = id => PROGRAMMES.find(p => p.id === id);
const A12 = id => ACTEURS.find(a => a.id === id);
const O12 = id => OPPORTUNITES.find(o => o.id === id);
const addPr = (actId, ...progs) => { const a = A12(actId); if (a) progs.forEach(p => { if (!a.pr.includes(p)) a.pr.push(p); }); };

const SRC12 = {
  ohbmeo: S2("https://www.satellitetoday.com/connectivity/2026/08/31/ohb-to-build-18-meo-satellites-for-iris%C2%B2-in-nearly-e1b-award/", "Via Satellite – OHB construira 18 satellites MEO d'IRIS² (près de 1 Md€)", "2026-08-31"),
  ohbmeo2: S2("https://europeanspaceflight.com/?p=6940", "European Spaceflight – SES confie à OHB 1 Md€ pour les satellites MEO d'IRIS²", "2026-08-31"),
  cassiopee: S2("https://www.airbus.com/en/newsroom/press-releases/2026-09-airbus-and-unseenlabs-to-build-frances-next-military-signal-intelligence-satellites", "Airbus – Airbus et Unseenlabs construiront les futurs satellites ROEM français (CASSIOPÉE)", "2026-09-11"),
  spng3: S2("https://www.airbus.com/en/newsroom/press-releases/2026-07-airbus-awarded-contract-for-spainsat-ng-iii-secure-communications-satellite", "Airbus – Contrat SpainSat NG-III", "2026-07-31"),
  spng3tas: S2("https://www.thalesaleniaspace.com/en/press-releases/hisdesat-strengthens-strategic-capabilities-spains-ministry-defence-spainsat-ng-iii", "Thales Alenia Space – SpainSat NG III : 48 mois, lancement au 3e trimestre 2030", "2026-07-31"),
  spng2: S2("https://spacecenter.gov.ua/novyny/kompaniya-indra-group-spisuye-poshkodzhenij-spainsat-ng-2.html?lang=en", "Agence spatiale ukrainienne (relais) – Indra passe SpainSat NG 2 en perte", "2026-01-16"),
  spng2b: S2("https://www.satellitetoday.com/government-military/2026/01/04/indra-group-discloses-debris-impact-to-spainsat-ng-ii-satellite", "Via Satellite – Impact de débris sur SpainSat NG II", "2026-01-04"),
  nigcom: S2("https://spaceinafrica.com/2026/09/14/thales-alenia-space-wins-contract-to-build-nigcomsat-2a/", "Space in Africa – Thales Alenia Space construira NigComSat-2A", "2026-09-14"),
  eshail: S2("https://aeromorning.com/en/eshailsat-awards-thales-alenia-space-geo-satellite-contract/", "AeroMorning – Es'hailSat commande un satellite Space Inspire (Eshail-3 / Türksat-Biruni)", "2026-06-30"),
  govsat2: S2("https://satnews.com/2025/07/24/govsat-orders-a-defence-telecommunications-satellite-from-thales-alenia-space", "SatNews – GovSat commande GovSat-2 à Thales Alenia Space", "2025-07-24"),
  bemil: S2("https://www.brusselstimes.com/2232601/belgium-to-launch-own-military-satellites-for-the-first-time", "Brussels Times – La Belgique lancera ses premiers satellites militaires", "2026-07-16"),
  bemil2: S2("https://fr.businessam.be/?p=265003", "Business AM – 200 M€ pour les premiers satellites militaires belges d'ici 2030", "2026-07-16"),
  reorbit: S2("https://www.reorbit.space/resources/articles/reorbit-and-sli-sign-eur150m-contract-for-small-geo-satellites", "ReOrbit – Contrat de 150 M€ avec SLI pour deux petits satellites géostationnaires", "2026-03-19"),
  reorbitA: S2("https://www.reorbit.space/resources/articles/reorbit-secures-eur45-million-to-manufacture-sovereign-satellites-and-connected-systems-for-national-security", "ReOrbit – Levée de 45 M€ (série A)", "2025-09-09"),
  a6anom: S2("https://satnews.com/2026/09/20/ariane-6-turbopump-anomaly-delays-launch-cadence-capping-2026-flight-operations-at-six-missions/", "SatNews – Anomalie de turbopompe : Ariane 6 limitée à six vols en 2026", "2026-09-20"),
  a6contrats: S2("https://www.arianespace.com/news/ariane-6-builds-on-commercial-success-at-the-international-space-summit-with-its-largest-order-intake-since-entering-service/", "Arianespace – Plus grosse prise de commandes d'Ariane 6 (Sommet de Paris)", "2026-09-10"),
  elc: S2("https://europeanspaceflight.com/?p=6933", "European Spaceflight – L'ESA attribue 544 M€ de contrats European Launcher Challenge", "2026-08-27"),
  isar: S2("https://space.com/space-exploration/launches-spacecraft/isar-aerospace-second-launch-norway-andoya-spaceport-spectrum-rocket", "Space.com – Le Spectrum d'Isar Aerospace atteint l'orbite", "2026-09-05"),
  orbex: S2("https://advanced-television.com/2026/02/19/end-of-the-road-for-orbex/", "Advanced Television – Fin de parcours pour Orbex", "2026-02-19"),
  maia: S2("https://www.maia-space.com/news/380/", "MaiaSpace – La MaiaFactory de Vernon", "2026-05-21"),
  latitude: S2("https://europeanspaceflight.com/?p=6710", "European Spaceflight – Latitude fera son vol inaugural depuis Oman", "2026-07-01"),
  hypr: S2("https://lebonbon.fr/bordeaux/news/plus-grande-boulangerie-monde-vient-ouvrir-pres-bordeaux-fabrique-fusees/", "Le Bonbon – HyPrSpace inaugure son usine du Haillan", "2026-10-01"),
  sirius: S2("https://www.spacelaunchschedule.com/space-news/sirius-space-fires-complete-star-1-rocket-engine-for-the-first-time/", "Space Launch Schedule – Sirius Space allume pour la première fois son moteur STAR-1 complet", "2026-09-13"),
  tecC: S2("https://pulse2.com/the-exploration-company-raises-450-million-series-c-co-led-by-bessemer-atomico-and-scaleup-europe-fund/", "Pulse 2.0 – The Exploration Company lève 450 M$ (série C)", "2026-09-08"),
  ocTacsys: S2("https://open-cosmos.com/news/open-cosmos-tacsys-mod-framework", "Open Cosmos – Fournisseur agréé du cadre TacSys (8 Md£) du gouvernement britannique", "2026-09-02"),
  uspaceT: S2("https://www.01net.it/u-space-and-tenchijin-announce-strategic-partnership-in-the-view-to-deploy-next-generation-infrared-earth-observation-system/", "U-Space et Tenchijin – Partenariat pour un système d'observation infrarouge", "2026-09-10"),
  io: S2("https://www.infiniteorbits.io/post/infinite-orbits-opens-new-ait-facility-in-toulouse-to-scale-its-next-generation-of-in-orbit-services", "Infinite Orbits – Nouvelle installation d'intégration de 1 000 m² à Toulouse", "2026-09-08"),
  orora: S2("https://ororatech.com/resources/news-blog/eutelsat-and-ororatech-partner-to-deploy-up-to-96-thermal-infrared-payloads", "OroraTech – Jusqu'à 96 charges utiles thermiques sur les futurs satellites OneWeb", "2026-09-09"),
  spacebel: S2("https://spaceinafrica.com/2026/06/19/drc-signs-deal-with-spacebel-to-develop-its-first-earth-observation-satellite/", "Space in Africa – La RDC confie à Spacebel son premier satellite d'observation", "2026-06-19"),
  iceyePT: S2("https://www.iceye.com/newsroom/press-releases/portugal-acquires-two-additional-iceye-sar-satellites-to-scale-sovereign-intelligence-from-space", "ICEYE – Le Portugal acquiert deux satellites radar supplémentaires", "2026-06-17"),
  constellr: S2("https://aviationweek.com/space/satellites/constellr-picks-space-inventor-new-thermal-satellites", "Aviation Week – Constellr choisit Space Inventor pour deux satellites thermiques", "2026-08-25"),
  tac: S2("https://www.futura-sciences.com/sciences/actualites/service-orbite-europe-pourrait-prendre-vitesse-grandes-puissances-cette-technologie-spatiale-inedite-interview-134220/", "Futura – Projet TAC d'Osmos X et Arcspace (Fonds européen de défense)", "2026-05-17"),
  gatewayR: S2("https://www.bnnbloomberg.ca/business/2026/03/24/nasa-to-spend-us20-billion-on-moon-base-cancel-orbiting-lunar-station/", "Reuters (BNN Bloomberg) – La NASA abandonne la station lunaire au profit d'une base de surface", "2026-03-24"),
  gatewayT: S2("https://www.theregister.com/2026/03/24/goodbye_lunar_gateway_nasa_ditches/", "The Register – La NASA met Gateway en pause « sous sa forme actuelle »", "2026-03-24"),
  cm25: S2("https://www.rymdstyrelsen.se/contentassets/6de457f7799045f2bfce0332c8f003c4/esa_c-m_2025_100rev.5_en.pdf", "ESA/C-M(2025)100 rev.5 – Souscriptions des États membres au CM25 (document publié par l'agence spatiale suédoise)", "2025-11"),
  esafund: S2("https://www.esa.int/About_Us/Corporate_news/Funding", "ESA – Financement : programmes obligatoires et facultatifs", null)
};

/* ---------- Acteurs ajoutés ---------- */
ACTEURS.push(
  { id: "reorbit", n: "ReOrbit", c: "nsdat", p: "FI", v: "Helsinki", t: "Start-up", y: null,
    m: "Constructeur finlandais de satellites souverains : plateforme de télécoms sécurisées Silta, système de renseignement Ukko. Deux petits satellites géostationnaires vendus à SLI (150 M€, mars 2026).", k: "", kb: "", pr: ["reorbit-sli"], u: SRC12.reorbit.u },
  { id: "spacebel", n: "Spacebel", c: "equip", p: "BE", v: "Belgique", t: "Entreprise industrielle", y: null,
    m: "Logiciels et systèmes spatiaux. Fournira à la République démocratique du Congo un satellite d'observation de 250 kg à charge utile hyperspectrale (accord de juin 2026).", k: "", kb: "", pr: [], u: SRC12.spacebel.u },
  { id: "sirius-space", n: "Sirius Space Services", c: "lanc", p: "FR", v: "Île-de-France", t: "Start-up", y: 2020,
    m: "Famille de lanceurs semi-réutilisables Sirius 1, 13 et 15 au méthane et oxygène liquides. Premier allumage du moteur STAR-1 complet, annoncé en septembre 2026.", k: "", kb: "", pr: [], u: SRC12.sirius.u },
  { id: "space-inventor", n: "Space Inventor", c: "nsdat", p: "DK", v: "Danemark", t: "PME", y: null,
    m: "Constructeur danois de petits satellites ; deux satellites thermiques commandés par Constellr, lancement prévu en 2028.", k: "", kb: "", pr: [], u: SRC12.constellr.u },
  { id: "defense-belge", n: "Défense belge", c: "inst", p: "BE", v: "Bruxelles", t: "Ministère", y: null,
    m: "Ministère belge de la Défense : environ 200 M€ annoncés en juillet 2026 pour les premiers satellites militaires du pays, en orbite d'ici 2030.", k: "", kb: "", pr: ["be-milsat"], u: SRC12.bemil.u },
  { id: "osmosx", n: "Osmos X", c: "nsorb", p: "FR", v: "France", t: "Start-up", y: null,
    m: "Véhicule de transfert orbital réutilisable Thorus, à propulsion plasma. Coordonne le projet TAC (capture par soudage, avec Arcspace), retenu par le Fonds européen de défense.", k: "", kb: "", pr: [], u: SRC12.tac.u }
);
(function () {
  const app = (id, txt) => { const a = A12(id); if (a && !a.m.includes(txt.slice(0, 30))) a.m += " " + txt; };
  app("open-cosmos", "Fournisseur agréé du cadre britannique TacSys de communications souveraines (8 Md£ pour l'ensemble du cadre, sept. 2026) ; levée de 300 M€ (sept. 2026).");
  app("u-space", "Partenariat avec le japonais Tenchijin (sept. 2026) : U-Space concevra, fabriquera et livrera une constellation d'observation infrarouge thermique.");
  app("infinite-orbits", "Installation d'intégration de 1 000 m² ouverte à Toulouse en septembre 2026 (services Orbit Guard et Endurance).");
  app("hyprspace", "Usine de 7 000 m² inaugurée au Haillan le 1er octobre 2026 : jusqu'à 15 lanceurs et une centaine de moteurs par an visés d'ici 2030.");
  app("the-exploration-company", "Série C de 450 M$ (sept. 2026), environ 680 M$ levés au total.");
  app("unseenlabs", "Co-traitant d'Airbus pour CASSIOPÉE, cœur souverain du programme CÉLESTE (sept. 2026).");
  addPr("ses", "iris2"); addPr("ohb-system", "iris2"); addPr("unseenlabs", "ceres"); addPr("airbus-ds", "ceres", "spainsat");
  addPr("tas", "nigcomsat", "govsat2"); addPr("hisdesat", "spainsat"); addPr("ororatech", "eutelsat"); addPr("constellr");
})();

/* ---------- Programmes ajoutés ---------- */
PROGRAMMES.push(
  { id: "nigcomsat", n: "NigComSat-2A", d: "tcm", sub: "Satellite géostationnaire du Nigeria, construit par Thales Alenia Space",
    fin: "NIGCOMSAT (opérateur national nigérian)", moa: "NIGCOMSAT", moe: "Thales Alenia Space", g: ["tas"], plat: "Spacebus B2 (près de 4 t au lancement)",
    instr: "Charge utile multibande : C, Ku, Ka et L", app: "Télédiffusion, haut débit et communications, en priorité pour les zones mal desservies.",
    bud: "Non documenté", bc: "A", y0: 2026, y1: 2045, jal: [[2026, "Contrat annoncé (14 sept.)"]], st: "dev", pred: [], succ: [],
    note: "Contrat à l'export d'un maître d'œuvre européen. Le constructeur annonce environ 24 mois jusqu'à l'orbite pour cette gamme." },
  { id: "govsat2", n: "GovSat-2", d: "dtl", sub: "Satellite de télécommunications de défense luxembourgeois",
    fin: "LuxGovSat (coentreprise du gouvernement luxembourgeois et de SES)", moa: "LuxGovSat", moe: "Thales Alenia Space", g: ["tas"], plat: "Spacebus 4000B2",
    instr: "Charge utile de défense en bandes X, Ka et UHF", app: "Télécommunications sécurisées et résistantes au brouillage pour la défense luxembourgeoise et ses partenaires.",
    bud: "Non documenté", bc: "A", y0: 2025, y1: 2045, jal: [[2025, "Commande à Thales Alenia Space (24 juil.)"]], st: "dev", pred: [], succ: [] },
  { id: "be-milsat", n: "Constellation militaire belge", d: "dob", sub: "Premiers satellites militaires de la Belgique",
    fin: "Ministère belge de la Défense", moa: "Défense belge", moe: "Non attribué publiquement", g: [], plat: "Non documenté",
    instr: "Imagerie autonome (capteurs non détaillés publiquement)", app: "Donner à la Belgique une capacité d'imagerie spatiale propre.",
    bud: "Environ 200 M€ annoncés (juil. 2026)", bc: "B", y0: 2026, y1: 2035, jal: [[2026, "Annonce du ministre de la Défense (16 juil.)"], [2030, "Premiers satellites en orbite visés"]], st: "plan", pred: [], succ: [],
    pros: "Programme annoncé sans maître d'œuvre publié : achat à suivre." },
  { id: "reorbit-sli", n: "Petits satellites géostationnaires ReOrbit pour SLI", d: "tcm", sub: "Deux satellites de communication géostationnaires définis par logiciel",
    fin: "SLI (ex-Space Leasing International, groupe Libra), qui loue les satellites aux opérateurs", moa: "SLI", moe: "ReOrbit (Finlande)", g: ["autre"], plat: "Petite plateforme géostationnaire ReOrbit (masse non publiée)",
    instr: "Charges utiles de communication définies par logiciel", app: "Proposer aux opérateurs des petits satellites géostationnaires souverains en location plutôt qu'à l'achat.",
    bud: "150 M€ (contrat de deux satellites)", bc: "A", y0: 2026, y1: 2040, jal: [[2026, "Contrat avec SLI (19 mars)"]], st: "dev", pred: [], succ: [],
    note: "Calendrier de livraison non publié." }
);
Object.assign(ORBITES, { nigcomsat: "Géostationnaire", govsat2: "Géostationnaire", "reorbit-sli": "Géostationnaire", "be-milsat": "Orbite basse (probable, non documenté)" });
["nigcomsat", "govsat2", "reorbit-sli"].forEach(id => { const p = P12(id); if (p && !p.orb) p.orb = ORBITES[id]; });
Object.assign(PARC, { nigcomsat: { orb: 0, srv: 0, prv: 1, m: 4000, bc: "A" }, govsat2: { orb: 0, srv: 0, prv: 1, m: null, bc: "A" }, "reorbit-sli": { orb: 0, srv: 0, prv: 2, m: null, bc: "A" } });
Object.assign(LIENS, {
  nigcomsat: [L("Référence", SRC12.nigcom.t, SRC12.nigcom.u), L("Industriel", "Thales Alenia Space – Communiqué NigComSat-2A", "https://www.thalesgroup.com/fr/actualites-du-groupe/communiques-de-presse/nigcomsat-commande-thales-alenia-space-un-satellite-de")],
  govsat2: [L("Référence", SRC12.govsat2.t, SRC12.govsat2.u), L("Industriel", "Thales Alenia Space – GovSat commande un satellite de défense", "https://www.thalesgroup.com/fr/actualites-du-groupe/communiques-de-presse/govsat-commande-un-satellite-de-telecommunications-de")],
  "be-milsat": [L("Référence", SRC12.bemil.t, SRC12.bemil.u), L("Référence", SRC12.bemil2.t, SRC12.bemil2.u)],
  "reorbit-sli": [L("Industriel", SRC12.reorbit.t, SRC12.reorbit.u), L("Référence", "Rocket Launch Schedule – ReOrbit vend deux petits satellites géostationnaires à SLI", "https://www.rocketlaunchschedule.com/space-news/reorbit-sells-two-small-geo-satellites-to-sli/amp")]
});

/* ---------- Corrections et compléments ---------- */
(function () {
  const jal = (id, ...js) => { const p = P12(id); if (p) js.forEach(j => { if (!p.jal.some(x => x[0] === j[0] && x[1] === j[1])) p.jal.push(j); }); };
  const lien = (id, s, type) => addLien(id, L(type || "Référence", s.t, s.u));
  // IRIS² : couche en orbite moyenne
  const ir = P12("iris2");
  if (ir) { ir.moe = ir.moe.replace("SES : couche de 18 satellites en orbite moyenne", "SES : couche de 18 satellites en orbite moyenne, plateformes OHB (près de 1 Md€, août 2026), charges utiles SES"); }
  jal("iris2", [2026, "OHB retenu par SES pour les 18 plateformes MEO (31 août)"], [2030, "Premiers services de la couche MEO visés"]);
  lien("iris2", SRC12.ohbmeo);
  // Ariane 6
  jal("ariane6", [2026, "Anomalie de turbopompe : six vols au plus en 2026 (sept.)"], [2026, "Une dizaine de lancements commandés au Sommet de Paris (10 sept.)"]);
  lien("ariane6", SRC12.a6anom); lien("ariane6", SRC12.a6contrats, "Industriel");
  // Orbex
  const ob = P12("orbex");
  if (ob) { ob.st = "ann"; ob.note = "Orbex a cessé ses activités le 18 février 2026 ; administrateurs nommés (FRP Advisory) pour une éventuelle cession. Skyrora s'est dit intéressé par certains actifs."; }
  jal("orbex", [2026, "Cessation d'activité (18 févr.)"]); lien("orbex", SRC12.orbex);
  // Gateway
  const gw = P12("gateway");
  if (gw) { gw.st = "ann"; gw.note = (gw.note ? gw.note + " " : "") + "Le 24 mars 2026, la NASA a mis Gateway en pause « sous sa forme actuelle » au profit d'une base à la surface de la Lune ; le sort du matériel européen déjà construit (I-Hab, structure de HALO par Thales Alenia Space) n'est pas tranché."; }
  jal("gateway", [2026, "La NASA abandonne la station lunaire (24 mars)"]); lien("gateway", SRC12.gatewayR); lien("gateway", SRC12.gatewayT);
  // SpainSat NG
  const sp = P12("spainsat");
  if (sp) { sp.note = (sp.note ? sp.note + " " : "") + "SpainSat NG II, touché par une micrométéorite pendant sa mise à poste, a été passé en perte en janvier 2026. SpainSat NG III le remplace : contrat de juillet 2026, 48 mois de développement, lancement au 3e trimestre 2030."; sp.y1 = Math.max(sp.y1, 2045); sp.moe = "Airbus DS (Espagne), avec Thales Alenia Space Espagne pour les charges utiles UHF et Ka militaire"; }
  jal("spainsat", [2026, "Perte de NG II (janv.) ; commande de NG III (31 juil.)"], [2030, "Lancement de NG III (3e trimestre)"]);
  if (UNITES.spainsat) { const r = UNITES.spainsat.find(x => x[0] === "SpainSat NG II"); if (r) { r[3] = "fin"; r[4] = "Perdu : impact de micrométéorite pendant la mise à poste, passé en perte en janv. 2026"; } if (!UNITES.spainsat.some(x => x[0] === "SpainSat NG III")) UNITES.spainsat.push(["SpainSat NG III", "3e trim. 2030 (prévu)", "Non publié", "dev", "Remplace NG II ; charges utiles Thales Alenia Space Espagne"]); }
  if (PARC.spainsat) Object.assign(PARC.spainsat, { srv: 1, prv: 1 });
  lien("spainsat", SRC12.spng3, "Industriel"); lien("spainsat", SRC12.spng3tas, "Industriel"); lien("spainsat", SRC12.spng2);
  // CERES et Céleste : CASSIOPÉE
  const ce = P12("ceres");
  if (ce) { ce.moe = "CERES : Airbus DS et Thales ; CASSIOPÉE (cœur souverain de CÉLESTE) : Airbus DS, avec Unseenlabs comme co-traitant"; ce.note = "CASSIOPÉE, notifié par la DGA en septembre 2026, prendra la relève des satellites CERES d'ici 2032, sur la plateforme S250 d'Airbus (celle de CO3D). Nombre de satellites et montant non publiés."; ce.y1 = Math.max(ce.y1, 2040); }
  jal("ceres", [2026, "CASSIOPÉE notifié à Airbus et Unseenlabs (11 sept.)"], [2032, "Relève de CERES par CASSIOPÉE"]); lien("ceres", SRC12.cassiopee, "Industriel");
  // Space Inspire : Es'hailSat
  const si = P12("spaceinspire");
  if (si) { si.moa = si.moa.replace("Arabsat, Eutelsat (Flexsat)…", "Arabsat, Eutelsat (Flexsat), Es'hailSat avec Türksat (Eshail-3 / Türksat-Biruni)…"); }
  jal("spaceinspire", [2026, "Commande d'Es'hailSat : Eshail-3 / Türksat-Biruni (30 juin)"]); if (PARC.spaceinspire) PARC.spaceinspire.prv = 7; lien("spaceinspire", SRC12.eshail);
  // Lanceurs du European Launcher Challenge
  jal("pld", [2026, "Contrat ELC de l'ESA : 158,9 M€ (27 août)"]); jal("rfa", [2026, "Contrat ELC de l'ESA : 186,9 M€ (27 août)"]); jal("isar", [2026, "Contrat ELC de l'ESA : 197,8 M€ (27 août)"]);
  jal("maiaspace", [2026, "Contrat ELC encore en négociation (août)"], [2027, "MaiaFactory de Vernon en service (2e semestre)"]);
  ["pld", "rfa", "isar", "maiaspace"].forEach(id => lien(id, SRC12.elc)); lien("isar", SRC12.isar); lien("maiaspace", SRC12.maia, "Industriel");
  jal("latitude", [2027, "Vol inaugural visé depuis Etlaq (Oman), fin 2027"]); if (P12("latitude")) lien("latitude", SRC12.latitude);
  // Retour de cargo
  jal("cargo", [2026, "Série C de 450 M$ de The Exploration Company (8 sept.)"], [2028, "Lancement de Nyx sur Ariane 64 (contrat Arianespace)"]); lien("cargo", SRC12.tecC); lien("cargo", SRC12.a6contrats, "Industriel");
  // Constellation Atlantique : radars portugais
  jal("atlantic", [2026, "Le Portugal commande deux satellites radar ICEYE de plus (17 juin)"]); lien("atlantic", SRC12.iceyePT, "Industriel");
})();
RELATIONS.push(
  { de: "ohb-system", vers: "iris2", type: "maître d'œuvre", txt: "18 plateformes de la couche en orbite moyenne, pour SES (près de 1 Md€, août 2026).", bc: "A", src: SRC12.ohbmeo.u },
  { de: "unseenlabs", vers: "ceres", type: "partenaire", txt: "Co-traitant de CASSIOPÉE : planification de mission, traitements, segment sol, charge utile.", bc: "A", src: SRC12.cassiopee.u },
  { de: "tas", vers: "nigcomsat", type: "maître d'œuvre", txt: "Satellite Spacebus B2 de près de 4 t.", bc: "A", src: SRC12.nigcom.u },
  { de: "tas", vers: "govsat2", type: "maître d'œuvre", txt: "Satellite Spacebus 4000B2, charges utiles X, Ka et UHF.", bc: "A", src: SRC12.govsat2.u },
  { de: "ses", vers: "govsat2", type: "partenaire", txt: "Coactionnaire de LuxGovSat avec le gouvernement luxembourgeois.", bc: "A", src: SRC12.govsat2.u },
  { de: "reorbit", vers: "reorbit-sli", type: "maître d'œuvre", txt: "Deux petits satellites géostationnaires, contrat de 150 M€.", bc: "A", src: SRC12.reorbit.u },
  { de: "ororatech", vers: "eutelsat", type: "partenaire", txt: "Capacité réservée pour 48 charges utiles thermiques sur de futurs satellites OneWeb, option pour 48 de plus.", bc: "A", src: SRC12.orora.u },
  { de: "space-inventor", vers: "constellr", type: "fournisseur", a: 2026, txt: "Deux satellites thermiques commandés, lancement prévu en 2028.", bc: "A", src: SRC12.constellr.u }
);

/* ---------- Opportunités : mises à jour et ajouts ---------- */
(function () {
  const m = O12("iris2-meo");
  if (m) Object.assign(m, {
    titre: "IRIS² : 18 plateformes OHB pour la couche en orbite moyenne", acheteur: ["ohb-system"], client: "ses", phase: "devb",
    lot: "Plateformes de 2,6 t et 15 kW ; charges utiles conçues et testées par SES", vol: true, statut: "probable", bc: "A",
    ech: { d: "2029", doc: true, lib: "Premier lancement prévu en 2029, services initiaux en 2030" },
    fab: { mode: "inconnu", txt: "OHB fabrique les plateformes (contrat de près de 1 Md€ notifié par SES le 31 août 2026). Sous-traitance non publiée." },
    sources: [SRC12.ohbmeo, SRC12.ohbmeo2, SRC.a24],
    action: "Identifier le site d'OHB chargé des plateformes MEO et ses consultations de sous-ensembles.", note: undefined
  });
  const asl = O12("iris2-asl");
  if (asl) { asl.ech = { d: "2030", doc: true, lib: "Lancements de la couche principale (L2) à partir de 2030 selon European Spaceflight ; 2029 selon Brussels Times" }; }
  const a6 = O12("a6-cadence");
  if (a6) { a6.note = "Une anomalie de turbopompe (sept. 2026) limite 2026 à six vols au plus ; une dizaine de lancements supplémentaires ont été commandés au Sommet de Paris."; a6.sources = a6.sources.concat([SRC12.a6anom, SRC12.a6contrats]); }
  const si = O12("spaceinspire");
  if (si) { si.titre = "Space Inspire : 7 satellites géostationnaires, premier lancement en 2027"; si.qte = { n: 7, lib: "7 satellites de la gamme commandés (dont Eshail-3 / Türksat-Biruni, juin 2026)" }; si.sources = si.sources.concat([SRC12.eshail]); }
  const us = O12("uspace");
  if (us) { us.titre = "U-Space : un satellite par semaine en 2027, constellation infrarouge avec Tenchijin"; us.sources = us.sources.concat([SRC12.uspaceT]); us.note = "Protocole d'accord (sept. 2026) : U-Space maître d'œuvre de la future constellation infrarouge de Tenchijin ; nombre de satellites non publié."; }
  const oc = O12("opencosmos");
  if (oc) { oc.sources = oc.sources.concat([SRC12.ocTacsys]); oc.note = (oc.note || "") + " Fournisseur agréé du cadre TacSys britannique (8 Md£ pour l'ensemble du cadre, pas pour la seule Open Cosmos)."; }
  const mai = O12("maia");
  if (mai) { mai.titre = "Maia : MaiaFactory de Vernon et vol inaugural en 2027"; mai.qte = { n: 20, lib: "Environ vingt étages supérieurs par an visés (un par mission), une vingtaine de lancements par an au début de la décennie suivante" }; mai.phase = "devb"; mai.sources = [SRC12.maia, SRC12.elc].concat(mai.sources); mai.site = null; }
  const ice = O12("iceye-cad");
  if (ice) ice.sources = ice.sources.concat([SRC12.iceyePT]);
  const nyx = O12("nyx");
  if (nyx) { nyx.sources = nyx.sources.concat([SRC12.tecC, SRC12.a6contrats]); nyx.ech = { d: "2028-12", doc: true, lib: "Lancement de la démonstration sur Ariane 64 dédiée (fin 2028 - mi-2029)" }; }
})();
OPPORTUNITES.push(
  { id: "cassiopee", titre: "CASSIOPÉE : successeur de CERES (Airbus et Unseenlabs)", prog: "ceres", acheteur: ["airbus-ds"], client: "dga", site: null,
    lot: "Satellites sur plateforme S250 (dérivée d'ArrOW)", metiers: ["structure", "harnais", "mli"], phase: "devb",
    ech: { d: "2032", doc: true, lib: "Relève de CERES d'ici 2032" }, qte: { n: null, lib: "Nombre de satellites non publié" },
    fab: { mode: "inconnu", txt: "Airbus maître d'œuvre et intégrateur ; Unseenlabs co-traitant (charge utile, traitements, segment sol)." },
    four: [], valeur: null, statut: "probable", lotDoc: false, vol: true, bc: "A", sources: [SRC12.cassiopee],
    action: "Programme de défense : identifier, chez Airbus, l'équipe plateforme S250 et ses besoins de sous-ensembles." },
  { id: "spainsat-ng3", titre: "SpainSat NG III : satellite de remplacement (Airbus Espagne)", prog: "spainsat", acheteur: ["airbus-ds"], client: "hisdesat", site: "airbus-getafe",
    lot: "Satellite géostationnaire et module de communication", metiers: ["structure", "harnais", "mli"], phase: "devb",
    ech: { d: "2030", doc: true, lib: "Lancement au 3e trimestre 2030, après 48 mois de développement" }, qte: { n: 1, lib: "1 satellite" },
    fab: { mode: "mixte", txt: "Airbus Espagne maître d'œuvre ; Thales Alenia Space Espagne intègre le module de communication et développe les charges utiles UHF et Ka militaire." },
    four: [], valeur: null, statut: "probable", lotDoc: false, vol: true, bc: "A", sources: [SRC12.spng3, SRC12.spng3tas],
    action: "Contrat de 48 mois commencé en juillet 2026 : vérifier rapidement les lots encore ouverts ; acteurs espagnols probablement favorisés." },
  { id: "nigcomsat", titre: "NigComSat-2A : satellite géostationnaire Spacebus B2 pour le Nigeria", prog: "nigcomsat", acheteur: ["tas"], client: null, site: null,
    lot: "Plateforme Spacebus B2 et charge utile multibande", metiers: ["structure", "harnais", "mli"], phase: "cd",
    ech: { d: "2028", doc: false, lib: "Environ 24 mois jusqu'à l'orbite selon le constructeur (date de lancement non publiée)" }, qte: { n: 1, lib: "1 satellite" },
    fab: { mode: "inconnu", txt: "Fournisseurs non publiés." }, four: [], valeur: null, statut: "probable", lotDoc: false, vol: true, bc: "A", sources: [SRC12.nigcom],
    action: "Délai court : contacter les achats de la gamme Spacebus chez Thales Alenia Space." },
  { id: "govsat2", titre: "GovSat-2 : satellite de défense luxembourgeois (Thales Alenia Space)", prog: "govsat2", acheteur: ["tas"], client: "ses", site: null,
    lot: "Plateforme Spacebus 4000B2", metiers: ["structure", "harnais", "mli"], phase: "cd",
    ech: null, qte: { n: 1, lib: "1 satellite" }, fab: { mode: "inconnu", txt: "Fournisseurs non publiés." },
    four: [], valeur: null, statut: "probable", lotDoc: false, vol: true, bc: "A", sources: [SRC12.govsat2],
    action: "Programme de défense : vérifier les lots encore ouverts." },
  { id: "be-milsat", titre: "Premiers satellites militaires belges : environ 200 M€ d'ici 2030", prog: "be-milsat", acheteur: ["defense-belge"], client: null, site: null,
    lot: "Satellites d'imagerie (non détaillés)", metiers: ["structure", "harnais", "mli"], phase: "etude",
    ech: { d: "2030", doc: true, lib: "Premiers satellites en orbite visés" }, qte: { n: null, lib: "Non documentée" },
    fab: { mode: "inconnu", txt: "Maître d'œuvre non attribué publiquement." },
    four: [], valeur: null, statut: "surveiller", lotDoc: false, vol: false, bc: "B", sources: [SRC12.bemil, SRC12.bemil2],
    action: "Suivre la procédure d'achat de la Défense belge et les candidats." },
  { id: "reorbit-sli", titre: "ReOrbit : deux petits satellites géostationnaires pour SLI", prog: "reorbit-sli", acheteur: ["reorbit"], client: null, site: null,
    lot: "Petite plateforme géostationnaire", metiers: ["structure", "harnais", "mli"], phase: "devb",
    ech: null, qte: { n: 2, lib: "2 satellites (150 M€)" }, fab: { mode: "inconnu", txt: "ReOrbit annonçait en 2025 vouloir étendre sa capacité de fabrication ; masse et calendrier non publiés." },
    four: [], valeur: null, statut: "probable", lotDoc: false, vol: true, bc: "A", sources: [SRC12.reorbit, SRC12.reorbitA],
    action: "Contacter ReOrbit (Helsinki) sur ses besoins de structure, d'isolation et de harnais pour sa plateforme géostationnaire." },
  { id: "isar-cadence", titre: "Isar Aerospace : Spectrum en orbite, production de série", prog: "isar", acheteur: ["isar"], client: null, site: null,
    lot: "Structures et harnais du lanceur", metiers: ["structure", "harnais"], phase: "serie",
    ech: { d: "2027-12", doc: true, lib: "Vols opérationnels du contrat ELC jusqu'en 2030 ; évolutions à démontrer avant fin 2028" }, qte: { n: 30, lib: "Plus de 30 lanceurs par an possibles dans l'usine près de Munich" },
    fab: { mode: "inconnu", txt: "Part sous-traitée non publiée." }, four: [], valeur: null, statut: "probable", lotDoc: false, vol: true, bc: "A", sources: [SRC12.isar, SRC12.elc],
    action: "Identifier les achats de structures et de harnais pour la montée en cadence." },
  { id: "elc-pld-rfa", titre: "PLD Space et RFA : contrats ELC, montée en cadence d'ici 2030", prog: "pld", acheteur: ["pld", "rfa"], client: "esa", site: null,
    lot: "Structures et harnais des lanceurs Miura 5 et RFA One", metiers: ["structure", "harnais"], phase: "devb",
    ech: { d: "2027-12", doc: true, lib: "Orbite à atteindre avant fin 2027 pour toucher la composante A" }, qte: { n: null, lib: "Cadence non publiée" },
    fab: { mode: "inconnu", txt: "Fournisseurs non publiés." }, four: [], valeur: null, statut: "probable", lotDoc: false, vol: true, bc: "A", sources: [SRC12.elc],
    action: "Contacter les achats de PLD Space (Elche) et de RFA (Augsbourg)." },
  { id: "hyprspace", titre: "HyPrSpace : usine du Haillan, jusqu'à 15 lanceurs par an en 2030", prog: null, acheteur: ["hyprspace"], client: null, site: null,
    lot: "Lanceurs Baguette One et Orbital Baguette", metiers: ["structure", "harnais"], phase: "devb",
    ech: { d: "2027", doc: true, lib: "Premier vol suborbital de Baguette One depuis Biscarrosse" }, qte: { n: 15, lib: "Jusqu'à 15 lanceurs et environ 100 moteurs par an visés d'ici 2030" },
    fab: { mode: "inconnu", txt: "Part fabriquée en interne non publiée par les sources lues." }, four: [], valeur: null, statut: "probable", lotDoc: false, vol: true, bc: "A", sources: [SRC12.hypr],
    action: "Contacter HyPrSpace (Le Haillan) sur ses achats de structures et de harnais." },
  { id: "spacebel-rdc", titre: "Spacebel : satellite d'observation de 250 kg pour la RDC", prog: null, acheteur: ["spacebel"], client: null, site: null,
    lot: "Satellite de 250 kg à charge utile hyperspectrale", metiers: ["structure", "harnais", "mli"], phase: "devb",
    ech: { d: "2031", doc: true, lib: "Lancement prévu dans quatre à cinq ans (accord de juin 2026)" }, qte: { n: 1, lib: "1 satellite" },
    fab: { mode: "inconnu", txt: "Plateforme et fournisseurs non publiés." }, four: [], valeur: null, statut: "probable", lotDoc: false, vol: true, bc: "A", sources: [SRC12.spacebel],
    action: "Savoir si Spacebel achète la plateforme ou la fait réaliser, et à qui." },
  { id: "constellr-si", titre: "Constellr : deux satellites thermiques Space Inventor (2028)", prog: null, acheteur: ["space-inventor"], client: "constellr", site: null,
    lot: "Petits satellites d'observation thermique", metiers: ["structure", "harnais", "mli"], phase: "devb",
    ech: { d: "2028", doc: true, lib: "Lancement prévu" }, qte: { n: 2, lib: "2 satellites" },
    fab: { mode: "inconnu", txt: "Fournisseurs non publiés." }, four: [], valeur: null, statut: "probable", lotDoc: false, vol: true, bc: "A", sources: [SRC12.constellr],
    action: "Contacter Space Inventor (Danemark)." },
  { id: "tac", titre: "TAC (Osmos X, Arcspace) : capture par soudage, Fonds européen de défense", prog: null, acheteur: ["osmosx"], client: null, site: null,
    lot: "Véhicule de transfert Thorus et démonstrateur de capture", metiers: ["structure", "harnais", "mli"], phase: "etude",
    ech: null, qte: { n: null, lib: "Projet de R&D de 30 mois, consortium de sept partenaires dans cinq pays" },
    fab: { mode: "inconnu", txt: "Montant et calendrier de démonstration non confirmés par les sources publiques lues." }, four: [], valeur: null, statut: "surveiller", lotDoc: false, vol: false, bc: "B", sources: [SRC12.tac],
    action: "Suivre l'avancement du projet et les besoins matériels d'Osmos X." }
);

/* ---------- Événements ---------- */
EVENEMENTS.push(
  { d: "2026-10-02", type: "production", act: "airbus-ds", prog: "eutelsat", metiers: [], txt: "Airbus livre les 32 premiers satellites OneWeb de nouvelle génération, sur 669 commandés.", src: S2("https://www.airbus.com/en/newsroom/press-releases/2026-10-airbus-delivers-first-batch-of-next-generation-satellites-for-eutelsats-oneweb-constellation", "Airbus – Premier lot de satellites OneWeb de nouvelle génération", "2026-10-02"), bc: "A", opp: "ow-serie" },
  { d: "2026-10-01", type: "site", act: "hyprspace", prog: null, metiers: [], txt: "HyPrSpace inaugure une usine de 7 000 m² au Haillan.", src: SRC12.hypr, bc: "A", opp: "hyprspace" },
  { d: "2026-09-20", type: "cadence", act: "arianegroup", prog: "ariane6", metiers: [], txt: "Anomalie de turbopompe : Ariane 6 limitée à six vols au plus en 2026.", src: SRC12.a6anom, bc: "A", opp: "a6-cadence" },
  { d: "2026-09-14", type: "contrat", act: "tas", prog: "nigcomsat", metiers: [], txt: "Thales Alenia Space construira NigComSat-2A (Spacebus B2).", src: SRC12.nigcom, bc: "A", opp: "nigcomsat" },
  { d: "2026-09-11", type: "contrat", act: "airbus-ds", prog: "ceres", metiers: [], txt: "La DGA notifie CASSIOPÉE à Airbus et Unseenlabs, successeur de CERES.", src: SRC12.cassiopee, bc: "A", opp: "cassiopee" },
  { d: "2026-09-10", type: "tranche", act: "arianespace", prog: "ariane6", metiers: [], txt: "Une dizaine de lancements d'Ariane 64 commandés : Amazon Leo (6), OneWeb (2), Nyx, KT SAT.", src: SRC12.a6contrats, bc: "A", opp: "a6-cadence" },
  { d: "2026-09-10", type: "charge", act: "u-space", prog: "ares", metiers: [], txt: "U-Space et Tenchijin s'associent pour une constellation d'observation infrarouge.", src: SRC12.uspaceT, bc: "A", opp: "uspace" },
  { d: "2026-09-09", type: "charge", act: "ororatech", prog: "eutelsat", metiers: [], txt: "OroraTech réserve 48 charges utiles thermiques (option pour 48 de plus) sur de futurs satellites OneWeb.", src: SRC12.orora, bc: "A", opp: "ow-serie" },
  { d: "2026-09-08", type: "site", act: "infinite-orbits", prog: null, metiers: [], txt: "Infinite Orbits ouvre une installation d'intégration de 1 000 m² à Toulouse.", src: SRC12.io, bc: "A", opp: null },
  { d: "2026-09-08", type: "cadence", act: "the-exploration-company", prog: "cargo", metiers: [], txt: "The Exploration Company lève 450 M$ pour Nyx et le moteur Storm.", src: SRC12.tecC, bc: "A", opp: "nyx" },
  { d: "2026-09-05", type: "constellation", act: "isar", prog: "isar", metiers: [], txt: "Le Spectrum d'Isar Aerospace atteint l'orbite à son deuxième vol.", src: SRC12.isar, bc: "A", opp: "isar-cadence" },
  { d: "2026-09-02", type: "contrat", act: "open-cosmos", prog: "atlantic", metiers: [], txt: "Open Cosmos devient fournisseur agréé du cadre britannique TacSys (8 Md£ pour l'ensemble du cadre).", src: SRC12.ocTacsys, bc: "A", opp: "opencosmos" },
  { d: "2026-08-31", type: "contrat", act: "ohb-system", prog: "iris2", metiers: ["structure", "harnais", "mli"], txt: "SES confie à OHB 18 plateformes de la couche MEO d'IRIS² (près de 1 Md€).", src: SRC12.ohbmeo, bc: "A", opp: "iris2-meo" },
  { d: "2026-08-27", type: "contrat", act: "esa", prog: "pld", metiers: [], txt: "European Launcher Challenge : 197,8 M€ pour Isar, 186,9 M€ pour RFA, 158,9 M€ pour PLD Space ; MaiaSpace encore en négociation.", src: SRC12.elc, bc: "A", opp: "elc-pld-rfa" },
  { d: "2026-08-25", type: "contrat", act: "space-inventor", prog: null, metiers: [], txt: "Constellr commande deux satellites thermiques à Space Inventor.", src: SRC12.constellr, bc: "A", opp: "constellr-si" },
  { d: "2026-07-31", type: "contrat", act: "airbus-ds", prog: "spainsat", metiers: [], txt: "Hisdesat commande SpainSat NG III à Airbus, avec Thales Alenia Space Espagne.", src: SRC12.spng3, bc: "A", opp: "spainsat-ng3" },
  { d: "2026-07-16", type: "constellation", act: "defense-belge", prog: "be-milsat", metiers: [], txt: "La Belgique annonce environ 200 M€ pour ses premiers satellites militaires d'ici 2030.", src: SRC12.bemil, bc: "B", opp: "be-milsat" },
  { d: "2026-07-01", type: "charge", act: "latitude", prog: null, metiers: [], txt: "Latitude prévoit son vol inaugural depuis Oman fin 2027.", src: SRC12.latitude, bc: "A", opp: null },
  { d: "2026-06-30", type: "contrat", act: "tas", prog: "spaceinspire", metiers: [], txt: "Es'hailSat commande un Space Inspire, exploité avec Türksat.", src: SRC12.eshail, bc: "A", opp: "spaceinspire" },
  { d: "2026-06-19", type: "contrat", act: "spacebel", prog: null, metiers: [], txt: "La RDC confie à Spacebel un satellite d'observation de 250 kg.", src: SRC12.spacebel, bc: "A", opp: "spacebel-rdc" },
  { d: "2026-06-17", type: "contrat", act: "iceye", prog: "atlantic", metiers: [], txt: "Le Portugal achète deux satellites radar ICEYE de plus (quatre au total).", src: SRC12.iceyePT, bc: "A", opp: "iceye-cad" },
  { d: "2026-05-21", type: "site", act: "maiaspace", prog: "maiaspace", metiers: [], txt: "MaiaFactory de Vernon : environ 12 000 m², en service au 2e semestre 2027.", src: SRC12.maia, bc: "A", opp: "maia" },
  { d: "2026-05-17", type: "contrat", act: "osmosx", prog: null, metiers: [], txt: "Le projet TAC d'Osmos X et Arcspace est retenu par le Fonds européen de défense.", src: SRC12.tac, bc: "B", opp: "tac" },
  { d: "2026-03-24", type: "charge", act: "esa", prog: "gateway", metiers: [], txt: "La NASA abandonne Gateway au profit d'une base de surface ; sort des modules européens non tranché.", src: SRC12.gatewayR, bc: "A", opp: null },
  { d: "2026-03-19", type: "contrat", act: "reorbit", prog: "reorbit-sli", metiers: [], txt: "ReOrbit vend deux petits satellites géostationnaires à SLI (150 M€).", src: SRC12.reorbit, bc: "A", opp: "reorbit-sli" },
  { d: "2026-02-18", type: "charge", act: "orbex", prog: "orbex", metiers: [], txt: "Orbex cesse ses activités ; administrateurs nommés.", src: SRC12.orbex, bc: "A", opp: null },
  { d: "2026-01-16", type: "tranche", act: "hisdesat", prog: "spainsat", metiers: [], txt: "SpainSat NG II passé en perte après un impact de micrométéorite ; remplacement par NG III.", src: SRC12.spng2, bc: "A", opp: "spainsat-ng3" }
);

/* ---------- Part de la France dans les programmes de l'ESA ----------
   Programmes facultatifs : souscription française / total couvert au CM25 (calcul de l'atlas,
   à partir du document ESA/C-M(2025)100 rev.5 ; conditions économiques différentes selon les lignes).
   Programme scientifique : obligatoire, financé selon un barème fondé sur le revenu national. */
const FR_ESA = {
  csc4: { env: "Copernicus, composante spatiale CSC-4 (phases 1 à 3)", fr: 717.27, tot: 3115.25 },
  futureeo: { env: "FutureEO, période 1, segment 3", fr: 243.0, tot: 1799.94 },
  ers: { env: "ERS – observation de la Terre, élément 1 (phase 1)", fr: 10.0, tot: 166.63 },
  leopnt: { env: "FutureNAV, composante 1 (LEO-PNT)", fr: 100.73, tot: 608.72 },
  secure: { env: "Programme ESA lié à la connectivité sécurisée de l'UE, élément 1", fr: 300.0, tot: 615.4 },
  moonlight: { env: "Moonlight", fr: null, tot: 305.06 },
  s2p: { env: "Space Safety Programme (S2P), période 3", fr: 39.0, tot: 955.26 },
  e3p: { env: "Exploration E3P, période 4 (part française : orbite basse 220, Lune 45, Mars 30, science 17, ExPeRT 30 M€)", fr: 342.0, tot: 2975.69 },
  seats6: { env: "SEATS, élément 1 (Ariane 6)", fr: 536.6, tot: 1020.58 },
  seatsv: { env: "SEATS, élément 2 (Vega C)", fr: 23.17, tot: 92.02 },
  elc: { env: "European Launcher Challenge (enveloppe commune, pas par lanceur)", fr: 179.0, tot: 902.16 },
  flpp: { env: "FLPP (technologies de rupture et logistique spatiale)", fr: 5.81, tot: 531.35 },
  spacerider: { env: "Space Rider, étape 3.1", fr: null, tot: 27.4 },
  scylight: { env: "ARTES 4.0 – Optique et quantique (ScyLight)", fr: 18.06, tot: 975.2 },
  artespp: { env: "ARTES 4.0 – Projets en partenariat, période 1", fr: 61.74, tot: 309.05 },
  artesic: { env: "ARTES 4.0 – Compétitivité industrielle, période 1", fr: 139.0, tot: 455.18 }
};
const FR_MAP = {
  co2m: "csc4", lstm: "csc4", cristal: "csc4", chime: "csc4", cimr: "csc4", rosel: "csc4", sng: "csc4",
  harmony: "futureeo", wivern: "futureeo", forum: "futureeo", ersres: "ers", celeste: "leopnt", iris2: "secure", moonlight: "moonlight",
  ramses: "s2p", vigil: "s2p", argonaut: "e3p", cargo: "e3p", exomars: "e3p",
  ariane6: "seats6", vega: "seatsv", maiaspace: "elc", isar: "elc", rfa: "elc", pld: "elc", themis: "flpp", flpp: "flpp",
  spacerider: "spacerider", scylight: "scylight", hummingsat: "artespp", artes: "artesic"
};
const FR_SRC = SRC12.cm25;
PROGRAMMES.forEach(p => {
  if (!["dev", "plan", "op"].includes(p.st)) return;
  const k = FR_MAP[p.id];
  if (k) {
    const e = FR_ESA[k];
    p.frEsa = e.fr == null
      ? { txt: `Aucune souscription française inscrite au CM25 pour « ${e.env} » (total souscrit : ${e.tot.toLocaleString("fr-FR")} M€).`, part: null, bc: "A" }
      : { txt: `${(e.fr / e.tot * 100).toLocaleString("fr-FR", { maximumFractionDigits: 1 })} % de « ${e.env} » : ${e.fr.toLocaleString("fr-FR")} M€ sur ${e.tot.toLocaleString("fr-FR")} M€ souscrits au CM25.`, part: e.fr / e.tot, bc: "A" };
  } else if ((/programme scientifique/i.test(p.fin) || (p.d === "esc" && /\bESA\b/.test(p.fin))) && !/GSTP|technolog/i.test(p.fin) && p.id !== "proba3") {
    p.frEsa = { txt: "Programme scientifique obligatoire : chaque État membre contribue selon un barème fondé sur son revenu national ; pas de souscription par mission.", part: null, bc: "A", sci: true };
  } else if (/\bESA\b/.test(p.fin) && !/^Union européenne$/.test(p.fin)) {
    p.frEsa = { txt: "Non documenté : la part française de ce programme n'a pas été retrouvée dans les souscriptions publiées.", part: null, bc: "C" };
  }
});
