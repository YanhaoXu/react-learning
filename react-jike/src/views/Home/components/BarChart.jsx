// 柱状图组建
import { useEffect } from "react";
import { useRef } from "react";
import * as echarts from "echarts";

export default function BarChart({
  title,
  xData,
  sData,
  style = { width: "400px", height: "300px" },
}) {
  const chartRef = useRef(null);

  useEffect(() => {
    // 保证dom可用 才进行图表渲染
    // 1. 获取渲染图表的dom节点
    const chartDom = chartRef.current;

    // 2. 图表初始化生成实例
    const myChart = echarts.init(chartDom);

    // 3. 准备图表参数
    const option = {
      title: {
        text: title,
      },
      xAxis: {
        type: "category",
        data: xData,
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: sData,
          type: "bar",
        },
      ],
    };

    // 3. 渲染参数
    myChart.setOption(option);
  }, [title, sData, xData]);

  return <div ref={chartRef} style={style}></div>;
}
