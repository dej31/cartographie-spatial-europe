(function () {
  "use strict";

  const byId = Object.fromEntries(PROGRAMMES.map(p => [p.id, p]));
  const famOf = p => DOMAINES[p.d].fam;
  const col = f => `var(--f-${f})`;
  const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const NOW = 2026.8;

  const VIEWS = [
    ["mecanique", "Mécanique"],
    ["domaines", "Domaines"],
    ["fiches", "Fiches"],
    ["acteurs", "Acteurs"],
    ["frise", "Frise"],
    ["genealogie", "Généalogie"],
    ["convergences", "Convergences"],
    ["industrie", "Industrie"],
    ["finances", "Finances"],
    ["glossaire", "Glossaire"]
  ];

  const state = { view: "mecanique", sel: "s1", fam: "all", q: "", convType: "all", acat: "all", apays: "all", aq: "", ds: "contrats", y0: 2014, y1: 2026, fams: [], ent: "all", finT: "all", ty: "all", sort: "m" };

  function chip(id) {
    const p = byId[id];
    if (!p) return "";
    return `<button class="chip" data-goto="${p.id}" type="button"><span class="dot" style="background:${col(famOf(p))}"></span>${esc(p.n)}</button>`;
  }
  const pill = st => `<span class="pill st-${st}">${STATUTS[st]}</span>`;

  /* ================= EN-TÊTE ================= */
  function header() {
    document.getElementById("legendFam").innerHTML = Object.entries(FAMILLES)
      .map(([k, f]) => `<span><i class="sw" style="background:${col(k)}"></i>${f.nom}</span>`).join("");
    document.getElementById("counts").innerHTML = [
      [PROGRAMMES.length, "programmes"],
      [LIGNEES.length, "filiations"],
      [CONVERGENCES.length, "convergences"],
      [ACTEURS.length, "acteurs"]
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
      <p>Cinq grandes familles, neuf domaines. Les pastilles sont classées par date de début ; un clic ouvre la fiche du programme.</p></div>
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
      <p>Même grille pour chaque programme. Les chiffres portent un indice de confiance : A vérifié en octobre 2026, B publié mais non revérifié, C estimation ou donnée non publique.</p></div>
      <div class="fiches">
        <div>
          <div class="filters">
            <label class="note" for="q">Rechercher un programme, un industriel, une application</label>
            <input id="q" type="search" placeholder="ex. OHB, radar, Toulouse…" value="${esc(state.q)}">
            <div class="fchips" id="fchips">${fch}</div>
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
        <span style="min-width:0"><span class="t">${esc(p.n)}</span><span class="s">${esc(DOMAINES[p.d].nom)} · ${esc(p.moe)}</span></span>
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
        <div class="meta"><span>${esc(FAMILLES[f].nom)} · ${esc(DOMAINES[p.d].nom)}</span>${pill(p.st)}</div>
        <h3>${esc(p.n)}</h3>
        <p class="sub">${esc(p.sub)}</p>
      </div>
      <dl class="grid-fields" style="margin:0">
        ${field("Application", esc(p.app), true)}
        ${field("Financeur", esc(p.fin))}
        ${field("Maître d'ouvrage", esc(p.moa))}
        ${field("Maître d'œuvre", esc(p.moe))}
        ${field("Plateforme", esc(p.plat))}
        ${field("Instruments et partenaires", esc(p.instr), true)}
        ${field("Budget", `${esc(p.bud)} <span class="conf" title="Indice de confiance">${p.bc}</span>`, true)}
      </dl>
      <div class="mini-tl">${miniTimeline(p)}
        <p class="note" style="margin-top:6px">${p.jal.map(([y, t]) => `<span class="mono">${y}</span> ${esc(t)}`).join(" · ") || "Pas de jalon public."}</p></div>
      ${p.note ? `<p class="callout" style="margin-top:16px">${esc(p.note)}</p>` : ""}
      <div class="rel">
        ${host ? `<div><h4>Embarqué sur</h4><div class="chips">${chip(host.id)}</div></div>` : ""}
        <div><h4>Découle de</h4><div class="chips">${preds.length ? preds.map(chip).join("") : `<span class="note">Programme sans prédécesseur direct dans l'atlas.</span>`}</div></div>
        <div><h4>A donné naissance à</h4><div class="chips">${succs.concat(usedBy.map(q => q.id)).length ? succs.concat(usedBy.map(q => q.id)).map(chip).join("") : `<span class="note">Pas de successeur identifié à ce jour.</span>`}</div></div>
        ${convs.length ? `<div><h4>Convergences</h4>${convs.map(c => `<p class="conv-line"><b>${esc(c.titre)}</b> · ${esc(c.type)}. ${esc(c.txt)}</p>`).join("")}</div>` : ""}
      </div>
    </article>`;
  }


  /* ================= VUE : ACTEURS ================= */
  function vActeurs() {
    const cats = [["all", "Tous"]].concat(Object.entries(CAT_ACTEURS));
    const pays = [...new Set(ACTEURS.map(a => a.p))].sort((x, y) => (PAYS[x] || x).localeCompare(PAYS[y] || y, "fr"));
    return `<div class="view-head"><h2>Acteurs</h2>
      <p>Institutions, grands groupes, équipementiers, opérateurs et NewSpace. Les montants ne figurent que lorsqu'ils sont publiés et vérifiables ; un champ vide veut dire « non publié », pas « nul ». Cet annuaire couvre les acteurs qui comptent, il n'est pas exhaustif : l'Europe compte plusieurs centaines de jeunes entreprises spatiales.</p></div>
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
          <div><label class="note" for="apays">Pays</label><select id="apays"><option value="all">Tous les pays</option>${pays.map(p => `<option value="${p}"${state.apays === p ? " selected" : ""}>${esc(PAYS[p] || p)}</option>`).join("")}</select></div>
        </div>
      </div>
      <p class="note" id="acount" style="margin:6px 0 12px"></p>
      <div class="act-grid" id="agrid"></div>`;
  }
  function renderActeurs() {
    const g = document.getElementById("agrid");
    if (!g) return;
    const q = state.aq.trim().toLowerCase();
    const list = ACTEURS.filter(a => (state.acat === "all" || a.c === state.acat) && (state.apays === "all" || a.p === state.apays) &&
      (!q || [a.n, a.m, a.v, a.t, a.k, CAT_ACTEURS[a.c]].join(" ").toLowerCase().includes(q)));
    document.getElementById("acount").textContent = `${list.length} acteur${list.length > 1 ? "s" : ""} affiché${list.length > 1 ? "s" : ""}`;
    g.innerHTML = list.length ? list.map(a => `
      <article class="act">
        <div class="act-h"><span class="ty">${esc(CAT_ACTEURS[a.c])}</span><span class="mono note">${esc(a.p)} · ${a.y}</span></div>
        <h3>${esc(a.n)}</h3>
        <p class="note">${esc(a.v)} · ${esc(a.t)}</p>
        <p>${esc(a.m)}</p>
        ${a.k ? `<p class="act-k">${esc(a.k)} <span class="conf">${a.kb}</span></p>` : ""}
        ${a.pr.length ? `<div class="chips">${a.pr.map(chip).join("")}</div>` : ""}
      </article>`).join("") : `<p class="note">Aucun acteur ne correspond. Élargissez la catégorie ou le pays.</p>`;
    document.querySelectorAll("#acats .fchip").forEach(b => b.setAttribute("aria-pressed", b.dataset.acat === state.acat));
    const counts = {};
    ACTEURS.filter(a => state.acat === "all" || a.c === state.acat).forEach(a => counts[a.p] = (counts[a.p] || 0) + 1);
    const rows = Object.entries(counts).sort((x, y) => y[1] - x[1]);
    const max = Math.max(1, ...rows.map(r => r[1]));
    document.getElementById("paysBars").innerHTML = rows.map(([p, n]) => `<button type="button" class="hbar pbar${state.apays === p ? " on" : ""}" data-apays="${p}"><span>${esc(PAYS[p] || p)}</span><span class="track"><i style="width:${n / max * 100}%;background:var(--accent)"></i></span><span class="val">${n}</span></button>`).join("");
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
            <td>${state.ds === "contrats" ? esc(r.ent) + `<div class="note">${esc(r.fin)}</div>` : esc(PAYS[r.p] || r.p) + " · " + esc(r.ty)}</td>
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
      <p>Deux lectures complémentaires. Les filiations de missions montrent comment un besoin se transmet de génération en génération. Les filiations de plateformes montrent comment un produit industriel est réutilisé d'un programme à l'autre, ce qui fait la compétitivité d'un industriel.</p></div>
      <div class="lin-cols">
        <div class="lin-grid"><h3 class="section-title" style="margin-top:0">Filiations de missions</h3>${mis.map(linHtml).join("")}</div>
        <div class="lin-grid"><h3 class="section-title" style="margin-top:0">Filiations de plateformes</h3>${pla.map(linHtml).join("")}
          <p class="note">Les étapes hachurées sont à venir. Un clic sur une étape ouvre la fiche du programme.</p></div>
      </div>`;
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

  /* ================= ROUTAGE ================= */
  const RENDER = { mecanique: vMecanique, domaines: vDomaines, fiches: vFiches, acteurs: vActeurs, finances: vFinances, frise: vFrise, genealogie: vGenealogie, convergences: vConvergences, industrie: vIndustrie, glossaire: vGlossaire };
  const rendered = {};

  function show(view, opts) {
    if (!RENDER[view]) view = "mecanique";
    state.view = view;
    document.querySelectorAll("[data-view]").forEach(s => { s.hidden = s.id !== "v-" + view; });
    document.querySelectorAll(".tab").forEach(t => t.setAttribute("aria-selected", t.dataset.tab === view));
    const sec = document.getElementById("v-" + view);
    if (!rendered[view]) { sec.innerHTML = RENDER[view](); rendered[view] = true; }
    if (view === "fiches") { renderList(); renderDetail(); }
    if (view === "convergences") renderConv();
    if (view === "acteurs") renderActeurs();
    if (view === "finances") renderFin();

    try { if (location.hash !== "#" + view) history.replaceState(null, "", "#" + view); } catch (e) {}
    try { localStorage.setItem("atlas-view", view); } catch (e) {}
    if (!opts || !opts.keepScroll) {
      const top = document.querySelector(".tabs").getBoundingClientRect().top + window.scrollY;
      if (window.scrollY > top) window.scrollTo({ top });
    }
  }

  function goto(id) {
    if (!byId[id]) return;
    state.sel = id;
    if (state.fam !== "all" && famOf(byId[id]) !== state.fam) state.fam = "all";
    if (state.q && !filtered().some(p => p.id === id)) state.q = "";
    rendered.fiches = false;
    show("fiches");
    const item = document.querySelector(`.pitem[data-sel="${id}"]`);
    if (item) item.scrollIntoView({ block: "nearest" });
  }

  document.addEventListener("click", e => {
    const t = e.target.closest("[data-tab],[data-goto],[data-sel],[data-fam],[data-ctype],[data-acat],[data-apays],[data-ds],[data-ffam],[data-fent],[data-freset],[data-fsort]");
    if (!t) return;
    if (t.dataset.tab) show(t.dataset.tab, { keepScroll: true });
    else if (t.dataset.goto) goto(t.dataset.goto);
    else if (t.dataset.sel) {
      state.sel = t.dataset.sel; renderList(); renderDetail();
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
  document.addEventListener("keydown", e => {
    const t = e.target.closest && e.target.closest(".tl-row");
    if (t && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); goto(t.dataset.goto); }
  });
  document.addEventListener("input", e => {
    if (e.target.id === "q") { state.q = e.target.value; renderList(); }
    if (e.target.id === "aq") { state.aq = e.target.value; renderActeurs(); }
    if (e.target.id === "apays") { state.apays = e.target.value; renderActeurs(); }
    if (e.target.id === "fy0") { state.y0 = +e.target.value; if (state.y1 < state.y0) state.y1 = state.y0; renderFin(); }
    if (e.target.id === "fy1") { state.y1 = +e.target.value; if (state.y0 > state.y1) state.y0 = state.y1; renderFin(); }
    if (e.target.id === "fent") { state.ent = e.target.value; renderFin(); }
    if (e.target.id === "finT") { state.finT = e.target.value; renderFin(); }
    if (e.target.id === "fty") { state.ty = e.target.value; renderFin(); }
  });

  header();
  let start = (location.hash || "").replace("#", "");
  if (!RENDER[start]) { try { start = localStorage.getItem("atlas-view") || "mecanique"; } catch (e) { start = "mecanique"; } }
  show(start, { keepScroll: true });
})();
