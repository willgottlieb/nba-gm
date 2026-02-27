// ═══════════════════════════════════════════════════════════════════
// NBA GM - MAIN APPLICATION
// Bulls Cap Sheet Style for All 30 Teams
// ═══════════════════════════════════════════════════════════════════

let currentTeam = null;
let roster = [];

// ═══════════════════════════════════════════════════════════════════
// INITIALIZATION
// ═══════════════════════════════════════════════════════════════════

function init() {
  showTeamSelection();
}

// ═══════════════════════════════════════════════════════════════════
// TEAM SELECTION SCREEN
// ═══════════════════════════════════════════════════════════════════

function showTeamSelection() {
  currentTeam = null;
  const html = `
    <div class="team-select-screen">
      <div class="team-select-header">
        <h1>NBA GM</h1>
        <p>Select your team to manage rosters and salary cap</p>
      </div>
      <div class="team-grid">
        ${NBA_TEAMS.map(team => `
          <div class="team-card" onclick="selectTeam('${team.abbr}')">
            <img src="${team.logo}" alt="${team.name}" class="team-logo">
            <div class="team-name">${team.name}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
  document.getElementById('app').innerHTML = html;
}

// ═══════════════════════════════════════════════════════════════════
// TEAM SELECTION
// ═══════════════════════════════════════════════════════════════════

function selectTeam(teamAbbr) {
  currentTeam = NBA_TEAMS.find(t => t.abbr === teamAbbr);
  if (!currentTeam) return;
  
  // Load roster data
  roster = ALL_ROSTERS[teamAbbr] || [];
  
  // Set team colors
  document.documentElement.style.setProperty('--team-color', currentTeam.color);
  document.documentElement.style.setProperty('--team-dark', shadeColor(currentTeam.color, -20));
  
  // Show cap manager
  showCapManager();
}

// Helper: Darken color
function shadeColor(color, percent) {
  const num = parseInt(color.replace("#",""), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = (num >> 8 & 0x00FF) + amt;
  const B = (num & 0x0000FF) + amt;
  return "#" + (0x1000000 + (R<255?R<1?0:R:255)*0x10000 +
    (G<255?G<1?0:G:255)*0x100 + (B<255?B<1?0:B:255))
    .toString(16).slice(1);
}

// ═══════════════════════════════════════════════════════════════════
// CAP MANAGER SCREEN
// ═══════════════════════════════════════════════════════════════════

function showCapManager() {
  const html = `
    <div class="container">
      ${renderHeader()}
      ${renderControls()}
      ${renderActiveRoster()}
      ${renderCapSituation()}
      ${renderCapFigures()}
    </div>
  `;
  document.getElementById('app').innerHTML = html;
}

// ═══════════════════════════════════════════════════════════════════
// HEADER
// ═══════════════════════════════════════════════════════════════════

function renderHeader() {
  return `
    <div class="header">
      <div class="header-top">
        <img src="${currentTeam.logo}" alt="${currentTeam.name}" class="header-logo">
        <div>
          <h1>🏀 ${currentTeam.name} Cap Manager</h1>
          <div class="sub">Manage your team's roster and salary cap situation</div>
        </div>
        <button class="back-btn" onclick="showTeamSelection()">← Back to Teams</button>
      </div>
    </div>
  `;
}

// ═══════════════════════════════════════════════════════════════════
// CONTROLS
// ═══════════════════════════════════════════════════════════════════

function renderControls() {
  const capSpace2025 = CAP_DATA[2025].cap - getTotalSalary(2025);
  const taxSpace2025 = CAP_DATA[2025].tax - getTotalSalary(2025);
  
  return `
    <div class="controls">
      <!-- Left: Action Buttons -->
      <div class="controls-left">
        <button class="btn" title="Add or remove players">👥 MANAGE ROSTER</button>
        <button class="btn btn-red" title="Build trades">🔄 TRADE MACHINE</button>
        <button class="btn" title="Sign free agents">✍️ SIGN FAs</button>
        <button class="btn" title="View draft picks">📋 PICKS</button>
        <button class="btn" title="View exceptions">💰 EXCEPTIONS</button>
        <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:4px;">
          <button class="btn" title="Undo">◀</button>
          <button class="btn" title="Redo">▶</button>
          <button class="btn" onclick="resetRoster()" title="Reset">🗑️</button>
        </div>
      </div>
      
      <!-- Middle: Cap Situation -->
      <div class="cap-summary">
        <div class="cap-summary-title">2025-26 CAP SITUATION</div>
        <div class="cap-summary-grid">
          <div class="cap-summary-item">
            <div class="cap-summary-label">CAP SPACE</div>
            <div class="cap-summary-value ${capSpace2025 >= 0 ? 'cap-value-green' : 'cap-value-red'}">
              ${formatMoney(Math.abs(capSpace2025), true)}
            </div>
          </div>
          <div class="cap-summary-item">
            <div class="cap-summary-label">TAX SPACE</div>
            <div class="cap-summary-value ${taxSpace2025 >= 0 ? 'cap-value-green' : 'cap-value-red'}">
              ${formatMoney(Math.abs(taxSpace2025), true)}
            </div>
          </div>
        </div>
      </div>
      
      <!-- Right: Legend -->
      <div class="legend">
        <div class="legend-title">LEGEND</div>
        <div class="legend-items">
          <div class="legend-item"><span class="lg-badge lg-gtd">GTD</span> Guaranteed</div>
          <div class="legend-item"><span class="lg-badge lg-po">PO</span> Player Option</div>
          <div class="legend-item"><span class="lg-badge lg-to">TO</span> Team Option</div>
        </div>
      </div>
    </div>
  `;
}

// ═══════════════════════════════════════════════════════════════════
// ACTIVE ROSTER TABLE
// ═══════════════════════════════════════════════════════════════════

function renderActiveRoster() {
  const count2025 = roster.filter(p => p.sal2025 > 0).length;
  const count2026 = roster.filter(p => p.sal2026 > 0).length;
  const count2027 = roster.filter(p => p.sal2027 > 0).length;
  const count2028 = roster.filter(p => p.sal2028 > 0).length;
  
  return `
    <div class="section">
      <div class="section-hdr" style="display:grid; grid-template-columns: 3.23% 15% 2.5% 14.31% 13.31% 13.31% 13.31% 13.31% 11.72%; gap:0; padding:14px 20px; align-items:center;">
        <div></div>
        <div style="font-weight:700; font-size:14px">Active Roster</div>
        <div></div>
        <div style="text-align:center; font-weight:700; font-size:14px">2025-26</div>
        <div style="text-align:center; font-weight:700; font-size:14px">2026-27</div>
        <div style="text-align:center; font-weight:700; font-size:14px">2027-28</div>
        <div style="text-align:center; font-weight:700; font-size:14px">2028-29</div>
        <div style="text-align:center; font-weight:700; font-size:14px">2029-30</div>
        <div></div>
      </div>
      <div class="tbl-wrap">
        <div class="tbl-head">
          <div>#</div>
          <div>Player</div>
          <div>Age</div>
          <div style="text-align:center"><div style="font-size:9px; font-weight:600; color:var(--txt2); text-transform:none">${count2025} players</div></div>
          <div style="text-align:center"><div style="font-size:9px; font-weight:600; color:var(--txt2); text-transform:none">${count2026} players</div></div>
          <div style="text-align:center"><div style="font-size:9px; font-weight:600; color:var(--txt2); text-transform:none">${count2027} players</div></div>
          <div style="text-align:center"><div style="font-size:9px; font-weight:600; color:var(--txt2); text-transform:none">${count2028} players</div></div>
          <div style="text-align:center"><div style="font-size:9px; font-weight:600; color:var(--txt2); text-transform:none">-</div></div>
          <div>Actions</div>
        </div>
        ${roster.map((player, idx) => renderPlayerRow(player, idx + 1)).join('')}
      </div>
    </div>
  `;
}

function renderPlayerRow(player, num) {
  return `
    <div class="tbl-row">
      <div class="r-num">${num}</div>
      <div class="r-name">${player.name}</div>
      <div class="r-num">${player.age || '-'}</div>
      ${renderSalaryCell(player.sal2025, player, 2025)}
      ${renderSalaryCell(player.sal2026, player, 2026)}
      ${renderSalaryCell(player.sal2027, player, 2027)}
      ${renderSalaryCell(player.sal2028, player, 2028)}
      ${renderSalaryCell(0, player, 2029)}
      <div class="act">
        <button class="act-btn" onclick="editPlayer(${num-1})">📝 Edit</button>
      </div>
    </div>
  `;
}

function renderSalaryCell(salary, player, year) {
  if (!salary || salary === 0) return `<div class="sal-cell">-</div>`;
  
  const pct = (salary / CAP_DATA[year].cap * 100).toFixed(1);
  let badge = '';
  
  if (year === 2025 && player.guaranteed > 0) {
    badge = '<span class="s-badge s-gtd">GTD</span>';
  }
  if (player.optionType === 'Player Option') {
    badge = '<span class="s-badge s-po">PO</span>';
  }
  if (player.optionType === 'Team Option') {
    badge = '<span class="s-badge s-to">TO</span>';
  }
  
  return `
    <div class="sal-cell">
      <span class="s-amt">${formatMoney(salary)}</span>
      <span class="s-pct">${pct}% ${badge}</span>
    </div>
  `;
}

// ═══════════════════════════════════════════════════════════════════
// CAP SITUATION
// ═══════════════════════════════════════════════════════════════════

function renderCapSituation() {
  const years = [2025, 2026, 2027, 2028, 2029];
  const situations = [
    'Team Salary',
    'Cap Space',
    'Tax Space',
    'Apron 1 Space',
    'Apron 2 Space'
  ];
  
  return `
    <div class="section">
      <div class="section-hdr">📊 Cap Situation</div>
      <div style="padding:0">
        <div class="cap-figures-grid" style="border-bottom:1px solid var(--bg3); padding-top:12px; padding-bottom:8px; font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:.06em; color:var(--txt2)">
          <div></div>
          <div style="text-align:left">Status</div>
          <div></div>
          <div>2025-26</div>
          <div>2026-27</div>
          <div>2027-28</div>
          <div>2028-29</div>
          <div>2029-30</div>
          <div></div>
        </div>
        
        <!-- Team Salary -->
        <div class="cap-figures-grid" style="border-bottom:1px solid rgba(51,51,51,.3)">
          <div></div>
          <div style="text-align:left; font-weight:600; font-size:14px">Team Salary</div>
          <div></div>
          <div>${formatMoney(getTotalSalary(2025))}</div>
          <div>${formatMoney(getTotalSalary(2026))}</div>
          <div>${formatMoney(getTotalSalary(2027))}</div>
          <div>${formatMoney(getTotalSalary(2028))}</div>
          <div>-</div>
          <div></div>
        </div>
        
        <!-- Cap Space -->
        <div class="cap-figures-grid" style="border-bottom:1px solid rgba(51,51,51,.3)">
          <div></div>
          <div style="text-align:left; font-weight:600; font-size:14px">Cap Space</div>
          <div></div>
          <div class="${CAP_DATA[2025].cap - getTotalSalary(2025) >= 0 ? 'cap-value-green' : 'cap-value-red'}">
            ${formatMoney(CAP_DATA[2025].cap - getTotalSalary(2025))}
          </div>
          <div class="${CAP_DATA[2026].cap - getTotalSalary(2026) >= 0 ? 'cap-value-green' : 'cap-value-red'}">
            ${formatMoney(CAP_DATA[2026].cap - getTotalSalary(2026))}
          </div>
          <div class="${CAP_DATA[2027].cap - getTotalSalary(2027) >= 0 ? 'cap-value-green' : 'cap-value-red'}">
            ${formatMoney(CAP_DATA[2027].cap - getTotalSalary(2027))}
          </div>
          <div class="${CAP_DATA[2028].cap - getTotalSalary(2028) >= 0 ? 'cap-value-green' : 'cap-value-red'}">
            ${formatMoney(CAP_DATA[2028].cap - getTotalSalary(2028))}
          </div>
          <div>-</div>
          <div></div>
        </div>
        
        <!-- Tax Space -->
        <div class="cap-figures-grid" style="border-bottom:1px solid rgba(51,51,51,.3)">
          <div></div>
          <div style="text-align:left; font-weight:600; font-size:14px">Tax Space</div>
          <div></div>
          <div class="${CAP_DATA[2025].tax - getTotalSalary(2025) >= 0 ? 'cap-value-green' : 'cap-value-red'}">
            ${formatMoney(CAP_DATA[2025].tax - getTotalSalary(2025))}
          </div>
          <div class="${CAP_DATA[2026].tax - getTotalSalary(2026) >= 0 ? 'cap-value-green' : 'cap-value-red'}">
            ${formatMoney(CAP_DATA[2026].tax - getTotalSalary(2026))}
          </div>
          <div class="${CAP_DATA[2027].tax - getTotalSalary(2027) >= 0 ? 'cap-value-green' : 'cap-value-red'}">
            ${formatMoney(CAP_DATA[2027].tax - getTotalSalary(2027))}
          </div>
          <div class="${CAP_DATA[2028].tax - getTotalSalary(2028) >= 0 ? 'cap-value-green' : 'cap-value-red'}">
            ${formatMoney(CAP_DATA[2028].tax - getTotalSalary(2028))}
          </div>
          <div>-</div>
          <div></div>
        </div>
      </div>
    </div>
  `;
}

// ═══════════════════════════════════════════════════════════════════
// CAP FIGURES
// ═══════════════════════════════════════════════════════════════════

function renderCapFigures() {
  return `
    <div class="section">
      <div class="section-hdr">📋 Cap Figures</div>
      <div style="padding:0">
        <div class="cap-figures-grid" style="padding-top:12px; padding-bottom:8px; font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:.06em; color:var(--txt2)">
          <div></div>
          <div style="text-align:left">Threshold</div>
          <div></div>
          <div>2025-26</div>
          <div>2026-27</div>
          <div>2027-28</div>
          <div>2028-29</div>
          <div>2029-30</div>
          <div></div>
        </div>
        
        <div class="cap-figures-grid" style="border-bottom:1px solid var(--bg3)">
          <div></div>
          <div style="text-align:left; font-weight:600; font-size:14px">Salary Cap</div>
          <div></div>
          <div>$154.6M</div>
          <div>$165.5M</div>
          <div>$173.7M</div>
          <div>$182.4M</div>
          <div>$191.6M</div>
          <div></div>
        </div>
        
        <div class="cap-figures-grid" style="border-bottom:1px solid var(--bg3)">
          <div></div>
          <div style="text-align:left; font-weight:600; font-size:14px">Luxury Tax</div>
          <div></div>
          <div>$187.9M</div>
          <div>$201.0M</div>
          <div>$215.1M</div>
          <div>$230.2M</div>
          <div>$246.3M</div>
          <div></div>
        </div>
        
        <div class="cap-figures-grid" style="border-bottom:1px solid var(--bg3)">
          <div></div>
          <div style="text-align:left; font-weight:600; font-size:14px">First Apron</div>
          <div></div>
          <div>$195.9M</div>
          <div>$209.7M</div>
          <div>$224.3M</div>
          <div>$240.0M</div>
          <div>$256.8M</div>
          <div></div>
        </div>
        
        <div class="cap-figures-grid">
          <div></div>
          <div style="text-align:left; font-weight:600; font-size:14px">Second Apron</div>
          <div></div>
          <div>$207.8M</div>
          <div>$222.9M</div>
          <div>$238.9M</div>
          <div>$256.0M</div>
          <div>$274.1M</div>
          <div></div>
        </div>
      </div>
    </div>
  `;
}

// ═══════════════════════════════════════════════════════════════════
// UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════════════

function getTotalSalary(year) {
  return roster.reduce((total, player) => {
    if (year === 2025) return total + (player.sal2025 || 0);
    if (year === 2026) return total + (player.sal2026 || 0);
    if (year === 2027) return total + (player.sal2027 || 0);
    if (year === 2028) return total + (player.sal2028 || 0);
    return total;
  }, 0);
}

function formatMoney(amount, short = false) {
  if (!amount || amount === 0) return '-';
  const m = amount / 1000000;
  if (short) {
    return (amount >= 0 ? '+' : '') + '$' + m.toFixed(1) + 'M';
  }
  return '$' + m.toFixed(2) + 'M';
}

function editPlayer(index) {
  alert(`Edit functionality coming soon for ${roster[index].name}`);
}

function resetRoster() {
  if (confirm('Reset to original roster?')) {
    selectTeam(currentTeam.abbr);
  }
}

// ═══════════════════════════════════════════════════════════════════
// START APP
// ═══════════════════════════════════════════════════════════════════

init();
