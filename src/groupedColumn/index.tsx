import React, { useEffect, useImperativeHandle, forwardRef } from 'react';
import {
  GroupedColumn as G2plotGroupedColumn,
  GroupedColumnConfig as G2plotProps,
} from '@antv/g2plot';
import useChart from '../hooks/useChart';
import { ErrorBoundary } from '../base';

export interface GroupedColumnConfig extends Omit<G2plotProps, 'tooltip'> {
  chartRef?: React.MutableRefObject<G2plotGroupedColumn | undefined>;
  style?: React.CSSProperties;
  className?: string;
}

const GroupedColumnChart = forwardRef((props: GroupedColumnConfig, ref) => {
  const { chartRef, style = {}, className, ...rest } = props;

  const { chart, container } = useChart<G2plotGroupedColumn, GroupedColumnConfig>(
    G2plotGroupedColumn,
    rest,
  );

  useEffect(() => {
    if (chartRef) {
      chartRef.current = chart.current;
    }
  }, [chart.current]);
  useImperativeHandle(ref, () => ({
    getChart: () => chart.current,
  }));
  return (
    <ErrorBoundary>
      <div className={className} style={style} ref={container} />
    </ErrorBoundary>
  );
});

GroupedColumnChart.defaultProps = G2plotGroupedColumn.getDefaultOptions();

export default GroupedColumnChart;
