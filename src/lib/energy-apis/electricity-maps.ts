/**
 * Electricity Maps API Client
 * Documentation: https://static.electricitymaps.com/api/docs/index.html
 */

interface ElectricityMapsConfig {
    apiKey: string;
    baseUrl: string;
}

interface CarbonIntensityData {
    zone: string;
    carbonIntensity: number;
    datetime: string;
    updatedAt: string;
    emissionFactorType: string;
}

export class ElectricityMapsClient {
    private config: ElectricityMapsConfig;

    constructor(apiKey?: string) {
        this.config = {
            apiKey: apiKey || process.env.ELECTRICITY_MAPS_API_KEY || '',
            baseUrl: 'https://api.electricitymap.org/v3'
        };
    }

    /**
     * Get carbon intensity for Morocco
     */
    async getCarbonIntensity(zone: string = 'MA'): Promise<CarbonIntensityData | null> {
        try {
            const response = await fetch(
                `${this.config.baseUrl}/carbon-intensity/latest?zone=${zone}`,
                {
                    headers: {
                        'auth-token': this.config.apiKey
                    }
                }
            );

            if (!response.ok) {
                throw new Error(`Electricity Maps API error: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Electricity Maps API Error:', error);
            return null;
        }
    }

    /**
     * Get power breakdown (renewable vs fossil)
     */
    async getPowerBreakdown(zone: string = 'MA') {
        try {
            const response = await fetch(
                `${this.config.baseUrl}/power-breakdown/latest?zone=${zone}`,
                {
                    headers: {
                        'auth-token': this.config.apiKey
                    }
                }
            );

            if (!response.ok) {
                throw new Error(`Electricity Maps API error: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Electricity Maps API Error:', error);
            return null;
        }
    }
}

// Singleton instance
let electricityMapsClientInstance: ElectricityMapsClient | null = null;

export function getElectricityMapsClient(): ElectricityMapsClient {
    if (!electricityMapsClientInstance) {
        electricityMapsClientInstance = new ElectricityMapsClient();
    }
    return electricityMapsClientInstance;
}
