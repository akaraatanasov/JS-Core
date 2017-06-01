function distOverTime(arr) {
    let [v1, v2, time] = arr;
    let dist1 = v1/3.6 * time;
    let dist2 = v2/3.6 * time;
    let delta = Math.abs(dist1 - dist2)

    console.log(delta);
}

distOverTime([11, 10, 120]);