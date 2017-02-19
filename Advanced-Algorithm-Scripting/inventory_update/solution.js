function updateInventory(arr1, arr2) {
    arr2.forEach((item, index) => {
        var newItem = true;

        arr1.forEach(curr => {
            if (curr[1] === item[1]) {
                curr[0] += item[0];
                newItem = false;
            }
        });

        if (newItem)
            arr1.push(item);
    });

    return arr1.sort((a, b) => a[1] > b[1]);
}

// Example inventory lists
var curInv = [
    [21, "Bowling Ball"],
    [2, "Dirty Sock"],
    [1, "Hair Pin"],
    [5, "Microphone"]
];

var newInv = [
    [2, "Hair Pin"],
    [3, "Half-Eaten Apple"],
    [67, "Bowling Ball"],
    [7, "Toothpaste"]
];

updateInventory(curInv, newInv);