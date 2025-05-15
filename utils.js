// [OBJECT COMPOSITION] Tambahkan method ke objek tanpa pewarisan
function withLogger(instance) {
  instance.logReading = function () {
    console.log(
      `📊 [${this.constructor.name}] @ ${
        this.location
      } | Last Reading: ${this.getLastReading()}`
    );
  };
  return instance;
}

export { withLogger };
