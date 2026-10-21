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
