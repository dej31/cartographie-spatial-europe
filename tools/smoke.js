/* Test de fumée navigateur : node tools/smoke.js [dossier_captures]
   Ouvre index.html, parcourt les 10 vues, quelques interactions, en bureau et en mobile ; échoue sur toute erreur JS. */
const path = require("path");
let chromium; try { ({ chromium } = require("playwright")); } catch (e) { ({ chromium } = require("/opt/npm-tools/node_modules/playwright")); }
const out = process.argv[2];
const url = "file://" + path.join(__dirname, "..", "index.html");
const views = ["accueil", "mecanique", "domaines", "fiches", "acteurs", "reseau", "prospection", "frise", "genealogie", "convergences", "industrie", "finances", "glossaire"];
(async () => {
  const browser = await chromium.launch();
  const errors = [];
  for (const [label, vp] of [["bureau", { width: 1400, height: 900 }], ["mobile", { width: 390, height: 844 }]]) {
    const page = await browser.newPage({ viewport: vp });
    page.on("pageerror", e => errors.push(`${label} : ${e.message}`));
    page.on("console", m => { if (m.type() === "error" && !/Failed to load resource|ERR_|net::/.test(m.text())) errors.push(`${label} console : ${m.text()}`); });
    await page.route(/^https?:/, r => r.abort());
    await page.goto(url + "#domaines");
    for (const v of views) {
      await page.evaluate(v => { location.hash = v; }, v);
      await page.waitForTimeout(150);
      const shown = await page.evaluate(v => !document.getElementById("v-" + v).hidden && document.getElementById("v-" + v).innerHTML.length > 200, v);
      if (!shown) errors.push(`${label} : la vue ${v} ne s'affiche pas via le hash`);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      if (overflow > 2) errors.push(`${label} : débordement horizontal de ${overflow}px sur ${v}`);
      if (out) await page.screenshot({ path: path.join(out, `${label}-${v}.png`), fullPage: false });
    }
    // recherche globale
    await page.fill("#gq", "hemeria"); await page.waitForTimeout(150);
    const ng = await page.evaluate(() => document.querySelectorAll("#gres .gr").length);
    await page.press("#gq", "Enter"); await page.waitForTimeout(250);
    const det = await page.evaluate(() => { const h = document.querySelector("#adetail h3"); return h && h.textContent; });
    if (!ng || det !== "Hemeria") errors.push(`${label} : recherche globale (${ng} résultats, fiche ${det})`);
    if (out) await page.screenshot({ path: path.join(out, `${label}-fiche-acteur.png`) });
    // réseau
    await page.evaluate(() => { location.hash = "reseau/airbus-ds"; }); await page.waitForTimeout(400);
    const nn = await page.evaluate(() => document.querySelectorAll("#rsvg [data-rnode]").length);
    if (nn < 10) errors.push(`${label} : réseau autour d'Airbus DS (${nn} nœuds)`);
    if (out) await page.screenshot({ path: path.join(out, `${label}-reseau.png`), fullPage: true });
    await page.click('#rsvg [data-rnode="A:sstl"] circle, #rsvg [data-rnode="A:sstl"] rect'); await page.waitForTimeout(400);
    const f2 = await page.evaluate(() => document.querySelector("#rside h3").textContent);
    if (!/SSTL/.test(f2)) errors.push(`${label} : recentrage du réseau (${f2})`);
    await page.goBack(); await page.waitForTimeout(400);
    const f3 = await page.evaluate(() => document.querySelector("#rside h3").textContent);
    if (!/Airbus/.test(f3)) errors.push(`${label} : précédent dans le réseau (${f3})`);
    await page.click('[data-rmode="capital"]'); await page.waitForTimeout(400);
    const nc = await page.evaluate(() => document.querySelectorAll("#rsvg [data-rnode]").length);
    if (nc < 10) errors.push(`${label} : vue groupes et filiales (${nc})`);
    if (out) await page.screenshot({ path: path.join(out, `${label}-reseau-capital.png`), fullPage: true });
    await page.click('[data-rmode="all"]'); await page.waitForTimeout(600);
    const na = await page.evaluate(() => document.querySelectorAll("#rsvg [data-rnode]").length);
    await page.click('[data-rmode="focus"]'); await page.waitForTimeout(300);
    console.log(`${label} : recherche ${ng} résultats ; réseau ${nn} nœuds autour d'Airbus DS, ${nc} en capital, ${na} au total`);
    // bouton « précédent » : onglets, fiche, acteur
    await page.click('[data-tab="domaines"]'); await page.waitForTimeout(100);
    await page.click('[data-tab="acteurs"]'); await page.waitForTimeout(100);
    await page.click('[data-tab="frise"]'); await page.waitForTimeout(100);
    await page.goBack(); await page.waitForTimeout(200);
    const b1 = await page.evaluate(() => !document.getElementById("v-acteurs").hidden);
    await page.goBack(); await page.waitForTimeout(200);
    const b2 = await page.evaluate(() => !document.getElementById("v-domaines").hidden);
    await page.click('#v-domaines [data-goto="s2"]'); await page.waitForTimeout(200);
    await page.click('#plist [data-sel="s3"]'); await page.waitForTimeout(150);
    await page.goBack(); await page.waitForTimeout(200);
    const b3 = await page.evaluate(() => document.querySelector("#detail h3").textContent);
    await page.goBack(); await page.waitForTimeout(200);
    const b4 = await page.evaluate(() => !document.getElementById("v-domaines").hidden);
    await page.goForward(); await page.waitForTimeout(200);
    const b5 = await page.evaluate(() => !document.getElementById("v-fiches").hidden);
    if (!b1 || !b2 || b3 !== "Sentinel-2" || !b4 || !b5) errors.push(`${label} : bouton précédent (${b1}, ${b2}, ${b3}, ${b4}, ${b5})`);
    else console.log(`${label} : bouton précédent et suivant OK`);
    // fiche profonde et acteur profond
    await page.evaluate(() => { location.hash = "fiche/sterna"; }); await page.waitForTimeout(200);
    const t = await page.evaluate(() => document.querySelector("#detail h3") && document.querySelector("#detail h3").textContent);
    if (t !== "EPS-Sterna") errors.push(`${label} : lien #fiche/sterna → ${t}`);
    const roles = await page.evaluate(() => [...document.querySelectorAll("#detail [data-actor]")].length);
    if (!roles) errors.push(`${label} : pas d'acteurs impliqués sur EPS-Sterna`);
    if (out) await page.screenshot({ path: path.join(out, `${label}-fiche-sterna.png`), fullPage: true });
    await page.click('#detail [data-actor="ohb-sweden"]'); await page.waitForTimeout(200);
    const act = await page.evaluate(() => !!document.getElementById("act-ohb-sweden") && !document.getElementById("v-acteurs").hidden);
    if (!act) errors.push(`${label} : clic acteur depuis la fiche`);
    if (out) await page.screenshot({ path: path.join(out, `${label}-acteur-ohbsweden.png`) });
    await page.click('#acats [data-acat="lab"]'); await page.waitForTimeout(150);
    const nlab = await page.evaluate(() => document.querySelectorAll("#agrid .act").length);
    await page.evaluate(() => { const i = document.getElementById("aq"); i.value = ""; i.dispatchEvent(new Event("input", { bubbles: true })); }); await page.waitForTimeout(150);
    const nlab2 = await page.evaluate(() => document.querySelectorAll("#agrid .act").length);
    if (nlab2 < 30) errors.push(`${label} : filtre laboratoires → ${nlab2}`);
    if (out) await page.screenshot({ path: path.join(out, `${label}-labos.png`) });
    await page.evaluate(() => { location.hash = "acteur/kda"; }); await page.waitForTimeout(200);
    const kda = await page.evaluate(() => document.getElementById("adetail") && document.getElementById("adetail").textContent);
    if (!kda || !/KSAT/.test(kda)) errors.push(`${label} : fiche KDA`);
    await page.evaluate(() => { location.hash = "prospection"; }); await page.waitForTimeout(200);
    // mode « Opportunités métiers » (par défaut)
    const no = await page.evaluate(() => document.querySelectorAll("#olist .opp").length);
    const nev = await page.evaluate(() => document.querySelectorAll("#oevts li").length);
    const nac = await page.evaluate(() => document.querySelectorAll("#oacts li").length);
    if (no < 40 || nev < 40 || nac !== no) errors.push(`${label} : opportunités (${no} fiches, ${nev} événements, ${nac} actions)`);
    if (out) await page.screenshot({ path: path.join(out, `${label}-opportunites.png`) });
    await page.click('#oms [data-om="mli"]'); await page.waitForTimeout(150);
    const nmli = await page.evaluate(() => document.querySelectorAll("#olist .opp").length);
    await page.click('#osts [data-ost="confirmee"]'); await page.waitForTimeout(150);
    const nconf = await page.evaluate(() => [...document.querySelectorAll("#olist .opp")].every(c => c.classList.contains("confirmee")) && document.querySelectorAll("#olist .opp").length);
    if (!nmli || nmli > no || !nconf) errors.push(`${label} : filtres métier / statut (${nmli}, ${nconf})`);
    await page.click("[data-oreset]"); await page.waitForTimeout(150);
    await page.selectOption("#oact", "hemeria"); await page.waitForTimeout(150);
    const nhem = await page.evaluate(() => document.querySelectorAll("#olist .opp").length);
    await page.selectOption("#osort", "score"); await page.waitForTimeout(150);
    const sorted = await page.evaluate(() => { const v = [...document.querySelectorAll("#olist .score b")].map(b => +b.textContent); return v.every((x, i) => !i || v[i - 1] >= x); });
    if (!nhem || !sorted) errors.push(`${label} : filtre acteur ou tri par score (${nhem}, ${sorted})`);
    await page.click("[data-oreset]"); await page.waitForTimeout(150);
    const s0 = await page.evaluate(() => +document.querySelector("#opp-ow-serie .score b").textContent);
    await page.evaluate(() => { document.querySelector("#opp-ow-serie details").open = true; });
    await page.selectOption('#opp-ow-serie .oacc', "3"); await page.waitForTimeout(150);
    const s1 = await page.evaluate(() => +document.querySelector("#opp-ow-serie .score b").textContent);
    await page.selectOption('#opp-ow-serie .oacc', ""); await page.waitForTimeout(100);
    if (s1 !== s0 + 3) errors.push(`${label} : saisie de l'accessibilité (${s0} → ${s1})`);
    const nfrb = await page.evaluate(() => document.querySelectorAll("#olist .frb").length);
    await page.click("#ofr"); await page.waitForTimeout(150);
    const nfr = await page.evaluate(() => [...document.querySelectorAll("#olist .opp")].every(c => c.querySelector(".frb.fort")) && document.querySelectorAll("#olist .opp").length);
    await page.click("#ofr"); await page.waitForTimeout(100);
    if (!nfrb || !nfr) errors.push(`${label} : badge ou filtre « part française » (${nfrb}, ${nfr})`);
    console.log(`${label} : ${nfrb} badges part française, ${nfr} opportunités à part française ≥ 20 %`);
    const dlo = page.waitForEvent("download", { timeout: 3000 }).catch(() => null);
    await page.click("#ocsv"); const dO = await dlo;
    if (!dO) errors.push(`${label} : export CSV des opportunités`);
    await page.evaluate(() => { location.hash = "opp/galg2-lot2"; }); await page.waitForTimeout(250);
    const deep = await page.evaluate(() => !!document.querySelector("#opp-galg2-lot2") && location.hash);
    if (deep !== "#opp/galg2-lot2") errors.push(`${label} : lien direct vers une opportunité (${deep})`);
    const mOpen = await page.evaluate(() => { const m = document.getElementById("oppModal"); return !!m && !m.hidden && /Galileo/.test(m.textContent); });
    await page.keyboard.press("Escape"); await page.waitForTimeout(150);
    const mClosed = await page.evaluate(() => document.getElementById("oppModal").hidden && location.hash);
    await page.click("#opp-co2m .opp-t"); await page.waitForTimeout(200);
    const mClick = await page.evaluate(() => !document.getElementById("oppModal").hidden && location.hash === "#opp/co2m" && !!document.querySelector("#oppModal .frb"));
    const mOver = await page.evaluate(() => document.querySelector("#oppModal .omodal-box").scrollWidth <= document.querySelector("#oppModal .omodal-box").clientWidth + 1);
    if (out) await page.screenshot({ path: path.join(out, `${label}-opp-grand.png`) });
    await page.click("#oppModal .om-x"); await page.waitForTimeout(150);
    const mClosed2 = await page.evaluate(() => document.getElementById("oppModal").hidden);
    if (!mOpen || mClosed !== "#prospection" || !mClick || !mOver || !mClosed2) errors.push(`${label} : fiche en grand (${mOpen}, ${mClosed}, ${mClick}, ${mOver}, ${mClosed2})`);
    console.log(`${label} : ${no} opportunités (${nmli} MLI, ${nconf} confirmée), ${nev} événements, ${nhem} avec Hemeria ; accessibilité ${s0} → ${s1}`);
    // mode « Programmes »
    await page.click('[data-pmode="prog"]'); await page.waitForTimeout(200);
    const np = await page.evaluate(() => document.querySelectorAll("#plistp .pros").length);
    await page.click("#pnon"); await page.waitForTimeout(150);
    const nlib = await page.evaluate(() => document.querySelectorAll("#plistp .pros").length);
    if (!np || !nlib || nlib >= np) errors.push(`${label} : vue Prospection (${np} programmes, ${nlib} sans maître d'œuvre)`);
    const dl = page.waitForEvent("download", { timeout: 3000 }).catch(() => null);
    await page.click("#pcsv"); const d = await dl;
    if (!d) errors.push(`${label} : export CSV de la prospection`);
    if (out) await page.screenshot({ path: path.join(out, `${label}-prospection.png`) });
    await page.click("#pnon"); await page.waitForTimeout(100);
    console.log(`${label} : prospection ${np} programmes, dont ${nlib} sans maître d'œuvre attribué`);
    await page.evaluate(() => { location.hash = "finances"; }); await page.waitForTimeout(200);
    const lnk = await page.evaluate(() => document.querySelectorAll("#finBody [data-actor]").length);
    if (!lnk) errors.push(`${label} : pas de lien acteur dans les contrats`);
    await page.evaluate(() => { location.hash = "fiche/co2m"; }); await page.waitForTimeout(200);
    const fr = await page.evaluate(() => document.getElementById("detail").textContent);
    if (!/Part de la France \(ESA\)/.test(fr) || !/23 %/.test(fr)) errors.push(`${label} : part de la France absente de la fiche CO2M`);
    await page.evaluate(() => { location.hash = "fiche/plato"; }); await page.waitForTimeout(150);
    if (!/revenu national/.test(await page.evaluate(() => document.getElementById("detail").textContent))) errors.push(`${label} : mention du barème du programme scientifique absente`);
    // toutes les fiches s'ouvrent sans erreur
    const ids = await page.evaluate(() => PROGRAMMES.map(p => p.id));
    for (const id of ids) { await page.evaluate(id => { location.hash = "fiche/" + id; }, id); await page.waitForTimeout(15); }
    const last = await page.evaluate(() => document.querySelector("#detail h3").textContent);
    console.log(`${label} : ${ids.length} fiches ouvertes (dernière : ${last}), ${nlab} → ${nlab2} laboratoires, ${lnk} liens acteurs dans les contrats`);
    await page.close();
  }
  await browser.close();
  errors.forEach(e => console.log("ERREUR : " + e));
  console.log(errors.length ? `${errors.length} erreur(s)` : "Test navigateur : aucune erreur");
  process.exit(errors.length ? 1 : 0);
})();
