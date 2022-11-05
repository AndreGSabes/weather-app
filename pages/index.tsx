/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import {
  Paper,
  TextInput,
  Button,
  Text,
  Group,
  LoadingOverlay,
} from "@mantine/core";

const API_KEY = "26a092318d7925a94b1e2d283e80ece6";

export default function Home() {
  const [cityInput, setCityInput] = useState("");
  const [weatherData, setWeatherData] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function getWeatherData() {
    try {
      setIsLoading(true);

      const serverResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${API_KEY}`
      );

      const data = await serverResponse.json();

      if (data?.cod === 400) {
        throw data;
      }

      setWeatherData(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div
      style={{
        position: "static",
        height: "100vh",
        backgroundImage:
          "url('https://littlevisuals.co/images/atlantic_ridge.jpg')",
        backgroundSize: "cover",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <LoadingOverlay visible={isLoading} overlayBlur={2} />

        <Paper withBorder p="lg" style={{ maxWidth: "500px" }}>
          <Group position="center" mb="sm">
            <Text
              size="xl"
              variant="gradient"
              gradient={{ from: "indigo", to: "cyan", deg: 45 }}
              weight={500}
            >
              Get the weather!
            </Text>
          </Group>

          <Group position="apart" mb="md">
            <Text size="md">Enter a city, and get the weather below! </Text>
          </Group>

          <Group position="apart" mb="md">
            <TextInput
              label="City name"
              placeholder="ex: Seattle"
              onChange={(e) => setCityInput(e.target.value)}
            />

            <Group position="apart" mt="lg">
              <Button
                variant="gradient"
                size="md"
                onClick={() => getWeatherData()}
              >
                {Object.keys(weatherData).length !== 0
                  ? "Get new weather"
                  : "Get weather"}
              </Button>
            </Group>
          </Group>

          {Object.keys(weatherData).length !== 0 && weatherData.cod === 200 ? (
            <>
              <Group position="left">
                <Text weight={500}>{weatherData.name} weather</Text>
              </Group>
              <Group position="left">
                <img
                  src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                  alt="weather-icon"
                />

                <Text size="lg" weight="500">
                  Currently is {weatherData.main.temp}&deg; F
                </Text>
              </Group>
            </>
          ) : null}
        </Paper>
      </div>
    </div>
  );
}
