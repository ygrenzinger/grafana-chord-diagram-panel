import {MetricsPanelCtrl} from 'app/plugins/sdk';
import _ from 'lodash';
import $ from 'jquery';
import kbn from 'app/core/utils/kbn';
import config from 'app/core/config';
import TimeSeries from 'app/core/time_series2';
//import * as d3 from '../bower_components/d3/d3.js';
import * as d3 from './external/d3.v3.min';
import './css/panel.css!';
import './external/d3gauge';
import './external/d3-queue.min';
import renderChordDiagram from './chordDiagramRenderer';

const panelDefaults = {
  fontSizes: [4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,54,56,58,60,62,64,66,68,70],
  fontTypes: [
    'Arial', 'Avant Garde', 'Bookman',
    'Consolas', 'Courier', 'Courier New',
    'Garamond', 'Helvetica', 'Open Sans',
    'Palatino', 'Times', 'Times New Roman',
    'Verdana'
  ],
  unitFormats: kbn.getUnitFormats(),
  operatorNameOptions: ['min','max','avg', 'current', 'total', 'name'],
  valueMaps: [
    { value: 'null', op: '=', text: 'N/A' }
  ],
  mappingTypes: [
    {name: 'value to text', value: 1},
    {name: 'range to text', value: 2},
  ],
  rangeMaps: [
    { from: 'null', to: 'null', text: 'N/A' }
  ],
  mappingType: 1,
  thresholds: '',
  colors: ["rgba(245, 54, 54, 0.9)", "rgba(237, 129, 40, 0.89)", "rgba(50, 172, 45, 0.97)"],
  decimals: 2, // decimal precision
  format: 'none', // unit format
  operatorName: 'avg' // operator applied to time series
};

class D3ChordDiagramPanelCtrl extends MetricsPanelCtrl {

  constructor($scope, $injector, alertSrv) {
    super($scope, $injector);
    // merge existing settings with our defaults
    _.defaults(this.panel, panelDefaults);
    this.panel.chordDiagramDivId = '#d3_chord_diagram_svg_' + this.panel.id;
    this.scoperef = $scope;
    this.alertSrvRef = alertSrv;
    this.initialized = false;
    this.panelContainer = null;
    this.svg = null;
    this.panelWidth = null;
    this.panelHeight = null;
    this.chordDiagram = null;
    this.data = {
      value: 0,
      valueFormatted: 0,
      valueRounded: 0
    };
    this.series = [];
    //console.log("D3GaugePanelCtrl constructor!");
    this.events.on('init-edit-mode', this.onInitEditMode.bind(this));
    this.events.on('render', this.onRender.bind(this));
    //this.events.on('data-received', this.onDataReceived.bind(this));
    //this.events.on('data-error', this.onDataError.bind(this));
    //this.events.on('data-snapshot-load', this.onDataReceived.bind(this));
    //console.log("D3GaugePanelCtrl constructor done!");
  }

  onInitEditMode() {
    // determine the path to this plugin
    var panels = grafanaBootData.settings.panels;
    var thisPanel = panels[this.pluginId];
    var thisPanelPath = thisPanel.baseUrl + '/';
    // add the relative path to the partial
    var optionsPath = thisPanelPath + 'partials/editor.options.html';
    this.addEditorTab('Options', optionsPath, 2);
  }

  setContainer(container) {
    this.panelContainer = container;
  }

  getPanelWidth() {
    var width = this.panelContainer[0].clientWidth;
    if (width === 0) {
      width = this.getPanelHeight();
      width -= 24;
      if (width < 600) {
        width = 600;
      }
    }
    return width;
  }

  getPanelHeight() {
    // panel can have a fixed height via options
    var height = this.$scope.ctrl.panel.height;
    if (typeof height === 'undefined') {
      // if that is blank, try to get it from our row
      height = this.row.height;
      if (typeof height === 'undefined') {
        height = 600;
      } else {
        // convert to numeric value
        height = parseInt(height.replace("px",""));
      }
    }
    if (height < 600) {
      height = 600;
    }
    return height;
  }

  clearSVG() {
    if ($(this.panel.chordDiagramDivId).length) {
      //console.log("Clearing SVG");
      $(this.panel.chordDiagramDivId).remove();
    }
  }

  onRender() {
    // update the values to be sent to the gauge constructor
    this.setValues(this.data);
    //console.log("Render D3");
    this.clearSVG();

    this.panelWidth = this.getPanelWidth();
    this.panelHeight = this.getPanelHeight();

    this.svg = renderChordDiagram(this.panelContainer[0], this.panel.chordDiagramDivId, this.panelWidth, this.panelHeight);
    
  }

  removeValueMap(map) {
    console.log("removeValueMap: " + JSON.stringify(map));
    /*
    var index = _.indexOf(this.panel.valueMaps, map);
    this.panel.valueMaps.splice(index, 1);
    this.render();
    */
  }

  addValueMap() {
    console.log("addValueMap");
    /*
    this.panel.valueMaps.push({value: '', op: '=', text: '' });
    */
  }

  removeRangeMap(rangeMap) {
    console.log("removeRangeMap: " + JSON.stringify(rangeMap));
    /*
    var index = _.indexOf(this.panel.rangeMaps, rangeMap);
    this.panel.rangeMaps.splice(index, 1);
    this.render();
    */
  }

  addRangeMap() {
    console.log("addRangeMap");
    this.panel.rangeMaps.push({from: '', to: '', text: ''});
  }

  link(scope, elem, attrs, ctrl) {
    //console.log("d3gauge inside link");
    ctrl.setContainer(elem.find('.grafana-d3-chord-diagram'));
    // Check if there is a diagram rendered
    var renderedSVG = $(this.panel.chordDiagramDivId);
    // console.log("link: found svg length " + renderedSVG.length);
    if (renderedSVG.length === 0) {
      // no diagram found, force a render
      this.render();
    }
  }


  getDecimalsForValue(value) {
    console.log("getDecimalsForValue: " + value);

    /*
    if (_.isNumber(this.panel.decimals)) {
      return {decimals: this.panel.decimals, scaledDecimals: null};
    }

    var delta = value / 2;
    var dec = -Math.floor(Math.log(delta) / Math.LN10);

    var magn = Math.pow(10, -dec),
        norm = delta / magn, // norm is between 1.0 and 10.0
        size;

    if (norm < 1.5) {
      size = 1;
    } else if (norm < 3) {
      size = 2;
      // special case for 2.5, requires an extra decimal
      if (norm > 2.25) {
        size = 2.5;
        ++dec;
      }
    } else if (norm < 7.5) {
      size = 5;
    } else {
      size = 10;
    }

    size *= magn;

    // reduce starting decimals if not needed
    if (Math.floor(value) === value) { dec = 0; }

    var result = {};
    result.decimals = Math.max(0, dec);
    result.scaledDecimals = result.decimals - Math.floor(Math.log(size) / Math.LN10) + 2;
    return result;
    */

    return {};
  }

  setValues(data) {
    data.flotpairs = [];
    if (this.series.length > 1) {
      var error = new Error();
      error.message = 'Multiple Series Error';
      error.data = 'Metric query returns ' + this.series.length +
        ' series. Single Stat Panel expects a single series.\n\nResponse:\n'+JSON.stringify(this.series);
      throw error;
    }

    if (this.series && this.series.length > 0) {
      var lastPoint = _.last(this.series[0].datapoints);
      var lastValue = _.isArray(lastPoint) ? lastPoint[0] : null;

      if (this.panel.operatorName === 'name') {
        data.value = 0;
        data.valueRounded = 0;
        data.valueFormatted = this.series[0].alias;
      } else if (_.isString(lastValue)) {
        data.value = 0;
        data.valueFormatted = _.escape(lastValue);
        data.valueRounded = 0;
      } else {
        data.value = this.series[0].stats[this.panel.operatorName];
        data.flotpairs = this.series[0].flotpairs;
        var decimalInfo = this.getDecimalsForValue(data.value);
        var formatFunc = kbn.valueFormats[this.panel.format];
        data.valueFormatted = formatFunc(data.value, decimalInfo.decimals, decimalInfo.scaledDecimals);
        data.valueRounded = kbn.roundValue(data.value, decimalInfo.decimals);
      }

      // Add $__name variable for using in prefix or postfix
      data.scopedVars = {
        __name: {
          value: this.series[0].label
        }
      };
    }

    // check value to text mappings if its enabled
    if (this.panel.mappingType === 1) {
      for (var i = 0; i < this.panel.valueMaps.length; i++) {
        var map = this.panel.valueMaps[i];
        // special null case
        if (map.value === 'null') {
          if (data.value === null || data.value === void 0) {
            data.valueFormatted = map.text;
            return;
          }
          continue;
        }

        // value/number to text mapping
        var value = parseFloat(map.value);
        if (value === data.valueRounded) {
          data.valueFormatted = map.text;
          return;
        }
      }
    } else if (this.panel.mappingType === 2) {
      for (var j = 0; j < this.panel.rangeMaps.length; j++) {
        var rangeMap = this.panel.rangeMaps[j];
        // special null case
        if (rangeMap.from === 'null' && rangeMap.to === 'null') {
          if (data.value === null || data.value === void 0) {
            data.valueFormatted = rangeMap.text;
            return;
          }
          continue;
        }

        // value/number to range mapping
        var from = parseFloat(rangeMap.from);
        var to = parseFloat(rangeMap.to);
        if (to >= data.valueRounded && from <= data.valueRounded) {
          data.valueFormatted = rangeMap.text;
          return;
        }
      }
    }

    if (data.value === null || data.value === void 0) {
      data.valueFormatted = "no value";
    }
  }
  

  setUnitFormat(subItem) {
    console.log('setUnitFormat: ' + JSON.stringify(subItem));
    /*
    this.panel.format = subItem.value;
    this.render();
    */
  }

  onDataError(err) {
    this.onDataReceived([]);
  }

  onDataReceived(dataList) {
    this.series = dataList.map(this.seriesHandler.bind(this));
    var data = {};
    this.setValues(data);
    this.data = data;
    //should update Chord Diagram
  }

  seriesHandler(seriesData) {
    var series = new TimeSeries({
      datapoints: seriesData.datapoints,
      alias: seriesData.target,
    });
    series.flotpairs = series.getFlotPairs(this.panel.nullPointMode);
    return series;
  }
}

D3ChordDiagramPanelCtrl.templateUrl = 'partials/template.html';
export {
	D3ChordDiagramPanelCtrl,
	D3ChordDiagramPanelCtrl as MetricsPanelCtrl
};
