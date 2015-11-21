String.prototype.firstLetterUpperCase = function () {
    return this[0].toUpperCase() + this.substr(1).toLowerCase();
}

Date.prototype.fromJson = function (jsonDate) {
    if (typeof (jsonDate) == "string") {
        if (jsonDate.indexOf('Date') >= 0) {
            return eval(jsonDate.replace(/\/Date\((\d+)\)\//gi, "new Date($1)"));
        }
        else {
            // "2013-02-18T11:50:59+01:00"
            // "2013-02-18T11:50:59Z"
            // "2013-02-18T11:50:59.0727076"
            var parts = jsonDate.split(/T|\+|Z|\./);
            var dateParts = parts[0].split("-");
            var hourPart = parts[1].split(":");

            this.setFullYear(dateParts[0], dateParts[1] - 1, dateParts[2]);
            this.setHours(hourPart[0], hourPart[1], hourPart[2], 0);
            return this;
        }
    }
    return jsonDate;
};

/**
 * Search an array of objects or strings for given term
 * @param term
 */
Array.prototype.search = function(term){
    var ret = [];
    for (var i = 0; i < this.length; i++) {
        var item = this[i];
        var type = Object.prototype.toString.call(item).split(' ').slice(0, -1);
        switch(type){
            case "Object":
                for (var key in item) {
                    if((""+item[key]).toLowerCase().indexOf(term.toLowerCase()) > -1){
                        ret.push(item);
                        break;
                    }
                }
                break;
            default:
                var itemString = JSON.stringify(this[i]).toLowerCase();
                if(itemString.indexOf(term.toLowerCase()) > -1)
                    ret.push(this[i])
                break;
        }

    }
    return ret.length > 0 ? ret : [];
};
/**
 * Return an array with only unique values (only works for string-arrays for now)
 *
 * Example
 *
 * ["a", "b", "c"].distinct()
 * returns: ["a", "b", "c"]
 *
 * ["a", "b", "c", "b", "b"].distinct()
 * returns: ["a", "b", "c"]
 *
 * ["a", "b", "c", "b", "b", "a"].distinct()
 * returns: ["a", "b", "c"]
 *
 * @returns {Array}
 */
Array.prototype.distinct = function(){
    if(!this[0] instanceof String)
        return this;

    var newArray = [];
    for (var i = 0; i < this.length; i++) {
        var str = this[i];
        if(newArray.search(str).length == 0)
            newArray.push(str);
    }
    return newArray;
};

Array.prototype.pushUnique = function(val){
    if(this.length  > 0 && !this[0] instanceof String)
        return this;
    if(this.indexOf(val) == -1)
        this.push(val);
};

Array.prototype.multiply = function(times){
    var arr = this.copy();
    var newArr = [];
    for (var i = 0; i < times; i++) {
        for (var j = 0; j < arr.length; j++) {
            newArr.push(arr[j])
        }
    }
    return newArr;
};

Array.prototype.copy = function(){
    return JSON.parse(JSON.stringify(this));
}


/**
 * Returns the first {count} items of an array
 * @type {Function}
 */
Array.prototype.take = $.prototype.take = function(count){
    if(this.length == 0 || count < 0) return this;
    if(count == 0) return null;
    if(this.length <= count)
        return this;
    return this.slice(0, count)
}

/**
 * Removes the first {count} items of an array and returns the remaining
 * @type {Function}
 */
Array.prototype.skip = $.prototype.skip = function(count){
    if(this.length == 0) return this;
    if(this.length <= count)
        return [];
    return this.slice(count);
}
