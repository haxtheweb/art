(function () {
  var VOICE = { hax: "media/hax.mp3", web: "media/web.mp3" };
  var $ = function (id) { return document.getElementById(id); };
  var wrap = $("wrap"), stage = $("stage"), flashEl = $("flash"), creditEl = $("credit"), zEl = $("zombie"), rpg = $("rpg"), fx = $("fx");
  var wHax = $("wHax"), wOf = $("wOf"), wWeb = $("wWeb");
  // calm mode: follows the device's reduced-motion setting unless the viewer chose otherwise with the Motion button
  var mq = window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)") : null;
  var storedMotion = null; try { storedMotion = localStorage.getItem("haxotw-motion"); } catch (e) {}
  var reduce = storedMotion === "off" ? true : storedMotion === "on" ? false : !!(mq && mq.matches);

  /* ---------- fit the 960x540 stage ---------- */
  function fit() {
    var r = wrap.getBoundingClientRect(), s = Math.min(r.width / 960, r.height / 540);
    stage.style.transform = "translate(" + ((r.width - 960 * s) / 2) + "px," + ((r.height - 540 * s) / 2) + "px) scale(" + s + ")";
  }
  if (window.ResizeObserver) new ResizeObserver(fit).observe(wrap); else window.addEventListener("resize", fit);
  fit();

  /* ---------- audio engine ---------- */
  var AC = null, master = null, verb = null, drone = null, buffers = {}, decoding = null;
  function b64(s) { var b = atob(s), u = new Uint8Array(b.length); for (var i = 0; i < b.length; i++) u[i] = b.charCodeAt(i); return u.buffer; }
  function initAudio() {
    var Ctor = window.AudioContext || window.webkitAudioContext;
    if (!Ctor) return Promise.resolve();
    if (!AC) {
      AC = new Ctor();
      var comp = AC.createDynamicsCompressor();
      master = AC.createGain(); master.gain.value = .9; master.connect(comp); comp.connect(AC.destination);
      verb = AC.createConvolver();
      var len = AC.sampleRate * 3, ir = AC.createBuffer(2, len, AC.sampleRate);
      for (var ch = 0; ch < 2; ch++) { var d = ir.getChannelData(ch); for (var i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3); }
      verb.buffer = ir;
      var vg = AC.createGain(); vg.gain.value = .45; verb.connect(vg); vg.connect(master);
      decoding = Promise.all(Object.keys(VOICE).map(function (k) {
        // VOICE holds either embedded base64 (single-file build) or a file path (hosted release)
        var src = /\.mp3$/.test(VOICE[k])
          ? fetch(VOICE[k]).then(function (r) { return r.arrayBuffer(); })
          : Promise.resolve(b64(VOICE[k]));
        return src.then(function (data) {
          return new Promise(function (res) {
            try {
              var p = AC.decodeAudioData(data, function (buf) { buffers[k] = buf; res(); }, function () { res(); });
              if (p && p.catch) p.catch(function () { res(); });
            } catch (e) { res(); }
          });
        }).catch(function () {});
      }));
    }
    if (AC.state === "suspended") AC.resume();
    return decoding;
  }
  function out(node, wet) { node.connect(master); if (wet) node.connect(verb); }
  function noiseBuf(sec) { var b = AC.createBuffer(1, AC.sampleRate * sec, AC.sampleRate), d = b.getChannelData(0); for (var i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1; return b; }
  function playVoice(k) {
    if (!AC || !buffers[k]) return false;
    var s = AC.createBufferSource(), g = AC.createGain(); s.buffer = buffers[k]; g.gain.value = 1.6;
    s.connect(g); out(g, true); s.start(); return true;
  }
  function thunder() {
    if (!AC) return;
    var n = AC.createBufferSource(); n.buffer = noiseBuf(4);
    var f = AC.createBiquadFilter(); f.type = "lowpass"; f.frequency.value = 380;
    var g = AC.createGain(), t = AC.currentTime;
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(.9, t + .05); g.gain.linearRampToValueAtTime(.35, t + .4);
    g.gain.linearRampToValueAtTime(.7, t + .7); g.gain.exponentialRampToValueAtTime(.001, t + 3.8);
    n.connect(f); f.connect(g); out(g, true); n.start(t);
  }
  function startDrone() {
    if (!AC || drone) return;
    var t = AC.currentTime, g = AC.createGain(), f = AC.createBiquadFilter();
    f.type = "lowpass"; f.frequency.value = 220; f.Q.value = 4;
    var lfo = AC.createOscillator(), lg = AC.createGain(); lfo.frequency.value = .15; lg.gain.value = 90; lfo.connect(lg); lg.connect(f.frequency);
    var o1 = AC.createOscillator(), o2 = AC.createOscillator(), o3 = AC.createOscillator();
    o1.type = "sawtooth"; o1.frequency.value = 55; o2.type = "sawtooth"; o2.frequency.value = 55.7; o3.type = "triangle"; o3.frequency.value = 82.4;
    [o1, o2, o3].forEach(function (o) { o.connect(f); o.start(t); }); lfo.start(t);
    f.connect(g); out(g, true);
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(.12, t + 3);
    drone = { g: g, oscs: [o1, o2, o3, lfo] };
  }
  function stopDrone(after) {
    if (!drone) return;
    var d = drone; drone = null; var t = AC.currentTime + after;
    d.g.gain.setValueAtTime(d.g.gain.value, t); d.g.gain.linearRampToValueAtTime(0, t + 5);
    d.oscs.forEach(function (o) { o.stop(t + 5.2); });
  }
  function boom(big) {
    if (!AC) return;
    var t = AC.currentTime, o = AC.createOscillator(), g = AC.createGain();
    o.type = "sine"; o.frequency.setValueAtTime(150, t); o.frequency.exponentialRampToValueAtTime(30, t + 1);
    g.gain.setValueAtTime(big ? .9 : .7, t); g.gain.exponentialRampToValueAtTime(.001, t + 1.4);
    o.connect(g); out(g, true); o.start(t); o.stop(t + 1.5);
    var n = AC.createBufferSource(); n.buffer = noiseBuf(.5);
    var f = AC.createBiquadFilter(); f.type = "lowpass"; f.frequency.value = 1400;
    var ng = AC.createGain(); ng.gain.setValueAtTime(.5, t); ng.gain.exponentialRampToValueAtTime(.001, t + .35);
    n.connect(f); f.connect(ng); out(ng, true); n.start(t);
    [110, 116.5, 155.6, 233].forEach(function (fr) {
      var s = AC.createOscillator(), sg = AC.createGain();
      s.type = "sawtooth"; s.frequency.value = fr * (big ? 1 : 1.5);
      sg.gain.setValueAtTime(.04, t); sg.gain.exponentialRampToValueAtTime(.001, t + (big ? 2.4 : 1.2));
      s.connect(sg); out(sg, true); s.start(t); s.stop(t + 2.5);
    });
  }
  function groan() {
    if (!AC) return;
    var t = AC.currentTime, o = AC.createOscillator(), v = AC.createOscillator(), vg = AC.createGain();
    o.type = "sawtooth"; o.frequency.setValueAtTime(95, t); o.frequency.linearRampToValueAtTime(70, t + 1.8);
    v.frequency.value = 6; vg.gain.value = 4; v.connect(vg); vg.connect(o.frequency);
    var bp = AC.createBiquadFilter(); bp.type = "bandpass"; bp.frequency.setValueAtTime(500, t); bp.frequency.linearRampToValueAtTime(320, t + 1.8); bp.Q.value = 3;
    var g = AC.createGain(); g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(.3, t + .3); g.gain.linearRampToValueAtTime(0, t + 2);
    o.connect(bp); bp.connect(g); out(g, true); o.start(t); v.start(t); o.stop(t + 2.1); v.stop(t + 2.1);
  }
  function blip(freq, dur, type) {
    if (!AC) return;
    var t = AC.currentTime, o = AC.createOscillator(), g = AC.createGain();
    o.type = type || "square"; o.frequency.setValueAtTime(freq, t);
    g.gain.setValueAtTime(.12, t); g.gain.exponentialRampToValueAtTime(.001, t + (dur || .12));
    o.connect(g); out(g, false); o.start(t); o.stop(t + (dur || .12) + .05);
  }
  function success() { [523, 659, 784, 1047].forEach(function (f, i) { setTimeout(function () { blip(f, .12); }, i * 70); }); }

  /* ---------- intro sequence ---------- */
  var running = false, credits = 0, timers = [];
  function later(fn, ms) { timers.push(setTimeout(fn, ms)); }
  function flash(red) { flashEl.classList.remove("go", "red"); void flashEl.offsetWidth; if (red) flashEl.classList.add("red"); flashEl.classList.add("go"); }
  function shake() { if (reduce) return; stage.classList.remove("shake"); void stage.offsetWidth; stage.classList.add("shake"); }
  function slam(el, big) { el.classList.add("in"); boom(big); shake(); flash(true); }
  function addCredit() { credits = Math.min(99, credits + 1); creditEl.textContent = (credits < 10 ? "0" : "") + credits; }

  function play() {
    timers.forEach(clearTimeout); timers = [];
    running = true; addCredit(); closeMerlin();
    clearTimeout(idleFireT); clearTimeout(idleDemoT); if (idleFire) { idleFire = false; rpg.fire = false; }
    var ready = initAudio();
    blip(988, .08); setTimeout(function () { blip(1319, .2); }, 80);
    [wHax, wOf, wWeb, zEl].forEach(function (el) { el.classList.remove("in"); });
    stage.classList.add("playing");
    later(function () { thunder(); flash(false); startDrone(); }, 250);
    later(function () { zEl.classList.add("in"); groan(); }, 1300);
    later(function () { flash(false); }, 2800);
    Promise.resolve(ready).then(function () {
      later(function () {
        playVoice("hax");
        later(function () { slam(wHax, false); }, 120);
        later(function () {
          playVoice("web");
          later(function () { slam(wOf, false); }, 170);
          later(function () { slam(wWeb, true); }, 520);
          later(finish, 1700);
        }, 1500);
      }, 3400);
    });
  }
  function finish() { stopDrone(2); stage.classList.remove("playing"); running = false; armIdle(); $("press").focus({ preventScroll: true }); }

  $("coin").addEventListener("click", play);
  $("replay").addEventListener("click", play);

  // PRESS START: open the playground, a real haxcms-site-builder in demo mode inside an iframe
  var pg = $("playground"), pgFrame = $("pgFrame"), pgFail = $("pgFail"), pgOpen = false, pgCheck = null;
  // the claude.ai artifact host only allows scripts from a few public CDNs, so HAX itself
  // (cdn.hax.cloud) can't load there; the playground only runs where this page is self-hosted
  var playgroundBlocked = /\.claudeusercontent\.com$/.test(location.hostname);
  function openPlayground() {
    if (playgroundBlocked) {
      pgOpen = true; closeMerlin(); clearTimeout(idleFireT); clearTimeout(idleDemoT); if (demoActive) stopDemo();
      pgFrame.hidden = true; pgFail.hidden = false; pg.hidden = false; document.body.style.overflow = "hidden";
      $("pgBack").focus();
      return;
    }
    pgOpen = true; closeMerlin(); clearTimeout(idleFireT); clearTimeout(idleDemoT); if (demoActive) stopDemo();
    pgFail.hidden = true; pg.hidden = false; document.body.style.overflow = "hidden";
    pgFrame.src = $("press").getAttribute("href");
    pgFrame.focus();
    clearTimeout(pgCheck);
    pgCheck = setTimeout(function () {
      var ok = false;
      try { var w = pgFrame.contentWindow; ok = !!(w && w.customElements && w.customElements.get("haxcms-site-builder")); } catch (e) { ok = true; }
      if (!ok && pgOpen) pgFail.hidden = false;
    }, 15000);
  }
  function closePlayground() {
    if (!pgOpen) return;
    pgOpen = false; clearTimeout(pgCheck); pg.hidden = true; pgFrame.src = "about:blank"; document.body.style.overflow = "";
    $("press").focus({ preventScroll: true });
    play();
  }
  $("press").addEventListener("click", function (e) {
    e.preventDefault(); initAudio(); boom(true); flash(true);
    setTimeout(openPlayground, reduce ? 0 : 450);
  });
  $("pgBack").addEventListener("click", closePlayground);
  if (playgroundBlocked) $("pgReset").hidden = true;
  $("pgReset").addEventListener("click", function () { pgFail.hidden = true; pgFrame.src = $("press").getAttribute("href"); });
  pg.addEventListener("keydown", function (e) { if (e.key === "Escape") closePlayground(); });

  /* ---------- Merlin + cheat codes ---------- */
  var unlocked = true;
  function toast(msg, ms) {
    var old = stage.querySelector(".toast"); if (old) old.remove();
    var t = document.createElement("div"); t.className = "toast"; t.setAttribute("aria-hidden", "true"); t.textContent = msg; stage.appendChild(t);
    announce(msg);
    setTimeout(function () { if (t.parentNode) t.remove(); }, ms || 3200);
  }
  var liveEl = $("live"), liveT = null;
  function announce(msg) { clearTimeout(liveT); liveEl.textContent = ""; liveT = setTimeout(function () { liveEl.textContent = msg; }, 60); }
  var bubbleEl = null, bubbleTimer = null;
  function merlinSpeak(text) {
    if (bubbleEl) bubbleEl.remove();
    clearTimeout(bubbleTimer);
    bubbleEl = document.createElement("div"); bubbleEl.className = "bubble"; bubbleEl.setAttribute("aria-hidden", "true"); bubbleEl.textContent = text; stage.appendChild(bubbleEl);
    announce("Merlin says: " + text);
    bubbleTimer = setTimeout(function () { if (bubbleEl) { bubbleEl.remove(); bubbleEl = null; } }, 5000);
    try {
      if ("speechSynthesis" in window) { speechSynthesis.cancel(); var u = new SpeechSynthesisUtterance(text); u.rate = .95; u.pitch = .9; speechSynthesis.speak(u); }
    } catch (e) {}
  }
  function clearFx(after) { setTimeout(function () { fx.innerHTML = ""; }, after); }

  var beeps = false, darkTimer = null, sepiaTimer = null, floatTimer = null;
  var CHEATS = [
    { name: "SUMMONZOMBIE", icon: "🧟‍♀️", desc: "Raise the zombie pirate girl", toast: "🧟‍♀️ ZOMBIE PIRATE GIRL SUMMONED!", speak: "Arrr! The undead seas await ye matey!",
      run: function () { rpg.seed = "zpg"; rpg.hat = "pirate"; rpg.fire = false; zEl.classList.remove("dk"); zEl.classList.add("float"); clearTimeout(floatTimer); floatTimer = setTimeout(function () { zEl.classList.remove("float"); }, 10000); } },
    { name: "JOKER", icon: "🃏", desc: "Chaos. It sends a message.", toast: "🃏 JOKER ACTIVATED! Chaos unleashed!", speak: "It's not about the money, it's about sending a message",
      run: function () {
        var em = ["🃏", "🔥", "💰", "💸", "💵", "💴", "💶", "💷"];
        for (var i = 0; i < 110; i++) {
          var s = document.createElement("span"); s.className = "joker-emoji"; s.textContent = em[i % em.length];
          s.style.left = (Math.random() * 940) + "px"; s.style.top = (Math.random() * 520) + "px";
          s.style.animationDuration = (2 + Math.random() * 3) + "s"; s.style.fontSize = (18 + Math.random() * 28) + "px";
          fx.appendChild(s);
        }
        setTimeout(function () { toast("🃏 Joker chaos subsided... for now"); }, 8000);
        clearFx(8000);
      } },
    { name: "DKMODE", icon: "🍌", desc: "Big head mode", toast: "🍌 DK MODE ACTIVATED! Big head engaged!", speak: "Big head mode activated! Welcome to DK Island!",
      run: function () { zEl.classList.toggle("dk"); } },
    { name: "DOABARRELROLL", icon: "✈️", desc: "Rotate everything twice", toast: "✈️ DO A BARREL ROLL!", speak: "Use the boost to get through!",
      run: function () { stage.classList.add("roll"); setTimeout(function () { stage.classList.remove("roll"); }, 2200); } },
    { name: "DARKWEB", icon: "🕵️", desc: "Enter the Matrix", toast: "🕵️ DARK WEB ACTIVATED - Welcome to the Matrix!", speak: "Welcome to the Matrix! Red pill or blue pill?",
      run: function () { matrix(9000); } },
    { name: "ETERNALDARKNESS", icon: "🌙", desc: "Your sanity slips away", toast: "🌙 ETERNAL DARKNESS - Your sanity slips away...", speak: "This. Can't. Be. Happening.",
      run: function () {
        stage.classList.add("dark"); clearTimeout(darkTimer);
        darkTimer = setTimeout(function () { stage.classList.remove("dark"); toast("🌙 ETERNAL DARKNESS DISABLED - Sanity restored!"); merlinSpeak("The nightmare ends... for now."); }, 9000);
      } },
    { name: "TIMETRAVEL", icon: "⏳", desc: "Welcome to the past", toast: "⏳ TIME TRAVEL ACTIVATED! Welcome to the past!", speak: "Great Scott! We have traveled through time itself!",
      run: function () { stage.classList.add("sepia"); clearTimeout(sepiaTimer); sepiaTimer = setTimeout(function () { stage.classList.remove("sepia"); toast("⏳ Time travel expired - Returned to present"); }, 10000); } },
    { name: "NYANCAT", icon: "🐈", desc: "Rainbow cats incoming", toast: "🐈 NYAN CAT ACTIVATED! Rainbow cats incoming!", speak: "Nyan nyan nyan! Rainbow cats are taking over the internet!",
      run: function () {
        for (var i = 0; i < 26; i++) (function (i) {
          setTimeout(function () {
            var n = document.createElement("div"); n.className = "nyan"; n.innerHTML = "<i></i>🐈"; n.style.top = (Math.random() * 500) + "px";
            if (reduce) n.style.left = (Math.random() * 760) + "px";
            fx.appendChild(n);
            setTimeout(function () { n.remove(); }, 2300);
          }, i * 160);
        })(i);
      } },
    { name: "GEOCITIES", icon: "🌈", desc: "Welcome to 1999", toast: "🌈 GEOCITIES ACTIVATED! Welcome to 1999!", speak: "Welcome to the information superhighway! Don't forget to sign the guestbook!",
      run: function () {
        var g = document.createElement("div"); g.className = "geo";
        g.innerHTML = "<div>🚧 UNDER CONSTRUCTION 🚧<small>You are visitor #000666 · Best viewed in Netscape Navigator</small></div>";
        fx.appendChild(g); setTimeout(function () { g.remove(); }, 6000);
      } },
    { name: "BEEPS", icon: "🔊", desc: "Every click makes a sound", toast: "🔊 BEEPS ACTIVATED! Every click makes a sound!", speak: "Beep boop! Every click is now a symphony of chaos!",
      run: function () { beeps = !beeps; if (!beeps) { toast("🔊 BEEPS disabled - Silence restored"); return false; } } }
  ];
  var PROGRAMS = [
    { name: "INSERT COIN", icon: "🪙", desc: "Play the intro with sound", always: true, run: function () { play(); } },
    { name: "PRESS START", icon: "▶️", desc: "Play with a real HAXcms site", always: true, run: function () { $("press").click(); } },
    { name: "HOW TO PLAY", icon: "📜", desc: "What this is and how it works", always: true, run: function () { openHowto(); } }
  ];

  function runCheat(c) {
    initAudio();
    var r = c.run();
    if (c.toast && r !== false) { toast(c.toast); success(); }
    if (c.speak && r !== false) merlinSpeak(c.speak);
  }

  function matrix(ms) {
    var cv = document.createElement("canvas"); cv.className = "matrix"; cv.width = 960; cv.height = 540; fx.appendChild(cv);
    var c = cv.getContext("2d"), cols = Math.floor(960 / 16), drops = []; for (var i = 0; i < cols; i++) drops[i] = Math.random() * -30;
    var chars = "HAX<>/{}#ｱｲｳｴｵｶｷｸｹｺ01ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘ";
    var step = function () {
      c.fillStyle = "rgba(0, 0, 0, .12)"; c.fillRect(0, 0, 960, 540);
      c.fillStyle = "#33ff66"; c.font = "16px monospace";
      for (var i = 0; i < cols; i++) {
        c.fillText(chars[Math.floor(Math.random() * chars.length)], i * 16, drops[i] * 16);
        if (drops[i] * 16 > 540 && Math.random() > .96) drops[i] = 0; drops[i]++;
      }
    };
    // calm mode: draw a still frame of the rain instead of animating it
    if (reduce) { for (var k = 0; k < 45; k++) step(); }
    var id = reduce ? null : setInterval(step, 50);
    setTimeout(function () { clearInterval(id); cv.remove(); toast("🕵️ Matrix session terminated"); }, ms);
  }

  // Merlin panel
  var merlin = $("merlin"), mInput = $("mInput"), mList = $("mList"), mFoot = $("mFoot"), sel = 0, shown = [];
  function render() {
    var q = mInput.value.trim().toUpperCase().replace(/\s+/g, "");
    var pool = PROGRAMS.concat(unlocked ? CHEATS : []);
    shown = pool.filter(function (p) { return !q || p.name.replace(/\s+/g, "").indexOf(q) !== -1 || (p.desc && p.desc.toUpperCase().indexOf(q) !== -1); });
    if (sel >= shown.length) sel = 0;
    mList.innerHTML = "";
    shown.forEach(function (p, i) {
      var li = document.createElement("li"), b = document.createElement("button");
      b.type = "button"; if (i === sel) b.className = "sel";
      b.innerHTML = '<span class="ic"></span><span><b></b><small></small></span>';
      b.querySelector(".ic").textContent = p.icon; b.querySelector("b").textContent = p.name; b.querySelector("small").textContent = p.desc;
      b.addEventListener("click", function () { choose(p); });
      li.appendChild(b); mList.appendChild(li);
    });
    if (!unlocked) {
      var li = document.createElement("li"), b = document.createElement("button");
      b.type = "button"; b.className = "lock";
      b.innerHTML = '<span class="ic">🔒</span><span><b>SEALED</b><small>Forbidden programs exist. Merlin only answers to an old code.</small></span>';
      b.disabled = true;
      li.appendChild(b); mList.appendChild(li);
    }
    mFoot.textContent = unlocked ? "Cheat codes unsealed. Type a program name here, or anywhere on the screen." : "Alt+Shift (or Ctrl+Shift) toggles Merlin, just like in HAX.";
  }
  function choose(p) {
    if (p.always) { closeMerlin(); p.run(); return; }
    closeMerlin(); runCheat(p);
  }
  function openMerlin() { merlin.hidden = false; mInput.value = ""; sel = 0; render(); mInput.focus(); blip(660, .06, "triangle"); }
  function closeMerlin() { if (!merlin.hidden) { merlin.hidden = true; $("merlinBtn").focus({ preventScroll: true }); } }
  function unlock() {
    if (unlocked) return;
    unlocked = true; $("merlinBtn").classList.add("unlocked");
    initAudio(); success();
    toast("🎮 CHEAT CODES UNLOCKED! Merlin is listening...");
    merlinSpeak("You found the old code. Speak a forbidden program, if you dare.");
    if (merlin.hidden) openMerlin(); else render();
  }
  $("merlinBtn").addEventListener("click", function () { if (merlin.hidden) openMerlin(); else closeMerlin(); });
  $("mClose").addEventListener("click", closeMerlin);
  // keep keyboard focus inside Merlin while it is open
  merlin.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { closeMerlin(); e.preventDefault(); return; }
    if (e.key !== "Tab") return;
    var f = Array.prototype.slice.call(merlin.querySelectorAll("input, button:not([disabled])"));
    if (!f.length) return;
    var i = f.indexOf(document.activeElement);
    if (e.shiftKey && i <= 0) { f[f.length - 1].focus(); e.preventDefault(); }
    else if (!e.shiftKey && i === f.length - 1) { f[0].focus(); e.preventDefault(); }
  });
  mInput.addEventListener("input", function () {
    sel = 0; render();
    var q = mInput.value.trim().toUpperCase();
    if (unlocked) for (var i = 0; i < CHEATS.length; i++) if (CHEATS[i].name === q) { choose(CHEATS[i]); return; }
  });
  mInput.addEventListener("keydown", function (e) {
    if (e.key === "ArrowDown") { sel = Math.min(shown.length - 1, sel + 1); render(); e.preventDefault(); }
    else if (e.key === "ArrowUp") { sel = Math.max(0, sel - 1); render(); e.preventDefault(); }
    else if (e.key === "Enter") { if (shown[sel]) choose(shown[sel]); e.preventDefault(); }
    else if (e.key === "Escape") { closeMerlin(); e.preventDefault(); }
    else if (e.key === "Tab") { e.preventDefault(); var b = mList.querySelector("button:not([disabled])"); if (b) b.focus(); }
    e.stopPropagation();
  });

  // global keys: Konami code, typed cheat names, Merlin toggle, coin
  var KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "KeyB", "KeyA"], kp = 0, typed = "";
  function feedKonami(code) {
    if (code === KONAMI[kp]) { kp++; if (kp === KONAMI.length) { kp = 0; unlock(); return true; } }
    else kp = code === KONAMI[0] ? 1 : 0;
    return false;
  }
  // the same code works on touch screens: swipe for the arrows, tap for B and A
  var tStart = null;
  stage.addEventListener("touchstart", function (e) { var t = e.changedTouches[0]; tStart = [t.clientX, t.clientY]; }, { passive: true });
  stage.addEventListener("touchend", function (e) {
    if (!tStart || demoActive) return;
    var t = e.changedTouches[0], dx = t.clientX - tStart[0], dy = t.clientY - tStart[1]; tStart = null;
    var code;
    if (Math.max(Math.abs(dx), Math.abs(dy)) > 30) code = Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? "ArrowRight" : "ArrowLeft") : (dy > 0 ? "ArrowDown" : "ArrowUp");
    else code = kp === 8 ? "KeyB" : kp === 9 ? "KeyA" : "tap";
    feedKonami(code);
  }, { passive: true });
  document.addEventListener("keydown", function (e) {
    if (e.target && (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA")) return;
    if (e.shiftKey && (e.altKey || e.ctrlKey) && (e.key === "Shift" || e.key === "Alt" || e.key === "Control")) { if (merlin.hidden) openMerlin(); else closeMerlin(); return; }
    if (pgOpen || $("howto").open) return;
    if (demoActive) { stopDemo(); play(); return; }
    if (feedKonami(e.code)) { e.preventDefault(); return; }
    if (unlocked && /^[a-z0-9]$/i.test(e.key)) {
      typed = (typed + e.key.toUpperCase()).slice(-20);
      for (var i = 0; i < CHEATS.length; i++) if (typed.slice(-CHEATS[i].name.length) === CHEATS[i].name) { typed = ""; runCheat(CHEATS[i]); break; }
    }
  });
  stage.addEventListener("click", function () { if (beeps) { initAudio(); blip(300 + Math.random() * 900, .09); } });

  /* ---------- HAX glitch, every ~5s, using future-terminal-text-lite ---------- */
  // HAX and WEB each glitch on their own clock so they rarely fire together
  function glitchLoop(el, word, minMs, spreadMs) {
    setTimeout(function () {
      var visible = !demoActive && !(stage.classList.contains("playing") && !word.classList.contains("in"));
      if (visible && !reduce && el && "glitch" in el) {
        el.glitch = false;
        requestAnimationFrame(function () {
          el.glitch = true;
          word.classList.add("glitching");
          setTimeout(function () { word.classList.remove("glitching"); }, 650);
        });
      }
      glitchLoop(el, word, minMs, spreadMs);
    }, minMs + Math.random() * spreadMs);
  }
  glitchLoop($("haxGlitch"), wHax, 4500, 1000);
  setTimeout(function () { glitchLoop($("webGlitch"), wWeb, 7000, 1500); }, 2300);

  /* ---------- idle: fire at 10s, attract mode ("playing HAXcms") later ---------- */
  var idleFireT = null, idleDemoT = null, idleFire = false, demoActive = false;
  function armIdle() {
    clearTimeout(idleFireT); clearTimeout(idleDemoT);
    if (running || demoActive || pgOpen) return;
    idleFireT = setTimeout(function () { if (!running && !demoActive) { idleFire = true; rpg.fire = true; } }, 5000);
    if (!reduce) idleDemoT = setTimeout(function () { if (!running && !demoActive && !pgOpen && merlin.hidden && !$("howto").open) startDemo(); }, 10000);
  }
  function interact() { if (idleFire) { idleFire = false; rpg.fire = false; } armIdle(); }
  ["pointerdown", "keydown", "wheel"].forEach(function (ev) { document.addEventListener(ev, interact, true); });

  var demo = $("demo"), demoVid = $("demoVid");
  function startDemo() {
    clearTimeout(idleFireT); clearTimeout(idleDemoT);
    demoActive = true; closeMerlin();
    demo.classList.remove("out"); demo.hidden = false; stage.classList.add("demoing");
    try { demoVid.currentTime = 0; var pr = demoVid.play(); if (pr && pr.catch) pr.catch(function () {}); } catch (e) {}
  }
  demoVid.addEventListener("ended", function () {
    if (!demoActive) return;
    demo.classList.add("out");
    setTimeout(function () { stopDemo(); armIdle(); }, 600);
  });
  function stopDemo() {
    demoActive = false; demo.hidden = true; demo.classList.remove("out"); stage.classList.remove("demoing");
    try { demoVid.pause(); } catch (e) {}
  }
  demo.addEventListener("pointerdown", function (e) { e.preventDefault(); stopDemo(); play(); });
  armIdle();

  // ambient lightning
  (function storm() { setTimeout(function () { if (!running && !reduce) flash(false); storm(); }, 8000 + Math.random() * 7000); })();

  /* ---------- Motion toggle (pause control for everyone) ---------- */
  var motionBtn = $("motionBtn");
  function applyMotion() {
    document.documentElement.classList.toggle("calm", reduce);
    motionBtn.textContent = "Motion: " + (reduce ? "Off" : "On");
    motionBtn.setAttribute("aria-pressed", reduce ? "false" : "true");
    try { rpg.walking = !reduce; rpg.reduceMotion = reduce; } catch (e) {}
    if (reduce && demoActive) { stopDemo(); }
    if (reduce) { wHax.classList.remove("glitching"); wWeb.classList.remove("glitching"); }
    armIdle();
  }
  motionBtn.addEventListener("click", function () {
    reduce = !reduce;
    try { localStorage.setItem("haxotw-motion", reduce ? "off" : "on"); } catch (e) {}
    applyMotion();
    announce(reduce ? "Motion and flashing effects off" : "Motion and flashing effects on");
  });
  if (mq && mq.addEventListener) mq.addEventListener("change", function () {
    var s = null; try { s = localStorage.getItem("haxotw-motion"); } catch (e) {}
    if (s === null) { reduce = mq.matches; applyMotion(); }
  });
  applyMotion();

  /* ---------- How to play ---------- */
  var howto = $("howto");
  function openHowto() { closeMerlin(); clearTimeout(idleDemoT); if (howto.showModal) howto.showModal(); else howto.setAttribute("open", ""); }
  $("howtoBtn").addEventListener("click", openHowto);
  $("howtoClose").addEventListener("click", function () { howto.close ? howto.close() : howto.removeAttribute("open"); });
  howto.addEventListener("close", function () { $("howtoBtn").focus({ preventScroll: true }); armIdle(); });

  // fullscreen
  var fsBtn = $("fs");
  if (!wrap.requestFullscreen) fsBtn.hidden = true;
  fsBtn.addEventListener("click", function () {
    try {
      if (document.fullscreenElement) document.exitFullscreen();
      else { var p = wrap.requestFullscreen(); if (p && p.catch) p.catch(function () { fsBtn.hidden = true; }); }
    } catch (e) { fsBtn.hidden = true; }
  });
  document.addEventListener("fullscreenchange", fit);
})();
