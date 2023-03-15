import { Flex, Text, Tag } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Chart } from '../../components/charts/Chart';
import { IChartData } from '../../types/IChartData';
import { IChartObj } from '../../types/IChartObj';

const SeleltedOptions: string[] = [];

export const Main = () => {
  const [chartData, setChartData] = useState<IChartData[]>([]);
  const [idFilterOptions, setIdFilterOptions] = useState<string[]>([]);
  const [isFiltered, setIsFiltered] = useState(false);

  useEffect(() => {
    getChartData();
  }, [SeleltedOptions, isFiltered]);

  async function getChartData() {
    const chartRes = await axios.get('/data/chart_data.json');
    const chartDataObj: IChartObj = chartRes.data.response;
    const chartDataArr = [];
    const IdArr: string[] = [];

    for (const [key, value] of Object.entries(chartDataObj)) {
      const date = key.split(' ')[1];
      chartDataArr.push({ date, ...value });
      if (!IdArr.includes(value.id)) IdArr.push(value.id);
    }

    setChartData(chartDataArr);
    setIdFilterOptions(IdArr);
  }

  function onClickIdFilter(id: string) {
    if (SeleltedOptions.includes(id)) {
      const idIndex = SeleltedOptions.indexOf(id);
      SeleltedOptions.splice(idIndex, 1);
    } else {
      SeleltedOptions.push(id);
    }
    setIsFiltered((prev) => !prev);
  }

  return (
    <>
      <Flex mb={'10px'} alignItems='center'>
        <Text fontSize='lg' as='b' mr={10}>
          지역
        </Text>
        {idFilterOptions.map((id: string) => {
          return (
            <Tag
              key={id}
              size='lg'
              variant='solid'
              colorScheme={SeleltedOptions.includes(id) ? 'teal' : 'gray'}
              mr={'3px'}
              cursor='pointer'
              onClick={() => onClickIdFilter(id)}
            >
              {id}
            </Tag>
          );
        })}
      </Flex>
      <Chart data={chartData} selectedOptions={SeleltedOptions} />
    </>
  );
};
