function dNs(input) {
    let result = '<table border="1">\n';
    result += '<thead>\n';
    result += '<tr><th colspan="3">Blades</th></tr>\n';
    result += '<tr><th>Length [cm]</th><th>Type</th><th>Application</th></tr>\n'
    result += '</thead>\n';
    result += '<tbody>\n';

    for (let line of input) {
        let length = parseInt(line);
        let type = '';
        let application = '';

        if (length > 10) {
            if (length > 40) {
                type += 'sword';
            } else {
                type += 'dagger';
            }

            let app = length % 5;
            switch (app) {
                case 0: application += '*rap-poker'; break;
                case 1: application += 'blade'; break;
                case 2: application += 'quite a blade'; break;
                case 3: application += 'pants-scraper'; break;
                case 4: application += 'frog-butcher'; break;
                default: break;
            }

            result += `<tr><td>${length}</td><td>${type}</td><td>${application}</td></tr>\n`;
        }

    }

    result += '</tbody>\n';
    result += '</table>\n';

    console.log(result);
}

dNs([
    '17.8',
    '19.4',
    '13',
    '55.8',
    '126.96541651',
    '3'
]);