import {
  TemperatureSensor,
  HumiditySensor,
  WindSpeedSensor,
} from "../sensors.js";
import { Sunny, Rainy, Cloudy } from "../weatherTypes.js";
import { withLogger } from "../utils.js";
import { WeatherStation } from "../station.js";
import { WeatherPredictor } from "./mlPredictor.js";

const station = new WeatherStation("Mount Everest Observatory");
const predictor = new WeatherPredictor();

const tempSensor = withLogger(new TemperatureSensor("Peak A"));
const humidSensor = withLogger(new HumiditySensor("Valley B"));
const windSensor = withLogger(new WindSpeedSensor("Cliff C"));

station.addSensor(tempSensor);
station.addSensor(humidSensor);
station.addSensor(windSensor);

station.takeReadings();
station.determineWeather([new Sunny(), new Rainy(), new Cloudy()]);

// Train ML model with initial data
predictor.train(station.getHistoricalData());

export { station, predictor };
