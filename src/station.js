class WeatherStation {
  constructor(name) {
    this.name = name;
    this.sensors = [];
    this.dataHistory = []; // buat ML
  }

  addSensor(sensor) {
    this.sensors.push(sensor);
  }

  takeReadings() {
    console.log(`\n📡 [${this.name}] Taking readings...\n`);
    const readings = this.sensors.map((sensor) => {
      const value = sensor.read();
      sensor.logReading();
      return {
        type: sensor.constructor.name,
        location: sensor.location,
        value: parseFloat(value),
        label: sensor.getLastReading(),
      };
    });
    this.dataHistory.push({
      time: new Date().toLocaleTimeString(),
      readings,
    });
    this.dataHistory = this.dataHistory.slice(-100);
    return readings;
  }

  determineWeather(weatherTypes) {
    const randomIndex = Math.floor(Math.random() * weatherTypes.length);
    const currentWeather = weatherTypes[randomIndex];
    console.log("\n🌤️ Current Weather Forecast:");
    console.log(currentWeather.getDescription());
    return currentWeather.getDescription();
  }

  getHistoricalData() {
    return this.dataHistory;
  }
}

export { WeatherStation };
