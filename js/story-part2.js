/**
 * ==========================================================================
 * VAULT 84 ADVENT CALENDAR - STORY DATA PART 2 (DAYS 9 - 16)
 * Dynamic Multi-Phase 2d20 Encounters with Noticeable Inter-Phase Consequences.
 * ==========================================================================
 */

window.STORY_DAYS_PART2 = [
    {
        day: 9,
        title: 'Notoperation am Kryo-Subnetz Beta',
        sector: 'Sub-Level 2 // Kryo-Schlafflügel Sektor B',
        systemId: 'medcryo',
        logHeader: 'LOGBUCH-EINTRAG #84-09 // 09. DEZEMBER 2287 // 10:15 UHR',
        story: [
            'Ein schriller Alarm auf deinem Pip-Boy reißt dich aus der Pause: Druckabfall im Kältemittel-Kreislauf von Kryo-Sektor B! In der Kapselhalle beschlägt das Schauglas von Kapsel #42 („Takahashi, Kenji – Agro-Genetiker“) bereits von innen.',
            'Die Körpertemperatur steigt gefährlich schnell an. Wenn das Gewebe unkontrolliert auftaut, droht der Hirntod. Erst musst du den Leck-Abschnitt lokalisieren und danach einen stabilen Kälte-Bypass schaffen!'
        ],
        quote: '„Kryo-Konservierung verzeiht keine halben Sachen. Ein Anstieg von 10 Grad pro Minute führt zu irreparablen Zellschäden.“ — Kryo-Handbuch S. 104',
        phases: [
            {
                phaseTitle: 'ETAPPE 1: LECKSUCHE IM STICKSTOFF-VERTEILER',
                intro: 'Eisiger Stickstoffnebel zischt aus einer Rohrleitung unter den Bodengittern von Reihe 3. Du musst den defekten Abschnitt finden und isolieren.',
                consequence: {
                    onSuccess: { tag: 'VORTEIL', text: 'Zeit gewonnen! +1 Gratis-W20 und Schwierigkeit -1 (mind. 1) bei der Rettung von Kapsel #42!', diffMod: -1, bonusDice: 1 },
                    onFail: { tag: 'STÖRUNG', text: 'Kälteverbrennung & Zeitdruck: -1 TP und Schwierigkeit +1 in Etappe 2!', hpMod: -1, diffMod: 1 }
                },
                choices: [
                    {
                        id: '9_1A',
                        label: 'Druckabfall am Verteilerkasten per Sensor-Diagnose eingrenzen',
                        attr: 'INT',
                        skill: 'science',
                        difficulty: 1,
                        desc: 'Lies die Durchflussventile am Pult ab und sperre alle Nebenleitungen ab, um den Restdruck auf Kapsel #42 zu bündeln.',
                        successText: 'Treffer! Du schließt drei tote Stränge und verlangsamst den Temperaturanstieg in Kapsel #42 um wertvolle Minuten!',
                        failText: 'Ein fehlerhafter Sensor verleitet dich zum falschen Ventil; kalter Nebel schlägt dir ins Gesicht (-1 TP).',
                        rewardItem: 'Kryo-Drucksensor',
                        campaignNote: 'Tag 9 (Etappe 1): Stickstoffleck in Sektor B eingegrenzt.'
                    },
                    {
                        id: '9_1B',
                        label: 'Bodenplatte aufreißen & undichten Flansch provisorisch klammern',
                        attr: 'INT',
                        skill: 'repair',
                        difficulty: 1,
                        desc: 'Hebe den vereisten Bodenrost hoch und presse eine Schnellspann-Klemme um die gerissene Leitung.',
                        successText: 'Zischend verstummt das Leck! Der Leitungsdruck stabilisiert sich augenblicklich.',
                        failText: 'Flüssiger Stickstoff spritzt auf deinen Unterarm und verursacht schmerzhafte Frostblasen (-1 TP).',
                        rewardItem: 'Schnellspann-Kupferklemme',
                        campaignNote: 'Tag 9 (Etappe 1): Kälteleck provisorisch abgedichtet.'
                    }
                ]
            },
            {
                phaseTitle: 'ETAPPE 2: RETTUNG VON KAPSEL #42 (TAKAHASHI)',
                introOnSuccess: 'Der Temperaturanstieg ist gestoppt – jetzt musst du Kapsel #42 zurück auf sichere -196 Grad kühlen.',
                introOnFail: 'Die Warnleuchte von Kapsel #42 blinkt blutrot! Jede Sekunde zählt, um Takahashi vor dem Erfrierungstod zu bewahren!',
                choices: [
                    {
                        id: '9_2A',
                        label: 'Manuellen Stickstoff-Bypass von Reservekapsel #40 legen',
                        attr: 'INT',
                        skill: 'repair',
                        difficulty: 1,
                        desc: 'Kopple einen Kupferschlauch an den Service-Port von #42 und pumpe flüssigen Stickstoff von Hand in den Mantel.',
                        successText: 'Auf dem Display fällt die Temperatur rapide zurück in den sicheren Tiefkühlbereich. Das Schauglas klärt sich – Takahashi überlebt!',
                        failText: 'Der Schlauch schlägt aus (-1 TP), doch am Ende greift die Kälte und stabilisiert den Schläfer.',
                        rewardItem: 'Kryo-Hochdruckventil',
                        campaignNote: 'Tag 9: Kryo-Kapsel #42 im Sektor B erfolgreich gerettet.'
                    },
                    {
                        id: '9_2B',
                        label: 'Kryo-Rechner überlisten & Reserve-Tank digital freigeben',
                        attr: 'INT',
                        skill: 'science',
                        difficulty: 2,
                        desc: 'Überbrücke die blockierte Sicherheitsabfrage im medizinischen Bios und stoße das Not-Bypass-Ventil softwareseitig auf.',
                        successText: 'Eleganter Code-Hack! Gleichzeitig optimierst du die Überwachung für alle 59 Kapseln in Sektor B.',
                        failText: 'Die Sicherheitsabfrage kostet dich wertvolle Nerven (-1 Glückspunkt), bevor der Befehl endlich greift.',
                        rewardItem: 'Diagnose-Holoband „Kryo-Status B“',
                        campaignNote: 'Tag 9: Kryo-Subnetz digital stabilisiert.'
                    }
                ]
            }
        ]
    },
    {
        day: 10,
        title: 'Schimmel und Frost in der Hydroponik',
        sector: 'Sub-Level 3 // Agrar-Kuppel & Nahrungsmittel-Synthese',
        systemId: 'atmo',
        logHeader: 'LOGBUCH-EINTRAG #84-10 // 10. DEZEMBER 2287 // 12:00 UHR',
        story: [
            'Ohne Nahrung verhungern die Bewohner kurz nach dem Erwachen. Doch in der Hydroponik-Kuppel flackern die UV-Lampen nur schwach über erfrorenen Mutafrucht-Ranken.',
            'Zudem breitet sich in den stehenden Nährstoffbecken ein fluoreszierender Schleimpilz aus, der die Wurzelkanäle verstopft. Erst musst du die Sporen eindämmen, dann die Anlage wieder zum Blühen bringen.'
        ],
        quote: '„Ein gesunder Vault beginnt mit einer gesunden Ernte. Frische Tatos stärken Moral und Gesundheit.“ — Landwirtschafts-Broschüre',
        phases: [
            {
                phaseTitle: 'ETAPPE 1: SPORENBEKÄMPFUNG & ABFLUSS-REINIGUNG',
                intro: 'Schleimige Pilzfäden überziehen die Pumpenventile, und ein säuerlicher Sporendunst liegt in der Kuppel.',
                consequence: {
                    onSuccess: { tag: 'VORTEIL', text: 'Saubere Becken! +1 Gratis-W20 für den Neustart der Agrar-Kuppel in Etappe 2!', bonusDice: 1 },
                    onFail: { tag: 'STÖRUNG', text: 'Übelkeit durch Sporen: -1 TP und Schwierigkeit +1 in Etappe 2!', hpMod: -1, diffMod: 1 }
                },
                choices: [
                    {
                        id: '10_1A',
                        label: 'Biochemische Spül-Lösung anmischen & Pilz abtöten',
                        attr: 'END',
                        skill: 'survival',
                        difficulty: 1,
                        desc: 'Mische Kaliumchlorid in das Hauptbecken und schrubbe die verstopften Filtergitter frei.',
                        successText: 'Die Schleimkultur löst sich zischend auf und fließt restlos ab!',
                        failText: 'Du atmest zu viele faulige Sporen ein (-1 TP), bevor der Abfluss endlich frei ist.',
                        rewardItem: 'Beutel Agrar-Kaliumchlorid',
                        campaignNote: 'Tag 10 (Etappe 1): Schimmelbefall in der Hydroponik bekämpft.'
                    },
                    {
                        id: '10_1B',
                        label: 'Verstopfte Hauptabflüsse mit Stahlspirale aufstoßen',
                        attr: 'INT',
                        skill: 'repair',
                        difficulty: 1,
                        desc: 'Treibe die Reinigungs-Spirale durch das Abflussrohr der Zuchtbeete, um den zähen Pfropfen wegzudrücken.',
                        successText: 'Mit einem satten *Plopp* schießt das verfaulte Wasser aus dem Becken!',
                        failText: 'Fauliges Algenwasser spritzt dir ins Gesicht (-1 TP durch Hautreizung), doch das Rohr ist frei.',
                        rewardItem: 'Robuste Messing-Sprinklerdüse',
                        campaignNote: 'Tag 10 (Etappe 1): Abflüsse der Zuchtbeete freigestochert.'
                    }
                ]
            },
            {
                phaseTitle: 'ETAPPE 2: WACHSTUMSLAMPEN & ERNTE-RETTUNG',
                introOnSuccess: 'Die Becken sind blitzblank – jetzt brauchen die jungen Keimlinge Licht und frische Nährlösung.',
                introOnFail: 'Mit flauem Magen vom Sporendunst und vor zähen Restablagerungen musst du die Anlage jetzt zum Laufen bringen.',
                choices: [
                    {
                        id: '10_2A',
                        label: 'UV-Wachstumslampen neu verdrahten & Nährstoffe anreichern',
                        attr: 'INT',
                        skill: 'science',
                        difficulty: 1,
                        desc: 'Schließe die Halogenbänke über ein frisches Relais an den Hilfsstrom an und dosiere frischen Dünger.',
                        successText: 'Goldenes UV-Licht flutet die Kuppel! Die robusten Mutafrucht-Triebe richten sich auf und schenken dir 2 reife Früchte!',
                        failText: 'Beim Anklemmen gibt es einen kleinen Stromschlag (-1 TP), aber die Lampen strahlen endlich.',
                        rewardItem: '2x Frische Mutafrucht (+4 TP, kein RAD)',
                        campaignNote: 'Tag 10: Hydroponik-Kuppel erfolgreich belebt.'
                    },
                    {
                        id: '10_2B',
                        label: 'Druckluft-Spülung durch die feinen Bewässerungsrohre jagen',
                        attr: 'INT',
                        skill: 'repair',
                        difficulty: 1,
                        desc: 'Schließe den Kompressor an die Beetverteilung an und puste alle feinen Düsen frei.',
                        successText: 'Alle Sprinkler erwachen gleichzeitig mit feinem Sprühnebel! Die Ernte ist gerettet.',
                        failText: 'Ein morscher Schlauch platzt mit lautem Knall (-1 TP), bevor der Druck sich gleichmäßig verteilt.',
                        rewardItem: 'Vault-Tec Saatgut-Päckchen',
                        campaignNote: 'Tag 10: Bewässerungsnetz der Agrar-Kuppel instand gesetzt.'
                    }
                ]
            }
        ]
    },
    {
        day: 11,
        title: 'Wiederbelebung von Mr. Handy „Bartholomew“',
        sector: 'Sub-Level 2 // Roboter-Wartungsbucht & Diener-Quartiere',
        systemId: 'robotics',
        logHeader: 'LOGBUCH-EINTRAG #84-11 // 11. DEZEMBER 2287 // 14:40 UHR',
        story: [
            'Elf Tage allein im kalten Stahl – doch in der Roboter-Wartungsbucht entdeckst du ein vertrautes Gesicht: Mr. Handy „Bartholomew“!',
            'Eine abgestürzte Kabeltrasse hat ihn unter sich begraben. Seine Schwebedüse ist verbogen und seine Hauptplatine eingefroren. Wenn du ihn erst befreist und dann reaktivierst, hast du endlich einen treuen Gefährten!'
        ],
        quote: '„General Atomics Mr. Handy: Er kocht, er putzt – und im Notfall hält er mit der Kreissäge jeden Eindringling auf Abstand!“ — Werbeslogan 2075',
        phases: [
            {
                phaseTitle: 'ETAPPE 1: FREILEGUNG & DÜSENTRIEBWERK',
                intro: 'Eine tonnenschwere stählerne Kabelpritsche liegt quer über Bartholomews Chassis und blockiert sein Haupttriebwerk.',
                consequence: {
                    onSuccess: { tag: 'VORTEIL', text: 'Chassis unbeschädigt geborgen! +1 AP & Schwierigkeit -1 (mind. 1) bei der Reaktivierung!', apMod: 1, diffMod: -1 },
                    onFail: { tag: 'STÖRUNG', text: 'Gequetschte Finger & verbogene Düse: -1 TP & Schwierigkeit +1 in Etappe 2!', hpMod: -1, diffMod: 1 }
                },
                choices: [
                    {
                        id: '11_1A',
                        label: 'Kabelpritsche mit dem Hydraulik-Wagenheber anheben',
                        attr: 'STR',
                        skill: 'athletics',
                        difficulty: 1,
                        desc: 'Setze die schwere Hebebühne unter dem Stahlträger an und ziehe Bartholomews kugelförmigen Körper behutsam hervor.',
                        successText: 'Butterweich gleitet Bartholomew unter den Trümmern hervor – keine weitere Beule abbekommen!',
                        failText: 'Der Träger rutscht ein Stück ab und quetscht deinen Daumen (-1 TP), bevor du den Roboter frei hast.',
                        rewardItem: 'Roboter-Ölkännchen',
                        campaignNote: 'Tag 11 (Etappe 1): Mr. Handy aus Trümmern geborgen.'
                    },
                    {
                        id: '11_1B',
                        label: 'Verbogene Turbinenschaufel der Schwebedüse austauschen',
                        attr: 'INT',
                        skill: 'repair',
                        difficulty: 1,
                        desc: 'Demontiere den unteren Düsenring und setze eine unbeschädigte Ersatzturbine aus dem Regal ein.',
                        successText: 'Sauber eingepasst! Der Brennstofffluss ist frei und schmiert wie am ersten Tag.',
                        failText: 'Ein widerspenstiges Gelenk schnappt zurück und schürft deinen Unterarm auf (-1 TP).',
                        rewardItem: 'Diamant-Kreissägeblatt (Ersatz)',
                        campaignNote: 'Tag 11 (Etappe 1): Bartholomews Düse mechanisch überholt.'
                    }
                ]
            },
            {
                phaseTitle: 'ETAPPE 2: NEUSTART DER PERSÖNLICHKEITSMATRIX',
                introOnSuccess: 'Bartholomew liegt sauber auf der Werkbank vor dir. Zeit, seinen Kern wieder zum Leben zu erwecken!',
                introOnFail: 'Die beschädigte Düse stottert leicht, während du dich über die offenen Leiterbahnen von Bartholomews Gehirn beugst.',
                choices: [
                    {
                        id: '11_2A',
                        label: 'Sprach- & Logikplatine löten und Höflichkeitsprotokoll laden',
                        attr: 'INT',
                        skill: 'science',
                        difficulty: 1,
                        desc: 'Löte die gebrochenen Kontakte des Gedächtniskerns nach und starte seine Persönlichkeitsmatrix.',
                        successText: 'Ein triumphales Fauchen! Bartholomew schwebt empor und verbeugt sich: „Guten Tag, {{CHAR_SALUTATION}} {{CHAR_LAST}}! Darf ich Kaffee kochen oder Ungeziefer grillen?“',
                        failText: 'Seine Schneidbrenner-Düse zuckt kurz mit einer Stichflamme (-1 TP), bevor er erwacht und sich höflich entschuldigt.',
                        rewardItem: 'Begleiter: Mr. Handy Bartholomew (Hilft ab sofort im Vault!)',
                        campaignNote: 'Tag 11: Mr. Handy Bartholomew als treuen Verbündeten gewonnen.'
                    },
                    {
                        id: '11_2B',
                        label: 'Werkzeug- und Abwehrarme direkt über das Not-Interface zünden',
                        attr: 'INT',
                        skill: 'repair',
                        difficulty: 1,
                        desc: 'Überbrücke die Zündspule der Kernbatterie und richte seine drei Tentakelarme neu aus.',
                        successText: 'Alle drei Stielaugen leuchten warm auf! Bartholomew testet geschickt Säge und Zange und meldet volle Einsatzbereitschaft.',
                        failText: 'Ein kleiner Kurzschluss zuckt durch dein Werkzeug (-1 TP), bevor Bartholomew surrend abhebt.',
                        rewardItem: 'Begleiter: Mr. Handy Bartholomew (Kampfbereit!)',
                        campaignNote: 'Tag 11: Bartholomews Systeme komplett reaktiviert.'
                    }
                ]
            }
        ]
    },
    {
        day: 12,
        title: 'Der Auto-Doc der Krankenstation',
        sector: 'Sub-Level 2 // Medizinisches Zentrum & Diagnostik-Labor',
        systemId: 'medcryo',
        logHeader: 'LOGBUCH-EINTRAG #84-12 // 12. DEZEMBER 2287 // 16:00 UHR',
        story: [
            'Zwölf Tage harte Arbeit haben Schrammen und blaue Flecken hinterlassen. Zeit für die Krankenstation! Doch das Kronjuwel – der gläserne „Auto-Doc Mk III“ – spielt verrückt: Seine chirurgischen Arme zucken wild und versprühen Betäubungsgas.',
            'Erst musst du die unkontrollierten Roboterarme sicher fixieren, dann kannst du das medizinische Labor für deine Heilung und frische Stimpacks nutzen!'
        ],
        quote: '„Vertrauen Sie dem Auto-Doc. Fehlerquote unter 0,04% – sofern regelmäßig kalibriert!“ — Medizintechnik-Handbuch',
        phases: [
            {
                phaseTitle: 'ETAPPE 1: DIE AMOKLAUFENDEN CHIRURGIE-ARME',
                intro: 'Wie verrückte Metallspinnen schlagen die Skalpell- und Spritzenarme um die Behandlungsliege herum.',
                consequence: {
                    onSuccess: { tag: 'VORTEIL', text: 'Arme sauber arretiert: +1 Gratis-W20 für die medizinische Synthese in Etappe 2!', bonusDice: 1 },
                    onFail: { tag: 'STÖRUNG', text: 'Skalpell-Schnitt! -1 TP und die Feinkalibrierung in Etappe 2 wird schwerer (+1 Schw.)!', hpMod: -1, diffMod: 1 }
                },
                choices: [
                    {
                        id: '12_1A',
                        label: 'Im toten Winkel unter der Glaskuppel den Servo-Stopp einlegen',
                        attr: 'AGI',
                        skill: 'sneak',
                        difficulty: 1,
                        desc: 'Tauche geschickt unter dem schwingenden Laserarm hindurch und drücke den mechanischen Arretierbolzen am Sockel.',
                        successText: 'Blitzschnell! Mit einem sanften Klacken erstarren die vier Greifarme in ihrer Parkposition.',
                        failText: 'Ein zuckendes Skalpell streift deinen Unterarm (-1 TP), bevor du den Stopp-Knopf erwischst.',
                        rewardItem: 'Steriles Nahtmaterial',
                        campaignNote: 'Tag 12 (Etappe 1): Auto-Doc-Arme sicher gestoppt.'
                    },
                    {
                        id: '12_1B',
                        label: 'Hydraulik-Druckminderer der Chirurgie-Arme herunterregeln',
                        attr: 'INT',
                        skill: 'repair',
                        difficulty: 1,
                        desc: 'Drehe an der Seitenkonsole den Öldruck der Stellmotoren herunter, bis die Arme kraftlos stillstehen.',
                        successText: 'Das hektische Surren ebbt ab – die Präzisionsarme liegen ruhig zur Kalibrierung bereit.',
                        failText: 'Eine heiße Hydraulikleitung platzt leicht auf deine Hand (-1 TP), bevor der Druck fällt.',
                        rewardItem: 'Med-Labor-Dichtungsring',
                        campaignNote: 'Tag 12 (Etappe 1): Druckregler des Auto-Docs gebändigt.'
                    }
                ]
            },
            {
                phaseTitle: 'ETAPPE 2: BEHANDLUNG & MEDIKAMENTEN-SYNTHESE',
                introOnSuccess: 'Die Kapsel steht ruhig und sauber vor dir bereit. Perfekte Bedingungen für eine Grundüberholung deiner selbst und frische Vorräte!',
                introOnFail: 'Die Servos brummen noch immer etwas unruhig – höchste Konzentration bei der Einstellung der Laser und Pumpen!',
                choices: [
                    {
                        id: '12_2A',
                        label: 'Laser-Skalpelle kalibrieren, Wunden behandeln & Stimpacks brauen',
                        attr: 'INT',
                        skill: 'medicine',
                        difficulty: 1,
                        desc: 'Justiere die optischen Linsen, lege dich selbst kurz in die Heilkapsel und starte die Stimpack-Synthese.',
                        successText: 'Kühles Heilspray schließt alle deine Kratzer (+2 TP Heilung!) und der Automat wirft 3 frische Vault-Tec Stimpacks aus!',
                        failText: 'Die Nadel piekst dich unsanft in die Schulter (-1 TP), bevor das Heilspray doch noch greift.',
                        rewardItem: '3x Vault-Tec Stimpack & 1x Erste-Hilfe-Kasten',
                        campaignNote: 'Tag 12: Auto-Doc voll einsatzbereit; Stimpack-Vorrat aufgefüllt.'
                    },
                    {
                        id: '12_2B',
                        label: 'Cheflabor-Verschlüsselung hacken & RadAway/Mentats synthetisieren',
                        attr: 'INT',
                        skill: 'science',
                        difficulty: 2,
                        desc: 'Knacke das gesperrte Chefarzt-Archiv, um die geheimen Vorkriegs-Rezepturen für Strahlungsneutralisierer freizuschalten.',
                        successText: 'Geknackt! Die Synthese-Einheit destilliert 2 Beutel RadAway und eine Dose Mentats.',
                        failText: 'Der akustische Alarm dröhnt in deinen Ohren (-1 AP), doch die Synthese läuft sauber durch.',
                        rewardItem: '2x RadAway & 1x Dose Mentats (+2 INT)',
                        campaignNote: 'Tag 12: Geheimes Chemielabor des Auto-Docs freigeschaltet.'
                    }
                ]
            }
        ]
    },
    {
        day: 13,
        title: 'Die Rattenplage in den Kabelschächten',
        sector: 'Sub-Level 3 // Primär-Kabelkanäle & Versorgungs-Tunnel',
        systemId: 'power',
        logHeader: 'LOGBUCH-EINTRAG #84-13 // 13. DEZEMBER 2287 // 17:15 UHR',
        story: [
            'Bei der Kontrolle der Starkstromtrasse flackert das Licht bedrohlich. Unter den Bodenplatten scharrt und nagt es: Ein Nest mutierter Riesen-Maulwurfsratten frisst sich durch die Soja-Ummantelung der Hauptleitungen!',
            'Erst musst du verhindern, dass die Biester bei deinem Angriff tief ins Reaktorgerüst fliehen, dann räucherst du das Nest aus.'
        ],
        quote: '„Maulwurfsratten knacken mit ihren Schneidezähnen selbst Blei-Ummantelungen wie Erdnüsse.“ — Ödland-Überlebensführer',
        phases: [
            {
                phaseTitle: 'ETAPPE 1: FLUCHTWEGE IM SCHACHT ABSCHNEIDEN',
                intro: 'Mehr als ein Dutzend roter Augenpaare funkeln aus den dunklen Gitterkanälen zu dir herauf.',
                consequence: {
                    onSuccess: { tag: 'VORTEIL', text: 'Ratten in der Falle! +1 Gratis-W20 & Schwierigkeit -1 (mind. 1) beim Ausräuchern!', diffMod: -1, bonusDice: 1 },
                    onFail: { tag: 'STÖRUNG', text: 'Biester verstreut & Bisswunde: -1 TP & Schwierigkeit +1 in Etappe 2!', hpMod: -1, diffMod: 1 }
                },
                choices: [
                    {
                        id: '13_1A',
                        label: 'Lautlos die schweren Schacht-Schotts ringsum fallen lassen',
                        attr: 'AGI',
                        skill: 'sneak',
                        difficulty: 1,
                        desc: 'Schleiche an den Kanal-Enden entlang und klinke die Brandschutz-Fallgitter ein, bevor die Ratten Lunte riechen.',
                        successText: 'Klonk, klonk! Alle Seitenkanäle sind dicht – die Brut sitzt im Hauptabschnitt fest!',
                        failText: 'Eine wache Ratte springt dich aus dem Schatten an und beißt durch den Stiefelschaft (-1 TP)!',
                        rewardItem: 'Maulwurfsratten-Zahn (Trophäe)',
                        campaignNote: 'Tag 13 (Etappe 1): Fluchtwege im Kabelschacht verriegelt.'
                    },
                    {
                        id: '13_1B',
                        label: 'Erdspalt am Ende des Tunnels mit einer Knallladung verschütten',
                        attr: 'PER',
                        skill: 'explosives',
                        difficulty: 1,
                        desc: 'Platziere eine kleine gerichtete Sprengkapsel am Felsdurchbruch, durch den die Ratten eingedrungen sind.',
                        successText: 'Dumpfer Knall! Geröll versiegelt den Durchbruch nach draußen komplett – keine Ratte entkommt!',
                        failText: 'Die Druckwelle schleudert Steinsplitter durch den Schacht (-1 TP), und einige Ratten verteilen sich.',
                        rewardItem: 'Spule armiertes Starkstromkabel',
                        campaignNote: 'Tag 13 (Etappe 1): Tunneldurchbruch der Nager gesprengt.'
                    }
                ]
            },
            {
                phaseTitle: 'ETAPPE 2: NEST BESEITIGEN & LEITUNGEN FLICKEN',
                introOnSuccess: 'Eingekreist und panisch wuseln die Riesenratten genau vor dir im ausgeleuchteten Hauptkanal.',
                introOnFail: 'Die aufgescheuchten Ratten huschen blitzschnell zwischen den glühenden Kabeln umher – du musst präzise handeln!',
                choices: [
                    {
                        id: '13_2A',
                        label: 'Schachtgitter mit Hochfrequenz-Wechselstrom unter Spannung setzen',
                        attr: 'INT',
                        skill: 'science',
                        difficulty: 1,
                        desc: 'Speise einen pulsierenden Stromstoß ins Metallgitter ein, um das Nest schlagartig zu vertreiben.',
                        successText: 'Ein greller blauer Funkenregen! Mit panischem Quieken stiebt die gesamte Brut durch einen Spalt hinaus ins Eis!',
                        failText: 'Ein kleiner Rückstrom zuckt durch deine Zange (-1 TP), doch die Kabel bleiben heil und die Ratten sind weg.',
                        rewardItem: 'Hochspannungs-Isolierband',
                        campaignNote: 'Tag 13: Kabelschächte durch Stromstoß von Ratten befreit.'
                    },
                    {
                        id: '13_2B',
                        label: 'Mit Energiewaffe & Bartholomews Flammenwerfer ausräuchern',
                        attr: 'PER',
                        skill: 'energy_weap',
                        difficulty: 1,
                        desc: 'Lass Bartholomew mit der Flammendüse voran schweben und feuere gezielte Schüsse auf die Flüchtenden.',
                        successText: 'Kurzes, sauberes Gefecht! Du sicherst den Schacht und bergest einen alten Leder-Werkzeuggürtel!',
                        failText: 'Eine verzweifelte Ratte schrammt an deinem Schienbein vorbei (-1 TP), bevor Bartholomew sie erwischt.',
                        rewardItem: 'Robuster Leder-Werkzeuggürtel (+5 Tragkraft)',
                        campaignNote: 'Tag 13: Rattenplage gemeinsam mit Bartholomew beseitigt.'
                    }
                ]
            }
        ]
    },
    {
        day: 14,
        title: 'Das geplatzte Hauptdampf-Rohr',
        sector: 'Sub-Level 3 // Industrie-Sektor & Turbinen-Gantry',
        systemId: 'power',
        logHeader: 'LOGBUCH-EINTRAG #84-14 // 14. DEZEMBER 2287 // 18:30 UHR',
        story: [
            'Morgen steht die Zündung des Hauptreaktors an! Doch ein ohrenbetäubender Knall erschüttert die Turbinenhalle: Die 300 Grad heiße Hauptdampf-Leitung ist aufgerissen!',
            'Ein tosender Strahl aus überhitztem Dampf versperrt die schmale Gitterbrücke. Du musst dich erst sicher durch die sengende Wand bewegen, bevor du das entfernte Absperrventil schließen kannst.'
        ],
        quote: '„Überhitzter Trockendampf schneidet durch Isolierung wie ein Laserskalpell. Niemals ungesichert nähern!“ — Dampfkessel-Vorschrift 102',
        phases: [
            {
                phaseTitle: 'ETAPPE 1: DURCH DIE HEISSE DAMPFWAND',
                intro: 'Brüllender Nebel raubt dir die Sicht, und die Hitze auf deiner Haut wird unerträglich.',
                consequence: {
                    onSuccess: { tag: 'VORTEIL', text: 'Sicherer Stand & kühler Kopf: +1 AP und +1 Gratis-W20 für das Ventil in Etappe 2!', apMod: 1, bonusDice: 1 },
                    onFail: { tag: 'STÖRUNG', text: 'Heißer Dampfstoß! -1 TP (Verbrühung) und Schwierigkeit +1 in Etappe 2!', hpMod: -1, diffMod: 1 }
                },
                choices: [
                    {
                        id: '14_1A',
                        label: 'Nasse Schutzdecke überwerfen & Luftströmung im Blindflug lesen',
                        attr: 'END',
                        skill: 'survival',
                        difficulty: 1,
                        desc: 'Wickle dich in eine feuchte Löschdecke, halte dich dicht am kalten Boden und robbe unter dem Hauptstrahl hindurch.',
                        successText: 'Perfekt abgeschirmt! Du kriechst sicher bis zum Fuß des großen Kranpfeilers durch.',
                        failText: 'Ein verirrter Wirbel kochenden Dampfs streift deinen Nacken (-1 TP), doch du erreichst den Pfeiler.',
                        rewardItem: 'Hitzebeständige Asbest-Löschdecke',
                        campaignNote: 'Tag 14 (Etappe 1): Dampfwand sicher unterkrochen.'
                    },
                    {
                        id: '14_1B',
                        label: 'Sicherungsgurt einhaken & außen am Stahlträger entlanghangeln',
                        attr: 'AGI',
                        skill: 'athletics',
                        difficulty: 1,
                        desc: 'Schwinge dich über das Geländer außerhalb der Brücke und bewege dich an den kalten Trägern entlang.',
                        successText: 'Geschmeidig und schnell! Du umgehst die Hitze komplett und stehst perfekt in Position.',
                        failText: 'Ein nasser Griff rutscht weg (-1 TP durch Stoß am Stahlträger), bevor dein Gurt dich abfängt.',
                        rewardItem: 'Schwerlast-Karabiner & Gurt',
                        campaignNote: 'Tag 14 (Etappe 1): Über Außenkonstruktion vorgerückt.'
                    }
                ]
            },
            {
                phaseTitle: 'ETAPPE 2: SCHLIESSEN DES NOTVENTILS',
                introOnSuccess: 'Vom Kranpfeiler aus hast du das Absperrventil hoch oben klar im Blick – jetzt gilt es!',
                introOnFail: 'Die Hitze flimmert dir vor den Augen und jede Bewegung schmerzt – du musst das Ventil jetzt trotzdem bezwingen!',
                choices: [
                    {
                        id: '14_2A',
                        label: 'Kran-Träger hinaufklettern & das gusseiserne Ventilrad herumreißen',
                        attr: 'AGI',
                        skill: 'athletics',
                        difficulty: 2,
                        desc: 'Hangele dich die letzten Meter zur hohen Plattform empor und drehe das glühend heiße Rad zu.',
                        successText: 'Atemberaubend! Mit lautem Zischen ebbt der Dampfstrahl ab – der Weg für die Reaktorzündung ist frei!',
                        failText: 'Die Hitze versengt deine Handschuhe (-1 TP), doch mit letzter Kraft rastet das Ventil ein.',
                        rewardItem: 'Kletterhaken (Verstärkt)',
                        campaignNote: 'Tag 14: Hauptdampf-Rohr durch Kletteraktion geschlossen.'
                    },
                    {
                        id: '14_2B',
                        label: 'Berstscheibe am Feder-Schließzylinder aus der Distanz zerschießen',
                        attr: 'PER',
                        skill: 'energy_weap',
                        difficulty: 2,
                        desc: 'Visiere das kleine Steuerventil durch den wabernden Nebel an und löse die Feder-Notabschaltung per Schuss aus.',
                        successText: 'Ein Meisterschuss! Der Laser trifft die Scheibe haargenau, die Feder schnellt vor und das Schottventil knallt zu!',
                        failText: 'Der erste Schuss prallt am Geländer ab (-1 TP durch heißen Rückprall), doch der zweite Schuss sitzt!',
                        rewardItem: 'Präzisions-Kondensator für Energiewaffen',
                        campaignNote: 'Tag 14: Dampfventil per Meisterschuss aus der Distanz ausgelöst.'
                    }
                ]
            }
        ]
    },
    {
        day: 15,
        title: 'Das Herz des Vaults – Zündung des Hauptreaktors',
        sector: 'Sub-Level 3 // General-Atomics-Fusionsreaktor-Halle',
        systemId: 'power',
        logHeader: 'LOGBUCH-EINTRAG #84-15 // 15. DEZEMBER 2287 // 19:00 UHR [MEILENSTEIN]',
        story: [
            'Heute schlägt die Stunde der Wahrheit in der gigantischen Reaktor-Kathedrale! Vor dir ragt der General-Atomics-Fusionsreaktor 3000 empor – das schlagende Herz von Vault 84.',
            'Doch die Zündung eines Fusionskerns ist ein dreistufiges Hochrisiko-Verfahren: Kerne laden, den durchgebrannten G.E.E.K.-Spannungsregulator überbrücken und die Magnetfeld-Eindämmung sauber hochfahren!'
        ],
        quote: '„Kernfusion ist kein Spielzeug. Wenn die Magnetfelder kollabieren, verdampft Vault 84 zu Plasma. Halte deine Hände ruhig!“ — Chefingenieur Kovacs',
        phases: [
            {
                phaseTitle: 'ETAPPE 1: FUSIONSKERNE LADEN',
                intro: 'Drei schwere, leicht strahlende Fusionskerne müssen aus dem Blei-Tresor in die rotierende Ladebucht des Reaktors eingesetzt werden.',
                consequence: {
                    onSuccess: { tag: 'VORTEIL', text: 'Perfekt eingerastet: +1 Gratis-W20 für die Überbrückung in Etappe 2!', bonusDice: 1 },
                    onFail: { tag: 'STÖRUNG', text: 'Strahlungsleck an der Ladebucht! +1 RAD und Schwierigkeit +1 in Etappe 2!', radMod: 1, diffMod: 1 }
                },
                choices: [
                    {
                        id: '15_1A',
                        label: 'Ladebucht-Führung schmieren & Kerne mit ruhiger Hand einsetzen',
                        attr: 'INT',
                        skill: 'repair',
                        difficulty: 1,
                        desc: 'Entferne Korrosion aus den Kupferschienen der Ladebucht und verriegele alle drei Kerne sauber.',
                        successText: 'Klick, klick, klick! Alle drei Statuslampen springen auf tiefes Gelb: Kerne bereit!',
                        failText: 'Ein Kern klemmt kurz und strahlt stärker ab (+1 RAD), bevor er endlich einschnappt.',
                        rewardItem: 'Reserve-Fusionskern (100% Ladung!)',
                        campaignNote: 'Tag 15 (Etappe 1): Fusionskerne sauber geladen.'
                    },
                    {
                        id: '15_1B',
                        label: 'Die schweren Blei-Kassetten mit voller Kraft in den Turm wuchten',
                        attr: 'STR',
                        skill: 'athletics',
                        difficulty: 1,
                        desc: 'Hebe die bleischweren Transportkassetten ohne Kranarm direkt in die Ladeschächte.',
                        successText: 'Stark und präzise! Die Kerne sitzen bombenfest im Schacht.',
                        failText: 'Das Gewicht zieht dich nach vorn; eine Dichtung öffnet sich kurz (+1 RAD).',
                        rewardItem: 'Blei-Schutzkassette',
                        campaignNote: 'Tag 15 (Etappe 1): Fusionskerne manuell eingesetzt.'
                    }
                ]
            },
            {
                phaseTitle: 'ETAPPE 2: DEN DEFEKTEN G.E.E.K.-REGULATOR ÜBERBRÜCKEN',
                introOnSuccess: 'Die Kerne sitzen tadellos – doch am Hauptpult entdeckst du den durchgebrannten G.E.E.K.-Spannungsregulator. Ohne Ersatzteil von draußen musst du ihn brücken!',
                introOnFail: 'Warnleuchten über der Ladebucht blinken wegen der gestrigen Störung hektisch, und der verschmorte Spannungsregulator funkt!',
                consequence: {
                    onSuccess: { tag: 'VORTEIL', text: 'Brücke hält bombenfest! +1 AP & Schwierigkeit -1 (mind. 1) bei der Finalzündung in Etappe 3!', apMod: 1, diffMod: -1 },
                    onFail: { tag: 'STÖRUNG', text: 'Spannungsüberschlag! -1 TP & Schwierigkeit +1 bei der Finalzündung in Etappe 3!', hpMod: -1, diffMod: 1 }
                },
                choices: [
                    {
                        id: '15_2A',
                        label: 'Massive Kupfer-Brücke um den verschmorten Regulator schweißen',
                        attr: 'INT',
                        skill: 'repair',
                        difficulty: 2,
                        desc: 'Verbinde die Primärleiter mit einer dicken Kupferbrücke für stabile 75%-Basislast.',
                        successText: 'Handwerkliche Meisterleistung! Die Brücke leitet die gigantischen Ströme ohne Flackern!',
                        failText: 'Die Hitze versengt deinen Handschuh (-1 TP), doch die Brücke trägt den Strom.',
                        rewardItem: 'Geschmolzener G.E.E.K.-Regulator (Muster für Poseidon Echo-7!)',
                        campaignNote: 'Tag 15 (Etappe 2): Behelfsbrücke für Reaktor gebaut.'
                    },
                    {
                        id: '15_2B',
                        label: 'Lastkurve im Steuercomputer auf sichere 75% deckeln',
                        attr: 'INT',
                        skill: 'science',
                        difficulty: 2,
                        desc: 'Programmiere den Lastbegrenzer um, damit der fehlende Regulator keine Überladung auslöst.',
                        successText: 'Brillante Firmware-Anpassung! Die Leistungsspitzen werden sauber geglättet.',
                        failText: 'Ein Schaltkasten sprüht Funken (-1 TP), bevor der Begrenzer aktiv wird.',
                        rewardItem: 'Reaktor-Steuerchip „75%-Modus“',
                        campaignNote: 'Tag 15 (Etappe 2): Reaktorsoftware auf sicheren Basisbetrieb getrimmt.'
                    }
                ]
            },
            {
                phaseTitle: 'ETAPPE 3: MAGNETFELD-SYNCHRONISATION & ZÜNDUNG',
                introOnSuccess: 'Alles ist bereit! Deine Finger schweben über dem großen roten Zündschalter des Fusionsreaktors.',
                introOnFail: 'Die Anzeige vibriert unruhig – nur äußerste Konzentration verhindert beim Zünden einen Rückschlag!',
                choices: [
                    {
                        id: '15_3A',
                        label: 'Supraleitende Magnetfelder exakt im Millisekundentakt synchronisieren',
                        attr: 'INT',
                        skill: 'science',
                        difficulty: 2,
                        desc: 'Halte das entstehende Plasma im Magnetkäfig zentriert, während der Kern auf 75% hochfährt.',
                        successText: 'TRIUMPH! Im Sichtfenster flammt eine blendende Miniatursonne auf! Das Summen des Hauptstroms flutet den gesamten Vault – STABIL!',
                        failText: 'Eine Magnetfluktuation lässt die Konsole aufheulen (-1 TP durch Funken), doch dann fängt sich die Reaktion und der Reaktor brennt stabil!',
                        rewardItem: 'Meister-Plakette: „Reaktor-Zündung Vault 84“',
                        campaignNote: 'Tag 15 (Meilenstein): Hauptreaktor erfolgreich auf 75% Basislast gezündet!'
                    },
                    {
                        id: '15_3B',
                        label: 'Turbinen-Kühlung von Hand hochfahren & Netz stufenweise zuschalten',
                        attr: 'INT',
                        skill: 'repair',
                        difficulty: 2,
                        desc: 'Öffne die Hauptventile der Dampfturbinen genau im Moment der Zündung, um die Wärme sofort abzuleiten.',
                        successText: 'Mit einem majestätischen Donnergrollen laufen alle Turbinen an! Warmes Licht durchflutet Ebene 1 bis 3!',
                        failText: 'Ein heißer Dampfstoß streift dich (-1 TP), doch die Turbinen greifen und der Strom fließt!',
                        rewardItem: 'Turbinen-Schlüsselkarte (Ebene 3)',
                        campaignNote: 'Tag 15 (Meilenstein): Fusionsreaktor & Turbinen stabil gestartet!'
                    }
                ]
            }
        ]
    },
    {
        day: 16,
        title: 'Das versiegelte Schott zu Sub-Level 4',
        sector: 'Sub-Level 3 // Hinterer Reaktor-Korridor & Bunkertiefe',
        systemId: 'security',
        logHeader: 'LOGBUCH-EINTRAG #84-16 // 16. DEZEMBER 2287 // 20:15 UHR',
        story: [
            'Hinter der Reaktorkammer stößt du auf ein massives Panzerschott, das auf keinem normalen Plan verzeichnet ist: „SUB-LEVEL 4 // PROJEKT PERMAFROST // OMEGA-FREIGABE“.',
            'Zuerst musst du den durch das Beben verschütteten Seitengang vor dem Schott freiräumen, um an das dreifach gesicherte Terminal heranzukommen.'
        ],
        quote: '„Eleanor Vance hat sichergestellt, dass niemand ohne die drei Codes aus dem Tal nach Sub-Level 4 gelangt.“ — Schaltplan-Notiz',
        phases: [
            {
                phaseTitle: 'ETAPPE 1: DER VERSCHÜTTETE REAKTOR-KORRIDOR',
                intro: 'Herabgestürzte Betonbrocken und verbogene Stahlträger versperren den Zugang zum Omega-Schott.',
                consequence: {
                    onSuccess: { tag: 'VORTEIL', text: 'Sauberer Zugang ohne Erschütterung: +1 Gratis-W20 am Omega-Terminal!', bonusDice: 1 },
                    onFail: { tag: 'STÖRUNG', text: 'Steinschlag & erschöpfte Hände: -1 TP und Schwierigkeit +1 in Etappe 2!', hpMod: -1, diffMod: 1 }
                },
                choices: [
                    {
                        id: '16_1A',
                        label: 'Die schweren Betonbrocken mit einem Hebel aus der Schneise wuchten',
                        attr: 'STR',
                        skill: 'athletics',
                        difficulty: 1,
                        desc: 'Schiebe ein Stahlrohr unter den größten Block und mache eine schmale Gasse zum Omega-Schott frei.',
                        successText: 'Lautlos gleitet der Block beiseite – der Zugang zum geheimnisvollen Omega-Schott liegt frei!',
                        failText: 'Ein kleinerer Brocken rutscht nach und trifft deinen Fuß (-1 TP), bevor der Weg passierbar ist.',
                        rewardItem: 'Omega-Korridor-Taschenlampe',
                        campaignNote: 'Tag 16 (Etappe 1): Verschütteten Zugang zu Sub-Level 4 freigeräumt.'
                    },
                    {
                        id: '16_1B',
                        label: 'Kleinen Sprengsatz punktgenau am verklemmten Träger zünden',
                        attr: 'PER',
                        skill: 'explosives',
                        difficulty: 2,
                        desc: 'Nutze eine winzige Richtladung, um exakt den stützenden Trümmerbolzen zu brechen, ohne das Schott zu beschädigen.',
                        successText: 'Präzisionssprengung! Der Durchgang öffnet sich wie eine sauber geschnittene Tür.',
                        failText: 'Die Druckwelle löst Deckenputz aus (-1 TP), und der Staub erschwert die Arbeit am Terminal.',
                        rewardItem: 'Satz Minensprengkapseln',
                        campaignNote: 'Tag 16 (Etappe 1): Trümmer vor Sub-Level 4 weggesprengt.'
                    }
                ]
            },
            {
                phaseTitle: 'ETAPPE 2: ANALYSE DES OMEGA-SCHOTTS',
                introOnSuccess: 'Vor dir thront das geheimnisvolle, eisig kalte Schott zu Sub-Level 4 mit seinen drei Schlüsselloch-Terminals.',
                introOnFail: 'Staub bedeckt die Konsole und deine Hände zittern leicht vom Geröll, als du das Omega-Terminal untersuchst.',
                choices: [
                    {
                        id: '16_2A',
                        label: 'Flüchtigen Diagnosespeicher auslesen & Code-Fragment 2 sichern',
                        attr: 'INT',
                        skill: 'science',
                        difficulty: 2,
                        desc: 'Kopple deinen Pip-Boy an den Service-Port und rekonstruiere den gelöschten Schlüsselpuffer.',
                        successText: 'Sensationell! Du rettest Code-Fragment 2 („BETA-CRYOCON“) für deine spätere Tisch-Kampagne!',
                        failText: 'Das Terminal löst eine Löschung aus; du reißt den Chip heraus (-1 TP durch Hitze), rettest aber das Fragment.',
                        rewardItem: 'Code-Fragment 2 („BETA-CRYOCON“) für Sub-Level 4',
                        campaignNote: 'Tag 16: Zweites Code-Fragment für Sub-Level 4 gesichert.'
                    },
                    {
                        id: '16_2B',
                        label: 'Mechanische Verriegelungsbolzen exakt vermessen & kartieren',
                        attr: 'PER',
                        skill: 'lockpick',
                        difficulty: 2,
                        desc: 'Analysiere mit Stethoskop und Messschieber die acht Titanbolzen des Panzerschotts.',
                        successText: 'Perfekte Bauskizze! Du weißt genau, wie das Schott arbeitet – Gold wert für Sitzung 1 der RPG-Runde.',
                        failText: 'Ein Rostbrocken fällt dir ins Gesicht (-1 TP), doch deine Skizze ist vollständig.',
                        rewardItem: 'Präzisions-Bauskizze: „Schott-Mechanik Sub-Level 4“',
                        campaignNote: 'Tag 16: Mechanik von Sub-Level 4 vollständig vermessen.'
                    }
                ]
            }
        ]
    }
];
