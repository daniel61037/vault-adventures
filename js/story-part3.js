/**
 * ==========================================================================
 * VAULT 84 ADVENT CALENDAR - STORY DATA PART 3 (DAYS 17 - 24)
 * Dynamic Multi-Phase 2d20 Encounters with Noticeable Inter-Phase Consequences.
 * Includes the 3-Phase Heiligabend Showdown against Saboteur Silas Kaelen!
 * ==========================================================================
 */

window.STORY_DAYS_PART3 = [
    {
        day: 17,
        title: 'Die automatisierte Fertigungsstraße',
        sector: 'Sub-Level 2 // RobCo-Präzisionswerkstatt & Gießerei',
        systemId: 'security',
        logHeader: 'LOGBUCH-EINTRAG #84-17 // 17. DEZEMBER 2287 // 11:30 UHR',
        story: [
            'Mit der Kraft des Fusionsreaktors erwacht die RobCo-Präzisionswerkstatt auf Ebene 2! Doch eine gebrochene Schmiermittelleitung hat den Werkzeugschlitten der großen CNC-Drehbank blockiert.',
            'Erst musst du die verharzten Führungen vom Schmutz und Rost befreien, bevor du die Präzisionswerkbank für eigene Upgrades und deine kommende Abenteurer-Gruppe neu kalibrieren kannst.'
        ],
        quote: '„Ein guter Techniker repariert Dinge. Ein wahrer Meister baut sich seine eigenen Werkzeuge.“ — Chefingenieur Kovacs',
        phases: [
            {
                phaseTitle: 'ETAPPE 1: VERHARZTE FÜHRUNGEN LÖSEN',
                intro: 'Der tonnenschwere Werkzeugschlitten steckt wie festgeschweißt auf den verrosteten Schwalbenschwanz-Schienen.',
                consequence: {
                    onSuccess: { tag: 'VORTEIL', text: 'Seidenweicher Lauf: +1 AP & Schwierigkeit -1 (mind. 1) bei der Kalibrierung in Etappe 2!', apMod: 1, diffMod: -1 },
                    onFail: { tag: 'STÖRUNG', text: 'Metallspan-Schnitt & Ruckeln: -1 TP & Schwierigkeit +1 in Etappe 2!', hpMod: -1, diffMod: 1 }
                },
                choices: [
                    {
                        id: '17_1A',
                        label: 'Schlitten zerlegen & verharztes Fett mit Lösungsmittel auswaschen',
                        attr: 'INT',
                        skill: 'repair',
                        difficulty: 1,
                        desc: 'Löse die Spannkeile behutsam und schleife die Führungsbahnen mit feinstem Schmirgelleinen blitzblank.',
                        successText: 'Perfekt! Der Schlitten gleitet schon beim leichten Antippen spielfrei über das Ölbett!',
                        failText: 'Ein scharfer Stahlspan schneidet durch deinen Handschuh (-1 TP), bevor sich der Schlitten endlich bewegt.',
                        rewardItem: 'Kanister Spezial-Schneidöl',
                        campaignNote: 'Tag 17 (Etappe 1): Werkzeugschlitten gereinigt.'
                    },
                    {
                        id: '17_1B',
                        label: 'Verklemmte Drehbank-Achse mit dem großen Abzieher freibrechen',
                        attr: 'STR',
                        skill: 'athletics',
                        difficulty: 1,
                        desc: 'Setze den Dreiarm-Abzieher an der Hauptspindel an und löse die Blockade mit kräftigen Schlägen.',
                        successText: 'Mit einem trockenen *Knack* löst sich die Rostkruste und die Spindel dreht wieder frei!',
                        failText: 'Der Abzieher rutscht ab und prellt dein Schienbein (-1 TP), bevor die Achse frei wird.',
                        rewardItem: 'Gehärtete Stahlbolzen',
                        campaignNote: 'Tag 17 (Etappe 1): Spindelblockade der Werkstatt gelöst.'
                    }
                ]
            },
            {
                phaseTitle: 'ETAPPE 2: FEINKALIBRIERUNG DER WERKSTATT',
                introOnSuccess: 'Die Mechanik schnurrt wie ein Kätzchen. Jetzt kannst du das Herzstück der Fertigung voll hochfahren!',
                introOnFail: 'Die Führungen schaben noch leicht rau – du musst die Kalibrierung sehr sorgfältig vornehmen!',
                choices: [
                    {
                        id: '17_2A',
                        label: 'Präzisionsfräse testen & gehärtete Dietriche fertigen',
                        attr: 'INT',
                        skill: 'repair',
                        difficulty: 1,
                        desc: 'Spanne Rohlinge aus Federstahl ein und fräse maßgeschneiderte Ersatzteile und Profi-Dietriche.',
                        successText: 'Die Fräse jubelt auf und fertigt einen kompletten Satz gehärteter Feinmechaniker-Dietriche!',
                        failText: 'Ein Fräser bricht ab und streift deine Schutzbrille (-1 TP), doch im zweiten Lauf gelingt der Satz.',
                        rewardItem: 'Satz gehärtete Feinmechaniker-Dietriche & Waffen-Ersatzteile',
                        campaignNote: 'Tag 17: Präzisions-Werkstatt voll überholt und einsatzbereit.'
                    },
                    {
                        id: '17_2B',
                        label: 'RobCo-Steuerkarte neu kompilieren & Munitionspresse starten',
                        attr: 'INT',
                        skill: 'science',
                        difficulty: 2,
                        desc: 'Rekonstruiere die G-Code-Bibliotheken über deinen Pip-Boy und starte die automatische Munitionsfertigung.',
                        successText: 'Brillant! Die Presse wirft als ersten Testlauf eine Kiste mit 50 Schuss 10mm-Hohlspitz-Munition aus!',
                        failText: 'Ein Pufferüberlauf lässt die Motoren kreischen (-1 AP), bevor der Code endlich stabil läuft.',
                        rewardItem: 'Munitionskiste: 50 Schuss 10mm Hohlspitz (+1 Bonus-CD)',
                        campaignNote: 'Tag 17: Automatisierte Munitionspresse kalibriert.'
                    }
                ]
            }
        ]
    },
    {
        day: 18,
        title: 'Das Reinigen des Trinkwasser-Zentraltanks',
        sector: 'Sub-Level 3 // Primär-Zisterne & UV-Entkeimungsturm',
        systemId: 'water',
        logHeader: 'LOGBUCH-EINTRAG #84-18 // 18. DEZEMBER 2287 // 15:45 UHR',
        story: [
            'Das Wasser oben im Wohnring ist noch trüb und schmeckt nach Rost. Bevor 118 Menschen aufwachen, musst du in die 150.000-Liter-Zentralzisterne hinabsteigen.',
            'Erst musst du das Becken ablassen und sicher über die rutschige Leiter hinabklettern, um dann die blind verkrusteten UV-Entkeimungsröhren wieder auf Hochglanz zu bringen.'
        ],
        quote: '„Reines Wasser ist Leben im Ödland. Wer den Wassertank vernachlässigt, gräbt der Kolonie das Grab.“ — Vorschrift 2076',
        phases: [
            {
                phaseTitle: 'ETAPPE 1: ABSTIEG IN DIE RUTSCHIGE ZISTERNE',
                intro: 'Dreißig Fuß unter dir glänzt der schlammige Boden des riesigen Betontanks. Die schmale Eisenleiter ist mit nassem Rost und Algen überzogen.',
                consequence: {
                    onSuccess: { tag: 'VORTEIL', text: 'Sicherer Stand am Becken: +1 Gratis-W20 für die Reinigung des UV-Turms!', bonusDice: 1 },
                    onFail: { tag: 'STÖRUNG', text: 'Sturz in den Rostschlamm: -1 TP & Schwierigkeit +1 in Etappe 2!', hpMod: -1, diffMod: 1 }
                },
                choices: [
                    {
                        id: '18_1A',
                        label: 'Bodenablass-Ventil exakt justieren & sicher hinabklettern',
                        attr: 'STR',
                        skill: 'athletics',
                        difficulty: 1,
                        desc: 'Lass das Restwasser kontrolliert ablaufen und klettere Sprosse für Sprosse mit Seilsicherung hinunter.',
                        successText: 'Sicher unten! Deine Stiefel sinken zwar leicht in den feuchten Restschlamm, aber dein Werkzeug bleibt trocken.',
                        failText: 'Auf der untersten Sprosse rutscht du aus und schlägst hart auf den Betonboden (-1 TP)!',
                        rewardItem: 'Rostfreies Sicherungsseil',
                        campaignNote: 'Tag 18 (Etappe 1): Abstieg in die Zentralzisterne gemeistert.'
                    },
                    {
                        id: '18_1B',
                        label: 'Wartungs-Hängekorb der Zisternendecke reparieren & nutzen',
                        attr: 'INT',
                        skill: 'repair',
                        difficulty: 1,
                        desc: 'Fette das Windengetriebe der alten Befahranlage und fahre komfortabel im Korb bis zum UV-Turm hinab.',
                        successText: 'Die Seilwinde summt sauber und setzt dich direkt vor dem Entkeimungsturm ab!',
                        failText: 'Die Bremse ruckt heftig durch; der Korb prallt gegen den Turmsockel (-1 TP).',
                        rewardItem: 'Wartungskorb-Werkzeuglampe',
                        campaignNote: 'Tag 18 (Etappe 1): Befahranlage der Zisterne reaktiviert.'
                    }
                ]
            },
            {
                phaseTitle: 'ETAPPE 2: REAKTIVIERUNG DES UV-ENTKEIMUNGSTURMS',
                introOnSuccess: 'Vor dir erhebt sich der riesige gläserne UV-Turm unter einer dicken Kalkkruste – du hast freien Zugriff.',
                introOnFail: 'Mit schmerzender Hüfte und schlammverschmiert stehst du vor dem verkrusteten Glasturm.',
                choices: [
                    {
                        id: '18_2A',
                        label: 'UV-Glaskolben von Hand mit milder Phosphorsäure schrubben',
                        attr: 'STR',
                        skill: 'athletics',
                        difficulty: 1,
                        desc: 'Scheuere jeden Zentimeter der Quarzglasröhren ab und prüfe den Bodenablauf auf verlorene Teile.',
                        successText: 'Blendendes, reines violettes UV-Licht erstrahlt! Und im Schlamm des Ablaufs findest du einen intakten Wasserreinigungs-Chip!',
                        failText: 'Du verlierst das Gleichgewicht im Schlamm (-1 TP), doch die Röhren glänzen wieder und die Entkeimung läuft.',
                        rewardItem: 'Hochpräziser Wasserreinigungs-Chip (Vault-Tec)',
                        campaignNote: 'Tag 18: Trinkwasser-Zisterne gereinigt und UV-Desinfektion auf 100%!'
                    },
                    {
                        id: '18_2B',
                        label: 'Ultraschall-Resonanzzyklus über das Tank-Panel zünden',
                        attr: 'INT',
                        skill: 'science',
                        difficulty: 2,
                        desc: 'Speise eine Resonanzfrequenz in die Tankflüssigkeit ein, um Kalkkrusten durch Kavitation abzusprengen.',
                        successText: 'Brillant! Alle Krusten platzen wie Eierschalen ab – Trinkwasserqualität springt auf 100% REIN!',
                        failText: 'Die Resonanz lässt ein Schauglas splittern (-1 Glückspunkt), doch der Turm ist blitzblank.',
                        rewardItem: '2x Gereinigtes Wasser & Ultraschall-Sensor',
                        campaignNote: 'Tag 18: Ultraschall-Entkalkung der Zisterne erfolgreich.'
                    }
                ]
            }
        ]
    },
    {
        day: 19,
        title: 'Geheimprotokoll „Projekt Permafrost“',
        sector: 'Sub-Level 1 // Archiv-Tresorraum & Aufseher-Geheimkammer',
        systemId: 'robotics',
        logHeader: 'LOGBUCH-EINTRAG #84-19 // 19. DEZEMBER 2287 // 17:00 UHR',
        story: [
            'Im verstaubten Archiv-Tresorraum hinter der Aufseher-Kanzel entdeckst du einen massiven Safe mit der Aufschrift „CONFIDENTIAL – OVERSEER VANCE ONLY“.',
            'Hier verbergen sich nicht nur die Antworten über das mysteriöse Sub-Level 4 („Projekt Permafrost“), sondern auch Eleanor Vances persönliche Sicherheitsvorkehrungen gegen Eindringlinge!'
        ],
        quote: '„Sollte der Reaktor je wieder anspringen, erwachen auch die Kammern auf Sub-Level 4...“ — Tonband von Aufseherin Vance',
        phases: [
            {
                phaseTitle: 'ETAPPE 1: DER VERSTECKTE AUFSEHER-TRESOR',
                intro: 'Hinter einem schweren Ölgemälde verbirgt sich der massive Stahltresor – geschützt durch eine verdächtige kleine Düse über dem Schloss.',
                consequence: {
                    onSuccess: { tag: 'VORTEIL', text: 'Falle entschärft & Safe sauber offen: +1 Gratis-W20 & Schwierigkeit -1 (mind. 1) bei der Auswertung!', diffMod: -1, bonusDice: 1 },
                    onFail: { tag: 'STÖRUNG', text: 'Tränengas-Falle ausgelöst! -1 TP & Schwierigkeit +1 in Etappe 2!', hpMod: -1, diffMod: 1 }
                },
                choices: [
                    {
                        id: '19_1A',
                        label: 'Gasfalle erkennen & Tresorschloss mit feinstem Werkzeug knacken',
                        attr: 'PER',
                        skill: 'lockpick',
                        difficulty: 1,
                        desc: 'Klemme die feine Auslöser-Nadel der Reizgaspatrone mit einer Zange ab und knacke das Zahlenschloss per Gehör.',
                        successText: 'Lautlos! Du entschärfst die Falle sauber, und die zentimeterdicke Safetür schwingt auf!',
                        failText: 'Zisch! Die Reizgaspatrone entlädt sich dir direkt ins Gesicht (-1 TP), bevor der Riegel endlich springt.',
                        rewardItem: 'Entschärfte Reizgas-Kartusche',
                        campaignNote: 'Tag 19 (Etappe 1): Aufseher-Safe sicher geöffnet.'
                    },
                    {
                        id: '19_1B',
                        label: 'Elektronische Zeitverriegelung des Safes mit Pip-Boy überbrücken',
                        attr: 'INT',
                        skill: 'science',
                        difficulty: 1,
                        desc: 'Schließe das Interface unter der Tastatur kurz und setze den internen Sicherheitszähler auf Null.',
                        successText: 'Grünes Licht! Der Tresor entriegelt sich sauber und schaltet alle Fallen ab.',
                        failText: 'Ein Spannungspuls schmort dein Kabel an und die Gasfalle geht los (-1 TP).',
                        rewardItem: 'Kryptografie-Adapter (RobCo)',
                        campaignNote: 'Tag 19 (Etappe 1): Tresor-Elektronik geknackt.'
                    }
                ]
            },
            {
                phaseTitle: 'ETAPPE 2: AUSWERTUNG VON „PROJEKT PERMAFROST“',
                introOnSuccess: 'Im Inneren des Safes liegen das versiegelte Vorkriegs-Holoband sowie ein doppelter Boden für Vances Notfall-Ausrüstung.',
                introOnFail: 'Mit tränenden Augen vom Reizgas greifst du in den offenen Safe – schnell handeln, bevor der Speicher sich sperrt!',
                choices: [
                    {
                        id: '19_2A',
                        label: 'Das 256-Bit-Holoband dekodieren & Sub-Level-4-Pläne sichern',
                        attr: 'INT',
                        skill: 'science',
                        difficulty: 2,
                        desc: 'Entschlüssele Aufseherin Vances Forschungsbericht über die arktischen Prototypen und extrahiere die Fundorte der fehlenden Codes.',
                        successText: 'Volltreffer für eure Kampagne! Du sicherst alle Raumpläne von Sub-Level 4 und erfährst die Code-Orte (Poseidon Echo-7 & Wetterstation Habicht)!',
                        failText: 'Die Selbstlösch-Spule überhitzt deine Finger (-1 TP), doch die wichtigsten Daten rettest du.',
                        rewardItem: 'Geheimdossier: „Projekt Permafrost – Pläne & Code-Orte“',
                        campaignNote: 'Tag 19: Geheimnisse von Sub-Level 4 aufgedeckt (RPG-Kampagnen-Hook!).'
                    },
                    {
                        id: '19_2B',
                        label: 'Doppelten Boden des Tresors aufhebeln & Spezialausrüstung bergen',
                        attr: 'PER',
                        skill: 'lockpick',
                        difficulty: 2,
                        desc: 'Finde den geheimen Verriegelungsmechanismus im Tresorboden und öffne Vances persönliches Waffenfach.',
                        successText: 'Schatzfund! Ein militärischer Stealth-Boy, edler Bourbon (2075) und ein Laser-Zieloptik-Aufsatz!',
                        failText: 'Eine scharfe Federklinge ritzt deinen Handrücken (-1 TP), bevor du die Kiste an dich nimmst.',
                        rewardItem: '1x Militärischer Stealth-Boy & Laser-Zieloptik-Aufsatz',
                        campaignNote: 'Tag 19: Aufseher-Notfallversteck mit Stealth-Boy geborgen.'
                    }
                ]
            }
        ]
    },
    {
        day: 20,
        title: 'Die Servomotoren des großen Vault-Zahnradtors',
        sector: 'Ebene 0 // Haupteingangsschleuse & Tor-Bunker',
        systemId: 'comms',
        logHeader: 'LOGBUCH-EINTRAG #84-20 // 20. DEZEMBER 2287 // 13:00 UHR',
        story: [
            'Vier Tage vor Heiligabend stehst du vor dem 20 Tonnen schweren kreisrunden Zahnrad-Schott mit der Zahl „84“ – der Grenze zum eisigen Schneetal.',
            'Durch Schmelzwasser und das Beben sind Zahnkränze und 500-PS-Servomotoren blockiert. Erst musst du die vereisten Zahnräder freibrechen, danach das schwere Antriebsgetriebe zum Laufen bringen.'
        ],
        quote: '„Vault-Tec Tor C-14: Ausgelegt für direkte Nukleartreffer. Schmierung der Zahnkränze streng vorgeschrieben.“ — Tor-Handbuch',
        phases: [
            {
                phaseTitle: 'ETAPPE 1: DAS VEREISTE ZAHNKRANZ-BETT',
                intro: 'Dicke Eisplatten haben sich tief in die riesigen Stahlzähne des Torantriebs gefressen. Ohne Eisfreiheit reißt jeder Motor sofort durch.',
                consequence: {
                    onSuccess: { tag: 'VORTEIL', text: 'Zähne blitzblank & frei: +1 AP für die Tor-Kalibrierung in Etappe 2!', apMod: 1 },
                    onFail: { tag: 'STÖRUNG', text: 'Prellung durch Brechstange: -1 TP & Schwierigkeit +1 in Etappe 2!', hpMod: -1, diffMod: 1 }
                },
                choices: [
                    {
                        id: '20_1A',
                        label: 'Eisplatten mit schwerem Vorschlaghammer & Meißel sprengen',
                        attr: 'STR',
                        skill: 'athletics',
                        difficulty: 1,
                        desc: 'Schlage mit wuchtigen Hieben die massiven Eisblöcke aus den Zahnzwischenräumen.',
                        successText: 'Klirrend brechen die Eisbrocken ab und stürzen in die Grube – die Zahnstange liegt frei!',
                        failText: 'Ein scharfer Eissplitter fliegt dir ans Kinn (-1 TP), bevor der letzte Brocken fällt.',
                        rewardItem: 'Schwere Industrie-Fettpresse',
                        campaignNote: 'Tag 20 (Etappe 1): Zahnkranz des Vault-Tors mechanisch enteist.'
                    },
                    {
                        id: '20_1B',
                        label: 'Heißdampflanze an den Hilfskessel koppeln & Getriebe abtauen',
                        attr: 'INT',
                        skill: 'repair',
                        difficulty: 1,
                        desc: 'Schmilz das Eis gleichmäßig aus den sensiblen Lagerbuchsen, ohne das Stahlgefüge zu stressen.',
                        successText: 'Sauber abgetaut! Kein Tropfen Rost bleibt in den Führungen zurück.',
                        failText: 'Zurückschlagender heißer Dampf verbrüht deinen Unterarm (-1 TP), bevor das Eis schmilzt.',
                        rewardItem: '2x Hochlast-Schmelzsicherungen',
                        campaignNote: 'Tag 20 (Etappe 1): Torlager mit Heißdampf abgetaut.'
                    }
                ]
            },
            {
                phaseTitle: 'ETAPPE 2: ZÜNDUNG DES 20-TONNEN-ANTRIEBS',
                introOnSuccess: 'Das Zahnrad-Bett ist frei – jetzt legst du den Strom auf die gewaltigen 500-PS-Motoren!',
                introOnFail: 'Noch immer knirscht feines Eis in den Lagern, als du das Kontrollpult des großen Zahnradtors einschaltest.',
                choices: [
                    {
                        id: '20_2A',
                        label: 'Lagerbuchsen mit Lithiumfett einpressen & Probelauf fahren',
                        attr: 'INT',
                        skill: 'repair',
                        difficulty: 1,
                        desc: 'Drücke frisches Industrie-Lithiumfett in alle Schmiernippel und fahre das 20-Tonnen-Tor probeweise auf und zu.',
                        successText: 'Ein ehrfurchtgebietendes Dröhnen! Das gewaltige Zahnrad rollt aus der Wand, gibt die Schleuse frei und schließt wieder bombenfest!',
                        failText: 'Die Handkurbel schlägt leicht zurück (-1 TP), doch dann läuft das Tor seidenweich.',
                        rewardItem: 'Vault-84-Torwächter-Abzeichen',
                        campaignNote: 'Tag 20: Großes 20-Tonnen-Vault-Tor wieder voll funktionsfähig!'
                    },
                    {
                        id: '20_2B',
                        label: 'Endlagenschalter & Pip-Boy-Tor-Fernsteuerung programmieren',
                        attr: 'INT',
                        skill: 'science',
                        difficulty: 2,
                        desc: 'Kalibriere die optischen Sensoren neu und binde die Torsteuerung sicher an dein Pip-Boy-Signal an.',
                        successText: 'Flüsterleise Kontrolle! Ab sofort lässt sich Vault 84 von jedem autorisierten Pip-Boy aus öffnen!',
                        failText: 'Ein Kondensator knallt im Pult durch (-1 AP), doch das Backup-Relais übernimmt sauber.',
                        rewardItem: 'RobCo Tor-Fernbedienungsmodul (Für Pip-Boy)',
                        campaignNote: 'Tag 20: Torsteuerung digital überholt und Fernbedienung aktiv.'
                    }
                ]
            }
        ]
    },
    {
        day: 21,
        title: 'Stimmen aus dem Schneesturm',
        sector: 'Ebene 0 // Funkzentrale & Oberflächen-Antennenschacht',
        systemId: 'comms',
        logHeader: 'LOGBUCH-EINTRAG #84-21 // 21. DEZEMBER 2287 // 14:00 UHR [WINTERSONNENWENDE]',
        story: [
            'Wintersonnenwende! Hoch über dem Vault peitscht ein Schneesturm um die Gipfel. In der Funkzentrale willst du die große Langstrecken-Phalanx-Antenne wieder in Betrieb nehmen.',
            'Doch zunächst musst du den vereisten Antennenmast überhaupt aufrichten, bevor du durch das statische Rauschen auf zwei dramatische Funksprüche triffst: den Hilferuf von Spähtrupp Delta – und den Funk der Plünderer-Bande „Die Frostkrallen“!'
        ],
        quote: '„Die Welt da draußen schläft nicht – und sie beobachtet jeden Funken Licht, der aus dem Berg dringt.“ — Funk-Logbuch',
        phases: [
            {
                phaseTitle: 'ETAPPE 1: DIE VEREISTE PHALANX-ANTENNE AUF DEM GIPFELGRAT',
                intro: 'Über die Wartungsluke spürst du den eisigen Sturm. Der Parabolspiegel hängt schief unter einer Tonne Schneelast und Eis.',
                consequence: {
                    onSuccess: { tag: 'VORTEIL', text: 'Glasklarer Empfang! +1 Gratis-W20 für die Funk-Auswertung in Etappe 2!', bonusDice: 1 },
                    onFail: { tag: 'STÖRUNG', text: 'Erfrierungen im Blizzard & Störrauschen: -1 TP & Schwierigkeit +1 in Etappe 2!', hpMod: -1, diffMod: 1 }
                },
                choices: [
                    {
                        id: '21_1A',
                        label: 'Mast-Stellmotor im Schacht reparieren & Eis abklopfen',
                        attr: 'INT',
                        skill: 'repair',
                        difficulty: 1,
                        desc: 'Entferne den gefrorenen Schnee vom Schneckengetriebe der Antenne und stelle den Spiegel exakt Richtung Tal ein.',
                        successText: 'Der Spiegel richtet sich majestätisch in den Sturm! Ein starkes Signal strömt sofort in den Empfänger.',
                        failText: 'Eine eisige Böe peitscht dir Schnee ins Gesicht (-1 TP), bevor der Mast endlich einrastet.',
                        rewardItem: 'Verstärkte Kupfer-Richtspule',
                        campaignNote: 'Tag 21 (Etappe 1): Phalanx-Antenne im Schneesturm ausgerichtet.'
                    },
                    {
                        id: '21_1B',
                        label: 'Mit Sicherungsseil aus der Dachluke klettern & Spiegel direkt drehen',
                        attr: 'STR',
                        skill: 'athletics',
                        difficulty: 1,
                        desc: 'Trotze dem tobenden Blizzard für zwei Minuten und löse die vereisten Haltebolzen außen am Mast.',
                        successText: 'Mit purer Kraft drehst du den Parabolspiegel genau in den Windschatten – Empfang auf 100%!',
                        failText: 'Die klirrende Kälte brennt sich in deine Wangen (-1 TP), doch die Schüssel steht.',
                        rewardItem: 'Kältefeste Pelz-Kapuze (+1 AUS gegen Kälte)',
                        campaignNote: 'Tag 21 (Etappe 1): Antennenschüssel im Blizzard manuell gedreht.'
                    }
                ]
            },
            {
                phaseTitle: 'ETAPPE 2: NOTRUF VON SPÄHTRUPP DELTA & FEINDFUNK',
                introOnSuccess: 'Kristallklar hallen zwei Signale durch den Lautsprecher: Spähtrupp Delta sitzt in Wetterstation Habicht fest – und die „Frostkrallen“ planen im Tal einen Vorstoß!',
                introOnFail: 'Heftiges Knistern verzerrt den Funkverkehr – du musst schnell handeln, um die Signale zu trennen und richtig zu reagieren!',
                choices: [
                    {
                        id: '21_2A',
                        label: 'Verschlüsselten Richtfunk an Spähtrupp Delta senden & Peilung speichern',
                        attr: 'INT',
                        skill: 'science',
                        difficulty: 2,
                        desc: 'Sende eine eng gebündelte Antwort an die vier eingeschlossenen Scouts, ohne dass die Frostkrallen euch anpeilen können.',
                        successText: 'Ein zweifaches Bestätigungs-Klicken kommt zurück! Spähtrupp Delta lebt – und du hast die exakte Route der Plünderer für Sitzung 1!',
                        failText: 'Ein Streifsignal warnt die Plünderer im Tal (-1 AP), doch Spähtrupp Delta hat deine Nachricht erhalten.',
                        rewardItem: 'Funk-Transceiver (Markiert „Wetterstation Habicht“ & „Plünderer-Lager“)',
                        campaignNote: 'Tag 21: Kontakt zu Spähtrupp Delta hergestellt (Rettungsmission für Sitzung 1!).'
                    },
                    {
                        id: '21_2B',
                        label: 'Passiven Horchposten einrichten & Feindfunk lückenlos aufzeichnen',
                        attr: 'INT',
                        skill: 'repair',
                        difficulty: 1,
                        desc: 'Schalte deinen Sender stumm und zeichne Taktik, Codes und Truppenstärke der Frostkrallen auf Holoband auf.',
                        successText: 'Goldwerte Aufklärung! Mit diesen Daten gerät eure RPG-Gruppe im Schneetal in keinen Hinterhalt!',
                        failText: 'Eine Verstärkerröhre platzt durch (-1 TP durch Glassplitter), aber das Tonband ist komplett!',
                        rewardItem: 'Abgehörtes Feind-Holoband: „Frostkrallen-Taktik“',
                        campaignNote: 'Tag 21: Feindlicher Funkverkehr im Schneetal aufgezeichnet.'
                    }
                ]
            }
        ]
    },
    {
        day: 22,
        title: 'Sabotage im Schatten der Schleuse',
        sector: 'Ebene 0 // Äußerer Ansaugtunnel & Dekontaminations-Schacht',
        systemId: 'comms',
        logHeader: 'LOGBUCH-EINTRAG #84-22 // 22. DEZEMBER 2287 // 19:50 UHR',
        story: [
            'Unruhig gehst du auf Patrouille in den äußeren Lüftungstunnel am Bergrand. Im gefrorenen Schnee kleben frische Stiefelabdrücke – jemand war hier draußen!',
            'An der Innenseite des Wetterschutzgitters pulsiert ein böses grünes Licht: eine scharfe militärische Plasmamine! Und quer über den Gang spannt sich ein hauchdünner Stolperdraht. Erst musst du sicher an die Mine herankommen, dann sie unschädlich machen!'
        ],
        quote: '„Jemand da draußen wusste ganz genau, wo unser Ansaugschacht liegt... und er wird wiederkommen.“ — Sicherheitsprotokoll',
        phases: [
            {
                phaseTitle: 'ETAPPE 1: STOLPERDRAHT & ANNÄHERUNG IM DUNKELN',
                intro: 'Ein hauchdünner Kupferdraht verbindet das Lüftungsgitter mit einem versteckten Warnzünder im Boden.',
                consequence: {
                    onSuccess: { tag: 'VORTEIL', text: 'Draht lautlos umgangen: +1 Gratis-W20 & Schwierigkeit -1 (mind. 1) an der Plasmamine!', diffMod: -1, bonusDice: 1 },
                    onFail: { tag: 'STÖRUNG', text: 'Schock-Warnzünder ausgelöst! -1 TP & die Mine tickt schneller (Schwierigkeit +1)!', hpMod: -1, diffMod: 1 }
                },
                choices: [
                    {
                        id: '22_1A',
                        label: 'Mit Taschenlampe im Schatten über den Stolperdraht hinwegschleichen',
                        attr: 'AGI',
                        skill: 'sneak',
                        difficulty: 1,
                        desc: 'Erkenne alle gespannten Drähte im Schräglicht und bewege dich lautlos bis direkt vor das Wetterschutzgitter.',
                        successText: 'Wie eine Katze steigst du über zwei versteckte Drähte hinweg – der Zünder bleibt absolut ruhig!',
                        failText: 'Dein Stiefel streift einen zweiten Nebendraht! Ein Blitzknall betäubt dich kurz (-1 TP), und die Hauptmine piept schneller!',
                        rewardItem: 'Tarn-Stiefelüberzüge',
                        campaignNote: 'Tag 22 (Etappe 1): Stolperdrähte im Lüftungstunnel unentdeckt passiert.'
                    },
                    {
                        id: '22_1B',
                        label: 'Spuren im Schnee lesen & versteckten Auslöser gezielt blockieren',
                        attr: 'END',
                        skill: 'survival',
                        difficulty: 1,
                        desc: 'Verfolge die Fußspuren des Saboteurs rückwärts, erkenne seine Fallenlogik und klemme den Federbolzen des Stolperdrahts fest.',
                        successText: 'Durchschaut! Der Bolzen ist blockiert – jetzt kannst du gefahrlos direkt bis an die Mine heran.',
                        failText: 'Der Bolzen rutscht raus und eine kleine Schockkapsel knallt (-1 TP)!',
                        rewardItem: 'Abdruck-Skizze der Saboteur-Stiefel',
                        campaignNote: 'Tag 22 (Etappe 1): Saboteur-Spuren analysiert und Vorfalle blockiert.'
                    }
                ]
            },
            {
                phaseTitle: 'ETAPPE 2: DIE SCHARFE PLASMAMINE',
                introOnSuccess: 'Ruhig und ungestört kniest du direkt vor der gefährlichen Vorkriegs-Plasmamine.',
                introOnFail: 'Das grüne Sensorauge der Plasmamine blinkt in panischem Takt – du musst die Zündung sofort stoppen!',
                choices: [
                    {
                        id: '22_2A',
                        label: 'Plasmamine chirurgisch entschärfen & als Waffe sichern',
                        attr: 'PER',
                        skill: 'explosives',
                        difficulty: 2,
                        desc: 'Isoliere den Näherungssensor mit einer Spiegelscherbe und ziehe den Zündstift mit der Krokodilklemme.',
                        successText: 'Das Piepen verstummt mit einem sanften *Klick*! Du hältst eine scharfe, verheerende Plasmamine als Trumpf für das Finale in den Händen!',
                        failText: 'Eine grüne Stichflamme zischt aus dem Hilfszünder (-2 TP), bevor du den Kern herausreißt.',
                        rewardItem: 'Scharfe Vorkriegs-Plasmamine (4 CD Energieschaden, Flächenwirkung!)',
                        campaignNote: 'Tag 22: Plasmamine entschärft und als mächtige Waffe gesichert!'
                    },
                    {
                        id: '22_2B',
                        label: 'Zündelektronik aus der Deckung per Schweißbrenner-EMP rösten',
                        attr: 'INT',
                        skill: 'repair',
                        difficulty: 2,
                        desc: 'Richte die Induktionsspule deines Schweißers aus sicherer Deckung auf die Mine und grille ihre Platine.',
                        successText: 'Ein gezielter Brutzler! Die Sensorleuchte erlischt für immer, und du schweißt schwere Stahlriegel vor das Gitter.',
                        failText: 'Die Spule überhitzt in deinen Händen (-1 TP), doch die Mine ist tot und das Gitter verbarrikadiert.',
                        rewardItem: 'Plasmakern-Rohstoffe & Stahlpanzer-Platte',
                        campaignNote: 'Tag 22: Lüftungsschacht gegen Saboteure gepanzert.'
                    }
                ]
            }
        ]
    },
    {
        day: 23,
        title: 'Die große Auftau-Sequenz',
        sector: 'Sub-Level 2 // Zentrale Kryo-Überwachungskanzel',
        systemId: 'medcryo',
        logHeader: 'LOGBUCH-EINTRAG #84-23 // 23. DEZEMBER 2287 // 21:00 UHR',
        story: [
            'Am Vorabend von Heiligabend sind alle Systeme stabil. Heute beginnt das Wunder: Du weckst alle 118 Bewohner in Sektor Alpha und Beta – darunter Kovacs, Dr. Amari und deine Mitspieler der Tisch-Runde!',
            'Doch beim Hochfahren der 118 Auftau-Heizungen auf einen Schlag geraten zuerst die Dampfventile unter gewaltigen Druck, bevor du die empfindliche medizinische Erwärmungskurve steuern kannst.'
        ],
        quote: '„Körpertemperatur steigt um 0,5 °C pro Minute. Vitalfunktionen werden synchronisiert...“ — Lebensüberwachungs-Stimme',
        phases: [
            {
                phaseTitle: 'ETAPPE 1: VORWÄRMUNG & DRUCKSCHWANKUNG ABFANGEN',
                intro: 'Alle 118 Wärmetauscher springen gleichzeitig an. Die Hauptverteilerleitungen vibrieren unter dem gewaltigen Lastsprung.',
                consequence: {
                    onSuccess: { tag: 'VORTEIL', text: 'Sanfte Erwärmung: +1 AP & Schwierigkeit -1 (mind. 1) für die Auftau-Wellen in Etappe 2!', apMod: 1, diffMod: -1 },
                    onFail: { tag: 'STÖRUNG', text: 'Spannungsspitze im Medizin-Subnetz: -1 TP & Schwierigkeit +1 in Etappe 2!', hpMod: -1, diffMod: 1 }
                },
                choices: [
                    {
                        id: '23_1A',
                        label: 'Ausgleichsventile an den Heizsträngen synchron öffnen',
                        attr: 'INT',
                        skill: 'repair',
                        difficulty: 1,
                        desc: 'Öffne die Drosselklappen im Takt, damit kein plötzlicher Wärmeschock auf die gefrorenen Kapselleitungen trifft.',
                        successText: 'Butterweiche Druckkurve! Warmes Glykol fließt gleichmäßig durch alle 118 Mäntel.',
                        failText: 'Ein Überdruckventil knallt mit heißem Nebel auf (-1 TP) und löst eine Warnmeldung aus!',
                        rewardItem: 'Kryo-Wärmetauscher-Steuerchip',
                        campaignNote: 'Tag 23 (Etappe 1): Heizkreisläufe der Kryo-Kammern sanft vorgewärmt.'
                    },
                    {
                        id: '23_1B',
                        label: 'Kühlmittel-Rücklauf medizinisch nach Vital-Priorität drosseln',
                        attr: 'INT',
                        skill: 'medicine',
                        difficulty: 1,
                        desc: 'Priorisiere die Kapseln mit schwächerem Puls (darunter Kinder und Ältere), um ihnen die sanfteste Kurve zu geben.',
                        successText: 'Jede einzelne Vitalanzeige bleibt im grünen Bereich – hervorragende Triage!',
                        failText: 'Die Hektik an den Konsolen lässt eine Sicherung schmoren (-1 TP durch Verbrennung).',
                        rewardItem: 'Adrenalin-Injektor (Vorrat)',
                        campaignNote: 'Tag 23 (Etappe 1): Prioritätsliste für das Auftauen gesichert.'
                    }
                ]
            },
            {
                phaseTitle: 'ETAPPE 2: ERWACHEN DER 118 BEWOHNER',
                introOnSuccess: 'Die Kapselscheiben klaren überall gleichzeitig auf. Zeit für den letzten, kritischen Schritt: alle 118 Bewohner sicher ins Leben zurückholen!',
                introOnFail: 'Eine Warnleuchte im medizinischen Sekundärnetz flackert gefährlich – höchste Präzision ist jetzt überlebenswichtig!',
                choices: [
                    {
                        id: '23_2A',
                        label: 'Auftau-Kurve computergestützt in vier Wellen staffeln',
                        attr: 'INT',
                        skill: 'science',
                        difficulty: 2,
                        desc: 'Staffele die Lastspitzen über Pufferkondensatoren und wecke zuerst die Ärzte, Kovacs und deine RPG-Gefährten.',
                        successText: 'EIN WUNDER! Alle 118 Lampen springen auf GRÜN! Zischend öffnen sich die Kapseln. Kovacs blinzelt dich gerührt an: „{{CHAR_CALLSIGN}}... du hast es geschafft!“',
                        failText: 'Eine Sicherung knallt durch (-1 TP beim Blitzwechsel von Hand), doch alle 118 Bewohner erwachen gesund!',
                        rewardItem: 'Meister-Zertifikat: Kryo-Lebenserhaltung (+100 XP für Kampagnenstart!)',
                        campaignNote: 'Tag 23: Alle 118 Bewohner und Spielercharaktere ohne Verluste geweckt!'
                    },
                    {
                        id: '23_2B',
                        label: 'Vitalwerte & Adrenalin-Zufuhr direkt an den Kapseln überwachen',
                        attr: 'INT',
                        skill: 'medicine',
                        difficulty: 2,
                        desc: 'Laufe von Reihe zu Reihe und steuere die Kreislauf-Infusionen von Hand nach.',
                        successText: 'Meisterhafte medizinische Fürsorge! Nach zwei Stunden stehen deine frisch geweckten Kameraden jubelnd neben dir!',
                        failText: 'Die Marathon-Schicht kostet deine letzten Kräfte (-1 TP), doch kein einziges Leben geht verloren.',
                        rewardItem: 'Dr. Amaris Notfall-Arztkoffer (Für die Gruppen-Kampagne)',
                        campaignNote: 'Tag 23: Persönliche Wiederbelebung der gesamten Vault-84-Besatzung.'
                    }
                ]
            }
        ]
    },
    {
        day: 24,
        title: 'Der Saboteur im Atrium & Das Weihnachtswunder von Vault 84',
        sector: 'Sub-Level 1 // Festliches Atrium, Speisesaal & Schleusen-Schnittstelle',
        systemId: 'power',
        logHeader: 'LOGBUCH-EINTRAG #84-24 // 24. DEZEMBER 2287 // 18:00 UHR [HEILIGABEND-SHOWDOWN]',
        story: [
            '24. Dezember – Heiligabend! Im warm beleuchteten Atrium feiern alle 118 Geretteten rund um den leuchtenden Kupferkabel-Weihnachtsbaum. Doch plötzlich zerreißt eine bläuliche EMP-Druckwelle die Feststimmung!',
            'Das Schleusenschott fliegt auf! Der Saboteur von Tag 22 stürmt herein – Silas „Frostbiss“ Kaelen in geflickter Kampfrüstung, eine 10mm-Maschinenpistole im Anschlag: „Niemand rührt sich! Vault 84 gehört den Frostkrallen!“',
            '{{CHAR_FIRST}} reißt {{CHAR_POSS_AKK}} modifizierten Cryo-Schweißer „{{CHAR_CALLSIGN_GENITIVE}} Polarstern“ hoch! (SPIELTISCH-TIPP: Wenn du das „Fallout Map Pack 1: Vault“ hast, breite jetzt die Atrium-Battle-Map auf dem Tisch aus – der dreistufige Bosskampf beginnt!)'
        ],
        quote: '„Du hast 23 Tage lang gefroren, um uns zu retten, {{CHAR_CALLSIGN}}. Jetzt lass diesen Bastard nicht unser Weihnachtsfest ruinieren!“ — Chefingenieur Kovacs',
        specialGift: {
            badge: '★★ GROSSES HEILIGABEND-GESCHENK UNTERM VAULT-WEIHNACHTSBAUM (24. DEZEMBER) ★★',
            title: 'Blau-Goldene Vault-Tec Meisterkiste & Die Beute des Saboteurs',
            text: 'Silas Kaelen ist besiegt und in Zelle 02 verriegelt! Unter tosendem Applaus überreichen dir Kovacs, Dr. Amari und deine dankbaren Mitspieler unter dem Weihnachtsbaum die blau-goldene Meisterkiste für eure Fallout 2d20 Tisch-Runde:',
            items: [
                '★★ WEIHNACHTS-GESCHENK: Einzigartige Waffe "{{CHAR_CALLSIGN_GENITIVE}} Polarstern" (Meisterhaft modifizierter Cryo-Lichtbogen-Schweißer: 5 CD Energie, Durchdringend 1, Betäubend & Einfrierend!)',
                '★★ WEIHNACHTS-GESCHENK: "Pip-Boy 2000 Mk VI Overclocking-Modul" (Erhöht deinen persönlichen AP-Vorrat zu Beginn jeder RPG-Sitzung um +1 Bonus-AP)',
                '★★ WEIHNACHTS-GESCHENK: Goldener Schlüssel zur "Techniker-Suite Gamma-1" (Dein eigenes Werkstatt-Quartier in Vault 84 mit Werkbank für die gesamte RPG-Gruppe)',
                '★★ WEIHNACHTS-GESCHENK: Ehren-Urkunde "{{CHAR_SAVIOR_TITLE}}" (+1 Permanenter Glückspunkt / Gruppen-Reroll für das erste Kapitel der Tisch-Kampagne!)',
                '★★ BEUTE VOM SABOTEUR: Silas Kaelens verschlüsseltes Funkgerät (Quest-Hooks A & B) & Code-Fragment 3 von 3 für Sub-Level 4!'
            ],
            bonusStats: { healFull: true, clearRad: true, luckDelta: 2, apDelta: 3 },
            realWorldHint: 'FROHE WEIHNACHTEN! Das Solo-Abenteuer ist triumphal vollendet. Wenn du das physische „Fallout Map Pack 1: Vault“ besitzt, dient diese Karte ab jetzt als offizielle Bodenkarte eurer befreiten Heimatbasis Vault 84 am Spieltisch. Schnapp dir deine Mitspieler – das Tisch-Rollenspiel beginnt!'
        },
        phases: [
            {
                phaseTitle: 'ETAPPE 1: DER ÜBERFALL – DECKUNG & INITIATIVE IM ATRIUM',
                intro: 'Querschläger aus Kaelens 10mm-MP prasseln durch das Atrium! Du musst blitzschnell zwischen den Festtischen in Deckung hechten und die Initiative an dich reißen.',
                consequence: {
                    onSuccess: { tag: 'VORTEIL', text: 'Erhöhte Deckung am Terminal-Podest! +1 AP & +1 Gratis-W20 für den Kampf gegen Kaelen!', apMod: 1, bonusDice: 1 },
                    onFail: { tag: 'STÖRUNG', text: 'Streifschuss bei der Flucht in Deckung! -1 TP & Kaelen drängt dich zurück (Schwierigkeit +1 in Etappe 2)!', hpMod: -1, diffMod: 1 }
                },
                choices: [
                    {
                        id: '24_1A',
                        label: 'Über die Balustrade zum erhöhten Terminal-Podest hechten',
                        attr: 'AGI',
                        skill: 'athletics',
                        difficulty: 1,
                        desc: 'Nutze deine Agilität, springe über einen umgestürzten Diner-Tisch und gewinne die erhöhte Position über dem Atrium.',
                        successText: 'Wie ein Blitz! Von der Treppe aus überblickst du das gesamte Atrium und hast freies Schussfeld auf den Saboteur!',
                        failText: 'Eine Kugel aus Kaelens Salve fetzt Splitter in deinen Oberarm (-1 TP), bevor du hinter der Brüstung landest.',
                        rewardItem: 'Atrium-Schutzbrille (Taktisch)',
                        campaignNote: 'Tag 24 (Etappe 1): Erhöhte Position im Atrium gesichert.'
                    },
                    {
                        id: '24_1B',
                        label: 'Im Rauch der EMP-Schockwelle zur Flanke hinterm Weihnachtsbaum schleichen',
                        attr: 'AGI',
                        skill: 'sneak',
                        difficulty: 1,
                        desc: 'Nutze die blaue Rauchwolke am Schott, um dich ungesehen in Kaelens Flanke zu bewegen.',
                        successText: 'Kaelen ballert ins Leere – er hat dich komplett aus den Augen verloren!',
                        failText: 'Der Rauch lichtet sich zu früh; Kaelen erfasst dich kurz und streift dich (-1 TP)!',
                        rewardItem: 'EMP-Splitter-Beweisstück',
                        campaignNote: 'Tag 24 (Etappe 1): Saboteur im Atrium flankiert.'
                    }
                ]
            },
            {
                phaseTitle: 'ETAPPE 2: DER BOSSKAMPF GEGEN SILAS „FROSTBISS“ KAELEN',
                introOnSuccess: 'Du hast die perfekte Position! Silas Kaelen steht halb ungedeckt beim Stromverteiler – schlag zu!',
                introOnFail: 'Kaelen hat dich hinter deinem Tisch festgenagelt und feuert kurze Feuerstöße. Du musst jetzt einen Weg durch seine Panzerung finden!',
                consequence: {
                    onSuccess: { tag: 'VORTEIL', text: 'Kaelen schwer angeschlagen! +1 Gratis-W20 & Schwierigkeit -1 (mind. 1) für das endgültige Ausschalten!', diffMod: -1, bonusDice: 1 },
                    onFail: { tag: 'STÖRUNG', text: 'Kaelens EMP-Granate & Nahkampf-Konter! -1 TP & Schwierigkeit +1 im Finale!', hpMod: -1, diffMod: 1 }
                },
                choices: [
                    {
                        id: '24_2A',
                        label: 'Showdown mit „{{CHAR_CALLSIGN_GENITIVE}} Polarstern“: Kaelen im Feuergefecht einfrieren',
                        attr: 'PER',
                        skill: 'energy_weap',
                        difficulty: 2,
                        desc: 'Entfessle einen gleißenden Strahl aus unterkühltem Plasma direkt auf Kaelens Brustpanzerung und Waffenlauf.',
                        successText: 'TREFFER! Ein eisblauer Lichtbogen überzieht Kaelens Kampfrüstung mit dickem Eis und lässt seine MP festfrieren!',
                        failText: 'Kaelen wirft eine EMP-Kapsel (-1 TP durch Druckwelle), die deinen Schweißer kurz flackern lässt!',
                        rewardItem: 'Silas Kaelens modifizierte 10mm-MP (4 CD Schaden, Schnellfeuer)',
                        campaignNote: 'Tag 24 (Etappe 2): Kaelen mit „{{CHAR_CALLSIGN_GENITIVE}} Polarstern“ schwer getroffen!'
                    },
                    {
                        id: '24_2B',
                        label: 'Atrium-Verteidigung hacken: Decken-Schaumlöscher & Bartholomew einsetzen',
                        attr: 'INT',
                        skill: 'science',
                        difficulty: 2,
                        desc: 'Löse über das Wandterminal die Notfall-Schaumlöscher über Kaelen aus, um ihn zu blenden, während Bartholomew angreift.',
                        successText: 'Weiße Schaumwolken begraben Kaelen! Geblendet taumelt er rückwärts direkt in Bartholomews Greifarme!',
                        failText: 'Er feuert blind in deine Deckung (-1 TP), bevor der Schaum ihn einhüllt.',
                        rewardItem: 'Bartholomews Taktik-Holoband "Atrium-Verteidigung"',
                        campaignNote: 'Tag 24 (Etappe 2): Kaelen durch Terminal-Hack und Bartholomew in Bedrängnis gebracht.'
                    },
                    {
                        id: '24_2C',
                        label: 'Techniker-Hinterhalt: Die Plasmamine von Tag 22 als Schock-Falle zünden',
                        attr: 'INT',
                        skill: 'repair',
                        difficulty: 1,
                        desc: 'Modifiziere den Zünder in Sekundenschnelle als gerichtete EMP-Blendladung und schleudere sie vor Kaelens Stiefel.',
                        successText: 'GRÜNER BLITZ! Die Druckwelle fegt Kaelen von den Beinen und legt sein Visier lahm!',
                        failText: 'Die Ladung zündet einen Hauch zu früh (-1 TP durch Splitter), erschüttert Kaelen aber schwer.',
                        rewardItem: 'Zerstörte EMP-Gürtel-Einheit des Saboteurs',
                        campaignNote: 'Tag 24 (Etappe 2): Saboteur mit modifizierter Falle von den Beinen geholt.'
                    }
                ]
            },
            {
                phaseTitle: 'ETAPPE 3: ENTWAFFNEN, BEUTE SICHERN & WEIHNACHTSBESCHERUNG!',
                introOnSuccess: 'Kaelen taumelt benommen am Boden! Nur noch ein letzter entschlossener Schritt trennt Vault 84 vom Triumph und der großen Bescherung unterm Weihnachtsbaum!',
                introOnFail: 'Kaelen zieht zähnefletschend sein Kampfmesser zum letzten verzweifelten Ausfall – setz ihm endgültig ein Ende!',
                choices: [
                    {
                        id: '24_3A',
                        label: 'Kaelen mit der schweren Rohrzange endgültig entwaffnen & fesseln',
                        attr: 'STR',
                        skill: 'melee_weap',
                        difficulty: 1,
                        desc: 'Stürme vor, schlage ihm die Restwaffe aus der Hand und drücke ihn zu Boden, bis Kovacs mit den Kabelbindern da ist.',
                        successText: 'KLONK! Silas Kaelen geht zu Boden und landet in Zelle 02! Du sicherst sein Funkgerät und Code-Fragment 3 – der gesamte Vault bricht in Jubel aus!',
                        failText: 'Sein Messer ritzt noch deinen Ärmel (-1 TP), bevor du ihn mit dem Hebelgriff niederzwingst. Der Saboteur ist besiegt!',
                        rewardItem: 'Code-Fragment 3 für Sub-Level 4 & Kaelens Funkgerät',
                        campaignNote: 'Tag 24 (Heiligabend): Saboteur Silas Kaelen endgültig überwältigt; Code-Fragment 3 geborgen & Weihnachtsgeschenke geöffnet!'
                    },
                    {
                        id: '24_3B',
                        label: 'Ihn zur Aufgabe zwingen & das „Expeditions-Korps 84“ unterm Baum einschwören',
                        attr: 'CHA',
                        skill: 'speech',
                        difficulty: 1,
                        desc: 'Zeige auf die 118 bewaffneten Vault-Bewohner ringsum, nimm Kaelen jeden Mut und halte danach die historische Weihnachtsansprache.',
                        successText: 'Kaelen lässt die Waffen klirrend fallen und ergibt sich! Unter Tränen und Jubel öffnest du deine große blau-goldene Weihnachtskiste!',
                        failText: 'Er spuckt dir wütend vor die Stiefel, bevor ihn drei Sicherheitsleute packen – egal, Vault 84 ist frei und die Bescherung beginnt!',
                        rewardItem: 'Gründungsurkunde „Expeditions-Korps 84“ & Code-Fragment 3',
                        campaignNote: 'Tag 24 (Heiligabend): Saboteur zur Aufgabe gezwungen; „Expeditions-Korps 84“ gegründet & Meisterkiste erhalten!'
                    }
                ]
            }
        ]
    }
];
