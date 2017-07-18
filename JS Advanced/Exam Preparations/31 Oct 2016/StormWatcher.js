let Record = (function () {
    let closureId = 0;

    return class Record {
        constructor(temperature, humidity, pressure, windSpeed) {
            this.id = closureId++;
            this.temperature = temperature;
            this.humidity = humidity;
            this.pressure = pressure;
            this.windSpeed = windSpeed;
        }

        get status() {
            if (this.temperature < 20 && (this.pressure < 700 || this.pressure > 900) && this.windSpeed > 25) {
                return 'Stormy';
            } else {
                return 'Not stormy';
            }
        }

        toString() {
            let result = `Reading ID: ${this.id}\n`;
            result += `Temperature: ${this.temperature}*C\n`;
            result += `Relative Humidity: ${this.humidity}%\n`;
            result += `Pressure: ${this.pressure}hpa\n`;
            result += `Wind Speed: ${this.windSpeed}m/s\n`;
            result += `Weather: ${this.status}`;

            return result;
        }
    }
})();

let record1 = new Record(32, 66, 760, 12);
let record2 = new Record(10, 40, 680, 30);

console.log(record1.toString());
console.log();
console.log(record2.toString());