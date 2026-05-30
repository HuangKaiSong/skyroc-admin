import type { EChartsOption } from 'echarts';

export const pieOption: EChartsOption = {
  legend: {
    bottom: 0
  },
  tooltip: {
    trigger: 'item'
  },
  series: [
    {
      name: 'Nightingale',
      type: 'pie',
      radius: [36, 130],
      center: ['50%', '48%'],
      roseType: 'area',
      itemStyle: {
        borderRadius: 8
      },
      data: [
        { value: 40, name: 'rose 1' },
        { value: 38, name: 'rose 2' },
        { value: 32, name: 'rose 3' },
        { value: 30, name: 'rose 4' },
        { value: 28, name: 'rose 5' },
        { value: 26, name: 'rose 6' }
      ]
    }
  ]
};

export const lineOption: EChartsOption = {
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['Email', 'Ads', 'Video', 'Search']
  },
  grid: {
    bottom: 32,
    containLabel: true,
    left: 24,
    right: 24,
    top: 48
  },
  xAxis: {
    boundaryGap: false,
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    type: 'category'
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      areaStyle: {},
      data: [120, 132, 101, 134, 90, 230, 210],
      name: 'Email',
      smooth: true,
      stack: 'Total',
      type: 'line'
    },
    {
      areaStyle: {},
      data: [220, 182, 191, 234, 290, 330, 310],
      name: 'Ads',
      smooth: true,
      stack: 'Total',
      type: 'line'
    },
    {
      areaStyle: {},
      data: [150, 232, 201, 154, 190, 330, 410],
      name: 'Video',
      smooth: true,
      stack: 'Total',
      type: 'line'
    },
    {
      areaStyle: {},
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      name: 'Search',
      smooth: true,
      stack: 'Total',
      type: 'line'
    }
  ]
};

export const barOption: EChartsOption = {
  tooltip: {
    trigger: 'axis'
  },
  xAxis: {
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    type: 'category'
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      backgroundStyle: {
        color: 'rgba(148, 163, 184, 0.16)'
      },
      barWidth: 28,
      data: [120, 200, 150, 80, 70, 110, 130],
      itemStyle: {
        borderRadius: [16, 16, 0, 0],
        color: '#2563eb'
      },
      showBackground: true,
      type: 'bar'
    }
  ]
};

export const radarOption: EChartsOption = {
  legend: {
    bottom: 0,
    data: ['Allocated Budget', 'Actual Spending']
  },
  radar: {
    indicator: [
      { name: 'Sales', max: 6500 },
      { name: 'Administration', max: 16000 },
      { name: 'IT', max: 30000 },
      { name: 'Support', max: 38000 },
      { name: 'Development', max: 52000 },
      { name: 'Marketing', max: 25000 }
    ],
    radius: 120
  },
  series: [
    {
      data: [
        {
          name: 'Allocated Budget',
          value: [4200, 3000, 20000, 35000, 50000, 18000]
        },
        {
          name: 'Actual Spending',
          value: [5000, 14000, 28000, 26000, 42000, 21000]
        }
      ],
      type: 'radar'
    }
  ],
  tooltip: {}
};

export function createGaugeOption(hour: number, minute: number, second: number): EChartsOption {
  return {
    animationDurationUpdate: 300,
    series: [
      {
        axisLine: {
          lineStyle: {
            width: 8
          }
        },
        data: [{ value: hour }],
        max: 12,
        min: 0,
        name: 'hour',
        pointer: {
          length: '55%',
          width: 6
        },
        progress: {
          show: true,
          width: 8
        },
        splitNumber: 12,
        type: 'gauge'
      },
      {
        axisLine: {
          lineStyle: {
            width: 6
          }
        },
        data: [{ value: minute }],
        max: 60,
        min: 0,
        name: 'minute',
        pointer: {
          length: '70%',
          width: 4
        },
        progress: {
          show: true,
          width: 6
        },
        splitNumber: 12,
        type: 'gauge'
      },
      {
        axisLine: {
          lineStyle: {
            width: 4
          }
        },
        data: [{ value: second }],
        max: 60,
        min: 0,
        name: 'second',
        pointer: {
          length: '82%',
          width: 2
        },
        progress: {
          show: true,
          width: 4
        },
        splitNumber: 12,
        type: 'gauge'
      }
    ]
  };
}
