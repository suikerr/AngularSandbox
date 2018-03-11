interface Array<T> {
    any(predicate?: (item: T) => boolean): boolean;
    all(predicate?: (item: T) => boolean): boolean;
    where(predicate: (item: T) => boolean): Array<T>;
    count(predicate: (item: T) => boolean): number;
    first(predicate?: (item: T) => boolean): T;
    indexOf(value: T, index?: number): number;
    findIndexOf(predicate: (item:T) => boolean): number;
    distinct(): Array<T>;
    sum(selector: (item: T) => number): number;
    concatString(selector: (item: T) => string, separator: string): string;
    removeAll(predicate: (item: T) => boolean): void;
    orderBy(orderType: any): Array<T>;
    orderByDescending(orderType: any): Array<T>;
    average(selector: (item:T) => number): number;
}

Array.prototype.average = function(selector){
    let result = this.sum(selector) / this.length;
    return result;    
};

Array.prototype.any = function (predicate) {
    if (!predicate && this.length > 0) {
        return true;
    }
    for (let i = 0; i < this.length; i++) {
        if (predicate(this[i])) { return true; }
    }
    return false;
};

Array.prototype.all = function(predicate) {
    if (!predicate && this.length > 0) {
        return true;
    }
   
    for (let i = 0; i < this.length; i++) {
        if (!predicate(this[i])) { return false; }
    }

    return true;
}

Array.prototype.findIndexOf = function(predicate)  {
    for (let i = 0; i < this.length; i++) {
        if (predicate(this[i])) {
            return i;
        }
    }

    return -1;
}

Array.prototype.where = function (predicate) {
    let result = [];
    for (let i = 0; i < this.length; i++) {
        let item = this[i];
        if (predicate(item)) { result.push(item); }
    }

    return result;
};

Array.prototype.count = function (predicate) {
    let result = this.where(predicate).length;
    return result;
}

Array.prototype.first = function (predicate) {
    if (!predicate && this.length > 0) {
        return this[0];
    }
    for (let i = 0; i < this.length; i++) {
        let item = this[i];
        if (predicate(item)) {
            return item;
        }
    }

    return null;
};

Array.prototype.indexOf || (Array.prototype.indexOf = function (value, index) {
    let a;
    if (null == this) { throw new TypeError('"this" is null or not defined'); }

    let c = Object(this),
        b = c.length >>> 0;

    if (b === 0) {
        return -1;
    }

    a = +index || 0;
    Infinity === Math.abs(a) && (a = 0);

    if (a >= b) {
        return -1;
    }

    for (a = Math.max(0 <= a ? a : b = Math.abs(a), 0); a < b;) {
        if (a in c && c[a] === value) {
            return a;
        }
        a++;
    }

    return -1;
});

Array.prototype.distinct = function () {
    let result = [];
    for (let i = 0; i < this.length; i++) {
        if (!result.any(x => x == this[i])) {
            result.push(this[i]);
        }
    }

    return result;
};

Array.prototype.sum = function (selector) {
    let value = 0;
    if (selector && this.length > 0) {
        for (let i = 0; i < this.length; i++) {
            value = value + selector(this[i]);
        }
    }
    return value;
};

Array.prototype.concatString = function (selector, separator) {
    let value = null;

    if (selector && this.length > 0) {

        let strings = this.map(selector).where((item) => item !== null && item !== '');

        value = strings.join(separator);
    }

    return value;
};

Array.prototype.removeAll = function(predicate) {
    let i = this.length;

    while (i--) {
        if (predicate(this[i])) {
            this.splice(i, 1);
        }
    }
};

// inspired by: https://stackoverflow.com/a/40451365
Array.prototype.orderBy = function (orderType: any) {
    return this.sort((a, b) => {
        let valueA = orderType(a);
        let valueB = orderType(b);

        if (valueA < valueB) {
            return -1;
        }

        if (valueA > valueB) {
            return 1;
        }

        return 0;
    });
}

Array.prototype.orderByDescending = function (orderType: any) {
    return this.sort((a, b) => {
        let valueA = orderType(a);
        let valueB = orderType(b);

        if (valueA > valueB) {
            return -1;
        }

        if (valueA < valueB) {
            return 1;
        }

        return 0;
    });
}
