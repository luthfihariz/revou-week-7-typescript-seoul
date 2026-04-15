// --- OBJECT TYPE: a player ---
let player;
player = {
    username: "ProGamer99",
    level: 88,
    rank: "epic",
    winRate: 62.5,
    isOnline: true,
};
console.log("Player:", player);
// --- ARRAY OF OBJECTS: team roster ---
let team = [
    { username: "ProGamer99", hero: "Chou", role: "fighter", kda: 4.2, isReady: true },
    { username: "SniperKing", hero: "Layla", role: "marksman", kda: 6.1, isReady: true },
    { username: "MidOrFeed", hero: "Kagura", role: "mage", kda: 3.8, isReady: false },
    { username: "TankMaster", hero: "Johnson", role: "tank", kda: 2.1, isReady: true },
    { username: "ShadowBlade", hero: "Lancelot", role: "assassin", kda: 7.4, isReady: true },
];
// --- TUPLE: match result — [matchId, duration (minutes), result] ---
let lastMatch = [9823741, 18, "win"];
console.log(`Last match #${lastMatch[0]} — ${lastMatch[1]} mins — ${lastMatch[2].toUpperCase()}`);
// ============================================================
// FUNCTIONS
// ============================================================
// Typed params + return type — get rank badge
function getRankBadge(rank) {
    const badges = {
        warrior: "🥉", elite: "🥈", master: "🥇",
        grandmaster: "💎", epic: "🔮", legend: "🏆", mythic: "👑",
    };
    return badges[rank] ?? "❓";
}
// Void — announce player status
function announcePlayer(username, rank, isOnline) {
    const status = isOnline ? "🟢 Online" : "🔴 Offline";
    console.log(`  ${getRankBadge(rank)} ${username.padEnd(15)} ${rank.padEnd(12)} ${status}`);
}
// Optional param — draft a hero with optional ban note
function draftHero(hero, role, banReason) {
    return banReason
        ? `${hero} (${role}) — BANNED: ${banReason}`
        : `${hero} (${role}) — PICKED`;
}
// Default param — calculate damage with default crit multiplier
function calcDamage(baseDamage, critMultiplier = 1.8) {
    return Math.round(baseDamage * critMultiplier);
}
// Rest param — total gold from multiple kills/objectives
function totalGold(...goldSources) {
    return goldSources.reduce((sum, g) => sum + g, 0);
}
// Function inference — check if KDA is carry-worthy
function isCarry(kda) {
    return kda >= 5.0; // inferred: boolean
}
// ============================================================
// LET'S RUN IT
// ============================================================
console.log("\n========== MOBILE LEGENDS MATCH TRACKER ==========\n");
console.log(`Player: ${player.username} | Level ${player.level}`);
console.log(`Rank: ${getRankBadge(player.rank)} ${player.rank.toUpperCase()} | Win Rate: ${player.winRate}%`);
console.log("\n--- Team Roster ---");
team.forEach((p) => {
    const carry = isCarry(p.kda) ? "⭐ CARRY" : "";
    const ready = p.isReady ? "✓" : "✗ NOT READY";
    console.log(`  ${ready.padEnd(12)} ${p.username.padEnd(15)} ${p.hero.padEnd(10)} KDA: ${p.kda} ${carry}`);
});
console.log("\n--- Ready Check ---");
const readyCount = team.filter((p) => p.isReady).length;
console.log(`${readyCount}/${team.length} players ready ${readyCount === team.length ? "— GO!" : "— WAITING..."}`);
console.log("\n--- Hero Draft ---");
console.log(draftHero("Chou", "fighter"));
console.log(draftHero("Kagura", "mage", "enemy counters with Valir"));
console.log(draftHero("Johnson", "tank"));
console.log("\n--- Damage Calculator ---");
console.log(`Normal hit:   ${calcDamage(1200)} damage`);
console.log(`Critical hit: ${calcDamage(1200, 2.5)} damage`);
console.log("\n--- Gold Income ---");
const gold = totalGold(500, 350, 200, 1000, 150, 300);
console.log(`Total gold this match: ${gold.toLocaleString()}`);
console.log("\n===================================================");
export {};
