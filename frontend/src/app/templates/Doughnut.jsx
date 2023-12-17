import React from 'react';
import { useTheme } from '@mui/material';
import ReactEcharts from 'echarts-for-react';


const getTop2 = (rideHist) => {
  let a = {};
  rideHist.forEach(item => {
    a[item.drv_name] = (a[item.drv_name] || 0) + 1;
  });
  const nameArray = Object.entries(a);
  nameArray.sort((a, b) => b[1] - a[1]);
  const topN = 2;
  let res = nameArray.slice(0, topN);
  let cnt = 0;
  for(let i = 0; i < res.length; i++){
    cnt += res[i][1];
  }
  if(res.length == 2 && rideHist.length - cnt > 0)
    res.push(["others", rideHist.length - cnt])
  console.log(res);
  return res.map(item => {return {name: item[0], value: item[1]}});
}
const DoughnutChart = ({ data, height}) => {
  const theme = useTheme();
  let color = ['#84cc62', '#5793d9', '#e63a20'];
  data = getTop2(data);
  color = color.slice(0, data.length);

  const option = {
    legend: {
      show: true,
      itemGap: 10,
      icon: 'circle',
      bottom: -4,
      textStyle: {
        color: theme.palette.text.secondary,
        fontSize: 13,
        fontFamily: 'roboto'
      }
    },
    tooltip: {
      show: false,
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    xAxis: [
      {
        axisLine: {
          show: false
        },
        splitLine: {
          show: false
        }
      }
    ],
    yAxis: [
      {
        axisLine: {
          show: false
        },
        splitLine: {
          show: false
        }
      }
    ],

    series: [
      {
        name: 'Traffic Rate',
        type: 'pie',
        radius: ['45%', '72.55%'],
        center: ['50%', '50%'],
        avoidLabelOverlap: false,
        hoverOffset: 5,
        stillShowZeroSum: false,
        label: {
          normal: {
            show: false,
            position: 'center', // shows the description data to center, turn off to show in right side
            textStyle: {
              color: theme.palette.text.secondary,
              fontSize: 13,
              fontFamily: 'roboto'
            },
            formatter: '{a}'
          },
          emphasis: {
            show: true,
            textStyle: {
              fontSize: '14',
              fontWeight: 'normal'
              // color: "rgba(15, 21, 77, 1)"
            },
            formatter: '{b} \n{c} ({d}%)'
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: data,
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  return (
    <ReactEcharts
      style={{ height: height }}
      option={{
        ...option,
        color: [...color]
      }}
    />
  );
};

export default DoughnutChart;
