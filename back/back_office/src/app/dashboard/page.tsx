
import {LineChart, Line, XAxis, YAxis, ResponsiveContainer, BarChart, Bar} from 'recharts';

export default function Page() {

    const tripTrendsData = [
        {month: 'Jan', value: 850},
        {month: 'Feb', value: 920},
        {month: 'Mar', value: 750},
        {month: 'Apr', value: 890},
        {month: 'May', value: 680},
        {month: 'Jun', value: 950},
        {month: 'Jul', value: 1100}
    ];

    const regionData = [
        {region: 'North', value: 85},
        {region: 'South', value: 65},
        {region: 'East', value: 45},
        {region: 'West', value: 75},
        {region: 'Central', value: 55},
        {region: 'Other', value: 35}
    ];

    const MetricCard = ({title, value, change}: {
        title: string,
        value: string,
        change: string,
    }) => (
        <div className={`rounded-lg p-6 shadow-sm flex-1 flex flex-col items-start justify-start bg-gray-100`}>
            <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
            <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
            <p className="text-sm font-medium text-green-600">{change}</p>
        </div>
    );

    return (
        <div className="px-8 py-8 max-w-7xl mx-auto">
            {/* Page Title */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
                <p className="text-gray-500 text-lg">Overview of your travel management application</p>
            </div>

            {/* Metrics Cards */}
            <div className="flex gap-6 mb-8">
                <MetricCard
                    title="Total Trips"
                    value="1,250"
                    change="+10%"
                />
                <MetricCard
                    title="Active Users"
                    value="350"
                    change="+5%"
                />
                <MetricCard
                    title="Revenue Generated"
                    value="$75,000"
                    change="+20%"
                />
                <MetricCard
                    title="Recent Trip Trends"
                    value="15%"
                    change="+8%"
                />
            </div>

            {/* Charts */}
            <div className="flex gap-6">
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 flex-1">
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Trip Trends Over Time</h3>
                        <div className="flex items-baseline space-x-4">
                            <span className="text-4xl font-bold text-gray-900">+15%</span>
                            <span className="text-sm text-gray-500">
                  Last 3 Months <span className="text-green-600 font-medium">+15%</span>
                </span>
                        </div>
                    </div>
                    <div className="h-48">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={tripTrendsData}>
                                <XAxis
                                    dataKey="month"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{fontSize: 12, fill: '#9CA3AF'}}
                                />
                                <YAxis hide/>
                                <Line
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#6366F1"
                                    strokeWidth={3}
                                    dot={false}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* User Activity by Region */}
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 flex-1">
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">User Activity by Region</h3>
                        <div className="flex items-baseline space-x-4">
                            <span className="text-4xl font-bold text-gray-900">+8%</span>
                            <span className="text-sm text-gray-500">
                  Last Month <span className="text-green-600 font-medium">+8%</span>
                </span>
                        </div>
                    </div>
                    <div className="h-48">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={regionData}>
                                <XAxis
                                    dataKey="region"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{fontSize: 12, fill: '#9CA3AF'}}
                                />
                                <YAxis hide/>
                                <Bar
                                    dataKey="value"
                                    fill="#E5E7EB"
                                    radius={[4, 4, 0, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    )
}
