/**
 * ==========================================================================
 * VAULT 84 ADVENT CALENDAR - STORY DATA PART 1 (DAYS 1 - 8)
 * Dynamic Multi-Phase 2d20 Encounters with Noticeable Inter-Phase Consequences.
 * ==========================================================================
 */

window.STORY_DAYS_PART1 = [
    {
        day: 1,
        title: 'Kaltstart in Kammer Gamma-3',
        sector: 'Sub-Level 2 // Kryo-Wartungsbucht & Schleusengang',
        systemId: 'medcryo',
        logHeader: 'LOGBUCH-EINTRAG #84-01 // 01. DEZEMBER 2287 // 06:00 UHR',
        story: [
            'Ein stechender Geruch von verdampfendem flüssigem Stickstoff und verbranntem Isolierband reißt dich aus der Schwärze des Kälteschlafs. Zischend schießt dichter, weißer Nebel in die Kammer, als die Notentriegelung deiner Kryo-Kapsel mit einem metallischen Knall aufspringt. Deine Beine versagen den Dienst, und du stürzt vornüber auf den eiskalten Stahlgitterrost von Wartungsbucht Gamma-3.',
            'Auf deinem Unterarm erwacht dein Pip-Boy 2000 Mk VI mit heiserem Knistern zum Leben: „WARNUNG: ZENTRALER SYSTEMAUSFALL IN VAULT 84. PRIMÄRREAKTOR OFFLINE. LEBENSERHALTUNG DER KRYO-SEKTOREN BEI 12%. VERBLEIBENDE ZEIT BIS ZUM ZELLTOD DER 118 BEWOHNER: 24 TAGE.“',
            'Du bist {{CHAR_FULL_NAME}}. Doch bevor du überhaupt zum Hauptkorridor vordringen kannst, musst du erst deine eingefrorene Ausrüstung bergen und dann das verkantete Panzerschott öffnen.'
        ],
        quote: '„Wenn du diesen Log-Eintrag hörst, {{CHAR_FIRST}}, hat die Automatik dich {{CHAR_FIRST_AWAKENED}} geweckt. Bring die Systeme Schritt für Schritt hoch – oder Vault 84 wird unser aller Grab.“ — Sprachnotiz von Chefingenieur Kovacs',
        phases: [
            {
                phaseTitle: 'ETAPPE 1: ERWACHEN IN DER KÄLTE & NOT-DIAGNOSE',
                intro: 'Zitternd vor Unterkühlung ziehst du dich am Geländer hoch. Deine Werkzeugtasche klemmt hinter einer vereisten Abdeckung, während der Diagnose-Bus deines Pip-Boys wirre Störsignale empfängt.',
                consequence: {
                    onSuccess: { tag: 'VORTEIL', text: 'Ruhiger System-Check: +1 AP und +1 Gratis-W20 für das Öffnen des Schotts in Etappe 2!', apMod: 1, bonusDice: 1 },
                    onFail: { tag: 'STÖRUNG', text: 'Fieberhafte Hektik & Funkenschlag: -1 TP und Schwierigkeit in Etappe 2 steigt um +1!', hpMod: -1, diffMod: 1 }
                },
                choices: [
                    {
                        id: '1_1A',
                        label: 'Pip-Boy an den lokalen Diagnose-Bus koppeln & Störung isolieren',
                        attr: 'INT',
                        skill: 'science',
                        difficulty: 1,
                        desc: 'Lies die Fehlerprotokolle der Katastrophennacht aus und trenne das defekte Heizrelais softwareseitig vom Türkreis.',
                        successText: 'Sauberer Scan! Du isolierst den Kurzschluss im ersten Anlauf und lädst einen frischen Schaltplan des Ausgangsschotts auf deinen Pip-Boy.',
                        failText: 'Der überladene Bus spuckt einen garstigen elektrischen Rückstoß in deinen Handschuh (-1 TP) und erschwert die weitere Arbeit.',
                        rewardItem: 'Telemetrie-Logbuch der Katastrophennacht',
                        campaignNote: 'Tag 1 (Etappe 1): Diagnose-Logbuch erfolgreich ausgelesen.'
                    },
                    {
                        id: '1_1B',
                        label: 'Vereisten Werkzeugspind mit dem Stemmeisen aufhebeln',
                        attr: 'STR',
                        skill: 'athletics',
                        difficulty: 1,
                        desc: 'Stemme dein ganzes Körpergewicht gegen das zugefrorene Spindschloss, um deine schwere Rohrzange und Isolierhandschuhe zu befreien.',
                        successText: 'Mit einem trockenen Knacken springt das Eis auf! Du schnappst dir deine schwere Rohrzange und das frische Isolierband.',
                        failText: 'Du rutschst auf dem vereisten Rost aus und schlägst hart gegen die Kante (-1 TP), bevor der Spind endlich nachgibt.',
                        rewardItem: 'Schwere Vault-Tec-Rohrzange (Wartungsset)',
                        campaignNote: 'Tag 1 (Etappe 1): Notfallwerkzeug unter Kälteeinwirkung befreit.'
                    }
                ]
            },
            {
                phaseTitle: 'ETAPPE 2: DAS VERKANTETE PANZERSCHOTT',
                introOnSuccess: 'Bestens ausgerüstet und mit klarem Überblick über die Schaltpläne trittst du vor das massive hydraulische Schott zum Hauptkorridor.',
                introOnFail: 'Mit schmerzenden Prellungen und flackerndem Notlicht stehst du vor dem Panzerschott – durch die vorherige Störung knistern die Türrelais nun noch unberechenbarer!',
                choices: [
                    {
                        id: '1_2A',
                        label: 'Türsteuerungs-Relais überbrücken & Schott elektronisch öffnen',
                        attr: 'INT',
                        skill: 'science',
                        difficulty: 1,
                        desc: 'Sende einen gezielten Steuerimpuls in die Magnetverriegelung und umgehe den durchgebrannten Logikbaustein.',
                        successText: 'Mit einem tiefen Summen gleitet das massive Panzerschott zur Seite! Der Weg in Vault 84 ist frei, und du sicherst ein intaktes Überspannungsmodul.',
                        failText: 'Ein weiterer Funkenschlag versengt deine Finger (-1 TP), bevor das Relais endlich schaltet und das Schott ruckelnd aufspringt.',
                        rewardItem: 'Intaktes RobCo-Überspannungsmodul',
                        campaignNote: 'Tag 1: Kryo-Wartungsbucht Gamma-3 erfolgreich entriegelt.'
                    },
                    {
                        id: '1_2B',
                        label: 'Hydraulik-Bypass mechanisch aufdrücken',
                        attr: 'INT',
                        skill: 'repair',
                        difficulty: 1,
                        desc: 'Leite den Restdruck der Stickstoffleitung über das manuelle Bypass-Ventil direkt in den Türzylinder um.',
                        successText: 'Der Druckzylinder zischt, die Verriegelungsbolzen schnappen zurück und das Schott fährt auf! Nebenbei rettest du eine Kupfer-Hochdruckdichtung.',
                        failText: 'Das Ventil wehrt sich hartnäckig (-1 TP durch Muskelzerrung), doch am Ende zwingst du das Schott weit genug auf, um hindurchzuschlüpfen.',
                        rewardItem: 'Kupferne Hochdruckdichtung',
                        campaignNote: 'Tag 1: Hydraulik von Bucht Gamma-3 manuell geöffnet.'
                    }
                ]
            }
        ]
    },
    {
        day: 2,
        title: 'Funkenflug im Hilfsgeneratorraum',
        sector: 'Sub-Level 2 // Sekundär-Umspannwerk',
        systemId: 'power',
        logHeader: 'LOGBUCH-EINTRAG #84-02 // 02. DEZEMBER 2287 // 07:30 UHR',
        story: [
            'Ohne eine verlässliche Stromversorgung sind weder Aufzüge noch Wasserpumpen nutzbar. Bei flackerndem Taschenlampenlicht erreichst du das Sekundär-Umspannwerk von Ebene 2.',
            'Schon im Vorraum riecht es scharf nach Ozon und geschmolzenem Kupfer. Drei der vier großen Blei-Säure-Pufferbatterien wurden durch das Beben aus ihren Verankerungen gerissen, und blaue Lichtbögen peitschen über den feuchten Boden.'
        ],
        quote: '„Achtung beim Hantieren an den Pufferbänken der Baureihe 2074: Vor Berührung stets die Schutzerdung und den Haupttrenner prüfen!“ — RobCo Techniker-Merkblatt #14',
        phases: [
            {
                phaseTitle: 'ETAPPE 1: GEFAHRENZONE & HAUPTTRENNER',
                intro: 'Bevor du an die abgerissenen Starkstromschienen herantreten kannst, musst du durch den mit Säurespritzern und Funken übersäten Vorraum zum Haupttrenner vordringen.',
                consequence: {
                    onSuccess: { tag: 'VORTEIL', text: 'Spannung sicher geerdet: Schwierigkeit in Etappe 2 sinkt um -1 (mind. 1) + 1 Gratis-W20!', diffMod: -1, bonusDice: 1 },
                    onFail: { tag: 'STÖRUNG', text: 'Lichtbogen-Entladung! -1 TP und Schwierigkeit in Etappe 2 steigt um +1!', hpMod: -1, diffMod: 1 }
                },
                choices: [
                    {
                        id: '2_1A',
                        label: 'Über die trockenen Kabeltrassen zum Not-Aus balancieren',
                        attr: 'AGI',
                        skill: 'athletics',
                        difficulty: 1,
                        desc: 'Meide die leitenden Pfützen am Boden und hangele dich über die stählernen Deckenhalterungen bis zum Not-Trennschalter.',
                        successText: 'Geschickt schwingst du dich über die knisternden Funken hinweg und wirfst den schweren Hebel des Haupttrenners um!',
                        failText: 'Ein Kabel reißt unter deinem Gewicht – du landest im flachen Säurefilm und ein Funken streift dein Bein (-1 TP).',
                        rewardItem: 'Säurefeste Gummi-Überziehstiefel',
                        campaignNote: 'Tag 2 (Etappe 1): Haupttrenner im Umspannwerk unter Einsatz erreicht.'
                    },
                    {
                        id: '2_1B',
                        label: 'Sicherungsschrank aus der Distanz per Diagnose-Skript entladen',
                        attr: 'INT',
                        skill: 'science',
                        difficulty: 1,
                        desc: 'Nutze das Wand-Interface vor der Tür, um eine kontrollierte Kurzschluss-Entladung über die Abflusswiderstände zu erzwingen.',
                        successText: 'Ein tiefes Brummen durchläuft den Raum, dann verstummt das tödliche Peitschen der Lichtbögen schlagartig!',
                        failText: 'Die Widerstände glühen überlastet auf und ein kleiner Sicherungskasten platzt in deiner Nähe (-1 TP).',
                        rewardItem: 'RobCo Hochlast-Widerstandssatz',
                        campaignNote: 'Tag 2 (Etappe 1): Kondensatorladung über Wandterminal abgebaut.'
                    }
                ]
            },
            {
                phaseTitle: 'ETAPPE 2: WIEDERHERSTELLUNG DER STROMSCHIENEN',
                introOnSuccess: 'Da die wilden Lichtbögen gebändigt sind, hast du freie Bahn an der großen Verteilerbank der Pufferbatterien.',
                introOnFail: 'Noch immer zucken gefährliche Restentladungen durch den Raum und hüllen die Arbeitsfläche in beißenden Rauch – höchste Vorsicht ist geboten!',
                choices: [
                    {
                        id: '2_2A',
                        label: 'Erdungsschienen mit dem Lichtbogen-Schweißer neu verschweißen',
                        attr: 'INT',
                        skill: 'repair',
                        difficulty: 1,
                        desc: 'Setze deinen Lichtbogen-Schweißer an und verbinde die dicken Kupferschienen wieder fest mit dem Stahlfundament.',
                        successText: 'Präzisionsarbeit! Das beruhigende Summen des 400-Hz-Bordnetzes kehrt zurück und die Beleuchtung auf Ebene 2 springt auf 60%.',
                        failText: 'Ein Schweißspritzer brennt sich durch deinen Ärmel (-1 TP), doch die Naht hält und der Hilfsstrom fließt.',
                        rewardItem: 'Hochleistungs-Kupferspule & Erdungsrelais',
                        campaignNote: 'Tag 2: Sekundär-Umspannwerk auf Ebene 2 stabilisiert.'
                    },
                    {
                        id: '2_2B',
                        label: 'Transformator-Phasen per Terminal asynchron harmonisieren',
                        attr: 'INT',
                        skill: 'science',
                        difficulty: 2,
                        desc: 'Trenne die zerstörte Zelle 3 softwareseitig vom Hauptbus und verteile die Last über eine Phasenverschiebung auf die übrigen Zellen.',
                        successText: 'Brillanter Patch! Du holst 15% mehr Effizienz heraus und findest im Schacht eine versteckte Nuka-Cola Quantum!',
                        failText: 'Zelle 3 knallt mit Wucht durch (-1 TP), bevor dein Not-Skript greift und das Netz stabilisiert.',
                        rewardItem: 'Eiskalte Nuka-Cola Quantum (+5 AP bei Verzehr)',
                        campaignNote: 'Tag 2: Transformator-Phasen digital harmonisiert.'
                    }
                ]
            }
        ]
    },
    {
        day: 3,
        title: 'Eiszeit im Hauptatrium',
        sector: 'Sub-Level 1 // Großes Atrium & Lüftungszentrale',
        systemId: 'atmo',
        logHeader: 'LOGBUCH-EINTRAG #84-03 // 03. DEZEMBER 2287 // 08:15 UHR',
        story: [
            'Mit dem wiederhergestellten Hilfsstrom fährst du hinauf ins Hauptatrium auf Ebene 1. Eine arktische Kälte von minus 11 Grad empfängt dich; dicker Raureif überzieht die Diner-Tische und die Wurlitzer-Jukebox.',
            'Die Ursache: Durch die offen stehenden Oberflächen-Lüftungsschächte strömt eisige Gebirgsluft herein, weil die schweren Lamellenklappen der Vorwärmkammer komplett zugefroren sind.'
        ],
        quote: '„Umgebungstemperatur im Atrium: -11,2 °C. Frostschäden an den tragenden Rohren von Sektor B drohen.“ — RobCo Gebäudeleitsystem',
        phases: [
            {
                phaseTitle: 'ETAPPE 1: EINSTIEG IN DEN VEREISTEN LÜFTUNGSSCHACHT',
                intro: 'Die Wartungsluke über dem Atrium-Diner hängt vier Meter über dem Boden und ist mit einer dicken Eisschicht verkrustet.',
                consequence: {
                    onSuccess: { tag: 'VORTEIL', text: 'Sauberer Zugang & trockene Hände: +1 AP und +1 Gratis-W20 für die Hauptklappe!', apMod: 1, bonusDice: 1 },
                    onFail: { tag: 'STÖRUNG', text: 'Klamme Finger & Eissturz: -1 TP und Schwierigkeit +1 in Etappe 2!', hpMod: -1, diffMod: 1 }
                },
                choices: [
                    {
                        id: '3_1A',
                        label: 'Vereistes Wartungsschloss mit feinem Werkzeug aufstemmen',
                        attr: 'PER',
                        skill: 'lockpick',
                        difficulty: 1,
                        desc: 'Erwärme den Schlosszylinder kurz mit deinem Feuerzeug und löse die verharzte Sicherheitsverriegelung der Dachluke.',
                        successText: 'Klick! Die Luke schwingt sauber auf und du ziehst dich mühelos in den trockeneren Wartungskriechgang.',
                        failText: 'Das Werkzeug rutscht am Eis ab und du stößt dir die Knöchel blutig (-1 TP), bevor der Riegel nachgibt.',
                        rewardItem: 'Sturmfeuerzeug & Ersatz-Spanner',
                        campaignNote: 'Tag 3 (Etappe 1): Dachluke zum Lüftungsschacht geknackt.'
                    },
                    {
                        id: '3_1B',
                        label: 'Über das Diner-Gerüst zur Schachtklappe hochklettern',
                        attr: 'STR',
                        skill: 'athletics',
                        difficulty: 1,
                        desc: 'Klettere am Stahlträger des Diner-Schilds empor und stemme die eingefrorene Revisionsklappe mit Schulterkraft auf.',
                        successText: 'Mit einem satten Ruck bricht das Eis am Rahmen auf – du stehst sicher vor den großen Lamellen!',
                        failText: 'Eine vereiste Sprosse bricht unter deinem Stiefel (-1 TP), bevor du dich gerade noch hochziehst.',
                        rewardItem: '2x Rationen Cram',
                        campaignNote: 'Tag 3 (Etappe 1): Über das Atrium-Gerüst in den Schacht vorgedrungen.'
                    }
                ]
            },
            {
                phaseTitle: 'ETAPPE 2: DIE ZUGEFRORENEN LAMELLENKLAPPEN',
                introOnSuccess: 'Im Kriechgang vor dir ragen die riesigen vereisten Klappen auf – dank deines glatten Einstiegs hast du perfekten Stand.',
                introOnFail: 'Zitternd vor Kälte und mit geprellten Fingern kauerst du im zugigen Schacht vor den vereisten Lamellen.',
                choices: [
                    {
                        id: '3_2A',
                        label: 'Heißdampf-Umleitung auf die gefrorenen Scharniere legen',
                        attr: 'INT',
                        skill: 'repair',
                        difficulty: 1,
                        desc: 'Kappe die Drosselblende der Hilfsdampfleitung und richte den heißen Dampfstrahl auf die blockierten Scharniere.',
                        successText: 'Mit lautem Knacken platzt der Eispanzer ab! Warme Luft strömt ins Atrium, und du findest im Schacht einen Feinmechaniker-Werkzeugsatz!',
                        failText: 'Ein Schwall heißes Kondenswasser tropft dir in den Kragen (-1 TP), doch die Klappen schnappen endlich zu.',
                        rewardItem: 'Feinmechaniker-Werkzeugsatz (RobCo Spezial)',
                        campaignNote: 'Tag 3: Lüftungsklappen im Atrium enteist und Heizung gestartet.'
                    },
                    {
                        id: '3_2B',
                        label: 'Gusseisernes Hauptstellrad mit Hebelrohr aufbrechen',
                        attr: 'STR',
                        skill: 'athletics',
                        difficulty: 1,
                        desc: 'Klemme ein langes Stahlrohr als Hebel in das Handrad und stemme dich mit vollem Gewicht gegen das Eis.',
                        successText: 'Knirschend gibt das Eis nach! Die Gebläse erwachen donnernd zum Leben und wärmen den Wohnring.',
                        failText: 'Das Rohr verrutscht kurz und prellt deine Rippen (-1 TP), bevor das Rad im zweiten Anlauf dreht.',
                        rewardItem: 'Verstärktes Stahlhebel-Rohr',
                        campaignNote: 'Tag 3: Hauptstellrad der Atrium-Lüftung manuell aufgebrochen.'
                    }
                ]
            }
        ]
    },
    {
        day: 4,
        title: 'Toxischer Nebel in den CO2-Wäschern',
        sector: 'Sub-Level 1 // Atmosphären-Filterwerk',
        systemId: 'atmo',
        logHeader: 'LOGBUCH-EINTRAG #84-04 // 04. DEZEMBER 2287 // 09:00 UHR',
        story: [
            'Kaum taut die Heizung das System auf, schrillt der Gassensor deines Pip-Boys: Im Atmosphären-Filterwerk ist der Druckbehälter von CO2-Wäscher #2 geplatzt!',
            'Ätzender, grünlicher Calciumhydroxid-Staub wälzt sich durch die Kammer. Gelangt das Giftgas in die Kryo-Buchten, ersticken die 118 Schläfer.'
        ],
        quote: '„Kalknatron-Filtertrommeln der Klasse IV-B bei Berührung mit feuchter Haut sofort abspülen – schwere Verätzungsgefahr.“ — Sicherheitsvorschrift Schleuse 04',
        phases: [
            {
                phaseTitle: 'ETAPPE 1: SCHUTZ VOR DEM ÄTZENDEN GAS',
                intro: 'Bevor du die 35-kg-Ersatztrommel montieren kannst, musst du die Sichtweite verbessern und deine Atemwege gegen das beißende Pulver schützen.',
                consequence: {
                    onSuccess: { tag: 'VORTEIL', text: 'Saubere Sicht & klarer Kopf: +1 Gratis-W20 und Schwierigkeit -1 (mind. 1) in Etappe 2!', diffMod: -1, bonusDice: 1 },
                    onFail: { tag: 'STÖRUNG', text: 'Beißender Staub in den Augen: -1 TP und Schwierigkeit +1 in Etappe 2!', hpMod: -1, diffMod: 1 }
                },
                choices: [
                    {
                        id: '4_1A',
                        label: 'Aktivkohle-Atemfilter & Dichtungsbrille improvisieren',
                        attr: 'END',
                        skill: 'survival',
                        difficulty: 1,
                        desc: 'Tränke ein dickes Filtertuch mit Essiglösung aus dem Vorratsschrank und dichte deine Schutzbrille mit Isolierband ab.',
                        successText: 'Perfekte Improvisation! Du atmest ruhig und behältst selbst mitten in der Wolke klare Sicht.',
                        failText: 'Beim Binden weht ein Zug des scharfen Staubs in deinen Hals; heftiger Husten schüttelt dich (-1 TP).',
                        rewardItem: 'Intakte Vault-Tec Atemschutzmaske (+2 Gift-Resistenz)',
                        campaignNote: 'Tag 4 (Etappe 1): Improvisierter Atemschutz gefertigt.'
                    },
                    {
                        id: '4_1B',
                        label: 'Not-Abluftklappe zum Gebirgsschacht elektronisch öffnen',
                        attr: 'INT',
                        skill: 'science',
                        difficulty: 1,
                        desc: 'Hacke die Sicherheitssperre an der Schleusenwand, um den Abluftventilator auf 150% Schub zu schalten und den Nebel kurzzeitig abzusaugen.',
                        successText: 'Der Ventilator heult auf und reißt eine breite Schneise aus klarer Luft quer durch die Kammer!',
                        failText: 'Die Überlastung lässt einen Schaltkreis durchbrennen (-1 TP durch Funkenflug), und der Nebel bleibt dicht.',
                        rewardItem: 'Satz Präzisions-Schaltsicherungen',
                        campaignNote: 'Tag 4 (Etappe 1): Not-Abluft im Filterwerk geschaltet.'
                    }
                ]
            },
            {
                phaseTitle: 'ETAPPE 2: AUSTAUSCH DER FILTERTROMMEL',
                introOnSuccess: 'Gut geschützt und mit freiem Blickfeld packst du die frische Vorkriegs-Kalknatron-Trommel.',
                introOnFail: 'Tränenden Auges und hustend kämpfst du dich durch den dichten, giftigen Staub zur Halterung von Wäscher #2 vor.',
                choices: [
                    {
                        id: '4_2A',
                        label: 'Die 35-kg-Kartusche von Hand in die Führung wuchten',
                        attr: 'END',
                        skill: 'survival',
                        difficulty: 1,
                        desc: 'Stemme die alte, geplatzte Kartusche aus dem Bajonettverschluss und ramme die neue Trommel in die Gummidichtung.',
                        successText: 'Die Bolzen schnappen ein! Die Luftwerte im gesamten Wohnring springen sofort zurück auf GRÜN.',
                        failText: 'Du verlierst kurz das Gleichgewicht und schürfst dir den Arm am Metallrahmen auf (-1 TP), bevor die Trommel einrastet.',
                        rewardItem: 'Reserve-Dichtungsring (Industriegröße)',
                        campaignNote: 'Tag 4: CO2-Wäscher gereinigt und neue Filtertrommel eingesetzt.'
                    },
                    {
                        id: '4_2B',
                        label: 'Pneumatischen Greifarmkran per Joystick steuern',
                        attr: 'PER',
                        skill: 'lockpick',
                        difficulty: 2,
                        desc: 'Knacke die verriegelte Kran-Steuerbox und manövriere die Kartusche millimetergenau mit dem Deckenkran in die Fassung.',
                        successText: 'Chirurgische Präzision per Kranarm! Die Trommel rastet lautlos ein, ohne dass du einen Schritt zu viel ins Gas musst.',
                        failText: 'Der Kranarm schrammt krachend gegen das Gehäuse (-1 Glückspunkt), bevor die Trommel endlich sitzt.',
                        rewardItem: 'RobCo Kran-Steuermodul',
                        campaignNote: 'Tag 4: Filtertausch erfolgreich per Greifarmkran abgeschlossen.'
                    }
                ]
            }
        ]
    },
    {
        day: 5,
        title: 'Das Geister-Terminal der Aufseherin',
        sector: 'Sub-Level 1 // Aufseher-Kommandozentrale & Archiv',
        systemId: 'security',
        logHeader: 'LOGBUCH-EINTRAG #84-05 // 05. DEZEMBER 2287 // 11:20 UHR',
        story: [
            'Zeit für Antworten: Warum fiel das gesamte Netz gleichzeitig aus? Du betrittst die erhabene Aufseher-Kommandozentrale von Eleanor Vance.',
            'Auf dem Mahagoni-Schreibtisch steht eine zu braunem Eis gefrorene Kaffeetasse. Ihr privates RobCo Master-Terminal 3000 läuft im Batterie-Notbetrieb und zeigt eine verschlüsselte Datei: „PROJEKT PERMAFROST // SUB-LEVEL 4“.'
        ],
        quote: '„Im Falle externer Störungen ist Sub-Level 4 unter allen Umständen isoliert zu halten. Das Personal benötigt keine Kenntnis über die kryogenen Prototypen.“ — Aufseher-Notiz',
        phases: [
            {
                phaseTitle: 'ETAPPE 1: SICHERHEITSSCHLEUSE & STROMVERSORGUNG',
                intro: 'Das gepanzerte Panzerglas-Büro ist im Lockdown-Modus verriegelt, und ein stilles Decken-Warnauge tastet das Schloss ab.',
                consequence: {
                    onSuccess: { tag: 'VORTEIL', text: 'Alarm umgangen! +1 AP und Schwierigkeit -1 (mind. 1) in Etappe 2!', apMod: 1, diffMod: -1 },
                    onFail: { tag: 'STÖRUNG', text: 'Sicherheits-Lockdown aktiviert! -1 TP durch Schockpuls & Schwierigkeit +1 in Etappe 2!', hpMod: -1, diffMod: 1 }
                },
                choices: [
                    {
                        id: '5_1A',
                        label: 'Magnetkartenschloss der Bürotür lautlos mit Dietrich überbrücken',
                        attr: 'PER',
                        skill: 'lockpick',
                        difficulty: 1,
                        desc: 'Hebe die Notfall-Mechanikblende unter dem Kartenleser an und schiebe den Sperrbolzen mechanisch zurück, ohne den Sensor auszulösen.',
                        successText: 'Flüsterleise gleitet die Bürotür auf – das interne Verteidigungssystem bemerkt deinen Eintritt nicht einmal!',
                        failText: 'Ein Kontaktstift löst eine kleine Schockentladung in deinem Werkzeug aus (-1 TP), und das Master-Terminal geht in erhöhte Alarmbereitschaft.',
                        rewardItem: 'Magnet-Dietrich-Aufsatz',
                        campaignNote: 'Tag 5 (Etappe 1): Aufseher-Büro lautlos betreten.'
                    },
                    {
                        id: '5_1B',
                        label: 'Notstromleitung zum Büro-Terminal über den Bodenschacht stabilisieren',
                        attr: 'INT',
                        skill: 'repair',
                        difficulty: 1,
                        desc: 'Schließe das flackernde Terminal an eine frische Hilfsleitung an, damit sich der Speicher beim Zugriff nicht selbst löscht.',
                        successText: 'Die Anzeige leuchtet satt und stabil grün – du verhinderst einen drohenden Datenverlust.',
                        failText: 'Eine Sicherung im Bodenkanal knallt durch (-1 TP), bevor der Strom stabil steht.',
                        rewardItem: 'RobCo Speicher-Kondensator',
                        campaignNote: 'Tag 5 (Etappe 1): Stromversorgung des Aufseher-Büros gesichert.'
                    }
                ]
            },
            {
                phaseTitle: 'ETAPPE 2: GEHEIMNISSE DER AUFSEHERIN',
                introOnSuccess: 'Im stillen Büro liegt die volle Konsole frei vor dir. Kein Countdown, kein Alarm – du kannst in Ruhe arbeiten.',
                introOnFail: 'Ein rotes Warnlicht blinkt hektisch über dem Schreibtisch – du hast nur wenige Sekunden, bevor die Schutzsicherung greift!',
                choices: [
                    {
                        id: '5_2A',
                        label: 'Master-Terminal mit Pip-Boy-Brute-Force hacken',
                        attr: 'INT',
                        skill: 'science',
                        difficulty: 2,
                        desc: 'Umgehe die dreistufige Passwort-Matrix („EVERGREEN2077“) und sichere die Zugangscodes für die unteren Ebenen.',
                        successText: 'Geknackt! Du ziehst den Generalschlüssel für Ebene 2/3 sowie das erste Code-Fragment für Sub-Level 4 („ALPHA-PERMA“)!',
                        failText: 'Eine Bios-Gegenmaßnahme piept schrill (-1 AP), doch im letzten Moment rettest du das Fragment.',
                        rewardItem: 'Aufseher-Generalschlüssel & Code-Fragment 1 („ALPHA-PERMA“)',
                        campaignNote: 'Tag 5: Aufseher-Terminal gehackt und erstes Code-Fragment geborgen.'
                    },
                    {
                        id: '5_2B',
                        label: 'Geheimfach im Mahagoni-Schreibtisch aufbrechen',
                        attr: 'PER',
                        skill: 'lockpick',
                        difficulty: 2,
                        desc: 'Finde den versteckten Hohlraum unter der Tischplatte und knacke das Tresorschloss.',
                        successText: 'Klick! Du bergest Eleanor Vances gravierte 10mm-Dienstpistole, Munition und ihr persönliches Tagebuch!',
                        failText: 'Die Haarnadel bricht ab und du kratzt dir beim Hebeln die Hand auf (-1 TP), bis das Fach aufspringt.',
                        rewardItem: 'Eleanor Vances 10mm-Dienstpistole (3 CD Schaden) & Tagebuch',
                        campaignNote: 'Tag 5: Geheimtresor der Aufseherin geknackt; Dienstwaffe gesichert.'
                    }
                ]
            }
        ]
    },
    {
        day: 6,
        title: 'Das versunkene Wasserwerk & Kovacs’ Nikolaus-Päckchen',
        sector: 'Sub-Level 3 // Primär-Pumpenstation & Filterbecken',
        systemId: 'water',
        logHeader: 'LOGBUCH-EINTRAG #84-06 // 06. DEZEMBER 2287 // 07:00 UHR [NIKOLAUSTAG]',
        story: [
            '6. Dezember – Nikolaustag! Als du zu Sub-Level 3 hinabsteigst, steht das gesamte Hauptpumpwerk hüfthoch unter eiskaltem, rostigem Wasser. Ohne sauberes Wasser laufen die Reaktor-Kühlkreise trocken.',
            'Und direkt vor dir an Spind 06 steckt etwas Unerwartetes in deinen schweren Ersatz-Arbeitsstiefeln: ein wasserdicht in Ölpapier gewickeltes Päckchen mit Kovacs’ Handschrift! Aber zuerst musst du das Flutbecken unter Kontrolle bringen, um überhaupt an Spind 06 und die Turbine heranzukommen.'
        ],
        quote: '„Ohne Wasser kein Reaktor, ohne Reaktor kein Vault. Wenn die Pumpen stehen, zählen wir die Stunden bis zum Kältetod.“ — Schild über Schott 03',
        specialGift: {
            badge: '★ SONDER-GESCHENK ZUM NIKOLAUSTAG (6. DEZEMBER) ★',
            title: 'Kovacs’ Verschnürtes Nikolaus-Päckchen (Schicht Gamma-3)',
            text: 'Mit klammen Fingern öffnest du das Päckchen deines Lehrmeisters! Trotz der Krise hat der alte Chefingenieur an dich gedacht. Im Päckchen stecken echte Schätze für das Solo-Abenteuer und eure spätere Tisch-Runde:',
            items: [
                '★ NIKOLAUS-GESCHENK: Vault-Boy-Wackelpuppe „Reparieren“ (Erhöht dauerhaft deinen Krit-Bereich bei Reparieren-Prüfungen in der RPG-Runde um +1!)',
                '★ NIKOLAUS-GESCHENK: Vorkriegs-Magazin „Nikola Tesla & Sie“ (Einmalig +1 automatischer Erfolg auf eine Energiewaffen- oder Wissenschafts-Prüfung)',
                '★ NIKOLAUS-GESCHENK: Schachtel „Fancy Lads Zimtsterne & Nuka-Kakao“ (Heilt sofort alle TP auf 11/11, entfernt alle Strahlung und regeneriert +1 Glückspunkt & +1 AP)'
            ],
            bonusStats: { healFull: true, clearRad: true, luckDelta: 1, apDelta: 1 },
            realWorldHint: 'TIPP ZUM NIKOLAUSTAG: Schau heute am 6. Dezember vielleicht auch in der echten Welt mal in die Nähe deiner Stiefel oder deines Arbeitsplatzes... vielleicht wartet dort ebenfalls eine kleine Stärkung auf dich!'
        },
        phases: [
            {
                phaseTitle: 'ETAPPE 1: NOTABLAUF IM ÜBERFLUTETEN PUMPENRAUM',
                intro: 'Eisige Brühe blockiert die Treppe zum Pumpenkeller. Erst wenn der Überlauf-Schieber geöffnet ist, sinkt der Pegel weit genug ab.',
                consequence: {
                    onSuccess: { tag: 'VORTEIL', text: 'Pegel sinkt schnell ab: +1 Gratis-W20 für die Hauptturbine in Etappe 2!', bonusDice: 1 },
                    onFail: { tag: 'STÖRUNG', text: 'Eisiges Wasser bis zur Hüfte! -1 TP (Unterkühlung) und Schwierigkeit +1 in Etappe 2!', hpMod: -1, diffMod: 1 }
                },
                choices: [
                    {
                        id: '6_1A',
                        label: 'Überlauf-Schieber im knietiefen Wasser von Hand aufkurbeln',
                        attr: 'STR',
                        skill: 'athletics',
                        difficulty: 1,
                        desc: 'Wate durch das eiskalte Becken zum großen Überlauf-Ventil und drehe das verrostete Rad gegen den Wasserdruck auf.',
                        successText: 'Gurgelnd stürzen tausende Liter Schmutzwasser in den Tiefenablauf! Der Pegel fällt um einen ganzen Meter.',
                        failText: 'Das eiskalte Wasser schneidet dir in die Knochen (-1 TP), bevor sich das Ventil endlich langsam bewegt.',
                        rewardItem: 'Wasserdichtes Isolier-Klebeband',
                        campaignNote: 'Tag 6 (Etappe 1): Überlauf-Schieber im Pumpenwerk geöffnet.'
                    },
                    {
                        id: '6_1B',
                        label: 'Sekundär-Lenzpumpe überbrücken & zuschalten',
                        attr: 'INT',
                        skill: 'repair',
                        difficulty: 1,
                        desc: 'Ziehe ein trockenes Hilfskabel von der Deckenleuchte zur kleinen Notfall-Lenzpumpe am Treppenabsatz.',
                        successText: 'Die Lenzpumpe brummt auf und pumpt die Kammer in wenigen Minuten halb leer!',
                        failText: 'Ein Spritzer trifft das offene Kabel – ein kleiner Stromschlag zuckt durch deine Arme (-1 TP).',
                        rewardItem: 'Ersatz-Tauchpumpen-Relais',
                        campaignNote: 'Tag 6 (Etappe 1): Not-Lenzpumpe aktiviert.'
                    }
                ]
            },
            {
                phaseTitle: 'ETAPPE 2: DIE BLOCKIERTE ANSAUGTURBINE',
                introOnSuccess: 'Im abgesenkten Wasser erkennst du den Grund des Stillstands: Metallschrott und ein Nest zischender Schlammkrabben-Larven blockieren das Laufrad.',
                introOnFail: 'Zitternd vor Kälte im noch immer brusttiefen Wasser kämpfst du gegen das verstopfte Laufrad der großen Turbine.',
                consequence: {
                    onSuccess: { tag: 'VORTEIL', text: 'Turbine läuft rund: +1 AP & Schwierigkeit -1 (mind. 1) beim Feinkalibrieren in Etappe 3!', apMod: 1, diffMod: -1 },
                    onFail: { tag: 'STÖRUNG', text: 'Krabben-Biss & Druckstoß: -1 TP & Schwierigkeit +1 in Etappe 3!', hpMod: -1, diffMod: 1 }
                },
                choices: [
                    {
                        id: '6_2A',
                        label: 'In das Becken tauchen & den Schrott mit der Brechstange heraushebeln',
                        attr: 'STR',
                        skill: 'athletics',
                        difficulty: 1,
                        desc: 'Tauche kurz hinab, schlage die aggressiven Larven ab und ziehe das verklemmte Rohr aus den Schaufeln.',
                        successText: 'Frei! Mit gewaltigem Rauschen springt die Pumpe an und jagt klares Wasser in die Filter!',
                        failText: 'Eine Krabbenlarve kneift dir durch den Handschuh in die Hand (-1 TP), bevor du den Schrott herausreißt.',
                        rewardItem: 'Industrie-Wasserfilter',
                        campaignNote: 'Tag 6 (Etappe 2): Ansaugturbine mechanisch freigeräumt.'
                    },
                    {
                        id: '6_2B',
                        label: 'Pumpen-Impuls per Stromumkehrung rückwärts freiblasen',
                        attr: 'INT',
                        skill: 'repair',
                        difficulty: 2,
                        desc: 'Schließe die Pufferbatterie kurzzeitig verpolt an, um den Unrat mit einem gewaltigen Rückstoß herauszuspülen.',
                        successText: 'Genialer Kniff! Der Rückstoß schleudert Schrott und Larven meterweit aus dem Rohr!',
                        failText: 'Die Verpolung lässt eine Sicherung knallen (-1 TP durch Splitter), doch der Pfropfen löst sich.',
                        rewardItem: 'RobCo Hochleistungs-Relais',
                        campaignNote: 'Tag 6 (Etappe 2): Turbine per elektrischem Rückstoß befreit.'
                    }
                ]
            },
            {
                phaseTitle: 'ETAPPE 3: REINWASSER-KALIBRIERUNG & DAS NIKOLAUS-PÄCKCHEN',
                introOnSuccess: 'Die Pumpen brummen kraftvoll. Jetzt musst du nur noch den Filterdruck einregeln – und endlich das geheimnisvolle Päckchen in deinen Stiefeln bei Spind 06 bergen!',
                introOnFail: 'Nach dem harten Kampf im Wasser schwankt der Pumpendruck gefährlich. Regle das Ventil nach, bevor du zu Spind 06 greifst!',
                choices: [
                    {
                        id: '6_3A',
                        label: 'Filterdruck am Messpult feinjustieren & Stiefel-Päckchen öffnen',
                        attr: 'INT',
                        skill: 'science',
                        difficulty: 1,
                        desc: 'Stelle den Sollwert für den Reaktor-Kühlkreis exakt auf 6,5 Bar ein und prüfe anschließend das verschnürte Paket.',
                        successText: 'Alles läuft wie am Schnürchen! Klares Wasser strömt durch Vault 84 – und voller Staunen öffnest du Kovacs’ Nikolaus-Päckchen!',
                        failText: 'Ein letzter Druckstoß bespritzt dich kalt (-1 TP), bevor die Anzeige auf GRÜN springt und du dein Nikolaus-Geschenk auspackst!',
                        rewardItem: 'Präzisions-Manometer & Nikolaus-Überraschung',
                        campaignNote: 'Tag 6 (Nikolaus): Wasserwerk stabilisiert & Kovacs’ Nikolaus-Päckchen geborgen!'
                    },
                    {
                        id: '6_3B',
                        label: 'Spind 06 vom Rost befreien & Sicherheitsventil verplomben',
                        attr: 'PER',
                        skill: 'lockpick',
                        difficulty: 1,
                        desc: 'Löse die verklemmte Sperre des Nebenventils und öffne dein eigenes Stiefelfach bei Spind 06.',
                        successText: 'Klick! Das Ventil rastet sauber ein, und in deinen warmen Ersatzstiefeln liegt Kovacs’ liebevoll geschnürtes Nikolaus-Geschenk!',
                        failText: 'Du klemmst dir leicht die Finger an der Spindklappe, doch die Freude über das Nikolaus-Päckchen lässt jeden Schmerz vergessen!',
                        rewardItem: 'Satz Ersatz-Dichtringe & Nikolaus-Überraschung',
                        campaignNote: 'Tag 6 (Nikolaus): Spind 06 geöffnet & Nikolaus-Geschenk gesichert!'
                    }
                ]
            }
        ]
    },
    {
        day: 7,
        title: 'Der Amoklauf von Protektron „Unit 04“',
        sector: 'Sub-Level 2 // Sicherheitsflügel & Waffenkammer-Korridor',
        systemId: 'security',
        logHeader: 'LOGBUCH-EINTRAG #84-07 // 07. DEZEMBER 2287 // 13:45 UHR',
        story: [
            'Schweres metallisches Stampfen hallt durch Ebene 2: „BÜRGERSTEIG-VERSTOSS REGISTRIERT! GEFAHRENSTUFE ROT!“',
            'Protektron Unit 04 versperrt den Korridor zur Waffenkammer. Durch die Überspannung der Vortage hält dich der Roboter für einen Eindringling und lädt seine Zwillingslaser auf!'
        ],
        quote: '„Bei Fehlfunktionen von Protektron-Einheiten empfiehlt RobCo die Aktivierung des rückseitigen Not-Aus-Schalters.“ — Handbuch S. 8',
        phases: [
            {
                phaseTitle: 'ETAPPE 1: DECKUNG NEHMEN & SCHWACHSTELLE FINDEN',
                intro: 'Rote Laserblitze zucken durch den Flur und brennen schwarze Krater in die Wand. Du musst erst in eine günstige Position gelangen.',
                consequence: {
                    onSuccess: { tag: 'VORTEIL', text: 'Toter Winkel ausgenutzt: +1 Gratis-W20 und Schwierigkeit -1 (mind. 1) gegen Unit 04!', diffMod: -1, bonusDice: 1 },
                    onFail: { tag: 'STÖRUNG', text: 'Laser-Streifschuss! -1 TP und Unit 04 bleibt wachsam (Schwierigkeit +1)!', hpMod: -1, diffMod: 1 }
                },
                choices: [
                    {
                        id: '7_1A',
                        label: 'Hinter den umgestürzten Metallspinden entlang in seinen Rücken schleichen',
                        attr: 'AGI',
                        skill: 'sneak',
                        difficulty: 1,
                        desc: 'Nutze die flackernde Korridorbeleuchtung und schlüpfe durch eine Seitentür in den Flankenbereich des Roboters.',
                        successText: 'Lautlos wie ein Schatten gleitest du in den toten Winkel hinter Unit 04, während seine Sensoren noch den leeren Gang absuchen!',
                        failText: 'Eine Blechdose rollt unter deinem Stiefel weg – der Roboter dreht sich blitzschnell um und streift deine Schulter (-1 TP)!',
                        rewardItem: 'Taktisches Korridor-Schema',
                        campaignNote: 'Tag 7 (Etappe 1): Unbemerkt in den Rücken von Protektron Unit 04 geschlichen.'
                    },
                    {
                        id: '7_1B',
                        label: 'Laser-Taktik über das Feuermelde-Terminal ablenken',
                        attr: 'INT',
                        skill: 'science',
                        difficulty: 1,
                        desc: 'Löse am Wandkasten einen akustischen Fehlalarm am anderen Gangende aus, um die Zielerfassung des Roboters zu täuschen.',
                        successText: 'Der Alarm schrillt los! Unit 04 schwenkt schwerfällig herum und entblößt seine ungeschützte Rückseite!',
                        failText: 'Das Terminal reagiert verzögert; ein Laserstrahl zerschmettert die Abdeckung neben deinem Kopf (-1 TP durch Splitter).',
                        rewardItem: 'RobCo Sensor-Störfrequenz',
                        campaignNote: 'Tag 7 (Etappe 1): Protektron erfolgreich abgelenkt.'
                    }
                ]
            },
            {
                phaseTitle: 'ETAPPE 2: NEUTRALISIERUNG VON UNIT 04',
                introOnSuccess: 'Unit 04 dreht dir ahnungslos den Rücken zu oder schwenkt ins Leere. Jetzt ist deine Chance!',
                introOnFail: 'Mit glühenden roten Sensoraugen fixiert dich der Roboter direkt – du musst jetzt unter direktem Laserbeschuss handeln!',
                choices: [
                    {
                        id: '7_2A',
                        label: 'Wartungsklappe aufhebeln & Combat-Inhibitor per Dietrich ziehen',
                        attr: 'PER',
                        skill: 'lockpick',
                        difficulty: 2,
                        desc: 'Öffne die verriegelte Rückenklappe mit feinem Werkzeug und reiße den Kampf-Inhibitor aus seiner Fassung.',
                        successText: '*Klick!* Der Inhibitor springt heraus. Unit 04 hält inne und wechselt friedlich in den Parkmodus!',
                        failText: 'Die Klappe klemmt und der Roboter rammt dich unsanft (-1 TP), bevor du den Chip endlich herausreißt.',
                        rewardItem: 'Intakter RobCo Combat-Inhibitor',
                        campaignNote: 'Tag 7: Protektron Unit 04 gewaltfrei entschärft.'
                    },
                    {
                        id: '7_2B',
                        label: 'Sensorblase mit dem Lichtbogen-Schweißer direkt überlasten',
                        attr: 'PER',
                        skill: 'energy_weap',
                        difficulty: 1,
                        desc: 'Visiere die Glas-Sensorkuppel am Kopf des Roboters an und feuere einen gebündelten Energiestoß.',
                        successText: 'Volltreffer! Die Kuppel zerplatzt im blauen Funkenregen, und der Roboter fährt im Notstopp herunter!',
                        failText: 'Ein Querschläger versengt deinen Ärmel (-1 TP), bevor der zweite Schuss den Sensor röstet.',
                        rewardItem: 'Präzisions-Laser-Fokussierlinse',
                        campaignNote: 'Tag 7: Protektron per gezieltem Energiewaffen-Schuss gestoppt.'
                    }
                ]
            }
        ]
    },
    {
        day: 8,
        title: 'Strahlungsleck im Kühlmittel-Kreislauf',
        sector: 'Sub-Level 3 // Reaktor-Vorkammer & Ionisations-Schleuse',
        systemId: 'power',
        logHeader: 'LOGBUCH-EINTRAG #84-08 // 08. DEZEMBER 2287 // 16:30 UHR',
        story: [
            'Dein Geigerzähler rast in ein panisches Knattern: 45 RAD pro Minute! Hinter dem Bleiglasfenster der Reaktor-Vorkammer leuchtet die Luft gespenstisch blau.',
            'Eine Kühlmittelleitung ist aufgerissen und versprüht leicht radioaktives Wasser. Du musst die Strahlung durchstehen und das Leck versiegeln!'
        ],
        quote: '„RadAway brennt in den Venen wie flüssiges Blei – aber es schützt deine Zellen vor der unsichtbaren Gefahr.“ — Notiz an der Dekontaminations-Schleuse',
        phases: [
            {
                phaseTitle: 'ETAPPE 1: STRAHLENSCHUTZ & SCHLEUSEN-VORBEREITUNG',
                intro: 'Bevor du die heiße Zone betrittst, musst du die Ionisations-Schleuse öffnen und deine Zellresistenz maximieren.',
                consequence: {
                    onSuccess: { tag: 'VORTEIL', text: 'Optimal geschützt: +1 Gratis-W20 und Schwierigkeit -1 (mind. 1) beim Abdichten!', diffMod: -1, bonusDice: 1 },
                    onFail: { tag: 'STÖRUNG', text: 'Schutzanzug undicht! +1 RAD auf deinem Zähler und Schwierigkeit +1 in Etappe 2!', radMod: 1, diffMod: 1 }
                },
                choices: [
                    {
                        id: '8_1A',
                        label: 'Rad-X exakt dosieren & Strahlenschutzanzug abdichten',
                        attr: 'INT',
                        skill: 'medicine',
                        difficulty: 1,
                        desc: 'Prüfe die Nähte des klobigen Bleianzugs mit Dichtband und nimm eine präzise Dosis Rad-X vor dem Einstieg.',
                        successText: 'Perfekt versiegelt! Der Geigerzähler in deinem Anzug bleibt ruhig, während du die Schleuse durchschreitest.',
                        failText: 'Eine brüchige Manschette am Kragen reißt leicht ein; Strahlung sickert herein (+1 RAD)!',
                        rewardItem: '1x Vorkriegs-Rad-X',
                        campaignNote: 'Tag 8 (Etappe 1): Strahlenschutz-Vorbereitung absolviert.'
                    },
                    {
                        id: '8_1B',
                        label: 'Absaugung der Dekontaminations-Schleuse auf Maximum hochfahren',
                        attr: 'INT',
                        skill: 'repair',
                        difficulty: 1,
                        desc: 'Schließe den Ionisations-Lüfter der Schleuse kurz, um den radioaktiven Sprühnebel direkt aus der Kammer abzusaugen.',
                        successText: 'Der dichte blaue Dunst wird abgesaugt – das Strahlungsniveau fällt spürbar ab!',
                        failText: 'Der Lüfter stottert und stößt eine Wolke gegen dein Visier (+1 RAD).',
                        rewardItem: 'Blei-Isolierband',
                        campaignNote: 'Tag 8 (Etappe 1): Kammer-Entlüftung hochgefahren.'
                    }
                ]
            },
            {
                phaseTitle: 'ETAPPE 2: VERSIEGELUNG DES KÜHLMITTEL-LECKS',
                introOnSuccess: 'Sicher im Bleianzug und bei klarer Sicht erreichst du die zischende Bruchstelle am Hauptrohr.',
                introOnFail: 'Dein Geigerzähler knattert warnend an deinem Ohr (+RAD), und der dichte Sprühnebel erschwert jeden Handgriff!',
                choices: [
                    {
                        id: '8_2A',
                        label: 'Schwere Bleimanschette mit Drehmoment-Ratsche montieren',
                        attr: 'INT',
                        skill: 'repair',
                        difficulty: 2,
                        desc: 'Setze die zweigeteilte Bleimanschette über den Riss und ziehe alle vier Bolzen über Kreuz fest.',
                        successText: 'Die Manschette schließt dicht! Das blaue Leuchten erlischt, und du spülst dich sauber ab.',
                        failText: 'Eine Schraube verkantet; bis du sie festgezogen hast, nimmst du Strahlung auf (+1 RAD), doch das Leck ist dicht.',
                        rewardItem: '2x RadAway (Vorkriegs-Beutel)',
                        campaignNote: 'Tag 8: Radioaktives Kühlmittelleck in Reaktor-Vorkammer versiegelt.'
                    },
                    {
                        id: '8_2B',
                        label: 'Bypass-Schieber manuell umlegen & Strang abriegeln',
                        attr: 'END',
                        skill: 'athletics',
                        difficulty: 1,
                        desc: 'Stemme dich gegen den hohen Gegendruck des Kühlkreises und lege den schweren Absperrhebel des defekten Strangs um.',
                        successText: 'Mit einem satten Klacken rastet der Sperrschieber ein! Das Sprühen stoppt sofort.',
                        failText: 'Der Hebel schlägt leicht zurück (-1 TP), doch die Absperrung greift und das Leck trocknet aus.',
                        rewardItem: 'Strahlenschutz-Filterpatrone',
                        campaignNote: 'Tag 8: Defekten Kühlstrang per Handhebel abgeriegelt.'
                    }
                ]
            }
        ]
    }
];
