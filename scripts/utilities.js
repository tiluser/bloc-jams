var foreach = function (collection, callback) {
    for (var i = 0; i < collection.length; i++) {
        callback(collection[i]);
    }
}
