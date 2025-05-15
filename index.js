// [PACKAGE] Import modular dari berbagai class dan util
import {
  TemperatureSensor,
  HumiditySensor,
  WindSpeedSensor,
} from "./sensors.js";
import { Sunny, Rainy, Cloudy } from "./weatherTypes.js";
import { withLogger } from "./utils.js";
import { WeatherStation } from "./station.js";

// [OOP] Object Instantiation
const station = new WeatherStation("Mount Everest Observatory");

// [COMPOSITION] behavior logReading melalui fungsi composition
const tempSensor = withLogger(new TemperatureSensor("Peak A"));
const humidSensor = withLogger(new HumiditySensor("Valley B"));
const windSensor = withLogger(new WindSpeedSensor("Cliff C"));

// [OOP] Pola koleksi objek dan interaksi antar objek
station.addSensor(tempSensor);
station.addSensor(humidSensor);
station.addSensor(windSensor);

station.takeReadings();
station.determineWeather([new Sunny(), new Rainy(), new Cloudy()]);
