# 🏀 NBA Cap Manager

Build your championship roster with real NBA data. Manage salary cap, sign free agents, and draft prospects.

**Live Demo:** https://willgottlieb.github.io/nba-cap-manager/

---

## 📁 Repository Files

```
nba-cap-manager/
├── index.html          ← Main HTML file (entry point)
├── data.js            ← NBA data (EASY TO UPDATE!)
├── app.js             ← React application code
├── styles.css         ← Custom styling
└── README.md          ← This file
```

---

## 🚀 STEP-BY-STEP DEPLOYMENT GUIDE

### Step 1: Delete Your Old Repository

1. Go to https://github.com/willgottlieb/nba-cap-manager
2. Click **Settings** (tab at top)
3. Scroll to bottom → **Danger Zone**
4. Click **Delete this repository**
5. Type `willgottlieb/nba-cap-manager` to confirm
6. Click **I understand the consequences, delete this repository**

### Step 2: Create New Repository

1. Go to https://github.com/new
2. Repository name: `nba-cap-manager`
3. Description: `NBA salary cap simulator with real data`
4. Select **Public**
5. ✅ Check **"Add a README file"**
6. Click **Create repository**

### Step 3: Upload Files

1. In your new repo, click **"Add file"** → **"Upload files"**
2. **Drag and drop ALL 4 files:**
   - `index.html`
   - `data.js`
   - `app.js`
   - `styles.css`
3. Delete the default README.md that was created
4. Upload the new `README.md` from this package
5. Commit message: `Initial commit - NBA Cap Manager`
6. Click **"Commit changes"**

### Step 4: Enable GitHub Pages

1. Go to **Settings** → **Pages** (left sidebar)
2. Under **"Source"**, select:
   - Branch: `main`
   - Folder: `/ (root)`
3. Click **Save**
4. Wait 1-2 minutes

### Step 5: Visit Your Site! 🎉

**https://willgottlieb.github.io/nba-cap-manager/**

---

## ✅ Verification Checklist

After uploading, your repo should look like this:

```
✅ index.html
✅ data.js
✅ app.js
✅ styles.css
✅ README.md
```

If you see all 5 files, you're good to go!

---

## 📝 HOW TO UPDATE ROSTERS (EASY!)

All NBA data is in **`data.js`** - this is the ONLY file you need to edit!

### To Update a Team Roster:

1. Go to your repo
2. Click on **`data.js`**
3. Click the **pencil icon** (✏️) to edit
4. Find the team you want to update (search for team name)
5. Edit player stats, salaries, etc.
6. Scroll down → **Commit changes**

### Example: Update Lakers Roster

```javascript
// Find this section in data.js:
14: [  // LOS ANGELES LAKERS
    {id: 1, name: "LeBron James", position: "SF", age: 40, salary: 52627153, years: 2, ppg: 24.4, rpg: 7.8, apg: 8.2, rating: 91},
    // ... more players
]

// To change LeBron's stats:
{id: 1, name: "LeBron James", position: "SF", age: 41, salary: 55000000, years: 1, ppg: 23.5, rpg: 7.5, apg: 8.0, rating: 90},
```

### To Add a New Team:

```javascript
// In data.js, find the rosters section and add:
2: [  // BOSTON CELTICS
    {id: 100, name: "Jayson Tatum", position: "SF", age: 26, salary: 34848340, years: 4, ppg: 26.9, rpg: 8.1, apg: 4.9, rating: 95},
    {id: 101, name: "Jaylen Brown", position: "SG", age: 27, salary: 49205800, years: 4, ppg: 23.0, rpg: 5.5, apg: 3.6, rating: 90},
    // ... add more players
],
```

### To Update Free Agents:

```javascript
// In data.js, find freeAgents array:
freeAgents: [
    {id: 100, name: "New Player", position: "PG", age: 28, ppg: 20.0, rpg: 4.0, apg: 8.0, rating: 85, demandYears: 3, demandSalary: 25000000},
    // Add more free agents here
]
```

---

## 🎨 CUSTOMIZATION

### Change Team Colors

Colors are already set to **real NBA team colors** in `data.js`:

```javascript
{id: 14, name: "Los Angeles Lakers", abbr: "LAL", city: "Los Angeles", color: "#552583"}
```

### Change Gradient Background

Edit `styles.css`:

```css
.gradient-bg {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    /* Change to your colors */
}
```

### Update Salary Cap Numbers

Edit `data.js`:

```javascript
salaryCap: 154647000,      // Change this
luxuryTax: 187895000,      // And this
firstApron: 195945000,     // And this
secondApron: 207824000,    // And this
```

---

## 🐛 TROUBLESHOOTING

### Site Shows 404 Error
- ✅ Make sure file is named **exactly** `index.html` (lowercase)
- ✅ Check that GitHub Pages is enabled in Settings → Pages
- ✅ Wait 2-3 minutes after uploading
- ✅ Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)

### App Not Loading
- ✅ Make sure **all 4 files** are uploaded (index.html, data.js, app.js, styles.css)
- ✅ Check browser console (F12) for errors
- ✅ Make sure you're using a modern browser (Chrome, Firefox, Safari, Edge)

### Styles Look Broken
- ✅ Check if `styles.css` is in the root folder
- ✅ Make sure Tailwind CSS CDN is loading (check browser console)
- ✅ Hard refresh: Ctrl+Shift+R

### Data Not Showing
- ✅ Open browser console (F12)
- ✅ Look for JavaScript errors
- ✅ Make sure `data.js` has no syntax errors (missing commas, brackets, etc.)

---

## 📊 DATA SOURCES

- **Team Colors:** Official NBA branding
- **Rosters & Contracts:** Fanspo.com (2025-26 season)
- **Free Agents:** 2026 class from Spotrac/ESPN
- **Draft Prospects:** 2026 rankings from Tankathon/ESPN
- **Salary Cap:** Official NBA 2025-26 numbers

---

## 🛠️ TECH STACK

- **React 18** (via CDN - no build process!)
- **Tailwind CSS** (via CDN)
- **Vanilla JavaScript**
- **No backend required** - runs 100% in browser

---

## 🔄 UPDATING YOUR SITE

Every time you edit `data.js`:

1. Click **Commit changes**
2. Wait 30-60 seconds
3. Hard refresh your site (Ctrl+Shift+R)
4. Changes will appear!

No need to rebuild or redeploy - GitHub Pages does it automatically.

---

## 📱 MOBILE FRIENDLY

The app is fully responsive and works on:
- ✅ Desktop
- ✅ Tablet
- ✅ Mobile phones

---

## 📄 LICENSE

Free to use for personal and commercial projects. Please credit if sharing publicly.

---

## 🆘 NEED HELP?

1. Check browser console for errors (F12)
2. Make sure all files are uploaded
3. Verify GitHub Pages is enabled
4. Wait a few minutes after making changes

---

## 🎯 ROADMAP

Coming soon:
- [ ] Full 60-pick draft simulator
- [ ] Trade machine with salary matching
- [ ] All 30 team rosters
- [ ] Contract restructuring
- [ ] Multi-year cap projections
- [ ] Export/import rosters

---

Built with ❤️ for NBA fans by the community