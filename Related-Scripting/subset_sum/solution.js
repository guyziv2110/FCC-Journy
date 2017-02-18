// recursive approach
// returns the partial set which sums up to the sum.
//usage: 
/* 
    var set = [1, 3, 9, 2];
    var sum = 5;
    var n = set.length;
    var partial;
    partial = subsetsum_1(set, sum, n, partial);
*/

function subsetsum_1(set, sum, n, partial) {
    partial = partial || [];
    if (sum === 0)
        return partial;
    if (n === 0 && sum !== 0)
        return false;
    if (set[n - 1] > sum)
        return subsetsum_1(set, sum, n-1, partial);
    else
        return subsetsum_1(set, sum, n-1, partial) 
            || subsetsum_1(set, sum - set[n-1], n-1, partial.concat([set[n - 1]]));
}

// usage
/*
var set = [3, 4, 5, 6, 14, 19, 21, 24, 32]
var sum = 25;
var k = 2; // length of the partial sums
var all_sums;
all_sums = all_subsetsums(set, sum, k);
console.log(all_sums);
*/
// returns ALL the subset sums of length k
function all_subsetsums(set, sum, k, partial) {
    var result;
    return (function all_subsetsumsinternal(set, sum, k, partial) {
        partial = partial || [];

        partial_sum = partial.reduce((a,b) => a + b, 0);

        if (partial_sum > sum || k < 0) {
            return null;
        }

        if (partial_sum === sum && k === 0) {
            result = result || [];
            result.push(partial);
        }

        for (var i = 0; i < set.length; i++) {
            inset = set[i];
            remaning_set = set.slice(i + 1);
            all_subsetsumsinternal(remaning_set, sum, k - 1, partial.concat([inset]));
        }

        return result;
    })(set, sum, k, partial);
}

function build_dp_table(set, sum) {
    var dp_table = [];

    for(var i = 0; i < set.length + 1; i++) {
        dp_table[i] = [...Array(sum + 1)].map(x => 0);
    }

    return dp_table;
}

function dp_subsetsum(set, sum) {
    var dp_table = build_dp_table(set, sum);

    for (var i = 1; i <= sum; i++)
        dp_table[0][i] = false;
    
    for (var i = 0; i <= set.length; i++)
        dp_table[i][0] = true;

    for (var i = 1; i <= set.length; i++) {
        for (var j = 1; j <= sum; j++) {
            dp_table[i][j] = dp_table[i-1][j];

            if (dp_table[i][j] === false && j >= set[i - 1])
                dp_table[i][j] = dp_table[i][j] || dp_table[i - 1][j - set[i - 1]];
        }
    }

    return dp_table[set.length][sum];
}

var set = [1, 4, 9, 2];
var sum = 5;
console.log(dp_subsetsum(set, sum));
