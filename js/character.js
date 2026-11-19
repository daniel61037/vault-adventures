/**
 * ==========================================================================
 * FALLOUT 2D20 CHARACTER SHEET & VAULT TELEMETRY DATA
 * Default Character: Maren "Sparks" Lindqvist (Name & Gender customizable)
 * ==========================================================================
 */

window.CHARACTER_GENDER_PROFILES = {
    f: {
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
    },
    m: {
        id: 'm',
        label: 'Männlich (Er/Ihm)',
        shortLabel: 'MÄNNLICH',
        origin: 'Vault-Bewohner (Vault 84 - Sub-Alpiner Sektor)',
        role: 'Senior-Wartungstechniker (Schicht Gamma-3)',
        dossierRoleLabel: 'SPIELER-CHARAKTER (TECH-SPEZIALIST DER GRUPPE)',
        calendarWakePhrase: 'einziger wacher Techniker',
        salutationFormal: 'Mister',
        firstAwakened: 'als Ersten',
        possessiveAcc: 'seinen',
        saviorTitle: 'Retter von Vault 84',
        perkOriginName: 'Vault-Bewohner (Herkunft)',
        perkHackerName: 'Hacker & Schaltkreis-Flüsterer (Perk Rang 1)'
    },
    d: {
        id: 'd',
        label: 'Divers / Neutral',
        shortLabel: 'DIVERS / NEUTRAL',
        origin: 'Vault-Bewohner:in (Vault 84 - Sub-Alpiner Sektor)',
        role: 'Senior-Wartungstechniker:in (Schicht Gamma-3)',
        dossierRoleLabel: 'SPIELER:INNEN-CHARAKTER (TECH-SPEZIALIST:IN DER GRUPPE)',
        calendarWakePhrase: 'einzige:r wache:r Techniker:in',
        salutationFormal: 'Mx.',
        firstAwakened: 'als Erste:n',
        possessiveAcc: 'den eigenen',
        saviorTitle: 'Retter:in von Vault 84',
        perkOriginName: 'Vault-Bewohner:in (Herkunft)',
        perkHackerName: 'Hacker:in & Schaltkreis-Flüster:in (Perk Rang 1)'
    }
};

window.DEFAULT_CHARACTER = {
    name: 'Maren "Sparks" Lindqvist',
    gender: 'f', // 'f' | 'm' | 'd'
    origin: 'Vault-Bewohnerin (Vault 84 - Sub-Alpiner Sektor)',
    role: 'Senior-Wartungstechnikerin (Schicht Gamma-3)',
    level: 1,
    xp: 0,
    hp: 11,
    maxHp: 11,
    rad: 0,
    ap: 2,
    maxAp: 6,
    luckPoints: 6,
    maxLuckPoints: 6,
    defense: 1,
    initiative: 12,

    // S.P.E.C.I.A.L. Attributes (Fallout 2d20 Rules)
    attributes: {
        STR: { code: 'STR', label: 'Stärke', short: 'STR', value: 5 },
        PER: { code: 'PER', label: 'Wahrnehmung', short: 'WAH', value: 7 },
        END: { code: 'END', label: 'Ausdauer', short: 'AUS', value: 5 },
        CHA: { code: 'CHA', label: 'Charisma', short: 'CHA', value: 4 },
        INT: { code: 'INT', label: 'Intelligenz', short: 'INT', value: 9 },
        AGI: { code: 'AGI', label: 'Beweglichkeit', short: 'BEW', value: 5 },
        LCK: { code: 'LCK', label: 'Glück', short: 'GLÜ', value: 6 }
    },

    // Fallout 2d20 Skills (Rank 0-6, Tag Skills grant Critical Success on roll <= Rank)
    skills: {
        athletics:     { id: 'athletics',     name: 'Athletik',           defaultAttr: 'STR', rank: 1, tag: false },
        barter:        { id: 'barter',        name: 'Feilschen',          defaultAttr: 'CHA', rank: 0, tag: false },
        big_guns:      { id: 'big_guns',      name: 'Schwere Waffen',     defaultAttr: 'END', rank: 0, tag: false },
        energy_weap:   { id: 'energy_weap',   name: 'Energiewaffen',      defaultAttr: 'PER', rank: 2, tag: true  },
        explosives:    { id: 'explosives',    name: 'Sprengstoff',        defaultAttr: 'PER', rank: 1, tag: false },
        lockpick:      { id: 'lockpick',      name: 'Dietrich',           defaultAttr: 'PER', rank: 2, tag: true  },
        medicine:      { id: 'medicine',      name: 'Medizin',            defaultAttr: 'INT', rank: 2, tag: false },
        melee_weap:    { id: 'melee_weap',    name: 'Nahkampfwaffen',     defaultAttr: 'STR', rank: 1, tag: false },
        pilot:         { id: 'pilot',         name: 'Pilot',              defaultAttr: 'PER', rank: 0, tag: false },
        repair:        { id: 'repair',        name: 'Reparieren',         defaultAttr: 'INT', rank: 3, tag: true  },
        science:       { id: 'science',       name: 'Wissenschaft',       defaultAttr: 'INT', rank: 3, tag: true  },
        small_guns:    { id: 'small_guns',    name: 'Kleine Waffen',      defaultAttr: 'AGI', rank: 0, tag: false },
        sneak:         { id: 'sneak',         name: 'Schleichen',         defaultAttr: 'AGI', rank: 1, tag: false },
        speech:        { id: 'speech',        name: 'Sprache',            defaultAttr: 'CHA', rank: 1, tag: false },
        survival:      { id: 'survival',      name: 'Überleben',          defaultAttr: 'END', rank: 1, tag: false },
        throwing:      { id: 'throwing',      name: 'Werfen',             defaultAttr: 'AGI', rank: 0, tag: false },
        unarmed:       { id: 'unarmed',       name: 'Waffenlos',          defaultAttr: 'STR', rank: 0, tag: false }
    },

    perks: [
        {
            name: 'Vault-Bewohnerin (Herkunft)',
            desc: 'Aufgewachsen unter hygienischer Vault-Tec-Kontrolle: Schwierigkeit aller END-Prüfungen gegen Gift und Krankheit sinkt um -1. Du startest mit einem zusätzlichen Tag-Skill (bereits in Energiewaffen enthalten).'
        },
        {
            name: 'Hackerin & Schaltkreis-Flüsterin (Perk Rang 1)',
            desc: 'Senkt die Schwierigkeit von INT + Wissenschaft-Prüfungen beim Knacken von RobCo-Terminals, Geschütztürmen und Vault-Steuerkonsolen um -1 (Minimum 1).'
        },
        {
            name: 'Jury Rigging / Improvisations-Genie (Perk Rang 1)',
            desc: 'Du kannst defekte Maschinen und Rohrleitungen ohne Original-Ersatzteile flicken. Einmal pro Szene kannst du bei einer Reparieren-Prüfung 1 Komplikation ignorieren.'
        }
    ],

    inventory: [
        'Verstärkter Vault-84-Techniker-Overall (Phys. Res 1, Energie Res 2, Strahlung Res 2)',
        'Pip-Boy 2000 Mk VI (Diagnose-Kopplung & Holoband-Leser)',
        'Modifizierter Lichtbogen-Schweißer (Energiewaffe, 4 CD Energie, Durchdringend 1, Nahbereich)',
        'Schwere Vault-Tec-Hydraulik-Rohrzange (Nahkampf, 2 CD Physisch, Betäubend)',
        'Multi-Meter & Elektronisches Dietrich-Set (+1 Bonus-AP bei erfolgreichem Knacken)',
        '2x Stimpak (Heilt sofort 4 TP oder behandelt 1 kritische Verletzung)',
        '1x RadAway (Entfernt 4 Punkte Strahlungsschaden)',
        '3x RobCo-Sicherungsspule & Isolierband (Ersatzteil-Komponenten)',
        'Schlüsselkarte: Sektor Gamma (Wartungsschächte)'
    ]
};

window.VAULT_SYSTEMS = [
    {
        id: 'power',
        name: '01. FUSIONSKERN & STROMNETZ',
        sector: 'Sub-Level 3 (Reaktorkammer)',
        baseStatus: 10,
        targetStatus: 75,
        daysLinked: [1, 2, 13, 14, 15, 16, 24],
        desc: 'Primäre General-Atomics-Fusionsanlage. Aktuell auf kritischer Notbatterie. Nach Stabilisierung läuft der Reaktor auf 65-75% (Basisbetrieb für die Gruppe, erfordert externen G.E.E.K.-Regulator für 100%).'
    },
    {
        id: 'atmo',
        name: '02. SAUERSTOFF & CRYO-HEIZUNG',
        sector: 'Sub-Level 1 (Atrium & Lüftung)',
        baseStatus: 15,
        targetStatus: 80,
        daysLinked: [3, 4, 5, 22],
        desc: 'CO2-Wäscher und Wärmetauscher. Vereiste Lüftungsschächte lassen die Temperatur im Vault auf -8°C fallen.'
    },
    {
        id: 'water',
        name: '03. WASSERAUFBEREITUNG & HYDROPONIK',
        sector: 'Sub-Level 2 (Aquifer & Agrar)',
        baseStatus: 5,
        targetStatus: 70,
        daysLinked: [6, 7, 8, 9, 17, 18],
        desc: 'Tiefenbrunnen-Pumpen und Nährstoff-Tanks. Schweres Kühlmittel-Leck droht die Saatgut-Reserve zu kontaminieren.'
    },
    {
        id: 'robotics',
        name: '04. AUTOMATION & SICHERHEIT',
        sector: 'Alle Ebenen (Wartungsnetz)',
        baseStatus: 10,
        targetStatus: 75,
        daysLinked: [10, 11, 12, 19],
        desc: 'Mr. Handy Wartungseinheiten, Protektrons und interne Geschütztürme. Durch korrupte Speicherprotokolle aktuell im feindseligen Sperrmodus.'
    },
    {
        id: 'medcryo',
        name: '05. KRYO-KAPSELN & KRANKENSTATION',
        sector: 'Sub-Level 2 (Kryo-Flügel Alpha & Beta)',
        baseStatus: 20,
        targetStatus: 85,
        daysLinked: [1, 12, 23, 24],
        desc: '118 Bewohner von Vault 84 liegen in Stase. Die Auftau-Sequenz kann erst eingeleitet werden, wenn Strom, Wasser und Wärme stabil sind.'
    },
    {
        id: 'comms',
        name: '06. SENSOR-PHALANX & AUSSEN-SCHOTT',
        sector: 'Oberflächen-Zugang & Kommandozentrale',
        baseStatus: 0,
        targetStatus: 65,
        daysLinked: [20, 21, 22, 24],
        desc: 'Zahnrad-Panzertor 84 und Langstrecken-Funkmast. Verbindet den Vault mit dem verschneiten Ödland und liefert die Quest-Hooks für die spätere Gruppen-Kampagne.'
    }
];

window.VAULT_ASCII_BLUEPRINT = `
   [OBERFLÄCHE: SCHNEETAL & POSEIDON-RELAIS]    <-- [FUNKMAST / SENSOR-PHALANX (TAG 21)]
======================||=============================================================
   EBENE 0: ZAHNRAD-PANZERTOR 84 & DEKONTAMINATIONS-SCHLEUSE (TAG 20, 22)
----------------------||-------------------------------------------------------------
   EBENE 1: ATRIUM, KOMMANDOZENTRALE & LÜFTUNGSWERK (TAG 3, 4, 5, 19)
            |-- [AUFSEHER-BÜRO & ZENTRALRECHNER]
            +-- [ATMOSPHÄREN-FILTER & WÄRMETAUSCHER]
----------------------||-------------------------------------------------------------
   EBENE 2: KRYO-FLÜGEL, MED-STATION & HYDROPONIK (TAG 1, 8, 9, 12, 17, 18, 23)
            |-- [KRYO-SEKTOR ALPHA/BETA: 118 SCHLÄFER]
            |-- [WASSERCHIP-PUMPWERK & FILTERBECKEN (TAG 6, 7)]
            +-- [ROBOTER-FERTIGUNG & WERKSTATT (TAG 10, 11)]
----------------------||-------------------------------------------------------------
   EBENE 3: REAKTORKAMMER & TIEFEN-GEOTHERMIE (TAG 2, 13, 14, 15, 16, 24)
            |-- [GENERAL ATOMICS FUSIONSKERN MK IV]
            +-- [VERSIEGELTES SCHOTT: SUB-LEVEL 4 "PROJEKT PERMAFROST" (RPG-HOOK!)]
=====================================================================================`;
