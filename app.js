// NBA GM - Main Application
// Bulls Cap Sheet Style UI

const { useState, useEffect } = React;

function NBACapManager() {
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [roster, setRoster] = useState([]);

    useEffect(() => {
        if (selectedTeam) {
            setRoster(NBA_DATA.rosters[selectedTeam.id] || []);
        }
    }, [selectedTeam]);

    const getTotalSalary = (year) => {
        return roster.reduce((sum, p) => {
            if (year === '2025') return sum + p.salary2025;
            if (year === '2026') return sum + (p.salary2026 || 0);
            if (year === '2027') return sum + (p.salary2027 || 0);
            if (year === '2028') return sum + (p.salary2028 || 0);
            return sum;
        }, 0);
    };

    const formatMoney = (amount) => {
        if (!amount || amount === 0) return '-';
        return '$' + (amount / 1000000).toFixed(2) + 'M';
    };

    const formatMoneyShort = (amount) => {
        if (!amount || amount === 0) return '-';
        return '$' + (amount / 1000000).toFixed(1) + 'M';
    };

    // Team Selection Screen
    if (!selectedTeam) {
        return (
            <div className="min-h-screen gradient-bg py-12 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-5xl font-black text-white mb-4">NBA GM</h1>
                        <p className="text-xl text-purple-100">You're the GM: manage your team's roster</p>
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
                                    <img 
                                        src={team.logo}
                                        alt={team.name}
                                        className="w-16 h-16 mx-auto mb-3 object-contain"
                                    />
                                    <h3 className="font-bold text-sm text-gray-800">{team.name}</h3>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Calculate cap numbers
    const salary2025 = getTotalSalary('2025');
    const salary2026 = getTotalSalary('2026');
    const salary2027 = getTotalSalary('2027');
    const salary2028 = getTotalSalary('2028');
    const capSpace = NBA_DATA.salaryCap - salary2025;
    const luxuryTaxAmount = salary2025 > NBA_DATA.luxuryTax ? (salary2025 - NBA_DATA.luxuryTax) * 1.5 : 0;

    // Main GM Interface - Bulls Cap Sheet Style
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="gradient-bg text-white py-6 px-4 shadow-lg">
                <div className="max-w-full mx-auto px-4">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div className="flex items-center gap-4">
                            <img 
                                src={selectedTeam.logo}
                                alt={selectedTeam.name}
                                className="w-16 h-16 object-contain"
                            />
                            <div>
                                <h1 className="text-3xl font-black">{selectedTeam.name}</h1>
                                <p className="text-purple-200">Salary Cap Manager</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setSelectedTeam(null)}
                            className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg font-semibold transition"
                        >
                            ← Back to Teams
                        </button>
                    </div>
                </div>
            </div>

            {/* Cap Summary */}
            <div className="max-w-full mx-auto px-4 py-6">
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div>
                            <div className="text-sm text-gray-500 mb-1">Total Payroll (2025-26)</div>
                            <div className="text-2xl font-bold text-gray-800">{formatMoneyShort(salary2025)}</div>
                        </div>
                        <div>
                            <div className="text-sm text-gray-500 mb-1">Cap Space</div>
                            <div className={`text-2xl font-bold ${capSpace >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {formatMoneyShort(Math.abs(capSpace))}
                            </div>
                            <div className="text-xs text-gray-400">Salary Cap: {formatMoneyShort(NBA_DATA.salaryCap)}</div>
                        </div>
                        <div>
                            <div className="text-sm text-gray-500 mb-1">Luxury Tax Bill</div>
                            <div className={`text-2xl font-bold ${luxuryTaxAmount > 0 ? 'text-red-600' : 'text-gray-800'}`}>
                                {formatMoneyShort(luxuryTaxAmount)}
                            </div>
                            <div className="text-xs text-gray-400">Tax Line: {formatMoneyShort(NBA_DATA.luxuryTax)}</div>
                        </div>
                        <div>
                            <div className="text-sm text-gray-500 mb-1">Roster Count</div>
                            <div className="text-2xl font-bold text-gray-800">{roster.length}/15</div>
                            <div className="text-xs text-gray-400">Active Players</div>
                        </div>
                    </div>
                </div>

                {/* Player Contracts Table - Bulls Style */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="p-6 border-b border-gray-200">
                        <h2 className="text-2xl font-bold text-gray-800">Player Contracts</h2>
                    </div>
                    
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky left-0 bg-gray-50 z-10">
                                        Player
                                    </th>
                                    <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Age
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        2025-26
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        2026-27
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        2027-28
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        2028-29
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Guaranteed
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Options
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {roster.map((player, idx) => (
                                    <tr key={player.id} className="hover:bg-gray-50 transition">
                                        <td className="px-6 py-4 whitespace-nowrap sticky left-0 bg-white z-10">
                                            <div className="font-semibold text-gray-900">{player.name}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-600">
                                            {player.age}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                                            {formatMoney(player.salary2025)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-600">
                                            {formatMoney(player.salary2026)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-600">
                                            {formatMoney(player.salary2027)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-600">
                                            {formatMoney(player.salary2028)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-semibold text-green-700">
                                            {formatMoney(player.guaranteed)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                            {player.optionType && (
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                    {player.optionType}
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                                
                                {/* Total Row */}
                                <tr className="bg-gray-100 font-bold border-t-2 border-gray-300">
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-900 sticky left-0 bg-gray-100 z-10">
                                        TEAM TOTAL
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center text-gray-600">
                                        {roster.length}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-gray-900">
                                        {formatMoney(salary2025)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-gray-900">
                                        {formatMoney(salary2026)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-gray-900">
                                        {formatMoney(salary2027)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-gray-900">
                                        {formatMoney(salary2028)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-gray-900">
                                        {formatMoney(roster.reduce((sum, p) => sum + (p.guaranteed || 0), 0))}
                                    </td>
                                    <td className="px-6 py-4"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Cap Status Footer */}
                    <div className="p-6 bg-gray-50 border-t border-gray-200">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div>
                                <span className="text-gray-600">Salary Cap:</span>
                                <span className="ml-2 font-semibold text-gray-900">{formatMoneyShort(NBA_DATA.salaryCap)}</span>
                            </div>
                            <div>
                                <span className="text-gray-600">Luxury Tax:</span>
                                <span className="ml-2 font-semibold text-gray-900">{formatMoneyShort(NBA_DATA.luxuryTax)}</span>
                            </div>
                            <div>
                                <span className="text-gray-600">First Apron:</span>
                                <span className="ml-2 font-semibold text-gray-900">{formatMoneyShort(NBA_DATA.firstApron)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Render the app
ReactDOM.render(<NBACapManager />, document.getElementById('root'));
