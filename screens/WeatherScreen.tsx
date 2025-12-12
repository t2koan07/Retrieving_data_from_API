import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Pressable,
    Switch,
} from "react-native";
import { getWeatherByCity } from "../services/weatherService";
import type { WeatherResponse } from "../types/weather";
import { formatTempFromKelvin, type TempUnit } from "../utils/temperature";

export default function WeatherScreen() {
    const [city, setCity] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [weather, setWeather] = useState<WeatherResponse | null>(null);
    const [unit, setUnit] = useState<TempUnit>("C");

    const onSearch = async () => {
        const trimmed = city.trim();

        if (trimmed.length < 2) {
            setError("Enter a city name");
            return;
        }

        setError("");
        setWeather(null);
        setLoading(true);

        try {
            const result = await getWeatherByCity(trimmed);
            setWeather(result);
        } catch (e) {
            setError("City not found");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Weather App</Text>

            <TextInput
                style={styles.input}
                placeholder="City"
                value={city}
                onChangeText={(text) => {
                    setCity(text);
                    setError("");
                }}
                autoCapitalize="words"
                autoCorrect={false}
            />

            <View style={styles.unitRow}>
                <Text style={styles.unitLabel}>°C</Text>
                <Switch
                    value={unit === "F"}
                    onValueChange={(isF) => setUnit(isF ? "F" : "C")}
                />
                <Text style={styles.unitLabel}>°F</Text>
            </View>

            {error.length > 0 ? <Text style={styles.error}>{error}</Text> : null}

            {!loading ? (
                <Pressable style={styles.button} onPress={onSearch}>
                    <Text style={styles.buttonText}>Search</Text>
                </Pressable>
            ) : null}

            {loading ? <Text style={styles.info}>Loading...</Text> : null}

            {weather ? (
                <View style={styles.result}>
                    <Text style={styles.city}>{weather.name}</Text>
                    <Text style={styles.info}>
                        Temp: {formatTempFromKelvin(weather.main.temp, unit)}
                    </Text>
                    <Text style={styles.info}>
                        Feels like: {formatTempFromKelvin(weather.main.feels_like, unit)}
                    </Text>
                    <Text style={styles.info}>
                        {weather.weather[0]?.main} ({weather.weather[0]?.description})
                    </Text>
                </View>
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 16,
    },
    heading: {
        fontSize: 24,
        marginTop: 32,
        marginBottom: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: "#999",
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
    },
    unitRow: {
        marginTop: 12,
        flexDirection: "row",
        alignItems: "center",
    },
    unitLabel: {
        fontSize: 16,
        marginHorizontal: 8,
    },
    button: {
        marginTop: 12,
        borderRadius: 8,
        paddingVertical: 12,
        alignItems: "center",
        backgroundColor: "#222",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
    },
    error: {
        marginTop: 8,
        color: "red",
    },
    info: {
        marginTop: 10,
        fontSize: 16,
    },
    result: {
        marginTop: 16,
        padding: 12,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 10,
    },
    city: {
        fontSize: 20,
        marginBottom: 6,
        fontWeight: "600",
    },
});
