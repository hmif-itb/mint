import ProportionChart from '../components/ProportionChart';

export default () => {
  const series = [
    { title: 'One', value: 43 },
    { title: 'Two', value: 57 },
    { title: 'Three', value: 12 }
  ];

  return <ProportionChart series={series} />;
};
