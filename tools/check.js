/* Contrôles de cohérence de l'atlas : node tools/check.js
   Lit dist/atlas.html (après python3 build.py), évalue les données et vérifie les références. */
const fs = require("fs"), vm = require("vm"), path = require("path");
const html = fs.readFileSync(path.join(__dirname, "..", "dist", "atlas.html"), "utf8");
const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
const ctx = {}; vm.createContext(ctx);
vm.runInContext(scripts[0] + `;this.D={PROGRAMMES,ACTEURS,CAT_ACTEURS,PAYS,PAYS_INFO,FAMILLES,DOMAINES,STATUTS,LIGNEES,CONVERGENCES,UNITES,PARC,LIENS,CONTRATS,LEVEES,RELATIONS,BUDGETS,SOURCES,SUITES,VISUELS,ORBITES,GLOSSAIRE,OPPORTUNITES,EVENEMENTS,SITES,METIERS,PHASES,OPP_STATUTS,EVT_TYPES,scoreOpp,DATE_VERIF}`, ctx);
new vm.Script(scripts[1]); // syntaxe de app.js
const D = ctx.D, err = [], warn = [];
const P = new Set(D.PROGRAMMES.map(p => p.id)), A = new Set(D.ACTEURS.map(a => a.id));
const dup = arr => arr.filter((x, i) => arr.indexOf(x) !== i);
const norm = s => String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]/g, "");
const isId = s => /^[a-z0-9][a-z0-9-]*$/.test(s);
dup(D.PROGRAMMES.map(p => p.id)).forEach(x => err.push("Identifiant de programme en double : " + x));
dup(D.ACTEURS.map(a => a.id)).forEach(x => err.push("Identifiant d'acteur en double : " + x));
dup(D.PROGRAMMES.map(p => norm(p.n))).forEach(x => err.push("Nom de programme en double : " + x));
dup(D.ACTEURS.map(a => norm(a.n))).forEach(x => err.push("Nom d'acteur en double : " + x));
const req = ["id", "n", "d", "sub", "fin", "moa", "moe", "plat", "instr", "app", "bud", "bc", "y0", "y1", "jal", "st", "pred", "succ"];
D.PROGRAMMES.forEach(p => {
  req.forEach(k => { if (p[k] === undefined) err.push(`${p.id} : champ ${k} manquant`); });
  if (!D.DOMAINES[p.d]) err.push(`${p.id} : domaine inconnu ${p.d}`);
  else if (!D.FAMILLES[D.DOMAINES[p.d].fam]) err.push(`${p.id} : famille inconnue`);
  if (!D.STATUTS[p.st]) err.push(`${p.id} : statut inconnu ${p.st}`);
  if (!"ABC".includes(p.bc) || !p.bc) err.push(`${p.id} : indice de confiance invalide`);
  p.pred.concat(p.succ).forEach(r => { if (!P.has(r)) err.push(`${p.id} : filiation vers ${r} inexistant`); });
  if (p.host && !P.has(p.host)) err.push(`${p.id} : host ${p.host} inexistant`);
  if (!(D.LIENS[p.id] || []).length) err.push(`${p.id} : aucune source`);
  else if (D.LIENS[p.id].length === 1) warn.push(`${p.id} : une seule source`);
  if (p.y1 < p.y0) err.push(`${p.id} : y1 < y0`);
});
D.ACTEURS.forEach(a => {
  if (!D.CAT_ACTEURS[a.c]) err.push(`Acteur ${a.id} : catégorie inconnue ${a.c}`);
  if (!D.PAYS[a.p]) err.push(`Acteur ${a.id} : pays inconnu ${a.p}`);
  (a.pr || []).forEach(r => { if (!P.has(r)) err.push(`Acteur ${a.id} : programme ${r} inexistant`); });
  if (a.grp && isId(a.grp) && !A.has(a.grp)) err.push(`Acteur ${a.id} : groupe ${a.grp} inexistant`);
  if (a.u && !/^https:\/\//.test(a.u)) err.push(`Acteur ${a.id} : URL non https`);
});
Object.keys(D.PAYS).forEach(k => { if (k !== "EU" && !D.PAYS_INFO[k]) warn.push(`Pays ${k} sans statut UE / ESA`); });
D.RELATIONS.forEach((r, i) => {
  [r.de, r.vers].forEach(x => { if (isId(x) && !A.has(x) && !P.has(x)) err.push(`Relation ${i} : ${x} inexistant`); });
  if (!r.src || !/^https:\/\//.test(r.src)) err.push(`Relation ${i} : source manquante`);
  if (!"ABC".includes(r.bc) || !r.bc) err.push(`Relation ${i} : confiance invalide`);
});
dup(D.RELATIONS.map(r => r.de + ">" + r.vers + ">" + r.type)).forEach(x => err.push("Relation en double : " + x));
D.CONTRATS.forEach((c, i) => {
  if (c.prog && !P.has(c.prog)) err.push(`Contrat ${i} : programme ${c.prog} inexistant`);
  [].concat(c.act || []).forEach(x => { if (!A.has(x)) err.push(`Contrat ${i} : acteur ${x} inexistant`); });
  if (!c.act) warn.push(`Contrat « ${c.lib} » sans identifiant d'acteur`);
  if (!D.FAMILLES[c.fam]) err.push(`Contrat ${i} : famille inconnue`);
  if (c.eng && !["annonce", "signe", "verse"].includes(c.eng)) err.push(`Contrat ${i} : stade inconnu ${c.eng}`);
});
D.LEVEES.forEach((l, i) => { if (l.act && !A.has(l.act)) err.push(`Levée ${i} : acteur inexistant`); if (!l.act) warn.push(`Levée « ${l.ent} » sans identifiant d'acteur`); if (!D.FAMILLES[l.fam]) err.push(`Levée ${i} : famille inconnue`); });
D.LIGNEES.forEach(l => l.etapes.concat(l.branches).forEach(e => { if (e[2] && !P.has(e[2])) err.push(`Lignée « ${l.titre} » : ${e[2]} inexistant`); }));
D.CONVERGENCES.forEach(c => [c.a, c.b].forEach(x => { if (x && !P.has(x)) err.push(`Convergence « ${c.titre} » : ${x} inexistant`); }));
Object.entries(D.UNITES).forEach(([k, rows]) => { if (!P.has(k)) err.push(`Unités : ${k} inexistant`); rows.forEach(r => { if (!D.STATUTS[r[3]]) err.push(`Unité ${r[0]} : statut ${r[3]}`); }); });
Object.keys(D.PARC).forEach(k => { if (!P.has(k)) err.push(`Parc : ${k} inexistant`); });
Object.entries(D.LIENS).forEach(([k, ls]) => { if (!P.has(k)) err.push(`Liens : ${k} inexistant`); ls.forEach(l => { if (!/^https:\/\//.test(l[2])) err.push(`Lien non https : ${k}`); }); });
D.BUDGETS.forEach(b => { if (b.src && !D.SOURCES[b.src]) err.push(`Budget « ${b.nom} » : source ${b.src} inconnue`); });
(D.SUITES || []).forEach(s => { if (!P.has(s.de)) err.push(`Suite : ${s.de} inexistant`); });
Object.keys(D.VISUELS || {}).forEach(k => { if (!P.has(k)) err.push(`Visuel : ${k} inexistant`); });

/* Prospection par métier */
const okSrc = s => s && /^https:\/\//.test(s.u) && s.t && /^\d{4}-\d{2}-\d{2}$/.test(s.verif) && (s.pub === null || /^\d{4}(-\d{2}(-\d{2})?)?$/.test(s.pub));
const SI = new Set(D.SITES.map(x => x.id)), O = new Set(D.OPPORTUNITES.map(o => o.id));
dup(D.OPPORTUNITES.map(o => o.id)).forEach(x => err.push("Opportunité en double : " + x));
dup(D.SITES.map(x => x.id)).forEach(x => err.push("Site en double : " + x));
D.SITES.forEach(x => { if (!A.has(x.act)) err.push(`Site ${x.id} : acteur ${x.act} inexistant`); if (!D.PAYS[x.p]) err.push(`Site ${x.id} : pays inconnu`); if (!okSrc(x.src)) err.push(`Site ${x.id} : source invalide`); });
D.OPPORTUNITES.forEach(o => {
  const k = "Opportunité " + o.id;
  if (o.prog && !P.has(o.prog)) err.push(`${k} : programme ${o.prog} inexistant`);
  o.acheteur.concat(o.four || [], o.client ? [o.client] : []).forEach(x => { if (!A.has(x)) err.push(`${k} : acteur ${x} inexistant`); });
  if (!o.acheteur.length) err.push(`${k} : aucun acheteur`);
  if (o.site && !SI.has(o.site)) err.push(`${k} : site ${o.site} inexistant`);
  if (!o.metiers.length || o.metiers.some(m => !D.METIERS[m])) err.push(`${k} : métier invalide`);
  if (!D.PHASES[o.phase]) err.push(`${k} : phase inconnue`);
  if (!D.OPP_STATUTS[o.statut]) err.push(`${k} : statut inconnu`);
  if (!"ABC".includes(o.bc) || !o.bc) err.push(`${k} : confiance invalide`);
  if (!o.sources.length || o.sources.some(s => !okSrc(s))) err.push(`${k} : source manquante ou invalide`);
  if (o.ech && !/^\d{4}(-\d{2})?$/.test(o.ech.d)) err.push(`${k} : échéance mal formée`);
  if (o.valeur) err.push(`${k} : valeur renseignée sans méthode documentée`);
  if (!o.action || !o.lot || !o.qte || !o.fab || !["interne", "externe", "mixte", "inconnu"].includes(o.fab.mode)) err.push(`${k} : champ obligatoire manquant`);
  if (o.statut === "confirmee" && !o.note) err.push(`${k} : une opportunité confirmée doit préciser le niveau du besoin publié`);
  if (o.lotDoc && !(o.four || []).length) err.push(`${k} : lot documenté sans fournisseur cité`);
  const sc = D.scoreOpp(o, null);
  if (!(sc.total >= 0 && sc.total <= 15)) err.push(`${k} : score hors bornes (${sc.total})`);
  if (o.ech && o.ech.doc && /^\d{4}/.test(o.ech.d) && o.ech.d < D.DATE_VERIF.slice(0, o.ech.d.length)) warn.push(`${k} : échéance passée (${o.ech.d})`);
});
D.EVENEMENTS.forEach((e, i) => {
  const k = `Événement ${i} (${e.d})`;
  if (!D.EVT_TYPES[e.type]) err.push(`${k} : type inconnu ${e.type}`);
  if (!A.has(e.act)) err.push(`${k} : acteur ${e.act} inexistant`);
  if (e.prog && !P.has(e.prog)) err.push(`${k} : programme ${e.prog} inexistant`);
  if (e.opp && !O.has(e.opp)) err.push(`${k} : opportunité ${e.opp} inexistante`);
  if (!okSrc(e.src)) err.push(`${k} : source manquante ou invalide`);
  if (e.d > D.DATE_VERIF) err.push(`${k} : date future`);
  (e.metiers || []).forEach(m => { if (!D.METIERS[m]) err.push(`${k} : métier ${m} inconnu`); });
});
const stc = {}; D.OPPORTUNITES.forEach(o => stc[o.statut] = (stc[o.statut] || 0) + 1);
const tyc = {}; D.EVENEMENTS.forEach(e => tyc[e.type] = (tyc[e.type] || 0) + 1);
console.log(`Opportunités ${D.OPPORTUNITES.length} ${JSON.stringify(stc)} · événements ${D.EVENEMENTS.length} ${JSON.stringify(tyc)} · sites ${D.SITES.length}`);
const cats = {}; D.ACTEURS.forEach(a => cats[a.c] = (cats[a.c] || 0) + 1);
const pays = {}; D.ACTEURS.forEach(a => pays[a.p] = (pays[a.p] || 0) + 1);
console.log(`Programmes ${D.PROGRAMMES.length} · acteurs ${D.ACTEURS.length} · relations ${D.RELATIONS.length} · contrats ${D.CONTRATS.length} · levées ${D.LEVEES.length} · lignées ${D.LIGNEES.length} · convergences ${D.CONVERGENCES.length} · unités ${Object.values(D.UNITES).reduce((a, b) => a + b.length, 0)} · liens ${Object.values(D.LIENS).reduce((a, b) => a + b.length, 0)}`);
console.log("Acteurs par catégorie :", JSON.stringify(cats));
console.log("Acteurs par pays :", JSON.stringify(pays));
warn.forEach(w => console.log("Avertissement : " + w));
err.forEach(e => console.log("ERREUR : " + e));
console.log(err.length ? `${err.length} erreur(s)` : "Aucune erreur");
process.exit(err.length ? 1 : 0);
