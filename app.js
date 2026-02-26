// NBA Cap Manager - Main Application
const { useState, useEffect } = React;

function NBACapManager() {
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [roster, setRoster] = useState([]);
    const [activeTab, setActiveTab] = useState('roster');
    const [selectedFA, setSelectedFA] = useState(null);
    const [offerYears, setOfferYears] = useState(1);
    const [offerSalary, setOfferSalary] = useState(0);
    const [notification, setNotification] = useState({ show: false, message: '' });

    useEffect(() => {
        if (selectedTeam) {
            setRoster(NBA_DATA.rosters[selectedTeam.id] || []);
        }
    }, [selectedTeam]);

    const getTotalSalary = () => roster.reduce((sum, p) => sum + p.salary, 0);
    const getCapSpace = () => NBA_DATA.salaryCap - getTotalSalary();
    const getLuxuryTaxAmount = () => {
        const total = getTotalSalary();
        return total <= NBA_DATA.luxuryTax ? 0 : (total - NBA_DATA.luxuryTax) * 1.5;
    };

    const showAlert = (message) => {
        setNotification({ show: true, message });
        setTimeout(() => setNotification({ show: false, message: '' }), 3000);
    };

    const cutPlayer = (playerId) => {
        setRoster(roster.filter(p => p.id !== playerId));
        showAlert('Player released from roster');
    };

    const signFreeAgent = () => {
        if (!selectedFA) return;
        
        if (getTotalSalary() + offerSalary > NBA_DATA.secondApron) {
            showAlert(`Cannot sign - would exceed Second Apron ($${(NBA_DATA.secondApron/1000000).toFixed(1)}M)!`);
            return;
        }

        setRoster([...roster, { 
            ...selectedFA, 
            id: Date.now(), 
            salary: offerSalary, 
            years: offerYears 
        }]);
        setSelectedFA(null);
        showAlert(`Successfully signed ${selectedFA.name} to a ${offerYears}-year, $${(offerSalary/1000000).toFixed(1)}M contract!`);
    };

    // Team Selection Screen
    if (!selectedTeam) {
        return (
            <div className="min-h-screen gradient-bg py-12 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-5xl font-black text-white mb-4">NBA Cap Manager</h1>
                        <p className="text-xl text-purple-100 mb-2">Build your championship roster. Manage the cap. Draft your future.</p>
                        <p className="text-sm text-purple-200">Real 2025-26 data from Fanspo</p>
                    </div>
                    
                    <div className="bg-white rounded-2xl shadow-2xl p-8">
                        <h2 className="text-2xl font-bold mb-6 text-gray-800">Select Your Team</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                            {NBA_DATA.teams.map(team => (
                                <button
                                    key={team.id}
                                    onClick={() => setSelectedTeam(team)}
                                    className="card-hover bg-white border-2 border-gray-200 rounded-xl p-4 text-center hover:border-purple-500"
                                >
                                    <div 
                                        className="team-logo mx-auto mb-2"
                                        style={{ backgroundColor: team.color }}
                                    >
                                        {team.abbr.substring(0, 2)}
                                    </div>
                                    <h3 className="font-bold text-sm text-gray-800">{team.city}</h3>
                                    <p className="text-xs text-gray-500">{team.abbr}</p>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Main GM Interface
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="gradient-bg text-white py-6 px-4 shadow-lg">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div className="flex items-center gap-4">
                            <div 
                                className="team-logo"
                                style={{ backgroundColor: selectedTeam.color }}
                            >
                                {selectedTeam.abbr.substring(0, 2)}
                            </div>
                            <div>
                                <h1 className="text-3xl font-black">{selectedTeam.name}</h1>
                                <p className="text-purple-200">General Manager Mode</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setSelectedTeam(null)}
                            className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg font-semibold transition"
                        >
                            Change Team
                        </button>
                    </div>
                </div>
            </div>

            {/* Cap Summary Cards */}
            <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white rounded-xl p-5 shadow-md">
                        <div className="text-sm text-gray-500 mb-1">Total Salary</div>
                        <div className="text-2xl font-bold text-gray-800">
                            ${(getTotalSalary()/1000000).toFixed(1)}M
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-5 shadow-md">
                        <div className="text-sm text-gray-500 mb-1">Cap Space</div>
                        <div className={`text-2xl font-bold ${getCapSpace() >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            ${Math.abs(getCapSpace()/1000000).toFixed(1)}M
                        </div>
                        <div className="text-xs text-gray-400 mt-1">Cap: ${(NBA_DATA.salaryCap/1000000).toFixed(1)}M</div>
                    </div>
                    <div className="bg-white rounded-xl p-5 shadow-md">
                        <div className="text-sm text-gray-500 mb-1">Luxury Tax</div>
                        <div className={`text-2xl font-bold ${getLuxuryTaxAmount() > 0 ? 'text-red-600' : 'text-gray-800'}`}>
                            ${(getLuxuryTaxAmount()/1000000).toFixed(1)}M
                        </div>
                        <div className="text-xs text-gray-400 mt-1">Line: ${(NBA_DATA.luxuryTax/1000000).toFixed(1)}M</div>
                    </div>
                    <div className="bg-white rounded-xl p-5 shadow-md">
                        <div className="text-sm text-gray-500 mb-1">Roster Size</div>
                        <div className="text-2xl font-bold text-gray-800">{roster.length}/15</div>
                        <div className="text-xs text-gray-400 mt-1">
                            Apron: ${Math.max(0, (NBA_DATA.secondApron - getTotalSalary())/1000000).toFixed(1)}M
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="bg-white rounded-xl shadow-md mb-6">
                    <div className="border-b border-gray-200">
                        <div className="flex">
                            {['roster', 'freeagents', 'draft'].map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-6 py-4 font-semibold capitalize transition ${
                                        activeTab === tab
                                            ? 'border-b-2 border-purple-600 text-purple-600'
                                            : 'text-gray-500 hover:text-gray-700'
                                    }`}
                                >
                                    {tab === 'freeagents' ? 'Free Agents' : tab}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Tab Content */}
                    <div className="p-6">
                        {activeTab === 'roster' && <RosterTab roster={roster} cutPlayer={cutPlayer} />}
                        {activeTab === 'freeagents' && (
                            <FreeAgentsTab 
                                setSelectedFA={setSelectedFA}
                                setOfferYears={setOfferYears}
                                setOfferSalary={setOfferSalary}
                            />
                        )}
                        {activeTab === 'draft' && <DraftTab />}
                    </div>
                </div>
            </div>

            {/* Notification */}
            {notification.show && (
                <div className="fixed bottom-8 right-8 bg-gray-900 text-white px-6 py-4 rounded-lg shadow-2xl z-50 animate-bounce">
                    <p className="font-semibold">{notification.message}</p>
                </div>
            )}

            {/* Contract Offer Modal */}
            {selectedFA && (
                <ContractModal 
                    selectedFA={selectedFA}
                    offerYears={offerYears}
                    offerSalary={offerSalary}
                    setOfferYears={setOfferYears}
                    setOfferSalary={setOfferSalary}
                    signFreeAgent={signFreeAgent}
                    onClose={() => setSelectedFA(null)}
                />
            )}
        </div>
    );
}

// Roster Tab Component
function RosterTab({ roster, cutPlayer }) {
    if (roster.length === 0) {
        return (
            <div className="text-center py-12 text-gray-400">
                <p>No players on roster. Sign some free agents!</p>
            </div>
        );
    }

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Current Roster</h2>
            <div className="space-y-3">
                {roster.map(player => (
                    <div key={player.id} className="bg-gray-50 rounded-lg p-4 flex items-center justify-between hover:bg-gray-100 transition">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                                <h3 className="font-bold text-lg">{player.name}</h3>
                                <span className="position-badge">{player.position}</span>
                                <span className="stat-badge bg-blue-100 text-blue-700">OVR {player.rating}</span>
                            </div>
                            <div className="flex gap-4 text-sm text-gray-600">
                                <span>{player.ppg} PPG</span>
                                <span>{player.rpg} RPG</span>
                                <span>{player.apg} APG</span>
                                <span>Age: {player.age}</span>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="font-bold text-lg text-gray-800">
                                ${(player.salary/1000000).toFixed(1)}M
                            </div>
                            <div className="text-sm text-gray-500">{player.years} year{player.years > 1 ? 's' : ''}</div>
                            <button
                                onClick={() => cutPlayer(player.id)}
                                className="mt-2 text-xs bg-red-100 text-red-700 px-3 py-1 rounded-full hover:bg-red-200 transition font-semibold"
                            >
                                Release
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// Free Agents Tab Component
function FreeAgentsTab({ setSelectedFA, setOfferYears, setOfferSalary }) {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">2026 NBA Free Agents</h2>
            <div className="space-y-3">
                {NBA_DATA.freeAgents.map(fa => (
                    <div key={fa.id} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h3 className="font-bold text-lg">{fa.name}</h3>
                                    <span className="position-badge">{fa.position}</span>
                                    <span className="stat-badge bg-blue-100 text-blue-700">OVR {fa.rating}</span>
                                </div>
                                <div className="flex gap-4 text-sm text-gray-600 mb-3">
                                    <span>{fa.ppg} PPG</span>
                                    <span>{fa.rpg} RPG</span>
                                    <span>{fa.apg} APG</span>
                                    <span>Age: {fa.age}</span>
                                </div>
                                <div className="text-sm text-gray-600">
                                    Asking: {fa.demandYears} years, ${(fa.demandSalary/1000000).toFixed(1)}M per year
                                </div>
                            </div>
                            <button
                                onClick={() => {
                                    setSelectedFA(fa);
                                    setOfferYears(fa.demandYears);
                                    setOfferSalary(fa.demandSalary);
                                }}
                                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition font-semibold"
                            >
                                Make Offer
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// Draft Tab Component
function DraftTab() {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">2026 NBA Draft Prospects</h2>
            <div className="space-y-3">
                {NBA_DATA.draftProspects.map((prospect, index) => (
                    <div key={prospect.id} className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                                {index + 1}
                            </div>
                            <div>
                                <div className="flex items-center gap-3 mb-1">
                                    <h3 className="font-bold text-lg">{prospect.name}</h3>
                                    <span className="position-badge">{prospect.position}</span>
                                    <span className="stat-badge bg-green-100 text-green-700">POT {prospect.rating}</span>
                                </div>
                                <div className="text-sm text-gray-600">{prospect.college} • Age {prospect.age}</div>
                                <div className="flex gap-4 text-sm text-gray-500 mt-1">
                                    <span>Proj: {prospect.potentialPPG} PPG</span>
                                    <span>{prospect.potentialRPG} RPG</span>
                                    <span>{prospect.potentialAPG} APG</span>
                                </div>
                            </div>
                        </div>
                        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition font-semibold">
                            Draft
                        </button>
                    </div>
                ))}
            </div>
            <div className="mt-6 text-center text-gray-500 text-sm">
                Full 60-pick draft simulator coming soon!
            </div>
        </div>
    );
}

// Contract Offer Modal Component
function ContractModal({ selectedFA, offerYears, offerSalary, setOfferYears, setOfferSalary, signFreeAgent, onClose }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-8 max-w-lg w-full">
                <h3 className="text-2xl font-bold mb-4">Contract Offer: {selectedFA.name}</h3>
                <div className="space-y-4 mb-6">
                    <div>
                        <label className="block text-sm font-semibold mb-2 text-gray-700">Years</label>
                        <input
                            type="number"
                            min="1"
                            max="5"
                            value={offerYears}
                            onChange={(e) => setOfferYears(parseInt(e.target.value))}
                            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-2 text-gray-700">Annual Salary ($M)</label>
                        <input
                            type="number"
                            min="0"
                            step="0.1"
                            value={offerSalary/1000000}
                            onChange={(e) => setOfferSalary(parseFloat(e.target.value) * 1000000)}
                            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                        />
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                        <div className="text-sm text-gray-600">Total Contract Value</div>
                        <div className="text-2xl font-bold text-purple-600">
                            ${((offerSalary * offerYears)/1000000).toFixed(1)}M
                        </div>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={signFreeAgent}
                        className="flex-1 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition font-bold"
                    >
                        Sign Player
                    </button>
                    <button
                        onClick={onClose}
                        className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition font-bold"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

// Render the app
ReactDOM.render(<NBACapManager />, document.getElementById('root'));
