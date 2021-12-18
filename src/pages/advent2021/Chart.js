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
        categories: xPoints,
      },
      series: seriesData,
      yAxis: {
        type: useLog ? 'logarithmic' : 'linear'
      }
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
