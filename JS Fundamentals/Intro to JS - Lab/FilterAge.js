function filterAge(minAge, name1, age1, name2, age2) {
    let obj1 = {name: name1, age: age1};
    let obj2 = {name: name2, age: age2};

    if(obj1.age >= minAge) {
        console.log(obj1);
    }

    if(obj2.age >= minAge) {
        console.log(obj2);
    }
}