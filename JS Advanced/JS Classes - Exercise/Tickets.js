function ticketSort(ticketArr, sortCriteria) {
    class Ticket {
        constructor(destination, price, status) {
            this.destination = destination;
            this.price = Number(price);
            this.status = status;
        }
    }

    let result = [];

    for (let currTicket of ticketArr) {
        let [destination, price, status] = currTicket.split('|');
        let ticket = new Ticket(destination, price, status);
        result.push(ticket);
    }

    return result.sort((a, b) => a[sortCriteria] > b[sortCriteria]);
}

console.log(
    ticketSort(
        ['Philadelphia|94.20|available',
         'New York City|95.99|available',
         'New York City|95.99|sold',
         'Boston|126.20|departed'],
         'destination'
));