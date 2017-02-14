function steamrollArray(arr) {
    // I'm a steamroller, baby
    return arr.reduce(function (flatResult, nextToFlat) {
        return flatResult.concat(Array.isArray(nextToFlat) ? steamrollArray(nextToFlat) : nextToFlat);
    }, []);
}

console.log(steamrollArray([1, [2], [3, [[4]]]]));