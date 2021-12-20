import React, { Component } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

class Chart extends Component {

  render() {
    const { dataPoints, xPoints, title, useLog = false } = this.props;
    const seriesData = [];

    dataPoints.forEach((set, index) => {
        Object.keys(set).forEach((key, kIndex) => {
            if (!seriesData[kIndex]) {
                seriesData.push({
                    name: key,
                    data: [set[key]]
                })
            } else {
                seriesData[kIndex].data.push(set[key]);
            }
        });
    });

    const chartOptions = {
      title: { text: title },
      xAxis: {
        categories: xPoints
      },
      series: seriesData,
      yAxis: {
        type: useLog ? 'logarithmic' : 'linear'
      },
      plotOptions: {
        area: {
            pointStart: 0,
            marker: {
                enabled: false,
                symbol: 'circle',
                radius: 2,
                states: {
                    hover: {
                        enabled: true
                    }
                }
            }
        }
    },
    };
    return (
      <div>
        <HighchartsReact
          highcharts={Highcharts}
          options={chartOptions}
        />
      </div>
    )
  }
}

export default Chart;
