/* SA Tender Academy — study app
   Vanilla JS. No dependencies, no network calls. Works offline and from file://. */

(function () {
  'use strict';

  var DATA = window.ACADEMY || { docs: [], templates: [] };
  var DOCS = DATA.docs;
  var TEMPLATES = DATA.templates;
  var LESSONS = DOCS.filter(function (d) { return d.kind === 'lesson'; });
  var STORE = 'sata:';

  /* ------------------------------------------------------------------ store */
  function get(key, fallback) {
    try {
      var raw = localStorage.getItem(STORE + key);
      return raw === null ? fallback : JSON.parse(raw);
    } catch (e) { return fallback; }
  }
  function set(key, value) {
    try { localStorage.setItem(STORE + key, JSON.stringify(value)); } catch (e) {}
  }

  var done = get('done', {});
  var checks = get('checks', {});
  var notes = get('notes', {});
  var log = get('log', []);

  /* ------------------------------------------------------- markdown renderer */
  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function slug(s) {
    return String(s).toLowerCase().replace(/[^\w\s-]/g, '').trim().replace(/[\s_]+/g, '-');
  }

  function inline(text) {
    var out = esc(text);
    var stash = [];
    // inline code first so its contents are not further processed
    out = out.replace(/`([^`]+)`/g, function (m, code) {
      stash.push('<code>' + code + '</code>');
      return '\u0000' + (stash.length - 1) + '\u0000';
    });
    out = out.replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, '');
    out = out.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, function (m, label, href) {
      var ext = /^https?:/i.test(href);
      return '<a href="' + href + '"' + (ext ? ' target="_blank" rel="noopener noreferrer"' : '') + '>' + label + '</a>';
    });
    out = out.replace(/(^|[\s(])(https?:\/\/[^\s<)]+[^\s<).,;])/g,
      '$1<a href="$2" target="_blank" rel="noopener noreferrer">$2</a>');
    out = out.replace(/\*\*\*([^*]+)\*\*\*/g, '<strong><em>$1</em></strong>');
    out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    out = out.replace(/(^|[^*\w])\*([^*\n]+)\*(?![*\w])/g, '$1<em>$2</em>');
    out = out.replace(/(^|\s)_([^_\n]+)_(?=\s|$|[.,;:!?])/g, '$1<em>$2</em>');
    out = out.replace(/\u0000(\d+)\u0000/g, function (m, i) { return stash[+i]; });
    return out;
  }

  function cells(row) {
    var line = row.trim().replace(/^\|/, '').replace(/\|$/, '');
    var out = [], cur = '', i;
    for (i = 0; i < line.length; i++) {
      if (line[i] === '\\' && line[i + 1] === '|') { cur += '|'; i++; continue; }
      if (line[i] === '|') { out.push(cur); cur = ''; continue; }
      cur += line[i];
    }
    out.push(cur);
    return out.map(function (c) { return c.trim(); });
  }

  function render(md, docId) {
    var lines = md.replace(/\r\n/g, '\n').split('\n');
    var html = [];
    var i = 0, taskIndex = 0;

    function flushList(ordered, items, task) {
      if (!items.length) return;
      var tag = ordered ? 'ol' : 'ul';
      html.push('<' + tag + (task ? ' class="task"' : '') + '>' + items.join('') + '</' + tag + '>');
    }

    while (i < lines.length) {
      var line = lines[i];

      // fenced code
      if (/^\s*```/.test(line)) {
        var buf = [];
        i++;
        while (i < lines.length && !/^\s*```/.test(lines[i])) { buf.push(lines[i]); i++; }
        i++;
        html.push('<pre><code>' + esc(buf.join('\n')) + '</code></pre>');
        continue;
      }

      // horizontal rule
      if (/^\s*(---|\*\*\*|___)\s*$/.test(line)) { html.push('<hr>'); i++; continue; }

      // heading
      var h = /^(#{1,6})\s+(.*)$/.exec(line);
      if (h) {
        var lvl = h[1].length;
        var txt = h[2].replace(/\s*#+\s*$/, '');
        var id = slug(txt.replace(/[*`]/g, ''));
        html.push('<h' + lvl + ' id="' + id + '">' + inline(txt) + '</h' + lvl + '>');
        i++;
        continue;
      }

      // table
      if (/^\s*\|/.test(line) && i + 1 < lines.length && /^\s*\|?[\s:|-]+\|[\s:|-]*$/.test(lines[i + 1]) && lines[i + 1].indexOf('-') > -1) {
        var head = cells(line);
        i += 2;
        var body = [];
        while (i < lines.length && /^\s*\|/.test(lines[i])) { body.push(cells(lines[i])); i++; }
        var t = '<div class="tablewrap"><table><thead><tr>';
        head.forEach(function (c) { t += '<th>' + inline(c) + '</th>'; });
        t += '</tr></thead><tbody>';
        body.forEach(function (row) {
          t += '<tr>';
          for (var c = 0; c < head.length; c++) t += '<td>' + inline(row[c] || '') + '</td>';
          t += '</tr>';
        });
        html.push(t + '</tbody></table></div>');
        continue;
      }

      // blockquote
      if (/^\s*>\s?/.test(line)) {
        var q = [];
        while (i < lines.length && /^\s*>\s?/.test(lines[i])) { q.push(lines[i].replace(/^\s*>\s?/, '')); i++; }
        html.push('<blockquote>' + render(q.join('\n'), docId) + '</blockquote>');
        continue;
      }

      // task list
      if (/^\s*[-*]\s+\[[ xX]\]\s+/.test(line)) {
        var titems = [];
        while (i < lines.length && /^\s*[-*]\s+\[[ xX]\]\s+/.test(lines[i])) {
          var m = /^\s*[-*]\s+\[([ xX])\]\s+(.*)$/.exec(lines[i]);
          var key = docId + ':' + taskIndex++;
          var on = checks[key] === undefined ? m[1].toLowerCase() === 'x' : checks[key];
          titems.push(
            '<li class="' + (on ? 'checked' : '') + '">' +
            '<input type="checkbox" id="chk-' + key.replace(/[^\w-]/g, '_') + '" data-check="' + key + '"' + (on ? ' checked' : '') + '>' +
            '<label for="chk-' + key.replace(/[^\w-]/g, '_') + '">' + inline(m[2]) + '</label></li>'
          );
          i++;
        }
        flushList(false, titems, true);
        continue;
      }

      // unordered list
      if (/^\s*[-*]\s+/.test(line)) {
        var uitems = [];
        while (i < lines.length && /^\s*[-*]\s+/.test(lines[i]) && !/^\s*[-*]\s+\[[ xX]\]/.test(lines[i])) {
          uitems.push('<li>' + inline(lines[i].replace(/^\s*[-*]\s+/, '')) + '</li>');
          i++;
        }
        flushList(false, uitems, false);
        continue;
      }

      // ordered list
      if (/^\s*\d+[.)]\s+/.test(line)) {
        var oitems = [];
        var start = /^\s*(\d+)/.exec(line)[1];
        while (i < lines.length && /^\s*\d+[.)]\s+/.test(lines[i])) {
          oitems.push('<li>' + inline(lines[i].replace(/^\s*\d+[.)]\s+/, '')) + '</li>');
          i++;
        }
        html.push('<ol' + (start !== '1' ? ' start="' + start + '"' : '') + '>' + oitems.join('') + '</ol>');
        continue;
      }

      // blank
      if (!line.trim()) { i++; continue; }

      // paragraph
      var para = [];
      while (i < lines.length && lines[i].trim() &&
        !/^\s*(#{1,6}\s|>|[-*]\s|\d+[.)]\s|\||```|---\s*$)/.test(lines[i])) {
        para.push(lines[i].trim());
        i++;
      }
      if (para.length) html.push('<p>' + inline(para.join(' ')) + '</p>');
      else i++;
    }

    return html.join('\n');
  }

  /* ------------------------------------------------------------- navigation */
  var navLessons = document.getElementById('navLessons');
  var navTop = document.getElementById('navGuidesTop');
  var navBottom = document.getElementById('navGuidesBottom');

  function buildNav() {
    navTop.innerHTML = '<li><a href="#/overview" data-doc="overview"><span class="np"></span>' +
      '<span class="nt">Programme overview<small>Start here</small></span></a></li>' +
      '<li><a href="#/dashboard" data-route="dashboard"><span class="np"></span>' +
      '<span class="nt">Dashboard<small>Where you are</small></span></a></li>';

    navLessons.innerHTML = LESSONS.map(function (l) {
      return '<li><a href="#/' + l.id + '" data-doc="' + l.id + '">' +
        '<span class="np' + (done[l.id] ? ' done' : '') + '" data-np="' + l.id + '"></span>' +
        '<span class="nt">' + l.label + '<small>' + l.sub + '</small></span></a></li>';
    }).join('');

    navBottom.innerHTML = '<li><a href="#/tender-bible" data-doc="tender-bible">' +
      '<span class="np"></span><span class="nt">The Tender Bible</span></a></li>';
  }

  function refreshNavState() {
    LESSONS.forEach(function (l) {
      var np = document.querySelector('[data-np="' + l.id + '"]');
      if (np) np.className = 'np' + (done[l.id] ? ' done' : '');
    });
    var pct = Math.round(Object.keys(done).filter(function (k) { return done[k]; }).length / LESSONS.length * 100);
    var n = Object.keys(done).filter(function (k) { return done[k]; }).length;
    document.getElementById('progressBar').style.width = pct + '%';
    document.getElementById('progressPct').textContent = pct + '%';
    document.getElementById('progressText').textContent = n + ' of ' + LESSONS.length + ' lessons complete';
  }

  function markActive(hash) {
    Array.prototype.forEach.call(document.querySelectorAll('.navlist a'), function (a) {
      a.classList.toggle('active', a.getAttribute('href') === hash);
    });
  }

  /* ----------------------------------------------------------------- pages */
  var main = document.getElementById('main');

  function docPage(doc) {
    var idx = LESSONS.indexOf(doc);
    var isLesson = doc.kind === 'lesson';
    var prev = idx > 0 ? LESSONS[idx - 1] : null;
    var next = idx > -1 && idx < LESSONS.length - 1 ? LESSONS[idx + 1] : null;

    var h = '<div class="pagehead">';
    h += '<span class="eyebrow">' + (isLesson ? doc.label : 'Reference') + '</span>';
    h += '<h1>' + esc(isLesson ? doc.sub : doc.label) + '</h1>';
    if (isLesson) h += '<p class="lede">Work top to bottom. Do not advance past the mastery gate until you pass it.</p>';
    h += '</div>';

    if (doc.toc && doc.toc.length > 2) {
      h += '<nav class="toc"><div class="toc-title">On this page</div><ol>' +
        doc.toc.map(function (t) {
          return '<li><a href="#' + t.id + '">' + esc(t.title.replace(/^\d+\.\s*/, '')) + '</a></li>';
        }).join('') + '</ol></nav>';
    }

    h += '<article class="doc">' + render(doc.body, doc.id) + '</article>';

    if (isLesson) {
      h += '<div class="lessonfoot">';
      h += '<button class="completebtn' + (done[doc.id] ? ' done' : '') + '" data-complete="' + doc.id + '">' +
        '<span>' + (done[doc.id] ? '✓ Completed' : 'Mark week complete') + '</span></button>';
      h += '<div class="pager">';
      if (prev) h += '<a href="#/' + prev.id + '"><small>Previous</small>' + prev.label + '</a>';
      if (next) h += '<a href="#/' + next.id + '"><small>Next</small>' + next.label + '</a>';
      h += '</div></div>';
    }

    h += '<section class="notes"><h3>My notes — ' + esc(doc.label) + '</h3>' +
      '<p class="hint">Saved automatically in this browser. Use it for source references, questions, and errors you made.</p>' +
      '<textarea data-note="' + doc.id + '" placeholder="What did I learn? What did I get wrong? What goes into the Tender Bible?">' +
      esc(notes[doc.id] || '') + '</textarea><div class="saved" data-saved="' + doc.id + '"></div></section>';

    return h;
  }

  function dashboardPage() {
    var completed = LESSONS.filter(function (l) { return done[l.id]; }).length;
    var current = LESSONS.filter(function (l) { return !done[l.id]; })[0] || LESSONS[LESSONS.length - 1];
    var constructionLogs = log.filter(function (r) { return r.sector === 'Construction'; }).length;

    var h = '<div class="pagehead"><span class="eyebrow">Dashboard</span><h1>Where you are</h1>' +
      '<p class="lede">Volume targets matter more than hours. Log every pack you analyse.</p></div>';

    h += '<div class="stats">' +
      '<div class="stat"><b>' + completed + '/13</b><span>Lessons complete</span></div>' +
      '<div class="stat"><b>' + log.length + '</b><span>Tenders analysed</span><em>Target: 40–60 by week 12</em></div>' +
      '<div class="stat"><b>' + constructionLogs + '</b><span>Construction packs</span><em>Min. 10 before first client</em></div>' +
      '<div class="stat"><b>' + (log.filter(function (r) { return r.decision === 'Bid'; }).length) + '</b><span>Go decisions</span></div>' +
      '</div>';

    h += '<div class="callout"><span class="c-ico">🎯</span><div class="c-body"><strong>Next up: ' +
      esc(current.label + ' — ' + current.sub) + '</strong>' +
      '<a href="#/' + current.id + '">Open this lesson →</a></div></div>';

    h += '<h2 style="font-family:Georgia,serif;font-size:21px;margin:30px 0 14px">Readiness gate — before your first paid client</h2>';
    var gate = [
      ['20+ tender packs analysed', log.length >= 20, log.length + '/20'],
      ['10+ construction packs analysed', constructionLogs >= 10, constructionLogs + '/10'],
      ['All 13 lessons complete', completed === 13, completed + '/13'],
      ['Week 11 red-team process practised', !!done['week-11-qa-red-team'], done['week-11-qa-red-team'] ? 'Done' : 'Pending'],
      ['Week 12 simulations complete', !!done['week-12-simulated-bids'], done['week-12-simulated-bids'] ? 'Done' : 'Pending']
    ];
    h += '<div class="tablewrap"><table><thead><tr><th>Requirement</th><th>Status</th></tr></thead><tbody>' +
      gate.map(function (g) {
        return '<tr><td>' + (g[1] ? '✅ ' : '⬜ ') + g[0] + '</td><td>' + g[2] + '</td></tr>';
      }).join('') + '</tbody></table></div>';

    h += '<h2 style="font-family:Georgia,serif;font-size:21px;margin:34px 0 14px">The 12 weeks</h2><div class="grid">';
    LESSONS.forEach(function (l) {
      h += '<div class="card weekcard' + (done[l.id] ? ' done' : '') + '"><span class="tick">✓</span>' +
        '<div class="meta">' + l.label + '</div><h3>' + esc(l.sub) + '</h3>' +
        '<p>' + esc(firstObjective(l.body)) + '</p>' +
        '<div class="cardbtns"><a class="btn" href="#/' + l.id + '">Open lesson</a></div></div>';
    });
    h += '</div>';

    h += '<h2 style="font-family:Georgia,serif;font-size:21px;margin:34px 0 14px">Daily routine — 6 focused hours</h2>';
    h += '<div class="tablewrap"><table><thead><tr><th>Block</th><th>Hours</th><th>Activity</th></tr></thead><tbody>' +
      '<tr><td>A</td><td>2</td><td>Study official material (Treasury, CIDB, SARS, CSD, B-BBEE)</td></tr>' +
      '<tr><td>B</td><td>2</td><td>Dissect a real tender pack — never a hypothetical</td></tr>' +
      '<tr><td>C</td><td>1</td><td>Produce an artefact (matrix, methodology, checklist, narrative)</td></tr>' +
      '<tr><td>D</td><td>1</td><td>AI review: be quizzed, challenged and corrected</td></tr>' +
      '</tbody></table></div>';

    return h;
  }

  function firstObjective(body) {
    var m = /##\s*1\.\s*Why this (?:week )?matters\s*\n+([^\n#]+)/.exec(body);
    if (m) return m[1].replace(/[*>]/g, '').trim().slice(0, 155);
    var p = body.split('\n').filter(function (l) { return l.trim() && !/^[#>|*-]/.test(l.trim()); })[0] || '';
    return p.slice(0, 155);
  }

  function templatesPage() {
    var h = '<div class="pagehead"><span class="eyebrow">Toolkit</span><h1>Templates &amp; tools</h1>' +
      '<p class="lede">Ten working artefacts. Copy to clipboard or download and use on a live pack.</p></div>';
    h += '<div class="grid">';
    TEMPLATES.forEach(function (t) {
      h += '<div class="card"><div class="meta">' + t.format.toUpperCase() + '</div>' +
        '<h3>' + esc(t.title) + '</h3><p>' + esc(t.blurb) + '</p>' +
        '<div class="cardbtns">' +
        '<a class="btn" href="#/template/' + t.id + '">Preview</a>' +
        '<button class="btn" data-copy="' + t.id + '">Copy</button>' +
        '<button class="btn" data-download="' + t.id + '">Download</button>' +
        '</div></div>';
    });
    h += '</div>';
    return h;
  }

  function templatePage(id) {
    var t = TEMPLATES.filter(function (x) { return x.id === id; })[0];
    if (!t) return notFound();
    var h = '<div class="pagehead"><span class="eyebrow">Template · ' + t.format.toUpperCase() + '</span>' +
      '<h1>' + esc(t.title) + '</h1><p class="lede">' + esc(t.blurb) + '</p></div>';
    h += '<div class="btnrow">' +
      '<button class="goldbtn" data-copy="' + t.id + '">Copy to clipboard</button>' +
      '<button class="btn" data-download="' + t.id + '">Download ' + esc(t.filename) + '</button>' +
      '<a class="btn" href="#/templates">← All templates</a></div>';
    if (t.format === 'md') h += '<article class="doc">' + render(t.body, 'tpl-' + t.id) + '</article>';
    else h += '<div class="tplview">' + esc(t.body) + '</div>';
    return h;
  }

  function drillsPage() {
    var h = '<div class="pagehead"><span class="eyebrow">Practice</span><h1>AI drill prompts</h1>' +
      '<p class="lede">Every drill from the course in one place. Paste these into your AI workspace — after pinning the five ground rules.</p></div>';

    h += '<div class="callout"><span class="c-ico">⚖️</span><div class="c-body"><strong>Pin these five ground rules first</strong>' +
      '1. Never invent a tender requirement — quote or identify the source section. ' +
      '2. Distinguish mandatory/disqualifying from scored requirements. ' +
      '3. Never fabricate the bidder\'s projects, staff, qualifications, registrations, certificates, references, turnover or capabilities. ' +
      '4. When information is missing, write MISSING — CLIENT TO PROVIDE. ' +
      '5. Treat the tender document and applicable official source as authoritative over prior assumptions.</div></div>';

    DOCS.forEach(function (d) {
      var m = /##\s*\d*\.?\s*AI drill prompts?\s*\n([\s\S]*?)(?=\n##\s|\n---\s*\n##|$)/i.exec(d.body);
      if (!m) return;
      var quotes = [], buf = [];
      m[1].split('\n').forEach(function (l) {
        if (/^\s*>/.test(l)) buf.push(l.replace(/^\s*>\s?/, '').trim());
        else if (buf.length) { quotes.push(buf.join(' ').trim()); buf = []; }
      });
      if (buf.length) quotes.push(buf.join(' ').trim());
      quotes = quotes.filter(Boolean);
      if (!quotes.length) return;
      h += '<div class="drill"><div class="meta">' + esc(d.label) + (d.sub ? ' · ' + esc(d.sub) : '') + '</div>';
      quotes.forEach(function (q, n) {
        h += '<blockquote>' + inline(q) + '</blockquote>' +
          '<button class="btn" data-copytext="' + esc(q).replace(/"/g, '&quot;') + '">Copy prompt ' + (n + 1) + '</button> ';
      });
      h += '</div>';
    });
    return h;
  }

  function libraryPage() {
    var overview = DOCS.filter(function (d) { return d.id === 'overview'; })[0];
    var seen = {}, links = [];
    var re = /\|\s*([^|]+?)\s*\|\s*(https?:\/\/[^\s|]+)\s*\|/g, m;
    while ((m = re.exec(overview.body))) {
      if (seen[m[2]]) continue;
      seen[m[2]] = 1;
      links.push({ title: m[1].replace(/[*`]/g, '').trim(), url: m[2] });
    }
    var h = '<div class="pagehead"><span class="eyebrow">Reference</span><h1>Resource library</h1>' +
      '<p class="lede">The official sources the whole programme is built on. Bookmark all of them.</p></div>';

    h += '<div class="callout"><span class="c-ico">📌</span><div class="c-body"><strong>Regulatory watch — 2026</strong>' +
      'The Public Procurement Act 28 of 2024 is enacted but commencement is still to be proclaimed, and draft General Public Procurement Regulations were published in 2026. ' +
      'Until commencement, the operative framework remains PFMA / MFMA / PPPFA plus the Preferential Procurement Regulations 2022. Check this monthly.</div></div>';

    h += '<ul class="linklist">' + links.map(function (l) {
      return '<li><a href="' + l.url + '" target="_blank" rel="noopener noreferrer"><strong>' +
        esc(l.title) + '</strong><span>' + esc(l.url.replace(/^https?:\/\//, '').slice(0, 64)) + '</span></a></li>';
    }).join('') + '</ul>';

    h += '<div class="callout"><span class="c-ico">🗂️</span><div class="c-body"><strong>Folder structure for every live tender</strong>' +
      '<code>00-source-pack/</code> (never edited) · <code>01-corrigenda/</code> · <code>02-analysis/</code> · ' +
      '<code>03-drafts/</code> · <code>04-client-inputs/</code> · <code>05-final-submission/</code></div></div>';
    return h;
  }

  function trackerPage() {
    var construction = log.filter(function (r) { return r.sector === 'Construction'; }).length;
    var avg = log.length ? Math.round(log.reduce(function (a, r) { return a + (+r.minutes || 0); }, 0) / log.length) : 0;

    var h = '<div class="pagehead"><span class="eyebrow">Tracker</span><h1>Tender log</h1>' +
      '<p class="lede">By week 12: 40–60 packs analysed. Before your first paid client: 20 packs, of which 10 construction.</p></div>';

    h += '<div class="stats">' +
      '<div class="stat"><b>' + log.length + '</b><span>Total logged</span><em>Target 40–60</em></div>' +
      '<div class="stat"><b>' + construction + '</b><span>Construction</span><em>Min. 10</em></div>' +
      '<div class="stat"><b>' + (avg || '—') + '</b><span>Avg minutes</span><em>Goal: ≤ 90</em></div>' +
      '<div class="stat"><b>' + log.filter(function (r) { return r.eligible === 'Yes'; }).length + '</b><span>Eligible</span></div>' +
      '</div>';

    h += '<form class="logform" id="logForm"><div class="fields">' +
      '<label>Date<input type="date" name="date" required value="' + new Date().toISOString().slice(0, 10) + '"></label>' +
      '<label>Tender number<input name="number" placeholder="e.g. RFB 2026/07" required></label>' +
      '<label>Buyer<input name="buyer" placeholder="Organ of state"></label>' +
      '<label>Type<select name="type"><option>RFQ</option><option>RFP</option><option selected>RFB</option><option>RFI</option><option>EOI</option></select></label>' +
      '<label>Sector<select name="sector"><option>Construction</option><option>Services</option><option>Goods</option></select></label>' +
      '<label>CIDB required<input name="cidb" placeholder="e.g. 5CE"></label>' +
      '<label>Analysis time (min)<input type="number" name="minutes" min="0" placeholder="90"></label>' +
      '<label>Eligible?<select name="eligible"><option>Yes</option><option>No</option><option>Conditional</option></select></label>' +
      '<label>Decision<select name="decision"><option>Bid</option><option>No-bid</option><option>Bid if…</option></select></label>' +
      '<label style="grid-column:1/-1">Key lesson learned<input name="lesson" placeholder="The one thing this pack taught me"></label>' +
      '</div><div class="btnrow"><button type="submit" class="goldbtn">Add to log</button>' +
      '<button type="button" class="btn" id="exportCsv">Export CSV</button>' +
      '<button type="button" class="btn" id="exportJson">Backup everything (JSON)</button></div></form>';

    if (!log.length) {
      h += '<div class="empty-state">No tenders logged yet. Download a real pack from eTenders and start with Week 0\'s baseline exercise.</div>';
    } else {
      h += '<div class="tablewrap"><table class="logtable"><thead><tr>' +
        '<th>Date</th><th>Tender</th><th>Buyer</th><th>Type</th><th>Sector</th><th>CIDB</th><th>Min</th><th>Eligible</th><th>Decision</th><th>Lesson</th><th></th>' +
        '</tr></thead><tbody>' +
        log.slice().reverse().map(function (r, revIdx) {
          var realIdx = log.length - 1 - revIdx;
          return '<tr><td>' + esc(r.date) + '</td><td><strong>' + esc(r.number) + '</strong></td><td>' + esc(r.buyer || '—') +
            '</td><td>' + esc(r.type) + '</td><td>' + esc(r.sector) + '</td><td>' + esc(r.cidb || '—') +
            '</td><td>' + esc(r.minutes || '—') + '</td><td>' + esc(r.eligible) + '</td><td><span class="pill ' +
            (r.decision === 'Bid' ? 'go' : 'nogo') + '">' + esc(r.decision) + '</span></td><td>' + esc(r.lesson || '') +
            '</td><td><button class="delrow" data-del="' + realIdx + '" title="Delete">×</button></td></tr>';
        }).join('') + '</tbody></table></div>';
    }
    return h;
  }

  function notFound() {
    return '<div class="pagehead"><h1>Page not found</h1></div><p><a href="#/dashboard">Back to the dashboard</a></p>';
  }

  /* ---------------------------------------------------------------- router */
  function route() {
    var hash = location.hash || '#/overview';
    var path = hash.replace(/^#\//, '');
    var html;

    if (path.indexOf('template/') === 0) html = templatePage(path.slice(9));
    else if (path === 'dashboard') html = dashboardPage();
    else if (path === 'templates') html = templatesPage();
    else if (path === 'tracker') html = trackerPage();
    else if (path === 'drills') html = drillsPage();
    else if (path === 'library') html = libraryPage();
    else {
      var doc = DOCS.filter(function (d) { return d.id === path; })[0];
      html = doc ? docPage(doc) : notFound();
    }

    main.innerHTML = html;
    markActive('#/' + path);
    document.body.classList.remove('navopen');
    document.getElementById('scrim').hidden = true;
    window.scrollTo(0, 0);
    main.focus({ preventScroll: true });
    bindPage();
  }

  /* --------------------------------------------------------------- binding */
  function toast(msg) {
    var t = document.createElement('div');
    t.className = 'toast';
    t.textContent = msg;
    document.body.appendChild(t);
    requestAnimationFrame(function () { t.classList.add('show'); });
    setTimeout(function () { t.classList.remove('show'); setTimeout(function () { t.remove(); }, 300); }, 1900);
  }

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { toast('Copied to clipboard'); },
        function () { fallbackCopy(text); });
    } else fallbackCopy(text);
  }
  function fallbackCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); toast('Copied to clipboard'); } catch (e) { toast('Copy failed'); }
    ta.remove();
  }

  function download(filename, text, mime) {
    var blob = new Blob([text], { type: (mime || 'text/plain') + ';charset=utf-8' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url; a.download = filename;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
    toast('Downloaded ' + filename);
  }

  function bindPage() {
    // checkboxes
    Array.prototype.forEach.call(main.querySelectorAll('[data-check]'), function (box) {
      box.addEventListener('change', function () {
        checks[box.dataset.check] = box.checked;
        set('checks', checks);
        box.closest('li').classList.toggle('checked', box.checked);
      });
    });

    // complete button
    var cb = main.querySelector('[data-complete]');
    if (cb) cb.addEventListener('click', function () {
      var id = cb.dataset.complete;
      done[id] = !done[id];
      set('done', done);
      cb.classList.toggle('done', done[id]);
      cb.querySelector('span').textContent = done[id] ? '✓ Completed' : 'Mark week complete';
      refreshNavState();
      if (done[id]) toast('Week marked complete');
    });

    // notes
    var ta = main.querySelector('[data-note]');
    if (ta) {
      var timer;
      ta.addEventListener('input', function () {
        clearTimeout(timer);
        timer = setTimeout(function () {
          notes[ta.dataset.note] = ta.value;
          set('notes', notes);
          var s = main.querySelector('[data-saved="' + ta.dataset.note + '"]');
          if (s) { s.textContent = 'Saved'; setTimeout(function () { s.textContent = ''; }, 1600); }
        }, 450);
      });
    }

    // copy / download templates
    Array.prototype.forEach.call(main.querySelectorAll('[data-copy]'), function (b) {
      b.addEventListener('click', function () {
        var t = TEMPLATES.filter(function (x) { return x.id === b.dataset.copy; })[0];
        if (t) copyText(t.body);
      });
    });
    Array.prototype.forEach.call(main.querySelectorAll('[data-download]'), function (b) {
      b.addEventListener('click', function () {
        var t = TEMPLATES.filter(function (x) { return x.id === b.dataset.download; })[0];
        if (t) download(t.filename, t.body, t.format === 'csv' ? 'text/csv' : 'text/markdown');
      });
    });
    Array.prototype.forEach.call(main.querySelectorAll('[data-copytext]'), function (b) {
      b.addEventListener('click', function () { copyText(b.dataset.copytext); });
    });

    // tracker
    var form = document.getElementById('logForm');
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var fd = new FormData(form), row = {};
        fd.forEach(function (v, k) { row[k] = String(v).trim(); });
        log.push(row);
        set('log', log);
        route();
        toast('Logged. Total: ' + log.length);
      });
      document.getElementById('exportCsv').addEventListener('click', function () {
        var head = ['date', 'number', 'buyer', 'type', 'sector', 'cidb', 'minutes', 'eligible', 'decision', 'lesson'];
        var csv = head.join(',') + '\n' + log.map(function (r) {
          return head.map(function (k) { return '"' + String(r[k] || '').replace(/"/g, '""') + '"'; }).join(',');
        }).join('\n');
        download('tender-log.csv', csv, 'text/csv');
      });
      document.getElementById('exportJson').addEventListener('click', function () {
        download('sa-tender-academy-backup.json',
          JSON.stringify({ done: done, checks: checks, notes: notes, log: log }, null, 2), 'application/json');
      });
      Array.prototype.forEach.call(main.querySelectorAll('[data-del]'), function (b) {
        b.addEventListener('click', function () {
          log.splice(+b.dataset.del, 1);
          set('log', log);
          route();
        });
      });
    }
  }

  /* ---------------------------------------------------------------- search */
  var searchInput = document.getElementById('search');
  var resultsBox = document.getElementById('results');
  var INDEX = DOCS.map(function (d) {
    return { id: d.id, title: d.label + (d.sub ? ' — ' + d.sub : ''), href: '#/' + d.id, text: d.body };
  }).concat(TEMPLATES.map(function (t) {
    return { id: t.id, title: 'Template — ' + t.title, href: '#/template/' + t.id, text: t.body };
  }));

  function doSearch(q) {
    q = q.trim();
    if (q.length < 2) { resultsBox.hidden = true; return; }
    var needle = q.toLowerCase();
    var hits = [];
    INDEX.forEach(function (item) {
      var hay = item.text.toLowerCase();
      var pos = hay.indexOf(needle);
      var titleHit = item.title.toLowerCase().indexOf(needle) > -1;
      if (pos === -1 && !titleHit) return;
      var snippet = '';
      if (pos > -1) {
        var start = Math.max(0, pos - 60);
        snippet = (start > 0 ? '…' : '') +
          item.text.slice(start, pos + needle.length + 100).replace(/[#*|>`]/g, ' ').replace(/\s+/g, ' ') + '…';
      }
      hits.push({ title: item.title, href: item.href, snippet: snippet, score: (titleHit ? 0 : 1) + (pos === -1 ? 9 : 0) });
    });
    hits.sort(function (a, b) { return a.score - b.score; });
    if (!hits.length) {
      resultsBox.innerHTML = '<div class="empty">No matches for “' + esc(q) + '”.</div>';
    } else {
      var re = new RegExp('(' + q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'ig');
      resultsBox.innerHTML = hits.slice(0, 12).map(function (h) {
        return '<a class="r" href="' + h.href + '"><b>' + esc(h.title) + '</b><span>' +
          esc(h.snippet).replace(re, '<mark>$1</mark>') + '</span></a>';
      }).join('');
    }
    resultsBox.hidden = false;
  }

  searchInput.addEventListener('input', function () { doSearch(this.value); });
  searchInput.addEventListener('focus', function () { if (this.value.trim().length > 1) doSearch(this.value); });
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.searchwrap')) resultsBox.hidden = true;
    if (e.target.closest('.results .r')) { resultsBox.hidden = true; searchInput.value = ''; }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === '/' && document.activeElement !== searchInput && !/input|textarea|select/i.test(document.activeElement.tagName)) {
      e.preventDefault(); searchInput.focus();
    }
    if (e.key === 'Escape') { resultsBox.hidden = true; searchInput.blur(); }
  });

  /* ------------------------------------------------------------- chrome UI */
  document.getElementById('menuBtn').addEventListener('click', function () {
    var open = document.body.classList.toggle('navopen');
    this.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.getElementById('scrim').hidden = !open;
  });
  document.getElementById('scrim').addEventListener('click', function () {
    document.body.classList.remove('navopen');
    this.hidden = true;
  });

  var themeBtn = document.getElementById('themeBtn');
  function applyTheme(t) {
    document.body.dataset.theme = t;
    set('theme', t);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', t === 'dark' ? '#12160f' : '#0f3b2e');
  }
  applyTheme(get('theme', window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
  themeBtn.addEventListener('click', function () {
    applyTheme(document.body.dataset.theme === 'dark' ? 'light' : 'dark');
  });

  document.getElementById('resetBtn').addEventListener('click', function () {
    if (!confirm('Clear lesson progress, checkboxes and notes? Your tender log is kept.')) return;
    done = {}; checks = {}; notes = {};
    set('done', done); set('checks', checks); set('notes', notes);
    refreshNavState(); route(); toast('Progress reset');
  });

  window.addEventListener('hashchange', route);

  buildNav();
  refreshNavState();
  route();

  if ('serviceWorker' in navigator && location.protocol.indexOf('http') === 0) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('sw.js').catch(function () {});
    });
  }
})();
