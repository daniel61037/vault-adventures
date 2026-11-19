/**
 * ==========================================================================
 * VAULT 84 ROBCO TERMINAL MAIN APPLICATION CONTROLLER
 * Coordinates the 24-Day Advent Calendar (Locked to Dec 1-24, 2026),
 * Silent DEBUG Timestamp Override, Multi-Phase 2d20 Missions with Dynamic
 * Inter-Phase Consequences, Special Gifts (Day 6 & 24), Character Sheet,
 * Vault System Telemetry, Standalone Dice Roller, & RPG Export.
 * ==========================================================================
 */

const STORAGE_KEY = 'VAULT84_ADVENT_SAVE_V1';

const AppState = {
    character: JSON.parse(JSON.stringify(window.DEFAULT_CHARACTER)),
    completedDays: {},
    activeDay: 1,
    debugTimestamp: null, // Number (ms timestamp) or null for live system clock
    theme: 'green', // 'green' | 'amber' | 'blue'
    crtEnabled: true,
    diceHistory: [],
    selectedBonusD20: 2
};

/* ==========================================================================
   SILENT DEBUG TIMESTAMP & 2026 DATE-LOCK LOGIC
   ========================================================================== */

let _internalDebugTs = null;

/**
 * Parses a developer-supplied DEBUG value (Unix ms, Unix seconds, or ISO date string)
 * into a valid millisecond timestamp, or returns null.
 */
function parseDebugTimestamp(val) {
    if (val === null || val === undefined || val === '') return null;

    if (typeof val === 'number' && !Number.isNaN(val)) {
        // Treat 10-digit numbers (< 1e11) as Unix seconds, otherwise milliseconds
        return val < 1e11 ? val * 1000 : val;
    }

    const str = String(val).trim();
    if (!str) return null;

    if (/^-?\d+$/.test(str)) {
        const num = Number(str);
        return num < 1e11 ? num * 1000 : num;
    }

    const parsedMs = Date.parse(str);
    return Number.isNaN(parsedMs) ? null : parsedMs;
}

/**
 * Global `DEBUG` property on `window` (completely invisible in Frontend UI):
 * Example in Browser DevTools Console:
 *   DEBUG = 1796511600000      // 06.12.2026 (Nikolaustag)
 *   DEBUG = 1798066800000      // 24.12.2026 (Heiligabend)
 *   DEBUG = "2026-12-06"       // ISO string also supported
 *   DEBUG = null               // Reset to real system time
 */
Object.defineProperty(window, 'DEBUG', {
    get() {
        return _internalDebugTs;
    },
    set(val) {
        _internalDebugTs = parseDebugTimestamp(val);
        AppState.debugTimestamp = _internalDebugTs;
        saveState();
        updateClock();
        renderCalendarGrid();
        renderActiveMission();
    },
    configurable: true
});

window.setDebugTimestamp = function (tsValue) {
    window.DEBUG = tsValue;
    return _internalDebugTs;
};

/**
 * Returns the active timestamp in milliseconds (silent override or live Date.now()).
 */
function getEffectiveTimestamp() {
    if (_internalDebugTs !== null) {
        return _internalDebugTs;
    }
    if (AppState.debugTimestamp !== null) {
        return AppState.debugTimestamp;
    }
    return Date.now();
}

/**
 * Returns the local threshold timestamp (00:00:00) for a given day in December 2026.
 * Month 11 = December in JS Date.
 */
function getDayUnlockTimestamp2026(dayNum) {
    return new Date(2026, 11, dayNum, 0, 0, 0, 0).getTime();
}

/**
 * Checks whether a door (1..24) is unlocked at the current timestamp.
 */
function isDayUnlocked(dayNum) {
    const nowTs = getEffectiveTimestamp();
    const unlockTs = getDayUnlockTimestamp2026(dayNum);
    return nowTs >= unlockTs;
}

/* ==========================================================================
   DAY COMPLETION & MULTI-PHASE HELPERS (WITH LEGACY SAVE COMPATIBILITY)
   ========================================================================== */

function isLegacyDayEntry(entry) {
    return Boolean(entry && !entry.phases && entry.choiceId);
}

function isDayCompleted(entry) {
    if (!entry) return false;
    if (isLegacyDayEntry(entry)) return true;
    return Boolean(entry.completed);
}

function isDayStarted(entry) {
    if (!entry) return false;
    if (isLegacyDayEntry(entry)) return true;
    return Boolean(entry.phases && Object.keys(entry.phases).length > 0);
}

function getCompletedDaysCount() {
    return Object.values(AppState.completedDays).filter(isDayCompleted).length;
}

function getSkillSafely(c, skillId, fallbackAttr = 'INT') {
    if (c && c.skills && c.skills[skillId]) {
        return c.skills[skillId];
    }
    if (window.DEFAULT_CHARACTER && window.DEFAULT_CHARACTER.skills[skillId]) {
        return window.DEFAULT_CHARACTER.skills[skillId];
    }
    return { id: skillId, name: skillId, defaultAttr: fallbackAttr, rank: 0, tag: false };
}

function getPhaseIncomingModifier(dayObj, dayEntry, phaseIdx) {
    const empty = {
        tag: null,
        text: '',
        diffMod: 0,
        bonusDice: 0,
        apMod: 0,
        hpMod: 0,
        radMod: 0,
        prevPassed: null
    };
    if (phaseIdx <= 0 || !dayEntry || !dayEntry.phases) return empty;
    const prevResult = dayEntry.phases[phaseIdx - 1];
    const prevPhase = dayObj.phases && dayObj.phases[phaseIdx - 1];
    if (!prevResult || !prevPhase || !prevPhase.consequence) return empty;

    const cons = prevResult.passed ? prevPhase.consequence.onSuccess : prevPhase.consequence.onFail;
    if (!cons) return empty;

    return {
        tag: cons.tag || (prevResult.passed ? 'VORTEIL' : 'STÖRUNG'),
        text: cons.text || '',
        diffMod: cons.diffMod || 0,
        bonusDice: cons.bonusDice || 0,
        apMod: cons.apMod || 0,
        hpMod: cons.hpMod || 0,
        radMod: cons.radMod || 0,
        prevPassed: prevResult.passed
    };
}

/* ==========================================================================
   CHARACTER IDENTITY (CUSTOM NAME & GENDER) & STORY PERSONALIZATION
   ========================================================================== */

function escapeHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function getGenderProfile(genderCode) {
    const profiles = window.CHARACTER_GENDER_PROFILES || {};
    return profiles[genderCode] || profiles.f || {
        id: 'f',
        label: 'Weiblich (Sie/Ihr)',
        shortLabel: 'WEIBLICH',
        origin: 'Vault-Bewohnerin (Vault 84 - Sub-Alpiner Sektor)',
        role: 'Senior-Wartungstechnikerin (Schicht Gamma-3)',
        dossierRoleLabel: 'SPIELERIN-CHARAKTER (TECH-SPEZIALISTIN DER GRUPPE)',
        calendarWakePhrase: 'einzige wache Technikerin',
        salutationFormal: 'Miss',
        firstAwakened: 'als Erste',
        possessiveAcc: 'ihren',
        saviorTitle: 'Retterin von Vault 84',
        perkOriginName: 'Vault-Bewohnerin (Herkunft)',
        perkHackerName: 'Hackerin & Schaltkreis-Flüsterin (Perk Rang 1)'
    };
}

function getCharacterIdentity(escapeForHtml = false) {
    const c = AppState.character;
    const rawName = (c && c.name ? String(c.name) : '').trim() || window.DEFAULT_CHARACTER.name;
    const profile = getGenderProfile(c && c.gender ? c.gender : 'f');

    let callsign = '';
    const quoteMatch = rawName.match(/["„'‚‘]([^"“'‚‘]+)["“'’]/);
    if (quoteMatch && quoteMatch[1]) {
        callsign = quoteMatch[1].trim();
    }

    const withoutQuote = rawName.replace(/["„'‚‘][^"“'‚‘]+["“'’]/g, ' ').replace(/\s+/g, ' ').trim();
    const parts = withoutQuote ? withoutQuote.split(' ') : [rawName];
    const firstName = parts[0] || rawName;
    const lastName = parts.length > 1 ? parts[parts.length - 1] : firstName;
    if (!callsign) {
        callsign = firstName;
    }

    const endsWithS = /[sxzß]$/i.test(callsign);
    const callsignGenitive = endsWithS ? `${callsign}’` : `${callsign}s`;

    const fmt = val => (escapeForHtml ? escapeHtml(val) : val);
    return {
        fullName: fmt(rawName),
        firstName: fmt(firstName),
        lastName: fmt(lastName),
        callsign: fmt(callsign),
        callsignGenitive: fmt(callsignGenitive),
        profile
    };
}

function personalizeText(text, escapeForHtml = false) {
    if (text === null || text === undefined) return '';
    const str = String(text);
    if (!str.includes('{{CHAR_')) return str;

    const id = getCharacterIdentity(escapeForHtml);
    const p = id.profile;
    return str
        .replace(/\{\{CHAR_FULL_NAME\}\}/g, id.fullName)
        .replace(/\{\{CHAR_FIRST\}\}/g, id.firstName)
        .replace(/\{\{CHAR_LAST\}\}/g, id.lastName)
        .replace(/\{\{CHAR_CALLSIGN\}\}/g, id.callsign)
        .replace(/\{\{CHAR_CALLSIGN_GENITIVE\}\}/g, id.callsignGenitive)
        .replace(/\{\{CHAR_SALUTATION\}\}/g, p.salutationFormal)
        .replace(/\{\{CHAR_FIRST_AWAKENED\}\}/g, p.firstAwakened)
        .replace(/\{\{CHAR_POSS_AKK\}\}/g, p.possessiveAcc)
        .replace(/\{\{CHAR_SAVIOR_TITLE\}\}/g, p.saviorTitle);
}

function syncCharacterGenderFields() {
    const c = AppState.character;
    if (!c.name || !String(c.name).trim()) {
        c.name = window.DEFAULT_CHARACTER.name;
    }
    if (!c.gender || !window.CHARACTER_GENDER_PROFILES?.[c.gender]) {
        c.gender = window.DEFAULT_CHARACTER.gender || 'f';
    }
    const profile = getGenderProfile(c.gender);
    c.origin = profile.origin;
    c.role = profile.role;
    if (Array.isArray(c.perks)) {
        if (c.perks[0]) c.perks[0].name = profile.perkOriginName;
        if (c.perks[1]) c.perks[1].name = profile.perkHackerName;
    }
}

function renderCharacterIdentityControls() {
    const c = AppState.character;
    const gender = c.gender || 'f';
    const profile = getGenderProfile(gender);

    const quickName = document.getElementById('quick-char-name');
    if (quickName && document.activeElement !== quickName) {
        quickName.value = c.name;
    }
    const charNameInput = document.getElementById('char-name-input');
    if (charNameInput && document.activeElement !== charNameInput) {
        charNameInput.value = c.name;
    }

    document.querySelectorAll('.gender-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-gender') === gender);
    });

    const wakeRoleEl = document.getElementById('calendar-wake-role');
    if (wakeRoleEl) {
        wakeRoleEl.textContent = profile.calendarWakePhrase;
    }
}

function applyCharacterIdentityChange({ name, gender, resetToDefault = false }) {
    const c = AppState.character;
    if (resetToDefault) {
        c.name = window.DEFAULT_CHARACTER.name;
        c.gender = window.DEFAULT_CHARACTER.gender || 'f';
    } else {
        if (typeof name === 'string') {
            const trimmed = name.trim();
            c.name = trimmed || window.DEFAULT_CHARACTER.name;
        }
        if (gender && window.CHARACTER_GENDER_PROFILES?.[gender]) {
            c.gender = gender;
        }
    }

    syncCharacterGenderFields();
    saveState();
    updateTelemetryBar();
    renderCharacterIdentityControls();
    renderCharacterSheet();
    renderActiveMission();
    generateCampaignReport();

    const profile = getGenderProfile(c.gender);
    setFooterStatus(`CHARAKTER AKTUALISIERT: ${c.name} (${profile.shortLabel}).`);
}

/* ==========================================================================
   INITIALIZATION & PERSISTENCE
   ========================================================================== */

function loadState() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
            const parsed = JSON.parse(raw);
            if (parsed.character) {
                AppState.character = parsed.character;
                // Ensure any new default skills are merged without overwriting progress
                if (window.DEFAULT_CHARACTER && window.DEFAULT_CHARACTER.skills) {
                    AppState.character.skills = Object.assign(
                        {},
                        JSON.parse(JSON.stringify(window.DEFAULT_CHARACTER.skills)),
                        AppState.character.skills || {}
                    );
                }
            }
            if (parsed.completedDays) AppState.completedDays = parsed.completedDays;
            if (parsed.activeDay) AppState.activeDay = parsed.activeDay;
            if (parsed.debugTimestamp !== undefined) {
                _internalDebugTs = parseDebugTimestamp(parsed.debugTimestamp);
                AppState.debugTimestamp = _internalDebugTs;
            }
            if (parsed.theme) AppState.theme = parsed.theme;
            if (typeof parsed.crtEnabled === 'boolean') AppState.crtEnabled = parsed.crtEnabled;
            if (Array.isArray(parsed.diceHistory)) AppState.diceHistory = parsed.diceHistory;
        }

        // Optional silent URL parameter ?debug=<timestamp>
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has('debug')) {
            const urlTs = parseDebugTimestamp(urlParams.get('debug'));
            _internalDebugTs = urlTs;
            AppState.debugTimestamp = urlTs;
            saveState();
        }
        syncCharacterGenderFields();
    } catch (err) {
        console.warn('Could not load saved state:', err);
    }
}

function saveState() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
            character: AppState.character,
            completedDays: AppState.completedDays,
            activeDay: AppState.activeDay,
            debugTimestamp: AppState.debugTimestamp,
            theme: AppState.theme,
            crtEnabled: AppState.crtEnabled,
            diceHistory: AppState.diceHistory.slice(0, 25)
        }));
    } catch (err) {
        console.warn('Could not save state:', err);
    }
}

/* ==========================================================================
   CALCULATIONS & TELEMETRY
   ========================================================================== */

function calculateVaultIntegrity() {
    const completedCount = getCompletedDaysCount();
    return Math.min(82, Math.round(12 + (completedCount / 24) * 66));
}

function calculateSystemPercentage(sys) {
    const linked = sys.daysLinked || [];
    if (linked.length === 0) return sys.baseStatus;
    let solved = 0;
    linked.forEach(d => {
        if (isDayCompleted(AppState.completedDays[d])) solved++;
    });
    const ratio = solved / linked.length;
    return Math.round(sys.baseStatus + ratio * (sys.targetStatus - sys.baseStatus));
}

function setFooterStatus(msg) {
    const el = document.getElementById('footer-status-msg');
    if (el) el.textContent = msg;
}

/* ==========================================================================
   UI RENDERING: HEADER & TELEMETRY
   ========================================================================== */

function updateTelemetryBar() {
    const c = AppState.character;
    document.getElementById('tele-name').textContent = c.name;
    document.getElementById('tele-hp').textContent = `${c.hp}/${c.maxHp}`;
    document.getElementById('tele-rad').textContent = `${c.rad}`;
    document.getElementById('tele-ap').textContent = `${c.ap} / ${c.maxAp}`;
    document.getElementById('tele-luck').textContent = `${c.luckPoints} / ${c.maxLuckPoints}`;
    document.getElementById('tele-vault').textContent = `${calculateVaultIntegrity()}%`;
}

function updateClock() {
    const effectiveTs = getEffectiveTimestamp();
    const dt = new Date(effectiveTs);
    const pad = n => String(n).padStart(2, '0');
    const timeStr = `${pad(dt.getHours())}:${pad(dt.getMinutes())}:${pad(dt.getSeconds())}`;
    const dateDisplay = `${pad(dt.getDate())}.${pad(dt.getMonth() + 1)}.${dt.getFullYear()}`;

    const el = document.getElementById('header-clock');
    if (el) {
        el.textContent = `${dateDisplay} // ${timeStr}`;
    }

    const statusEl = document.getElementById('calendar-date-status');
    if (statusEl) {
        statusEl.textContent = `VAULT-CHRONOMETER: ${dateDisplay} // ${timeStr}`;
    }
}

/* ==========================================================================
   TAB 1: 24-DAY ADVENT CALENDAR GRID
   ========================================================================== */

function renderCalendarGrid() {
    const grid = document.getElementById('calendar-grid');
    if (!grid) return;
    grid.innerHTML = '';

    const completedCount = getCompletedDaysCount();
    const progText = document.getElementById('calendar-progress-text');
    if (progText) {
        progText.textContent = `FORTSCHRITT: ${completedCount} / 24 TAGES-PROTOKOLLE ABGESCHLOSSEN (VAULT-INTEGRITÄT: ${calculateVaultIntegrity()}%)`;
    }

    window.STORY_DAYS.forEach(dayObj => {
        const d = dayObj.day;
        const unlocked = isDayUnlocked(d);
        const completion = AppState.completedDays[d];
        const completed = isDayCompleted(completion);
        const inProgress = !completed && isDayStarted(completion);
        const unlockDateStr = `${String(d).padStart(2, '0')}.12.2026`;
        const hasGift = Boolean(dayObj.specialGift);
        const totalPhases = Array.isArray(dayObj.phases) ? dayObj.phases.length : 1;

        const card = document.createElement('div');
        card.className = 'door-card';
        if (completed) card.classList.add('completed');
        if (inProgress) card.classList.add('in-progress');
        if (!unlocked) card.classList.add('locked');
        if (hasGift) card.classList.add('special-gift-door');

        let badgeText = 'FREIGESCHALTET';
        if (!unlocked) {
            badgeText = `VERRIEGELT BIS ${unlockDateStr}`;
        } else if (completed) {
            badgeText = completion.passed ? '✓ STABILISIERT' : '⚡ NOT-REPARATUR';
        } else if (inProgress) {
            const doneCount = Object.keys(completion.phases || {}).length;
            badgeText = `▶ ETAPPE ${doneCount}/${totalPhases}`;
        }

        let giftTagHtml = '';
        if (d === 6) {
            giftTagHtml = `<div class="door-gift-indicator">★ NIKOLAUS-SONDERPAKET</div>`;
        } else if (d === 24) {
            giftTagHtml = `<div class="door-gift-indicator">★★ HEILIGABEND-GESCHENK &amp; FINALE</div>`;
        }

        const phaseMetaHtml = unlocked && totalPhases > 1
            ? `<div class="door-phases-meta">${totalPhases} Etappen // Dynamische 2d20-Prüfungen</div>`
            : '';

        card.innerHTML = `
            <div>
                <div class="door-header">
                    <span class="door-day">TÜRCHEN #${String(d).padStart(2, '0')}</span>
                    <span class="door-status-badge">${badgeText}</span>
                </div>
                <div class="door-title">${unlocked ? dayObj.title : '??? [VERSCHLÜSSELTES PROTOKOLL]'}</div>
                <div class="door-sector">${dayObj.sector}</div>
                ${phaseMetaHtml}
                ${giftTagHtml}
            </div>
            <div class="door-footer">
                <span>${unlockDateStr}</span>
                <span>${unlocked ? '[TERMINAL ÖFFNEN &gt;]' : '[ZEITSPERRE AKTIV]'}</span>
            </div>
        `;

        card.addEventListener('click', () => {
            window.RobCoAudio.click();
            if (!unlocked) {
                setFooterStatus(`ZUGRIFF VERWEIGERT: Türchen #${d} ist durch die Vault-Tec-Zeitsperre bis zum ${unlockDateStr} verriegelt.`);
                return;
            }
            AppState.activeDay = d;
            saveState();
            switchTab('mission');
            renderActiveMission();
        });

        grid.appendChild(card);
    });
}

/* ==========================================================================
   TAB 2: MULTI-PHASE SOLO ADVENTURE MISSION VIEW & DYNAMIC 2D20 RESOLUTION
   ========================================================================== */

function renderDiceTrayHtml(rolls) {
    return (rolls || []).map(r => {
        let cls = 'd20-die';
        let tag = 'FEHL';
        if (r.isCrit) { cls += ' crit'; tag = 'KRIT (2★)'; }
        else if (r.successes > 0) { cls += ' success'; tag = 'ERFOLG'; }
        if (r.isComplication) { cls += ' complication'; tag = 'KOMPL!'; }
        return `
            <div class="${cls}">
                <span class="die-num">${r.value}</span>
                <span class="die-tag">${tag}</span>
            </div>
        `;
    }).join('');
}

function renderSpecialGiftHtml(dayObj) {
    if (!dayObj.specialGift) return '';
    const g = dayObj.specialGift;
    const giftItemsHtml = (g.items || []).map(item => `<li>${personalizeText(item, true)}</li>`).join('');
    return `
        <div class="special-gift-box">
            <div class="special-gift-badge">${personalizeText(g.badge, true)}</div>
            <h4 class="special-gift-title">${personalizeText(g.title, true)}</h4>
            <p class="special-gift-text">${personalizeText(g.text, true)}</p>
            <div class="special-gift-loot-title">&gt; IM CHARAKTER-INVENTAR FREIGESCHALTETE GESCHENKE:</div>
            <ul class="special-gift-list">
                ${giftItemsHtml}
            </ul>
            ${g.realWorldHint ? `<div class="special-gift-hint">${personalizeText(g.realWorldHint, true)}</div>` : ''}
        </div>
    `;
}

function renderActiveMission() {
    const container = document.getElementById('mission-container');
    if (!container) return;

    const dayObj = window.STORY_DAYS.find(item => item.day === AppState.activeDay) || window.STORY_DAYS[0];
    const unlocked = isDayUnlocked(dayObj.day);

    // Guard if user switched to Mission Tab while current activeDay is still locked
    if (!unlocked) {
        const unlockDateStr = `${String(dayObj.day).padStart(2, '0')}.12.2026`;
        container.innerHTML = `
            <div class="terminal-box" style="text-align:center; padding: 36px 24px;">
                <h3>&gt; SICHERHEITSSPERRE AKTIV: TÜRCHEN #${String(dayObj.day).padStart(2, '0')} (${unlockDateStr})</h3>
                <p style="color:var(--phosphor-text); font-size:1.08rem; margin: 14px 0;">
                    Dieses Wartungs-Protokoll wird durch den zentralen Vault-Tec-Chronometer erst am <strong>${unlockDateStr} um 00:00 Uhr</strong> freigegeben.
                </p>
                <div style="margin-top: 18px; display:flex; justify-content:center;">
                    <button class="terminal-btn" id="btn-locked-back-cal">[ZURÜCK ZUR KALENDER-ÜBERSICHT]</button>
                </div>
            </div>
        `;
        document.getElementById('btn-locked-back-cal')?.addEventListener('click', () => {
            window.RobCoAudio.click();
            switchTab('calendar');
        });
        return;
    }

    const dayEntry = AppState.completedDays[dayObj.day];
    const c = AppState.character;
    const paragraphsHtml = dayObj.story.map(p => `<p>${personalizeText(p, true)}</p>`).join('');

    let missionBodyHtml = '';

    // Case A: Legacy single-phase save (e.g. if user already played Day 1 before multi-phase update)
    if (isLegacyDayEntry(dayEntry)) {
        missionBodyHtml = `
            <div class="legacy-notice-box">
                <div><strong>&gt; HINWEIS ZUM ALTEN SPIELSTAND (TAG ${dayObj.day}):</strong></div>
                <p>Dieser Tag wurde noch vor dem Update auf die mehrstufigen Etappen mit dynamischen Konsequenzen gespeichert. Dein Fortschritt bleibt vollständig gültig – oder du kannst diesen Tag optional direkt im neuen Etappen-System noch einmal spielen.</p>
                <button class="terminal-btn" id="btn-replay-legacy-day">[TAG ${dayObj.day} MIT NEUEN ETAPPEN NEU SPIELEN]</button>
            </div>
            <div class="resolution-box">
                <h3>&gt; GESPEICHERTES EINSATZ-PROTOKOLL TAG ${dayObj.day}: ${dayEntry.passed ? 'PRÜFUNG BESTANDEN' : 'MIT SCHRAMMEN DURCHGESCHLAGEN'}</h3>
                <div class="dice-tray">${renderDiceTrayHtml(dayEntry.rolls)}</div>
                <p><strong>Würfelergebnis:</strong> ${dayEntry.totalSuccesses} Erfolge (Benötigt: ${dayEntry.difficulty}) | Zielwert war &le; ${dayEntry.targetNumber}</p>
                <p style="margin-top:8px;"><strong>Geborgene Ausrüstung / Bonus:</strong> ${personalizeText(dayEntry.rewardItem, true)}</p>
                <p><strong>Kampagnen-Logbuch:</strong> ${personalizeText(dayEntry.note, true)}</p>
                ${renderSpecialGiftHtml(dayObj)}
                <div style="margin-top: 14px; display:flex; gap:10px; flex-wrap:wrap;">
                    ${dayObj.day < 24 && isDayUnlocked(dayObj.day + 1) ? `
                        <button id="btn-next-day-direct" class="terminal-btn">[WEITER ZU TAG ${dayObj.day + 1} &gt;&gt;]</button>
                    ` : ''}
                    ${dayObj.day === 24 ? `
                        <button id="btn-open-export-direct" class="terminal-btn">[ZUM KAMPAGNEN-DOSSIER FÜR DIE RPG-RUNDE &gt;&gt;]</button>
                    ` : ''}
                </div>
            </div>
        `;
    } else {
        // Case B: Dynamic Multi-Phase Flow
        const phases = Array.isArray(dayObj.phases) ? dayObj.phases : [];
        const phasesHtml = phases.map((phase, pIdx) => {
            const phaseResult = dayEntry?.phases?.[pIdx] || null;
            const isPhaseUnlocked = pIdx === 0 || Boolean(dayEntry?.phases?.[pIdx - 1]);
            const incomingMod = getPhaseIncomingModifier(dayObj, dayEntry, pIdx);

            if (!isPhaseUnlocked) {
                return `
                    <div class="phase-box phase-locked">
                        <div class="phase-header">
                            <span class="phase-title">&gt; ${phase.phaseTitle}</span>
                            <span class="phase-badge locked">[GESPERRT &ndash; ERST ETAPPE ${pIdx} ABSCHLIESSEN]</span>
                        </div>
                    </div>
                `;
            }

            let consequenceBannerHtml = '';
            if (pIdx > 0 && incomingMod.tag) {
                const isAdv = incomingMod.prevPassed === true;
                consequenceBannerHtml = `
                    <div class="consequence-banner ${isAdv ? 'advantage' : 'penalty'}">
                        <span class="consequence-tag">${isAdv ? '▲' : '▼'} KONSEQUENZ AUS ETAPPE ${pIdx} [${incomingMod.tag}]:</span>
                        <span>${incomingMod.text}</span>
                    </div>
                `;
            }

            const phaseIntro = pIdx === 0
                ? phase.intro
                : (incomingMod.prevPassed ? phase.introOnSuccess : phase.introOnFail);

            let badgeHtml = `<span class="phase-badge active">▶ AKTIVE ETAPPE</span>`;
            if (phaseResult) {
                badgeHtml = phaseResult.passed
                    ? `<span class="phase-badge success">✓ BESTANDEN</span>`
                    : `<span class="phase-badge fail">⚡ NOTLÖSUNG</span>`;
            }

            let phaseContentHtml = '';
            if (!phaseResult) {
                // Render selectable 2d20 choices for this phase
                const freeBonus = incomingMod.bonusDice || 0;
                const choicesHtml = phase.choices.map(ch => {
                    const attrObj = c.attributes[ch.attr];
                    const skillObj = getSkillSafely(c, ch.skill, ch.attr);
                    const tn = attrObj.value + skillObj.rank;
                    const critRange = skillObj.tag ? Math.max(1, skillObj.rank) : 1;
                    const effDiff = Math.max(1, ch.difficulty + (incomingMod.diffMod || 0));

                    let diffDisplay = `${effDiff}`;
                    if (effDiff !== ch.difficulty) {
                        diffDisplay = `${effDiff} (Basis ${ch.difficulty}${incomingMod.diffMod > 0 ? `+${incomingMod.diffMod}` : incomingMod.diffMod})`;
                    } else if (incomingMod.diffMod < 0 && ch.difficulty === 1) {
                        diffDisplay = `1 (Min. 1)`;
                    }

                    const stdDice = Math.min(5, 2 + freeBonus);
                    const apDice = Math.min(5, stdDice + 1);
                    const stdLabel = freeBonus > 0
                        ? `[&gt; ${stdDice}W20 WÜRFELN (2W20 + ${freeBonus} BONUS-W20) &lt;]`
                        : `[&gt; 2W20 WÜRFELN (STANDARD) &lt;]`;

                    return `
                        <div class="choice-card">
                            <div>
                                <div class="choice-title">[OPTION ${ch.id}] ${personalizeText(ch.label, true)}</div>
                                <div style="margin: 8px 0;">
                                    <span class="choice-test-badge">
                                        PRÜFUNG: ${attrObj.short} (${attrObj.value}) + ${skillObj.name}${skillObj.tag ? ' ★' : ''} (${skillObj.rank})
                                        &rarr; ZIELWERT: ${tn} | KRIT: &le;${critRange} | SCHWIERIGKEIT: ${diffDisplay}
                                    </span>
                                </div>
                                <p class="choice-desc">${personalizeText(ch.desc, true)}</p>
                            </div>
                            <div style="margin-top: 10px; display:flex; gap:8px; flex-wrap:wrap;">
                                <button class="terminal-btn btn-roll-phase" data-phase="${pIdx}" data-choice="${ch.id}" data-spend-ap="0">
                                    ${stdLabel}
                                </button>
                                ${c.ap >= 1 && stdDice < 5 ? `
                                <button class="terminal-btn btn-roll-phase" data-phase="${pIdx}" data-choice="${ch.id}" data-spend-ap="1" title="Kostet 1 AP aus dem Pool für +1W20">
                                    [+1 AP: MIT ${apDice}W20 WÜRFELN]
                                </button>` : ''}
                            </div>
                        </div>
                    `;
                }).join('');

                phaseContentHtml = `
                    <div class="choices-heading">&gt; WÄHLE DEINE VORGEHENSWEISE FÜR ETAPPE ${pIdx + 1}:</div>
                    <div class="choices-grid">${choicesHtml}</div>
                `;
            } else {
                // Render completed phase resolution
                const chosen = phase.choices.find(ch => ch.id === phaseResult.choiceId) || phase.choices[0];
                const nextPhaseStarted = Boolean(dayEntry?.phases?.[pIdx + 1]);
                const canLuckReroll = c.luckPoints > 0 && !phaseResult.passed && !nextPhaseStarted;

                let ownConsequenceHtml = '';
                if (phase.consequence) {
                    const outCons = phaseResult.passed ? phase.consequence.onSuccess : phase.consequence.onFail;
                    if (outCons) {
                        ownConsequenceHtml = `
                            <div class="consequence-banner ${phaseResult.passed ? 'advantage' : 'penalty'}" style="margin-top:10px;">
                                <span class="consequence-tag">${phaseResult.passed ? '▲' : '▼'} FOLGE FÜR ETAPPE ${pIdx + 2} [${outCons.tag}]:</span>
                                <span>${outCons.text}</span>
                            </div>
                        `;
                    }
                }

                phaseContentHtml = `
                    <div class="resolution-box phase-resolution">
                        <p><strong>Gewählter Ansatz:</strong> ${personalizeText(chosen.label, true)}</p>
                        <div class="dice-tray">${renderDiceTrayHtml(phaseResult.rolls)}</div>
                        <p><strong>Würfelergebnis:</strong> ${phaseResult.totalSuccesses} Erfolge (Benötigt: ${phaseResult.difficulty}) | Zielwert war &le; ${phaseResult.targetNumber}${phaseResult.bonusDiceApplied ? ` | inkl. +${phaseResult.bonusDiceApplied} Bonus-W20` : ''}</p>
                        <div class="ambient-quote" style="margin-top:10px;">
                            ${personalizeText(phaseResult.passed ? chosen.successText : chosen.failText, true)}
                        </div>
                        ${ownConsequenceHtml}
                        <p style="margin-top:8px;"><strong>Ergebnis / Fund:</strong> ${personalizeText(phaseResult.rewardItem, true)}</p>
                        <p><strong>Logbuch:</strong> ${personalizeText(phaseResult.note, true)}</p>
                        ${canLuckReroll ? `
                        <div style="margin-top: 12px;">
                            <button class="terminal-btn btn-phase-luck-reroll" data-phase="${pIdx}" data-choice="${chosen.id}">
                                [GLÜCKSPUNKT EINSETZEN (-1 LUCK): ETAPPE ${pIdx + 1} WIEDERHOLEN]
                            </button>
                        </div>` : ''}
                    </div>
                `;
            }

            return `
                <div class="phase-box ${phaseResult ? 'phase-done' : 'phase-active'}">
                    <div class="phase-header">
                        <span class="phase-title">&gt; ${phase.phaseTitle}</span>
                        ${badgeHtml}
                    </div>
                    ${consequenceBannerHtml}
                    <p class="phase-intro">${personalizeText(phaseIntro, true)}</p>
                    ${phaseContentHtml}
                </div>
            `;
        }).join('');

        const dayFinished = isDayCompleted(dayEntry);
        const dayFooterActionsHtml = dayFinished ? `
            ${renderSpecialGiftHtml(dayObj)}
            <div class="mission-finish-bar">
                <div class="mission-finish-title">&gt; TAGES-PROTOKOLL #${String(dayObj.day).padStart(2, '0')} VOLLSTÄNDIG ABGESCHLOSSEN (+${phases.length * 20} XP INSGESAMT)</div>
                <div style="display:flex; gap:10px; flex-wrap:wrap; margin-top:10px;">
                    ${dayObj.day < 24 && isDayUnlocked(dayObj.day + 1) ? `
                        <button id="btn-next-day-direct" class="terminal-btn">[WEITER ZU TAG ${dayObj.day + 1} &gt;&gt;]</button>
                    ` : ''}
                    ${dayObj.day === 24 ? `
                        <button id="btn-open-export-direct" class="terminal-btn">[ZUM KAMPAGNEN-DOSSIER FÜR DIE RPG-RUNDE &gt;&gt;]</button>
                    ` : ''}
                </div>
            </div>
        ` : '';

        missionBodyHtml = `
            <div class="phases-stack">
                ${phasesHtml}
            </div>
            ${dayFooterActionsHtml}
        `;
    }

    container.innerHTML = `
        <div class="mission-header-bar">
            <div class="mission-header-title">
                <h2>TAG ${String(dayObj.day).padStart(2, '0')} (${String(dayObj.day).padStart(2, '0')}.12.2026): ${dayObj.title.toUpperCase()}</h2>
                <div class="mission-meta">${dayObj.sector} // ${dayObj.logHeader}</div>
            </div>
            <div class="mission-nav-btns">
                <button class="terminal-btn" id="btn-prev-day" ${dayObj.day <= 1 ? 'disabled' : ''}>[&lt; TAG ${dayObj.day - 1}]</button>
                <button class="terminal-btn" id="btn-back-cal">[ÜBERSICHT]</button>
                <button class="terminal-btn" id="btn-next-day" ${dayObj.day >= 24 || !isDayUnlocked(dayObj.day + 1) ? 'disabled' : ''}>[TAG ${dayObj.day + 1} &gt;]</button>
            </div>
        </div>

        <div class="mission-story-box">
            <div class="log-entry-header">${dayObj.logHeader}</div>
            <div class="story-paragraphs">${paragraphsHtml}</div>
            <div class="ambient-quote">${personalizeText(dayObj.quote, true)}</div>
        </div>

        ${missionBodyHtml}
    `;

    // Bind navigation buttons
    document.getElementById('btn-prev-day')?.addEventListener('click', () => {
        if (AppState.activeDay > 1) {
            window.RobCoAudio.click();
            AppState.activeDay--;
            saveState();
            renderActiveMission();
        }
    });

    document.getElementById('btn-next-day')?.addEventListener('click', () => {
        if (AppState.activeDay < 24 && isDayUnlocked(AppState.activeDay + 1)) {
            window.RobCoAudio.click();
            AppState.activeDay++;
            saveState();
            renderActiveMission();
        }
    });

    document.getElementById('btn-back-cal')?.addEventListener('click', () => {
        window.RobCoAudio.click();
        switchTab('calendar');
    });

    // Bind replay button for legacy saves (e.g. Day 1 played before multi-phase update)
    document.getElementById('btn-replay-legacy-day')?.addEventListener('click', () => {
        window.RobCoAudio.click();
        delete AppState.completedDays[dayObj.day];
        saveState();
        updateTelemetryBar();
        renderCalendarGrid();
        renderVaultDiagnostics();
        generateCampaignReport();
        renderActiveMission();
        setFooterStatus(`TAG ${dayObj.day} FÜR DEN NEUEN MEHRSTUFIGEN ETAPPEN-ABLAUF ZURÜCKGESETZT.`);
    });

    // Bind phase roll buttons
    container.querySelectorAll('.btn-roll-phase').forEach(btn => {
        btn.addEventListener('click', () => {
            const phaseIdx = parseInt(btn.getAttribute('data-phase'), 10);
            const choiceId = btn.getAttribute('data-choice');
            const spendAp = parseInt(btn.getAttribute('data-spend-ap'), 10) || 0;
            executePhaseChoice(dayObj, phaseIdx, choiceId, spendAp, false);
        });
    });

    // Bind phase Luck reroll buttons
    container.querySelectorAll('.btn-phase-luck-reroll').forEach(btn => {
        btn.addEventListener('click', () => {
            const phaseIdx = parseInt(btn.getAttribute('data-phase'), 10);
            const choiceId = btn.getAttribute('data-choice');
            if (AppState.character.luckPoints > 0) {
                AppState.character.luckPoints--;
                executePhaseChoice(dayObj, phaseIdx, choiceId, 0, true);
            }
        });
    });

    document.getElementById('btn-next-day-direct')?.addEventListener('click', () => {
        window.RobCoAudio.click();
        if (isDayUnlocked(dayObj.day + 1)) {
            AppState.activeDay = Math.min(24, dayObj.day + 1);
            saveState();
            renderActiveMission();
        }
    });

    document.getElementById('btn-open-export-direct')?.addEventListener('click', () => {
        window.RobCoAudio.click();
        switchTab('export');
    });
}

function executePhaseChoice(dayObj, phaseIdx, choiceId, spendAp = 0, isLuckReroll = false) {
    const c = AppState.character;
    const phase = dayObj.phases && dayObj.phases[phaseIdx];
    if (!phase) return;
    const choice = phase.choices.find(ch => ch.id === choiceId);
    if (!choice) return;

    let dayEntry = AppState.completedDays[dayObj.day];
    if (!dayEntry || isLegacyDayEntry(dayEntry)) {
        dayEntry = {
            completed: false,
            passed: false,
            phases: {},
            timestamp: null,
            giftClaimed: false
        };
    }

    const prevPhaseEntry = dayEntry.phases[phaseIdx];
    const alreadyPhaseRolled = Boolean(prevPhaseEntry);
    const wasDayCompletedBefore = isDayCompleted(dayEntry);

    // Prevent double-rolling an already rolled phase unless it is a Luck Reroll
    if (alreadyPhaseRolled && !isLuckReroll) {
        return;
    }

    // Spend 1 AP if player opted for +1d20 via AP
    if (spendAp > 0 && !isLuckReroll) {
        if (c.ap < spendAp) {
            setFooterStatus('Nicht genügend Aktionspunkte (AP) im Pool!');
            return;
        }
        c.ap -= spendAp;
    }

    // Incoming dynamic modifier from previous phase
    const incomingMod = getPhaseIncomingModifier(dayObj, dayEntry, phaseIdx);
    const bonusDice = incomingMod.bonusDice || 0;
    const effectiveDifficulty = Math.max(1, choice.difficulty + (incomingMod.diffMod || 0));
    const totalDice = Math.min(5, 2 + bonusDice + (isLuckReroll ? 0 : spendAp));

    const attrVal = c.attributes[choice.attr].value;
    const skillObj = getSkillSafely(c, choice.skill, choice.attr);

    const rollResult = window.Fallout2d20Engine.rollSkillTest({
        attrValue: attrVal,
        skillRank: skillObj.rank,
        isTag: skillObj.tag,
        difficulty: effectiveDifficulty,
        numDice: totalDice,
        juryRigging: choice.skill === 'repair'
    });

    // If this is a Luck Reroll, cleanly revert any immediate HP/RAD/AP penalty/bonus from the previous failed roll of THIS phase
    if (isLuckReroll && prevPhaseEntry && prevPhaseEntry.appliedDelta) {
        const d = prevPhaseEntry.appliedDelta;
        if (d.hp) c.hp = Math.max(1, Math.min(c.maxHp, c.hp - d.hp));
        if (d.rad) c.rad = Math.max(0, c.rad - d.rad);
        if (d.ap) c.ap = Math.max(0, Math.min(c.maxAp, c.ap - d.ap));
    }

    // Track exact resource deltas applied by this phase's outcome
    const beforeHp = c.hp;
    const beforeRad = c.rad;
    const beforeAp = c.ap;

    if (rollResult.passed) {
        window.RobCoAudio.successSound();
        c.ap = Math.min(c.maxAp, c.ap + rollResult.generatedAp);
    } else {
        window.RobCoAudio.failSound();
    }

    // Apply phase consequence resource mods (apMod / hpMod / radMod) or final-phase fail damage
    if (phase.consequence) {
        const cons = rollResult.passed ? phase.consequence.onSuccess : phase.consequence.onFail;
        if (cons) {
            if (cons.apMod) c.ap = Math.max(0, Math.min(c.maxAp, c.ap + cons.apMod));
            if (cons.hpMod) c.hp = Math.max(1, Math.min(c.maxHp, c.hp + cons.hpMod));
            if (cons.radMod) c.rad = Math.max(0, c.rad + cons.radMod);
        }
    } else if (!rollResult.passed) {
        // Final phase failure causes standard -1 HP wear
        c.hp = Math.max(1, c.hp - 1);
    }

    // Special Day 12 Auto-Doc healing reward on Choice 12_2A success
    if (choice.id === '12_2A' && rollResult.passed && !alreadyPhaseRolled) {
        c.hp = Math.min(c.maxHp, c.hp + 2);
    }

    const appliedDelta = {
        hp: c.hp - beforeHp,
        rad: c.rad - beforeRad,
        ap: c.ap - beforeAp
    };

    // Grant XP & item on first completion of this phase
    if (!alreadyPhaseRolled) {
        c.xp += 20;
        if (c.xp >= 750) c.level = 3;
        else if (c.xp >= 300) c.level = 2;

        const resolvedReward = personalizeText(choice.rewardItem, false);
        if (resolvedReward && !c.inventory.includes(resolvedReward)) {
            c.inventory.push(resolvedReward);
        }
    }

    const isFinalPhase = phaseIdx === dayObj.phases.length - 1;

    dayEntry.phases[phaseIdx] = {
        choiceId: choice.id,
        label: personalizeText(choice.label, false),
        passed: rollResult.passed,
        rolls: rollResult.rolls,
        totalSuccesses: rollResult.totalSuccesses,
        difficulty: rollResult.difficulty,
        targetNumber: rollResult.targetNumber,
        bonusDiceApplied: bonusDice,
        diffModApplied: incomingMod.diffMod || 0,
        appliedDelta,
        rewardItem: personalizeText(choice.rewardItem, false),
        note: personalizeText(choice.campaignNote, false),
        timestamp: rollResult.timestamp,
        luckRerolled: Boolean(isLuckReroll || (prevPhaseEntry && prevPhaseEntry.luckRerolled))
    };

    if (isFinalPhase) {
        dayEntry.completed = true;
        // Day overall counts as smooth success if final phase passed (and majority passed)
        const allPhaseVals = Object.values(dayEntry.phases);
        const passedCount = allPhaseVals.filter(p => p.passed).length;
        dayEntry.passed = rollResult.passed && passedCount >= Math.ceil(dayObj.phases.length / 2);
        dayEntry.timestamp = rollResult.timestamp;

        // Grant Special Gift (Day 6 Nikolaus / Day 24 Heiligabend) once on first full day completion
        if (!wasDayCompletedBefore && dayObj.specialGift) {
            const gift = dayObj.specialGift;
            if (Array.isArray(gift.items)) {
                gift.items.forEach(giftItem => {
                    const resolvedGiftItem = personalizeText(giftItem, false);
                    if (!c.inventory.includes(resolvedGiftItem)) {
                        c.inventory.push(resolvedGiftItem);
                    }
                });
            }
            if (gift.bonusStats) {
                if (gift.bonusStats.healFull) c.hp = c.maxHp;
                if (gift.bonusStats.clearRad) c.rad = 0;
                if (gift.bonusStats.luckDelta) {
                    c.luckPoints = Math.min(c.maxLuckPoints, c.luckPoints + gift.bonusStats.luckDelta);
                }
                if (gift.bonusStats.apDelta) {
                    c.ap = Math.min(c.maxAp, c.ap + gift.bonusStats.apDelta);
                }
            }
            dayEntry.giftClaimed = true;
        }
    }

    AppState.completedDays[dayObj.day] = dayEntry;

    // Log in global dice history
    AppState.diceHistory.unshift({
        label: `Tag ${dayObj.day}.${phaseIdx + 1} (${personalizeText(choice.label, false)})`,
        summary: `${rollResult.rolls.map(r => r.value).join(', ')} &rarr; ${rollResult.totalSuccesses}/${rollResult.difficulty} Erfolge (${rollResult.passed ? 'ERFOLG' : 'FEHLSCHLAG'})`,
        time: rollResult.timestamp
    });

    saveState();
    updateTelemetryBar();
    renderActiveMission();
    renderCalendarGrid();
    renderCharacterSheet();
    renderVaultDiagnostics();
    generateCampaignReport();

    if (isFinalPhase && dayObj.specialGift) {
        setFooterStatus(`TAG ${dayObj.day} ABGESCHLOSSEN & SONDER-GESCHENK FREIGESCHALTET: ${dayObj.specialGift.title}!`);
    } else if (isFinalPhase) {
        setFooterStatus(`TAG ${dayObj.day} KOMPLETT ABGESCHLOSSEN! (${rollResult.totalSuccesses}/${rollResult.difficulty} Erfolge in Etappe ${phaseIdx + 1}).`);
    } else {
        setFooterStatus(`TAG ${dayObj.day} // ETAPPE ${phaseIdx + 1} AUSGEWERTET: ${rollResult.passed ? 'VORTEIL' : 'STÖRUNG'} FÜR ETAPPE ${phaseIdx + 2} AKTIV.`);
    }
}

/* ==========================================================================
   TAB 3: CHARACTER SHEET (FALLOUT 2D20)
   ========================================================================== */

function renderCharacterSheet() {
    const c = AppState.character;
    syncCharacterGenderFields();
    document.getElementById('char-name').textContent = c.name;
    const originEl = document.getElementById('char-origin');
    if (originEl) originEl.textContent = c.origin;
    const roleEl = document.getElementById('char-role');
    if (roleEl) roleEl.textContent = c.role;
    document.getElementById('char-level').textContent = `${c.level} (${c.level > 1 ? 'Aufstiegsbereit für RPG-Runde!' : 'Solo-Prolog'})`;
    const nextLevelXp = c.level === 1 ? 300 : (c.level === 2 ? 750 : 1200);
    document.getElementById('char-xp').textContent = `${c.xp} / ${nextLevelXp}`;
    renderCharacterIdentityControls();

    // Resources
    document.getElementById('res-hp-val').textContent = `${c.hp} / ${c.maxHp}`;
    document.getElementById('res-rad-val').textContent = `${c.rad}`;
    document.getElementById('res-ap-val').textContent = `${c.ap} / ${c.maxAp}`;
    document.getElementById('res-luck-val').textContent = `${c.luckPoints} / ${c.maxLuckPoints}`;

    // S.P.E.C.I.A.L.
    const specialList = document.getElementById('special-list');
    if (specialList) {
        specialList.innerHTML = Object.values(c.attributes).map(attr => `
            <div class="special-card">
                <span class="special-letter">${attr.code[0]}</span>
                <span class="special-name">${attr.label}</span>
                <span class="special-val">${attr.value}</span>
            </div>
        `).join('');
    }

    // Perks
    const perkList = document.getElementById('perk-list');
    if (perkList) {
        perkList.innerHTML = c.perks.map(p => `
            <li>
                <div class="perk-title">${p.name}</div>
                <div>${p.desc}</div>
            </li>
        `).join('');
    }

    // Skills (Clicking a skill jumps to the 2d20 Dice Roller with that skill pre-selected)
    const skillsList = document.getElementById('skills-list');
    if (skillsList) {
        skillsList.innerHTML = Object.values(c.skills).map(sk => {
            const attr = c.attributes[sk.defaultAttr];
            const tn = attr.value + sk.rank;
            return `
                <div class="skill-row ${sk.tag ? 'tag-skill' : ''}" data-skill="${sk.id}" data-attr="${sk.defaultAttr}" title="Klicken, um ${sk.name} im Würfel-Modul zu testen">
                    <span>${sk.tag ? '★ ' : ''}${sk.name} (${attr.short})</span>
                    <span>Rang ${sk.rank} [ZW: ${tn}]</span>
                </div>
            `;
        }).join('');

        skillsList.querySelectorAll('.skill-row').forEach(row => {
            row.addEventListener('click', () => {
                window.RobCoAudio.click();
                const skId = row.getAttribute('data-skill');
                const attrCode = row.getAttribute('data-attr');
                const attrSel = document.getElementById('roll-attr-select');
                const skillSel = document.getElementById('roll-skill-select');
                if (attrSel && skillSel) {
                    attrSel.value = attrCode;
                    skillSel.value = skId;
                    updateDiceTargetSummary();
                }
                switchTab('dice');
            });
        });
    }

    // Inventory
    const invList = document.getElementById('inventory-list');
    if (invList) {
        invList.innerHTML = c.inventory.map((item, idx) => `
            <div class="inv-item">
                <span>&gt; ${item}</span>
                <button class="btn-step btn-del-item" data-idx="${idx}" title="Eintrag entfernen">[X]</button>
            </div>
        `).join('');

        invList.querySelectorAll('.btn-del-item').forEach(btn => {
            btn.addEventListener('click', () => {
                const idx = parseInt(btn.getAttribute('data-idx'), 10);
                c.inventory.splice(idx, 1);
                saveState();
                renderCharacterSheet();
            });
        });
    }
}

/* ==========================================================================
   TAB 4: VAULT 84 DIAGNOSTICS & BLUEPRINT
   ========================================================================== */

function renderVaultDiagnostics() {
    const grid = document.getElementById('vault-systems-grid');
    if (!grid) return;

    grid.innerHTML = window.VAULT_SYSTEMS.map(sys => {
        const pct = calculateSystemPercentage(sys);
        let statusLabel = 'KRITISCH';
        if (pct >= 65) statusLabel = 'STABIL (BASISBETRIEB)';
        else if (pct >= 35) statusLabel = 'NOTBETRIEB';

        return `
            <div class="sys-card">
                <div class="sys-header">
                    <span>${sys.name}</span>
                    <span>${pct}%</span>
                </div>
                <div style="font-size:0.88rem; color:var(--phosphor-main);">${sys.sector} // STATUS: ${statusLabel}</div>
                <div class="sys-bar-bg">
                    <div class="sys-bar-fill" style="width: ${pct}%;"></div>
                </div>
                <p style="font-size:0.95rem; color:var(--phosphor-text); margin-top:6px;">${sys.desc}</p>
            </div>
        `;
    }).join('');

    const blueprint = document.getElementById('vault-ascii-map');
    if (blueprint) {
        blueprint.textContent = window.VAULT_ASCII_BLUEPRINT;
    }
}

/* ==========================================================================
   TAB 5: STANDALONE 2D20 DICE ROLLER
   ========================================================================== */

function initDiceRollerTab() {
    const c = AppState.character;
    const attrSel = document.getElementById('roll-attr-select');
    const skillSel = document.getElementById('roll-skill-select');

    if (attrSel) {
        attrSel.innerHTML = Object.values(c.attributes).map(a =>
            `<option value="${a.code}" ${a.code === 'INT' ? 'selected' : ''}>${a.label} (${a.short}: ${a.value})</option>`
        ).join('');
        attrSel.addEventListener('change', updateDiceTargetSummary);
    }

    if (skillSel) {
        skillSel.innerHTML = Object.values(c.skills).map(s =>
            `<option value="${s.id}" ${s.id === 'repair' ? 'selected' : ''}>${s.tag ? '★ ' : ''}${s.name} (Rang ${s.rank})</option>`
        ).join('');
        skillSel.addEventListener('change', () => {
            const chosenSkill = c.skills[skillSel.value];
            if (chosenSkill && attrSel) {
                attrSel.value = chosenSkill.defaultAttr;
            }
            updateDiceTargetSummary();
        });
    }

    document.querySelectorAll('.bonus-d20-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            window.RobCoAudio.click();
            document.querySelectorAll('.bonus-d20-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            AppState.selectedBonusD20 = parseInt(btn.getAttribute('data-d20'), 10) || 2;
        });
    });

    const btnRoll2d20 = document.getElementById('btn-execute-2d20');
    if (btnRoll2d20) {
        btnRoll2d20.addEventListener('click', () => {
            window.RobCoAudio.rollSound();
            const attrCode = attrSel.value;
            const skillId = skillSel.value;
            const diff = parseInt(document.getElementById('roll-diff-select').value, 10) || 1;

            const attrObj = c.attributes[attrCode];
            const skillObj = getSkillSafely(c, skillId, attrCode);

            const res = window.Fallout2d20Engine.rollSkillTest({
                attrValue: attrObj.value,
                skillRank: skillObj.rank,
                isTag: skillObj.tag,
                difficulty: diff,
                numDice: AppState.selectedBonusD20,
                juryRigging: skillId === 'repair'
            });

            renderStandalone2d20Result(attrObj, skillObj, res);
        });
    }

    const btnRollCd = document.getElementById('btn-roll-cd');
    if (btnRollCd) {
        btnRollCd.addEventListener('click', () => {
            window.RobCoAudio.rollSound();
            const count = parseInt(document.getElementById('cd-count-select').value, 10) || 4;
            const res = window.Fallout2d20Engine.rollCombatDice(count);
            renderStandaloneCdResult(res);
        });
    }

    updateDiceTargetSummary();
    renderDiceHistoryLog();
}

function updateDiceTargetSummary() {
    const c = AppState.character;
    const attrCode = document.getElementById('roll-attr-select')?.value || 'INT';
    const skillId = document.getElementById('roll-skill-select')?.value || 'repair';
    const attrObj = c.attributes[attrCode];
    const skillObj = getSkillSafely(c, skillId, attrCode);
    const tn = attrObj.value + skillObj.rank;
    const crit = skillObj.tag ? Math.max(1, skillObj.rank) : 1;

    const summaryEl = document.getElementById('roll-target-summary');
    if (summaryEl) {
        summaryEl.textContent = `ZIELWERT (ZW): ${tn} (${attrObj.short} ${attrObj.value} + ${skillObj.name} ${skillObj.rank}) | KRIT-BEREICH: ≤ ${crit} ${skillObj.tag ? '(TAG-SKILL ★)' : ''}`;
    }
}

function renderStandalone2d20Result(attrObj, skillObj, res) {
    const display = document.getElementById('dice-result-display');
    if (!display) return;

    const diceHtml = renderDiceTrayHtml(res.rolls);

    display.innerHTML = `
        <div><strong>PRÜFUNG:</strong> ${attrObj.label} + ${skillObj.name} (ZW ≤ ${res.targetNumber})</div>
        <div class="dice-tray">${diceHtml}</div>
        <div>
            <strong>ERGEBNIS:</strong> ${res.totalSuccesses} Erfolge bei Schwierigkeit ${res.difficulty} &rarr;
            <span style="color: ${res.passed ? 'var(--alert-success)' : 'var(--alert-danger)'}; font-weight:bold;">
                ${res.passed ? 'PRÜFUNG BESTANDEN!' : 'FEHLSCHLAG!'}
            </span>
        </div>
        <div><strong>GENERIERTE AP:</strong> +${res.generatedAp} AP | <strong>KOMPLIKATIONEN:</strong> ${res.effectiveComplications}</div>
    `;

    AppState.diceHistory.unshift({
        label: `2d20: ${attrObj.short}+${skillObj.name}`,
        summary: `[${res.rolls.map(r => r.value).join(', ')}] &rarr; ${res.totalSuccesses}/${res.difficulty} Erfolge (${res.passed ? 'OK' : 'FEHL'})`,
        time: res.timestamp
    });
    saveState();
    renderDiceHistoryLog();
}

function renderStandaloneCdResult(res) {
    const display = document.getElementById('dice-result-display');
    if (!display) return;

    const facesHtml = res.faces.map(f => `
        <div class="d20-die ${f.effect > 0 ? 'crit' : ''}">
            <span class="die-num">[${f.raw}]</span>
            <span class="die-tag">${f.dmg} DMG${f.effect ? '+★' : ''}</span>
        </div>
    `).join('');

    display.innerHTML = `
        <div><strong>KAMPFWÜRFEL-WURF (${res.count} CD):</strong></div>
        <div class="dice-tray">${facesHtml}</div>
        <div><strong>GESAMTSCHADEN:</strong> ${res.totalDamage} | <strong>EFFEKTE (★):</strong> ${res.totalEffects}</div>
    `;

    AppState.diceHistory.unshift({
        label: `Kampfwürfel (${res.count} CD)`,
        summary: `${res.totalDamage} Schaden, ${res.totalEffects} Effekte ★`,
        time: res.timestamp
    });
    saveState();
    renderDiceHistoryLog();
}

function renderDiceHistoryLog() {
    const logEl = document.getElementById('dice-history-log');
    if (!logEl) return;
    if (AppState.diceHistory.length === 0) {
        logEl.innerHTML = '<div class="muted-text">Noch keine Würfe protokolliert.</div>';
        return;
    }
    logEl.innerHTML = AppState.diceHistory.slice(0, 15).map(item => `
        <div class="history-item">
            <span>[${item.time}] <strong>${item.label}:</strong> ${item.summary}</span>
        </div>
    `).join('');
}

/* ==========================================================================
   TAB 6: CAMPAIGN DOSSIER & GM HANDOFF EXPORT
   ========================================================================== */

function generateCampaignReport() {
    const textarea = document.getElementById('campaign-export-text');
    if (!textarea) return;

    const c = AppState.character;
    const identity = getCharacterIdentity(false);
    const profile = identity.profile;
    const completedDaysList = Object.keys(AppState.completedDays)
        .map(Number)
        .filter(d => isDayCompleted(AppState.completedDays[d]))
        .sort((a, b) => a - b);

    const sysLines = window.VAULT_SYSTEMS.map(sys => {
        const pct = calculateSystemPercentage(sys);
        return `- ${sys.name}: ${pct}% (${pct >= 65 ? 'STABIL - BASISBETRIEB' : 'REPARATURBEDÜRFTIG'})`;
    }).join('\n');

    const logLines = completedDaysList.length > 0
        ? completedDaysList.map(d => {
            const entry = AppState.completedDays[d];
            if (isLegacyDayEntry(entry)) {
                return `[✓] ${personalizeText(entry.note, false)} (${entry.passed ? 'Glatter Erfolg' : 'Unter Opfern gelöst'})`;
            }
            const dayObj = window.STORY_DAYS.find(item => item.day === d);
            const title = dayObj ? dayObj.title : `Tag ${d}`;
            const phaseNotes = Object.keys(entry.phases || {})
                .map(Number)
                .sort((a, b) => a - b)
                .map(pIdx => {
                    const p = entry.phases[pIdx];
                    return `    - Etappe ${pIdx + 1}: ${personalizeText(p.note, false)} (${p.passed ? 'Erfolg' : 'Notlösung'})`;
                }).join('\n');
            return `[✓] TAG ${String(d).padStart(2, '0')} (${title}):\n${phaseNotes}`;
        }).join('\n')
        : 'Noch keine Tages-Einsätze abgeschlossen.';

    const invLines = c.inventory.map(i => `  * ${personalizeText(i, false)}`).join('\n');

    const giftStatusLines = [
        isDayCompleted(AppState.completedDays[6])
            ? '[✓] TAG 06 (NIKOLAUS): Kovacs\' Überraschungspäckchen geborgen (Vault-Boy-Wackelpuppe "Reparieren" + Magazin "Nikola Tesla & Sie").'
            : '[ ] TAG 06 (NIKOLAUS): Noch nicht geöffnet.',
        isDayCompleted(AppState.completedDays[24])
            ? `[✓] TAG 24 (HEILIGABEND): Blau-Goldene Meisterkiste der Bewohner erhalten & Saboteur Silas Kaelen ausgeschaltet (Einzigartige Waffe "${identity.callsignGenitive} Polarstern" + Pip-Boy Overclocking-Modul + Werkstatt-Suite Gamma-1).`
            : '[ ] TAG 24 (HEILIGABEND): Noch nicht geöffnet.'
    ].join('\n');

    const report = `======================================================================
ROBCO INDUSTRIES // ÜBERGABE-DOSSIER FÜR DIE FALLOUT 2D20 TISCH-RUNDE
EINRICHTUNG: VAULT 84 (SUB-ALPINER SEKTOR) // PROLOG "WINTERSCHLAF"
======================================================================

1. ${profile.dossierRoleLabel}:
----------------------------------------------------------------------
Name:       ${c.name}
Geschlecht: ${profile.label}
Herkunft:   ${c.origin}
Rolle:      ${c.role}
Level / XP: Level ${c.level} (${c.xp} XP)
Vitalwerte: TP ${c.hp}/${c.maxHp} | RAD: ${c.rad} | AP-Pool: ${c.ap}/${c.maxAp} | Glück: ${c.luckPoints}/${c.maxLuckPoints}
S.P.E.C.I.A.L.: STR 5 | WAH 7 | AUS 5 | CHA 4 | INT 9 | BEW 5 | GLÜ 6
Tag-Skills: Reparieren (3 ★), Wissenschaft (3 ★), Energiewaffen (2 ★), Dietrich (2 ★)

2. SONDER-GESCHENKE (NIKOLAUS TAG 06 & HEILIGABEND TAG 24):
----------------------------------------------------------------------
${giftStatusLines}

3. VAULT 84 SYSTEM-STATUS NACH DEM SOLO-ABENTEUER (GESAMT: ${calculateVaultIntegrity()}%):
----------------------------------------------------------------------
${sysLines}

4. AUSGERÜSTETES INVENTAR & GEBORGENE STORY-GEGENSTÄNDE:
----------------------------------------------------------------------
${invLines}

5. CHRONIK DER ABGESCHLOSSENEN REPARATUREN (${completedDaysList.length}/24 TAGE):
----------------------------------------------------------------------
${logLines}

6. STARTPUNKT FÜR SITZUNG 1 DER GRUPPEN-KAMPAGNE:
----------------------------------------------------------------------
- Alle 118 Bewohner (inklusive der übrigen Spielercharaktere) sind wach.
- Saboteur Silas "Frostbiss" Kaelen wurde im Finale in Reaktorkammer Alpha überwältigt; seine Hintermänner ("Die Frostkrallen" im Schneetal) liefern den direkten Kampagnen-Auftakt.
- Vault 84 läuft stabil auf ~70-78% Basisbetrieb und dient der Gruppe als sichere Heimatbasis (mit Mr. Handy "Bartholomew", Krankenstation & eigener Werkstatt-Suite Gamma-1).
- OFFENE AUFGABEN FÜR DIE GRUPPE:
  [A] Außen-Mission zur Poseidon-Umspannstation Echo-7: G.E.E.K.-Spannungsregulator bergen, um den Reaktor auf 100% für den Siedlungsausbau zu bringen.
  [B] Rettung von Spähtrupp Delta aus der verschneiten "Wetterstation Habicht".
  [C] Drei externe Sicherheitscodes im Schneetal finden, um das versiegelte Schott zu Sub-Level 4 ("Projekt Permafrost") zu öffnen.
======================================================================`;

    textarea.value = report;
}

/* ==========================================================================
   NAVIGATION & EVENT BINDINGS
   ========================================================================== */

function switchTab(tabId) {
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-tab') === tabId);
    });
    document.querySelectorAll('.tab-panel').forEach(panel => {
        panel.classList.toggle('active', panel.id === `tab-${tabId}`);
    });

    if (tabId === 'mission') renderActiveMission();
    if (tabId === 'char') renderCharacterSheet();
    if (tabId === 'vault') renderVaultDiagnostics();
    if (tabId === 'export') generateCampaignReport();
}

function applyThemeAndEffects() {
    document.body.classList.remove('theme-amber', 'theme-green', 'theme-blue');
    document.body.classList.add(`theme-${AppState.theme}`);
    document.body.classList.toggle('crt-off', !AppState.crtEnabled);

    const labels = { green: 'GRÜN', amber: 'AMBER', blue: 'BLAU' };
    const themeBtn = document.getElementById('btn-theme-toggle');
    if (themeBtn) {
        themeBtn.textContent = `[FARBE: ${labels[AppState.theme] || AppState.theme.toUpperCase()}]`;
    }
    const crtBtn = document.getElementById('btn-crt-toggle');
    if (crtBtn) {
        crtBtn.textContent = `[CRT-FX: ${AppState.crtEnabled ? 'AN' : 'AUS'}]`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadState();
    applyThemeAndEffects();
    updateTelemetryBar();
    updateClock();
    setInterval(() => {
        updateClock();
    }, 1000);

    // Tab Navigation
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            window.RobCoAudio.click();
            const tab = btn.getAttribute('data-tab');
            switchTab(tab);
        });
    });

    // Character Resource Steppers
    document.querySelectorAll('.btn-step[data-res]').forEach(btn => {
        btn.addEventListener('click', () => {
            window.RobCoAudio.click();
            const res = btn.getAttribute('data-res');
            const delta = parseInt(btn.getAttribute('data-delta'), 10);
            const c = AppState.character;

            if (res === 'hp') c.hp = Math.max(0, Math.min(c.maxHp, c.hp + delta));
            if (res === 'rad') c.rad = Math.max(0, c.rad + delta);
            if (res === 'ap') c.ap = Math.max(0, Math.min(c.maxAp, c.ap + delta));
            if (res === 'luck') c.luckPoints = Math.max(0, Math.min(c.maxLuckPoints, c.luckPoints + delta));

            saveState();
            updateTelemetryBar();
            renderCharacterSheet();
        });
    });

    // Add Inventory Item
    const addItemBtn = document.getElementById('add-item-btn');
    const newItemInput = document.getElementById('new-item-input');
    if (addItemBtn && newItemInput) {
        addItemBtn.addEventListener('click', () => {
            const val = newItemInput.value.trim();
            if (val) {
                window.RobCoAudio.click();
                AppState.character.inventory.push(val);
                newItemInput.value = '';
                saveState();
                renderCharacterSheet();
            }
        });
        newItemInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') addItemBtn.click();
        });
    }

    // Export & Save Controls
    document.getElementById('btn-generate-report')?.addEventListener('click', () => {
        window.RobCoAudio.click();
        generateCampaignReport();
        setFooterStatus('Kampagnen-Dossier für die Tisch-Runde wurde aktualisiert.');
    });

    document.getElementById('btn-copy-report')?.addEventListener('click', () => {
        window.RobCoAudio.click();
        const textarea = document.getElementById('campaign-export-text');
        if (textarea) {
            navigator.clipboard.writeText(textarea.value);
            setFooterStatus('Dossier in die Zwischenablage kopiert!');
        }
    });

    document.getElementById('btn-download-save')?.addEventListener('click', () => {
        window.RobCoAudio.click();
        const blob = new Blob([localStorage.getItem(STORAGE_KEY) || '{}'], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `vault84-spielstand-tag-${getCompletedDaysCount()}.json`;
        a.click();
        URL.revokeObjectURL(url);
    });

    document.getElementById('input-load-save')?.addEventListener('change', (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            try {
                const data = JSON.parse(ev.target.result);
                localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
                loadState();
                applyThemeAndEffects();
                updateTelemetryBar();
                renderCalendarGrid();
                renderActiveMission();
                renderCharacterSheet();
                renderVaultDiagnostics();
                generateCampaignReport();
                setFooterStatus('Spielstand erfolgreich geladen!');
            } catch (err) {
                setFooterStatus('FEHLER: Ungültige JSON-Spielstandsdatei.');
            }
        };
        reader.readAsText(file);
    });

    document.getElementById('btn-reset-all')?.addEventListener('click', () => {
        if (confirm('Möchtest du wirklich alle 24 Tage und den Charakter-Fortschritt zurücksetzen?')) {
            localStorage.removeItem(STORAGE_KEY);
            AppState.character = JSON.parse(JSON.stringify(window.DEFAULT_CHARACTER));
            AppState.completedDays = {};
            AppState.activeDay = 1;
            _internalDebugTs = null;
            AppState.debugTimestamp = null;
            AppState.diceHistory = [];
            saveState();
            updateTelemetryBar();
            renderCalendarGrid();
            renderActiveMission();
            renderCharacterSheet();
            renderVaultDiagnostics();
            generateCampaignReport();
            switchTab('calendar');
            setFooterStatus('SYSTEM-RESET DURCHGEFÜHRT.');
        }
    });

    // Footer Hardware Controls
    document.getElementById('btn-theme-toggle')?.addEventListener('click', () => {
        window.RobCoAudio.click();
        const order = ['green', 'amber', 'blue'];
        const nextIdx = (order.indexOf(AppState.theme) + 1) % order.length;
        AppState.theme = order[nextIdx];
        applyThemeAndEffects();
        saveState();
    });

    document.getElementById('btn-sound-toggle')?.addEventListener('click', (e) => {
        window.RobCoAudio.enabled = !window.RobCoAudio.enabled;
        e.target.textContent = `[AUDIO: ${window.RobCoAudio.enabled ? 'AN' : 'AUS'}]`;
        if (window.RobCoAudio.enabled) window.RobCoAudio.click();
    });

    document.getElementById('btn-crt-toggle')?.addEventListener('click', () => {
        window.RobCoAudio.click();
        AppState.crtEnabled = !AppState.crtEnabled;
        applyThemeAndEffects();
        saveState();
    });

    // Character Name & Gender Customization Bindings (Tab 1 Quick-Bar & Tab 3 Personalakte)
    const quickNameInput = document.getElementById('quick-char-name');
    const charNameInput = document.getElementById('char-name-input');

    document.getElementById('btn-quick-char-save')?.addEventListener('click', () => {
        window.RobCoAudio.click();
        applyCharacterIdentityChange({ name: quickNameInput ? quickNameInput.value : '' });
    });

    quickNameInput?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            window.RobCoAudio.click();
            applyCharacterIdentityChange({ name: quickNameInput.value });
        }
    });

    document.getElementById('btn-quick-char-reset')?.addEventListener('click', () => {
        window.RobCoAudio.click();
        applyCharacterIdentityChange({ resetToDefault: true });
    });

    document.getElementById('btn-char-name-save')?.addEventListener('click', () => {
        window.RobCoAudio.click();
        applyCharacterIdentityChange({ name: charNameInput ? charNameInput.value : '' });
    });

    charNameInput?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            window.RobCoAudio.click();
            applyCharacterIdentityChange({ name: charNameInput.value });
        }
    });

    document.getElementById('btn-char-identity-reset')?.addEventListener('click', () => {
        window.RobCoAudio.click();
        applyCharacterIdentityChange({ resetToDefault: true });
    });

    document.querySelectorAll('.gender-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            window.RobCoAudio.click();
            const selectedGender = btn.getAttribute('data-gender');
            applyCharacterIdentityChange({ gender: selectedGender });
        });
    });

    // Initial Renders
    renderCharacterIdentityControls();
    renderCalendarGrid();
    renderActiveMission();
    renderCharacterSheet();
    renderVaultDiagnostics();
    initDiceRollerTab();
    generateCampaignReport();
});
