var elastic = require('./elastic');
var _ = require('lodash');

var pageNames = ['Deal Structuring', 'Deal Structuring', 'Deal Structuring',
    'Facility Structuring', 'Facility Structuring',
    'Security Package', 'Borrowing Base', 'Collateral'];

var addRandomTransition = function () {
    var leavingPage = pageNames[_.random(pageNames.length - 1)];
    var filteredPages = _.filter(pageNames, function (p) { return p !== leavingPage; })
    var enteringPage = filteredPages[_.random(filteredPages.length - 1)];
    elastic.addTransition(leavingPage, enteringPage).then(function () {
        console.log('Added transition : ' + leavingPage + ' to ' + enteringPage);
    }).catch(error => {
        console.error('error: ', error);
    });
};


function continuouslyAddingTransition() {
    setTimeout(function () {
        addRandomTransition();
        continuouslyAddingTransition();
    }, 1000);
}
continuouslyAddingTransition();
