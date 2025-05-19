import { useEffect, useState } from "react";
import {
  TemperatureSensor,
  HumiditySensor,
  WindSpeedSensor,
} from "./sensors.js";
import { withLogger } from "./utils.js";
import { Sunny, Rainy, Cloudy } from "./weatherTypes.js";
import { WeatherPredictor } from "./mlPredictor.js";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const sensorsInit = [
  withLogger(new TemperatureSensor("Peak A")),
  withLogger(new HumiditySensor("Valley B")),
  withLogger(new WindSpeedSensor("Cliff C")),
];

const weatherTypes = [new Sunny(), new Rainy(), new Cloudy()];
const predictor = new WeatherPredictor();

function App() {
  const [sensorData, setSensorData] = useState([]);
  const [history, setHistory] = useState([]);
  const [weatherForecast, setWeatherForecast] = useState("");
  const [alert, setAlert] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [trend, setTrend] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      try {
        const timestamp = new Date().toLocaleTimeString();
        const data = sensorsInit.map((sensor) => {
          const value = sensor.read();
          sensor.logReading();
          return {
            type: sensor.constructor.name,
            location: sensor.location,
            value: parseFloat(value) || 0,
            label: sensor.getLastReading(),
          };
        });

        const structured = {
          time: timestamp,
          Temperature: data[0]?.value || 0,
          Humidity: data[1]?.value || 0,
          WindSpeed: data[2]?.value || 0,
          readings: data,
        };

        const currentForecast =
          weatherTypes[
            Math.floor(Math.random() * weatherTypes.length)
          ].getDescription();

        let newAlert = "";
        if (
          structured.Temperature > 35 ||
          structured.Humidity > 90 ||
          structured.WindSpeed > 15
        ) {
          newAlert = "⚠️ Cuaca ekstrem terdeteksi! Harap waspada.";
        }

        // Train ML model and predict
        predictor.train([...history, structured]);
        const nextIndex = history.length + 1;
        const predictedTemp = predictor.predict(nextIndex);
        const trend = predictor.getTrend();

        setSensorData(data);
        setWeatherForecast(currentForecast);
        setAlert(newAlert);
        setHistory((prev) => [...prev.slice(-9), structured]);
        setPrediction(predictedTemp ? predictedTemp.toFixed(1) + "°C" : "N/A");
        setTrend(trend);
      } catch (error) {
        console.error("Error in sensor reading:", error);
        setAlert("⚠️ Error reading sensor data");
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [history]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-tr from-white via-blue-100 to-blue-300">
      <aside className="w-full md:w-64 bg-white shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Wetherra 🌦️</h1>
        <nav className="space-y-2">
          <a href="#" className="block text-blue-700 font-semibold">
            Dashboard
          </a>
          <a href="#" className="block text-gray-600">
            Riwayat
          </a>
          <a href="#" className="block text-gray-600">
            Pengaturan
          </a>
        </nav>
      </aside>

      <main className="flex-1 p-4 md:p-8">
        <h2 className="text-3xl font-bold mb-6">Realtime Weather Monitoring</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sensorData.length > 0 ? (
            sensorData.map((sensor, idx) => (
              <div
                key={idx}
                className="p-4 bg-white rounded-2xl shadow-md border"
              >
                <h2 className="text-xl font-semibold mb-2">
                  {sensor.type.replace("Sensor", " Sensor")}
                </h2>
                <p className="text-gray-600">Location: {sensor.location}</p>
                <p className="text-2xl font-bold mt-2">{sensor.label}</p>
              </div>
            ))
          ) : (
            <p>Loading sensor data...</p>
          )}
        </div>

        {alert && (
          <div className="mt-6 p-4 bg-red-100 border-l-4 border-red-500 rounded-xl">
            <p className="text-red-700 font-semibold">{alert}</p>
          </div>
        )}

        <div className="mt-8 p-6 bg-yellow-100 border-l-4 border-yellow-500 rounded-xl">
          <h3 className="text-xl font-semibold">Prediksi Cuaca (AI)</h3>
          <p className="text-lg mt-2">{weatherForecast}</p>
          <p className="text-lg mt-2">Prediksi Suhu Berikutnya: {prediction}</p>
          <p className="text-lg mt-2">Tren: {trend}</p>
        </div>

        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-4">Grafik Data Sensor</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={history}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="Temperature"
                stroke="#ef4444"
                name="Suhu"
              />
              <Line
                type="monotone"
                dataKey="Humidity"
                stroke="#3b82f6"
                name="Kelembaban"
              />
              <Line
                type="monotone"
                dataKey="WindSpeed"
                stroke="#10b981"
                name="Angin"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </main>
    </div>
  );
}

export default App;
