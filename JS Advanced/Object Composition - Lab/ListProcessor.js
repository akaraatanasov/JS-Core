function solve(commands) {
    let processor = (function () {
       let list = [];
       
       function add(string) {
           list.push(string);
       }
       
       function remove(string) {
           list = list.filter(e => e !== string);
       }
       
       function print() {
           console.log(list.toString());
       }

       return {
           add,
           remove,
           print
       }
    })();

    for (let command of commands) {
        let tokens = command.split(' ');
        processor[tokens[0]](tokens[1]);
    }
}