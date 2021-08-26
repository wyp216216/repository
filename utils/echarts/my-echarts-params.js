export function echartGrid(params) {
  return {
    show: false,
    left: 30,
    right: 0,
    top: 30,
    bottom: 0,
    containLabel: true,
    ...params
  };
}

// 图表y轴
export function echartYAxis(params) {
  const dataFn = (obj) => ({
    name: "降雨量/mm",
    nameRotate: 90,
    nameLocation: "middle",
    nameTextStyle: {
      verticalAlign: "middle",
      align: "left"
    },
    nameGap: 35,
    axisLine: {
      show: false,
      lineStyle: {
        color: "#595959"
      }
    },
    ...obj
  });
  if (Array.isArray(params)) {
    return params.map(x => dataFn(x));
  }
  if (typeof params === "object" && params !== null) {
    return dataFn(params);
  }
  return {};
}

// 图表x轴
export function echartXAxis(params) {
  const dataFn = (obj) => ({
    type: "time",
    ...obj
  });
  if (typeof params === "object" && params !== null) {
    if (Array.isArray(params)) {
      return params.map(x => dataFn(x));
    }
    return dataFn(params);
  }
  return {};
}

// 图表移入展示
export function echartTooltip(params) {
  return {
    trigger: "axis",
    axisPointer: {
      type: "cross",
      label: {
        backgroundColor: "#283b56"
      }
    },
    // formatter: function(params) {
    //   console.log(params);
    //   return "1311555600000";
    // },
    ...params };
}

// 图表标题
export function echartTitle(params) {
  return {
    text: "",
    subtext: "",
    subRotate: 80,
    subPosition: [10, 10],
    ...params
  };
}
export function echartLegend(params) {
  return {
    data: ["降雨量", "径流量"],
    ...params
  };
}
export function echartToolbox(params) {
  return {
    show: true,
    feature: {
      dataView: {
        readOnly: false,
        icon: "image://data:image/png;base64,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"
      }
    },
    ...params
  };
}
export function echartDataZoom(params) {
  return [
    { // 这个地方是控制下面的滑动条。
      show: false,
      realtime: true,
      start: 0,
      end: 100,
      xAxisIndex: [0, 1]
    },
    {
      show: false,
      type: "inside",
      realtime: true,
      start: 0,
      end: 100,
      xAxisIndex: [0, 1]
    }
  ];
}

export function echartSeriesCommon(key) {
  return {
    bar: {
      name: "降雨量",
      type: "bar",
      barWidth: 2,
      xAxisIndex: 0,
      yAxisIndex: 0,
      barGap: "200%",
      animationDelay: x => x * 10
    },
    line: {
      name: "径流量",
      type: "line",
      connectNulls: true,
      itemStyle: {
        normal: {
          color: "#5A87E5"
        }
      },
      lineStyle: {
        normal: {
          color: "#5A87E5"
        }
      }
    }
  }[key];
}
export function echartCustom(params) {
  if (!Array.isArray(params)) return [];
  let color = () => {
    return "#" + Math.random().toString(16).substr(2, 6).toUpperCase();
  };
  return params.map(x => {
    let selfColor = color();
    return {
      name: x.name,
      barWidth: 2,
      itemStyle: {
        barBorderColor: selfColor,
        color: selfColor
      },
      xAxisIndex: 0,
      yAxisIndex: 0
    };
  });
}
export function echartSeries(arr) {
  return {
    bar: {
      ...arr,
      one: {
        name: "降雨量",
        type: "bar",
        xAxisIndex: 1,
        yAxisIndex: 1,
        itemStyle: {
          barBorderColor: "#5A87E5",
          color: "#5A87E5"
        }
      },
      two: {
        stack: "比对",
        itemStyle: {
          barBorderColor: "#FD7844",
          color: "#FD7844"
        },
        xAxisIndex: 1,
        yAxisIndex: 1
      },
      three: {
        name: "sum",
        xAxisIndex: 0,
        yAxisIndex: 0,
        itemStyle: {
          barBorderColor: "#5A87E5",
          color: "#5A87E5"
        }
      },
      fone: {
        stack: "比对",
        barWidth: 3,
        xAxisIndex: 0,
        yAxisIndex: 0
      },
      five: {
        itemStyle: {
          barBorderColor: "#FD7844",
          color: "#FD7844"
        },
        xAxisIndex: 0,
        yAxisIndex: 0
      }
    },
    line: {
      one: {
        name: "径流量",
        type: "line",
        connectNulls: true,
        showSymbol: false,
        smooth: true
      },
      two: {
        name: "径流量",
        type: "line",
        connectNulls: true,
        showSymbol: false,
        smooth: true,
        lineStyle: {
          barBorderColor: "#FD7844",
          color: "#FD7844"
        }
      }
    }
  };
}
