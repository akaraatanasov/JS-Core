class Task {
    constructor(title, deadline, status = 'Open') {
        this.title = title;
        this.deadline = deadline;
        this.status = status;
        this.isOverdue = false;
    }

    set deadline(deadline) {
        if (deadline < Date.now()) {
            throw new Error('Date is in the past!');
        } else {
            this._deadline = deadline;
        }
    }

    get deadline() {
        return this._deadline;
    }

    set status(val) {
        this._status = val;
    }

    get status() {
        if (this._deadline < Date.now() && this._status !== 'Complete') {
            this.isOverdue = true;
        }
        return this._status;
    }


    static comparator(a, b) {
        if (a.status === b.status || (a.isOverdue && b.isOverdue)) {
            return (b.deadline - a.deadline);
        } else {
            if ((a.status !== 'Complete' && a.isOverdue) || (b.status !== 'Complete' && b.isOverdue)) {
                return -1;
            } else {
                return 1;
            }
        }
    }

    toString() {
        let statusIcon = '';

        if (this.status === 'In Progress' && this.isOverdue === false) {
            statusIcon = '\u219D';
            return `[${statusIcon}] ${this.title} (deadline: ${this._deadline})`;
        } else if (this.status === 'Complete') {
            statusIcon = '\u2714';
            return `[${statusIcon}] ${this.title}`;
        } else if (this.status === 'Open' && this.isOverdue === false) {
            statusIcon = '\u2731';
            return `[${statusIcon}] ${this.title} (deadline: ${this._deadline})`;
        } else {
            statusIcon = '\u26A0';
            return `[${statusIcon}] ${this.title} (overdue)`;
        }
    }
}

let date1 = new Date();
date1.setDate(date1.getDate() + 7); // Set date 7 days from now
let task1 = new Task('JS Homework', date1);
let date2 = new Date();
date2.setFullYear(date2.getFullYear() + 1); // Set date 1 year from now
let task2 = new Task('Start career', date2);
let date3 = new Date();
date3.setDate(date3.getDate() + 3); // Set date 3 days from now
let task3 = new Task('football', date3);
// Create two tasks with deadline set to current time
let task4 = new Task('Task 4', new Date());
let task5 = new Task('Task 5', new Date());
task1.status = 'In Progress';
task3.status = 'In Progress';
task5.status = "Complete";
let tasks = [task1, task2, task3, task4, task5];
setTimeout(() => {
    tasks.sort(Task.comparator);
    console.log(tasks.join('\n'));
}, 1000); // Sort and print one second later

// should throw an Error
//let overdueTask = new Task('Overdue Task', new Date(2005, '4', '20'));
// should throw an Error
//task1.deadline = new Date(2005, '4', '20');
