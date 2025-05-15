// [ABSTRACTION]
class Sensor {
  read() {
    throw new Error("Method 'read()' must be implemented.");
  }
}

// [ENCAPSULATION + ACCESS MODIFIER] pake properti private (#)
class WeatherSensor extends Sensor {
  #location;
  #lastReading;

  constructor(location) {
    super();
    this.#location = location;
    this.#lastReading = null;
  }

  get location() {
    return this.#location;
  }

  saveReading(value) {
    this.#lastReading = value;
    console.log(`💾 [${this.constructor.name}] Reading saved: ${value}`);
  }

  getLastReading() {
    return this.#lastReading !== null ? this.#lastReading : "No data";
  }

  // [ABSTRACTION] Tetap abstrak, akan dioverride di subclass
  read() {
    throw new Error("Abstract method 'read' must be implemented.");
  }
}

// [INHERITANCE + POLYMORPHISM] Override method read()
class TemperatureSensor extends WeatherSensor {
  read() {
    const temp = (Math.random() * 30 + 10).toFixed(1);
    this.saveReading(temp + "°C");
    return temp;
  }
}

class HumiditySensor extends WeatherSensor {
  read() {
    const humidity = Math.floor(Math.random() * 100);
    this.saveReading(humidity + "%");
    return humidity;
  }
}

class WindSpeedSensor extends WeatherSensor {
  read() {
    const speed = (Math.random() * 20).toFixed(1);
    this.saveReading(speed + " km/h");
    return speed;
  }
}

export { TemperatureSensor, HumiditySensor, WindSpeedSensor };
