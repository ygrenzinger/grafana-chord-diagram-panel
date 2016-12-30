'use strict';

System.register(['app/plugins/sdk', 'lodash', 'jquery', 'app/core/utils/kbn', 'app/core/config', 'app/core/time_series2', './external/d3.v3.min', './css/panel.css!', './external/d3gauge', './external/d3-queue.min', './d3_chorddiagram'], function (_export, _context) {
  "use strict";

  var MetricsPanelCtrl, _, $, kbn, config, TimeSeries, d3, renderChordDiagram, _createClass, panelDefaults, D3ChordDiagramPanelCtrl;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  function getColorForValue(data, value) {
    for (var i = data.thresholds.length; i > 0; i--) {
      if (value >= data.thresholds[i - 1]) {
        return data.colorMap[i];
      }
    }
    return _.first(data.colorMap);
  }

  return {
    setters: [function (_appPluginsSdk) {
      MetricsPanelCtrl = _appPluginsSdk.MetricsPanelCtrl;
    }, function (_lodash) {
      _ = _lodash.default;
    }, function (_jquery) {
      $ = _jquery.default;
    }, function (_appCoreUtilsKbn) {
      kbn = _appCoreUtilsKbn.default;
    }, function (_appCoreConfig) {
      config = _appCoreConfig.default;
    }, function (_appCoreTime_series) {
      TimeSeries = _appCoreTime_series.default;
    }, function (_externalD3V3Min) {
      d3 = _externalD3V3Min;
    }, function (_cssPanelCss) {}, function (_externalD3gauge) {}, function (_externalD3QueueMin) {}, function (_d3_chorddiagram) {
      renderChordDiagram = _d3_chorddiagram.default;
    }],
    execute: function () {
      _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      panelDefaults = {
        fontSizes: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 64, 66, 68, 70],
        fontTypes: ['Arial', 'Avant Garde', 'Bookman', 'Consolas', 'Courier', 'Courier New', 'Garamond', 'Helvetica', 'Open Sans', 'Palatino', 'Times', 'Times New Roman', 'Verdana'],
        unitFormats: kbn.getUnitFormats(),
        operatorNameOptions: ['min', 'max', 'avg', 'current', 'total', 'name'],
        valueMaps: [{ value: 'null', op: '=', text: 'N/A' }],
        mappingTypes: [{ name: 'value to text', value: 1 }, { name: 'range to text', value: 2 }],
        rangeMaps: [{ from: 'null', to: 'null', text: 'N/A' }],
        mappingType: 1,
        thresholds: '',
        colors: ["rgba(245, 54, 54, 0.9)", "rgba(237, 129, 40, 0.89)", "rgba(50, 172, 45, 0.97)"],
        decimals: 2, // decimal precision
        format: 'none', // unit format
        operatorName: 'avg', // operator applied to time series
        gauge: {
          minValue: 0,
          maxValue: 100,
          tickSpaceMinVal: 1,
          tickSpaceMajVal: 10,
          gaugeUnits: '', // no units by default, this will be selected by user
          gaugeRadius: 0, // 0 for auto-scale
          pivotRadius: 0.1,
          padding: 0.05,
          edgeWidth: 0.05,
          tickEdgeGap: 0.05,
          tickLengthMaj: 0.15,
          tickLengthMin: 0.05,
          needleTickGap: 0.05,
          needleLengthNeg: 0.2,
          ticknessGaugeBasis: 200,
          needleWidth: 5,
          tickWidthMaj: 5,
          tickWidthMin: 1,
          unitsLabelFontSize: 22,
          labelFontSize: 18,
          zeroTickAngle: 60,
          maxTickAngle: 300,
          zeroNeedleAngle: 40,
          maxNeedleAngle: 320,
          outerEdgeCol: '#0099CC',
          innerCol: '#fff',
          pivotCol: '#999',
          needleCol: '#0099CC',
          unitsLabelCol: '#000',
          tickLabelCol: '#000',
          tickColMaj: '#0099CC',
          tickColMin: '#000',
          tickFont: 'Open Sans',
          unitsFont: 'Open Sans',
          showThresholdOnGauge: false,
          showThresholdColorOnValue: false,
          showLowerThresholdRange: false,
          showMiddleThresholdRange: true,
          showUpperThresholdRange: true,
          animateNeedleValueTransition: true
        }
      };

      _export('MetricsPanelCtrl', _export('D3ChordDiagramPanelCtrl', D3ChordDiagramPanelCtrl = function (_MetricsPanelCtrl) {
        _inherits(D3ChordDiagramPanelCtrl, _MetricsPanelCtrl);

        function D3ChordDiagramPanelCtrl($scope, $injector, alertSrv) {
          _classCallCheck(this, D3ChordDiagramPanelCtrl);

          var _this = _possibleConstructorReturn(this, (D3ChordDiagramPanelCtrl.__proto__ || Object.getPrototypeOf(D3ChordDiagramPanelCtrl)).call(this, $scope, $injector));

          // merge existing settings with our defaults
          _.defaults(_this.panel, panelDefaults);
          _this.panel.gaugeDivId = 'd3_chord_diagram_svg_' + _this.panel.id;
          _this.scoperef = $scope;
          _this.alertSrvRef = alertSrv;
          _this.initialized = false;
          _this.panelContainer = null;
          _this.svg = null;
          _this.panelWidth = null;
          _this.panelHeight = null;
          _this.gaugeObject = null;
          _this.data = {
            value: 0,
            valueFormatted: 0,
            valueRounded: 0
          };
          _this.series = [];
          //console.log("D3GaugePanelCtrl constructor!");
          _this.events.on('init-edit-mode', _this.onInitEditMode.bind(_this));
          _this.events.on('render', _this.onRender.bind(_this));
          _this.events.on('data-received', _this.onDataReceived.bind(_this));
          _this.events.on('data-error', _this.onDataError.bind(_this));
          _this.events.on('data-snapshot-load', _this.onDataReceived.bind(_this));
          //console.log("D3GaugePanelCtrl constructor done!");
          return _this;
        }

        _createClass(D3ChordDiagramPanelCtrl, [{
          key: 'onInitEditMode',
          value: function onInitEditMode() {
            // determine the path to this plugin
            var panels = grafanaBootData.settings.panels;
            var thisPanel = panels[this.pluginId];
            var thisPanelPath = thisPanel.baseUrl + '/';
            // add the relative path to the partial
            var optionsPath = thisPanelPath + 'partials/editor.options.html';
            this.addEditorTab('Options', optionsPath, 2);
          }
        }, {
          key: 'setContainer',
          value: function setContainer(container) {
            this.panelContainer = container;
          }
        }, {
          key: 'getPanelWidth',
          value: function getPanelWidth() {
            // with a full sized panel, this comes back as zero, so calculate from the div panel instead
            //debugger;
            var tmpPanelWidth = this.panelContainer[0].clientWidth;
            if (tmpPanelWidth === 0) {
              // just use the height...
              tmpPanelWidth = this.getPanelHeight();
              tmpPanelWidth -= 24;
              if (tmpPanelWidth < 250) {
                tmpPanelWidth = 250;
              }
              return tmpPanelWidth;
              //var tmpPanelWidthCSS = $("div.panel").css("width");
              //var tmpPanelWidthPx = tmpPanelWidthCSS.replace("px","");
              //tmpPanelWidth = parseInt(tmpPanelWidthPx);
            }
            var actualWidth = tmpPanelWidth;
            return actualWidth;
          }
        }, {
          key: 'getPanelHeight',
          value: function getPanelHeight() {
            // panel can have a fixed height via options
            var tmpPanelHeight = this.$scope.ctrl.panel.height;
            // if that is blank, try to get it from our row
            if (typeof tmpPanelHeight === 'undefined') {
              // get from the row instead
              tmpPanelHeight = this.row.height;
              // default to 250px if that was undefined also
              if (typeof tmpPanelHeight === 'undefined') {
                tmpPanelHeight = 250;
              }
            } else {
              // convert to numeric value
              tmpPanelHeight = tmpPanelHeight.replace("px", "");
            }
            var actualHeight = parseInt(tmpPanelHeight);
            // grafana minimum height for a panel is 250px
            if (actualHeight < 250) {
              actualHeight = 250;
            }
            return actualHeight;
          }
        }, {
          key: 'clearSVG',
          value: function clearSVG() {
            if ($('#' + this.panel.gaugeDivId).length) {
              //console.log("Clearing SVG");
              $('#' + this.panel.gaugeDivId).remove();
            }
          }
        }, {
          key: 'onRender',
          value: function onRender() {
            // update the values to be sent to the gauge constructor
            this.setValues(this.data);
            //console.log("Render D3");
            this.clearSVG();
            // use jQuery to get the height on our container
            this.panelWidth = this.getPanelWidth();
            this.panelHeight = this.getPanelHeight();

            var margin = { top: 10, right: 0, bottom: 30, left: 0 };
            var width = this.panelWidth;
            var height = this.panelHeight;
            //console.log("width: " + width + " height: " + height);
            var svg = d3.select(this.panelContainer[0]).append("svg").attr("width", width + "px").attr("height", height + 24 + "px").attr("id", this.panel.gaugeDivId).classed("svg-content-responsive", true).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            // check which is smaller, the height or the width and set the radius to be half of the lesser
            var tmpGaugeRadius = parseFloat(this.panel.gauge.gaugeRadius);
            // autosize if radius is set to zero
            if (this.panel.gauge.gaugeRadius === 0) {
              tmpGaugeRadius = this.panelHeight / 2;
              if (this.panelWidth < this.panelHeight) {
                tmpGaugeRadius = this.panelWidth / 2;
              }
              tmpGaugeRadius -= 10;
            }
            var opt = {
              minVal: this.panel.gauge.minValue,
              maxVal: this.panel.gauge.maxValue,
              tickSpaceMinVal: this.panel.gauge.tickSpaceMinVal,
              tickSpaceMajVal: this.panel.gauge.tickSpaceMajVal,
              gaugeUnits: this.panel.format,
              gaugeRadius: tmpGaugeRadius,
              pivotRadius: this.panel.gauge.pivotRadius,
              padding: this.panel.gauge.padding,
              edgeWidth: this.panel.gauge.edgeWidth,
              tickEdgeGap: this.panel.gauge.tickEdgeGap,
              tickLengthMaj: this.panel.gauge.tickLengthMaj,
              tickLengthMin: this.panel.gauge.tickLengthMin,
              needleTickGap: this.panel.gauge.needleTickGap,
              needleLengthNeg: this.panel.gauge.needleLengthNeg,
              ticknessGaugeBasis: this.panel.gauge.ticknessGaugeBasis,
              needleWidth: this.panel.gauge.needleWidth,
              tickWidthMaj: this.panel.gauge.tickWidthMaj,
              tickWidthMin: this.panel.gauge.tickWidthMin,
              unitsLabelFontSize: this.panel.gauge.unitsLabelFontSize,
              labelFontSize: this.panel.gauge.labelFontSize,
              zeroTickAngle: this.panel.gauge.zeroTickAngle,
              maxTickAngle: this.panel.gauge.maxTickAngle,
              zeroNeedleAngle: this.panel.gauge.zeroNeedleAngle,
              maxNeedleAngle: this.panel.gauge.maxNeedleAngle,
              outerEdgeCol: this.panel.gauge.outerEdgeCol,
              innerCol: this.panel.gauge.innerCol,
              pivotCol: this.panel.gauge.pivotCol,
              needleCol: this.panel.gauge.needleCol,
              unitsLabelCol: this.panel.gauge.unitsLabelCol,
              tickLabelCol: this.panel.gauge.tickLabelCol,
              tickColMaj: this.panel.gauge.tickColMaj,
              tickColMin: this.panel.gauge.tickColMin,
              thresholds: this.panel.thresholds,
              showThresholdColorOnValue: this.panel.gauge.showThresholdColorOnValue,
              showThresholdOnGauge: this.panel.gauge.showThresholdOnGauge,
              showLowerThresholdRange: this.panel.gauge.showLowerThresholdRange,
              showMiddleThresholdRange: this.panel.gauge.showMiddleThresholdRange,
              showUpperThresholdRange: this.panel.gauge.showUpperThresholdRange,
              thresholdColors: this.panel.colors,
              needleValText: this.getValueText(),
              needleVal: this.getValueRounded(),
              tickFont: this.panel.gauge.tickFont,
              unitsFont: this.panel.gauge.unitsFont,
              animateNeedleValueTransition: this.panel.gauge.animateNeedleValueTransition
            };
            this.gaugeObject = new drawGauge(svg, opt);
            this.svg = svg;
            renderChordDiagram(this.panelContainer[0]);
          }
        }, {
          key: 'removeValueMap',
          value: function removeValueMap(map) {
            console.log("removeValueMap: " + JSON.stringify(map));
            /*
            var index = _.indexOf(this.panel.valueMaps, map);
            this.panel.valueMaps.splice(index, 1);
            this.render();
            */
          }
        }, {
          key: 'addValueMap',
          value: function addValueMap() {
            console.log("addValueMap");
            /*
            this.panel.valueMaps.push({value: '', op: '=', text: '' });
            */
          }
        }, {
          key: 'removeRangeMap',
          value: function removeRangeMap(rangeMap) {
            console.log("removeRangeMap: " + JSON.stringify(rangeMap));
            /*
            var index = _.indexOf(this.panel.rangeMaps, rangeMap);
            this.panel.rangeMaps.splice(index, 1);
            this.render();
            */
          }
        }, {
          key: 'addRangeMap',
          value: function addRangeMap() {
            this.panel.rangeMaps.push({ from: '', to: '', text: '' });
          }
        }, {
          key: 'validateRadialMetricValues',
          value: function validateRadialMetricValues() {
            // make sure the spacing values are valid
            if (this.panel.gauge.tickSpaceMinVal === null || this.panel.gauge.tickSpaceMinVal === "" || isNaN(this.panel.gauge.tickSpaceMinVal)) {
              // alert about the error, and set it to 1
              this.panel.gauge.tickSpaceMinVal = 1;
              this.alertSrvRef.set("Problem!", "Invalid Value for Tick Spacing Minor, auto-setting back to default of 1", 'error', 10000);
            }
            if (this.panel.gauge.tickSpaceMajVal === null || this.panel.gauge.tickSpaceMajVal === "" || isNaN(this.panel.gauge.tickSpaceMajVal)) {
              // alert about the error, and set it to 10
              this.panel.gauge.tickSpaceMajVal = 10;
              this.alertSrvRef.set("Problem!", "Invalid Value for Tick Spacing Major, auto-setting back to default of 10", 'error', 10000);
            }
            if (this.panel.gauge.gaugeRadius === null || this.panel.gauge.gaugeRadius === "" || isNaN(this.panel.gauge.gaugeRadius) || this.panel.gauge.gaugeRadius < 0) {
              // alert about the error, and set it to 0
              this.panel.gauge.gaugeRadius = 0;
              this.alertSrvRef.set("Problem!", "Invalid Value for Gauge Radius, auto-setting back to default of 0", 'error', 10000);
            }
            this.render();
          }
        }, {
          key: 'link',
          value: function link(scope, elem, attrs, ctrl) {
            //console.log("d3gauge inside link");
            ctrl.setContainer(elem.find('.grafana-d3-chord-diagram'));
            // Check if there is a gauge rendered
            var renderedSVG = $('#' + this.panel.gaugeDivId);
            // console.log("link: found svg length " + renderedSVG.length);
            if (renderedSVG.length === 0) {
              // no gauge found, force a render
              this.render();
            }
          }
        }, {
          key: 'getDecimalsForValue',
          value: function getDecimalsForValue(value) {
            if (_.isNumber(this.panel.decimals)) {
              return { decimals: this.panel.decimals, scaledDecimals: null };
            }

            var delta = value / 2;
            var dec = -Math.floor(Math.log(delta) / Math.LN10);

            var magn = Math.pow(10, -dec),
                norm = delta / magn,
                // norm is between 1.0 and 10.0
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
            if (Math.floor(value) === value) {
              dec = 0;
            }

            var result = {};
            result.decimals = Math.max(0, dec);
            result.scaledDecimals = result.decimals - Math.floor(Math.log(size) / Math.LN10) + 2;
            return result;
          }
        }, {
          key: 'setValues',
          value: function setValues(data) {
            data.flotpairs = [];
            if (this.series.length > 1) {
              var error = new Error();
              error.message = 'Multiple Series Error';
              error.data = 'Metric query returns ' + this.series.length + ' series. Single Stat Panel expects a single series.\n\nResponse:\n' + JSON.stringify(this.series);
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
        }, {
          key: 'getValueText',
          value: function getValueText() {
            return this.data.valueFormatted;
          }
        }, {
          key: 'getValueRounded',
          value: function getValueRounded() {
            return this.data.valueRounded;
          }
        }, {
          key: 'setUnitFormat',
          value: function setUnitFormat(subItem) {
            this.panel.format = subItem.value;
            this.render();
          }
        }, {
          key: 'onDataError',
          value: function onDataError(err) {
            this.onDataReceived([]);
          }
        }, {
          key: 'onDataReceived',
          value: function onDataReceived(dataList) {
            this.series = dataList.map(this.seriesHandler.bind(this));
            var data = {};
            this.setValues(data);
            this.data = data;
            //console.log("Data value: " + data.value + " formatted: " + data.valueFormatted + " rounded: " + data.valueRounded );
            //var fmtTxt = kbn.valueFormats[this.panel.format];
            //console.log("Format: " + fmtTxt);
            this.gaugeObject.updateGauge(data.value, data.valueFormatted, data.valueRounded);
          }
        }, {
          key: 'seriesHandler',
          value: function seriesHandler(seriesData) {
            var series = new TimeSeries({
              datapoints: seriesData.datapoints,
              alias: seriesData.target
            });
            series.flotpairs = series.getFlotPairs(this.panel.nullPointMode);
            return series;
          }
        }, {
          key: 'invertColorOrder',
          value: function invertColorOrder() {
            var tmp = this.panel.colors[0];
            this.panel.colors[0] = this.panel.colors[2];
            this.panel.colors[2] = tmp;
            this.render();
          }
        }]);

        return D3ChordDiagramPanelCtrl;
      }(MetricsPanelCtrl)));

      D3ChordDiagramPanelCtrl.templateUrl = 'partials/template.html';

      _export('D3ChordDiagramPanelCtrl', D3ChordDiagramPanelCtrl);

      _export('MetricsPanelCtrl', D3ChordDiagramPanelCtrl);
    }
  };
});
//# sourceMappingURL=ctrl.js.map
