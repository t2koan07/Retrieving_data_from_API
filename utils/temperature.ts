export type TempUnit = "C" | "F";

export function kelvinToCelsius(k: number): number {
    return k - 273.15;
}

export function kelvinToFahrenheit(k: number): number {
    const c = kelvinToCelsius(k);
    return c * (9 / 5) + 32;
}

export function formatTempFromKelvin(k: number, unit: TempUnit): string {
    const value = unit === "C" ? kelvinToCelsius(k) : kelvinToFahrenheit(k);
    return `${value.toFixed(1)} °${unit}`;
}
