function components(input) {
    let system = new Map();

    for (let line of input) {
        let [name, comp, subcomp] = line.split(' | ');

        if (!system.get(name)) {
            system.set(name, new Map());
        }

        if (!system.get(name).get(comp)) {
            system.get(name).set(comp, []);
        }
        system.get(name).get(comp).push(subcomp);
    }

    let systemSorted = Array.from(system.keys())
        .sort((s1, s2) => sortSystem(s1, s2));

    for (let name of systemSorted) {
        console.log(name);
        let componentSorted = Array.from(system.get(name).keys())
            .sort((c1, c2) => sortComponents(name, c1, c2));

        for (let component of componentSorted) {
            console.log(`|||${component}`);
            system.get(name).get(component)
                .forEach(sc => console.log(`||||||${sc}`));
        }
    }

    function sortSystem(s1, s2) {
        if(system.get(s1).size !== system.get(s2).size) {
            return system.get(s2).size - system.get(s1).size;
        } else {
            return s1.toLowerCase().localeCompare(s2.toLowerCase());
        }
    }

    function sortComponents(name, c1, c2) {
        return system.get(name).get(c2).length -
            system.get(name).get(c1).length;
    }
}

components([
    'SULS | Main Site | Home Page',
    'SULS | Main Site | Login Page',
    'SULS | Main Site | Register Page',
    'SULS | Judge Site | Login Page',
    'SULS | Judge Site | Submittion Page',
    'Lambda | CoreA | A23',
    'SULS | Digital Site | Login Page',
    'Lambda | CoreB | B24',
    'Lambda | CoreA | A24',
    'Lambda | CoreA | A25',
    'Lambda | CoreC | C4',
    'Indice | Session | Default Storage',
    'Indice | Session | Default Security'
]);