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
    if(permed.length === 0)
        return [elem];
    else {
        for (var i = 0; i < perm.length; i++) {
            if (i % 2 === 0)
                permed.push(rightPerms(elem, permed));
            else
                permed.push(leftPerms(elem, permed));
        }
    }
    
}

function permsStartup(arr, n) {
    var permed = [];
    for (var i = 0 ; i < n; i++) {
        permed = perms(arr[i], permed);
    }
}

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