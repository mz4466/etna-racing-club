(async function () {
  try {
    var depth = (document.currentScript.src.match(/\.\.\//g) || []).length;
    var base = '../'.repeat(depth);
    var r = await fetch(base + 'club-config.json?_=' + Date.now());
    if (!r.ok) return;
    var cfg = await r.json();
    if (!cfg.copyright) return;
    var els = document.querySelectorAll('#cfg-copyright');
    els.forEach(function (el) { el.textContent = cfg.copyright; });
  } catch (e) {}
})();
