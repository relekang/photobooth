Storage = (function () {
    'use strict';

    return {
        /* add data to localStorage */
        set: function (key, value) {

            /* if the value is an object, stringify it to save it in localStorage */
            if (typeof value === 'object') {
                value = JSON.stringify(value);
            }

            localStorage.setItem(key, value);
        },
        /* retrieve data from localStorage object */
        get: function (key) {
            var data;

            if (!this.hasData(key)) {
                return false;
            }

            data = localStorage[key];

            /* if the data is JSON, try to parse */
            try {
                return JSON.parse(data);
            } catch (e) {
                return data;
            }
        },
        setFieldForKey: function(key, field, value){
            if(this.hasData(key)){
                var data = this.get(key);
                data[field] = value;
                this.set(key, data);
            }
        },

        /* check if the item exists and it has data */
        hasData: function (key) {
            return !!localStorage[key] && !!localStorage[key].length;
        },
        clearField: function (key) {
            localStorage.removeItem(key);
        }
    };
}());