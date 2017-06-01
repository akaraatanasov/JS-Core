function inchesToFeets(inches) {
    let feet = Math.floor(inches/12);
    let newInches = inches - (feet * 12);

    console.log(feet + "'-" + newInches + "\"");
}

inchesToFeets(11)