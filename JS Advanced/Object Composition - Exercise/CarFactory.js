function factory(car) {
    let newSpecs = {};

    let engine;

    if(car.power <= 90) {
        engine = {
            power: 90,
            volume: 1800
        }
    } else if (car.power <= 120) {
        engine = {
            power: 120,
            volume: 2400
        }
    } else if (car.power <= 200) {
        engine = {
            power: 200,
            volume: 3500
        }
    }

    let wheels = [];
    for (let i = 0; i < 4; i++) {
        if (car.wheelsize % 2 === 0) {
            wheels.push(car.wheelsize - 1);
        } else {
            wheels.push(car.wheelsize);
        }
    }

    newSpecs.model = car.model;
    newSpecs.engine = engine;
    newSpecs.carriage = {
        type: car.carriage,
        color: car.color
    };
    newSpecs.wheels = wheels;

    return newSpecs;
}