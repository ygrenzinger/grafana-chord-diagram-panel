var elastic = require('./elastic');

elastic.ping().then(function () {
    return elastic.indexExists();
}).then(function (exists) {
    if (exists) {
        console.log('initMapping');
        return elastic.initMapping();
    }else {
        console.log('initIndex');
        return elastic.initIndex();
    }
}).then(function() {
    console.log('Done');
}).catch(error => {
    console.error('error: ', error);
});
