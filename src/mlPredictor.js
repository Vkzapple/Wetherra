import { SimpleLinearRegression } from "ml-regression";

class WeatherPredictor {
  constructor() {
    this.model = null;
    this.trainingData = { x: [], y: [] };
  }

  train(data) {
    this.trainingData.x = data.map((entry, index) => index);
    this.trainingData.y = data.map(
      (entry) =>
        entry.readings.find((r) => r.type === "TemperatureSensor")?.value || 0
    );
    if (this.trainingData.x.length > 1) {
      this.model = new SimpleLinearRegression(
        this.trainingData.x,
        this.trainingData.y
      );
    }
  }

  predict(nextIndex) {
    if (!this.model) return null;
    return this.model.predict(nextIndex);
  }

  getTrend() {
    if (!this.model || this.trainingData.x.length < 2)
      return "Insufficient data";
    const slope = this.model.slope;
    if (slope > 0.1) return "Temperature is rising";
    if (slope < -0.1) return "Temperature is falling";
    return "Temperature is stable";
  }
}

export { WeatherPredictor };
