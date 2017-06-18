function elections(input) {

    let systems = new Map();
    let candidates = new Map();

    for (let currObj of input) {
        let currSystem = currObj.system;
        let currCandidate = currObj.candidate;
        let currVotes = currObj.votes;

        if(!systems.has(currSystem)) {
            systems.set(currSystem, new Map());
        }

        if(!systems.get(currSystem).has(currCandidate)) {
            systems.get(currSystem).set(currCandidate, currVotes);
        } else {
            let oldVote = systems.get(currSystem).get(currCandidate);
            systems.get(currSystem).set(currCandidate, oldVote + currVotes);
        }
    }

    [...systems].forEach(s => {
        candidates.set(s[0], new Map());
    });

    [...systems].forEach(s => {
        if ([...s[1]].length > 1) {
            let maxCandidate = '';
            let maxVotes = 0;
            [...s[1]].forEach(c => {
                if (maxVotes < c[1]) {
                    maxVotes = c[1];
                    maxCandidate = c[0];
                }
            });

            [...s[1]].forEach(c => {
                if (maxCandidate !== c[0]) {
                    maxVotes += c[1];
                }
            });
            candidates.get(s[0]).set(maxCandidate, maxVotes);
        } else {
            candidates.get(s[0]).set([...s[1]][0][0], [...s[1]][0][1]);
        }
    });

    let winners = new Map();

    for (let [system, candidateVotes] of candidates) {
        candidateVotes = [...candidateVotes][0];
        let candidate = candidateVotes[0];
        let votes = candidateVotes[1];

        if(!winners.has(candidate)){
            winners.set(candidate, []);
            winners.get(candidate).push(0);
        }
        winners.get(candidate)[0] += votes;
        winners.get(candidate).push(`${system} - ${votes}`);
    }

    //console.log(winners);

    let allVotesHalf = 0;
    [...winners].forEach(c => {
        let data = [...c[1]];
        allVotesHalf += data[0];
    });
    allVotesHalf /= 2;

    let noWinner = true;


    if ([...winners].length > 1) {
        let runnerUp = '';
        let maxVotes = 0;

        for (let [candidate, data] of winners) {
            let currVotes = data[0];

            if (currVotes > allVotesHalf) {
                console.log(`${candidate} wins with ${currVotes} votes`);
                winners.delete(candidate);
                noWinner = false;
                continue;
            }

            if (currVotes > maxVotes) {
                maxVotes = currVotes;
                runnerUp = candidate;
            }
        }
        if (!noWinner) {
            console.log(`Runner up: ${runnerUp}`);

            let runnerUpVotes = new Map();
            for (let i = 1; i < winners.get(runnerUp).length; i++) {
                let data = winners.get(runnerUp)[i].split(' - ');
                runnerUpVotes.set(data[0], data[1]);
            }

            [...runnerUpVotes].sort((v1, v2) => {
                if(v1[1] < v2[1]) return 1;
                if(v1[1] > v2[1]) return -1;
            }).forEach(v => console.log(v[0] + ': ' + v[1]));
        }
    } else {
        let winner = [...winners][0][0];
        let winnerVotes = [...winners][0][1][0];
        noWinner = false;
        console.log(`${winner} wins with ${winnerVotes} votes`);
        console.log(`${winner} wins unopposed!`);
    }

    if(noWinner) {
        let runOff = new Map();
        for (let [candidate, data] of winners) {
            let currVotes = data[0];
            let percents = (currVotes/(allVotesHalf * 2)) * 100;
            runOff.set(candidate, Math.floor(percents));
        }

        let results = [...runOff].sort((v1, v2) => {
            if(v1[1] < v2[1]) return 1;
            if(v1[1] > v2[1]) return -1;
        });

        console.log(`Runoff between ${results[0][0]} with ${results[0][1]}% and ${results[1][0]} with ${results[1][1]}%`);
    }
}

elections([
    { system: 'Theta', candidate: 'Flying Shrimp', votes: 10 },
    { system: 'Sigma', candidate: 'Space Cow',     votes: 200 },
    { system: 'Sigma', candidate: 'Flying Shrimp', votes: 120 },
    { system: 'Tau',   candidate: 'Space Cow',     votes: 15 },
    { system: 'Sigma', candidate: 'Space Cow',     votes: 60 },
    { system: 'Tau',   candidate: 'Flying Shrimp', votes: 150 }
]);

console.log();

elections([
    { system: 'Tau',     candidate: 'Flying Shrimp', votes: 150 },
    { system: 'Tau',     candidate: 'Space Cow',     votes: 100 },
    { system: 'Theta',   candidate: 'Space Cow',     votes: 10 },
    { system: 'Sigma',   candidate: 'Space Cow',     votes: 200 },
    { system: 'Sigma',   candidate: 'Flying Shrimp', votes: 75 },
    { system: 'Omicron', candidate: 'Flying Shrimp', votes: 50 },
    { system: 'Omicron', candidate: 'Octocat',       votes: 75 }
]);

console.log();

elections([
    { system: 'Theta', candidate: 'Kim Jong Andromeda', votes: 10 },
    { system: 'Tau',   candidate: 'Kim Jong Andromeda', votes: 200 },
    { system: 'Tau',   candidate: 'Flying Shrimp',      votes: 150 }
]);
