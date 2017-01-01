'use strict';

System.register(['lodash'], function (_export, _context) {
  "use strict";

  var _;

  function chordRdr(matrix, mmap) {
    return function (d) {
      var i,
          j,
          s,
          t,
          g,
          m = {};
      if (d.source) {
        i = d.source.index;j = d.target.index;
        s = _.filter(mmap, { id: i });
        t = _.filter(mmap, { id: j });
        m.sname = s[0].name;
        m.sdata = d.source.value;
        m.svalue = +d.source.value;
        m.stotal = _.reduce(matrix[i], function (k, n) {
          return k + n;
        }, 0);
        m.tname = t[0].name;
        m.tdata = d.target.value;
        m.tvalue = +d.target.value;
        m.ttotal = _.reduce(matrix[j], function (k, n) {
          return k + n;
        }, 0);
      } else {
        g = _.filter(mmap, { id: d.index });
        m.gname = g[0].name;
        m.gdata = g[0].data;
        m.gvalue = d.value;
      }
      m.mtotal = _.reduce(matrix, function (m1, n1) {
        return m1 + _.reduce(n1, function (m2, n2) {
          return m2 + n2;
        }, 0);
      }, 0);
      return m;
    };
  }

  _export('default', chordRdr);

  return {
    setters: [function (_lodash) {
      _ = _lodash.default;
    }],
    execute: function () {}
  };
});
//# sourceMappingURL=chordDataReader.js.map
