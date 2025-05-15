// [CLASS STRUCTURE] Object utama mengelola sensor dan data cuaca
class WeatherStation {
  constructor(name) {
    this.name = name;
    this.sensors = [];
  }

  addSensor(sensor) {
    this.sensors.push(sensor);
  }

  takeReadings() {
    console.log(`\n📡 [${this.name}] Taking readings...\n`);
    this.sensors.forEach((sensor) => {
      sensor.read();
      sensor.logReading(); // [COMPOSITION] logReading dari withLogger
    });
  }

  determineWeather(weatherTypes) {
    const randomIndex = Math.floor(Math.random() * weatherTypes.length);
    const currentWeather = weatherTypes[randomIndex];
    console.log("\n🌤️ Current Weather Forecast:");
    console.log(currentWeather.getDescription());
  }
}

export { WeatherStation };
