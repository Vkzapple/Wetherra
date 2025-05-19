class WeatherType {
  getDescription() {
    throw new Error("Method 'getDescription()' must be implemented.");
  }
}

class Sunny extends WeatherType {
  getDescription() {
    return "☀️ Cerah sekali, sinar matahari penuh.";
  }
}

class Rainy extends WeatherType {
  getDescription() {
    return "🌧️ Hujan deras, waspadai banjir.";
  }
}

class Cloudy extends WeatherType {
  getDescription() {
    return "☁️ Mendung, langit tertutup awan tebal.";
  }
}

export { Sunny, Rainy, Cloudy };
