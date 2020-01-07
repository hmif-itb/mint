import Box from '@material-ui/core/Box/Box';
import Chip from '@material-ui/core/Chip/Chip';
import Avatar from '@material-ui/core/Avatar/Avatar';
const generateColors = require('../helpers/colorgenerator');

export interface ProportionChartItem {
  title: string;
  value: number;
  label?: string;
}

interface MyProps {
  height?: number;
  series: ProportionChartItem[];
}

export default function ProportionChart(props: MyProps) {
  const { series } = props;
  const total = series.reduce((acc, item) => {
    return acc + item.value;
  }, 0);

  const colors = generateColors(series.length);

  return (
    <Box>
      <Box style={{ height: props.height || '56px', position: 'relative', display: 'flex' }}>
        {series.map((item: ProportionChartItem, i: number) => {
          return (
            <Box
              key={i}
              display="flex"
              justifyContent="center"
              alignItems="center"
              style={{
                backgroundColor: colors[i],
                width: `${(item.value / total) * 100}%`,
                overflow: 'none'
              }}
            >
              {item.label}
            </Box>
          );
        })}
      </Box>

      <Box mt={2}>
        {series.map((item: ProportionChartItem, i: number) => {
          return (
            <Chip
              key={i}
              variant="outlined"
              size="small"
              avatar={<Avatar style={{ backgroundColor: colors[i] }}>&nbsp;</Avatar>}
              style={{ border: 'none', marginRight: '8px' }}
              label={item.title}
            />
          );
        })}
      </Box>
    </Box>
  );
}
