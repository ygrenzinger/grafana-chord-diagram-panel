import _ from 'lodash';
import * as d3 from './external/d3.v3.min';
import chordMpr from './chordDataMapper';
import chordRdr from './chordDataReader';

export default function renderChordDiagram(container, chordDiagramDivId, w, h) {

  var data = [
    { "leavingPage": "Deal", "enteringPage": "Facility", "count": "468" },
    { "leavingPage": "Deal", "enteringPage": "Security Package", "count": "163" },
    { "leavingPage": "Deal", "enteringPage": "Borrowing Base", "count": "34" },
    { "leavingPage": "Facility", "enteringPage": "Deal", "count": "342" },
    { "leavingPage": "Facility", "enteringPage": "Security Package", "count": "120" },
    { "leavingPage": "Facility", "enteringPage": "Borrowing Base", "count": "13" },
    { "leavingPage": "Security Package", "enteringPage": "Deal", "count": "154" },
    { "leavingPage": "Security Package", "enteringPage": "Facility", "count": "24" },
    { "leavingPage": "Security Package", "enteringPage": "Borrowing Base", "count": "4" },
    { "leavingPage": "Borrowing Base", "enteringPage": "Deal", "count": "54" },
    { "leavingPage": "Borrowing Base", "enteringPage": "Facility", "count": "9" },
    { "leavingPage": "Borrowing Base", "enteringPage": "Borrowing Base", "count": "0" },
  ];

  function drawChords(matrix, mmap) {
    var r1 = h / 2, r0 = r1 - 110;
    console.log("width: " + w + " height: " + h + " chordDiagramDivId: " + chordDiagramDivId);

    var fill = d3.scale.category10();

    var chord = d3.layout.chord()
      .padding(0.02)
      .sortSubgroups(d3.descending)
      .sortChords(d3.descending);

    var arc = d3.svg.arc()
      .innerRadius(r0)
      .outerRadius(r0 + 20);

    var svg = d3.select(container).append("svg:svg")
      .attr("width", w)
      .attr("height", h)
      .append("svg:g")
      .attr("id", "circle")
      .attr("transform", "translate(" + w / 2 + "," + h / 2 + ")");

    svg.append("circle")
      .attr("r", r0 + 20);

    var rdr = chordRdr(matrix, mmap);
    chord.matrix(matrix);

    var g = svg.selectAll("g.group")
      .data(chord.groups())
      .enter().append("svg:g")
      .attr("class", "group")
      .on("mouseover", mouseover)
      .on("mouseout", function (d) {
        d3.select(".grafana-d3-chord-diagram-tooltip").style("visibility", "hidden");
      });

    g.append("svg:path")
      .style("stroke", "black")
      .style("fill", function (d) {
        return fill(rdr(d).gname);
      })
      .attr("d", arc);

    g.append("svg:text")
      .each(function (d) { d.angle = (d.startAngle + d.endAngle) / 2; })
      .attr("dy", ".35em")
      .style("font-family", "helvetica, arial, sans-serif")
      .style("font-size", "9px")
      .style("fill", "white")
      .attr("text-anchor", function (d) { return d.angle > Math.PI ? "end" : null; })
      .attr("transform", function (d) {
        return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")" +
          "translate(" + (r0 + 26) + ")" + (d.angle > Math.PI ? "rotate(180)" : "");
      })
      .text(function (d) { return rdr(d).gname; });

    var chordPaths = svg.selectAll("path.chord")
      .data(chord.chords())
      .enter().append("svg:path")
      .attr("class", "chord")
      .style("stroke", function (d) {
        return d3.rgb(fill(rdr(d).sname)).darker();
      })
      .style("fill", function (d) {
        return fill(rdr(d).sname);
      })
      .attr("d", d3.svg.chord().radius(r0))
      .on("mouseover", function (d) {
        d3.select(".grafana-d3-chord-diagram-tooltip")
          .style("visibility", "visible")
          .html(chordTip(rdr(d)))
          .style("top", function () {
            return (event.pageY - 170) + "px";
          })
          .style("left", function () {
            return (event.pageX - 100) + "px";
          });
      })
      .on("mouseout", function (d) {
        d3.select(".grafana-d3-chord-diagram-tooltip").style("visibility", "hidden");
      });

    function chordTip(d) {
      console.log("Display tooltip");
      var p = d3.format(".1%"), q = d3.format(",.2f");
      return "Chord Info:<br/>" + 
        "Leaving " + d.sname + " to " + d.tname + ": " + d.svalue + "<br/>" +
        p(d.svalue / d.stotal) + " of " + d.sname + "'s leaving  (" + d.stotal + ")<br/>" +
        p(d.svalue / d.mtotal) + " of total transitions (" + d.mtotal + ")<br/>" + 
        "<br/>" +
        "Entering " +d.tname + " from " + d.sname + ": " + d.tvalue + "<br/>" +
        p(d.tvalue / d.ttotal) + " of " + d.tname + "'s entering (" + d.ttotal + ")<br/>" +
        p(d.tvalue / d.mtotal) + " of total transitions (" + d.mtotal + ")";
    }

    function groupTip(d) {
      var p = d3.format(".1%"), q = d3.format(",.2f");
      return "Group Info:<br/>" + 
        d.gname + " : " + d.gvalue + " transitions <br/>" +
        p(d.gvalue / d.mtotal) + " of total transitions (" + d.mtotal + ")";
    }

    function mouseover(d, i) {
      d3.select(".grafana-d3-chord-diagram-tooltip")
        .style("visibility", "visible")
        .html(groupTip(rdr(d)))
        .style("top", function () {
          return (event.pageY - 80) + "px";
        })
        .style("left", function () {
          return (event.pageX - 130) + "px";
        });

      chordPaths.classed("fade", function (p) {
        return p.source.index != i && p.target.index != i;
      });
    }
  }

  function build() {
    var mpr = chordMpr(data);

    mpr
      .addValuesToMap("leavingPage")
      .setFilter(function (row, a, b) {
        return (row.leavingPage === a.name && row.enteringPage === b.name);
      })
      .setAccessor(function (recs, a, b) {
        if (!recs[0]) return 0;
        return +recs[0].count;
      });
    return drawChords(mpr.getMatrix(), mpr.getMap());
  }

  return build();
} 