/**
 * echarts模板引入
 */
import * as echarts from "echarts";
import {
  echartGrid,
  echartYAxis,
  echartXAxis,
  echartTooltip,
  echartTitle,
  echartSeriesCommon,
  echartSeries,
  echartLegend,
  echartToolbox,
  echartDataZoom,
  echartCustom
} from "./my-echarts-params";
class EchartBuild {
  constructor(params) {
    this.myEchart = null;
    this.title = params.title;
    this.xAxis = params.xAxis;
    this.yAxis = params.yAxis;
    this.grid = params.grid;
    this.tooltip = params.tooltip;
  }
  init() {
    this.data = {
      grid: echartGrid(this.grid),
      yAxis: echartYAxis(this.yAxis),
      xAxis: echartXAxis(this.xAxis),
      title: echartTitle(this.title),
      tooltip: echartTooltip(this.tooltip),
      legend: echartLegend(this.legend),
      toolbox: echartToolbox(this.toolbox),
      dataZoom: echartDataZoom(this.dataZoom)
    };
    return this;
  }

  echartTemplate(data) {
    let obj = echartSeries(echartCustom(data));
    let params = {};
    for (let i in obj) {
      for (let j in obj[i]) {
        params[`${i}-${j}`] = { ...echartSeriesCommon(i), ...obj[i][j] };
      }
    }
    return data.map(x => ({ ...params[x.id], ...x.params }));
  }
  setOptions(params, data) {
    let series = [...params, ...this.init().echartTemplate(data)];
    this.myEchart.setOption({
      series
    });
  }
  build(dom, data) {
    let series = this.init().echartTemplate(data);
    this.myEchart = echarts.init(dom);
    this.myEchart.setOption({
      ...this.data, series
    });
    return this;
  }
}

export default EchartBuild;
