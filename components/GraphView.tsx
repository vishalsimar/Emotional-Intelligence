import React, { useMemo, useState } from 'react';
import { EmotionLog } from '../types';

interface GraphViewProps {
  history: EmotionLog[];
  onBack: () => void;
}

type PieDataItem = {
    name: string;
    count: number;
    percentage: number;
    color: string;
    emoji: string;
    startAngle: number;
    endAngle: number;
};

const getArcPath = (cx: number, cy: number, radius: number, startAngle: number, endAngle: number, isDonut: boolean = false, innerRadius: number = 0) => {
    const start = {
      x: cx + radius * Math.cos(startAngle),
      y: cy + radius * Math.sin(startAngle),
    };
    const end = {
      x: cx + radius * Math.cos(endAngle),
      y: cy + radius * Math.sin(endAngle),
    };

    const largeArcFlag = endAngle - startAngle <= Math.PI ? '0' : '1';

    if (isDonut) {
        const innerStart = {
            x: cx + innerRadius * Math.cos(startAngle),
            y: cy + innerRadius * Math.sin(startAngle),
        };
        const innerEnd = {
            x: cx + innerRadius * Math.cos(endAngle),
            y: cy + innerRadius * Math.sin(endAngle),
        };
        return [
            'M', start.x, start.y,
            'A', radius, radius, 0, largeArcFlag, 1, end.x, end.y,
            'L', innerEnd.x, innerEnd.y,
            'A', innerRadius, innerRadius, 0, largeArcFlag, 0, innerStart.x, innerStart.y,
            'Z'
        ].join(' ');
    }

    return [
        'M', start.x, start.y,
        'A', radius, radius, 0, largeArcFlag, 1, end.x, end.y,
        'L', cx, cy,
        'Z'
    ].join(' ');
};


const GraphView: React.FC<GraphViewProps> = ({ history, onBack }) => {
    const [timeRange, setTimeRange] = useState<7 | 30>(7);
    const [hoveredEmotion, setHoveredEmotion] = useState<string | null>(null);

    const pieData: PieDataItem[] = useMemo(() => {
        const endDate = new Date();
        endDate.setHours(23, 59, 59, 999);
        const startDate = new Date(endDate);
        startDate.setDate(startDate.getDate() - timeRange);
        startDate.setHours(0, 0, 0, 0);

        const filteredHistory = history.filter(log => log.timestamp >= startDate.getTime());

        const emotionCounts: Record<string, { count: number; color: string; emoji: string }> = {};
        let totalCount = 0;

        filteredHistory.forEach(log => {
            if (!emotionCounts[log.emotionName]) {
                emotionCounts[log.emotionName] = { count: 0, color: log.emotionColor, emoji: log.emotionEmoji };
            }
            emotionCounts[log.emotionName].count++;
            totalCount++;
        });

        if (totalCount === 0) return [];

        let currentAngle = -Math.PI / 2; // Start at the top

        return Object.entries(emotionCounts)
            .sort(([, a], [, b]) => b.count - a.count)
            .map(([name, data]) => {
                const percentage = (data.count / totalCount) * 100;
                const angle = (percentage / 100) * 2 * Math.PI;
                const item: PieDataItem = {
                    name,
                    count: data.count,
                    percentage,
                    color: data.color,
                    emoji: data.emoji,
                    startAngle: currentAngle,
                    endAngle: currentAngle + angle,
                };
                currentAngle += angle;
                return item;
            });
    }, [history, timeRange]);

    const hasData = pieData.length > 0;
    const hoveredData = hoveredEmotion ? pieData.find(d => d.name === hoveredEmotion) : null;

    return (
        <div className="flex flex-col animate-fade-in w-full pb-8">
            <header className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                    <button
                        onClick={onBack}
                        className="mr-2 p-2 rounded-full hover:bg-[var(--bg-hover)] transition-colors"
                        aria-label="Go back to emotion selection"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
                    </button>
                    <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] font-serif">
                        Emotion Trends
                    </h2>
                </div>
            </header>

            <div className="bg-[var(--bg-secondary)] p-4 sm:p-6 rounded-lg shadow-md border border-[var(--border-primary)]">
                <div className="flex justify-end mb-4">
                    <div className="flex items-center space-x-1 bg-[var(--bg-primary)] p-1 rounded-md">
                         <button 
                            onClick={() => setTimeRange(7)} 
                            className={`px-3 py-1 text-sm font-medium rounded ${timeRange === 7 ? 'bg-[var(--bg-secondary)] text-[var(--text-primary)] shadow-sm' : 'text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]'}`}
                            aria-pressed={timeRange === 7}
                        >
                            Last 7 Days
                        </button>
                         <button 
                            onClick={() => setTimeRange(30)} 
                            className={`px-3 py-1 text-sm font-medium rounded ${timeRange === 30 ? 'bg-[var(--bg-secondary)] text-[var(--text-primary)] shadow-sm' : 'text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]'}`}
                            aria-pressed={timeRange === 30}
                        >
                            Last 30 Days
                        </button>
                    </div>
                </div>

                {hasData ? (
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
                        <div className="relative w-full max-w-[250px] sm:max-w-[300px]">
                             <svg viewBox="0 0 200 200" role="img" aria-labelledby="chart-title">
                                <title id="chart-title">A donut chart showing the proportion of logged emotions over the last {timeRange} days.</title>
                                <g>
                                    {pieData.map(slice => {
                                        const isHovered = hoveredEmotion === slice.name;
                                        return (
                                            <path
                                                key={slice.name}
                                                d={getArcPath(100, 100, 95, slice.startAngle, slice.endAngle, true, 65)}
                                                style={{ fill: `var(--color-${slice.color}-text)` }}
                                                onMouseEnter={() => setHoveredEmotion(slice.name)}
                                                onMouseLeave={() => setHoveredEmotion(null)}
                                                className="transition-transform duration-200 ease-out"
                                                transform={isHovered ? 'scale(1.03)' : 'scale(1)'}
                                                transform-origin="center"
                                                aria-label={`${slice.name}: ${slice.percentage.toFixed(1)}%`}
                                            />
                                        );
                                    })}
                                </g>
                                <g className="pointer-events-none transition-opacity duration-200" style={{opacity: hoveredData ? 1 : 0}}>
                                    {hoveredData && (
                                        <>
                                            <text x="100" y="90" textAnchor="middle" className="text-4xl" style={{fontSize: '2.5rem'}}>{hoveredData.emoji}</text>
                                            <text x="100" y="115" textAnchor="middle" className="font-bold fill-[var(--text-primary)]" style={{fontSize: '1rem'}}>{hoveredData.name}</text>
                                            <text x="100" y="132" textAnchor="middle" className="fill-[var(--text-secondary)]" style={{fontSize: '0.875rem'}}>{hoveredData.percentage.toFixed(1)}%</text>
                                        </>
                                    )}
                                </g>
                            </svg>
                        </div>
                        <div className="w-full sm:w-auto">
                            <ul className="space-y-2">
                                {pieData.map(item => {
                                    const isHovered = hoveredEmotion === item.name;
                                    return (
                                        <li 
                                            key={item.name} 
                                            className={`p-2 rounded-md transition-colors duration-200 flex items-center text-sm ${isHovered ? 'bg-[var(--bg-hover)]' : ''}`}
                                            onMouseEnter={() => setHoveredEmotion(item.name)}
                                            onMouseLeave={() => setHoveredEmotion(null)}
                                        >
                                            <span className="w-3 h-3 rounded-full mr-3 flex-shrink-0" style={{ backgroundColor: `var(--color-${item.color}-text)` }}></span>
                                            <span className="mr-2 text-lg">{item.emoji}</span>
                                            <span className="font-medium text-[var(--text-primary)] flex-grow">{item.name}</span>
                                            <span className="font-mono text-[var(--text-secondary)] ml-4">{item.percentage.toFixed(1)}%</span>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-16 px-4 h-[350px] sm:h-[400px] flex flex-col justify-center items-center">
                        <p className="text-4xl mb-4">🥧</p>
                        <h3 className="text-xl font-semibold text-[var(--text-primary)]/80">Not Enough Data</h3>
                        <p className="text-[var(--text-secondary)] mt-2 max-w-sm">Log your emotions for a few days to see your trends visualized here. Keep up the great work!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

const style = document.createElement('style');
style.innerHTML = `
@keyframes fade-in { 0% { opacity: 0; transform: translateY(10px); } 100% { opacity: 1; transform: translateY(0); } }
.animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
`;
document.head.appendChild(style);


export default GraphView;