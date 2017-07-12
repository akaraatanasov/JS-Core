function euclid(a, b) {
    return gcd(a, b);

    function gcd(a, b) {
        "use strict";
        if (b === 0) return a;
        else return gcd(b, a % b);
    }
}