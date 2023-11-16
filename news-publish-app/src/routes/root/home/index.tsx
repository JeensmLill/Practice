import { Card, Col, Row } from "antd";
import { useEffect, useRef } from "react";
import { RouteObject, useLoaderData } from "react-router-dom";
import * as echarts from "echarts";
import { reqGetPublishedNews } from "~/api/news";
import lodash from "lodash";

const loader = async () => {
  const rsl = await reqGetPublishedNews();
  if (rsl.code !== 200) {
    console.log(rsl);
    throw new Response("Not Found", { status: 404 });
  }
  return rsl.data;
};
type Return_Loader = Awaited<ReturnType<typeof loader>>;
const Component = () => {
  // data
  const {news} = useLoaderData() as Return_Loader;
  const ref_bar = useRef(null);
  const ref_pie = useRef(null);
  const ref_line = useRef(null);

  useEffect(() => {
    const data = lodash.groupBy(news, (item) => item._newsCategory.name);
    const keys_data = Object.keys(data);
    const counts_keyData = keys_data.map((key_data) => data[key_data].length);
    
    const chart_bar = echarts.init(ref_bar.current);
    const option_bar = {
      title: {
        text: '已发布新闻'
      },
      tooltip: {},
      legend: {
        data: ['新闻数量']
      },
      xAxis: {
        data: keys_data,
        axisLabel: {
          rotate: "45"
        },
      },
      yAxis: {
        minInterval: 1,
      },
      series: [
        {
          name: '新闻数量',
          type: 'bar',
          data: counts_keyData
        }
      ]
    };
    chart_bar.setOption(option_bar);

    const chart_pie = echarts.init(ref_pie.current);
    const option_pie = {
      legend: {
        top: 'bottom'
      },
      toolbox: {
        show: true,
        feature: {
          mark: { show: true },
        }
      },
      series: [
        {
          name: 'Nightingale Chart',
          type: 'pie',
          radius: ["10%", "50%"],
          center: ['50%', '50%'],
          roseType: 'area',
          itemStyle: {
            borderRadius: 8
          },
          data: lodash.sortBy(keys_data.map((key_data) => ({
            name: key_data,
            value: data[key_data].length
          })), (item) => -item.value)
        }
      ]
    };
    chart_pie.setOption(option_pie);

    const chart_line = echarts.init(ref_line.current);
    const option_line = {
      xAxis: {
        type: 'category',
        data: keys_data,
      },
      yAxis: {
        type: 'value',
        minInterval: 1,
      },
      series: [
        {
          data: counts_keyData,
          type: 'line'
        }
      ]
    };
    chart_line.setOption(option_line);

    setTimeout(() => {
      chart_bar.resize();
      chart_pie.resize();
      chart_line.resize();
    }, 10);
    window.onresize = () => {
      chart_bar.resize();
      chart_pie.resize();
      chart_line.resize();
    };

    return () => {
      window.onresize = null;
    };
  }, []);
  return (
    <>
      <Row gutter={24}>
        <Col span={12}>
          <Card ref={ref_bar} style={{ height: "45vh" }} />
        </Col>
        <Col span={12}>
          <Card ref={ref_pie} style={{ height: "45vh" }} />
        </Col>
      </Row>
      <Row>
        <Card ref={ref_line} style={{ height: "45vh", width: "100%", marginTop: "24px" }} />
      </Row>
    </>
  )
};

const route: RouteObject = {
  path: "home",
  loader,
  Component,
};
export default route;