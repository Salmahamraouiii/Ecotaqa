/**
 * EIA (U.S. Energy Information Administration) API Client
 * Documentation: https://www.eia.gov/opendata/
 */

interface EIAConfig {
    apiKey: string;
    baseUrl: string;
}

interface EIADataPoint {
    period: string;
    value: number;
    unit?: string;
}

interface EIAResponse {
    response: {
        data: EIADataPoint[];
    };
}

export class EIAClient {
    private config: EIAConfig;

    constructor(apiKey?: string) {
        this.config = {
            apiKey: apiKey || process.env.EIA_API_KEY || '',
            baseUrl: 'https://api.eia.gov/v2'
        };
    }

    /**
     * Get Morocco electricity consumption data
     */
    async getMoroccoElectricityData(params: {
        startDate?: string;
        endDate?: string;
    } = {}): Promise<EIADataPoint[]> {
        const startDate = params.startDate || '2023-01-01';
        const endDate = params.endDate || new Date().toISOString().split('T')[0];

        try {
            const url = new URL(`${this.config.baseUrl}/international/data`);
            url.searchParams.append('api_key', this.config.apiKey);
            url.searchParams.append('frequency', 'monthly');
            url.searchParams.append('data[0]', 'value');
            url.searchParams.append('facets[countryRegionId][]', 'MAR');
            url.searchParams.append('facets[productId][]', '2'); // Total electricity
            url.searchParams.append('start', startDate);
            url.searchParams.append('end', endDate);
            url.searchParams.append('sort[0][column]', 'period');
            url.searchParams.append('sort[0][direction]', 'desc');
            url.searchParams.append('offset', '0');
            url.searchParams.append('length', '5000');

            const response = await fetch(url.toString());

            if (!response.ok) {
                throw new Error(`EIA API error: ${response.statusText}`);
            }

            const data: EIAResponse = await response.json();
            return data.response.data || [];
        } catch (error) {
            console.error('EIA API Error:', error);
            return [];
        }
    }

    /**
     * Transform EIA data to Ecotaqa format
     */
    transformToEcotaqaFormat(eiaData: EIADataPoint[]) {
        return eiaData.map(item => ({
            timestamp: new Date(item.period),
            value: item.value,
            unit: 'kWh',
            source: 'EIA',
            country: 'Morocco'
        }));
    }

    /**
     * Get latest data point
     */
    async getLatestData() {
        const data = await this.getMoroccoElectricityData();
        return data.length > 0 ? data[0] : null;
    }
}

// Singleton instance
let eiaClientInstance: EIAClient | null = null;

export function getEIAClient(): EIAClient {
    if (!eiaClientInstance) {
        eiaClientInstance = new EIAClient();
    }
    return eiaClientInstance;
}
