function permAlone(str) {
  return str;
}

permAlone('aab');

// solution (SJT algoirthm)
// https://en.wikipedia.org/wiki/Steinhaus%E2%80%93Johnson%E2%80%93Trotter_algorithm
// https://mathlesstraveled.com/2013/01/03/the-steinhaus-johnson-trotter-algorithm/
function perms(elem, permed) {
    // create adj list
    // when n == arr.length keep the perm.
    var perm_result = [];
    if(permed.length === 0)
        return [[elem]];
    else {
        for (var i = 0; i < permed.length; i++) {
            var right_perms = [];
            var left_perms = [];             
            if (i % 2 === 0)
                right_perms = (rightPerms(elem, permed[i]));
            else
                left_perms = (leftPerms(elem, permed[i]));

            perm_result = perm_result.concat(right_perms.concat(left_perms));
        }
    }

    return perm_result;
}

function leftPerms(elem, permed) {
    var left_permed = [];

    for (var i = 0; i <= permed.length; i++) {
        var curr_perm = permed;
        var new_permed = curr_perm.slice();
        new_permed.splice(curr_perm.length - i, 0, elem);
        left_permed.push(new_permed);
    }

    return left_permed;
}

function rightPerms(elem, permed) {
    var right_permed = [];

    for (var i = 0; i <= permed.length; i++) {
        var curr_perm = permed;
        var new_permed = curr_perm.slice();
        new_permed.splice(curr_perm.length - i, 0, elem);
        right_permed.push(new_permed);
    }

    return right_permed;
}

function permsStartup(str) {
    var permed = [];
    var arr = str.split('');
    var n = arr.length;
    var str_perms = [];
    for (var i = 0 ; i < n; i++) {
        permed = perms(arr[i], permed);
    }

    for (var i = 0 ; i < permed.length; i++) {
        var strs = permed[i].join('');
        str_perms.push(strs);
    }

}


permsStartup('ABCDE');
//for example will be returned 
/*
step 1:
A
step 2:
AB
BA
step 3:
ABC
ACB
CAB
CBA
BCA
BAC
step 4:....
*/

//function buildAdjList()