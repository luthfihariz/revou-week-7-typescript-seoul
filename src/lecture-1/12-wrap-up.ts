// ============================================================
// Lecture 1 — Wrap-up Demo
// SUPERHERO TEAM BUILDER
// ============================================================
// This demo uses EVERYTHING we learned today:
//   ✓ Type annotations & inference
//   ✓ number, string, boolean
//   ✓ Objects, arrays, tuples
//   ✓ Union types
//   ✓ any (and why to avoid it)
//   ✓ Functions: typed, void, optional, default, rest
// ============================================================

// --- UNION TYPE: a hero's current status ---
type HeroStatus = "active" | "retired" | "missing";

// --- OBJECT TYPE: what a hero looks like ---
let hero: {
  name: string;
  alias: string;
  power: number;
  status: HeroStatus;
};

// Assign the first hero
hero = {
  name: "Peter Parker",
  alias: "Spider-Man",
  power: 88,
  status: "active",
};
console.log("Hero:", hero);

// --- ARRAY OF OBJECTS: the full team roster ---
let team: {
  name: string;
  alias: string;
  power: number;
  status: HeroStatus;
}[] = [
  { name: "Peter Parker",    alias: "Spider-Man",  power: 88, status: "active"  },
  { name: "Tony Stark",      alias: "Iron Man",    power: 95, status: "retired" },
  { name: "Natasha Romanov", alias: "Black Widow", power: 82, status: "active"  },
  { name: "Bruce Banner",    alias: "Hulk",        power: 99, status: "active"  },
  { name: "Clint Barton",    alias: "Hawkeye",     power: 78, status: "missing" },
];

// --- TUPLE: a mission record — [missionName, successRate] ---
let lastMission: [string, number] = ["Operation Seoul", 94.5];
console.log(`Last mission: ${lastMission[0]} — ${lastMission[1]}% success`);

// ============================================================
// FUNCTIONS
// ============================================================

// Typed params + return type
function getPowerLevel(power: number): string {
  if (power >= 95) return "Legendary";
  if (power >= 85) return "Elite";
  if (power >= 75) return "Standard";
  return "Rookie";
}

// Void function — just prints, returns nothing
function announceHero(alias: string, status: HeroStatus): void {
  console.log(`[${status.toUpperCase()}] ${alias} is ready.`);
}

// Optional parameter
function introduce(alias: string, catchphrase?: string): string {
  return catchphrase
    ? `I am ${alias}. "${catchphrase}"`
    : `I am ${alias}.`;
}

// Default parameter
function boostPower(power: number, boost: number = 10): number {
  return power + boost;
}

// Rest parameter — calculate average power of any number of heroes
function averagePower(...powers: number[]): number {
  const total = powers.reduce((sum, p) => sum + p, 0);
  return Math.round(total / powers.length);
}

// ============================================================
// LET'S RUN IT
// ============================================================

console.log("\n========== SUPERHERO TEAM BUILDER ==========\n");

// Print every hero's profile
team.forEach((h) => {
  const level = getPowerLevel(h.power);
  console.log(`${h.alias.padEnd(14)} | Power: ${h.power} (${level}) | ${h.status}`);
});

console.log("\n--- Announcements ---");
team
  .filter((h) => h.status === "active")
  .forEach((h) => announceHero(h.alias, h.status));

console.log("\n--- Introductions ---");
console.log(introduce("Spider-Man", "With great power comes great responsibility."));
console.log(introduce("Hulk")); // no catchphrase — optional param omitted

console.log("\n--- Power Boost ---");
const boostedPower = boostPower(hero.power);
console.log(`${hero.alias} power boosted: ${hero.power} → ${boostedPower}`);

const bigBoost = boostPower(hero.power, 50);
console.log(`${hero.alias} BIG boost: ${hero.power} → ${bigBoost}`);

console.log("\n--- Team Average Power ---");
const avg = averagePower(...team.map((h) => h.power));
console.log(`Team average power: ${avg} (${getPowerLevel(avg)})`);

console.log("\n=============================================");
