class calculator {

//assumes contributions are made at the start of each compounding period

calcIntYrBegin(rate, time, cont) {
    rate = (rate / 100) + 1;
    let i = 0;
    let yield = 0;
    while (i < time) {
        yield = ((cont * rate) + (yield * rate));
        i += 1;
    }
    return yield;
}

// assumes that contributions are made at the end of each compounding period

calcIntYrEnd(rate, time, cont) {
    rate = (rate / 100) + 1;
    let i = 0;
    let yield = 0;
    while (i < (time - 1)) {
        yield = ((cont * rate) + (yield * rate));
        i += 1;
    }
    return yield + cont;
}


// returns an object we can use with svg

constructObj(rate, time, cont) {
    rate = (rate / 100) + 1;
    let obj = {}
    let i = 0;
    let yield = 0;
    while (i < time) {
        yield = ((cont * rate) + (yield * rate));
        i += 1;
        obj[i] = yield.toFixed(2);
    }
    return obj;
}

// makes an array of objects w/ a key of year and yeild
makeArr(rate, time, cont) {
    rate = (rate / 100) + 1;
    let obj = {};
    let total = {};
    let result = [];
    let i = 0;
    let yield = 0;
    while (i < time) {
        yield = ((cont * rate) + (yield * rate));
        result[i] = {
            year: i + 1,
            yield: yield.toFixed(2)
        }
        i += 1;
    }
    return result;
}

}

export default calculator;