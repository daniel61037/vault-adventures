/**
 * ==========================================================================
 * FALLOUT 2D20 DICE ENGINE & ROBCO TERMINAL SYNTHESIZER AUDIO
 * Implements official Modiphius 2d20 system mechanics:
 * - Target Number (TN) = Attribute + Skill Rank
 * - Critical Success (2 successes) on roll <= Skill Rank (if Tag Skill) or 1
 * - Complication on roll == 20
 * - Excess successes generate Action Points (AP)
 * - Fallout Combat Dice (CD / d6): 1->1, 2->2, 3-4->0, 5-6->1 + Effect
 * ==========================================================================
 */

window.RobCoAudio = {
    enabled: true,
    ctx: null,

    init() {
        if (!this.ctx) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (AudioCtx) {
                this.ctx = new AudioCtx();
            }
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    },

    beep(freq = 880, durationMs = 35, type = 'square', gainVal = 0.04) {
        if (!this.enabled) return;
        try {
            this.init();
            if (!this.ctx) return;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = type;
            osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
            gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + durationMs / 1000);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start();
            osc.stop(this.ctx.currentTime + durationMs / 1000);
        } catch (e) {
            // Ignore audio errors if blocked by browser autoplay policy
        }
    },

    click() {
        this.beep(1150, 22, 'square', 0.03);
    },

    rollSound() {
        if (!this.enabled) return;
        [520, 680, 840, 1020].forEach((f, idx) => {
            setTimeout(() => this.beep(f, 30, 'sawtooth', 0.035), idx * 45);
        });
    },

    successSound() {
        if (!this.enabled) return;
        [660, 880, 1320].forEach((f, idx) => {
            setTimeout(() => this.beep(f, 70, 'triangle', 0.05), idx * 75);
        });
    },

    failSound() {
        if (!this.enabled) return;
        [320, 210].forEach((f, idx) => {
            setTimeout(() => this.beep(f, 120, 'sawtooth', 0.05), idx * 130);
        });
    }
};

window.Fallout2d20Engine = {
    /**
     * Executes a Fallout 2d20 Skill Test
     * @param {Object} params
     * @param {number} params.attrValue - S.P.E.C.I.A.L. attribute rating
     * @param {number} params.skillRank - Skill rank (0-6)
     * @param {boolean} params.isTag - Whether it is a Tag Skill
     * @param {number} params.difficulty - Required successes (0-5)
     * @param {number} params.numDice - Number of d20s rolled (2 to 5)
     * @param {boolean} params.juryRigging - Ignore 1 complication if repair
     */
    rollSkillTest({ attrValue, skillRank, isTag, difficulty = 1, numDice = 2, juryRigging = false }) {
        const targetNumber = attrValue + skillRank;
        const critThreshold = isTag ? Math.max(1, skillRank) : 1;

        const rolls = [];
        let totalSuccesses = 0;
        let rawComplications = 0;

        for (let i = 0; i < numDice; i++) {
            const val = Math.floor(Math.random() * 20) + 1;
            let successes = 0;
            let isCrit = false;
            let isComplication = false;

            if (val <= critThreshold) {
                successes = 2;
                isCrit = true;
            } else if (val <= targetNumber) {
                successes = 1;
            }

            if (val === 20) {
                isComplication = true;
                rawComplications += 1;
            }

            totalSuccesses += successes;
            rolls.push({
                dieIndex: i + 1,
                value: val,
                successes,
                isCrit,
                isComplication
            });
        }

        const effectiveComplications = juryRigging && rawComplications > 0
            ? rawComplications - 1
            : rawComplications;

        const passed = totalSuccesses >= difficulty;
        const generatedAp = passed ? Math.max(0, totalSuccesses - difficulty) : 0;

        return {
            targetNumber,
            critThreshold,
            difficulty,
            numDice,
            rolls,
            totalSuccesses,
            rawComplications,
            effectiveComplications,
            passed,
            generatedAp,
            timestamp: new Date().toLocaleTimeString('de-DE')
        };
    },

    /**
     * Rolls Fallout 2d20 Combat Dice (CD / d6)
     * 1 = 1 Damage
     * 2 = 2 Damage
     * 3, 4 = 0 Damage
     * 5, 6 = 1 Damage + 1 Effect
     */
    rollCombatDice(count = 4) {
        const faces = [];
        let totalDamage = 0;
        let totalEffects = 0;

        for (let i = 0; i < count; i++) {
            const raw = Math.floor(Math.random() * 6) + 1;
            let dmg = 0;
            let effect = 0;
            let label = '0';

            if (raw === 1) {
                dmg = 1;
                label = '1 SCHADEN';
            } else if (raw === 2) {
                dmg = 2;
                label = '2 SCHADEN';
            } else if (raw === 3 || raw === 4) {
                dmg = 0;
                label = 'LEER (0)';
            } else {
                dmg = 1;
                effect = 1;
                label = '1 SCHADEN + ★ EFFEKT';
            }

            totalDamage += dmg;
            totalEffects += effect;
            faces.push({ raw, dmg, effect, label });
        }

        return {
            count,
            faces,
            totalDamage,
            totalEffects,
            timestamp: new Date().toLocaleTimeString('de-DE')
        };
    }
};
