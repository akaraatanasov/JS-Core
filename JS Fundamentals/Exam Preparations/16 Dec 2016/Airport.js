function airport(input) {
    let townPassengersPlanes = new Map();
    let planes = new Map();

    for (let line of input) {
        let [planeId, town, passengers, action] = line.split(' ');

        //checks if input is valid and if it is adds to the planes, if it's not -  iterates/continues
        //so that it does not accept any input for the rest of the parameters

        if (action === 'land') {               //if the current line has land action
            if (planes.has(planeId)) continue; //and the planes Map has that plane already - it continues
            else {                             //and ignores the rest of the line
                planes.set(planeId, 'land');   //else if there isn't such a plane - it adds it to the Map
            }
        } else if (action === 'depart') {       //if the current line has depart action
            if (!planes.has(planeId)) continue; //and the planes Map does NOT have that plane - it continues
            else {                              //since the plane must have landed first so that it can depart
                planes.set(planeId, 'depart');  //else if there is a plane that has already landed we can set it as depart
            }
        }

        //if we get to here - everything is ok with the input so we save our data for the townPassengerPlanes Map
        if (!townPassengersPlanes.get(town)) {
            townPassengersPlanes.set(town, [0, 0, []]);
        } //initializing town

        if (!townPassengersPlanes.get(town)[2].includes(planeId)) {
            townPassengersPlanes.get(town)[2].push(planeId);
        } //adding planes to the planeArr if there isn't such a plane already

        if (action === 'land') {
            townPassengersPlanes.get(town)[0] += Number(passengers); //adding arrivals
        } else if (action === 'depart') {
            townPassengersPlanes.get(town)[1] += Number(passengers); //adding departures
        }
    }

    let planesLeft = [];
    for (let [key, value] of planes) {
        if (value === 'land') {
            planesLeft.push(key);
        }
    }
    planesLeft.sort((pl1, pl2) => pl1.localeCompare(pl2)); //sorting alphabetical

    console.log('Planes left:');
    planesLeft.forEach(pl => console.log(`- ${pl}`));

    //[...townPassengersPlanes] so that it becomes array - [0] - townName, [1] - townArray/object
    [...townPassengersPlanes].sort((t1, t2) => { //sorting by arrivals (town[1][0]) in descending order
        if(t1[1][0] < t2[1][0]) return 1; //should have been > for ascending OR return -1
        if(t1[1][0] > t2[1][0]) return -1;
        if(t1[1][0] === t2[1][0]) { //if arrivals are the same - sort alphabetical
            t1[0].localeCompare(t2[0]);
        }
    }).forEach(logTowns); //calling logTowns function with IMPLICIT parameter theCurrentTown for each of the towns in the map array

    //this function accepts implicit parameter [...townPassengersPlanes] array with [0] - name, [1] - other parameters (in this case: [1][0] - arrivals, [1][1] - departures, [1][2] - planeArray)
    function logTowns(town) {
        console.log(town[0]); //nameOfTown
        console.log(`Arrivals: ${town[1][0]}`);
        console.log(`Departures: ${town[1][1]}`);
        console.log("Planes:");
        town[1][2]
            .sort((p1, p2) => p1.localeCompare(p2)) //sorts all elements of the planeArray alphabetical
            .forEach(p => console.log(`-- ${p}`));  //and logs them in the way that's intended
    }
}

airport([
    "Boeing474 Madrid 300 land",
    "AirForceOne WashingtonDC 178 land",
    "Airbus London 265 depart",
    "ATR72 WashingtonDC 272 land",
    "ATR72 Madrid 135 depart"
]);