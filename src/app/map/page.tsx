'use client';

import dynamic from 'next/dynamic';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Dynamically import map to avoid SSR issues
const MapComponent = dynamic(() => import('@/components/map/MapComponent'), {
    ssr: false,
    loading: () => <div className="w-full h-[600px] flex items-center justify-center bg-gray-100 dark:bg-dark-card rounded-xl">Loading Map...</div>
});

export default function MapPage() {
    return (
        <div className="space-y-6 h-[calc(100vh-8rem)]">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Regional Energy Map</h1>
                    <p className="text-gray-500 dark:text-gray-400">View consumption patterns across different territories.</p>
                </div>
                <div className="flex gap-4 text-sm">
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-red-500"></span> High Usage
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-yellow-500"></span> Medium Usage
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-green-500"></span> Low Usage
                    </div>
                </div>
            </div>

            <Card className="h-full glass">
                <CardContent className="p-0 h-full">
                    <MapComponent />
                </CardContent>
            </Card>
        </div>
    );
}
