/**
 * ==========================================================================
 * VAULT 84: 24-TAGE SOLO-ADVENTSKALENDER (FALLOUT 2D20)
 * "PROTOKOLL WINTERSCHLAF"
 * Combines all 24 deeply expanded atmospheric story days from:
 * - Part 1 (Days 1 - 8: Phase 1 - Das Erwachen, Lebenserhaltung & Nikolaustag)
 * - Part 2 (Days 9 - 16: Phase 2 - Bewohner, Roboter, Hydroponik & Hauptreaktor)
 * - Part 3 (Days 17 - 24: Phase 3 - Werkstatt, Tor, Antenne & Heiligabend-Showdown)
 * ==========================================================================
 */

window.STORY_DAYS = [
    ...(window.STORY_DAYS_PART1 || []),
    ...(window.STORY_DAYS_PART2 || []),
    ...(window.STORY_DAYS_PART3 || [])
];
