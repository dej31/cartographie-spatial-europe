(function () {
  "use strict";

  const byId = Object.fromEntries(PROGRAMMES.map(p => [p.id, p]));
  const famOf = p => DOMAINES[p.d].fam;
  const col = f => `var(--f-${f})`;
  const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const NOW = 2026.8;

  const VIEWS = [
    ["accueil", "Vue d'ensemble"],
    ["mecanique", "Mécanique"],
    ["domaines", "Domaines"],
    ["fiches", "Fiches"],
    ["acteurs", "Acteurs"],
    ["reseau", "Réseau"],
    ["prospection", "Prospection"],
    ["frise", "Frise"],
    ["genealogie", "Généalogie"],
    ["convergences", "Convergences"],
    ["industrie", "Industrie"],
    ["finances", "Finances"],
    ["glossaire", "Glossaire"]
  ];

  const state = { view: "mecanique", sel: "s1", fam: "all", q: "", convType: "all", acat: "all", apays: "all", aq: "", ds: "contrats", y0: 2014, y1: 2026, fams: [], ent: "all", finT: "all", ty: "all", sort: "m", pcst: false, asel: null, pfam: "all", pq: "", phz: "all", pnon: false, psort: "jal", pmode: "opp", om: "all", ost: "all", opays: "all", oact: "all", oprog: "all", ophase: "all", obc: "all", oq: "", osort: "ech", etype: "all" };

  function chip(id) {
    const p = byId[id];
    if (!p) return "";
    return `<button class="chip" data-goto="${p.id}" type="button"><span class="dot" style="background:${col(famOf(p))}"></span>${esc(p.n)}</button>`;
  }
  const pill = st => `<span class="pill st-${st}">${STATUTS[st]}</span>`;

  /* ---- Acteurs et relations (phase 2) ---- */
  const REL = typeof RELATIONS !== "undefined" ? RELATIONS : [];
  const actById = Object.fromEntries(ACTEURS.map(a => [a.id, a]));
  const ROLES_PROG = ["maître d'œuvre", "maître d'ouvrage", "sous-traitant", "fournisseur", "opérateur", "utilisateur", "financeur", "partenaire scientifique", "partenaire", "bénéficiaire", "candidat", "consortium"];
  const ORG_TYPES = ["filiale", "participation", "coentreprise", "consortium", "partenariat", "acquisition", "fusion", "projet de fusion", "essaimage", "fournisseur"];
  const ENG = { annonce: "Annoncé", signe: "Signé", verse: "Versé" };
  function actChip(id, extra) {
    const a = actById[id];
    if (!a) return `<span class="chip chip-txt">${esc(id)}</span>`;
    return `<button class="chip" type="button" data-actor="${a.id}" title="Voir l'acteur">${esc(a.n)}${extra ? ` <span class="note">· ${esc(extra)}</span>` : ""}</button>`;
  }
  const entLabel = x => actById[x] ? actById[x].n : x;
  function paysBadges(p) {
    const i = typeof PAYS_INFO !== "undefined" && PAYS_INFO[p];
    if (!i) return "";
    return `<span class="badges">${i.ue ? '<span class="badge">UE</span>' : '<span class="badge off">hors UE</span>'}${i.esa === "membre" ? '<span class="badge">ESA</span>' : `<span class="badge off">ESA : ${esc(i.esa)}</span>`}</span>`;
  }

  /* ================= EN-TÊTE ================= */
  function header() {
    document.getElementById("legendFam").innerHTML = Object.entries(FAMILLES)
      .map(([k, f]) => `<span><i class="sw" style="background:${col(k)}"></i>${f.nom}</span>`).join("");
    document.getElementById("counts").innerHTML = [
      [PROGRAMMES.length, "programmes"],
      [ACTEURS.length, "acteurs"],
      [ACTEURS.filter(a => a.c === "lab").length, "laboratoires"],
      [LIGNEES.length, "filiations"],
      [CONVERGENCES.length, "convergences"],
      [REL.length, "relations"]
    ].map(([v, l]) => `<div><b>${v}</b><small>${l}</small></div>`).join("");
    document.getElementById("tabs").innerHTML = VIEWS.map(([k, l], i) =>
      `<button class="tab" role="tab" id="t-${k}" aria-controls="v-${k}" data-tab="${k}" type="button"><span class="k">${i}</span>${l}</button>`).join("");
  }

  /* ================= VUE 0 : MÉCANIQUE ================= */
  function vMecanique() {
    const stages = [
      ["Financeurs", "Qui paie", ["Union européenne", "États membres de l'ESA", "États membres d'EUMETSAT", "Agences nationales : CNES, DLR, ASI", "Ministères de la Défense", "Capitaux privés"]],
      ["Maître d'ouvrage", "Qui commande", ["ESA (pour l'UE ou ses États)", "CNES, DLR, ASI", "DGA, BAAINBw", "EUSPA (exploitation)", "Opérateurs : Eutelsat, SES…"]],
      ["Maître d'œuvre", "Qui intègre le satellite", ["Airbus DS", "Thales Alenia Space", "OHB", "Nouveaux entrants : ICEYE, Aerospacelab…"]],
      ["Équipementiers", "Qui fournit les briques", ["Instruments : Leonardo, Thales, Airbus", "Optique : Safran Reosc", "Senseurs : Sodern, Jena-Optronik", "Charges utiles : SSTL, Thales"]],
      ["Lancement", "Qui met en orbite", ["Arianespace (Ariane 6)", "Avio (Vega-C)", "Micro-lanceurs : Isar, RFA, PLD…", "SpaceX quand l'offre européenne manque"]],
      ["Exploitation", "Qui fait voler", ["ESA (ESOC)", "EUMETSAT", "CNES", "Armées", "Opérateurs privés"]],
      ["Utilisateurs", "Qui se sert des données", ["Services Copernicus", "Météo-France, DWD…", "Armées", "Scientifiques", "Clients commerciaux"]]
    ];
    const chain = stages.map(([t, s, items], i) => `
      <div class="stage"><div class="num">${i + 1} · ${esc(s)}</div><h3>${esc(t)}</h3>
      <ul>${items.map(x => `<li>${esc(x)}</li>`).join("")}</ul></div>`).join("");

    const circuits = [
      { f: "obs", t: "Circuit institutionnel civil", ex: "Exemple : Sentinel-1D", rows: [
        ["Paie", "Union européenne (Copernicus) et ESA"], ["Commande", "ESA"], ["Construit", "Thales Alenia Space Italie, radar Airbus DS"],
        ["Lance", "Arianespace, Ariane 6 (nov. 2025)"], ["Exploite", "ESA"], ["Données", "Gratuites, pour tous"]],
        moral: "L'UE est propriétaire, l'ESA est l'architecte technique. Les industriels sont choisis par appel d'offres, en tenant compte du retour géographique." },
      { f: "def", t: "Circuit défense national", ex: "Exemple : CSO-3", rows: [
        ["Paie", "Ministère des Armées"], ["Commande", "DGA, avec l'expertise du CNES"], ["Construit", "Airbus DS, instrument Thales Alenia Space"],
        ["Lance", "Arianespace, Ariane 6 (mars 2025)"], ["Exploite", "Armées et CNES"], ["Données", "Classifiées, échangées avec des alliés"]],
        moral: "Souveraineté d'abord : pas de concurrence européenne ouverte, coopération par accords d'État à État." },
      { f: "tel", t: "Circuit commercial", ex: "Exemple : Pléiades Neo", rows: [
        ["Paie", "Airbus, sur fonds propres"], ["Commande", "Airbus à lui-même"], ["Construit", "Airbus DS"],
        ["Lance", "Arianespace, Vega"], ["Exploite", "Airbus"], ["Données", "Vendues, l'État est un client"]],
        moral: "L'industriel prend le risque et garde les revenus. Les États sécurisent le modèle par des contrats d'achat de données." },
      { f: "lan", t: "Circuit NewSpace soutenu", ex: "Exemple : Isar Aerospace (Spectrum)", rows: [
        ["Paie", "Capitaux privés (> 400 M€), puis États via le European Launcher Challenge"], ["Commande", "Isar à lui-même ; l'ESA réserve des missions"], ["Construit", "Isar Aerospace, intégration verticale"],
        ["Lance", "Depuis Andøya (Norvège)"], ["Exploite", "Isar Aerospace"], ["Clients", "Institutionnels et commerciaux"]],
        moral: "L'argent privé finance le risque technique ; l'argent public arrive ensuite, conditionné à des vols réussis." },
      { f: "exp", t: "Circuit coopération et troc", ex: "Exemple : module de service d'Orion", rows: [
        ["Paie", "États membres de l'ESA (programme exploration)"], ["Commande", "ESA, pour le compte de la NASA"], ["Construit", "Airbus DS à Brême, fournisseurs de 13 pays"],
        ["Lance", "NASA (SLS)"], ["Exploite", "NASA"], ["Contrepartie", "Places d'astronautes européens"]],
        moral: "L'Europe paie en nature. Elle garde l'argent et l'emploi chez elle, mais dépend des choix américains." }
    ];
    const circ = circuits.map(c => `
      <div class="circuit">
        <h3><span class="sw" style="background:${col(c.f)}"></span>${esc(c.t)}</h3>
        <div class="note">${esc(c.ex)}</div>
        <ol>${c.rows.map(([a, b]) => `<li><span>${esc(a)}</span><span>${esc(b)}</span></li>`).join("")}</ol>
        <p class="moral">${esc(c.moral)}</p>
      </div>`).join("");

    const max = Math.max(...BUDGETS.map(b => b.val));
    const bud = BUDGETS.map(b => `
      <div class="budget">
        <div><div class="v mono">${b.val.toLocaleString("fr-FR")}<small>Md€</small></div><div class="n">${esc(b.nom)} <span class="conf">${b.bc}</span></div></div>
        <div><div class="bar"><i style="width:${(b.val / max * 100).toFixed(1)}%"></i></div><div class="note">${esc(b.txt)}</div></div>
      </div>`).join("");

    const notions = [
      ["Retour géographique", "À l'ESA, chaque pays récupère des contrats industriels en proportion de ce qu'il verse. Cela explique la répartition des maîtrises d'œuvre entre France, Allemagne, Italie, Espagne et Royaume-Uni."],
      ["UE propriétaire, ESA architecte", "Pour Copernicus et Galileo, l'UE finance et possède. Elle délègue à l'ESA la conception et l'achat, puis à l'EUSPA ou à EUMETSAT l'exploitation."],
      ["Dual", "Un même satellite sert les civils et les militaires (Pléiades, COSMO-SkyMed, Athena-Fidus). C'est une façon de partager les coûts."],
      ["Ancre institutionnelle", "Même un programme privé vit souvent grâce à un gros client public : un ministère qui s'engage à acheter des images ou de la capacité."],
      ["Partenariat public-privé", "L'État finance une partie, l'industriel le reste, et les revenus sont partagés (TerraSAR-X, CO3D, IRIS²)."],
      ["Accès autonome à l'espace", "Les programmes institutionnels lancent en priorité sur Ariane 6 et Vega-C, même quand un lanceur étranger serait moins cher."]
    ].map(([t, d]) => `<div class="notion"><h3>${esc(t)}</h3><p>${esc(d)}</p></div>`).join("");

    return `
      <div class="view-head"><h2>Comment le marché fonctionne</h2>
      <p>Un satellite européen passe par sept mains. La plupart des différences entre programmes viennent de qui occupe les deux premières cases : qui paie, et qui commande.</p></div>
      <div class="chain">${chain}</div>
      <h3 class="section-title">Cinq circuits types</h3>
      <div class="circuits">${circ}</div>
      <h3 class="section-title">Les grandes enveloppes</h3>
      <p class="note" style="margin-bottom:12px">Enveloppes pluriannuelles de natures différentes, à lire séparément. Barres à la même échelle.</p>
      <div class="budgets">${bud}</div>
      <h3 class="section-title">Six notions pour lire tout le reste</h3>
      <div class="notions">${notions}</div>`;
  }

  /* ================= VUE 1 : DOMAINES ================= */
  function vDomaines() {
    const fams = Object.entries(FAMILLES).map(([fk, f]) => {
      const doms = Object.entries(DOMAINES).filter(([, d]) => d.fam === fk);
      const n = PROGRAMMES.filter(p => famOf(p) === fk).length;
      return `<div class="fam">
        <div class="fam-head" style="border-top:4px solid ${col(fk)}"><h3>${esc(f.nom)}</h3><span class="count">${n} programmes</span></div>
        <div class="doms">${doms.map(([dk, d]) => {
          const ps = PROGRAMMES.filter(p => p.d === dk).sort((a, b) => a.y0 - b.y0);
          return `<div class="dom"><h4>${esc(d.nom)}</h4><p>${esc(d.resume)}</p><div class="chips">${ps.map(p => chip(p.id)).join("")}</div></div>`;
        }).join("")}</div></div>`;
    }).join("");
    return `<div class="view-head"><h2>Carte des domaines</h2>
      <p>${Object.keys(FAMILLES).length} familles, ${Object.keys(DOMAINES).length} domaines, ${PROGRAMMES.length} programmes. Les pastilles sont classées par date de début ; un clic ouvre la fiche du programme.</p></div>
      <div class="fams">${fams}</div>`;
  }

  /* ================= VUE 2 : FICHES ================= */
  function filtered() {
    const q = state.q.trim().toLowerCase();
    return PROGRAMMES.filter(p => (state.fam === "all" || famOf(p) === state.fam) &&
      (!q || [p.n, p.sub, p.moe, p.fin, p.app, p.instr].join(" ").toLowerCase().includes(q)));
  }
  function vFiches() {
    const fch = [["all", "Tous", null]].concat(Object.entries(FAMILLES).map(([k, f]) => [k, f.court, k]))
      .map(([k, l, c]) => `<button class="fchip" type="button" data-fam="${k}" aria-pressed="${state.fam === k}">${c ? `<span class="sw" style="background:${col(c)}"></span>` : ""}${l}</button>`).join("");
    return `<div class="view-head"><h2>Fiches programmes</h2>
      <p>Même grille pour chaque programme, avec des liens vers les pages de l'industriel et de l'agence. Les chiffres portent un indice de confiance : A vérifié en octobre 2026, B publié mais non revérifié, C estimation ou donnée non publique. Le symbole ◧ signale les fiches qui ont une photo, des dimensions ou un schéma à l'échelle (${Object.keys(typeof VISUELS !== "undefined" ? VISUELS : {}).length} fiches).</p></div>
      <div class="fiches">
        <div>
          <div class="filters">
            <label class="note" for="q">Rechercher un programme, un industriel, une application</label>
            <input id="q" type="search" placeholder="ex. OHB, radar, Toulouse…" value="${esc(state.q)}">
            <div class="fchips" id="fchips">${fch}<button type="button" class="reset" data-fireset="1">Réinitialiser</button></div>
          </div>
          <div class="plist" id="plist"></div>
        </div>
        <div id="detail"></div>
      </div>`;
  }
  function renderList() {
    const list = filtered();
    const el = document.getElementById("plist");
    if (!el) return;
    el.innerHTML = list.length ? list.map(p => `
      <button class="pitem" type="button" data-sel="${p.id}" aria-current="${p.id === state.sel}">
        <span class="bar" style="background:${col(famOf(p))}"></span>
        <span style="min-width:0"><span class="t">${esc(p.n)}${typeof VISUELS !== "undefined" && VISUELS[p.id] ? ' <span class="vis-dot" title="Visuel et échelle disponibles">◧</span>' : ""}</span><span class="s">${esc(DOMAINES[p.d].nom)} · ${esc(p.moe)}</span></span>
        ${pill(p.st)}
      </button>`).join("") : `<p class="note" style="padding:14px">Aucun programme ne correspond. Essayez un autre mot ou la famille « Tous ».</p>`;
  }
  function miniTimeline(p) {
    const a = Math.min(p.y0, ...p.jal.map(j => j[0])) - 1, b = Math.max(p.y1, NOW) + 1;
    const W = 640, H = 70, x = y => 10 + (y - a) / (b - a) * (W - 20);
    const c = col(famOf(p));
    const ticks = [];
    for (let y = Math.ceil(a / 5) * 5; y <= b; y += 5) ticks.push(y);
    const past = Math.min(p.y1, NOW);
    let bars = "";
    if (p.y0 < NOW) bars += `<rect x="${x(p.y0)}" y="28" width="${Math.max(2, x(past) - x(p.y0))}" height="12" rx="2" fill="${c}"></rect>`;
    if (p.y1 > NOW) { const s = Math.max(p.y0, NOW); bars += `<rect x="${x(s)}" y="28" width="${Math.max(2, x(p.y1) - x(s))}" height="12" rx="2" fill="${c}" opacity=".35"></rect>`; }
    const jal = p.jal.map(([y, t]) => `<g><line x1="${x(y)}" x2="${x(y)}" y1="22" y2="46" stroke="var(--ink)" stroke-width="1.5"></line><title>${esc(y + " · " + t)}</title></g>`).join("");
    return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Frise de ${esc(p.n)}">
      ${ticks.map(y => `<line x1="${x(y)}" x2="${x(y)}" y1="16" y2="52" stroke="var(--line)"></line><text x="${x(y)}" y="66" font-size="10" text-anchor="middle" fill="var(--muted)" font-family="var(--font-mono)">${y}</text>`).join("")}
      ${bars}${jal}
      <line x1="${x(NOW)}" x2="${x(NOW)}" y1="6" y2="52" stroke="var(--accent)" stroke-dasharray="3 2"></line>
      <text x="${x(NOW) + 4}" y="12" font-size="10" fill="var(--accent)" font-family="var(--font-mono)">oct. 2026</text>
    </svg>`;
  }
  function renderDetail() {
    const el = document.getElementById("detail");
    if (!el) return;
    const p = byId[state.sel];
    const f = famOf(p);
    const convs = CONVERGENCES.filter(c => c.a === p.id || c.b === p.id);
    const field = (k, v, wide) => `<div class="field${wide ? " wide" : ""}"><dt>${k}</dt><dd>${v}</dd></div>`;
    const preds = p.pred.filter(id => byId[id]), succs = p.succ.filter(id => byId[id]);
    const usedBy = PROGRAMMES.filter(q => q.pred.includes(p.id) && !succs.includes(q.id));
    const host = p.host && byId[p.host];
    el.innerHTML = `<article class="detail" style="--fc:${col(f)}">
      <div class="detail-head">
        <div class="meta"><span>${esc(FAMILLES[f].nom)} · ${esc(DOMAINES[p.d].nom)}</span>${pill(p.st)}<span class="meta-act">${shareBtn("fiche/" + p.id)}<button type="button" class="share" data-reseau="P:${p.id}">Voir dans le réseau</button></span></div>
        <h3>${esc(p.n)}</h3>
        <p class="sub">${esc(p.sub)}</p>
      </div>
      ${visuelHtml(p)}
      <dl class="grid-fields" style="margin:0">
        ${field("Application", esc(p.app), true)}
        ${field("Financeur", esc(p.fin))}
        ${p.frEsa ? field("Part de la France (ESA)", `${esc(p.frEsa.txt)} <span class="conf" title="Indice de confiance">${p.frEsa.bc}</span> <a class="note" href="${esc(p.frEsa.sci ? SRC12.esafund.u : FR_SRC.u)}" target="_blank" rel="noopener">source ↗</a>`, true) : ""}
        ${field("Maître d'ouvrage", esc(p.moa))}
        ${field("Maître d'œuvre", esc(p.moe))}
        ${field("Plateforme", esc(p.plat))}
        ${p.orb ? field("Orbite", esc(p.orb)) : ""}
        ${parcField(p)}
        ${field("Instruments et partenaires", esc(p.instr), true)}
        ${field("Budget", `${esc(p.bud)} <span class="conf" title="Indice de confiance">${p.bc}</span>`, true)}
      </dl>
      <div class="mini-tl">${miniTimeline(p)}
        <p class="note" style="margin-top:6px">${p.jal.map(([y, t]) => `<span class="mono">${y}</span> ${esc(t)}`).join(" · ") || "Pas de jalon public."}</p>
        ${unitesHtml(p)}</div>
      ${p.note ? `<p class="callout" style="margin-top:16px">${esc(p.note)}</p>` : ""}
      <div class="rel">
        ${host ? `<div><h4>Embarqué sur</h4><div class="chips">${chip(host.id)}</div></div>` : ""}
        <div><h4>Découle de</h4><div class="chips">${preds.length ? preds.map(chip).join("") : `<span class="note">Programme sans prédécesseur direct dans l'atlas.</span>`}</div></div>
        <div><h4>A donné naissance à</h4><div class="chips">${succs.concat(usedBy.map(q => q.id)).length ? succs.concat(usedBy.map(q => q.id)).map(chip).join("") : `<span class="note">Pas de successeur identifié à ce jour.</span>`}</div></div>
        ${convs.length ? `<div><h4>Convergences</h4>${convs.map(c => `<p class="conv-line"><b>${esc(c.titre)}</b> · ${esc(c.type)}. ${esc(c.txt)}</p>`).join("")}</div>` : ""}
        ${acteursProgHtml(p)}
        ${suitesHtml(p)}
        ${liensHtml(p)}
      </div>
    </article>`;
  }


  function acteursProgHtml(p) {
    const roles = {};
    REL.filter(r => r.vers === p.id && actById[r.de]).forEach(r => { (roles[r.de] = roles[r.de] || []).push(r.type); });
    ACTEURS.filter(a => a.pr.includes(p.id)).forEach(a => { roles[a.id] = roles[a.id] || []; });
    const ids = Object.keys(roles);
    if (!ids.length) return "";
    const order = id => roles[id].length ? Math.min(...roles[id].map(t => { const i = ROLES_PROG.indexOf(t); return i < 0 ? 99 : i; })) : 98;
    ids.sort((x, y) => order(x) - order(y) || actById[x].n.localeCompare(actById[y].n, "fr"));
    return `<div><h4>Acteurs impliqués</h4><div class="chips">${ids.map(id => actChip(id, [...new Set(roles[id])].join(", "))).join("")}</div>
      <p class="note" style="margin-top:6px">Rôle indiqué quand il est documenté et sourcé (voir la fiche de l'acteur).</p></div>`;
  }

  /* ================= VUE : ACTEURS ================= */
  function vActeurs() {
    const cats = [["all", "Tous"]].concat(Object.entries(CAT_ACTEURS));
    const pays = [...new Set(ACTEURS.map(a => a.p))].sort((x, y) => (PAYS[x] || x).localeCompare(PAYS[y] || y, "fr"));
    return `<div class="view-head"><h2>Acteurs</h2>
      <p>Institutions, grands groupes, équipementiers, opérateurs, NewSpace, laboratoires et organismes de recherche. Les acteurs non européens ne figurent qu'au titre d'une filiale ou d'une activité documentée en Europe. Les montants ne figurent que lorsqu'ils sont publiés et vérifiables ; un champ vide veut dire « non publié », pas « nul ». Cet annuaire couvre les acteurs qui comptent, il n'est pas exhaustif : l'Europe compte plusieurs centaines de jeunes entreprises spatiales.</p></div>
      <div id="adetail"></div>
      <div class="act-top">
        <div class="panel">
          <h3 class="section-title" style="margin:0">Marché en chiffres</h3>
          <div class="kpis">
            <div><b class="mono">10,9 Md€</b><span>Ventes de l'industrie spatiale européenne en 2025 (+23 %) <span class="conf">A</span></span></div>
            <div><b class="mono">68 139</b><span>Emplois directs en 2025 (+2,2 %), dont 11 % en start-up <span class="conf">A</span></span></div>
            <div><b class="mono">1,1 Md€</b><span>Levées de fonds des start-up spatiales européennes en 2025 <span class="conf">A</span></span></div>
            <div><b class="mono">3,8 Md€</b><span>Levées en 2026 au 20 octobre, dont près de la moitié en dette <span class="conf">A</span></span></div>
          </div>
        </div>
        <div class="panel">
          <h3 class="section-title" style="margin:0">Acteurs de l'annuaire par pays</h3>
          <div id="paysBars" class="pays-bars"></div>
        </div>
      </div>
      <div class="filters" style="margin-top:20px">
        <div class="fchips" id="acats">${cats.map(([k, l]) => `<button class="fchip" type="button" data-acat="${k}" aria-pressed="${state.acat === k}">${esc(l)} <span class="mono" style="opacity:.6">${k === "all" ? ACTEURS.length : ACTEURS.filter(a => a.c === k).length}</span></button>`).join("")}</div>
        <div class="act-search">
          <div><label class="note" for="aq">Rechercher</label><input id="aq" type="search" placeholder="ex. radar, Toulouse, lanceur…" value="${esc(state.aq)}"></div>
          <div><span class="note">&nbsp;</span><button type="button" class="reset" data-areset="1">Réinitialiser</button></div>
          <div><label class="note" for="apays">Pays</label><select id="apays"><option value="all">Tous les pays</option>${pays.map(p => `<option value="${p}"${state.apays === p ? " selected" : ""}>${esc(PAYS[p] || p)}</option>`).join("")}</select></div>
        </div>
      </div>
      <p class="note" id="acount" style="margin:6px 0 12px"></p>
      <div class="act-grid" id="agrid"></div>
      ${structureHtml()}`;
  }
  function chipRole(id, role) {
    const p = byId[id];
    if (!p) return "";
    return `<button class="chip" data-goto="${p.id}" type="button"><span class="dot" style="background:${col(famOf(p))}"></span>${esc(p.n)} <span class="note">· ${esc(role)}</span></button>`;
  }
  function actRelHtml(a) {
    const lines = [];
    if (a.grp) lines.push(`Groupe : ${actById[a.grp] ? `<button type="button" class="lnk" data-actor="${a.grp}">${esc(actById[a.grp].n)}</button>` : esc(a.grp)}`);
    REL.filter(r => ORG_TYPES.includes(r.type) && !byId[r.vers] && (r.de === a.id || r.vers === a.id)).forEach(r => {
      const other = r.de === a.id ? r.vers : r.de;
      if (a.grp && other === a.grp) return;
      const lab = actById[other] ? `<button type="button" class="lnk" data-actor="${other}">${esc(actById[other].n)}</button>` : esc(other);
      const sens = r.de === a.id ? { filiale: "Filiale", participation: "Participation dans", coentreprise: "Détient", acquisition: "A acquis", fusion: "A fusionné avec", "projet de fusion": "Projet de fusion", essaimage: "Essaimage", fournisseur: "Fournisseur de", partenariat: "Partenariat avec" }[r.type] || r.type
        : { filiale: "Filiale de", participation: "Détenue en partie par", coentreprise: "Coentreprise de", acquisition: "Acquise par", fusion: "Issue de", essaimage: "Issue de", fournisseur: "Client de", partenariat: "Partenariat avec" }[r.type] || r.type;
      lines.push(`${sens} ${lab}${r.part ? ` (${esc(r.part)})` : ""}${r.a ? ` · ${r.a}` : ""} <a class="src" href="${esc(r.src)}" target="_blank" rel="noopener" title="${esc(r.txt)}">source <span class="conf">${r.bc}</span></a>`);
    });
    return lines.length ? `<ul class="act-rel">${lines.map(l => `<li>${l}</li>`).join("")}</ul>` : "";
  }
  function structureHtml() {
    const parents = {};
    REL.filter(r => ["filiale", "coentreprise", "participation"].includes(r.type)).forEach(r => { (parents[r.de] = parents[r.de] || []).push(r); });
    ACTEURS.filter(a => a.grp && !REL.some(r => r.vers === a.id && r.de === a.grp)).forEach(a => { (parents[a.grp] = parents[a.grp] || []).push({ de: a.grp, vers: a.id, type: "filiale", bc: "B" }); });
    const groups = Object.entries(parents).sort((x, y) => y[1].length - x[1].length || entLabel(x[0]).localeCompare(entLabel(y[0]), "fr"));
    const ops = REL.filter(r => ["acquisition", "fusion", "projet de fusion", "essaimage"].includes(r.type)).sort((x, y) => (y.a || 0) - (x.a || 0));
    const opsSeen = new Set();
    return `<h3 class="section-title">Structure industrielle : groupes, filiales et coentreprises</h3>
      <p class="note" style="margin-bottom:12px">Chaque société reste une entité distincte : appartenir au même groupe ne veut pas dire être la même entreprise (KSAT et Kongsberg Defence & Aerospace, par exemple).</p>
      <div class="struct-grid">${groups.map(([g, rs]) => `<div class="panel struct"><h4>${actById[g] ? `<button type="button" class="lnk" data-actor="${g}">${esc(actById[g].n)}</button>` : esc(g)}</h4>
        <ul>${rs.map(r => `<li>${actById[r.vers] ? `<button type="button" class="lnk" data-actor="${r.vers}">${esc(actById[r.vers].n)}</button>` : byId[r.vers] ? `<button type="button" class="lnk" data-goto="${r.vers}">${esc(byId[r.vers].n)}</button>` : esc(r.vers)} <span class="note">${esc(r.type)}${r.part ? " · " + esc(r.part) : ""}</span></li>`).join("")}</ul></div>`).join("")}</div>
      <h3 class="section-title">Acquisitions, fusions et essaimages</h3>
      <div class="panel" style="overflow-x:auto"><table class="fin-table"><thead><tr><th>Année</th><th>Opération</th><th>Détail</th><th>Conf.</th></tr></thead><tbody>
      ${ops.filter(r => { const k = r.type + r.vers + (r.a || ""); if (r.type === "projet de fusion") { if (opsSeen.has(k)) return false; opsSeen.add(k); } return true; }).map(r => `<tr><td class="mono">${r.a || "—"}</td><td>${esc(entLabel(r.type === "projet de fusion" ? "Airbus, Thales, Leonardo" : r.de))} → ${esc(entLabel(r.vers))} <div class="note">${esc(r.type)}</div></td><td>${esc(r.txt)} <a href="${esc(r.src)}" target="_blank" rel="noopener">source ↗</a></td><td><span class="conf">${r.bc}</span></td></tr>`).join("")}
      </tbody></table></div>`;
  }
  function actDetailHtml(a) {
    const progs = a.pr.filter(id => byId[id]);
    const srcs = [...new Set([a.u].concat(REL.filter(r => r.de === a.id || r.vers === a.id).map(r => r.src)).filter(Boolean))];
    return `<article class="adet panel">
      <div class="adet-h"><div><span class="ty">${esc(CAT_ACTEURS[a.c])}</span><h3>${esc(a.n)}</h3>
        <p class="note">${esc(a.v)} · ${esc(PAYS[a.p] || a.p)} ${paysBadges(a.p)} · ${esc(a.t)}${a.y ? " · fondé en " + a.y : ""}</p></div>
        <div class="adet-act">${shareBtn("acteur/" + a.id)}<button type="button" class="share" data-reseau="A:${a.id}">Voir dans le réseau</button><button type="button" class="share" data-areset="1">Fermer</button></div></div>
      <p>${esc(a.m)}</p>
      ${a.k ? `<p class="act-k">${esc(a.k)} <span class="conf">${a.kb}</span></p>` : ""}
      ${a.grp ? `<p class="note">Groupe : ${actById[a.grp] ? `<button type="button" class="lnk" data-actor="${a.grp}">${esc(actById[a.grp].n)}</button>` : esc(a.grp)}</p>` : ""}
      <div class="adet-g">
        <div><h4>Programmes (${progs.length})</h4>${progs.length ? `<div class="chips">${progs.map(id => { const t = REL.filter(r => r.de === a.id && r.vers === id).map(r => r.type); return t.length ? chipRole(id, t.join(", ")) : chip(id); }).join("")}</div>` : `<p class="note">Aucun programme relié dans l'atlas.</p>`}</div>
        <div><h4>Relations</h4>${relGroupsHtml("A:" + a.id)}</div>
      </div>
      ${(() => { const pa = partenaires("A:" + a.id).slice(0, 10), co = concurrents("A:" + a.id).slice(0, 8);
        return (pa.length || co.length) ? `<div class="adet-g">
          ${pa.length ? `<div><h4>Partenaires sur les mêmes programmes</h4><ul class="ov-list">${pa.map(([o, ps]) => `<li>${nodeLink(o)} <span class="note">· ${ps.map(x => esc(nodeName(x))).join(", ")}</span></li>`).join("")}</ul></div>` : "<div></div>"}
          ${co.length ? `<div><h4>Concurrents potentiels <span class="note">(calcul indicatif)</span></h4><p class="note">Même catégorie, mêmes domaines de programmes ; pas une concurrence documentée.</p><ul class="ov-list">${co.map(([o, ds]) => `<li>${nodeLink(o)} <span class="note">· ${ds.map(d => esc(DOMAINES[d].nom)).join(", ")}</span></li>`).join("")}</ul></div>` : ""}
        </div>` : ""; })()}
      <div><h4>Sources (${srcs.length})</h4>${srcs.length ? `<ul class="ov-list adet-src">${srcs.map(u => `<li><a href="${esc(u)}" target="_blank" rel="noopener">${esc(u.replace(/^https?:\/\/(www\.)?/, "").slice(0, 80))}</a></li>`).join("")}</ul>` : `<p class="note">Pas de source propre à l'acteur ; voir les fiches des programmes liés.</p>`}</div>
    </article>`;
  }
  function renderActeurs() {
    const g = document.getElementById("agrid");
    if (!g) return;
    const ad = document.getElementById("adetail");
    if (ad) ad.innerHTML = state.asel && actById[state.asel] ? actDetailHtml(actById[state.asel]) : "";
    const q = state.aq.trim().toLowerCase();
    const list = ACTEURS.filter(a => (state.acat === "all" || a.c === state.acat) && (state.apays === "all" || a.p === state.apays) &&
      (!q || [a.n, a.m, a.v, a.t, a.k, CAT_ACTEURS[a.c]].join(" ").toLowerCase().includes(q)));
    document.getElementById("acount").textContent = `${list.length} acteur${list.length > 1 ? "s" : ""} affiché${list.length > 1 ? "s" : ""}`;
    g.innerHTML = list.length ? list.map(a => `
      <article class="act" id="act-${a.id}">
        <div class="act-h"><span class="ty">${esc(CAT_ACTEURS[a.c])}</span><span class="mono note">${esc(a.p)}${a.y ? " · " + a.y : ""}</span></div>
        <h3><button type="button" class="lnk act-t" data-actor="${a.id}">${esc(a.n)}</button></h3>
        <p class="note">${esc(a.v)} · ${esc(a.t)} ${paysBadges(a.p)}</p>
        <p>${esc(a.m)}</p>
        ${a.k ? `<p class="act-k">${esc(a.k)} <span class="conf">${a.kb}</span></p>` : ""}
        ${actRelHtml(a)}
        ${a.pr.length ? `<div class="chips">${a.pr.map(id => { const t = REL.filter(r => r.de === a.id && r.vers === id).map(r => r.type); return t.length ? chipRole(id, t.join(", ")) : chip(id); }).join("")}</div>` : ""}
        ${a.u ? `<p class="note"><a href="${esc(a.u)}" target="_blank" rel="noopener">Site ou source ↗</a></p>` : ""}
      </article>`).join("") : `<p class="note">Aucun acteur ne correspond. Élargissez la catégorie ou le pays.</p>`;
    document.querySelectorAll("#acats .fchip").forEach(b => b.setAttribute("aria-pressed", b.dataset.acat === state.acat));
    const counts = {};
    ACTEURS.filter(a => state.acat === "all" || a.c === state.acat).forEach(a => counts[a.p] = (counts[a.p] || 0) + 1);
    const rows = Object.entries(counts).sort((x, y) => y[1] - x[1]);
    const max = Math.max(1, ...rows.map(r => r[1]));
    document.getElementById("paysBars").innerHTML = rows.map(([p, n]) => `<button type="button" class="hbar pbar${state.apays === p ? " on" : ""}" data-apays="${p}"><span>${esc(PAYS[p] || p)}</span><span class="track"><i style="width:${n / max * 100}%;background:var(--accent)"></i></span><span class="val">${n}</span></button>`).join("");
  }


  /* ================= VUE : PROSPECTION ================= */
  const NON_ATTR = /non attribu|non publi|à définir|à vérifier|non retenu|candidat/i;
  function prochainJalon(p) {
    const y = Math.floor(NOW);
    const f = p.jal.filter(j => j[0] > y).sort((a, b) => a[0] - b[0]);
    return f.length ? f[0] : null;
  }
  function dernierJalon(p) {
    const f = p.jal.filter(j => j[0] <= Math.floor(NOW)).sort((a, b) => b[0] - a[0]);
    return f.length ? f[0] : null;
  }
  function prosRows() {
    const q = state.pq.trim().toLowerCase();
    return PROGRAMMES.filter(p => (p.st === "dev" || p.st === "plan" || (p.pros && p.st !== "fin" && p.st !== "ann" && p.st !== "nr")))
      .map(p => ({ p, j: prochainJalon(p), libre: NON_ATTR.test(p.moe), acts: ACTEURS.filter(a => a.pr.includes(p.id)).length }))
      .filter(r => (state.pfam === "all" || famOf(r.p) === state.pfam) && (!state.pnon || r.libre) &&
        (state.phz === "all" || (r.j && r.j[0] <= +state.phz)) &&
        (!q || [r.p.n, r.p.sub, r.p.moe, r.p.moa, r.p.fin, r.p.pros || "", r.p.app].join(" ").toLowerCase().includes(q)))
      .sort((a, b) => state.psort === "nom" ? a.p.n.localeCompare(b.p.n, "fr") : ((a.j ? a.j[0] : 9999) - (b.j ? b.j[0] : 9999)) || a.p.n.localeCompare(b.p.n, "fr"));
  }
  function vProspection() {
    const modes = `<div class="pmodes" role="group" aria-label="Mode"><button type="button" class="pmode" data-pmode="opp" aria-pressed="${state.pmode === "opp"}">Opportunités métiers</button><button type="button" class="pmode" data-pmode="prog" aria-pressed="${state.pmode === "prog"}">Programmes</button></div>`;
    return state.pmode === "opp" ? vOpp(modes) : vProsProg(modes);
  }
  function renderPros() { if (state.pmode === "opp") renderOpp(); else renderProsProg(); }
  function vProsProg(modes) {
    const fch = [["all", "Toutes", null]].concat(Object.entries(FAMILLES).map(([k, f]) => [k, f.court, k]))
      .map(([k, l, c]) => `<button class="fchip" type="button" data-pfam="${k}" aria-pressed="${state.pfam === k}">${c ? `<span class="sw" style="background:${col(c)}"></span>` : ""}${l}</button>`).join("");
    return `<div class="view-head"><h2>Prospection</h2>${modes}
      <p>Les programmes en développement ou en projet, avec l'acheteur, l'attributaire connu, le prochain jalon et les opportunités documentées. Un programme dont le maître d'œuvre n'est pas encore attribué ou publié est signalé : c'est souvent là que les marchés restent à prendre. Tout vient des fiches et de leurs sources ; rien n'est extrapolé.</p></div>
      <div class="filters">
        <div class="fchips" id="pfams">${fch}</div>
        <div class="act-search pros-search">
          <div><label class="note" for="pq">Rechercher</label><input id="pq" type="search" placeholder="ex. radar, Airbus, constellation…" value="${esc(state.pq)}"></div>
          <div><label class="note" for="phz">Prochain jalon</label><select id="phz">${[["all", "Tous horizons"], ["2027", "D'ici fin 2027"], ["2028", "D'ici fin 2028"], ["2030", "D'ici fin 2030"]].map(([v, l]) => `<option value="${v}"${state.phz === v ? " selected" : ""}>${l}</option>`).join("")}</select></div>
          <div><label class="note" for="psort">Trier par</label><select id="psort"><option value="jal"${state.psort === "jal" ? " selected" : ""}>Prochain jalon</option><option value="nom"${state.psort === "nom" ? " selected" : ""}>Nom</option></select></div>
        </div>
        <label class="pnon"><input type="checkbox" id="pnon"${state.pnon ? " checked" : ""}> Seulement les programmes sans maître d'œuvre attribué ou publié</label>
      </div>
      <div class="fin-kpis" id="pkpis"></div>
      <div class="pros-tools"><button type="button" class="reset" data-preset="1">Réinitialiser les filtres</button><button type="button" class="reset" id="pcsv">Télécharger la liste (CSV)</button></div>
      <div id="plistp"></div>`;
  }
  function renderProsProg() {
    const el = document.getElementById("plistp");
    if (!el) return;
    const rows = prosRows();
    document.querySelectorAll("#pfams .fchip").forEach(b => b.setAttribute("aria-pressed", b.dataset.pfam === state.pfam));
    const y = Math.floor(NOW);
    document.getElementById("pkpis").innerHTML = [
      ["Programmes affichés", rows.length],
      ["Sans maître d'œuvre attribué", rows.filter(r => r.libre).length],
      [`Prochain jalon en ${y + 1}`, rows.filter(r => r.j && r.j[0] <= y + 1).length],
      ["Avec opportunités documentées", rows.filter(r => r.p.pros).length]
    ].map(([l, v]) => `<div class="kpi"><span>${l}</span><b class="mono">${v}</b></div>`).join("");
    el.innerHTML = rows.length ? `<div class="pros-grid">${rows.map(({ p, j, libre, acts }) => `
      <article class="pros" style="--fc:${col(famOf(p))}">
        <div class="pros-h"><button type="button" class="lnk pros-t" data-goto="${p.id}">${esc(p.n)}</button>${pill(p.st)}</div>
        <p class="note">${esc(FAMILLES[famOf(p)].court)} · ${esc(DOMAINES[p.d].nom)}</p>
        <dl>
          <dt>Acheteur</dt><dd>${esc(p.moa)}</dd>
          <dt>Attribution</dt><dd>${libre ? '<span class="libre">À attribuer ou non publié</span> ' : ""}${esc(p.moe)}</dd>
          ${(() => { const d = dernierJalon(p); return d ? `<dt>Dernier jalon</dt><dd><span class="mono">${d[0]}</span> ${esc(d[1])}</dd>` : ""; })()}
          <dt>Prochain jalon</dt><dd>${j ? `<span class="mono">${j[0]}</span> ${esc(j[1])}` : '<span class="note">Non publié</span>'}</dd>
          <dt>Budget</dt><dd>${esc(p.bud)} <span class="conf">${p.bc}</span></dd>
          ${p.pros ? `<dt>Opportunités</dt><dd class="pros-o">${esc(p.pros)}</dd>` : ""}
        </dl>
        <p class="note">${acts} acteur${acts > 1 ? "s" : ""} impliqué${acts > 1 ? "s" : ""} · ${(LIENS[p.id] || []).length} source${(LIENS[p.id] || []).length > 1 ? "s" : ""}</p>
      </article>`).join("")}</div>` : `<p class="note">Aucun programme ne correspond. Élargissez la famille ou l'horizon.</p>`;
  }
  function prosCsv() {
    const rows = prosRows();
    const cell = v => `"${String(v == null ? "" : v).replace(/"/g, '""')}"`;
    const head = ["Programme", "Famille", "Domaine", "Statut", "Acheteur", "Maître d'œuvre", "À attribuer", "Prochain jalon (année)", "Prochain jalon", "Budget", "Confiance", "Opportunités", "Part de la France (ESA)", "Acteurs impliqués", "Sources"];
    const lines = [head.map(cell).join(";")].concat(rows.map(({ p, j, libre }) => [p.n, FAMILLES[famOf(p)].nom, DOMAINES[p.d].nom, STATUTS[p.st], p.moa, p.moe, libre ? "oui" : "non", j ? j[0] : "", j ? j[1] : "", p.bud, p.bc, p.pros || "", p.frEsa ? p.frEsa.txt : "",
      ACTEURS.filter(a => a.pr.includes(p.id)).map(a => a.n).join(", "), (LIENS[p.id] || []).map(l => l[2]).join(" ")].map(cell).join(";")));
    const blob = new Blob(["\ufeff" + lines.join("\r\n")], { type: "text/csv;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob); a.download = "atlas-prospection.csv";
    document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  }

  /* ================= PROSPECTION : OPPORTUNITÉS MÉTIERS ================= */
  const oppById = Object.fromEntries(OPPORTUNITES.map(o => [o.id, o]));
  const OST_ORDER = { confirmee: 0, probable: 1, surveiller: 2 };
  let ACC = {};
  try { ACC = JSON.parse(localStorage.getItem("atlas-acc") || "{}") || {}; } catch (e) { ACC = {}; }
  const saveAcc = () => { try { localStorage.setItem("atlas-acc", JSON.stringify(ACC)); } catch (e) {} };
  const oppActs = o => o.acheteur.concat(o.four || [], o.client ? [o.client] : []).filter(id => actById[id]);
  const oppPays = o => [...new Set(o.acheteur.map(id => actById[id] && actById[id].p).concat(o.site ? [SITES.find(x => x.id === o.site).p] : []).filter(Boolean))];
  const oScore = o => scoreOpp(o, ACC[o.id] == null ? null : +ACC[o.id]);
  const ostTag = st => `<span class="ost ${st} st-${st}">${esc(OPP_STATUTS[st].nom)}</span>`;
  const mTags = ms => ms.map(m => `<span class="mtag mt-${m}">${esc(METIERS[m].court)}</span>`).join("");
  const actLink = id => actById[id] ? `<button type="button" class="lnk" data-actor="${id}">${esc(actById[id].n)}</button>` : esc(id);
  const fmtD = d => { if (!d) return "non documentée"; const [y, m, j] = d.split("-"); const mois = ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."]; return (j ? +j + " " : "") + (m ? mois[+m - 1] + " " : "") + y; };
  function oppRows() {
    const q = state.oq.trim().toLowerCase();
    return OPPORTUNITES.map(o => ({ o, sc: oScore(o), pays: oppPays(o) }))
      .filter(({ o, pays }) => (state.om === "all" || o.metiers.includes(state.om)) && (state.ost === "all" || o.statut === state.ost) &&
        (state.opays === "all" || pays.includes(state.opays)) && (state.oact === "all" || oppActs(o).includes(state.oact)) &&
        (state.oprog === "all" || o.prog === state.oprog) && (state.ophase === "all" || o.phase === state.ophase) && (state.obc === "all" || o.bc === state.obc) &&
        (!q || [o.titre, o.lot, o.fab.txt, o.action, o.note || "", byId[o.prog] ? byId[o.prog].n : "", oppActs(o).map(id => actById[id].n).join(" ")].join(" ").toLowerCase().includes(q)))
      .sort((a, b) => state.osort === "score" ? (b.sc.total - a.sc.total) || (OST_ORDER[a.o.statut] - OST_ORDER[b.o.statut])
        : ((a.o.ech ? a.o.ech.d : "9999").localeCompare(b.o.ech ? b.o.ech.d : "9999")) || (b.sc.total - a.sc.total));
  }
  function vOpp(modes) {
    const opt = (id, lab, list, cur) => `<div><label class="note" for="${id}">${lab}</label><select id="${id}">${list.map(([v, l]) => `<option value="${esc(v)}"${cur === v ? " selected" : ""}>${esc(l)}</option>`).join("")}</select></div>`;
    const paysL = [...new Set(OPPORTUNITES.flatMap(oppPays))].sort((a, b) => (PAYS[a] || a).localeCompare(PAYS[b] || b, "fr"));
    const actL = [...new Set(OPPORTUNITES.flatMap(oppActs))].sort((a, b) => actById[a].n.localeCompare(actById[b].n, "fr"));
    const progL = [...new Set(OPPORTUNITES.map(o => o.prog).filter(id => byId[id]))].sort((a, b) => byId[a].n.localeCompare(byId[b].n, "fr"));
    const mch = [["all", "Tous les métiers"]].concat(Object.entries(METIERS).map(([k, m]) => [k, m.court]))
      .map(([k, l]) => `<button class="fchip" type="button" data-om="${k}" aria-pressed="${state.om === k}">${k !== "all" ? `<span class="sw" style="background:var(--m-${k})"></span>` : ""}${esc(l)}</button>`).join("");
    const sch = [["all", "Tous les statuts"]].concat(Object.entries(OPP_STATUTS).map(([k, s]) => [k, s.nom]))
      .map(([k, l]) => `<button class="fchip" type="button" data-ost="${k}" aria-pressed="${state.ost === k}">${k !== "all" ? `<span class="sw st-${k}" style="background:var(--sc)"></span>` : ""}${esc(l)}</button>`).join("");
    return `<div class="view-head"><h2>Prospection</h2>${modes}
      <p>Opportunités industrielles pour trois métiers : MLI et isolation thermique, harnais électriques, structures et panneaux. Chaque fiche dit qui achète, ce qui est documenté et ce qui ne l'est pas. Aucune valeur de marché n'est estimée et le budget d'un programme n'entre pas dans le score. Sources vérifiées le ${fmtD(DATE_VERIF)}.</p></div>
      <div class="opp-legend">${Object.entries(OPP_STATUTS).map(([k, s]) => `<div class="st-${k}">${ostTag(k)} <span class="note">${esc(s.def)}</span></div>`).join("")}</div>
      <div class="filters">
        <div class="fchips" id="oms">${mch}</div>
        <div class="fchips" id="osts" style="margin-top:8px">${sch}</div>
        <div class="opp-search">
          <div><label class="note" for="oq">Rechercher</label><input id="oq" type="search" placeholder="ex. Toulouse, radar, coiffe…" value="${esc(state.oq)}"></div>
          ${opt("opays", "Pays", [["all", "Tous les pays"]].concat(paysL.map(p => [p, PAYS[p] || p])), state.opays)}
          ${opt("oact", "Acteur", [["all", "Tous les acteurs"]].concat(actL.map(a => [a, actById[a].n])), state.oact)}
          ${opt("oprog", "Programme", [["all", "Tous les programmes"]].concat(progL.map(p => [p, byId[p].n])), state.oprog)}
          ${opt("ophase", "Phase", [["all", "Toutes les phases"]].concat(Object.entries(PHASES).map(([k, p]) => [k, p.nom])), state.ophase)}
          ${opt("obc", "Confiance", [["all", "Toutes"], ["A", "A : vérifiée"], ["B", "B : publiée"], ["C", "C : estimation"]], state.obc)}
          ${opt("osort", "Trier par", [["ech", "Échéance"], ["score", "Score"]], state.osort)}
        </div>
      </div>
      <div class="fin-kpis" id="okpis"></div>
      <div class="pros-tools"><button type="button" class="reset" data-oreset="1">Réinitialiser les filtres</button><button type="button" class="reset" id="ocsv">Télécharger les opportunités (CSV)</button></div>
      <div id="olist"></div>
      <section class="opp-sec"><h3>Prochaines actions</h3><p class="note">Pour les opportunités affichées, par score décroissant. Ce sont des pistes de démarche, pas des engagements.</p><ol class="act-list" id="oacts"></ol></section>
      <section class="opp-sec"><h3>Journal des événements commerciaux</h3>
        <div class="opp-search" style="grid-template-columns:minmax(0,1fr) minmax(0,1fr)">${opt("etype", "Type d'événement", [["all", "Tous les types"]].concat(Object.entries(EVT_TYPES)), state.etype)}<div><span class="note">Filtres appliqués</span><span class="note">Métier, pays, acteur et programme ci-dessus</span></div></div>
        <ul class="evt-list" id="oevts" style="margin-top:10px"></ul></section>
      <section class="opp-sec"><h3>Comment le score est calculé</h3>
        <p class="note">Six critères à poids égal, notés de 0 à 3, soit 18 points au plus. Adéquation technique : 3 si une source cite le lot ou son fournisseur, 2 pour un engin complet en fabrication, 1 si le matériel de vol est prévu, 0 sinon. Maturité : 3 en production série, 2 en réalisation (C/D), 1 en phase B, 0 en étude. Volume : 3 au-delà de 20 unités, 2 de 5 à 20, 1 de 2 à 4, 0 pour une seule ou une quantité inconnue. Proximité : 3 si l'échéance documentée tombe dans les 12 mois, 2 dans les 24 mois, 1 au-delà ou si la date est estimée, 0 si elle est inconnue. Accessibilité : jugement commercial à saisir sur chaque fiche, enregistré seulement dans ce navigateur. Qualité : 3 pour une confiance A vérifiée depuis moins de 6 mois, 2 pour A ou B, 1 pour C, 0 si la source la plus récente a plus de 2 ans.</p></section>`;
  }
  function oppCard({ o, sc }) {
    const p = byId[o.prog], site = o.site ? SITES.find(x => x.id === o.site) : null;
    const rows = SCORE_CRITERES.map(([k, l]) => `<tr><td>${esc(l)}</td><td>${esc(sc[k][1])}</td><td class="n">${sc[k][0]} / 3</td></tr>`).join("");
    const acc = ACC[o.id] == null ? "" : String(ACC[o.id]);
    return `<article class="opp ${o.statut} st-${o.statut}" id="opp-${o.id}">
      <div class="opp-h"><h4 class="opp-t">${esc(o.titre)}</h4>${ostTag(o.statut)}</div>
      <div>${mTags(o.metiers)}</div>
      <div class="score" title="Score explicable sur 18"><b>${sc.total}</b><span class="note">/ 18</span><span class="track"><i style="width:${sc.total / 18 * 100}%"></i></span></div>
      <dl>
        ${p ? `<dt>Programme</dt><dd><button type="button" class="lnk" data-goto="${p.id}">${esc(p.n)}</button></dd>` : ""}
        <dt>Acheteur</dt><dd>${o.acheteur.map(actLink).join(", ")}${o.client && !o.acheteur.includes(o.client) ? ` <span class="note">· client final : ${actLink(o.client)}</span>` : ""}</dd>
        <dt>Site</dt><dd>${site ? `${esc(site.n)} <span class="note">(${esc(site.txt)})</span>` : '<span class="note">Non documenté</span>'}</dd>
        <dt>Lot</dt><dd>${esc(o.lot)}</dd>
        <dt>Phase</dt><dd>${esc((PHASES[o.phase] || PHASES.nd).nom)}</dd>
        <dt>Échéance</dt><dd>${o.ech ? `<span class="mono">${esc(fmtD(o.ech.d))}</span> ${esc(o.ech.lib)}${o.ech.doc ? "" : ' <span class="libre">estimation</span>'}` : '<span class="note">Non documentée</span>'}</dd>
        <dt>Quantité</dt><dd>${esc(o.qte.lib)}</dd>
        <dt>Fabrication</dt><dd>${esc({ interne: "Interne", externe: "Externe", mixte: "Mixte", inconnu: "Interne ou externe : non documenté" }[o.fab.mode])}. ${esc(o.fab.txt)}${(o.four || []).length ? ` <span class="note">Fournisseurs cités : ${o.four.map(actLink).join(", ")}</span>` : ""}</dd>
        <dt>Valeur</dt><dd>${o.valeur ? esc(o.valeur) : '<span class="note">Non estimée (aucune méthode défendable)</span>'}</dd>
        <dt>Confiance</dt><dd><span class="conf">${o.bc}</span></dd>
      </dl>
      ${o.note ? `<p class="opp-note">${esc(o.note)}</p>` : ""}
      <p class="opp-act"><b>Prochaine action.</b> ${esc(o.action)}</p>
      <details><summary>Détail du score et accessibilité</summary>
        <table class="sc-tab">${rows}</table>
        <p class="note" style="margin-top:6px"><label>Accessibilité du donneur d'ordre (votre appréciation, gardée dans ce navigateur) : <select class="oacc" data-oid="${o.id}"><option value=""${acc === "" ? " selected" : ""}>non évaluée</option>${[0, 1, 2, 3].map(n => `<option value="${n}"${acc === String(n) ? " selected" : ""}>${n}</option>`).join("")}</select></label></p>
      </details>
      <details><summary>${o.sources.filter(Boolean).length} source${o.sources.filter(Boolean).length > 1 ? "s" : ""}</summary><ul class="opp-src">${o.sources.filter(Boolean).map(s => `<li><a href="${esc(s.u)}" target="_blank" rel="noopener">${esc(s.t)} ↗</a> <span class="note">publiée : ${esc(fmtD(s.pub))} · vérifiée : ${esc(fmtD(s.verif))}</span></li>`).join("")}</ul></details>
      <p class="note"><button type="button" class="lnk" data-share="opp/${o.id}">Copier le lien de cette opportunité</button></p>
    </article>`;
  }
  function renderOpp() {
    const el = document.getElementById("olist");
    if (!el) return;
    const rows = oppRows();
    document.querySelectorAll("#oms .fchip").forEach(b => b.setAttribute("aria-pressed", b.dataset.om === state.om));
    document.querySelectorAll("#osts .fchip").forEach(b => b.setAttribute("aria-pressed", b.dataset.ost === state.ost));
    const n = st => rows.filter(r => r.o.statut === st).length;
    document.getElementById("okpis").innerHTML = [
      ["Opportunités affichées", rows.length], ["Confirmées", n("confirmee")], ["Probables", n("probable")], ["À surveiller", n("surveiller")],
      ["Échéance dans les 12 mois", rows.filter(r => r.o.ech && r.o.ech.doc && moisEntre(DATE_VERIF, r.o.ech.d) >= 0 && moisEntre(DATE_VERIF, r.o.ech.d) <= 12).length]
    ].map(([l, v]) => `<div class="kpi"><span>${l}</span><b class="mono">${v}</b></div>`).join("");
    el.innerHTML = rows.length ? `<div class="pros-grid">${rows.map(oppCard).join("")}</div>` : `<p class="note">Aucune opportunité ne correspond. Élargissez les filtres.</p>`;
    document.getElementById("oacts").innerHTML = rows.slice().sort((a, b) => b.sc.total - a.sc.total).map(({ o, sc }) =>
      `<li class="st-${o.statut}"><span class="mono">${sc.total}/18</span> · <button type="button" class="lnk" data-opp="${o.id}">${esc(o.titre)}</button> ${ostTag(o.statut)}<br>${esc(o.action)}</li>`).join("") || `<li class="note">Aucune action pour ces filtres.</li>`;
    const ok = new Set(rows.map(r => r.o.id));
    const fil = state.om !== "all" || state.opays !== "all" || state.oact !== "all" || state.oprog !== "all" || state.ost !== "all" || state.ophase !== "all" || state.obc !== "all" || state.oq.trim();
    const evs = EVENEMENTS.filter(e => (state.etype === "all" || e.type === state.etype) &&
      (!fil || (e.opp && ok.has(e.opp)) || (state.oact !== "all" && e.act === state.oact) || (state.oprog !== "all" && e.prog === state.oprog)))
      .filter(e => state.om === "all" || !e.metiers.length || e.metiers.includes(state.om) || (e.opp && ok.has(e.opp)))
      .sort((a, b) => b.d.localeCompare(a.d));
    document.getElementById("oevts").innerHTML = evs.map(e => `<li${e.opp && oppById[e.opp] ? ` class="st-${oppById[e.opp].statut}"` : ""}><span class="ed">${esc(fmtD(e.d))}</span><span class="evt-ty">${esc(EVT_TYPES[e.type])}</span>${esc(e.txt)}
      <span class="note">${actById[e.act] ? " · " + actLink(e.act) : ""}${e.prog && byId[e.prog] ? ` · <button type="button" class="lnk" data-goto="${e.prog}">${esc(byId[e.prog].n)}</button>` : ""}${e.opp && oppById[e.opp] ? ` · <button type="button" class="lnk" data-opp="${e.opp}">voir l'opportunité</button>` : ""} · ${e.src ? `<a href="${esc(e.src.u)}" target="_blank" rel="noopener">source ↗</a> (vérifiée le ${esc(fmtD(e.src.verif))})` : "source non documentée"} <span class="conf">${e.bc}</span></span></li>`).join("") || `<li class="note">Aucun événement pour ces filtres.</li>`;
  }
  function gotoOpp(id, opts) {
    opts = opts || {};
    if (!oppById[id]) return;
    if (!oppRows().some(r => r.o.id === id)) Object.assign(state, { om: "all", ost: "all", opays: "all", oact: "all", oprog: "all", ophase: "all", obc: "all", oq: "" });
    state.pmode = "opp"; rendered.prospection = false;
    show("prospection", { noHash: true, keepScroll: true });
    if (!opts.noHash) setHash("opp/" + id, opts.replace);
    const el = document.getElementById("opp-" + id);
    if (el) { el.scrollIntoView({ block: "start" }); el.classList.add("flash"); setTimeout(() => el.classList.remove("flash"), 1800); }
  }
  function oppCsv() {
    const rows = oppRows();
    const cell = v => `"${String(v == null ? "" : v).replace(/"/g, '""')}"`;
    const head = ["Opportunité", "Statut", "Métiers", "Programme", "Acheteur", "Client final", "Pays", "Site", "Lot", "Phase", "Échéance", "Échéance (libellé)", "Échéance estimée", "Quantité", "Fabrication", "Fournisseurs cités", "Valeur", "Confiance", "Score /18"].concat(SCORE_CRITERES.map(c => c[1])).concat(["Prochaine action", "Remarque", "Sources (URL | publiée | vérifiée)"]);
    const lines = [head.map(cell).join(";")].concat(rows.map(({ o, sc, pays }) => [o.titre, OPP_STATUTS[o.statut].nom, o.metiers.map(m => METIERS[m].court).join(", "), byId[o.prog] ? byId[o.prog].n : "",
      o.acheteur.map(id => actById[id] ? actById[id].n : id).join(", "), o.client && actById[o.client] ? actById[o.client].n : "", pays.map(p => PAYS[p] || p).join(", "),
      o.site ? SITES.find(x => x.id === o.site).n : "", o.lot, (PHASES[o.phase] || PHASES.nd).nom, o.ech ? o.ech.d : "", o.ech ? o.ech.lib : "", o.ech && !o.ech.doc ? "oui" : "non",
      o.qte.lib, o.fab.txt, (o.four || []).map(id => actById[id].n).join(", "), o.valeur || "non estimée", o.bc, sc.total].concat(SCORE_CRITERES.map(([k]) => sc[k][0] + " – " + sc[k][1]))
      .concat([o.action, o.note || "", o.sources.filter(Boolean).map(s => `${s.u} | ${s.pub || "non documentée"} | ${s.verif}`).join(" ; ")]).map(cell).join(";")));
    const blob = new Blob(["﻿" + lines.join("\r\n")], { type: "text/csv;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob); a.download = "atlas-opportunites.csv";
    document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  }

  /* ================= VUE : FINANCES ================= */
  const fmtM = v => v >= 1000 ? (v / 1000).toLocaleString("fr-FR", { maximumFractionDigits: 2 }) + " Md€" : v.toLocaleString("fr-FR", { maximumFractionDigits: 1 }) + " M€";
  const entName = r => r.ent;
  function finRows() {
    const src = state.ds === "contrats" ? CONTRATS : LEVEES;
    return src.filter(r => r.a >= state.y0 && r.a <= state.y1 &&
      (!state.fams.length || state.fams.includes(r.fam)) &&
      (state.ent === "all" || entName(r) === state.ent) &&
      (state.ds !== "contrats" || state.finT === "all" || r.fin === state.finT) &&
      (state.ds !== "levees" || state.ty === "all" || r.ty === state.ty));
  }
  function vFinances() {
    return `<div class="view-head"><h2>Tableau de bord financier</h2>
      <p>Trois jeux de données séparés, parce qu'ils ne mesurent pas la même chose : les contrats et engagements publics, les levées de fonds privées, et les grandes séries annuelles. Choisissez un jeu, puis filtrez : tous les graphiques se recalculent. Les montants sont ceux qui ont été publiés ; ce tableau de bord n'est pas un recensement complet du marché.</p></div>
      <div class="seg" role="group" aria-label="Jeu de données" id="dsSeg">
        ${[["contrats", "Contrats publics", CONTRATS.length], ["levees", "Levées de fonds", LEVEES.length], ["series", "Séries annuelles", SERIES.length]].map(([k, l, n]) =>
          `<button type="button" data-ds="${k}" aria-pressed="${state.ds === k}">${l} <span class="mono">${n}</span></button>`).join("")}
      </div>
      <div id="finBody"></div>`;
  }
  function renderFin() {
    const body = document.getElementById("finBody");
    if (!body) return;
    document.querySelectorAll("#dsSeg button").forEach(b => b.setAttribute("aria-pressed", b.dataset.ds === state.ds));
    if (state.ds === "series") { body.innerHTML = seriesHtml(); return; }
    const src = state.ds === "contrats" ? CONTRATS : LEVEES;
    const years = [...new Set(src.map(r => r.a))].sort();
    const ents = [...new Set(src.map(entName))].sort((x, y) => x.localeCompare(y, "fr"));
    const fams = [...new Set(src.map(r => r.fam))];
    const rows = finRows();
    const total = rows.reduce((t, r) => t + r.m, 0);
    const big = rows.slice().sort((x, y) => y.m - x.m)[0];
    const byEnt = groupSum(rows, entName), byYear = groupSum(rows, r => r.a), byFam = groupSum(rows, r => r.fam);
    const topEnt = Object.entries(byEnt).sort((x, y) => y[1] - x[1])[0];
    const yearOpts = sel => years.map(y => `<option value="${y}"${y === sel ? " selected" : ""}>${y}</option>`).join("");
    const extra = state.ds === "contrats"
      ? `<div><label class="note" for="finT">Financeur</label><select id="finT"><option value="all">Tous</option>${[...new Set(CONTRATS.map(r => r.fin))].map(f => `<option${state.finT === f ? " selected" : ""}>${esc(f)}</option>`).join("")}</select></div>`
      : `<div><label class="note" for="fty">Type</label><select id="fty"><option value="all">Capital et dette</option>${["Capital", "Dette"].map(f => `<option${state.ty === f ? " selected" : ""}>${f}</option>`).join("")}</select></div>`;
    body.innerHTML = `
      <div class="fin-filters">
        <div><label class="note" for="fy0">De</label><select id="fy0">${yearOpts(Math.max(state.y0, years[0]))}</select></div>
        <div><label class="note" for="fy1">À</label><select id="fy1">${yearOpts(Math.min(state.y1, years[years.length - 1]))}</select></div>
        <div><label class="note" for="fent">Entreprise</label><select id="fent"><option value="all">Toutes</option>${ents.map(e => `<option${state.ent === e ? " selected" : ""}>${esc(e)}</option>`).join("")}</select></div>
        ${extra}
        <div class="fin-fams"><span class="note">Secteurs</span><div class="fchips">${fams.map(f => `<button class="fchip" type="button" data-ffam="${f}" aria-pressed="${state.fams.includes(f)}"><span class="sw" style="background:${col(f)}"></span>${FAMILLES[f].court}</button>`).join("")}</div></div>
        <div><span class="note">&nbsp;</span><button type="button" class="reset" data-freset="1">Réinitialiser</button></div>
      </div>
      <div class="fin-kpis">
        <div class="kpi"><span>Total affiché</span><b class="mono">${fmtM(total)}</b></div>
        <div class="kpi"><span>${state.ds === "contrats" ? "Contrats" : "Opérations"}</span><b class="mono">${rows.length}</b></div>
        <div class="kpi"><span>Plus gros montant</span><b class="mono">${big ? fmtM(big.m) : "—"}</b><small>${big ? esc(entName(big)) + " · " + big.a : ""}</small></div>
        <div class="kpi"><span>Premier bénéficiaire</span><b class="mono">${topEnt ? Math.round(topEnt[1] / total * 100) + " %" : "—"}</b><small>${topEnt ? esc(topEnt[0]) : ""}</small></div>
      </div>
      ${rows.length ? `<div class="fin-charts">
        <div class="panel"><h3 class="ch-t">Par année</h3>${barsV(byYear)}</div>
        <div class="panel"><h3 class="ch-t">Par secteur</h3>${barsH(Object.entries(byFam).sort((x, y) => y[1] - x[1]).map(([k, v]) => [FAMILLES[k].nom, v, col(k), null]))}</div>
        <div class="panel wide"><h3 class="ch-t">Par bénéficiaire <span class="note">(un clic filtre)</span></h3>${barsH(Object.entries(byEnt).sort((x, y) => y[1] - x[1]).slice(0, 12).map(([k, v]) => [k, v, "var(--accent)", k]))}</div>
      </div>
      <div class="panel" style="margin-top:16px;overflow-x:auto">
        <h3 class="ch-t">Détail des lignes</h3>
        <table class="fin-table"><thead><tr>
          <th><button type="button" data-fsort="a">Année</button></th><th>${state.ds === "contrats" ? "Objet" : "Entreprise"}</th><th>${state.ds === "contrats" ? "Bénéficiaire" : "Pays / type"}</th><th>Secteur</th>
          <th class="num"><button type="button" data-fsort="m">Montant</button></th><th>Conf.</th></tr></thead><tbody>
          ${rows.slice().sort((x, y) => state.sort === "a" ? y.a - x.a || y.m - x.m : y.m - x.m).map(r => `<tr>
            <td class="mono">${r.a}</td>
            <td>${state.ds === "contrats" ? (r.prog && byId[r.prog] ? `<button type="button" class="lnk" data-goto="${r.prog}">${esc(r.lib)}</button>` : esc(r.lib)) : esc(r.ent)}${r.note ? `<div class="note">${esc(r.note)}</div>` : ""}</td>
            <td>${state.ds === "contrats" ? ([].concat(r.act || []).length ? [].concat(r.act).map(x => actById[x] ? `<button type="button" class="lnk" data-actor="${x}">${esc(actById[x].n)}</button>` : esc(x)).join(", ") : esc(r.ent)) + `<div class="note">${esc(r.fin)}${r.eng ? ` · <span class="eng">${ENG[r.eng]}</span>` : ""}</div>` : esc(PAYS[r.p] || r.p) + " · " + esc(r.ty)}</td>
            <td><span class="sw" style="background:${col(r.fam)}"></span> ${FAMILLES[r.fam].court}</td>
            <td class="num mono">${fmtM(r.m)}</td><td><span class="conf">${r.bc}</span></td></tr>`).join("")}
        </tbody></table>
      </div>` : `<p class="note" style="margin-top:16px">Aucune ligne ne correspond à ces filtres. Élargissez la période ou cliquez sur « Réinitialiser ».</p>`}`;
  }
  function groupSum(rows, key) { const o = {}; rows.forEach(r => { const k = key(r); o[k] = (o[k] || 0) + r.m; }); return o; }
  function niceMax(v) { const p = Math.pow(10, Math.floor(Math.log10(v))); const n = v / p; return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 2.5 ? 2.5 : n <= 5 ? 5 : 10) * p; }
  function barsV(obj, unit) {
    const ks = Object.keys(obj).map(Number).sort((a, b) => a - b);
    const all = []; for (let y = ks[0]; y <= ks[ks.length - 1]; y++) all.push(y);
    const max = niceMax(Math.max(...Object.values(obj)));
    const W = 560, H = 230, L = 52, B = 26, T = 14, bw = Math.min(34, (W - L - 10) / all.length - 6);
    const x = i => L + 6 + i * ((W - L - 10) / all.length), y = v => T + (H - T - B) * (1 - v / max);
    const fmt = unit === "Md" ? (v => v.toLocaleString("fr-FR") + " Md€") : fmtM;
    let s = `<svg viewBox="0 0 ${W} ${H}" class="chart" role="img" aria-label="Montants par année">`;
    [0, .25, .5, .75, 1].forEach(f => { const v = max * f; s += `<line x1="${L}" x2="${W - 4}" y1="${y(v)}" y2="${y(v)}" stroke="var(--line)" stroke-width="${f ? .6 : 1}"></line><text x="${L - 6}" y="${y(v) + 4}" text-anchor="end" font-size="10.5" fill="var(--muted)" font-family="var(--font-mono)">${unit === "Md" ? v.toLocaleString("fr-FR") : (v >= 1000 ? (v / 1000).toLocaleString("fr-FR") + " Md" : Math.round(v))}</text>`; });
    const step = all.length > 12 ? 2 : 1;
    all.forEach((yr, i) => {
      const v = obj[yr] || 0, cx = x(i);
      if (v) s += `<g class="bar"><path d="M${cx},${y(0)} V${y(v) + 4} q0,-4 4,-4 h${bw - 8} q4,0 4,4 V${y(0)} Z" fill="var(--accent)"></path><rect x="${cx - 3}" y="${T}" width="${bw + 6}" height="${H - T - B}" fill="transparent"><title>${yr} : ${fmt(v)}</title></rect></g>`;
      if (i % step === 0) s += `<text x="${cx + bw / 2}" y="${H - 8}" text-anchor="middle" font-size="10.5" fill="var(--muted)" font-family="var(--font-mono)">${yr}</text>`;
    });
    return s + `</svg>`;
  }
  function barsH(items, unit) {
    if (!items.length) return "";
    const max = Math.max(...items.map(i => i[1]));
    const fmt = unit === "Md" ? (v => v.toLocaleString("fr-FR") + " Md€") : fmtM;
    return `<div class="hb-list">${items.map(([lab, v, c, filt]) => `
      <${filt ? `button type="button" data-fent="${esc(filt)}"` : "div"} class="hb${filt && state.ent === filt ? " on" : ""}" title="${esc(lab)} : ${fmt(v)}">
        <span class="hb-l">${esc(lab)}</span><span class="hb-t"><i style="width:${Math.max(1.5, v / max * 100)}%;background:${c}"></i></span><span class="hb-v mono">${fmt(v)}</span>
      </${filt ? "button" : "div"}>`).join("")}</div>`;
  }
  function seriesHtml() {
    const max = niceMax(Math.max(...SERIES.flatMap(s => s.pts.map(p => p[1]))));
    const cards = SERIES.map(sr => {
      const obj = Object.fromEntries(sr.pts.map(p => [p[0], p[1]]));
      const last = sr.pts[sr.pts.length - 1];
      return `<div class="panel"><h3 class="ch-t">${esc(sr.nom)}</h3>
        <div class="kpi-inline"><b class="mono">${last[1].toLocaleString("fr-FR")} Md€</b><span class="note">en ${last[0]} <span class="conf">${last[2]}</span></span></div>
        ${sr.pts.length > 3 ? barsV(obj, "Md") : barsH(sr.pts.map(p => [String(p[0]) + (p[2] === "C" ? " (déduit)" : ""), p[1], "var(--accent)", null]), "Md")}
        <p class="note">${esc(sr.note)} Source : ${esc(sr.src)}.</p></div>`;
    }).join("");
    return `<p class="note" style="margin:14px 0">Quatre séries en milliards d'euros, présentées côte à côte et non superposées : elles mesurent des choses différentes (dépense publique, ventes industrielles, capital privé).</p>
      <div class="fin-charts">${cards}
        <div class="panel"><h3 class="ch-t">Contributions nationales à l'ESA en 2024</h3>${barsH(CONTRIB.map(c => [c.p, c.m, "var(--accent)", null]))}
        <p class="note">Au CM25 (2026-2028), l'Allemagne passe à plus de 5 Md€ (23 % du total) et le Royaume-Uni recule à 1,7 Md€.</p></div>
      </div>`;
  }


  /* ================= VISUEL, ÉCHELLE, LIENS ================= */
  const commonsImg = f => "https://commons.wikimedia.org/wiki/Special:FilePath/" + encodeURIComponent(f) + "?width=900";
  const commonsPage = f => "https://commons.wikimedia.org/wiki/File:" + encodeURIComponent(f.replace(/ /g, "_"));
  const nf = v => v.toLocaleString("fr-FR", { maximumFractionDigits: 2 });
  function humanPath(x, yb, s) {
    const h = 1.8 * s, hr = h * 0.075, cx = x + h * 0.13;
    const sh = yb - h * 0.82, hip = yb - h * 0.47;
    return `<g fill="var(--ink)" opacity=".8"><circle cx="${cx}" cy="${yb - h + hr}" r="${hr}"></circle>
      <path d="M${cx - h * 0.09},${sh} h${h * 0.18} l${h * 0.03},${h * 0.33} h-${h * 0.05} l-${h * 0.02},-${h * 0.2} v${h * 0.55} h-${h * 0.05} v-${h * 0.3} h-${h * 0.02} v${h * 0.3} h-${h * 0.05} v-${h * 0.55} l-${h * 0.02},${h * 0.2} h-${h * 0.05} Z"></path></g>`;
  }
  function echelleSvg(v, c) {
    const W = 560, PAD = 14, gap = 1.2;
    const bw = v.corps ? v.corps[0] : 0, bh = v.corps ? v.corps[1] : 0;
    const objW = Math.max(bw, v.env || 0, 0.01);
    const ext = v.extras || [];
    const extMax = ext.length ? Math.max(...ext.map(e => e[1])) : 0;
    const totalH = Math.max(1.8, bh);
    const s = Math.min((W - 2 * PAD - 60 - 48) / Math.max(objW, extMax), (v.lanceur ? 320 : 230) / totalH);
    const extH = ext.length * 26;
    const top = PAD + 14;
    const H = top + totalH * s + 26 + extH + 6;
    const yb = top + totalH * s;
    const x0 = PAD + Math.max((0.5 + gap) * s, 48);
    let g = `<line x1="${PAD - 4}" x2="${W - PAD}" y1="${yb}" y2="${yb}" stroke="var(--line)"></line>`;
    g += humanPath(PAD, yb, s) + `<text x="${PAD}" y="${yb - 1.8 * s - 5}" font-size="10.5" fill="var(--muted)" font-family="var(--font-mono)">1,8 m</text>`;
    if (v.corps) {
      const cx = x0 + objW * s / 2, bx = cx - bw * s / 2, by = yb - bh * s;
      if (v.env) g += `<rect x="${cx - v.env * s / 2}" y="${by + bh * s / 2 - Math.max(2, 0.12 * s)}" width="${v.env * s}" height="${Math.max(4, 0.24 * s)}" rx="1.5" fill="${c}" opacity=".45"></rect>`;
      if (v.lanceur) {
        const nose = Math.min(bh * 0.14, 9) * s;
        g += `<path d="M${bx},${yb} V${by + nose} Q${bx},${by} ${cx},${by} Q${bx + bw * s},${by} ${bx + bw * s},${by + nose} V${yb} Z" fill="${c}" fill-opacity=".22" stroke="${c}" stroke-width="1.5"></path>`;
      } else {
        g += `<rect x="${bx}" y="${by}" width="${bw * s}" height="${bh * s}" rx="2" fill="${c}" fill-opacity=".22" stroke="${c}" stroke-width="1.5"></rect>`;
      }
      g += `<text x="${cx}" y="${yb + 14}" font-size="10.5" text-anchor="middle" fill="var(--muted)" font-family="var(--font-mono)">${nf(bw)} m</text>`;
      g += `<line x1="${bx + bw * s + 6}" x2="${bx + bw * s + 6}" y1="${by}" y2="${yb}" stroke="var(--muted)" stroke-dasharray="2 2"></line><text x="${bx + bw * s + 10}" y="${by + 11}" font-size="10.5" fill="var(--muted)" font-family="var(--font-mono)">${nf(bh)} m</text>`;
      if (v.env) g += `<text x="${cx - v.env * s / 2}" y="${by + bh * s / 2 - Math.max(6, 0.14 * s)}" font-size="10.5" fill="var(--ink)" font-family="var(--font-mono)">envergure ${nf(v.env)} m</text>`;
    } else {
      g += `<text x="${x0}" y="${yb - 10}" font-size="12" fill="var(--muted)">Corps : dimensions non retenues</text>`;
    }
    ext.forEach((e, i) => {
      const y = yb + 26 + i * 26;
      g += `<rect x="${x0}" y="${y - 7}" width="${e[1] * s}" height="6" rx="2" fill="${c}"></rect><text x="${x0}" y="${y + 11}" font-size="11" fill="var(--ink)">${esc(e[0])} : <tspan font-family="var(--font-mono)">${nf(e[1])} m</tspan></text>`;
    });
    return `<svg viewBox="0 0 ${W} ${H}" class="scale-svg" role="img" aria-label="Schéma à l'échelle avec un humain de 1,80 m">${g}</svg>`;
  }
  function visuelHtml(p) {
    const v = typeof VISUELS !== "undefined" && VISUELS[p.id];
    if (!v) return "";
    const c = col(famOf(p));
    const img = v.img ? `<figure class="vis-img">
        <a href="${commonsPage(v.img)}" target="_blank" rel="noopener" class="vis-frame">
          <img src="${commonsImg(v.img)}" alt="${esc(v.leg)}" loading="lazy" onerror="this.closest('.vis-frame').classList.add('ko')">
          <span class="vis-ko">Photo hébergée sur Wikimedia Commons : ouvrir l'image ↗</span>
        </a>
        <figcaption>${esc(v.leg)} · ${v.esa ? "ESA, " : ""}via Wikimedia Commons, licence libre (auteur et licence sur la page du fichier)</figcaption>
      </figure>` : `<div class="vis-img vis-vide"><p>${esc(v.vide || "Pas de visuel libre de droits.")}</p></div>`;
    const sch = (v.corps || (v.extras && v.extras.length)) ? `<figure class="vis-sch">${echelleSvg(v, c)}
        <figcaption>Silhouette simplifiée, à la même échelle que l'humain de 1,80 m. ${esc(v.dimsTxt)}${v.masse ? ` · Masse : ${esc(v.masse)}` : ""} <span class="conf">${v.bc}</span><br>Source : <a href="${v.src[1]}" target="_blank" rel="noopener">${esc(v.src[0])}</a></figcaption></figure>`
      : (v.masse ? `<div class="vis-sch vis-vide"><p>${esc(v.dimsTxt)}. Masse : ${esc(v.masse)} <span class="conf">${v.bc}</span></p>${v.src ? `<p class="note">Source : <a href="${v.src[1]}" target="_blank" rel="noopener">${esc(v.src[0])}</a></p>` : ""}</div>` : "");
    return `<section class="vis" aria-label="Visuel et échelle">${img}${sch}</section>`;
  }

  function unitesHtml(p) {
    const U = typeof UNITES !== "undefined" && UNITES[p.id];
    if (!U || !U.length) return "";
    const lanceur = p.d === "lnc" || p.d === "lnn";
    return `<div class="unites"><h4>${lanceur ? "Vols" : "Satellites de la série"} <span class="mono note">${U.length}</span></h4>
      <div class="u-scroll"><table class="u-table"><thead><tr><th>${lanceur ? "Vol" : "Satellite"}</th><th>Lancement</th><th>${lanceur ? "Version" : "Lanceur"}</th><th>Statut</th><th>${lanceur ? "Mission" : "Instruments et particularités"}</th></tr></thead>
      <tbody>${U.map(([u, d, l, st, x]) => `<tr><td class="u-n">${esc(u)}</td><td class="mono">${esc(d)}</td><td>${esc(l)}</td><td>${lanceur && st === "fin" ? '<span class="pill st-fin">Effectué</span>' : pill(st)}</td><td>${esc(x)}</td></tr>`).join("")}</tbody></table></div></div>`;
  }

  function liensHtml(p) {
    const L = typeof LIENS !== "undefined" && LIENS[p.id];
    if (!L || !L.length) return "";
    return `<div><h4>Pour aller plus loin</h4><ul class="liens">${L.map(([t, l, u]) =>
      `<li><span class="lt lt-${t === "Industriel" ? "ind" : t === "Référence" ? "ref" : t === "Instrument" ? "ins" : "ag"}">${esc(t)}</span><a href="${esc(u)}" target="_blank" rel="noopener">${esc(l)}</a></li>`).join("")}</ul></div>`;
  }


  /* ================= PARC & SUITES ================= */
  const fmtN = v => v.toLocaleString("fr-FR");
  function parcField(p) {
    const c = typeof PARC !== "undefined" && PARC[p.id];
    if (!c) return "";
    const parts = [];
    if (c.orb) parts.push(`${fmtN(c.orb)} mis en orbite`);
    if (c.srv) parts.push(`${fmtN(c.srv)} en service`);
    if (c.prv) parts.push(`${fmtN(c.prv)} prévu${c.prv > 1 ? "s" : ""}`);
    const m = c.m ? ` · ≈ ${fmtN(c.m)} kg l'unité <span class="conf">${c.bc}</span>` : "";
    return `<div class="field"><dt>Satellites</dt><dd>${parts.join(" · ") || "—"}${m}${c.lib ? `<div class="note">${esc(c.lib)}</div>` : ""}</dd></div>`;
  }
  function suitesHtml(p) {
    if (typeof SUITES === "undefined") return "";
    const L = SUITES.filter(x => x.de === p.id);
    if (!L.length) return "";
    return `<div><h4>Suites commerciales</h4>${L.map(x => `<p class="conv-line"><b>${esc(x.titre)}</b> · ${esc(x.type)}, ${x.annee}. ${esc(x.txt)} <span class="conf">${x.bc}</span></p>`).join("")}</div>`;
  }
  function suitesSection() {
    if (typeof SUITES === "undefined") return "";
    return `<h3 class="section-title">Du programme au produit commercial</h3>
      <p class="note" style="margin-bottom:12px;max-width:75ch">Beaucoup de programmes publics ont donné naissance à un produit vendu ensuite : une société de commercialisation, une plateforme exportée, un service. C'est souvent là que se fait le retour sur investissement pour l'industrie.</p>
      <div class="conv-grid">${SUITES.slice().sort((x, y) => x.annee - y.annee).map(x => `
        <div class="conv"><span class="ty">${esc(x.type)} · ${x.annee}</span><h3>${esc(x.titre)}</h3><p>${esc(x.txt)}</p>
        <div class="link-pair">${chip(x.de)} <span class="conf">${x.bc}</span></div></div>`).join("")}</div>`;
  }
  function parcSection() {
    if (typeof PARC === "undefined") return "";
    return `<h3 class="section-title" style="margin-top:0">Parc de satellites de l'atlas</h3>
      <p class="note" style="margin-bottom:12px;max-width:80ch">Recensement des satellites des programmes de l'atlas, pas de tout le spatial européen. Les modules habités, les atterrisseurs et les instruments hébergés (Sentinel-4 et 5, EGNOS) ne sont pas comptés. Les masses sont des valeurs typiques au lancement, souvent des ordres de grandeur.</p>
      <label class="toggle"><input type="checkbox" id="pcst"${state.pcst ? " checked" : ""}> Inclure les grandes constellations (OneWeb, Galileo, ICEYE, Kinéis, IRIS²)</label>
      <div id="parcBody"></div>`;
  }
  function renderParc() {
    const el = document.getElementById("parcBody");
    if (!el) return;
    const rows = Object.entries(PARC).filter(([id, c]) => byId[id] && (state.pcst || !c.cst));
    const tot = k => rows.reduce((t, [, c]) => t + (c[k] || 0), 0);
    const T = { orb: tot("orb"), srv: tot("srv"), prv: tot("prv") };
    const byClass = CLASSES_MASSE.map(([lab, lo, hi]) => {
      const r = rows.filter(([, c]) => c.m != null && c.m >= lo && c.m < hi);
      return [lab, r.reduce((t, [, c]) => t + c.srv, 0), r.reduce((t, [, c]) => t + (c.orb - c.srv), 0), r.reduce((t, [, c]) => t + c.prv, 0)];
    });
    const unk = rows.filter(([, c]) => c.m == null).reduce((t, [, c]) => t + c.orb + c.prv, 0);
    const byFam = Object.keys(FAMILLES).map(f => {
      const r = rows.filter(([id]) => famOf(byId[id]) === f);
      return [FAMILLES[f].nom, r.reduce((t, [, c]) => t + c.srv, 0), r.reduce((t, [, c]) => t + (c.orb - c.srv), 0), r.reduce((t, [, c]) => t + c.prv, 0), f];
    }).filter(x => x[1] + x[2] + x[3] > 0);
    const stack = list => {
      const max = Math.max(1, ...list.map(x => x[1] + x[2] + x[3]));
      return `<div class="hb-list">${list.map(([lab, a, b, c]) => `<div class="hb" title="${esc(lab)} : ${a} en service, ${b} hors service, ${c} prévus">
        <span class="hb-l">${esc(lab)}</span>
        <span class="hb-t stk">${a ? `<i style="width:${a / max * 100}%;background:var(--accent)"></i>` : ""}${b ? `<i style="width:${b / max * 100}%;background:var(--faint)"></i>` : ""}${c ? `<i style="width:${c / max * 100}%;background:var(--plan),var(--sunk);outline:1px solid var(--line)"></i>` : ""}</span>
        <span class="hb-v mono">${fmtN(a + b + c)}</span></div>`).join("")}</div>`;
    };
    el.innerHTML = `
      <div class="fin-kpis">
        <div class="kpi"><span>Mis en orbite</span><b class="mono">${fmtN(T.orb)}</b></div>
        <div class="kpi"><span>En service aujourd'hui</span><b class="mono">${fmtN(T.srv)}</b></div>
        <div class="kpi"><span>Prévus ou en construction</span><b class="mono">${fmtN(T.prv)}</b></div>
        <div class="kpi"><span>Programmes comptés</span><b class="mono">${rows.length}</b></div>
      </div>
      <div class="stack-key" style="margin-bottom:10px"><span><i class="sw" style="background:var(--accent)"></i> En service</span><span><i class="sw" style="background:var(--faint)"></i> Hors service</span><span><i class="sw" style="background:var(--plan),var(--sunk);outline:1px solid var(--line)"></i> Prévus</span></div>
      <div class="fin-charts">
        <div class="panel"><h3 class="ch-t">Par classe de masse</h3>${stack(byClass)}${unk ? `<p class="note">${fmtN(unk)} satellites prévus de masse inconnue (IRIS²) ne sont pas classés.</p>` : ""}</div>
        <div class="panel"><h3 class="ch-t">Par famille</h3>${stack(byFam)}</div>
      </div>`;
  }

  /* ================= VUE 3 : FRISE ================= */
  function vFrise() {
    return `<div class="view-head"><h2>Frise 1965-2045</h2>
      <p>Une ligne par programme, regroupée par domaine. Partie pleine : déjà en orbite. Partie claire : prévu. Les traits verticaux sont les lancements et jalons ; survolez-les pour le détail, cliquez une ligne pour ouvrir la fiche.</p></div>
      <div class="tl-tools">
        <span class="tl-key"><i style="background:var(--ink)"></i>Réalisé</span>
        <span class="tl-key"><i style="background:var(--ink);opacity:.3"></i>Prévu</span>
        <span class="tl-key"><i style="border-left:2px dashed var(--accent);width:2px;height:14px"></i>Octobre 2026</span>
      </div>
      <div class="tl-scroll" id="tl">${timelineSVG()}</div>
      <p class="note" style="margin-top:10px">Faites défiler horizontalement sur petit écran.</p>`;
  }
  function timelineSVG() {
    const Y0 = 1965, Y1 = 2046, L = 240, PX = 11.5, RH = 22, HH = 30, TOP = 34;
    const W = L + (Y1 - Y0) * PX + 20;
    const x = y => L + (y - Y0) * PX;
    let rows = [], yCur = TOP;
    Object.keys(FAMILLES).flatMap(fk => Object.entries(DOMAINES).filter(([, d]) => d.fam === fk)).forEach(([dk, d]) => {
      const ps = PROGRAMMES.filter(p => p.d === dk).sort((a, b) => a.y0 - b.y0);
      rows.push({ head: d.nom, fam: d.fam, y: yCur }); yCur += HH;
      ps.forEach(p => { rows.push({ p, y: yCur }); yCur += RH; });
    });
    const H = yCur + 10;
    let s = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="Frise chronologique des programmes">`;
    for (let y = 1965; y <= Y1; y += 5) {
      s += `<line x1="${x(y)}" x2="${x(y)}" y1="${TOP - 8}" y2="${H}" stroke="var(--line)" stroke-width="${y % 10 ? 0.5 : 1}"></line>`;
      if (y % 10 === 0) s += `<text x="${x(y)}" y="20" font-size="11" text-anchor="middle" fill="var(--muted)" font-family="var(--font-mono)">${y}</text>`;
    }
    rows.forEach(r => {
      if (r.head) {
        s += `<rect x="0" y="${r.y}" width="${W}" height="${HH}" fill="var(--sunk)"></rect>
          <rect x="0" y="${r.y}" width="4" height="${HH}" fill="${col(r.fam)}"></rect>
          <text x="14" y="${r.y + 19}" font-size="12.5" font-weight="700" fill="var(--ink)" font-family="var(--font-display)">${esc(r.head)}</text>`;
        return;
      }
      const p = r.p, c = col(famOf(p)), cy = r.y + RH / 2;
      const past = Math.min(p.y1, NOW);
      s += `<g class="tl-row" data-goto="${p.id}" tabindex="0" role="button" aria-label="Ouvrir la fiche ${esc(p.n)}">
        <rect class="tl-hl" x="0" y="${r.y}" width="${W}" height="${RH}" fill="var(--sunk)"></rect>
        <text x="14" y="${cy + 4}" font-size="12" fill="var(--ink)" font-family="var(--font-body)">${esc(p.n.length > 34 ? p.n.slice(0, 33) + "…" : p.n)}</text>`;
      if (p.y0 < NOW) s += `<rect x="${x(p.y0)}" y="${cy - 5}" width="${Math.max(3, x(past) - x(p.y0))}" height="10" rx="2" fill="${c}"></rect>`;
      if (p.y1 > NOW) { const st = Math.max(p.y0, NOW); s += `<rect x="${x(st)}" y="${cy - 5}" width="${Math.max(3, x(p.y1) - x(st))}" height="10" rx="2" fill="${c}" opacity=".3"></rect>`; }
      p.jal.forEach(([y, t]) => { s += `<line x1="${x(y + 0.5)}" x2="${x(y + 0.5)}" y1="${cy - 8}" y2="${cy + 8}" stroke="var(--ink)" stroke-width="1.6"><title>${esc(y + " · " + p.n + " : " + t)}</title></line>`; });
      s += `<title>${esc(p.n + " (" + p.y0 + "-" + p.y1 + ") · " + p.moe)}</title></g>`;
    });
    s += `<line x1="${x(NOW)}" x2="${x(NOW)}" y1="${TOP - 10}" y2="${H}" stroke="var(--accent)" stroke-width="1.5" stroke-dasharray="4 3"></line>
      <text x="${x(NOW) + 5}" y="${TOP - 2}" font-size="11" fill="var(--accent)" font-family="var(--font-mono)">oct. 2026</text></svg>`;
    return s;
  }

  /* ================= VUE 4 : GÉNÉALOGIE ================= */
  function stepHtml([nm, y, id]) {
    const fut = y > NOW;
    const inner = `<span class="y">${y}${fut ? " · prévu" : ""}</span><span class="nm">${esc(nm)}</span>`;
    return id && byId[id] ? `<button class="step${fut ? " future" : ""}" type="button" data-goto="${id}">${inner}</button>`
      : `<span class="step${fut ? " future" : ""}">${inner}</span>`;
  }
  function linHtml(l) {
    const fam = l.etapes.map(e => e[2]).filter(id => id && byId[id]).map(id => famOf(byId[id]))[0] || "obs";
    return `<div class="lin" style="border-left:4px solid ${l.type === "mission" ? col(fam) : "var(--ink)"}">
      <div class="lin-top"><h3>${esc(l.titre)}</h3>${l.note ? `<p>${esc(l.note)}</p>` : ""}</div>
      <div class="steps">${l.etapes.map(stepHtml).join(`<span class="arrow" aria-hidden="true">→</span>`)}</div>
      ${l.branches.length ? `<div class="branch"><span>Branches :</span>${l.branches.map(b => `<span class="arrow" aria-hidden="true">↳</span>${stepHtml(b)}`).join("")}</div>` : ""}
    </div>`;
  }
  function vGenealogie() {
    const mis = LIGNEES.filter(l => l.type === "mission"), pla = LIGNEES.filter(l => l.type === "plateforme");
    return `<div class="view-head"><h2>Qui découle de qui</h2>
      <p>Trois lectures complémentaires. Les filiations de missions montrent comment un besoin se transmet de génération en génération. Les filiations de plateformes montrent comment un produit industriel est réutilisé d'un programme à l'autre, ce qui fait la compétitivité d'un industriel. Les suites commerciales, en bas de page, montrent ce qui a été vendu ensuite.</p></div>
      <div class="lin-cols">
        <div class="lin-grid"><h3 class="section-title" style="margin-top:0">Filiations de missions</h3>${mis.map(linHtml).join("")}</div>
        <div class="lin-grid"><h3 class="section-title" style="margin-top:0">Filiations de plateformes</h3>${pla.map(linHtml).join("")}
          <p class="note">Les étapes hachurées sont à venir. Un clic sur une étape ouvre la fiche du programme.</p></div>
      </div>
      ${suitesSection()}`;
  }

  /* ================= VUE 5 : CONVERGENCES ================= */
  function vConvergences() {
    const types = [...new Set(CONVERGENCES.map(c => c.type))];
    return `<div class="view-head"><h2>Convergences</h2>
      <p>Les programmes ne sont pas des silos. Un satellite météo porte un instrument Copernicus, un opérateur privé relaie un signal de navigation, deux pays s'échangent leurs images. Ces croisements sont là où se jouent les économies et les alliances.</p></div>
      <div class="conv-types" id="convTypes">${[["all", "Toutes"]].concat(types.map(t => [t, t])).map(([k, l]) =>
        `<button class="fchip" type="button" data-ctype="${esc(k)}" aria-pressed="${state.convType === k}">${esc(l)} <span class="mono" style="opacity:.6">${k === "all" ? CONVERGENCES.length : CONVERGENCES.filter(c => c.type === k).length}</span></button>`).join("")}</div>
      <div class="conv-grid" id="convGrid"></div>`;
  }
  function renderConv() {
    const g = document.getElementById("convGrid");
    if (!g) return;
    g.innerHTML = CONVERGENCES.filter(c => state.convType === "all" || c.type === state.convType).map(c => `
      <div class="conv"><span class="ty">${esc(c.type)}</span><h3>${esc(c.titre)}</h3><p>${esc(c.txt)}</p>
      <div class="link-pair">${chip(c.a)}${c.b ? `<span class="plus">+</span>${chip(c.b)}` : ""}</div></div>`).join("");
    document.querySelectorAll("#convTypes .fchip").forEach(b => b.setAttribute("aria-pressed", b.dataset.ctype === state.convType));
  }

  /* ================= VUE 6 : INDUSTRIE ================= */
  function vIndustrie() {
    const groups = Object.keys(GROUPES);
    const counts = groups.map(g => {
      const byFam = {};
      PROGRAMMES.filter(p => p.g.includes(g)).forEach(p => { const f = famOf(p); byFam[f] = (byFam[f] || 0) + 1; });
      return { g, total: Object.values(byFam).reduce((a, b) => a + b, 0), byFam };
    });
    const max = Math.max(...counts.map(c => c.total));
    const bars = counts.map(c => `<div class="hbar"><span>${esc(GROUPES[c.g])}</span>
      <span class="track" title="${c.total} programmes">${Object.keys(FAMILLES).filter(f => c.byFam[f]).map(f =>
        `<i style="width:${c.byFam[f] / max * 100}%;background:${col(f)}" title="${FAMILLES[f].nom} : ${c.byFam[f]}"></i>`).join("")}</span>
      <span class="val">${c.total}</span></div>`).join("");
    const sites = [
      ["Airbus DS", "Toulouse", "Optique (Pléiades, CSO, Neo), MSI de Sentinel-2, MetOp-SG A, télécoms Eurostar et OneSat"],
      ["Airbus DS", "Friedrichshafen, Ottobrunn", "Sentinel-2 et -6, CRISTAL, EarthCARE, Galileo G2, instruments Sentinel-4 et -5, radars"],
      ["Airbus DS", "Stevenage, Portsmouth", "Sentinel-5P, Aeolus, Biomass, charges utiles télécoms"],
      ["Airbus DS", "Madrid", "LSTM, PAZ, instrument de SMOS"],
      ["Thales Alenia Space", "Cannes", "Sentinel-3, MTG, CHIME, Spacebus et Space Inspire, Syracuse"],
      ["Thales Alenia Space", "Toulouse", "Instruments optiques, altimètres (Poseidon, SRAL, IRIS), charges utiles"],
      ["Thales Alenia Space", "Rome, Turin, L'Aquila", "Sentinel-1, COSMO-SkyMed, CIMR, ROSE-L, Galileo G2, SICRAL"],
      ["OHB", "Brême", "Galileo FOC, SAR-Lupe, SARah, CO2M, SmallGEO"],
      ["OHB Italia", "Milan", "Instruments et petits satellites (IRIDE)"],
      ["Leonardo", "Italie", "Instruments (SLSTR, FLORIS, LI), équipements, Telespazio et e-GEOS (services)"],
      ["Airbus DS", "Brême", "Module de service d'Orion, Columbus, ATV"],
      ["ArianeGroup", "Les Mureaux, Vernon, Brême, Kourou", "Ariane 6, moteurs Vulcain et Vinci, Prometheus, Themis ; MaiaSpace à Vernon"],
      ["Avio", "Colleferro", "Vega-C, moteurs à poudre P120C"],
      ["Micro-lanceurs", "Ottobrunn, Augsbourg, Elche, Forres", "Isar Aerospace, RFA, PLD Space, Orbex"]
    ].map(([a, b, c]) => `<tr><td>${esc(a)}</td><td>${esc(b)}</td><td>${esc(c)}</td></tr>`).join("");
    const trends = [
      ["Consolidation", "Projet Bromo : fusion des activités spatiales d'Airbus, Thales et Leonardo", "Protocole d'accord d'octobre 2025 : Airbus 35 %, Leonardo 32,5 %, Thales 32,5 %. Environ 25 000 salariés et 6,5 Md€ de chiffre d'affaires, siège à Toulouse. Décision de Bruxelles pas avant le second semestre 2027. OHB et Indra s'y opposent ; OHB a levé environ 900 M€ en juin 2026 pour rester indépendant."],
      ["Souveraineté", "La défense tire le marché", "150 Md€ de prêts SAFE souscrits, une proposition de 131 Md€ pour la défense, la sécurité et l'espace dans le budget UE 2028-2034, et des contrats nationaux comme SATCOMBw (2,1 Md€)."],
      ["Constellations", "Du gros satellite unique à la flotte", "IRIS², OneWeb, ICEYE, IRIDE, CO3D : plus de satellites, plus petits, produits en série. Cela change les métiers de l'industrialisation et de l'AIT."],
      ["Budgets", "Un niveau record à l'ESA", "22,3 Md€ votés en novembre 2025 pour 2026-2028, en hausse de 31 % par rapport à 2022, dont 3,5 Md€ pour l'observation de la Terre."],
      ["Modèles économiques", "Du public au privé", "SPOT était public, TerraSAR-X un partenariat, Pléiades Neo est privé. L'État passe de propriétaire à client, ou à concédant (IRIS²)."],
      ["Accès à l'espace", "Ariane 6 et Vega-C en service, les privés arrivent", "Les lancements institutionnels reviennent sur des lanceurs européens (CSO-3, Sentinel-1D, Galileo L14, MTG-I2, Sentinel-3C). Ariane 64 vole depuis février 2026, surtout pour Amazon. Isar a atteint l'orbite en septembre 2026, et 902 M€ soutiennent cinq jeunes lanceurs."],
      ["Exploration", "Dépendance aux choix américains", "Gateway menacé puis refinancé par le Congrès, Rosalind Franklin relancé avec la NASA après la rupture avec la Russie. L'exploration a obtenu 20 % de moins que demandé au CM25, mais l'Europe développe Argonaut et le cargo pour gagner en autonomie."],
      ["Nouveaux entrants", "Un second rang qui grandit", "ICEYE et Aerospacelab en orbite basse, Hemeria (nanosatellites Kinéis), Open Cosmos, Unseenlabs… Ils prennent des parts sur les petites missions et les constellations."]
    ].map(([ty, t, d]) => `<div class="trend"><span class="ty">${esc(ty)}</span><h3>${esc(t)}</h3><p>${esc(d)}</p></div>`).join("");
    return `<div class="view-head"><h2>Lecture industrielle</h2>
      <p>Trois maîtres d'œuvre se partagent l'essentiel des grands programmes institutionnels. Le compte ci-dessous porte sur les programmes de cet atlas, pas sur un chiffre d'affaires.</p></div>
      ${parcSection()}
      <h3 class="section-title">Qui construit</h3>
      <div class="ind-grid">
        <div class="panel">
          <h3 class="section-title" style="margin:0">Maîtrises d'œuvre dans l'atlas</h3>
          <div class="stack-key">${Object.entries(FAMILLES).map(([k, f]) => `<span><i class="sw" style="background:${col(k)}"></i> ${f.court}</span>`).join("")}</div>
          ${bars}
          <p class="note">Un programme peut compter pour plusieurs groupes (IRIS², Galileo G2). Les opérateurs commerciaux, qui achètent leurs satellites, sont classés dans « Autres ».</p>
        </div>
        <div class="panel" style="overflow-x:auto">
          <h3 class="section-title" style="margin:0">Où se construisent les satellites</h3>
          <table class="sites"><thead><tr><th>Groupe</th><th>Sites</th><th>Spécialités</th></tr></thead><tbody>${sites}</tbody></table>
        </div>
      </div>
      <h3 class="section-title">Huit tendances qui structurent le marché</h3>
      <div class="trends">${trends}</div>`;
  }

  /* ================= VUE 7 : GLOSSAIRE ================= */
  function vGlossaire() {
    return `<div class="view-head"><h2>Glossaire & sources</h2><p>Les sigles qui reviennent partout, et d'où viennent les données.</p></div>
      <dl class="glo">${GLOSSAIRE.map(([t, d]) => `<dt>${esc(t)}</dt><dd>${esc(d)}</dd>`).join("")}</dl>
      <h3 class="section-title">Indice de confiance</h3>
      <div class="conf-key">
        <p><span class="conf">A</span> Vérifié sur une source récente lors de la construction de l'atlas (octobre 2026).</p>
        <p><span class="conf">B</span> Information publiée et connue, non revérifiée ici. À confirmer avant un usage formel.</p>
        <p><span class="conf">C</span> Estimation, ordre de grandeur ou donnée non publique.</p>
      </div>
      <h3 class="section-title">Sources principales</h3>
      <ol class="srcs">${Object.values(SOURCES).map(([t, u]) => `<li><a href="${esc(u)}" target="_blank" rel="noopener">${esc(t)}</a></li>`).join("")}</ol>`;
  }

  /* ================= OUTILS COMMUNS (phase 4) ================= */
  const norm = s => String(s || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  const NATURES = {
    capital: { nom: "Capital", long: "Capital : groupe, filiale, coentreprise, rachat", types: ["filiale", "participation", "coentreprise", "acquisition", "fusion", "projet de fusion", "essaimage"], dash: "", w: 2.4, color: "var(--f-nav)" },
    contrat: { nom: "Contrat", long: "Contrat : maîtrise d'œuvre, sous-traitance, fourniture", types: ["maître d'œuvre", "sous-traitant", "fournisseur", "bénéficiaire", "candidat"], dash: "7 4", w: 1.8, color: "var(--f-tel)" },
    coop: { nom: "Coopération", long: "Coopération : partenaire, financeur, consortium, client, opérateur", types: ["partenaire", "partenaire scientifique", "partenariat", "consortium", "financeur", "maître d'ouvrage", "utilisateur", "opérateur"], dash: "2 4", w: 1.8, color: "var(--f-obs)" },
    part: { nom: "Participation", long: "Participation au programme, rôle non précisé", types: [], dash: "1 5", w: 1.2, color: "var(--faint)" }
  };
  const natureOf = t => Object.keys(NATURES).find(k => NATURES[k].types.includes(t)) || "coop";
  /* Identifiants du réseau préfixés : A: acteur, P: programme, X: entité hors atlas
     (certains acteurs et programmes partagent le même identifiant, ex. ICEYE) */
  const raw = id => id.slice(2);
  const sideId = (x, progRole) => progRole && byId[x] ? "P:" + x : actById[x] ? "A:" + x : byId[x] ? "P:" + x : "X:" + x;
  const EDGES = (() => {
    const out = [], seen = new Set();
    REL.forEach(r => {
      const a = sideId(r.de, false), b = sideId(r.vers, ROLES_PROG.includes(r.type) && !!byId[r.vers] && natureOf(r.type) !== "capital");
      seen.add(a + "|" + b);
      out.push({ a, b, nat: natureOf(r.type), type: r.type, txt: r.txt, src: r.src, bc: r.bc, an: r.a || null, part: r.part });
    });
    ACTEURS.forEach(a => a.pr.forEach(p => {
      const A = "A:" + a.id, P = "P:" + p;
      if (!byId[p] || seen.has(A + "|" + P)) return;
      seen.add(A + "|" + P);
      out.push({ a: A, b: P, nat: "part", type: "participation au programme", txt: "", src: null, bc: "", an: null });
    }));
    return out;
  })();
  const nodeName = id => { const r = raw(id); return id[0] === "A" && actById[r] ? actById[r].n : id[0] === "P" && byId[r] ? byId[r].n : r; };
  const nodeKind = id => id[0] === "P" ? "prog" : id[0] === "A" ? (actById[raw(id)].c === "lab" ? "lab" : "act") : "ext";
  const nodeLink = id => id[0] === "P" ? `<button type="button" class="lnk" data-goto="${raw(id)}">${esc(nodeName(id))}</button>` : id[0] === "A" ? `<button type="button" class="lnk" data-actor="${raw(id)}">${esc(nodeName(id))}</button>` : esc(nodeName(id));
  function edgeYears(e) {
    if (e.an) return [e.an, e.an];
    const p = (e.a[0] === "P" && byId[raw(e.a)]) || (e.b[0] === "P" && byId[raw(e.b)]);
    return p ? [p.y0, p.y1] : null;
  }
  function relGroupsHtml(id) {
    const es = EDGES.filter(e => e.a === id || e.b === id);
    if (!es.length) return `<p class="note">Aucune relation documentée dans l'atlas.</p>`;
    return Object.entries(NATURES).map(([k, n]) => {
      const list = es.filter(e => e.nat === k);
      if (!list.length) return "";
      return `<div class="relg"><h5><span class="nat-sw nat-${k}"></span>${esc(n.long)} <span class="mono note">${list.length}</span></h5><ul>${list.map(e => {
        const o = e.a === id ? e.b : e.a;
        const lab = nodeLink(o);
        const sens = e.a === id ? "" : " ← ";
        return `<li>${sens}${lab} <span class="note">· ${esc(e.type)}${e.part ? " · " + esc(e.part) : ""}${e.an ? " · " + e.an : ""}</span>${e.txt ? `<div class="note">${esc(e.txt)}</div>` : ""}${e.src ? ` <a class="src" href="${esc(e.src)}" target="_blank" rel="noopener">source <span class="conf">${e.bc}</span></a>` : ""}</li>`;
      }).join("")}</ul></div>`;
    }).join("");
  }
  function partenaires(id) {
    const progs = EDGES.filter(e => e.a === id && e.b[0] === "P").map(e => e.b);
    const m = {};
    EDGES.forEach(e => { if (e.b[0] === "P" && progs.includes(e.b) && e.a !== id && e.a[0] === "A") (m[e.a] = m[e.a] || new Set()).add(e.b); });
    return Object.entries(m).map(([a, s]) => [a, [...s]]).sort((x, y) => y[1].length - x[1].length || nodeName(x[0]).localeCompare(nodeName(y[0]), "fr"));
  }
  function concurrents(id) {
    const a = id[0] === "A" && actById[raw(id)];
    if (!a || a.c === "inst" || a.c === "lab" || a.c === "fin") return [];
    const doms = new Set(a.pr.filter(p => byId[p]).map(p => byId[p].d));
    const linked = new Set(EDGES.filter(e => e.nat === "capital" && (e.a === id || e.b === id)).map(e => e.a === id ? e.b : e.a));
    return ACTEURS.filter(b => b.id !== a.id && b.c === a.c && !linked.has("A:" + b.id))
      .map(b => ["A:" + b.id, b.pr.filter(p => byId[p] && doms.has(byId[p].d)).map(p => byId[p].d)])
      .map(([b, ds]) => [b, [...new Set(ds)]]).filter(x => x[1].length)
      .sort((x, y) => y[1].length - x[1].length || nodeName(x[0]).localeCompare(nodeName(y[0]), "fr")).slice(0, 10);
  }
  /* Lien partageable */
  function shareUrl(h) { return location.href.split("#")[0] + "#" + h; }
  function shareBtn(h) { return `<button type="button" class="share" data-share="${esc(h)}" title="Copier un lien direct vers cette page">Copier le lien</button>`; }
  function toast(msg) {
    let t = document.getElementById("toast");
    if (!t) { t = document.createElement("div"); t.id = "toast"; t.setAttribute("role", "status"); document.body.appendChild(t); }
    t.textContent = msg; t.classList.add("on"); clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove("on"), 2200);
  }
  function copyShare(h) {
    const u = shareUrl(h);
    const ok = () => toast("Lien copié : " + u);
    try { navigator.clipboard.writeText(u).then(ok, () => fallback()); } catch (e) { fallback(); }
    function fallback() { const i = document.createElement("textarea"); i.value = u; document.body.appendChild(i); i.select(); try { document.execCommand("copy"); ok(); } catch (e) { toast(u); } i.remove(); }
  }

  /* ================= RECHERCHE GLOBALE ================= */
  const INDEX = [].concat(
    PROGRAMMES.map(p => ({ k: "prog", id: p.id, t: p.n, s: `${FAMILLES[famOf(p)].court} · ${STATUTS[p.st]}`, q: norm([p.n, p.sub, p.id].join(" ")) })),
    ACTEURS.map(a => ({ k: a.c === "lab" ? "lab" : "act", id: a.id, t: a.n, s: `${CAT_ACTEURS[a.c]} · ${PAYS[a.p] || a.p}`, q: norm([a.n, a.v, a.id].join(" ")) })),
    Object.entries(PAYS).map(([c, n]) => ({ k: "pays", id: c, t: n, s: `${ACTEURS.filter(a => a.p === c).length} acteurs`, q: norm(n + " " + c) })),
    GLOSSAIRE.map(([t, d]) => ({ k: "glo", id: t, t, s: "Glossaire", q: norm(t) })),
    OPPORTUNITES.map(o => ({ k: "opp", id: o.id, t: o.titre, s: `${OPP_STATUTS[o.statut].nom} · ${o.metiers.map(m => METIERS[m].court).join(", ")}`, q: norm([o.titre, o.lot, o.id].join(" ")) }))
  );
  const KLAB = { prog: "Programme", act: "Acteur", lab: "Laboratoire", pays: "Pays", glo: "Sigle", opp: "Opportunité" };
  let gsel = 0, gres = [];
  function gsearch(v) {
    const q = norm(v.trim());
    const box = document.getElementById("gres");
    if (!q) { box.hidden = true; gres = []; return; }
    gres = INDEX.map(x => { const i = x.q.indexOf(q); return i < 0 ? null : [x, (i === 0 ? 0 : x.q.includes(" " + q) ? 1 : 2) * 10 + Math.min(9, x.t.length / 10)]; })
      .filter(Boolean).sort((a, b) => a[1] - b[1]).slice(0, 12).map(a => a[0]);
    gsel = 0;
    box.innerHTML = gres.length ? gres.map((x, i) => `<button type="button" class="gr${i === gsel ? " on" : ""}" data-gi="${i}" role="option"><span class="gk gk-${x.k}">${KLAB[x.k]}</span><span class="gt">${esc(x.t)}</span><span class="gs note">${esc(x.s)}</span></button>`).join("")
      : `<p class="note" style="padding:10px 12px">Aucun résultat pour « ${esc(v)} ».</p>`;
    box.hidden = false;
  }
  function gopen(i) {
    const x = gres[i]; if (!x) return;
    document.getElementById("gres").hidden = true;
    const inp = document.getElementById("gq"); inp.value = ""; inp.blur();
    if (x.k === "prog") goto(x.id);
    else if (x.k === "act" || x.k === "lab") gotoActor(x.id);
    else if (x.k === "pays") { state.apays = x.id; state.acat = "all"; state.aq = ""; state.asel = null; rendered.acteurs = false; show("acteurs"); }
    else if (x.k === "opp") gotoOpp(x.id);
    else if (x.k === "glo") { show("glossaire"); const el = [...document.querySelectorAll("#v-glossaire dt, #v-glossaire b, #v-glossaire strong")].find(e => e.textContent.trim() === x.id); if (el) el.scrollIntoView({ block: "center" }); }
  }
  function searchUi() {
    const nav = document.querySelector(".tabs .wrap");
    if (!nav || document.getElementById("gq")) return;
    const d = document.createElement("div");
    d.className = "gsearch";
    d.innerHTML = `<label class="sr" for="gq">Rechercher dans l'atlas</label><input id="gq" type="search" autocomplete="off" placeholder="Rechercher un programme, un acteur, un pays… ( / )" aria-controls="gres"><div id="gres" class="gres" role="listbox" hidden></div>`;
    nav.parentNode.insertBefore(d, nav.nextSibling);
    nav.parentNode.classList.add("has-search");
  }

  /* ================= VUE : VUE D'ENSEMBLE ================= */
  function vAccueil() {
    const y = Math.floor(NOW);
    const nb = st => PROGRAMMES.filter(p => p.st === st).length;
    const libres = PROGRAMMES.filter(p => (p.st === "dev" || p.st === "plan") && NON_ATTR.test(p.moe));
    const jal = [];
    PROGRAMMES.filter(p => p.st !== "nr" && p.st !== "ann").forEach(p => p.jal.forEach(j => { if (j[0] === y + 1) jal.push([p, j]); }));
    jal.sort((a, b) => a[0].n.localeCompare(b[0].n, "fr"));
    const c26 = CONTRATS.filter(c => c.a >= y - 1).sort((a, b) => b.m - a.m).slice(0, 8);
    const deg = {};
    EDGES.forEach(e => { [e.a, e.b].forEach(x => { if (x[0] === "A") deg[x] = (deg[x] || 0) + 1; }); });
    const top = Object.entries(deg).sort((a, b) => b[1] - a[1]).slice(0, 10);
    const fams = Object.entries(FAMILLES).map(([k, f]) => {
      const ps = PROGRAMMES.filter(p => famOf(p) === k);
      return [k, f, ps.filter(p => p.st === "op").length, ps.filter(p => p.st === "dev" || p.st === "plan").length, ps.length];
    });
    const maxf = Math.max(...fams.map(f => f[4]));
    const entry = (tab, t, d) => `<button type="button" class="entry" data-tab="${tab}"><b>${t}</b><span>${d}</span></button>`;
    return `<div class="view-head"><h2>Vue d'ensemble</h2>
      <p>L'essentiel de l'atlas en un écran : où en sont les programmes, ce qui arrive dans l'année, qui signe les contrats et qui est au centre du réseau. Tapez « / » pour chercher un programme, un acteur ou un pays.</p></div>
      <div class="fin-kpis ov-kpis">
        <div class="kpi"><span>Programmes</span><b class="mono">${PROGRAMMES.length}</b><small>${nb("op")} en service · ${nb("dev")} en développement · ${nb("plan")} en projet</small></div>
        <div class="kpi"><span>Acteurs</span><b class="mono">${ACTEURS.length}</b><small>dont ${ACTEURS.filter(a => a.c === "lab").length} laboratoires · ${Object.keys(PAYS).length - 1} pays</small></div>
        <div class="kpi"><span>Relations documentées</span><b class="mono">${REL.length}</b><small>${EDGES.filter(e => e.nat === "capital").length} liens de capital · ${EDGES.filter(e => e.nat === "contrat").length} contrats et fournitures</small></div>
        <div class="kpi"><span>À attribuer</span><b class="mono">${libres.length}</b><small>programmes sans maître d'œuvre publié</small></div>
      </div>
      <div class="entries">
        ${entry("fiches", "Un programme", "Fiche détaillée : qui paie, qui construit, quand, combien")}
        ${entry("acteurs", "Un acteur", "Annuaire, fiche, groupe, programmes et relations")}
        ${entry("reseau", "Qui travaille avec qui", "Cartographie des groupes, contrats et coopérations")}
        ${entry("prospection", "Des marchés à prendre", "Opportunités MLI, harnais et structures ; programmes en développement ; export CSV")}
      </div>
      <div class="ov-grid">
        <div class="panel"><h3 class="ch-t">Programmes par famille</h3>
          <div class="hb-list">${fams.map(([k, f, op, dv, n]) => `<div class="hb ov-fam"><span class="hb-l">${esc(f.court)}</span><span class="hb-t"><i style="width:${op / maxf * 100}%;background:${col(k)}"></i><i style="width:${dv / maxf * 100}%;background:${col(k)};opacity:.4"></i></span><span class="hb-v mono">${n}</span></div>`).join("")}</div>
          <p class="note">Plein : en service · clair : en développement ou en projet.</p></div>
        <div class="panel"><h3 class="ch-t">Jalons prévus en ${y + 1}</h3>
          ${jal.length ? `<ul class="ov-list">${jal.slice(0, 14).map(([p, j]) => `<li><button type="button" class="lnk" data-goto="${p.id}">${esc(p.n)}</button> <span class="note">${esc(j[1])}</span></li>`).join("")}</ul>${jal.length > 14 ? `<p class="note">… et ${jal.length - 14} autres : voir la vue Prospection.</p>` : ""}` : `<p class="note">Aucun jalon publié.</p>`}</div>
        <div class="panel"><h3 class="ch-t">Plus gros contrats depuis ${y - 1}</h3>
          <ul class="ov-list">${c26.map(c => `<li><span class="mono">${fmtM(c.m)}</span> ${c.prog && byId[c.prog] ? `<button type="button" class="lnk" data-goto="${c.prog}">${esc(c.lib)}</button>` : esc(c.lib)} <span class="note">· ${esc(c.ent)} · ${c.a}</span> <span class="conf">${c.bc}</span></li>`).join("")}</ul></div>
        <div class="panel"><h3 class="ch-t">Acteurs les plus connectés</h3>
          <ul class="ov-list">${top.map(([id, n]) => `<li><button type="button" class="lnk" data-reseau="${id}">${esc(nodeName(id))}</button> <span class="note">· ${n} liens</span></li>`).join("")}</ul>
          <p class="note">Un clic ouvre l'acteur dans la vue Réseau.</p></div>
        <div class="panel"><h3 class="ch-t">Programmes sans maître d'œuvre publié</h3>
          <ul class="ov-list">${libres.map(p => `<li><button type="button" class="lnk" data-goto="${p.id}">${esc(p.n)}</button> <span class="note">· ${esc(p.moa)}</span></li>`).join("")}</ul></div>
      </div>`;
  }

  /* ================= VUE : RÉSEAU ================= */
  const R = { focus: "A:airbus-ds", mode: "focus", depth: 1, nats: { capital: true, contrat: true, coop: true, part: true }, pays: "all", fam: "all", cats: [], y0: 1990, y1: 2040, zoom: 1, px: 0, py: 0, labels: true };
  function vReseau() {
    const pays = [...new Set(ACTEURS.map(a => a.p))].sort((x, y) => (PAYS[x] || x).localeCompare(PAYS[y] || y, "fr"));
    const years = []; for (let y = 1990; y <= 2040; y += 5) years.push(y);
    return `<div class="view-head"><h2>Réseau</h2>
      <p>Qui fait quoi, avec qui, et dans quel cadre. Chaque trait est une relation documentée et sourcée, typée selon sa nature : capital, contrat, coopération, ou simple participation à un programme. Partez d'un acteur ou d'un programme ; un clic sur un nœud recentre la carte.</p></div>
      <div class="net-ctl">
        <div class="seg" role="group" aria-label="Mode">
          ${[["focus", "Autour d'un acteur ou d'un programme"], ["capital", "Groupes et filiales"], ["all", "Réseau complet filtré"]].map(([k, l]) => `<button type="button" data-rmode="${k}" aria-pressed="${R.mode === k}">${l}</button>`).join("")}
        </div>
        <div class="net-f">
          <div><label class="note" for="rfocus">Point de départ</label><input id="rfocus" list="rfocus-list" value="${esc(nodeName(R.focus))}" placeholder="Nom d'un acteur ou d'un programme"><datalist id="rfocus-list">${ACTEURS.map(a => `<option value="${esc(a.n)}">`).join("")}${PROGRAMMES.map(p => `<option value="${esc(p.n)}">`).join("")}</datalist></div>
          <div><label class="note" for="rdepth">Profondeur</label><select id="rdepth"><option value="1"${R.depth === 1 ? " selected" : ""}>Liens directs</option><option value="2"${R.depth === 2 ? " selected" : ""}>Liens des liens</option></select></div>
          <div><label class="note" for="rpays">Pays des acteurs</label><select id="rpays"><option value="all">Tous</option>${pays.map(p => `<option value="${p}"${R.pays === p ? " selected" : ""}>${esc(PAYS[p] || p)}</option>`).join("")}</select></div>
          <div><label class="note" for="rfam">Domaine des programmes</label><select id="rfam"><option value="all">Tous</option>${Object.entries(FAMILLES).map(([k, f]) => `<option value="${k}"${R.fam === k ? " selected" : ""}>${esc(f.nom)}</option>`).join("")}</select></div>
          <div><label class="note" for="ry0">Période</label><span class="net-per"><select id="ry0">${years.map(y => `<option${y === R.y0 ? " selected" : ""}>${y}</option>`).join("")}</select> à <select id="ry1">${years.map(y => `<option${y === R.y1 ? " selected" : ""}>${y}</option>`).join("")}</select></span></div>
        </div>
        <div class="fchips" id="rcats"><span class="note">Types d'acteurs :</span>${Object.entries(CAT_ACTEURS).map(([k, l]) => `<button class="fchip" type="button" data-rcat="${k}" aria-pressed="${R.cats.includes(k)}">${esc(l)}</button>`).join("")}</div>
        <div class="fchips" id="rnats"><span class="note">Natures de liens :</span>${Object.entries(NATURES).map(([k, n]) => `<button class="fchip" type="button" data-rnat="${k}" aria-pressed="${R.nats[k]}"><span class="nat-sw nat-${k}"></span>${esc(n.nom)}</button>`).join("")}
          <button type="button" class="reset" data-rreset="1">Réinitialiser</button></div>
      </div>
      <div class="net">
        <div class="net-map panel">
          <div class="net-tools"><button type="button" data-rz="1.25" aria-label="Zoomer">+</button><button type="button" data-rz="0.8" aria-label="Dézoomer">−</button><button type="button" data-rz="0" aria-label="Recadrer">Recadrer</button><label class="note"><input type="checkbox" id="rlab"${R.labels ? " checked" : ""}> Noms</label><span id="rcount" class="note"></span></div>
          <div id="rsvg" class="net-svg"></div>
          <div class="net-leg">${Object.entries(NATURES).map(([k, n]) => `<span><svg width="34" height="10" aria-hidden="true"><line x1="1" y1="5" x2="33" y2="5" stroke="${n.color}" stroke-width="${n.w + .6}" stroke-dasharray="${n.dash}"></line></svg>${esc(n.long)}</span>`).join("")}
            <span><svg width="14" height="14" aria-hidden="true"><circle cx="7" cy="7" r="5.5" fill="var(--ink)"></circle></svg>Acteur</span><span><svg width="14" height="14" aria-hidden="true"><circle cx="7" cy="7" r="5" fill="var(--surface)" stroke="var(--ink)" stroke-width="2"></circle></svg>Laboratoire</span><span><svg width="14" height="14" aria-hidden="true"><rect x="2" y="2" width="10" height="10" rx="2" fill="var(--f-obs)"></rect></svg>Programme (couleur de sa famille)</span><span><svg width="14" height="14" aria-hidden="true"><circle cx="7" cy="7" r="4" fill="var(--faint)"></circle></svg>Entité hors atlas</span></div>
        </div>
        <aside class="net-side panel" id="rside"></aside>
      </div>`;
  }
  function netGraph() {
    const yOk = e => { const ys = edgeYears(e); return !ys || (ys[1] >= R.y0 && ys[0] <= R.y1); };
    const nodeOk = id => {
      if (id[0] === "P") return R.fam === "all" || famOf(byId[raw(id)]) === R.fam;
      if (id[0] === "A") { const a = actById[raw(id)]; return (R.pays === "all" || a.p === R.pays) && (!R.cats.length || R.cats.includes(a.c)); }
      return true;
    };
    let es = EDGES.filter(e => R.nats[e.nat] && yOk(e) && nodeOk(e.a) && nodeOk(e.b));
    if (R.mode === "capital") es = es.filter(e => e.nat === "capital");
    let ids;
    if (R.mode === "focus") {
      ids = new Set([R.focus]); let front = [R.focus];
      for (let d = 0; d < R.depth; d++) {
        const nx = [];
        es.forEach(e => { if (front.includes(e.a) && !ids.has(e.b)) { ids.add(e.b); nx.push(e.b); } if (front.includes(e.b) && !ids.has(e.a)) { ids.add(e.a); nx.push(e.a); } });
        front = nx;
        if (ids.size > 160) break;
      }
      es = es.filter(e => ids.has(e.a) && ids.has(e.b) && (R.depth > 1 || e.a === R.focus || e.b === R.focus || true));
    } else {
      ids = new Set(); es.forEach(e => { ids.add(e.a); ids.add(e.b); });
    }
    const nodes = [...ids].map(id => ({ id, k: nodeKind(id) }));
    return { nodes, edges: es };
  }
  function netLayout(nodes, edges, W, H, pin) {
    const n = nodes.length, idx = {}; nodes.forEach((d, i) => { idx[d.id] = i; });
    const P = nodes.map((d, i) => { const a = i * 2.39996, r = 20 + 14 * Math.sqrt(i); return { x: W / 2 + r * Math.cos(a), y: H / 2 + r * Math.sin(a), vx: 0, vy: 0 }; });
    const fi = pin ? idx[pin] : null;
    if (fi != null) { P[fi].x = W / 2; P[fi].y = H / 2; }
    const k = Math.sqrt(W * H / Math.max(1, n)) * 0.62;
    const L = edges.map(e => [idx[e.a], idx[e.b]]).filter(l => l[0] != null && l[1] != null);
    let t = W / 8;
    for (let it = 0; it < 260; it++) {
      for (let i = 0; i < n; i++) { P[i].vx = 0; P[i].vy = 0; }
      for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) {
        let dx = P[i].x - P[j].x, dy = P[i].y - P[j].y, d2 = dx * dx + dy * dy || .01; const d = Math.sqrt(d2), f = k * k / d;
        dx /= d; dy /= d; P[i].vx += dx * f; P[i].vy += dy * f; P[j].vx -= dx * f; P[j].vy -= dy * f;
      }
      L.forEach(([a, b]) => { let dx = P[a].x - P[b].x, dy = P[a].y - P[b].y; const d = Math.sqrt(dx * dx + dy * dy) || .01, f = d * d / k; dx /= d; dy /= d; P[a].vx -= dx * f; P[a].vy -= dy * f; P[b].vx += dx * f; P[b].vy += dy * f; });
      for (let i = 0; i < n; i++) {
        P[i].vx += (W / 2 - P[i].x) * 0.02 * k / 30; P[i].vy += (H / 2 - P[i].y) * 0.02 * k / 30;
        const v = Math.sqrt(P[i].vx * P[i].vx + P[i].vy * P[i].vy) || 1, s = Math.min(v, t) / v;
        if (i === fi) continue;
        P[i].x += P[i].vx * s; P[i].y += P[i].vy * s;
      }
      t *= 0.985;
    }
    /* recadrage */
    const xs = P.map(p => p.x), ys = P.map(p => p.y);
    const x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys);
    const mx = Math.min(60, W * 0.16), my = Math.min(30, H * 0.12);
    const sc = Math.min((W - 2 * mx) / Math.max(1, x1 - x0), (H - 2 * my) / Math.max(1, y1 - y0), 2.2);
    return P.map(p => ({ x: mx + (p.x - x0) * sc + ((W - 2 * mx) - (x1 - x0) * sc) / 2, y: my + (p.y - y0) * sc + ((H - 2 * my) - (y1 - y0) * sc) / 2 }));
  }
  /* Composantes séparées, disposées en rangées : lisible pour les groupes et le réseau complet */
  function packLayout(nodes, edges, W) {
    const par = {}; const f = x => par[x] === x ? x : (par[x] = f(par[x]));
    nodes.forEach(n => { par[n.id] = n.id; });
    edges.forEach(e => { if (par[e.a] != null && par[e.b] != null) par[f(e.a)] = f(e.b); });
    const comps = {}; nodes.forEach(n => { (comps[f(n.id)] = comps[f(n.id)] || []).push(n); });
    const list = Object.values(comps).sort((a, b) => b.length - a.length);
    const pos = {}; let x = 0, y = 0, rowH = 0;
    list.forEach(c => {
      const ids = new Set(c.map(n => n.id));
      const side = Math.min(W, 150 + 85 * Math.sqrt(c.length)), h = c.length === 1 ? 70 : side * (c.length > 12 ? 0.8 : 0.6);
      if (x + side > W + 1) { x = 0; y += rowH; rowH = 0; }
      const ce = edges.filter(e => ids.has(e.a) && ids.has(e.b));
      const p = netLayout(c, ce, side, h, null);
      c.forEach((n, i) => { pos[n.id] = { x: x + p[i].x, y: y + p[i].y }; });
      x += side; rowH = Math.max(rowH, h);
    });
    return { pos: nodes.map(n => pos[n.id]), H: Math.max(200, y + rowH) };
  }
  let netCache = null;
  function renderReseau() {
    const box = document.getElementById("rsvg");
    if (!box) return;
    document.querySelectorAll("[data-rmode]").forEach(b => b.setAttribute("aria-pressed", b.dataset.rmode === R.mode));
    document.querySelectorAll("#rnats [data-rnat]").forEach(b => b.setAttribute("aria-pressed", !!R.nats[b.dataset.rnat]));
    document.querySelectorAll("#rcats [data-rcat]").forEach(b => b.setAttribute("aria-pressed", R.cats.includes(b.dataset.rcat)));
    const fi = document.getElementById("rfocus"); if (fi && document.activeElement !== fi) fi.value = nodeName(R.focus);
    const { nodes, edges } = netGraph();
    const W = 900;
    let H = 640, pos = [];
    if (nodes.length) {
      if (R.mode === "focus") pos = netLayout(nodes, edges, W, H, R.focus);
      else { const pk = packLayout(nodes, edges, W); pos = pk.pos; H = Math.ceil(pk.H); }
    }
    const ix = {}; nodes.forEach((d, i) => { ix[d.id] = i; });
    netCache = { nodes, pos, W, H };
    const deg = {}; edges.forEach(e => { deg[e.a] = (deg[e.a] || 0) + 1; deg[e.b] = (deg[e.b] || 0) + 1; });
    const showLab = id => R.labels && (nodes.length <= 90 || R.mode !== "all" || id === R.focus || (deg[id] || 0) >= 4);
    const lines = edges.map(e => {
      const a = pos[ix[e.a]], b = pos[ix[e.b]]; if (!a || !b) return "";
      const n = NATURES[e.nat];
      return `<line x1="${a.x.toFixed(1)}" y1="${a.y.toFixed(1)}" x2="${b.x.toFixed(1)}" y2="${b.y.toFixed(1)}" stroke="${n.color}" stroke-width="${n.w}" stroke-dasharray="${n.dash}" opacity=".85"><title>${esc(nodeName(e.a))} → ${esc(nodeName(e.b))} : ${esc(e.type)}${e.txt ? " — " + esc(e.txt) : ""}</title></line>`;
    }).join("");
    const dots = nodes.map((d, i) => {
      const p = pos[i], f = d.id === R.focus && R.mode === "focus", r = f ? 11 : 5 + Math.min(6, Math.sqrt(deg[d.id] || 1) * 1.6);
      let shape;
      if (d.k === "prog") { const pr = byId[raw(d.id)]; shape = `<rect x="${(p.x - r).toFixed(1)}" y="${(p.y - r).toFixed(1)}" width="${2 * r}" height="${2 * r}" rx="2.5" fill="${col(famOf(pr))}"></rect>`; }
      else if (d.k === "lab") shape = `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="${r}" fill="var(--surface)" stroke="var(--ink)" stroke-width="2.4"></circle>`;
      else if (d.k === "ext") shape = `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="${Math.max(4, r - 2)}" fill="var(--faint)"></circle>`;
      else shape = `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="${r}" fill="var(--ink)"></circle>`;
      const ring = f ? `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="${r + 5}" fill="none" stroke="var(--accent)" stroke-width="2.5"></circle>` : "";
      const lab = showLab(d.id) ? `<text x="${(p.x + r + 4).toFixed(1)}" y="${(p.y + 4).toFixed(1)}" class="nl${f ? " nl-f" : ""}">${esc(nodeName(d.id).replace(/ \(.*\)$/, "").slice(0, 34))}</text>` : "";
      const clickable = d.k !== "ext";
      return `<g class="nd${clickable ? " nd-c" : ""}"${clickable ? ` data-rnode="${esc(d.id)}" tabindex="0" role="button"` : ""}>${ring}${shape}${lab}<title>${esc(nodeName(d.id))}${d.k === "prog" ? " (programme)" : d.k === "lab" ? " (laboratoire)" : d.k === "ext" ? " (hors atlas)" : ""}</title></g>`;
    }).join("");
    box.innerHTML = nodes.length ? `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Carte des relations : ${nodes.length} entités, ${edges.length} liens"><g id="rview" transform="translate(${R.px} ${R.py}) scale(${R.zoom})">${lines}${dots}</g></svg>`
      : `<p class="note" style="padding:20px">Aucune relation ne correspond à ces filtres. Élargissez la période, le pays ou les natures de liens.</p>`;
    document.getElementById("rcount").textContent = `${nodes.length} entités · ${edges.length} liens`;
    renderSide(edges);
    bindPan();
  }
  function renderSide(edges) {
    const s = document.getElementById("rside");
    if (!s) return;
    if (R.mode !== "focus") {
      const by = {}; edges.forEach(e => { by[e.nat] = (by[e.nat] || 0) + 1; });
      s.innerHTML = `<h3>${R.mode === "capital" ? "Groupes et filiales" : "Réseau filtré"}</h3>
        <p class="note">${Object.entries(NATURES).filter(([k]) => by[k]).map(([k, n]) => `${by[k]} ${n.nom.toLowerCase()}`).join(" · ") || "Aucun lien"}</p>
        <p class="note">Cliquez sur un nœud pour l'explorer en détail.</p>
        ${R.mode === "capital" ? `<ul class="ov-list">${edges.map(e => `<li>${esc(nodeName(e.a))} → ${esc(nodeName(e.b))} <span class="note">· ${esc(e.type)}${e.part ? " · " + esc(e.part) : ""}</span></li>`).join("")}</ul>` : ""}`;
      return;
    }
    const id = R.focus, a = id[0] === "A" && actById[raw(id)], p = id[0] === "P" && byId[raw(id)];
    const parts = a ? partenaires(id).slice(0, 12) : [];
    const conc = a ? concurrents(id) : [];
    const progActs = p ? EDGES.filter(e => e.b === id && e.a[0] === "A") : [];
    s.innerHTML = `<div class="side-h"><h3>${esc(nodeName(id))}</h3>${shareBtn("reseau/" + id)}</div>
      <p class="note">${a ? `${esc(CAT_ACTEURS[a.c])} · ${esc(PAYS[a.p] || a.p)} · ${esc(a.v)}` : p ? `Programme · ${esc(FAMILLES[famOf(p)].nom)} · ${STATUTS[p.st]}` : "Entité hors atlas"}</p>
      <p>${a ? `<button type="button" class="lnk" data-actor="${a.id}">Ouvrir la fiche de l'acteur →</button>` : p ? `<button type="button" class="lnk" data-goto="${p.id}">Ouvrir la fiche du programme →</button>` : ""}</p>
      ${relGroupsHtml(id)}
      ${parts.length ? `<div class="relg"><h5>Partenaires sur les mêmes programmes</h5><ul>${parts.map(([o, ps]) => `<li><button type="button" class="lnk" data-rnode="${o}">${esc(nodeName(o))}</button> <span class="note">· ${ps.map(x => esc(nodeName(x))).join(", ")}</span></li>`).join("")}</ul></div>` : ""}
      ${conc.length ? `<div class="relg"><h5>Concurrents potentiels <span class="note">(calcul indicatif)</span></h5><p class="note">Même catégorie d'acteur, présents dans les mêmes domaines de programmes. Ce n'est pas une concurrence documentée.</p><ul>${conc.map(([o, ds]) => `<li><button type="button" class="lnk" data-rnode="${o}">${esc(nodeName(o))}</button> <span class="note">· ${ds.map(d => esc(DOMAINES[d].nom)).join(", ")}</span></li>`).join("")}</ul></div>` : ""}
      ${p && !progActs.length ? `<p class="note">Aucun acteur relié à ce programme dans l'atlas.</p>` : ""}`;
  }
  function bindPan() {
    const svg = document.querySelector("#rsvg svg"); if (!svg) return;
    let drag = null;
    svg.addEventListener("pointerdown", e => { if (e.target.closest("[data-rnode]")) return; drag = { x: e.clientX, y: e.clientY, px: R.px, py: R.py }; svg.setPointerCapture(e.pointerId); });
    svg.addEventListener("pointermove", e => {
      if (!drag) return;
      const k = 900 / svg.getBoundingClientRect().width;
      R.px = drag.px + (e.clientX - drag.x) * k; R.py = drag.py + (e.clientY - drag.y) * k;
      document.getElementById("rview").setAttribute("transform", `translate(${R.px} ${R.py}) scale(${R.zoom})`);
    });
    svg.addEventListener("pointerup", () => { drag = null; });
    svg.addEventListener("wheel", e => { if (!e.ctrlKey && !e.metaKey) return; e.preventDefault(); zoomBy(e.deltaY < 0 ? 1.15 : 0.87); }, { passive: false });
  }
  function zoomBy(f) {
    if (!f) { R.zoom = 1; R.px = 0; R.py = 0; }
    else { const cy = netCache ? netCache.H / 2 : 320; const z = Math.max(0.4, Math.min(5, R.zoom * f)); R.px = 450 - (450 - R.px) * z / R.zoom; R.py = cy - (cy - R.py) * z / R.zoom; R.zoom = z; }
    const g = document.getElementById("rview"); if (g) g.setAttribute("transform", `translate(${R.px} ${R.py}) scale(${R.zoom})`);
  }
  function resolveNode(id) {
    if (!id) return null;
    if (/^[APX]:/.test(id)) { const r = raw(id); return (id[0] === "A" && actById[r]) || (id[0] === "P" && byId[r]) ? id : null; }
    return actById[id] ? "A:" + id : byId[id] ? "P:" + id : null;
  }
  function gotoReseau(id, opts) {
    opts = opts || {};
    const n = resolveNode(id);
    if (n) { R.focus = n; R.mode = "focus"; }
    R.zoom = 1; R.px = 0; R.py = 0;
    show("reseau", { noHash: true, keepScroll: opts.keepScroll });
    renderReseau();
    if (!opts.noHash) setHash("reseau/" + R.focus, opts.replace);
  }
  function findNode(v) {
    const q = norm(v.trim()); if (!q) return null;
    const ea = ACTEURS.find(a => norm(a.n) === q), ep = PROGRAMMES.find(p => norm(p.n) === q);
    if (ea) return "A:" + ea.id; if (ep) return "P:" + ep.id;
    const sa = ACTEURS.find(a => norm(a.n).includes(q)), sp = PROGRAMMES.find(p => norm(p.n).includes(q));
    return sa ? "A:" + sa.id : sp ? "P:" + sp.id : null;
  }

  /* ================= ROUTAGE ================= */
  const RENDER = { accueil: vAccueil, reseau: vReseau, prospection: vProspection, mecanique: vMecanique, domaines: vDomaines, fiches: vFiches, acteurs: vActeurs, finances: vFinances, frise: vFrise, genealogie: vGenealogie, convergences: vConvergences, industrie: vIndustrie, glossaire: vGlossaire };
  const rendered = {};

  /* Historique : chaque navigation ajoute une entrée, le bouton « précédent » la rejoue */
  let lastHash = location.hash;
  /* Compteur de visites : une vue comptée par adresse (#vue, #fiche/…), seulement sur le site publié */
  let trackT = null, lastTracked = null;
  function track() {
    if (!/github\.io$/.test(location.hostname)) return;
    clearTimeout(trackT);
    trackT = setTimeout(function send(n) {
      const path = location.pathname + (location.hash || "#accueil");
      if (path === lastTracked) return;
      const gc = window.goatcounter;
      if (gc && typeof gc.count === "function") { try { gc.count({ path: path }); lastTracked = path; } catch (e) {} }
      else if ((n || 0) < 10) trackT = setTimeout(() => send((n || 0) + 1), 800);
    }, 500);
  }
  function setHash(h, replace) {
    if (location.hash === "#" + h) { lastHash = location.hash; track(); return; }
    try { history[replace ? "replaceState" : "pushState"](null, "", "#" + h); } catch (e) {}
    lastHash = location.hash;
    track();
  }
  function show(view, opts) {
    opts = opts || {};
    if (!RENDER[view]) view = "mecanique";
    state.view = view;
    document.querySelectorAll("[data-view]").forEach(s => { s.hidden = s.id !== "v-" + view; });
    document.querySelectorAll(".tab").forEach(t => t.setAttribute("aria-selected", t.dataset.tab === view));
    const sec = document.getElementById("v-" + view);
    if (!rendered[view]) { sec.innerHTML = RENDER[view](); rendered[view] = true; }
    if (view === "fiches") { renderList(); renderDetail(); }
    if (view === "convergences") renderConv();
    if (view === "acteurs") renderActeurs();
    if (view === "prospection") renderPros();
    if (view === "reseau") renderReseau();
    if (view === "finances") renderFin();
    if (view === "industrie") renderParc();

    if (!opts.noHash) setHash(view, opts.replace);
    try { localStorage.setItem("atlas-view", view); } catch (e) {}
    if (!opts.keepScroll) {
      const top = document.querySelector(".tabs").getBoundingClientRect().top + window.scrollY;
      if (window.scrollY > top) window.scrollTo({ top });
    }
  }

  function goto(id, opts) {
    opts = opts || {};
    if (!byId[id]) return;
    state.sel = id;
    if (state.fam !== "all" && famOf(byId[id]) !== state.fam) state.fam = "all";
    if (state.q && !filtered().some(p => p.id === id)) state.q = "";
    rendered.fiches = false;
    show("fiches", { noHash: true, keepScroll: opts.keepScroll });
    if (!opts.noHash) setHash("fiche/" + id, opts.replace);
    const item = document.querySelector(`.pitem[data-sel="${id}"]`);
    if (item) item.scrollIntoView({ block: "nearest" });
  }

  function gotoActor(id, opts) {
    opts = opts || {};
    const a = actById[id];
    if (!a) return;
    state.asel = id;
    rendered.acteurs = false;
    show("acteurs", { noHash: true, keepScroll: true });
    if (!opts.noHash) setHash("acteur/" + id, opts.replace);
    const el = document.getElementById("adetail");
    if (el) el.scrollIntoView({ block: "start" });
  }

  document.addEventListener("click", e => {
    const sh = e.target.closest("[data-share]"); if (sh) { copyShare(sh.dataset.share); return; }
    const gi = e.target.closest("[data-gi]"); if (gi) { gopen(+gi.dataset.gi); return; }
    const rn = e.target.closest("[data-rnode]"); if (rn) { gotoReseau(rn.dataset.rnode); return; }
    const rs = e.target.closest("[data-reseau]"); if (rs) { gotoReseau(rs.dataset.reseau); return; }
    const rm = e.target.closest("[data-rmode]"); if (rm) { R.mode = rm.dataset.rmode; R.zoom = 1; R.px = 0; R.py = 0; renderReseau(); return; }
    const rnat = e.target.closest("[data-rnat]"); if (rnat) { R.nats[rnat.dataset.rnat] = !R.nats[rnat.dataset.rnat]; renderReseau(); return; }
    const rcat = e.target.closest("[data-rcat]"); if (rcat) { const k = rcat.dataset.rcat; R.cats = R.cats.includes(k) ? R.cats.filter(x => x !== k) : R.cats.concat(k); renderReseau(); return; }
    const rz = e.target.closest("[data-rz]"); if (rz) { zoomBy(+rz.dataset.rz); return; }
    if (e.target.closest("[data-rreset]")) { Object.assign(R, { depth: 1, nats: { capital: true, contrat: true, coop: true, part: true }, pays: "all", fam: "all", cats: [], y0: 1990, y1: 2040, zoom: 1, px: 0, py: 0 }); rendered.reseau = false; show("reseau", { noHash: true, keepScroll: true }); return; }
    const pm = e.target.closest("[data-pmode]"); if (pm) { state.pmode = pm.dataset.pmode; rendered.prospection = false; show("prospection", { noHash: true, keepScroll: true }); return; }
    const om = e.target.closest("[data-om]"); if (om) { state.om = om.dataset.om; renderOpp(); return; }
    const ost = e.target.closest("[data-ost]"); if (ost) { state.ost = ost.dataset.ost; renderOpp(); return; }
    const op = e.target.closest("[data-opp]"); if (op) { gotoOpp(op.dataset.opp); return; }
    if (e.target.closest("[data-oreset]")) { Object.assign(state, { om: "all", ost: "all", opays: "all", oact: "all", oprog: "all", ophase: "all", obc: "all", oq: "", osort: "ech", etype: "all" }); rendered.prospection = false; show("prospection", { noHash: true, keepScroll: true }); return; }
    if (e.target.closest("[data-preset]")) { Object.assign(state, { pfam: "all", pq: "", phz: "all", pnon: false, psort: "jal" }); rendered.prospection = false; show("prospection", { noHash: true, keepScroll: true }); return; }
    if (e.target.closest("[data-fireset]")) { state.q = ""; state.fam = "all"; rendered.fiches = false; show("fiches", { noHash: true, keepScroll: true }); return; }
    if (e.target.closest("[data-areset]")) { Object.assign(state, { acat: "all", apays: "all", aq: "", asel: null }); rendered.acteurs = false; show("acteurs", { noHash: true, keepScroll: true }); return; }
    if (!document.getElementById("gres").hidden && !e.target.closest(".gsearch")) document.getElementById("gres").hidden = true;
    const t = e.target.closest("[data-actor],[data-tab],[data-goto],[data-sel],[data-fam],[data-ctype],[data-acat],[data-apays],[data-pfam],[data-ds],[data-ffam],[data-fent],[data-freset],[data-fsort]");
    if (!t) return;
    if (t.dataset.actor) { gotoActor(t.dataset.actor); return; }
    if (t.dataset.pfam) { state.pfam = t.dataset.pfam; renderPros(); return; }
    if (t.dataset.tab) show(t.dataset.tab, { keepScroll: true });
    else if (t.dataset.goto) goto(t.dataset.goto);
    else if (t.dataset.sel) {
      state.sel = t.dataset.sel; renderList(); renderDetail(); setHash("fiche/" + state.sel);
      if (window.innerWidth <= 1000) document.getElementById("detail").scrollIntoView({ behavior: "smooth", block: "start" });
    }
    else if (t.dataset.fam) {
      state.fam = t.dataset.fam;
      document.querySelectorAll("#fchips .fchip").forEach(b => b.setAttribute("aria-pressed", b.dataset.fam === state.fam));
      renderList();
    }
    else if (t.dataset.ctype) { state.convType = t.dataset.ctype; renderConv(); }
    else if (t.dataset.ds) { state.ds = t.dataset.ds; state.ent = "all"; state.fams = []; renderFin(); }
    else if (t.dataset.ffam) { const f = t.dataset.ffam; state.fams = state.fams.includes(f) ? state.fams.filter(x => x !== f) : state.fams.concat(f); renderFin(); }
    else if (t.dataset.fent) { state.ent = state.ent === t.dataset.fent ? "all" : t.dataset.fent; renderFin(); }
    else if (t.dataset.freset) { Object.assign(state, { y0: 2014, y1: 2026, fams: [], ent: "all", finT: "all", ty: "all" }); renderFin(); }
    else if (t.dataset.fsort) { state.sort = t.dataset.fsort; renderFin(); }
    else if (t.dataset.acat) { state.acat = t.dataset.acat; renderActeurs(); }
    else if (t.dataset.apays) { state.apays = state.apays === t.dataset.apays ? "all" : t.dataset.apays; const sel = document.getElementById("apays"); if (sel) sel.value = state.apays; renderActeurs(); }
  });
  document.addEventListener("change", e => {
    if (e.target.id === "rfocus") { const id = findNode(e.target.value); if (id) gotoReseau(id); else toast("Aucun acteur ni programme ne correspond."); }
  });
  document.addEventListener("keydown", e => {
    if (e.key === "/" && !/INPUT|TEXTAREA|SELECT/.test((document.activeElement || {}).tagName || "")) { e.preventDefault(); const g = document.getElementById("gq"); if (g) g.focus(); return; }
    if (e.target.id === "gq") {
      const box = document.getElementById("gres");
      if (e.key === "ArrowDown" || e.key === "ArrowUp") { e.preventDefault(); if (!gres.length) return; gsel = (gsel + (e.key === "ArrowDown" ? 1 : gres.length - 1)) % gres.length; box.querySelectorAll(".gr").forEach((b, i) => b.classList.toggle("on", i === gsel)); }
      else if (e.key === "Enter") { e.preventDefault(); gopen(gsel); }
      else if (e.key === "Escape") { box.hidden = true; e.target.blur(); }
      return;
    }
    if (e.target.id === "rfocus" && e.key === "Enter") { const id = findNode(e.target.value); if (id) gotoReseau(id); return; }
    const nd = e.target.closest && e.target.closest("[data-rnode]");
    if (nd && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); gotoReseau(nd.dataset.rnode); return; }
    const t = e.target.closest && e.target.closest(".tl-row");
    if (t && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); goto(t.dataset.goto); }
  });
  document.addEventListener("input", e => {
    if (e.target.id === "q") { state.q = e.target.value; renderList(); }
    if (e.target.id === "aq") { state.aq = e.target.value; renderActeurs(); }
    if (e.target.id === "pq") { state.pq = e.target.value; renderPros(); }
    if (e.target.id === "oq") { state.oq = e.target.value; renderOpp(); }
    const osel = { opays: "opays", oact: "oact", oprog: "oprog", ophase: "ophase", obc: "obc", osort: "osort", etype: "etype" }[e.target.id];
    if (osel) { state[osel] = e.target.value; renderOpp(); }
    if (e.target.classList && e.target.classList.contains("oacc")) { const id = e.target.dataset.oid; if (e.target.value === "") delete ACC[id]; else ACC[id] = +e.target.value; saveAcc(); renderOpp(); const d = document.querySelector(`#opp-${id} details`); if (d) d.open = true; }
    if (e.target.id === "gq") gsearch(e.target.value);
    if (e.target.id === "rdepth") { R.depth = +e.target.value; renderReseau(); }
    if (e.target.id === "rpays") { R.pays = e.target.value; renderReseau(); }
    if (e.target.id === "rfam") { R.fam = e.target.value; renderReseau(); }
    if (e.target.id === "ry0") { R.y0 = +e.target.value; if (R.y1 < R.y0) R.y1 = R.y0; renderReseau(); }
    if (e.target.id === "ry1") { R.y1 = +e.target.value; if (R.y0 > R.y1) R.y0 = R.y1; renderReseau(); }
    if (e.target.id === "rlab") { R.labels = e.target.checked; renderReseau(); }
    if (e.target.id === "phz") { state.phz = e.target.value; renderPros(); }
    if (e.target.id === "psort") { state.psort = e.target.value; renderPros(); }
    if (e.target.id === "pnon") { state.pnon = e.target.checked; renderPros(); }
    if (e.target.id === "pcst") { state.pcst = e.target.checked; renderParc(); }
    if (e.target.id === "apays") { state.apays = e.target.value; renderActeurs(); }
    if (e.target.id === "fy0") { state.y0 = +e.target.value; if (state.y1 < state.y0) state.y1 = state.y0; renderFin(); }
    if (e.target.id === "fy1") { state.y1 = +e.target.value; if (state.y0 > state.y1) state.y0 = state.y1; renderFin(); }
    if (e.target.id === "fent") { state.ent = e.target.value; renderFin(); }
    if (e.target.id === "finT") { state.finT = e.target.value; renderFin(); }
    if (e.target.id === "fty") { state.ty = e.target.value; renderFin(); }
  });

  function fromHash(initial) {
    const h = decodeURIComponent((location.hash || "").replace("#", ""));
    const [v, id] = h.split("/");
    const o = { noHash: true, keepScroll: true };
    lastHash = location.hash;
    if (v === "fiche" && byId[id]) { if (state.view === "fiches" && rendered.fiches && !initial) { state.sel = id; renderList(); renderDetail(); } else goto(id, o); return true; }
    if (v === "acteur" && actById[id]) { gotoActor(id, o); return true; }
    if (v === "opp" && oppById[id]) { gotoOpp(id, o); return true; }
    if (v === "reseau" && resolveNode(id)) { gotoReseau(id, o); return true; }
    if (RENDER[v]) { if (v !== state.view || initial) show(v, o); return true; }
    return false;
  }
  const onNav = () => { if (location.hash !== lastHash) fromHash(false); track(); };
  window.addEventListener("popstate", onNav);
  window.addEventListener("hashchange", onNav);
  document.addEventListener("click", e => { if (e.target.id === "pcsv") prosCsv(); if (e.target.id === "ocsv") oppCsv(); });

  header();
  searchUi();
  if (fromHash(true)) { track(); return; }
  let start = (location.hash || "").replace("#", "");
  if (!RENDER[start]) { try { start = localStorage.getItem("atlas-view") || "accueil"; } catch (e) { start = "accueil"; } }
  show(start, { keepScroll: true, replace: true });
})();
