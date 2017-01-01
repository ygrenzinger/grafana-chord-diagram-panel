import _ from 'lodash';

export default function chordMpr(data) {
  var mpr = {}, mmap = {}, n = 0, matrix = [], filter, accessor;

  mpr.setFilter = function (fun) {
    filter = fun;
    return this;
  };
    mpr.setAccessor = function (fun) {
      accessor = fun;
      return this;
    };
    mpr.getMatrix = function () {
      matrix = [];
      _.each(mmap, function (a) {
        if (!matrix[a.id]) matrix[a.id] = [];
        _.each(mmap, function (b) {
          var recs = _.filter(data, function (row) {
            return filter(row, a, b);
          });
          matrix[a.id][b.id] = accessor(recs, a, b);
        });
      });
      return matrix;
    };
    mpr.getMap = function () {
      return mmap;
    };
    mpr.printMatrix = function () {
      _.each(matrix, function (elem) {
        console.log(elem);
      });
    };
    mpr.addToMap = function (value, info) {
      if (!mmap[value]) {
        mmap[value] = { name: value, id: n++, data: info };
      }
    };
    mpr.addValuesToMap = function (varName, info) {
      var values = _.uniq(_.map(data, varName));
      _.map(values, function (v) {
        if (!mmap[v]) {
          mmap[v] = { name: v, id: n++, data: info };
        }
      });
      return this;
    };
  return mpr;
}
