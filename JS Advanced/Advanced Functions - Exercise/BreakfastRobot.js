let result = (function () {
    let robot = {
        protein: 0,
        carbohydrate: 0,
        fat: 0,
        flavour: 0
    };

    let products = {
      apple: {
          carbohydrate: 1,
          flavour: 2
      },
      coke: {
          carbohydrate: 10,
          flavour: 20
      },
      burger: {
          carbohydrate: 5,
          fat: 7,
          flavour: 3
      },
      omelet: {
          protein: 5,
          fat: 1,
          flavour: 1
      },
      cheverme: {
          protein: 10,
          carbohydrate: 10,
          fat: 10,
          flavour: 10
      }
    };
    
    return function (input) {
        let inputData = input.split(' ');
        let command = inputData[0];

        if (command === 'restock') {
            let microElement = inputData[1];
            let quantity = Number(inputData[2]);

            robot[microElement] += quantity;
            return 'Success';
        } else if (command === 'prepare') {
            let selectedProduct = inputData[1];
            let quantity = Number(inputData[2]);
            let currentProductStats = products[selectedProduct];

            let canProductBeCooked = true;

            for (let microElement in currentProductStats) {
                if (currentProductStats.hasOwnProperty(microElement)) {
                    let microElementQuantity = currentProductStats[microElement];

                    if (robot[microElement] < microElementQuantity * quantity) {
                        canProductBeCooked = false;
                        return `Error: not enough ${microElement} in stock`;
                    }
                }
            }

            if (canProductBeCooked) {
                for (let microElement in currentProductStats) {
                    if (currentProductStats.hasOwnProperty(microElement)) {
                        let microElementQuantity = currentProductStats[microElement];

                        robot[microElement] -= microElementQuantity * quantity;
                    }
                }

                return 'Success';
            }

        } else if (command === 'report') {
            return `protein=${robot.protein} carbohydrate=${robot.carbohydrate} fat=${robot.fat} flavour=${robot.flavour}`;
        }
    }
})();

result('restock carbohydrate 10');
result('restock flavour 10');
result('prepare apple 1');
result('restock fat 10');
result('prepare burger 1');
result('report');