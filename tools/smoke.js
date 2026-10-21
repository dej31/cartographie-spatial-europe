/* Test de fumée navigateur : node tools/smoke.js [dossier_captures]
   Ouvre index.html, parcourt les 10 vues, quelques interactions, en bureau et en mobile ; échoue sur toute erreur JS. */
const path = require("path");
let chromium; try { ({ chromium } = require("playwright")); } catch (e) { ({ chromium } = require("/opt/npm-tools/node_modules/playwright")); }
const out = process.argv[2];
const url = "file://" + path.join(__dirname, "..", "index.html");
const views = ["mecanique", "domaines", "fiches", "acteurs", "prospection", "frise", "genealogie", "convergences", "industrie", "finances", "glossaire"];
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
    const kda = await page.evaluate(() => document.getElementById("act-kda") && document.getElementById("act-kda").textContent);
    if (!kda || !/KSAT/.test(kda)) errors.push(`${label} : fiche KDA`);
    await page.evaluate(() => { location.hash = "prospection"; }); await page.waitForTimeout(200);
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
