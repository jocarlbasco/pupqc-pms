import React from 'react';
import {
  AccumulationChartComponent,
  AccumulationSeriesCollectionDirective,
  AccumulationSeriesDirective,
  Inject,
  AccumulationDataLabel,
  AccumulationLegend,
  AccumulationTooltip,
  PieSeries,
} from '@syncfusion/ej2-react-charts';

function StudentCourseCount({ courseStudentCount }) {
  const legendSettings = { visible: true };
  const palettes = [
    '#E94649',
    '#F6B53F',
    '#6FAAB0',
    '#FF33F3',
    '#228B22',
    '#3399FF',
  ];

  // Sample data for the data labels
  const datalabel = { visible: true, name: 'y', position: 'Outside' };
  const tooltip = { enable: true };
  const tooltipRender = (args) => {
    let value = (args.point.y / args.series.sumOfPoints) * 100;
    args.text =
      args.point.x +
      ' - ' +
      args.point.y +
      ' Students - ' +
      Math.round(value) +
      '' +
      '%';
  };
  return (
    <AccumulationChartComponent
      id="charts-accumulation"
      tooltip={tooltip}
      legendSettings={legendSettings}
      tooltipRender={tooltipRender}
    >
      <Inject
        services={[
          AccumulationDataLabel,
          AccumulationLegend,
          PieSeries,
          AccumulationTooltip,
        ]}
      />
      <AccumulationSeriesCollectionDirective>
        <AccumulationSeriesDirective
          dataSource={courseStudentCount}
          xName="x"
          yName="y"
          pointColorMapping="fill"
          dataLabel={datalabel}
          palettes={palettes}
        ></AccumulationSeriesDirective>
      </AccumulationSeriesCollectionDirective>
    </AccumulationChartComponent>
  );
}

export default StudentCourseCount;
