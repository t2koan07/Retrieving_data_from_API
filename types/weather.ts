export interface WeatherResponse {
    name: string;
    main: {
        temp: number;
        feels_like: number;
    };
    weather: Array<{
        main: string;
        description: string;
    }>;
}
