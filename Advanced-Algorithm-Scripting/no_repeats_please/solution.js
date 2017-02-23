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
        new_permed.splice(i, 0, elem);
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

// allows to continue on the loop when duplicates found
// right perms checks: isDuplicate(elem, permed, permed.length - i )
// left perms checks: isDuplicate(elem, permed, i )
function isDuplicate(elem, permed, i) {
    if(i >= 0 && i <= permed.length - 1)
        if(permed[i] === elem)
            return true;
    return false;
}

function permsGenerator(str) {
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

    return str_perms;
}

function permAlone(str) {
  var consecutives_reg = /(.)\1+/g;
  var perms = permsGenerator(str);
  var filtered_perms = perms.filter(function(perm) {
    return !perm.match(consecutives_reg);
  });  

  return filtered_perms.length;
}

console.log(permAlone('1234'));