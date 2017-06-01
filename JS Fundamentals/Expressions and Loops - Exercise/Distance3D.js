function distance3D(arr) {
    let [aX, aY, aZ, bX, bY, bZ] = arr;

    let deltaX = Math.abs(aX - bX);
    let deltaY = Math.abs(aY - bY);
    let deltaZ = Math.abs(aZ - bZ);

    let distance = Math.sqrt(deltaX*deltaX + deltaY*deltaY  + deltaZ*deltaZ);

    console.log(distance);
}