// NY BizHer — Free LLC Wizard for Women Entrepreneurs
// Worker: bizher-wizard | URL: bizher.osintnet.uk
// Legally accurate as of May 2026 — NY LLC Law + NYS ESD MWBE
// Service Worker format (addEventListener) for clean CF deployment

const DISCLAIMER = `This tool provides general legal information only — not legal advice. No attorney-client relationship is formed by using this tool. Laws change — always verify current requirements with the NY Department of State (dos.ny.gov), a licensed NY attorney, and the NYS Empire State Development (esd.ny.gov) before filing. The documents generated here are templates; review them carefully before use.`;

const HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="Free step-by-step guide to forming a New York LLC and getting WBE/MWBE certified — built for women entrepreneurs.">
<title>NY BizHer — Free LLC Wizard for Women</title>
<style>
:root {
  --navy: #0d1b3e;
  --navy-light: #162450;
  --gold: #f0c040;
  --gold-light: #fad96a;
  --white: #ffffff;
  --off-white: #f4f6fb;
  --text: #1a1a2e;
  --text-muted: #556080;
  --border: #d0d8f0;
  --green: #22c55e;
  --red: #ef4444;
  --amber: #f59e0b;
  --step-done: #22c55e;
  --step-active: #f0c040;
  --step-pending: #d0d8f0;
  --radius: 12px;
  --shadow: 0 4px 24px rgba(13,27,62,0.12);
}
* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: var(--off-white);
  color: var(--text);
  min-height: 100vh;
}

/* HEADER */
.header {
  background: linear-gradient(135deg, var(--navy) 0%, #1a2f6e 100%);
  color: white;
  padding: clamp(20px,4vw,40px) clamp(16px,5vw,60px);
  position: relative;
  overflow: hidden;
}
.header::before {
  content: '';
  position: absolute;
  top: -50%; right: -10%;
  width: 400px; height: 400px;
  background: radial-gradient(circle, rgba(240,192,64,0.15) 0%, transparent 70%);
  pointer-events: none;
}
.header-inner { max-width: 900px; margin: 0 auto; position: relative; }
.header-badge {
  display: inline-block;
  background: rgba(240,192,64,0.2);
  border: 1px solid rgba(240,192,64,0.4);
  color: var(--gold);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  padding: 4px 12px;
  border-radius: 20px;
  margin-bottom: 12px;
}
.header h1 {
  font-size: clamp(1.6rem, 4vw, 2.8rem);
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 8px;
}
.header h1 span { color: var(--gold); }
.header p {
  font-size: clamp(0.9rem, 2vw, 1.1rem);
  color: rgba(255,255,255,0.8);
  max-width: 600px;
  line-height: 1.6;
}
.lang-toggle {
  position: absolute;
  top: 0; right: 0;
  display: flex; gap: 8px;
}
.lang-btn {
  background: rgba(255,255,255,0.1);
  border: 1px solid rgba(255,255,255,0.2);
  color: white;
  padding: 6px 14px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  transition: all 0.2s;
}
.lang-btn.active, .lang-btn:hover {
  background: var(--gold);
  color: var(--navy);
  border-color: var(--gold);
}

/* COST BANNER */
.cost-banner {
  background: #fffbeb;
  border-bottom: 2px solid #fde68a;
  padding: 12px clamp(16px,5vw,60px);
}
.cost-inner {
  max-width: 900px; margin: 0 auto;
  display: flex; flex-wrap: wrap; gap: 16px; align-items: center;
}
.cost-label { font-weight: 700; font-size: 13px; color: #92400e; }
.cost-items { display: flex; flex-wrap: wrap; gap: 12px; }
.cost-item {
  display: flex; align-items: center; gap: 6px;
  font-size: 12px; color: #78350f;
}
.cost-item .dot { width: 8px; height: 8px; border-radius: 50%; }
.dot-red { background: var(--red); }
.dot-amber { background: var(--amber); }
.dot-green { background: var(--green); }

/* MAIN LAYOUT */
.main { max-width: 900px; margin: 0 auto; padding: clamp(16px,4vw,40px) clamp(16px,5vw,60px); }

/* PROGRESS BAR */
.progress-wrap { margin-bottom: 32px; }
.steps-row {
  display: flex; align-items: center;
  gap: 0; width: 100%;
}
.step-node {
  display: flex; flex-direction: column; align-items: center;
  flex: 1; position: relative; cursor: pointer;
}
.step-circle {
  width: 36px; height: 36px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-weight: 700; font-size: 14px;
  border: 2px solid var(--step-pending);
  background: white; color: var(--text-muted);
  transition: all 0.3s; z-index: 1;
}
.step-node.done .step-circle { background: var(--step-done); border-color: var(--step-done); color: white; }
.step-node.active .step-circle { background: var(--navy); border-color: var(--gold); color: var(--gold); box-shadow: 0 0 0 4px rgba(240,192,64,0.2); }
.step-label {
  font-size: 10px; font-weight: 600; color: var(--text-muted);
  margin-top: 6px; text-align: center;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  max-width: 80px;
}
.step-node.active .step-label { color: var(--navy); }
.step-node.done .step-label { color: var(--step-done); }
.step-line {
  flex: 1; height: 2px; background: var(--step-pending);
  margin-bottom: 28px; transition: background 0.3s;
}
.step-line.done { background: var(--step-done); }

/* CARD */
.card {
  background: white;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: clamp(20px,4vw,40px);
  margin-bottom: 24px;
}
.card-title {
  font-size: 1.3rem; font-weight: 800; color: var(--navy);
  margin-bottom: 6px; display: flex; align-items: center; gap: 10px;
}
.card-subtitle { font-size: 0.9rem; color: var(--text-muted); margin-bottom: 24px; line-height: 1.5; }

/* FORM ELEMENTS */
.field-group { margin-bottom: 20px; }
label { display: block; font-size: 13px; font-weight: 700; color: var(--navy); margin-bottom: 6px; }
label .req { color: var(--red); margin-left: 2px; }
input[type=text], input[type=email], select, textarea {
  width: 100%; padding: 10px 14px;
  border: 1.5px solid var(--border); border-radius: 8px;
  font-size: 15px; color: var(--text);
  background: white; transition: border-color 0.2s;
  font-family: inherit;
}
input:focus, select:focus, textarea:focus {
  outline: none; border-color: var(--navy);
  box-shadow: 0 0 0 3px rgba(13,27,62,0.08);
}
textarea { resize: vertical; min-height: 80px; }
.field-hint { font-size: 11px; color: var(--text-muted); margin-top: 4px; }
.field-error { font-size: 11px; color: var(--red); margin-top: 4px; display: none; }

/* RADIO GROUP */
.radio-group { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 4px; }
.radio-opt {
  flex: 1; min-width: 140px;
  border: 2px solid var(--border); border-radius: 8px;
  padding: 12px 16px; cursor: pointer;
  transition: all 0.2s; display: flex; align-items: center; gap: 10px;
}
.radio-opt:hover { border-color: var(--navy); }
.radio-opt.selected { border-color: var(--navy); background: #f0f4ff; }
.radio-opt input { display: none; }
.radio-dot {
  width: 16px; height: 16px; border-radius: 50%;
  border: 2px solid var(--border); flex-shrink: 0; transition: all 0.2s;
}
.radio-opt.selected .radio-dot { border-color: var(--navy); background: var(--navy); }
.radio-text { font-size: 13px; font-weight: 600; }

/* BUTTONS */
.btn-row { display: flex; gap: 12px; justify-content: flex-end; flex-wrap: wrap; }
.btn {
  padding: 12px 28px; border-radius: 8px;
  font-size: 14px; font-weight: 700;
  border: none; cursor: pointer; transition: all 0.2s;
  font-family: inherit;
}
.btn-primary {
  background: var(--navy); color: white;
}
.btn-primary:hover { background: #162450; transform: translateY(-1px); box-shadow: 0 4px 12px rgba(13,27,62,0.3); }
.btn-secondary { background: var(--off-white); color: var(--navy); border: 1.5px solid var(--border); }
.btn-secondary:hover { background: var(--border); }
.btn-gold { background: var(--gold); color: var(--navy); }
.btn-gold:hover { background: var(--gold-light); transform: translateY(-1px); }
.btn-sm { padding: 7px 16px; font-size: 12px; }

/* INFO BOX */
.info-box {
  border-radius: 8px; padding: 14px 16px;
  font-size: 13px; line-height: 1.6; margin: 16px 0;
}
.info-box.blue { background: #eff6ff; border-left: 4px solid #3b82f6; color: #1e40af; }
.info-box.amber { background: #fffbeb; border-left: 4px solid var(--amber); color: #78350f; }
.info-box.red { background: #fef2f2; border-left: 4px solid var(--red); color: #7f1d1d; }
.info-box.green { background: #f0fdf4; border-left: 4px solid var(--green); color: #14532d; }
.info-box.gold { background: #fefce8; border-left: 4px solid var(--gold); color: #713f12; }
.info-box strong { font-weight: 700; }

/* COST TABLE */
.cost-table { width: 100%; border-collapse: collapse; margin: 16px 0; }
.cost-table th {
  background: var(--navy); color: white;
  padding: 10px 14px; text-align: left; font-size: 13px;
}
.cost-table td { padding: 10px 14px; border-bottom: 1px solid var(--border); font-size: 13px; }
.cost-table tr:last-child td { font-weight: 700; background: #fffbeb; }
.free-tag { color: var(--green); font-weight: 700; }
.warn-tag { color: var(--amber); font-weight: 700; }

/* CHECKLIST */
.checklist { list-style: none; }
.checklist li {
  display: flex; align-items: flex-start; gap: 10px;
  padding: 10px 0; border-bottom: 1px solid var(--border);
  font-size: 13px;
}
.checklist li:last-child { border-bottom: none; }
.check-box {
  width: 20px; height: 20px; flex-shrink: 0;
  border: 2px solid var(--border); border-radius: 4px;
  cursor: pointer; transition: all 0.2s; margin-top: 1px;
  display: flex; align-items: center; justify-content: center;
}
.check-box.checked { background: var(--green); border-color: var(--green); }
.check-box.checked::after { content: '✓'; color: white; font-size: 12px; font-weight: 700; }
.check-label { flex: 1; line-height: 1.5; }
.check-label strong { color: var(--navy); display: block; font-size: 13px; }
.check-label span { color: var(--text-muted); font-size: 11px; }
.check-group-title {
  font-weight: 800; font-size: 12px;
  letter-spacing: 1px; text-transform: uppercase;
  color: var(--text-muted); margin: 16px 0 6px;
}

/* GENERATED DOC */
.doc-output {
  background: #f8faff;
  border: 1.5px solid var(--border);
  border-radius: 8px;
  padding: 20px 24px;
  font-family: 'Courier New', monospace;
  font-size: 12px;
  line-height: 1.8;
  white-space: pre-wrap;
  max-height: 400px;
  overflow-y: auto;
  color: var(--text);
}
.doc-actions { display: flex; gap: 10px; margin-top: 12px; flex-wrap: wrap; }

/* COUNTY COST MAP */
.county-grid {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 10px; margin: 16px 0;
}
.county-card {
  border: 1.5px solid var(--border); border-radius: 8px;
  padding: 12px 14px; font-size: 12px;
}
.county-name { font-weight: 700; color: var(--navy); margin-bottom: 4px; }
.county-cost { color: var(--red); font-weight: 700; font-size: 13px; }
.county-note { color: var(--text-muted); font-size: 11px; }

/* TAG */
.tag {
  display: inline-block; padding: 2px 10px;
  border-radius: 20px; font-size: 11px; font-weight: 700;
}
.tag-gold { background: #fef9c3; color: #713f12; }
.tag-green { background: #dcfce7; color: #14532d; }
.tag-blue { background: #dbeafe; color: #1e40af; }

/* ACCORDION */
.accordion { border: 1.5px solid var(--border); border-radius: 8px; overflow: hidden; margin: 12px 0; }
.acc-header {
  padding: 14px 18px; cursor: pointer;
  display: flex; justify-content: space-between; align-items: center;
  font-weight: 700; font-size: 14px; background: white;
  transition: background 0.2s;
}
.acc-header:hover { background: var(--off-white); }
.acc-arrow { transition: transform 0.3s; font-size: 12px; }
.acc-body { padding: 0 18px; max-height: 0; overflow: hidden; transition: max-height 0.4s ease, padding 0.3s; }
.acc-body.open { max-height: 2000px; padding: 14px 18px; }

/* DISCLAIMER */
.disclaimer {
  background: #f0f4ff; border: 1px solid #c7d2fe;
  border-radius: 8px; padding: 14px 16px;
  font-size: 11px; color: #3730a3; line-height: 1.6; margin: 20px 0;
}

/* FOOTER */
.footer {
  text-align: center; padding: 32px 16px;
  color: var(--text-muted); font-size: 12px; line-height: 1.8;
  border-top: 1px solid var(--border); margin-top: 40px;
}
.footer a { color: var(--navy); }

/* PRINT */
@media print {
  .header, .progress-wrap, .btn-row, .footer, .cost-banner, .lang-toggle { display: none !important; }
  .card { box-shadow: none; border: 1px solid #ccc; }
  body { background: white; }
  #step-container > div:not(.active-step) { display: block !important; }
}

@media (max-width: 600px) {
  .step-label { display: none; }
  .steps-row { gap: 0; }
  .lang-toggle { position: static; margin-top: 12px; }
  .header-inner { padding-top: 8px; }
}
</style>
</head>
<body>

<div class="header">
  <div class="header-inner">
    <div class="lang-toggle">
      <button class="lang-btn active" onclick="setLang('en')" id="btn-en">EN</button>
      <button class="lang-btn" onclick="setLang('es')" id="btn-es">ES</button>
    </div>
    <div class="header-badge" data-t="badge">Free Legal Tool — New York State</div>
    <h1 data-t="headline">NY <span>BizHer</span> LLC Wizard</h1>
    <p data-t="subhead">The free, step-by-step guide to forming your New York LLC and getting WBE/MWBE certified — built for women entrepreneurs.</p>
  </div>
</div>

<div class="cost-banner">
  <div class="cost-inner">
    <div class="cost-label" data-t="realcost">Real Costs Upfront:</div>
    <div class="cost-items">
      <div class="cost-item"><div class="dot dot-red"></div><span data-t="cost1">Filing: $200</span></div>
      <div class="cost-item"><div class="dot dot-red"></div><span data-t="cost2">Publication: $600–$2,000</span></div>
      <div class="cost-item"><div class="dot dot-amber"></div><span data-t="cost3">Cert. of Publication: $50</span></div>
      <div class="cost-item"><div class="dot dot-green"></div><span data-t="cost4">EIN: FREE</span></div>
      <div class="cost-item"><div class="dot dot-green"></div><span data-t="cost5">WBE Cert: FREE</span></div>
    </div>
  </div>
</div>

<div class="main">

  <!-- PROGRESS -->
  <div class="progress-wrap">
    <div class="steps-row" id="steps-row">
      <div class="step-node active" id="sn-1" onclick="goStep(1)">
        <div class="step-circle" id="sc-1">1</div>
        <div class="step-label" data-t="s1label">Foundation</div>
      </div>
      <div class="step-line" id="sl-1"></div>
      <div class="step-node" id="sn-2" onclick="goStep(2)">
        <div class="step-circle" id="sc-2">2</div>
        <div class="step-label" data-t="s2label">Articles</div>
      </div>
      <div class="step-line" id="sl-2"></div>
      <div class="step-node" id="sn-3" onclick="goStep(3)">
        <div class="step-circle" id="sc-3">3</div>
        <div class="step-label" data-t="s3label">Publication</div>
      </div>
      <div class="step-line" id="sl-3"></div>
      <div class="step-node" id="sn-4" onclick="goStep(4)">
        <div class="step-circle" id="sc-4">4</div>
        <div class="step-label" data-t="s4label">EIN & Ops</div>
      </div>
      <div class="step-line" id="sl-4"></div>
      <div class="step-node" id="sn-5" onclick="goStep(5)">
        <div class="step-circle" id="sc-5">5</div>
        <div class="step-label" data-t="s5label">WBE/MWBE</div>
      </div>
    </div>
  </div>

  <div id="step-container">

    <!-- ===== STEP 1: FOUNDATION ===== -->
    <div id="step-1">
      <div class="card">
        <div class="card-title">&#x1F3DB; <span data-t="s1title">Step 1: Your Business Foundation</span></div>
        <div class="card-subtitle" data-t="s1sub">Let&apos;s start with the basics. Everything you enter here will be used to generate your legal documents.</div>

        <div class="info-box blue" data-t="s1info">
          <strong>What is an LLC?</strong> A Limited Liability Company combines the liability protection of a corporation with the flexibility of a partnership. As a member (owner), your personal assets are generally protected from business debts.
        </div>

        <div class="field-group">
          <label data-t="llcname">LLC Name <span class="req">*</span></label>
          <input type="text" id="f-name" placeholder="e.g. Bright Future Consulting LLC" oninput="saveDraft()">
          <div class="field-hint" data-t="namehint">Must include &ldquo;LLC&rdquo; or &ldquo;Limited Liability Company&rdquo;. Must be unique in New York.</div>
          <div class="field-error" id="err-name" data-t="nameerr">Please enter your LLC name including LLC or Limited Liability Company.</div>
        </div>

        <div class="field-group">
          <label data-t="county">County of Business <span class="req">*</span></label>
          <select id="f-county" onchange="saveDraft()">
            <option value="">-- Select County --</option>
            <optgroup label="New York City">
              <option value="New York (Manhattan)">New York (Manhattan)</option>
              <option value="Kings (Brooklyn)">Kings (Brooklyn)</option>
              <option value="Queens">Queens</option>
              <option value="Bronx">Bronx</option>
              <option value="Richmond (Staten Island)">Richmond (Staten Island)</option>
            </optgroup>
            <optgroup label="Long Island">
              <option value="Nassau">Nassau</option>
              <option value="Suffolk">Suffolk</option>
            </optgroup>
            <optgroup label="Hudson Valley">
              <option value="Westchester">Westchester</option>
              <option value="Rockland">Rockland</option>
              <option value="Orange">Orange</option>
              <option value="Dutchess">Dutchess</option>
              <option value="Ulster">Ulster</option>
              <option value="Sullivan">Sullivan</option>
              <option value="Putnam">Putnam</option>
              <option value="Columbia">Columbia</option>
              <option value="Greene">Greene</option>
            </optgroup>
            <optgroup label="Capital Region">
              <option value="Albany">Albany</option>
              <option value="Schenectady">Schenectady</option>
              <option value="Rensselaer">Rensselaer</option>
              <option value="Saratoga">Saratoga</option>
              <option value="Montgomery">Montgomery</option>
              <option value="Schoharie">Schoharie</option>
            </optgroup>
            <optgroup label="Central NY">
              <option value="Onondaga">Onondaga</option>
              <option value="Oneida">Oneida</option>
              <option value="Madison">Madison</option>
              <option value="Cortland">Cortland</option>
              <option value="Cayuga">Cayuga</option>
              <option value="Oswego">Oswego</option>
            </optgroup>
            <optgroup label="Western NY">
              <option value="Erie">Erie</option>
              <option value="Niagara">Niagara</option>
              <option value="Monroe">Monroe</option>
              <option value="Chautauqua">Chautauqua</option>
              <option value="Cattaraugus">Cattaraugus</option>
              <option value="Allegany">Allegany</option>
              <option value="Wyoming">Wyoming</option>
              <option value="Genesee">Genesee</option>
              <option value="Orleans">Orleans</option>
              <option value="Livingston">Livingston</option>
            </optgroup>
            <optgroup label="Finger Lakes">
              <option value="Ontario">Ontario</option>
              <option value="Wayne">Wayne</option>
              <option value="Seneca">Seneca</option>
              <option value="Yates">Yates</option>
              <option value="Steuben">Steuben</option>
              <option value="Schuyler">Schuyler</option>
              <option value="Chemung">Chemung</option>
              <option value="Tompkins">Tompkins</option>
            </optgroup>
            <optgroup label="Southern Tier">
              <option value="Broome">Broome</option>
              <option value="Tioga">Tioga</option>
              <option value="Chenango">Chenango</option>
              <option value="Delaware">Delaware</option>
              <option value="Otsego">Otsego</option>
            </optgroup>
            <optgroup label="North Country">
              <option value="Clinton">Clinton</option>
              <option value="Essex">Essex</option>
              <option value="Franklin">Franklin</option>
              <option value="Hamilton">Hamilton</option>
              <option value="Jefferson">Jefferson</option>
              <option value="Lewis">Lewis</option>
              <option value="St. Lawrence">St. Lawrence</option>
              <option value="Warren">Warren</option>
              <option value="Washington">Washington</option>
            </optgroup>
            <optgroup label="Mohawk Valley">
              <option value="Fulton">Fulton</option>
              <option value="Herkimer">Herkimer</option>
            </optgroup>
          </select>
          <div class="field-error" id="err-county" data-t="countyerr">Please select your county.</div>
        </div>

        <div class="field-group">
          <label data-t="llctype">LLC Type <span class="req">*</span></label>
          <div class="radio-group">
            <label class="radio-opt selected" id="ro-single" onclick="selectType('single')">
              <div class="radio-dot"></div>
              <div class="radio-text" data-t="single">Single-Member (just me)</div>
            </label>
            <label class="radio-opt" id="ro-multi" onclick="selectType('multi')">
              <div class="radio-dot"></div>
              <div class="radio-text" data-t="multi">Multi-Member (2+ owners)</div>
            </label>
          </div>
          <input type="hidden" id="f-type" value="single">
        </div>

        <div class="field-group">
          <label data-t="purpose">Business Purpose <span class="req">*</span></label>
          <textarea id="f-purpose" rows="3" placeholder="e.g. To engage in consulting services and any other lawful business." oninput="saveDraft()"></textarea>
          <div class="field-hint" data-t="purposehint">Tip: A broad purpose gives you flexibility. Example: &ldquo;To engage in any lawful act or activity for which limited liability companies may be organized.&rdquo;</div>
        </div>

        <div class="field-group">
          <label data-t="agent">Registered Agent</label>
          <div class="radio-group">
            <label class="radio-opt selected" id="ro-self" onclick="selectAgent('self')">
              <div class="radio-dot"></div>
              <div class="radio-text" data-t="agself">Myself (use my address)</div>
            </label>
            <label class="radio-opt" id="ro-dos" onclick="selectAgent('dos')">
              <div class="radio-dot"></div>
              <div class="radio-text" data-t="agdos">NY Dept. of State (recommended)</div>
            </label>
          </div>
          <input type="hidden" id="f-agent" value="self">
          <div class="field-hint" data-t="agenthint">Using the NY Dept. of State as agent means all legal notices go to them and they forward to you — keeps your home address private.</div>
        </div>

        <div class="field-group">
          <label data-t="yourname">Your Full Legal Name <span class="req">*</span></label>
          <input type="text" id="f-organizer" placeholder="Jane Maria Rodriguez" oninput="saveDraft()">
        </div>

        <div class="field-group">
          <label data-t="youraddr">Street Address (for Articles) <span class="req">*</span></label>
          <input type="text" id="f-address" placeholder="123 Main Street, Brooklyn, NY 11201" oninput="saveDraft()">
        </div>

        <div class="info-box amber">
          <strong data-t="namelookup">Name Availability:</strong>
          <span data-t="namelookuptext"> Before filing, verify your name is available on the NY DOS database.</span>
          <br><a href="https://apps.dos.ny.gov/publicInquiry/" target="_blank" rel="noopener" style="color:#78350f;font-weight:700">&#x1F517; Check Name Availability on NY DOS &rarr;</a>
        </div>

        <div class="disclaimer">${DISCLAIMER}</div>

        <div class="btn-row">
          <button class="btn btn-primary" onclick="nextStep(1)" data-t="next">Next: Articles of Organization &rarr;</button>
        </div>
      </div>
    </div>

    <!-- ===== STEP 2: ARTICLES ===== -->
    <div id="step-2" style="display:none">
      <div class="card">
        <div class="card-title">&#x1F4DC; <span data-t="s2title">Step 2: Articles of Organization</span></div>
        <div class="card-subtitle" data-t="s2sub">This is the official document you file with the NY Department of State to legally create your LLC. The filing fee is <strong>$200</strong>.</div>

        <div class="info-box blue">
          <strong>Form DOS-1336-f</strong> — This is the official NY DOS form. You can file online, by mail, or in person. Filing online is fastest (same-day to 2 business days). Mail takes 4–6 weeks.
        </div>

        <div id="articles-preview" class="doc-output">Loading your Articles of Organization...</div>

        <div class="doc-actions">
          <button class="btn btn-gold btn-sm" onclick="window.print()">&#x1F5A8; Print Document</button>
          <button class="btn btn-secondary btn-sm" onclick="copyDoc('articles-preview')">&#x1F4CB; Copy Text</button>
          <a href="https://apps.dos.ny.gov/publicInquiry/corps/businessEntitySearch" target="_blank" rel="noopener" class="btn btn-secondary btn-sm">&#x1F310; File Online at NY DOS &rarr;</a>
        </div>

        <div class="info-box amber" style="margin-top:20px">
          <strong>&#x23F0; The 120-Day Clock Starts When You File!</strong><br>
          Once your Articles are approved, you have exactly <strong>120 days</strong> to complete the newspaper publication requirement or your LLC&rsquo;s authority to conduct business will be <strong>suspended</strong>. Plan your publication immediately.
        </div>

        <div class="accordion">
          <div class="acc-header" onclick="toggleAcc(this)">
            <span>&#x2139;&#xFE0F; What happens after I file?</span>
            <span class="acc-arrow">&#x25BC;</span>
          </div>
          <div class="acc-body">
            <ol style="padding-left:18px;font-size:13px;line-height:2">
              <li>Pay <strong>$200</strong> filing fee (online: credit card; mail: check to &ldquo;Department of State&rdquo;)</li>
              <li>NY DOS reviews and files your Articles (online: same day; mail: 4–6 weeks)</li>
              <li>You receive a <strong>Filing Receipt</strong> — save this document!</li>
              <li>Your LLC is now legally formed &mdash; but you MUST complete publication within 120 days</li>
              <li>Apply for your EIN from the IRS (Step 4)</li>
              <li>Adopt your Operating Agreement (Step 4)</li>
              <li>Open a business bank account</li>
            </ol>
          </div>
        </div>

        <div class="accordion">
          <div class="acc-header" onclick="toggleAcc(this)">
            <span>&#x1F4B0; Full Cost Breakdown</span>
            <span class="acc-arrow">&#x25BC;</span>
          </div>
          <div class="acc-body">
            <table class="cost-table">
              <thead><tr><th>Item</th><th>Cost</th><th>Notes</th></tr></thead>
              <tbody>
                <tr><td>Articles of Organization filing</td><td>$200</td><td>Required, paid to NY DOS</td></tr>
                <tr><td>Newspaper publication</td><td>$600&ndash;$2,000</td><td>Varies by county — NYC is most expensive</td></tr>
                <tr><td>Certificate of Publication</td><td>$50</td><td>Required after publication</td></tr>
                <tr><td>EIN (IRS)</td><td class="free-tag">FREE</td><td>Apply online at irs.gov</td></tr>
                <tr><td>Operating Agreement (DIY)</td><td class="free-tag">FREE</td><td>Generated in Step 4</td></tr>
                <tr><td>WBE/MWBE Certification</td><td class="free-tag">FREE</td><td>Applied through ESD</td></tr>
                <tr><td><strong>NYC Total (approx.)</strong></td><td><strong>~$2,250</strong></td><td>Budget conservatively</td></tr>
                <tr><td><strong>Upstate Total (approx.)</strong></td><td><strong>~$875</strong></td><td>Publication much cheaper</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="disclaimer">${DISCLAIMER}</div>
        <div class="btn-row">
          <button class="btn btn-secondary" onclick="prevStep(2)">&larr; <span data-t="back">Back</span></button>
          <button class="btn btn-primary" onclick="nextStep(2)" data-t="next2">Next: Publication Requirement &rarr;</button>
        </div>
      </div>
    </div>

    <!-- ===== STEP 3: PUBLICATION ===== -->
    <div id="step-3" style="display:none">
      <div class="card">
        <div class="card-title">&#x1F4F0; <span data-t="s3title">Step 3: Publication Requirement</span></div>
        <div class="card-subtitle" data-t="s3sub">New York State requires every new LLC to publish a notice in two newspapers for six consecutive weeks. This is mandatory — skipping it will suspend your business.</div>

        <div class="info-box red">
          <strong>&#x26A0;&#xFE0F; This is NOT optional.</strong> Section 206 of the NY LLC Law requires publication in 2 newspapers designated by your county clerk, once per week for 6 weeks. Failure to file the Certificate of Publication within 120 days = <strong>your LLC&rsquo;s authority to do business is suspended</strong>.
        </div>

        <h3 style="font-size:14px;font-weight:800;margin:20px 0 10px;color:var(--navy)">Publication Costs by Area</h3>
        <div class="county-grid">
          <div class="county-card">
            <div class="county-name">Manhattan / Brooklyn / Queens</div>
            <div class="county-cost">$1,200 &ndash; $2,000</div>
            <div class="county-note">Most expensive in state</div>
          </div>
          <div class="county-card">
            <div class="county-name">Bronx / Staten Island</div>
            <div class="county-cost">$800 &ndash; $1,400</div>
            <div class="county-note">Designated newspapers only</div>
          </div>
          <div class="county-card">
            <div class="county-name">Nassau / Suffolk / Westchester</div>
            <div class="county-cost">$700 &ndash; $1,100</div>
            <div class="county-note">Suburban press rates</div>
          </div>
          <div class="county-card">
            <div class="county-name">Albany / Schenectady / Troy</div>
            <div class="county-cost">$600 &ndash; $900</div>
            <div class="county-note">Capital region rates</div>
          </div>
          <div class="county-card">
            <div class="county-name">Buffalo / Rochester / Syracuse</div>
            <div class="county-cost">$600 &ndash; $850</div>
            <div class="county-note">Western/Central NY rates</div>
          </div>
          <div class="county-card">
            <div class="county-name">Rural / Upstate Counties</div>
            <div class="county-cost">$500 &ndash; $750</div>
            <div class="county-note">Generally lowest rates</div>
          </div>
        </div>

        <h3 style="font-size:14px;font-weight:800;margin:20px 0 10px;color:var(--navy)">How to Complete Publication — Step by Step</h3>
        <ol style="padding-left:20px;font-size:13px;line-height:2.2">
          <li><strong>Contact your County Clerk</strong> — Ask for the list of two designated newspapers for LLC publication in your county. <em>Do not use any other newspapers.</em></li>
          <li><strong>Contact both newspapers</strong> — Provide them your LLC&rsquo;s exact name and date of filing exactly as shown on your DOS filing receipt.</li>
          <li><strong>Publish for 6 consecutive weeks</strong> — The notice must run once per week for 6 weeks in each paper.</li>
          <li><strong>Get Affidavits of Publication</strong> — Each newspaper will provide you with a signed affidavit after publication is complete. Keep these documents.</li>
          <li><strong>File Certificate of Publication</strong> — File Form 1708 with the NY DOS along with both affidavits and a <strong>$50 filing fee</strong> within 120 days of your LLC formation.</li>
        </ol>

        <div class="info-box green" style="margin-top:16px">
          <strong>&#x1F4A1; Pro Tip:</strong> Many publication services offer bundled pricing. Search &ldquo;[your county] LLC publication service&rdquo; to find services that handle both newspapers and provide the affidavits. Always verify they use the correct county-designated newspapers.
        </div>

        <div class="info-box blue">
          <strong>&#x1F4C5; Your 120-Day Tracker</strong><br>
          Start tracking your publication deadline the day your Articles are filed. We recommend publishing immediately — don&rsquo;t wait.
          <br><br>
          <div id="pub-tracker-wrap">
            <label style="color:#1e40af;font-size:12px;display:block;margin-bottom:6px">Enter your filing date to calculate your deadline:</label>
            <input type="date" id="pub-date" style="width:auto;padding:6px 12px;font-size:13px" onchange="calcDeadline()">
            <div id="pub-deadline" style="margin-top:8px;font-weight:700;font-size:14px"></div>
          </div>
        </div>

        <div class="accordion">
          <div class="acc-header" onclick="toggleAcc(this)">
            <span>&#x1F4AC; What should the published notice say?</span>
            <span class="acc-arrow">&#x25BC;</span>
          </div>
          <div class="acc-body">
            <div id="pub-notice" class="doc-output" style="max-height:200px">Fill out Step 1 first to generate your publication notice.</div>
            <div class="doc-actions">
              <button class="btn btn-gold btn-sm" onclick="copyDoc('pub-notice')">&#x1F4CB; Copy Notice Text</button>
            </div>
            <p style="font-size:11px;color:var(--text-muted);margin-top:8px">Note: The newspapers will draft the final notice. Provide them your exact LLC name and filing details.</p>
          </div>
        </div>

        <div class="disclaimer">${DISCLAIMER}</div>
        <div class="btn-row">
          <button class="btn btn-secondary" onclick="prevStep(3)">&larr; <span data-t="back">Back</span></button>
          <button class="btn btn-primary" onclick="nextStep(3)">Next: EIN &amp; Operating Agreement &rarr;</button>
        </div>
      </div>
    </div>

    <!-- ===== STEP 4: EIN + OP AGREEMENT ===== -->
    <div id="step-4" style="display:none">
      <div class="card">
        <div class="card-title">&#x1F4B3; <span data-t="s4title">Step 4: EIN &amp; Operating Agreement</span></div>
        <div class="card-subtitle" data-t="s4sub">Two critical steps: get your federal tax ID (free, instant) and adopt your Operating Agreement (legally required in NY).</div>

        <!-- EIN SECTION -->
        <h3 style="font-size:15px;font-weight:800;margin-bottom:12px;color:var(--navy)">Employer Identification Number (EIN)</h3>

        <div class="info-box green">
          <strong>&#x2705; Your EIN is 100% FREE from the IRS.</strong> Anyone charging you for an EIN is unnecessary — you can apply directly at irs.gov in under 10 minutes and get your EIN immediately online.
        </div>

        <div style="margin:16px 0;padding:16px;background:#f0fdf4;border-radius:8px;border:1.5px solid #86efac">
          <div style="font-weight:800;font-size:14px;color:#14532d;margin-bottom:8px">How to Get Your EIN (IRS Form SS-4)</div>
          <ol style="padding-left:18px;font-size:13px;line-height:2.2">
            <li>Go to <a href="https://www.irs.gov/businesses/small-businesses-self-employed/get-an-employer-identification-number" target="_blank" rel="noopener" style="color:#14532d;font-weight:700">irs.gov/ein</a></li>
            <li>Select &ldquo;Limited Liability Company&rdquo; as entity type</li>
            <li>Select the number of members (1 for single, 2+ for multi)</li>
            <li>Complete the online application (10 minutes)</li>
            <li>Receive your EIN <strong>immediately</strong> — print and save the confirmation</li>
          </ol>
          <a href="https://www.irs.gov/businesses/small-businesses-self-employed/get-an-employer-identification-number" target="_blank" rel="noopener" class="btn btn-primary btn-sm" style="display:inline-block;margin-top:8px;text-decoration:none">&#x1F30E; Apply for Free EIN at IRS.gov &rarr;</a>
        </div>

        <div style="margin-top:8px;height:1px;background:var(--border)"></div>

        <!-- OPERATING AGREEMENT -->
        <h3 style="font-size:15px;font-weight:800;margin:20px 0 12px;color:var(--navy)">Operating Agreement</h3>

        <div class="info-box amber">
          <strong>&#x26A0;&#xFE0F; Required by NY Law.</strong> Section 417 of the NY LLC Law requires all LLCs to adopt a written Operating Agreement. It does not need to be filed with the state, but it must exist. You have up to 90 days after filing to adopt it.
        </div>

        <div class="field-group">
          <label>Member Name(s) <span class="req">*</span></label>
          <input type="text" id="f-members" placeholder="Jane Smith (100%) — or — Jane Smith (60%), Maria Jones (40%)" oninput="saveDraft()">
          <div class="field-hint">List all members and their ownership percentage. Must total 100%.</div>
        </div>

        <div class="field-group">
          <label>Management Structure</label>
          <div class="radio-group">
            <label class="radio-opt selected" id="ro-mgmt-member" onclick="selectMgmt('member-managed')">
              <div class="radio-dot"></div>
              <div class="radio-text">Member-Managed (I run it myself)</div>
            </label>
            <label class="radio-opt" id="ro-mgmt-manager" onclick="selectMgmt('manager-managed')">
              <div class="radio-dot"></div>
              <div class="radio-text">Manager-Managed (I hire a manager)</div>
            </label>
          </div>
          <input type="hidden" id="f-mgmt" value="member-managed">
        </div>

        <div class="field-group">
          <label>Fiscal Year End</label>
          <select id="f-fiscal" onchange="saveDraft()">
            <option value="December 31">December 31 (most common)</option>
            <option value="March 31">March 31</option>
            <option value="June 30">June 30</option>
            <option value="September 30">September 30</option>
          </select>
        </div>

        <button class="btn btn-gold" onclick="genOpAgreement()" style="margin-bottom:16px">&#x1F4C4; Generate Operating Agreement</button>

        <div id="opagree-preview" class="doc-output" style="display:none;max-height:500px"></div>
        <div class="doc-actions" id="opagree-actions" style="display:none">
          <button class="btn btn-gold btn-sm" onclick="window.print()">&#x1F5A8; Print</button>
          <button class="btn btn-secondary btn-sm" onclick="copyDoc('opagree-preview')">&#x1F4CB; Copy Text</button>
        </div>

        <div class="info-box red" style="margin-top:16px">
          <strong>&#x2696;&#xFE0F; Attorney Review Strongly Recommended.</strong> This template is a starting point. Before signing, have a licensed NY attorney review your Operating Agreement — especially for multi-member LLCs where profit sharing, dispute resolution, and buyout terms are critical.
        </div>

        <div class="disclaimer">${DISCLAIMER}</div>
        <div class="btn-row">
          <button class="btn btn-secondary" onclick="prevStep(4)">&larr; Back</button>
          <button class="btn btn-primary" onclick="nextStep(4)">Next: WBE/MWBE Certification &rarr;</button>
        </div>
      </div>
    </div>

    <!-- ===== STEP 5: WBE/MWBE ===== -->
    <div id="step-5" style="display:none">
      <div class="card">
        <div class="card-title">&#x1F3C6; <span data-t="s5title">Step 5: WBE/MWBE Certification</span></div>
        <div class="card-subtitle" data-t="s5sub">Women Business Enterprise (WBE) and Minority/Women Business Enterprise (MWBE) certifications are FREE and unlock access to billions in NY State contract opportunities.</div>

        <div class="info-box gold">
          <strong>What does certification get you?</strong><br>
          &#x2022; Listed in the official NY State MWBE Directory (seen by all state agencies)<br>
          &#x2022; Access to NY State contract set-asides (30% MWBE goals on state contracts)<br>
          &#x2022; NYC SBS certification (separate addendum — NYC contracts)<br>
          &#x2022; Port Authority of NY &amp; NJ certification (separate addendum)<br>
          &#x2022; Potential access to MWBE-specific loans and grant programs<br>
          &#x2022; Erie County / City of Buffalo joint certification (addendum available)
        </div>

        <div class="info-box blue">
          <strong>Basic Eligibility (WBE):</strong><br>
          &#x2022; Business is at least <strong>51% owned, operated, and controlled</strong> by a woman (or women)<br>
          &#x2022; Owner(s) must be US citizens or permanent residents<br>
          &#x2022; Business must be <strong>actively conducting business in NY State</strong><br>
          &#x2022; Personal Net Worth of applicant must be <strong>under $3.03 million</strong> (2026 threshold — excludes primary home equity and business interest)<br>
          &#x2022; Business must be <strong>independent</strong> — not controlled by outside parties
        </div>

        <div class="info-box amber">
          <strong>&#x1F4AC; Before You Apply:</strong> Use the <a href="https://esd.ny.gov/doing-business-ny/mwbe/mwbe-certification-assessment" target="_blank" rel="noopener" style="color:#78350f;font-weight:700">ESD MWBE Assessment Tool</a> to confirm your eligibility before gathering documents.
        </div>

        <h3 style="font-size:14px;font-weight:800;margin:24px 0 12px;color:var(--navy)">Full Document Checklist</h3>
        <p style="font-size:12px;color:var(--text-muted);margin-bottom:14px">Check off each item as you gather it. Your progress is saved automatically.</p>

        <div class="check-group-title">Application Forms (Signed &amp; Notarized)</div>
        <ul class="checklist" id="wbe-checklist">
          <li><div class="check-box" onclick="toggleCheck(this,0)" id="chk-0"></div><div class="check-label"><strong>Certification Affidavit</strong><span>Part of ESD application — must be signed and notarized</span></div></li>
          <li><div class="check-box" onclick="toggleCheck(this,1)" id="chk-1"></div><div class="check-label"><strong>Personal Net Worth Affidavit (Attachment A)</strong><span>Part of ESD application — signed and notarized. PNW must be under $3.03M</span></div></li>
          <li><div class="check-box" onclick="toggleCheck(this,2)" id="chk-2"></div><div class="check-label"><strong>Personal Net Worth Worksheet (Attachment B)</strong><span>If applicable</span></div></li>
        </ul>

        <div class="check-group-title">Identity &amp; Status Documents</div>
        <ul class="checklist">
          <li><div class="check-box" onclick="toggleCheck(this,3)" id="chk-3"></div><div class="check-label"><strong>Proof of US Citizenship or Permanent Resident Status</strong><span>Passport, naturalization certificate, or green card</span></div></li>
          <li><div class="check-box" onclick="toggleCheck(this,4)" id="chk-4"></div><div class="check-label"><strong>Proof of Gender</strong><span>Government-issued ID showing gender, if applicable</span></div></li>
          <li><div class="check-box" onclick="toggleCheck(this,5)" id="chk-5"></div><div class="check-label"><strong>Proof of Minority Group Member Status</strong><span>If applying for MBE in addition to WBE</span></div></li>
        </ul>

        <div class="check-group-title">Business Formation Documents</div>
        <ul class="checklist">
          <li><div class="check-box" onclick="toggleCheck(this,6)" id="chk-6"></div><div class="check-label"><strong>Articles of Organization AND Filing Receipt</strong><span>The original DOS-stamped filing receipt from Step 2</span></div></li>
          <li><div class="check-box" onclick="toggleCheck(this,7)" id="chk-7"></div><div class="check-label"><strong>Operating Agreement</strong><span>Fully executed — generated in Step 4</span></div></li>
          <li><div class="check-box" onclick="toggleCheck(this,8)" id="chk-8"></div><div class="check-label"><strong>Membership Ledger</strong><span>Shows all members and ownership percentages</span></div></li>
          <li><div class="check-box" onclick="toggleCheck(this,9)" id="chk-9"></div><div class="check-label"><strong>Certificate of Assumed Name</strong><span>And filing receipt — only if your LLC does business under a DBA name</span></div></li>
        </ul>

        <div class="check-group-title">Financial Documents</div>
        <ul class="checklist">
          <li><div class="check-box" onclick="toggleCheck(this,10)" id="chk-10"></div><div class="check-label"><strong>Federal &amp; State Individual Income Tax Returns</strong><span>Most recent 2 years (personal returns for all owners)</span></div></li>
          <li><div class="check-box" onclick="toggleCheck(this,11)" id="chk-11"></div><div class="check-label"><strong>Business Tax Returns</strong><span>Federal &amp; State — for the business entity if filed separately</span></div></li>
          <li><div class="check-box" onclick="toggleCheck(this,12)" id="chk-12"></div><div class="check-label"><strong>Form W-2s including W-3</strong><span>Issued by the business — if applicable</span></div></li>
          <li><div class="check-box" onclick="toggleCheck(this,13)" id="chk-13"></div><div class="check-label"><strong>Bank Signature Cards or Bank Letter</strong><span>Showing who is authorized on the business account</span></div></li>
          <li><div class="check-box" onclick="toggleCheck(this,14)" id="chk-14"></div><div class="check-label"><strong>Proof of Business Capitalization</strong><span>Money, property, equipment, or expertise used to start the business</span></div></li>
        </ul>

        <div class="check-group-title">Operations &amp; Presence</div>
        <ul class="checklist">
          <li><div class="check-box" onclick="toggleCheck(this,15)" id="chk-15"></div><div class="check-label"><strong>Proof of Significant Business Presence in New York State</strong><span>Current lease(s), deed(s), or utility bills</span></div></li>
          <li><div class="check-box" onclick="toggleCheck(this,16)" id="chk-16"></div><div class="check-label"><strong>Contracts &amp; Proof of Payment</strong><span>Evidence of active business — client contracts, invoices paid</span></div></li>
          <li><div class="check-box" onclick="toggleCheck(this,17)" id="chk-17"></div><div class="check-label"><strong>All Licenses, Permits, and Certifications</strong><span>Any professional licenses, business permits, industry certifications you hold</span></div></li>
        </ul>

        <div class="check-group-title">People &amp; Background</div>
        <ul class="checklist">
          <li><div class="check-box" onclick="toggleCheck(this,18)" id="chk-18"></div><div class="check-label"><strong>Resumes of All Owners, Directors, Officers, &amp; Key Employees</strong><span>Demonstrates your control and expertise in the business</span></div></li>
        </ul>

        <div class="check-group-title">Optional Add-ons</div>
        <ul class="checklist">
          <li><div class="check-box" onclick="toggleCheck(this,19)" id="chk-19"></div><div class="check-label"><strong>NYC SBS Addendum</strong><span>For NYC Department of Small Business Services certification (NYC contracts)</span></div></li>
          <li><div class="check-box" onclick="toggleCheck(this,20)" id="chk-20"></div><div class="check-label"><strong>Port Authority of NY &amp; NJ Addendum</strong><span>For Port Authority contracts</span></div></li>
          <li><div class="check-box" onclick="toggleCheck(this,21)" id="chk-21"></div><div class="check-label"><strong>Erie County / City of Buffalo Addendum</strong><span>For Western NY government contracts</span></div></li>
        </ul>

        <div id="checklist-progress" style="margin-top:16px;padding:14px 16px;background:var(--off-white);border-radius:8px;font-size:13px">
          <strong>Progress: <span id="chk-count">0</span> / 22 items</strong>
          <div style="height:6px;background:var(--border);border-radius:3px;margin-top:8px;overflow:hidden">
            <div id="chk-bar" style="height:100%;width:0%;background:var(--green);border-radius:3px;transition:width 0.3s"></div>
          </div>
        </div>

        <div style="margin-top:24px;padding:20px;background:var(--navy);border-radius:10px;color:white;text-align:center">
          <div style="font-size:22px;margin-bottom:8px">&#x1F680;</div>
          <div style="font-weight:800;font-size:16px;margin-bottom:6px">Ready to Apply?</div>
          <div style="font-size:13px;opacity:0.85;margin-bottom:14px">Once you have your documents together, apply directly through the NY Empire State Development portal. It&rsquo;s free.</div>
          <a href="https://esd.ny.gov/mwbe-new-certification" target="_blank" rel="noopener" class="btn btn-gold" style="text-decoration:none;display:inline-block">Apply for MWBE Certification at ESD.NY.GOV &rarr;</a>
        </div>

        <div class="disclaimer" style="margin-top:24px">${DISCLAIMER}</div>
        <div class="btn-row" style="margin-top:16px">
          <button class="btn btn-secondary" onclick="prevStep(5)">&larr; Back</button>
          <button class="btn btn-gold" onclick="showComplete()">&#x1F3C1; Finish &amp; Print Summary</button>
        </div>
      </div>
    </div>

    <!-- COMPLETION CARD -->
    <div id="step-complete" style="display:none">
      <div class="card" style="text-align:center;padding:48px 40px">
        <div style="font-size:64px;margin-bottom:16px">&#x1F389;</div>
        <h2 style="font-size:1.8rem;font-weight:800;color:var(--navy);margin-bottom:10px" data-t="congrats">You&rsquo;re Ready to Launch!</h2>
        <p style="color:var(--text-muted);margin-bottom:28px;max-width:500px;margin-left:auto;margin-right:auto" data-t="congratssub">You&rsquo;ve completed the NY BizHer LLC Wizard. Here&rsquo;s your complete action checklist:</p>
        <div style="text-align:left;max-width:600px;margin:0 auto">
          <div style="background:var(--off-white);border-radius:10px;padding:20px;margin-bottom:16px">
            <div class="check-group-title">Immediate Actions</div>
            <ul style="list-style:none;font-size:13px;line-height:2.2">
              <li>&#x2610; Check your LLC name at NY DOS</li>
              <li>&#x2610; File Articles of Organization — pay $200</li>
              <li>&#x2610; Save your Filing Receipt</li>
              <li>&#x2610; Contact county clerk for publication newspapers</li>
              <li>&#x2610; Get your free EIN at irs.gov</li>
              <li>&#x2610; Sign your Operating Agreement (have attorney review)</li>
              <li>&#x2610; Open a business bank account</li>
            </ul>
          </div>
          <div style="background:var(--off-white);border-radius:10px;padding:20px;margin-bottom:16px">
            <div class="check-group-title">Within 120 Days of Filing</div>
            <ul style="list-style:none;font-size:13px;line-height:2.2">
              <li>&#x2610; Publish in 2 county-designated newspapers for 6 weeks</li>
              <li>&#x2610; Collect Affidavits of Publication from both newspapers</li>
              <li>&#x2610; File Certificate of Publication (Form 1708) + $50 with NY DOS</li>
            </ul>
          </div>
          <div style="background:var(--off-white);border-radius:10px;padding:20px">
            <div class="check-group-title">When Ready</div>
            <ul style="list-style:none;font-size:13px;line-height:2.2">
              <li>&#x2610; Gather MWBE certification documents</li>
              <li>&#x2610; Apply at esd.ny.gov/mwbe-new-certification</li>
            </ul>
          </div>
        </div>
        <div style="margin-top:24px;display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
          <button class="btn btn-gold" onclick="window.print()">&#x1F5A8; Print Complete Summary</button>
          <button class="btn btn-secondary" onclick="goStep(1)">&#x21BA; Start Over</button>
        </div>
        <div class="disclaimer" style="margin-top:24px;text-align:left">${DISCLAIMER}</div>
      </div>
    </div>

  </div><!-- end step-container -->
</div><!-- end main -->

<div class="footer">
  <strong>NY BizHer</strong> — A free public tool by <a href="https://osintnet.uk" target="_blank" rel="noopener">Indica Independent Media</a><br>
  Not a law firm. Not legal advice. Always consult a licensed NY attorney before filing.<br>
  Sources: <a href="https://dos.ny.gov/forming-limited-liability-company-new-york" target="_blank" rel="noopener">NY DOS LLC Guide</a> &bull; <a href="https://esd.ny.gov/nys-mwbe-certification-documentation-requirements-llc" target="_blank" rel="noopener">NYS ESD MWBE Requirements</a> &bull; <a href="https://www.irs.gov/businesses/small-businesses-self-employed/get-an-employer-identification-number" target="_blank" rel="noopener">IRS EIN</a><br>
  <span style="font-size:11px;opacity:0.6">Information current as of May 2026. Laws change — verify before filing.</span>
</div>

<script>
// ── TRANSLATIONS ──
const T = {
  en: {
    badge: 'Free Legal Tool \u2014 New York State',
    headline: 'NY BizHer LLC Wizard',
    subhead: 'The free, step-by-step guide to forming your New York LLC and getting WBE/MWBE certified \u2014 built for women entrepreneurs.',
    realcost: 'Real Costs Upfront:',
    cost1: 'Filing: $200', cost2: 'Publication: $600\u2013$2,000', cost3: 'Cert. of Publication: $50', cost4: 'EIN: FREE', cost5: 'WBE Cert: FREE',
    s1label: 'Foundation', s2label: 'Articles', s3label: 'Publication', s4label: 'EIN & Ops', s5label: 'WBE/MWBE',
    s1title: 'Step 1: Your Business Foundation',
    s1sub: "Let's start with the basics. Everything you enter here will be used to generate your legal documents.",
    s1info: '<strong>What is an LLC?</strong> A Limited Liability Company combines the liability protection of a corporation with the flexibility of a partnership. As a member (owner), your personal assets are generally protected from business debts.',
    llcname: 'LLC Name', namehint: 'Must include "LLC" or "Limited Liability Company". Must be unique in New York.',
    nameerr: 'Please enter your LLC name including LLC or Limited Liability Company.',
    county: 'County of Business', countyerr: 'Please select your county.',
    llctype: 'LLC Type', single: 'Single-Member (just me)', multi: 'Multi-Member (2+ owners)',
    purpose: 'Business Purpose', purposehint: 'Tip: A broad purpose gives you flexibility.',
    agent: 'Registered Agent', agself: 'Myself (use my address)', agdos: 'NY Dept. of State (recommended)',
    agenthint: 'Using the NY Dept. of State as agent keeps your home address private.',
    yourname: 'Your Full Legal Name', youraddr: 'Street Address (for Articles)',
    namelookup: 'Name Availability:', namelookuptext: ' Before filing, verify your name is available on the NY DOS database.',
    next: 'Next: Articles of Organization \u2192',
    s2title: 'Step 2: Articles of Organization', next2: 'Next: Publication Requirement \u2192',
    s3title: 'Step 3: Publication Requirement',
    s4title: 'Step 4: EIN & Operating Agreement',
    s5title: 'Step 5: WBE/MWBE Certification',
    s5sub: 'Women Business Enterprise (WBE) and Minority/Women Business Enterprise (MWBE) certifications are FREE and unlock access to billions in NY State contract opportunities.',
    back: 'Back', congrats: "You're Ready to Launch!", congratssub: "You've completed the NY BizHer LLC Wizard. Here's your complete action checklist:"
  },
  es: {
    badge: 'Herramienta Legal Gratuita \u2014 Estado de Nueva York',
    headline: 'NY BizHer: Asistente LLC',
    subhead: 'La gu\u00eda gratuita paso a paso para formar su LLC en Nueva York y obtener la certificaci\u00f3n WBE/MWBE \u2014 hecha para mujeres emprendedoras.',
    realcost: 'Costos Reales:',
    cost1: 'Registro: $200', cost2: 'Publicaci\u00f3n: $600\u2013$2,000', cost3: 'Cert. de Publicaci\u00f3n: $50', cost4: 'EIN: GRATIS', cost5: 'Cert. WBE: GRATIS',
    s1label: 'Fundaci\u00f3n', s2label: 'Art\u00edculos', s3label: 'Publicaci\u00f3n', s4label: 'EIN y Ops', s5label: 'WBE/MWBE',
    s1title: 'Paso 1: Fundamentos de su Negocio',
    s1sub: 'Empecemos con lo b\u00e1sico. Todo lo que ingrese aqu\u00ed se usar\u00e1 para generar sus documentos legales.',
    s1info: '<strong>\u00BFQu\u00e9 es una LLC?</strong> Una Compa\u00f1\u00eda de Responsabilidad Limitada combina la protecci\u00f3n de responsabilidad de una corporaci\u00f3n con la flexibilidad de una sociedad. Sus activos personales generalmente est\u00e1n protegidos de las deudas del negocio.',
    llcname: 'Nombre de la LLC', namehint: 'Debe incluir "LLC" o "Limited Liability Company". Debe ser \u00fanico en Nueva York.',
    nameerr: 'Por favor ingrese el nombre de su LLC incluyendo LLC o Limited Liability Company.',
    county: 'Condado del Negocio', countyerr: 'Por favor seleccione su condado.',
    llctype: 'Tipo de LLC', single: 'Un solo miembro (solo yo)', multi: 'Varios miembros (2+ due\u00f1os)',
    purpose: 'Prop\u00f3sito del Negocio', purposehint: 'Consejo: Un prop\u00f3sito amplio le da flexibilidad.',
    agent: 'Agente Registrado', agself: 'Yo mismo/a (usar mi direcci\u00f3n)', agdos: 'Dept. de Estado de NY (recomendado)',
    agenthint: 'Usar el Dept. de Estado de NY como agente mantiene su direcci\u00f3n privada.',
    yourname: 'Su Nombre Legal Completo', youraddr: 'Direcci\u00f3n (para los Art\u00edculos)',
    namelookup: 'Disponibilidad del Nombre:', namelookuptext: ' Antes de registrar, verifique que su nombre est\u00e9 disponible en la base de datos del NY DOS.',
    next: 'Siguiente: Art\u00edculos de Organizaci\u00f3n \u2192',
    s2title: 'Paso 2: Art\u00edculos de Organizaci\u00f3n', next2: 'Siguiente: Requisito de Publicaci\u00f3n \u2192',
    s3title: 'Paso 3: Requisito de Publicaci\u00f3n',
    s4title: 'Paso 4: EIN y Acuerdo Operativo',
    s5title: 'Paso 5: Certificaci\u00f3n WBE/MWBE',
    s5sub: 'Las certificaciones de Empresa de Mujeres (WBE) y MWBE son GRATUITAS y abren el acceso a miles de millones en contratos del Estado de Nueva York.',
    back: 'Atr\u00e1s', congrats: '\u00A1Est\u00e1 Lista para Lanzar!', congratssub: 'Ha completado el Asistente NY BizHer LLC. Aqu\u00ed est\u00e1 su lista de acciones:'
  }
};
let lang = 'en';

function setLang(l) {
  lang = l;
  document.getElementById('btn-en').className = 'lang-btn' + (l === 'en' ? ' active' : '');
  document.getElementById('btn-es').className = 'lang-btn' + (l === 'es' ? ' active' : '');
  document.querySelectorAll('[data-t]').forEach(el => {
    const key = el.getAttribute('data-t');
    if (T[l] && T[l][key]) el.innerHTML = T[l][key];
  });
}

// ── STEP STATE ──
let currentStep = 1;
const MAX_STEPS = 5;

function goStep(n) {
  if (n < 1 || n > MAX_STEPS) return;
  document.getElementById('step-' + currentStep).style.display = 'none';
  document.getElementById('step-complete').style.display = 'none';
  currentStep = n;
  document.getElementById('step-' + n).style.display = 'block';
  updateProgress();
  if (n === 2) genArticles();
  if (n === 3) genPubNotice();
  window.scrollTo(0, 0);
}

function nextStep(from) {
  if (from === 1 && !validateStep1()) return;
  goStep(from + 1);
  markDone(from);
}

function prevStep(from) { goStep(from - 1); }

function markDone(n) {
  const node = document.getElementById('sn-' + n);
  if (node) { node.className = 'step-node done'; node.querySelector('.step-circle').textContent = '\u2713'; }
  const line = document.getElementById('sl-' + n);
  if (line) line.className = 'step-line done';
}

function updateProgress() {
  for (let i = 1; i <= MAX_STEPS; i++) {
    const node = document.getElementById('sn-' + i);
    if (!node) continue;
    const isDone = node.className.includes('done');
    if (i === currentStep) node.className = 'step-node active';
    else if (!isDone) node.className = 'step-node';
  }
}

function validateStep1() {
  let ok = true;
  const name = document.getElementById('f-name').value.trim();
  const county = document.getElementById('f-county').value;
  const organizer = document.getElementById('f-organizer').value.trim();
  const address = document.getElementById('f-address').value.trim();

  const nameOk = name.length > 0 && (name.toUpperCase().includes('LLC') || name.toUpperCase().includes('LIMITED LIABILITY'));
  showErr('err-name', !nameOk);
  showErr('err-county', !county);
  if (!nameOk || !county || !organizer || !address) ok = false;
  return ok;
}

function showErr(id, show) {
  const el = document.getElementById(id);
  if (el) el.style.display = show ? 'block' : 'none';
}

function showComplete() {
  document.getElementById('step-5').style.display = 'none';
  document.getElementById('step-complete').style.display = 'block';
  markDone(5);
  window.scrollTo(0, 0);
}

// ── RADIO HELPERS ──
function selectType(v) {
  document.getElementById('f-type').value = v;
  document.getElementById('ro-single').className = 'radio-opt' + (v === 'single' ? ' selected' : '');
  document.getElementById('ro-multi').className = 'radio-opt' + (v === 'multi' ? ' selected' : '');
  saveDraft();
}

function selectAgent(v) {
  document.getElementById('f-agent').value = v;
  document.getElementById('ro-self').className = 'radio-opt' + (v === 'self' ? ' selected' : '');
  document.getElementById('ro-dos').className = 'radio-opt' + (v === 'dos' ? ' selected' : '');
}

function selectMgmt(v) {
  document.getElementById('f-mgmt').value = v;
  document.getElementById('ro-mgmt-member').className = 'radio-opt' + (v === 'member-managed' ? ' selected' : '');
  document.getElementById('ro-mgmt-manager').className = 'radio-opt' + (v === 'manager-managed' ? ' selected' : '');
}

// ── ACCORDION ──
function toggleAcc(header) {
  const body = header.nextElementSibling;
  const arrow = header.querySelector('.acc-arrow');
  const open = body.classList.toggle('open');
  arrow.style.transform = open ? 'rotate(180deg)' : 'rotate(0deg)';
}

// ── ARTICLES GENERATOR ──
function getFormData() {
  return {
    name: document.getElementById('f-name').value.trim() || '[LLC NAME]',
    county: document.getElementById('f-county').value || '[COUNTY]',
    type: document.getElementById('f-type').value,
    purpose: document.getElementById('f-purpose').value.trim() || 'To engage in any lawful act or activity for which limited liability companies may be organized.',
    agent: document.getElementById('f-agent').value,
    organizer: document.getElementById('f-organizer').value.trim() || '[ORGANIZER NAME]',
    address: document.getElementById('f-address').value.trim() || '[ADDRESS]',
    members: document.getElementById('f-members') ? document.getElementById('f-members').value.trim() : '',
    mgmt: document.getElementById('f-mgmt') ? document.getElementById('f-mgmt').value : 'member-managed',
    fiscal: document.getElementById('f-fiscal') ? document.getElementById('f-fiscal').value : 'December 31'
  };
}

function genArticles() {
  const d = getFormData();
  const agentText = d.agent === 'dos'
    ? 'The Secretary of State is designated as agent of the limited liability company upon whom process against it may be served.'
    : 'The registered agent is ' + d.organizer + ', located at ' + d.address + '.';
  const today = new Date().toLocaleDateString('en-US', {year:'numeric',month:'long',day:'numeric'});

  const text = 'ARTICLES OF ORGANIZATION\nDOMESTIC LIMITED LIABILITY COMPANY\nNEW YORK STATE DEPARTMENT OF STATE\nForm DOS-1336-f\n\n' +
    '=====================================\n\n' +
    'ARTICLE I — NAME\n\n' +
    'The name of the Limited Liability Company is:\n' + d.name + '\n\n' +
    '=====================================\n\n' +
    'ARTICLE II — COUNTY OF OFFICE\n\n' +
    'The county in New York State within which the office of the\nLimited Liability Company is to be located is:\n' + d.county + ' County\n\n' +
    '=====================================\n\n' +
    'ARTICLE III — REGISTERED AGENT\n\n' + agentText + '\n\n' +
    '=====================================\n\n' +
    'ARTICLE IV — PURPOSE\n\n' + d.purpose + '\n\n' +
    '=====================================\n\n' +
    'ARTICLE V — ORGANIZER\n\n' +
    'The name and address of the organizer is:\n' + d.organizer + '\n' + d.address + '\n\n' +
    '=====================================\n\n' +
    'IN WITNESS WHEREOF, I have signed this document on ' + today + '.\n\n' +
    'Signature of Organizer: ___________________________\n' +
    'Printed Name: ' + d.organizer + '\n\n' +
    '[ ] I certify that I have authority to sign these Articles\n    and that the information is accurate.\n\n' +
    '=====================================\n\n' +
    'FILING INSTRUCTIONS:\n' +
    '- Mail with $200 check payable to "Department of State"\n' +
    '- OR file online at: apps.dos.ny.gov\n' +
    '- Send to: NY Dept. of State, Division of Corporations,\n' +
    '  One Commerce Plaza, 99 Washington Ave, Albany, NY 12231\n' +
    '- RETAIN YOUR FILING RECEIPT — you will need it for MWBE\n' +
    '- Publication must be completed within 120 days of filing\n';

  document.getElementById('articles-preview').textContent = text;
}

function genPubNotice() {
  const d = getFormData();
  const today = new Date().toLocaleDateString('en-US', {year:'numeric',month:'long',day:'numeric'});
  const text = 'NOTICE OF FORMATION OF LIMITED LIABILITY COMPANY\n\n' +
    'Notice of Formation of ' + d.name + ', a Limited Liability Company.\n' +
    'Articles of Organization filed with the Secretary of State of New York\n' +
    'on [DATE OF FILING]. Office location: ' + d.county + ' County.\n' +
    'Secretary of State designated as agent of LLC upon whom\n' +
    'process against it may be served.\n' +
    'Secretary of State shall mail copy of any process against it\n' +
    'served upon him/her to: ' + d.organizer + ', ' + d.address + '.\n' +
    'Purpose: ' + d.purpose;
  const el = document.getElementById('pub-notice');
  if (el) el.textContent = text;
}

// ── OPERATING AGREEMENT GENERATOR ──
function genOpAgreement() {
  const d = getFormData();
  const today = new Date().toLocaleDateString('en-US', {year:'numeric',month:'long',day:'numeric'});
  const members = d.members || d.organizer + ' (100%)';
  const isSingle = d.type === 'single';

  const text = (isSingle ? 'SINGLE-MEMBER ' : 'MULTI-MEMBER ') + 'OPERATING AGREEMENT\nOF ' + d.name.toUpperCase() + '\n\nA New York Limited Liability Company\n\n' +
    '============================================================\n\n' +
    'This Operating Agreement (&quot;Agreement&quot;) is entered into as of ' + today + ',\n' +
    'by and among the member(s) listed below.\n\n' +
    'ARTICLE I — FORMATION\n\n' +
    '1.1 Formation. The Company was formed as a limited liability company\n' +
    '    pursuant to the New York Limited Liability Company Law upon the\n' +
    '    filing of Articles of Organization with the New York Department\n' +
    '    of State.\n\n' +
    '1.2 Name. The name of the Company is: ' + d.name + '\n\n' +
    '1.3 Principal Office. The principal office is located in ' + d.county + ' County, New York.\n\n' +
    '1.4 Purpose. ' + d.purpose + '\n\n' +
    'ARTICLE II — MEMBERS AND OWNERSHIP\n\n' +
    '2.1 Members. The member(s) and their ownership interests are:\n    ' + members + '\n\n' +
    '2.2 Additional Members. New members may only be admitted by\n' +
    '    unanimous written consent of all existing members.\n\n' +
    'ARTICLE III — MANAGEMENT\n\n' +
    '3.1 Management. The Company shall be ' + d.mgmt + '.\n' +
    (d.mgmt === 'member-managed'
      ? '    Each member shall have authority to act on behalf of the Company\n    in the ordinary course of business.\n'
      : '    The members shall designate one or more managers to manage\n    the affairs of the Company.\n') + '\n' +
    '3.2 Major Decisions. The following actions require unanimous consent\n' +
    '    of all members: (a) amendment of this Agreement; (b) merger or\n' +
    '    dissolution; (c) sale of substantially all assets; (d) admission\n' +
    '    of new members; (e) any action outside ordinary course of business.\n\n' +
    'ARTICLE IV — CAPITAL AND DISTRIBUTIONS\n\n' +
    '4.1 Capital Contributions. Members have made or shall make\n' +
    '    contributions as agreed in writing.\n\n' +
    '4.2 Distributions. Distributions shall be made at such times\n' +
    '    and in such amounts as the member(s) determine, in proportion\n' +
    '    to ownership interests.\n\n' +
    'ARTICLE V — TAXES\n\n' +
    '5.1 Tax Treatment. The Company shall be treated as a\n' +
    (isSingle ? '    disregarded entity' : '    partnership') +
    ' for federal and New York State income tax purposes,\n' +
    '    unless the member(s) elect otherwise.\n\n' +
    '5.2 Fiscal Year. The fiscal year of the Company shall end on\n' +
    '    ' + d.fiscal + ' of each year.\n\n' +
    'ARTICLE VI — TRANSFER OF INTERESTS\n\n' +
    '6.1 Restrictions. No member may transfer, sell, or assign their\n' +
    '    interest without prior written consent of all other members.\n\n' +
    'ARTICLE VII — DISSOLUTION\n\n' +
    '7.1 Dissolution. The Company shall be dissolved upon: (a) unanimous\n' +
    '    written consent of all members; (b) entry of a decree of judicial\n' +
    '    dissolution under the NY LLC Law.\n\n' +
    'ARTICLE VIII — MISCELLANEOUS\n\n' +
    '8.1 Governing Law. This Agreement is governed by the laws of the\n' +
    '    State of New York.\n\n' +
    '8.2 Entire Agreement. This Agreement constitutes the entire operating\n' +
    '    agreement of the Company and supersedes all prior agreements.\n\n' +
    '8.3 Amendment. This Agreement may be amended only by written\n' +
    '    consent of all members.\n\n' +
    '8.4 Severability. If any provision is invalid, the remainder\n' +
    '    continues in full force.\n\n' +
    '============================================================\n\n' +
    'IN WITNESS WHEREOF, the member(s) have executed this Agreement\nas of the date first written above.\n\n' +
    'Member Signature: ___________________________\n' +
    'Printed Name: ' + (d.organizer || '[NAME]') + '\n' +
    'Date: ___________________________\n\n' +
    '[ ] I acknowledge this is a template and I will have\n    a licensed NY attorney review before execution.\n\n' +
    '*** ATTORNEY REVIEW STRONGLY RECOMMENDED ***\n';

  const el = document.getElementById('opagree-preview');
  const actions = document.getElementById('opagree-actions');
  el.textContent = text;
  el.style.display = 'block';
  actions.style.display = 'flex';
}

// ── CHECKLIST ──
let checkState = JSON.parse(localStorage.getItem('bizher-checks') || '{}');
const TOTAL_CHECKS = 22;

function toggleCheck(el, idx) {
  checkState[idx] = !checkState[idx];
  el.className = 'check-box' + (checkState[idx] ? ' checked' : '');
  localStorage.setItem('bizher-checks', JSON.stringify(checkState));
  updateCheckProgress();
}

function updateCheckProgress() {
  const count = Object.values(checkState).filter(Boolean).length;
  document.getElementById('chk-count').textContent = count;
  document.getElementById('chk-bar').style.width = Math.round((count/TOTAL_CHECKS)*100) + '%';
}

function restoreChecks() {
  Object.keys(checkState).forEach(idx => {
    if (checkState[idx]) {
      const el = document.getElementById('chk-' + idx);
      if (el) el.className = 'check-box checked';
    }
  });
  updateCheckProgress();
}

// ── DRAFT SAVE/RESTORE ──
function saveDraft() {
  const data = {
    name: document.getElementById('f-name').value,
    county: document.getElementById('f-county').value,
    type: document.getElementById('f-type').value,
    purpose: document.getElementById('f-purpose').value,
    agent: document.getElementById('f-agent').value,
    organizer: document.getElementById('f-organizer').value,
    address: document.getElementById('f-address').value
  };
  localStorage.setItem('bizher-draft', JSON.stringify(data));
}

function restoreDraft() {
  try {
    const data = JSON.parse(localStorage.getItem('bizher-draft') || '{}');
    if (data.name) document.getElementById('f-name').value = data.name;
    if (data.county) document.getElementById('f-county').value = data.county;
    if (data.type) selectType(data.type);
    if (data.purpose) document.getElementById('f-purpose').value = data.purpose;
    if (data.agent) selectAgent(data.agent);
    if (data.organizer) document.getElementById('f-organizer').value = data.organizer;
    if (data.address) document.getElementById('f-address').value = data.address;
  } catch(e) {}
}

// ── PUBLICATION DEADLINE ──
function calcDeadline() {
  const val = document.getElementById('pub-date').value;
  if (!val) return;
  const d = new Date(val + 'T12:00:00');
  d.setDate(d.getDate() + 120);
  const opts = {year:'numeric',month:'long',day:'numeric'};
  const deadlineStr = d.toLocaleDateString('en-US', opts);
  const now = new Date();
  const daysLeft = Math.ceil((d - now) / (1000*60*60*24));
  const el = document.getElementById('pub-deadline');
  const color = daysLeft > 60 ? '#14532d' : daysLeft > 30 ? '#78350f' : '#7f1d1d';
  el.innerHTML = '<span style="color:' + color + '">Publication deadline: <strong>' + deadlineStr + '</strong> (' + daysLeft + ' days remaining)</span>';
}

// ── COPY TO CLIPBOARD ──
function copyDoc(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const text = el.textContent;
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => showToast('Copied to clipboard!'));
  } else {
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    showToast('Copied!');
  }
}

function showToast(msg) {
  const t = document.createElement('div');
  t.textContent = msg;
  t.style.cssText = 'position:fixed;bottom:24px;right:24px;background:#0d1b3e;color:white;padding:10px 20px;border-radius:8px;font-size:13px;font-weight:700;z-index:9999;box-shadow:0 4px 16px rgba(0,0,0,0.3)';
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2500);
}

// ── INIT ──
window.addEventListener('DOMContentLoaded', function() {
  restoreDraft();
  restoreChecks();
});
</script>
</body>
</html>`;

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const url = new URL(request.url);
  const path = url.pathname;

  // CORS headers
  const headers = {
    'Content-Type': 'text/html;charset=UTF-8',
    'Cache-Control': 'public, max-age=3600',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'SAMEORIGIN',
    'Referrer-Policy': 'strict-origin-when-cross-origin'
  };

  // All routes serve the same SPA
  return new Response(HTML, { status: 200, headers });
}
