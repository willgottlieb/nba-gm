// NBA Cap Manager Data
// Last Updated: February 2026
// Source: Fanspo.com

const NBA_DATA = {
    // ====================================
    // SALARY CAP INFORMATION (2025-26)
    // ====================================
    salaryCap: 154647000,
    luxuryTax: 187895000,
    firstApron: 195945000,
    secondApron: 207824000,
    
    // ====================================
    // ALL 30 NBA TEAMS
    // ====================================
    teams: [
        {id: 1, name: "Atlanta Hawks", abbr: "ATL", city: "Atlanta", color: "#E03A3E"},
        {id: 2, name: "Boston Celtics", abbr: "BOS", city: "Boston", color: "#007A33"},
        {id: 3, name: "Brooklyn Nets", abbr: "BKN", city: "Brooklyn", color: "#000000"},
        {id: 4, name: "Charlotte Hornets", abbr: "CHA", city: "Charlotte", color: "#1D1160"},
        {id: 5, name: "Chicago Bulls", abbr: "CHI", city: "Chicago", color: "#CE1141"},
        {id: 6, name: "Cleveland Cavaliers", abbr: "CLE", city: "Cleveland", color: "#6F263D"},
        {id: 7, name: "Dallas Mavericks", abbr: "DAL", city: "Dallas", color: "#00538C"},
        {id: 8, name: "Denver Nuggets", abbr: "DEN", city: "Denver", color: "#0E2240"},
        {id: 9, name: "Detroit Pistons", abbr: "DET", city: "Detroit", color: "#C8102E"},
        {id: 10, name: "Golden State Warriors", abbr: "GSW", city: "Golden State", color: "#1D428A"},
        {id: 11, name: "Houston Rockets", abbr: "HOU", city: "Houston", color: "#CE1141"},
        {id: 12, name: "Indiana Pacers", abbr: "IND", city: "Indiana", color: "#002D62"},
        {id: 13, name: "LA Clippers", abbr: "LAC", city: "LA", color: "#C8102E"},
        {id: 14, name: "Los Angeles Lakers", abbr: "LAL", city: "Los Angeles", color: "#552583"},
        {id: 15, name: "Memphis Grizzlies", abbr: "MEM", city: "Memphis", color: "#5D76A9"},
        {id: 16, name: "Miami Heat", abbr: "MIA", city: "Miami", color: "#98002E"},
        {id: 17, name: "Milwaukee Bucks", abbr: "MIL", city: "Milwaukee", color: "#00471B"},
        {id: 18, name: "Minnesota Timberwolves", abbr: "MIN", city: "Minnesota", color: "#0C2340"},
        {id: 19, name: "New Orleans Pelicans", abbr: "NOP", city: "New Orleans", color: "#0C2340"},
        {id: 20, name: "New York Knicks", abbr: "NYK", city: "New York", color: "#006BB6"},
        {id: 21, name: "Oklahoma City Thunder", abbr: "OKC", city: "Oklahoma City", color: "#007AC1"},
        {id: 22, name: "Orlando Magic", abbr: "ORL", city: "Orlando", color: "#0077C0"},
        {id: 23, name: "Philadelphia 76ers", abbr: "PHI", city: "Philadelphia", color: "#006BB6"},
        {id: 24, name: "Phoenix Suns", abbr: "PHX", city: "Phoenix", color: "#1D1160"},
        {id: 25, name: "Portland Trail Blazers", abbr: "POR", city: "Portland", color: "#E03A3E"},
        {id: 26, name: "Sacramento Kings", abbr: "SAC", city: "Sacramento", color: "#5A2D81"},
        {id: 27, name: "San Antonio Spurs", abbr: "SAS", city: "San Antonio", color: "#C4CED4"},
        {id: 28, name: "Toronto Raptors", abbr: "TOR", city: "Toronto", color: "#CE1141"},
        {id: 29, name: "Utah Jazz", abbr: "UTA", city: "Utah", color: "#002B5C"},
        {id: 30, name: "Washington Wizards", abbr: "WAS", city: "Washington", color: "#002B5C"}
    ],
    
    // ====================================
    // TEAM ROSTERS (2025-26 Season)
    // ====================================
    // To add a new team roster:
    // 1. Copy the structure below
    // 2. Change the team ID number
    // 3. Add player objects with their stats
    // ====================================
    
    rosters: {
        // LOS ANGELES LAKERS (ID: 14)
        14: [
            {id: 1, name: "LeBron James", position: "SF", age: 40, salary: 52627153, years: 2, ppg: 24.4, rpg: 7.8, apg: 8.2, rating: 91},
            {id: 2, name: "Luka Dončić", position: "PG", age: 26, salary: 45999660, years: 4, ppg: 28.3, rpg: 8.3, apg: 7.8, rating: 97},
            {id: 3, name: "Rui Hachimura", position: "PF", age: 27, salary: 18259259, years: 1, ppg: 13.6, rpg: 4.3, apg: 1.2, rating: 77},
            {id: 4, name: "Austin Reaves", position: "SG", age: 27, salary: 13937574, years: 2, ppg: 15.9, rpg: 4.4, apg: 5.5, rating: 81},
            {id: 5, name: "Jarred Vanderbilt", position: "PF", age: 26, salary: 11571429, years: 3, ppg: 5.2, rpg: 4.8, apg: 1.2, rating: 73},
            {id: 6, name: "Luke Kennard", position: "SG", age: 29, salary: 11000000, years: 1, ppg: 11.0, rpg: 3.1, apg: 2.1, rating: 76},
            {id: 7, name: "Maxi Kleber", position: "C", age: 34, salary: 11000000, years: 1, ppg: 4.8, rpg: 2.9, apg: 1.0, rating: 72},
            {id: 8, name: "Deandre Ayton", position: "C", age: 27, salary: 8104000, years: 2, ppg: 14.0, rpg: 10.5, apg: 1.6, rating: 80},
            {id: 9, name: "Jake LaRavia", position: "PF", age: 24, salary: 6000000, years: 2, ppg: 8.2, rpg: 4.1, apg: 1.9, rating: 72},
            {id: 10, name: "Marcus Smart", position: "PG", age: 31, salary: 5134000, years: 2, ppg: 10.2, rpg: 3.1, apg: 4.1, rating: 78},
            {id: 11, name: "Dalton Knecht", position: "SG", age: 24, salary: 4010160, years: 3, ppg: 9.2, rpg: 3.1, apg: 0.9, rating: 74},
            {id: 12, name: "Jaxson Hayes", position: "C", age: 25, salary: 3449323, years: 1, ppg: 4.5, rpg: 3.0, apg: 0.4, rating: 70},
            {id: 13, name: "Bronny James", position: "PG", age: 21, salary: 1955377, years: 3, ppg: 5.0, rpg: 2.1, apg: 2.8, rating: 65},
        ],
        
        // GOLDEN STATE WARRIORS (ID: 10)
        10: [
            {id: 14, name: "Stephen Curry", position: "PG", age: 37, salary: 59606817, years: 2, ppg: 22.6, rpg: 4.2, apg: 6.5, rating: 90},
            {id: 15, name: "Jimmy Butler", position: "SF", age: 36, salary: 54126450, years: 2, ppg: 18.5, rpg: 5.1, apg: 4.8, rating: 87},
            {id: 16, name: "Draymond Green", position: "PF", age: 35, salary: 25892857, years: 2, ppg: 8.3, rpg: 6.2, apg: 5.5, rating: 78},
            {id: 17, name: "Jonathan Kuminga", position: "PF", age: 23, salary: 22500000, years: 2, ppg: 16.8, rpg: 5.2, apg: 2.2, rating: 81},
            {id: 18, name: "Moses Moody", position: "SG", age: 23, salary: 11574075, years: 3, ppg: 8.1, rpg: 3.1, apg: 0.8, rating: 74},
            {id: 19, name: "Buddy Hield", position: "SG", age: 33, salary: 9219512, years: 3, ppg: 12.8, rpg: 3.4, apg: 2.3, rating: 76},
            {id: 20, name: "Al Horford", position: "C", age: 39, salary: 5685000, years: 2, ppg: 8.2, rpg: 6.2, apg: 2.5, rating: 74},
            {id: 21, name: "Brandin Podziemski", position: "SG", age: 22, salary: 3687960, years: 2, ppg: 9.2, rpg: 5.8, apg: 3.7, rating: 76},
            {id: 22, name: "De'Anthony Melton", position: "SG", age: 27, salary: 3080921, years: 2, ppg: 8.5, rpg: 3.4, apg: 2.9, rating: 73},
            {id: 23, name: "Gary Payton II", position: "PG", age: 33, salary: 3303774, years: 1, ppg: 4.5, rpg: 2.8, apg: 1.5, rating: 71},
            {id: 24, name: "Trayce Jackson-Davis", position: "C", age: 25, salary: 2221677, years: 2, ppg: 6.8, rpg: 4.5, apg: 1.2, rating: 73},
        ],
        
        // ADD MORE TEAM ROSTERS HERE
        // Copy the format above and change the team ID
        // Example:
        // 2: [ // Boston Celtics
        //     {id: 100, name: "Jayson Tatum", position: "SF", age: 26, salary: 34848340, years: 4, ppg: 26.9, rpg: 8.1, apg: 4.9, rating: 95},
        //     // ... more players
        // ],
    },
    
    // ====================================
    // 2026 FREE AGENTS
    // ====================================
    freeAgents: [
        {id: 100, name: "Trae Young", position: "PG", age: 27, ppg: 24.2, rpg: 2.8, apg: 11.6, rating: 88, demandYears: 4, demandSalary: 42000000},
        {id: 101, name: "James Harden", position: "PG", age: 36, ppg: 18.1, rpg: 5.4, apg: 9.6, rating: 84, demandYears: 2, demandSalary: 35000000},
        {id: 102, name: "Kristaps Porzingis", position: "C", age: 30, ppg: 19.5, rpg: 7.0, apg: 2.0, rating: 85, demandYears: 3, demandSalary: 32000000},
        {id: 103, name: "DeMar DeRozan", position: "SF", age: 36, ppg: 24.0, rpg: 4.3, apg: 5.3, rating: 84, demandYears: 2, demandSalary: 28000000},
        {id: 104, name: "Bradley Beal", position: "SG", age: 32, ppg: 18.2, rpg: 3.9, apg: 4.8, rating: 82, demandYears: 3, demandSalary: 30000000},
        {id: 105, name: "Fred VanVleet", position: "PG", age: 32, ppg: 15.5, rpg: 3.8, apg: 6.2, rating: 79, demandYears: 3, demandSalary: 22000000},
        {id: 106, name: "Nikola Vučević", position: "C", age: 34, ppg: 20.1, rpg: 9.8, apg: 3.2, rating: 81, demandYears: 2, demandSalary: 20000000},
        {id: 107, name: "CJ McCollum", position: "SG", age: 34, ppg: 20.8, rpg: 4.1, apg: 4.6, rating: 80, demandYears: 2, demandSalary: 18000000},
    ],
    
    // ====================================
    // 2026 NBA DRAFT PROSPECTS
    // ====================================
    draftProspects: [
        {id: 200, name: "Darryn Peterson", position: "SG/PG", college: "Kansas", rating: 96, potentialPPG: 24, potentialRPG: 5, potentialAPG: 6, age: 19},
        {id: 201, name: "Cameron Boozer", position: "PF", college: "Duke", rating: 95, potentialPPG: 23, potentialRPG: 11, potentialAPG: 4, age: 18},
        {id: 202, name: "AJ Dybantsa", position: "SF", college: "BYU", rating: 96, potentialPPG: 22, potentialRPG: 7, potentialAPG: 5, age: 18},
        {id: 203, name: "Caleb Wilson", position: "C", college: "UNC", rating: 91, potentialPPG: 18, potentialRPG: 10, potentialAPG: 3, age: 19},
        {id: 204, name: "Kingston Flemings", position: "PG", college: "USC", rating: 90, potentialPPG: 19, potentialRPG: 4, potentialAPG: 8, age: 19},
        {id: 205, name: "Nate Ament", position: "PF", college: "Tennessee", rating: 89, potentialPPG: 17, potentialRPG: 9, potentialAPG: 3, age: 19},
        {id: 206, name: "Kasparas Jakucionis", position: "PG", college: "Illinois", rating: 88, potentialPPG: 18, potentialRPG: 4, potentialAPG: 7, age: 19},
        {id: 207, name: "Ace Bailey", position: "SF", college: "Rutgers", rating: 87, potentialPPG: 20, potentialRPG: 7, potentialAPG: 3, age: 18},
        {id: 208, name: "Dylan Harper", position: "PG", college: "Rutgers", rating: 89, potentialPPG: 19, potentialRPG: 5, potentialAPG: 7, age: 19},
        {id: 209, name: "Darius Acuff", position: "PG", college: "Arkansas", rating: 86, potentialPPG: 18, potentialRPG: 3, potentialAPG: 6, age: 19},
    ]
};
