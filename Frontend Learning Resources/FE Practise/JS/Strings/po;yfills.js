// find vowels in string
String.prototype.getVowels = function () {
    let res = '';
    const vowels = ['a', 'e', 'i', 'o', 'u']
    for (let i = 0; i < this.length; i++) {
        if (vowels.includes(this[i]) && !res.includes(this[i])) { // for unique vowels
            res += this[i];
        }
    }
    return res;
}

console.log('the quick brown fox jump over the lazy white dox'.getVowels());

// repeat string polyfills
String.prototype.customRepeat = function (count) {
    if (!count) return ''
    let res = '';
    for (let i = 0; i < count; i++) {
        res += this;
    }
    return res;
}

console.log('John doe'.customRepeat(4))