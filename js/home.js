// Opening the app goes to the main menu (Billy, Nov 20). The browser may reopen the last page you were on (story, a battle,
// My Room); if you've been away for a while, that page sends you to the main menu instead. Moving between pages, or a quick
// reload, keeps you where you are.
(function () {
  var K = 'marbles-active', AWAY = 10 * 60 * 1000, last = 0;
  try { last = +localStorage.getItem(K) || 0; } catch (e) {}
  var home = /\/(index\.html)?$/.test(location.pathname);
  if (!home && Date.now() - last > AWAY) { location.replace('./'); return; }
  var mark = function () { try { localStorage.setItem(K, String(Date.now())); } catch (e) {} };
  mark(); setInterval(mark, 20000); addEventListener('pagehide', mark);
  document.addEventListener('visibilitychange', function () { if (!document.hidden && !home && Date.now() - last > AWAY) location.replace('./'); else if (!document.hidden) last = Date.now(); });
  setInterval(function () { last = Date.now(); }, 20000);
})();
