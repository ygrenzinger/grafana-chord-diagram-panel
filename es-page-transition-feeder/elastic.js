'use strict';

var elasticsearch = require('elasticsearch');

var elasticClient = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'info'
});

var ping = function () {
    return elasticClient.ping({
        requestTimeout: 3000,
    });
}
exports.ping = ping;


var indexName = 'page-transitions';

function initIndex() {
    return elasticClient.indices.create({
        index: indexName
    });
}
exports.initIndex = initIndex;

function indexExists() {
    return elasticClient.indices.exists({
        index: indexName
    });
}
exports.indexExists = indexExists;

function initMapping() {
    return elasticClient.indices.putMapping({
        index: indexName,
        type: 'page-transitions',
        body: {
            'properties': {
                'leavingPage': { 'type': 'keyword', 'index': true },
                'enteringPage': { 'type': 'keyword', 'index': true },
                '@timestamp': { 'type': 'date' }
            }
        }
    });
}
exports.initMapping = initMapping;

function addTransition(leavingPage, enteringPage) {
    return elasticClient.index({
        index: indexName,
        type: 'document',
        body: {
            'leavingPage': leavingPage,
            'enteringPage': enteringPage,
            '@timestamp': new Date()
        }
    });
}
exports.addTransition = addTransition;