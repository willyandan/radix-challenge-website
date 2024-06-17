import { BarChart } from "@mui/x-charts";
import { FunctionComponent } from "react";

type SensorAvgChartParams = {
  data: Array<{ date: string, value: number }>
}

const sensorDataToSeries = (data: Array<{ date: string, value: number }>) => {
  const xAxisData = data.map(({ date }) => new Date(date).toLocaleString())
  const series = data.map(({ value }) => value)
  return {
    xAxisData,
    series
  }
}

const SensorAvgChart: FunctionComponent<SensorAvgChartParams> = ({ data }) => {
  const { series, xAxisData } = sensorDataToSeries(data)
  return (
    <div className="pt-10">
      <h3 className="text-center">Sensors average value</h3>
      <BarChart
        series={[
          { data: series },
        ]}
        height={400}
        xAxis={[{ data: xAxisData, scaleType: 'band' }]}
        margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
        grid={{ vertical: true, horizontal: true }}
      />
    </div>

  )
}

export default SensorAvgChart