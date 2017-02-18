var TO_PENNY_MULTIPLIER = 100;

function checkCashRegister(price, cash, cid) {
  cash *= 100;
  price *= 100;
  var change = (cash) - (price);
  var denomsInPennis = denomPennisBulder();
  var cidInPennis = cid.map((d) => d[1] * TO_PENNY_MULTIPLIER);
  var cidPennisAmts = cidInPennis.map((p, i) => Math.floor(p / denomsInPennis[i]));
  var dp = [...Array(change + 1)].map(x=>change);
  var dp_list = [...Array(change + 1)].map(x=>([...Array(denomsInPennis.length)].map(x=>0)));
  var forward_index;
  dp[0] = 0;

  for (var i = 1; i <= change; i++) {
      for (j = 0; j < denomsInPennis.length; j++) {
         if(denomsInPennis[j] <= i && dp_list[i - denomsInPennis[j]][j] < cidPennisAmts[j]) {
             forward_index = i - denomsInPennis[j];
             dp[i] = Math.min(dp[i], dp[i- denomsInPennis[j]] + 1);
             dp_list[i] = dp_list[forward_index].slice(0);
             dp_list[i][j] += 1;
         }
      }
  }

  var penniesToDollar = dp_list[change].map((x,i) => [cid[i][0], x * denomsInPennis[i] / 100]).filter(x => x[1] != 0).reverse();
  if (!penniesToDollar.length) return 'Insufficient Funds';
  else if (penniesToDollar.reduce((a, b) => a + b[1], 0) === cidInPennis.reduce((a, b) => a + b/100, 0)) return 'Closed';
  else return penniesToDollar;
}

function denomBuilder() {
  return [
    { name: 'PENNY', val: 0.01},
    { name: 'NICKEL', val: 0.05},
    { name: 'DIME', val: 0.10},
    { name: 'QUARTER', val: 0.25},
    { name: 'ONE', val: 1.00},
    { name: 'FIVE', val: 5.00},
    { name: 'TEN', val: 10.00},
    { name: 'TWENTY', val: 20.00},
    { name: 'ONE HUNDRED', val: 100.00}
  ];
}

function denomPennisBulder() {
    return denomBuilder().map((denom) => denom.val * TO_PENNY_MULTIPLIER);
}

console.log(checkCashRegister(3.26, 100.00, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.10], ["QUARTER", 4.25], ["ONE", 90.00], ["FIVE", 55.00], ["TEN", 20.00], ["TWENTY", 60.00], ["ONE HUNDRED", 100.00]]));
console.log(checkCashRegister(19.50, 20.00, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1.00], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]));
console.log(checkCashRegister(19.50, 20.00, [["PENNY", 0.50], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]));