'use strict';

System.register(['lodash', './external/d3.v3.min', './chordDataMapper', './chordDataReader'], function (_export, _context) {
  "use strict";

  var _, d3, chordMpr, chordRdr;

  function renderChordDiagram(container, chordDiagramDivId, w, h) {

    var data = [{ "year": "2009", "importer1": "Antigua & Barbuda", "importer2": "Argentina", "flow1": ".41", "flow2": "0" }, { "year": "2009", "importer1": "Antigua & Barbuda", "importer2": "Andorra", "flow1": "0", "flow2": "0" }, { "year": "2009", "importer1": "Antigua & Barbuda", "importer2": "Austria", "flow1": ".23", "flow2": "0" }, { "year": "2009", "importer1": "Antigua & Barbuda", "importer2": "Albania", "flow1": "7.60e-11", "flow2": "0" }, { "year": "2009", "importer1": "Antigua & Barbuda", "importer2": "Armenia", "flow1": "0", "flow2": "0" }, { "year": "2009", "importer1": "Antigua & Barbuda", "importer2": "Azerbaijan", "flow1": "0", "flow2": "0" }, { "year": "2009", "importer1": "Antigua & Barbuda", "importer2": "Angola", "flow1": "0", "flow2": "0" }, { "year": "2009", "importer1": "Antigua & Barbuda", "importer2": "Algeria", "flow1": "3.07e-12", "flow2": "0" }, { "year": "2009", "importer1": "Antigua & Barbuda", "importer2": "Afghanistan", "flow1": "0", "flow2": "0" }, { "year": "2009", "importer1": "Antigua & Barbuda", "importer2": "Australia", "flow1": ".37", "flow2": ".25" }, { "year": "2009", "importer1": "Argentina", "importer2": "Andorra", "flow1": "0", "flow2": "0" }, { "year": "2009", "importer1": "Argentina", "importer2": "Austria", "flow1": "139.02", "flow2": "103.74" }, { "year": "2009", "importer1": "Argentina", "importer2": "Albania", "flow1": ".01", "flow2": "10.13" }, { "year": "2009", "importer1": "Argentina", "importer2": "Armenia", "flow1": ".12", "flow2": "3.11" }, { "year": "2009", "importer1": "Argentina", "importer2": "Azerbaijan", "flow1": ".12", "flow2": "19.94" }, { "year": "2009", "importer1": "Argentina", "importer2": "Angola", "flow1": "0", "flow2": "180.11" }, { "year": "2009", "importer1": "Argentina", "importer2": "Algeria", "flow1": ".09", "flow2": "807.4" }, { "year": "2009", "importer1": "Argentina", "importer2": "Afghanistan", "flow1": "0", "flow2": "2.71" }, { "year": "2009", "importer1": "Argentina", "importer2": "Australia", "flow1": "183.31", "flow2": "314.03" }, { "year": "2009", "importer1": "Andorra", "importer2": "Austria", "flow1": "0", "flow2": "0" }, { "year": "2009", "importer1": "Andorra", "importer2": "Albania", "flow1": "0", "flow2": "0" }, { "year": "2009", "importer1": "Andorra", "importer2": "Armenia", "flow1": "0", "flow2": "0" }, { "year": "2009", "importer1": "Andorra", "importer2": "Azerbaijan", "flow1": "0", "flow2": "0" }, { "year": "2009", "importer1": "Andorra", "importer2": "Angola", "flow1": "0", "flow2": "0" }, { "year": "2009", "importer1": "Andorra", "importer2": "Algeria", "flow1": "0", "flow2": "0" }, { "year": "2009", "importer1": "Andorra", "importer2": "Afghanistan", "flow1": "0", "flow2": "0" }, { "year": "2009", "importer1": "Andorra", "importer2": "Australia", "flow1": "0", "flow2": "0" }, { "year": "2009", "importer1": "Austria", "importer2": "Albania", "flow1": "73.58", "flow2": "90.68" }, { "year": "2009", "importer1": "Austria", "importer2": "Armenia", "flow1": ".95", "flow2": "57.43" }, { "year": "2009", "importer1": "Austria", "importer2": "Azerbaijan", "flow1": "51.25", "flow2": "63.42" }, { "year": "2009", "importer1": "Austria", "importer2": "Angola", "flow1": ".02", "flow2": "38.73" }, { "year": "2009", "importer1": "Austria", "importer2": "Algeria", "flow1": "58.31", "flow2": "266.41" }, { "year": "2009", "importer1": "Austria", "importer2": "Afghanistan", "flow1": ".02", "flow2": "11.92" }, { "year": "2009", "importer1": "Austria", "importer2": "Australia", "flow1": "58.37", "flow2": "888.65" }, { "year": "2009", "importer1": "Albania", "importer2": "Armenia", "flow1": ".42", "flow2": "0" }, { "year": "2009", "importer1": "Albania", "importer2": "Azerbaijan", "flow1": "3.01", "flow2": "0" }, { "year": "2009", "importer1": "Albania", "importer2": "Angola", "flow1": "0", "flow2": "0" }, { "year": "2009", "importer1": "Albania", "importer2": "Algeria", "flow1": "0", "flow2": "1.13" }, { "year": "2009", "importer1": "Albania", "importer2": "Afghanistan", "flow1": "0", "flow2": "2.25" }, { "year": "2009", "importer1": "Albania", "importer2": "Australia", "flow1": "1.14", "flow2": ".23" }, { "year": "2009", "importer1": "Armenia", "importer2": "Azerbaijan", "flow1": "0", "flow2": "0" }, { "year": "2009", "importer1": "Armenia", "importer2": "Angola", "flow1": "0", "flow2": "0" }, { "year": "2009", "importer1": "Armenia", "importer2": "Algeria", "flow1": ".3", "flow2": ".04" }, { "year": "2009", "importer1": "Armenia", "importer2": "Afghanistan", "flow1": "0", "flow2": "0" }, { "year": "2009", "importer1": "Armenia", "importer2": "Australia", "flow1": "3.41", "flow2": ".69" }, { "year": "2009", "importer1": "Azerbaijan", "importer2": "Angola", "flow1": "0", "flow2": ".02" }, { "year": "2009", "importer1": "Azerbaijan", "importer2": "Algeria", "flow1": "0", "flow2": ".38" }, { "year": "2009", "importer1": "Azerbaijan", "importer2": "Afghanistan", "flow1": ".02", "flow2": "63.34" }, { "year": "2009", "importer1": "Azerbaijan", "importer2": "Australia", "flow1": "5.71", "flow2": "147.18" }, { "year": "2009", "importer1": "Angola", "importer2": "Algeria", "flow1": "1.4", "flow2": ".05" }, { "year": "2009", "importer1": "Angola", "importer2": "Afghanistan", "flow1": "0", "flow2": "0" }, { "year": "2009", "importer1": "Angola", "importer2": "Australia", "flow1": "9.18", "flow2": ".03" }, { "year": "2009", "importer1": "Algeria", "importer2": "Afghanistan", "flow1": "1.2", "flow2": "0" }, { "year": "2009", "importer1": "Algeria", "importer2": "Australia", "flow1": "41.27", "flow2": "132.45" }, { "year": "2009", "importer1": "Afghanistan", "importer2": "Australia", "flow1": "25.27", "flow2": ".18" }];

    function drawChords(matrix, mmap) {
      var r1 = h / 2,
          r0 = r1 - 110;
      console.log("width: " + w + " height: " + h + " chordDiagramDivId: " + chordDiagramDivId);

      var fill = d3.scale.ordinal().range(['#c7b570', '#c6cdc7', '#335c64', '#768935', '#507282', '#5c4a56', '#aa7455', '#574109', '#837722', '#73342d', '#0a5564', '#9c8f57', '#7895a4', '#4a5456', '#b0a690', '#0a3542']);

      var chord = d3.layout.chord().padding(0.02).sortSubgroups(d3.descending).sortChords(d3.descending);

      var arc = d3.svg.arc().innerRadius(r0).outerRadius(r0 + 20);

      var svg = d3.select(container).append("svg:svg").attr("width", w).attr("height", h).append("svg:g").attr("id", "circle").attr("transform", "translate(" + w / 2 + "," + h / 2 + ")");

      svg.append("circle").attr("r", r0 + 20);

      var rdr = chordRdr(matrix, mmap);
      chord.matrix(matrix);

      var g = svg.selectAll("g.group").data(chord.groups()).enter().append("svg:g").attr("class", "group").on("mouseover", mouseover).on("mouseout", function (d) {
        d3.select(".grafana-d3-chord-diagram-tooltip").style("visibility", "hidden");
      });

      g.append("svg:path").style("stroke", "black").style("fill", function (d) {
        return fill(rdr(d).gname);
      }).attr("d", arc);

      g.append("svg:text").each(function (d) {
        d.angle = (d.startAngle + d.endAngle) / 2;
      }).attr("dy", ".35em").style("font-family", "helvetica, arial, sans-serif").style("font-size", "9px").style("fill", "white").attr("text-anchor", function (d) {
        return d.angle > Math.PI ? "end" : null;
      }).attr("transform", function (d) {
        return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")" + "translate(" + (r0 + 26) + ")" + (d.angle > Math.PI ? "rotate(180)" : "");
      }).text(function (d) {
        return rdr(d).gname;
      });

      var chordPaths = svg.selectAll("path.chord").data(chord.chords()).enter().append("svg:path").attr("class", "chord").style("stroke", function (d) {
        return d3.rgb(fill(rdr(d).sname)).darker();
      }).style("fill", function (d) {
        return fill(rdr(d).sname);
      }).attr("d", d3.svg.chord().radius(r0)).on("mouseover", function (d) {
        d3.select(".grafana-d3-chord-diagram-tooltip").style("visibility", "visible").html(chordTip(rdr(d))).style("top", function () {
          return event.pageY - 170 + "px";
        }).style("left", function () {
          return event.pageX - 100 + "px";
        });
      }).on("mouseout", function (d) {
        d3.select(".grafana-d3-chord-diagram-tooltip").style("visibility", "hidden");
      });

      function chordTip(d) {
        console.log("Display tooltip");
        var p = d3.format(".1%"),
            q = d3.format(",.2f");
        return "Chord Info:<br/>" + d.sname + " imports from " + d.tname + ": $" + q(d.svalue) + "M<br/>" + p(d.svalue / d.stotal) + " of " + d.sname + "'s Total ($" + q(d.stotal) + "M)<br/>" + p(d.svalue / d.mtotal) + " of Matrix Total ($" + q(d.mtotal) + "M)<br/>" + "<br/>" + d.tname + " imports from " + d.sname + ": $" + q(d.tvalue) + "M<br/>" + p(d.tvalue / d.ttotal) + " of " + d.tname + "'s Total ($" + q(d.ttotal) + "M)<br/>" + p(d.tvalue / d.mtotal) + " of Matrix Total ($" + q(d.mtotal) + "M)";
      }

      function groupTip(d) {
        var p = d3.format(".1%"),
            q = d3.format(",.2f");
        return "Group Info:<br/>" + d.gname + " : " + q(d.gvalue) + "M<br/>" + p(d.gvalue / d.mtotal) + " of Matrix Total (" + q(d.mtotal) + "M)";
      }

      function mouseover(d, i) {
        d3.select(".grafana-d3-chord-diagram-tooltip").style("visibility", "visible").html(groupTip(rdr(d))).style("top", function () {
          return event.pageY - 80 + "px";
        }).style("left", function () {
          return event.pageX - 130 + "px";
        });

        chordPaths.classed("fade", function (p) {
          return p.source.index != i && p.target.index != i;
        });
      }
    }

    function build() {
      var mpr = chordMpr(data);
      mpr.addValuesToMap('importer1').addValuesToMap('importer2').setFilter(function (row, a, b) {
        return row.importer1 === a.name && row.importer2 === b.name || row.importer1 === b.name && row.importer2 === a.name;
      }).setAccessor(function (recs, a, b) {
        if (!recs[0]) return 0;
        return recs[0].importer1 === a.name ? +recs[0].flow1 : +recs[0].flow2;
      });
      return drawChords(mpr.getMatrix(), mpr.getMap());
    }

    return build();
  }

  _export('default', renderChordDiagram);

  return {
    setters: [function (_lodash) {
      _ = _lodash.default;
    }, function (_externalD3V3Min) {
      d3 = _externalD3V3Min;
    }, function (_chordDataMapper) {
      chordMpr = _chordDataMapper.default;
    }, function (_chordDataReader) {
      chordRdr = _chordDataReader.default;
    }],
    execute: function () {}
  };
});
//# sourceMappingURL=chordDiagramRenderer.js.map
