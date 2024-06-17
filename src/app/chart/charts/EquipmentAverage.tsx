import { LineChart } from "@mui/x-charts"
import { FunctionComponent } from "react"

type ChartProps = {
  data: Array<{ timestamp: string, equipmentId: string, average: number }>
}

const dataToSeries = (data: Array<{ timestamp: string, equipmentId: string, average: number }>) => {
  const xAxisData = data.map(({ timestamp }) => new Date(timestamp))
  const series: Record<string, Array<number>> = {}

  data.forEach(({ average, equipmentId }) => {
    const list = series[equipmentId] || []
    list.push(average)
    series[equipmentId] = list
  })

  const seriesList = Object.keys(series).map((key) => ({ data: series[key], connectNulls: true, label: key }))

  return {
    series: seriesList,
    xAxisData
  }
}

const EquipmentAverage: FunctionComponent<ChartProps> = ({ data }) => {
  const { series, xAxisData } = dataToSeries(data || [])

  return (
    <>
      <h3 className="text-center">Average equipment value by time (Select one or more equipments do see the data)</h3>
      <LineChart
        xAxis={[{ data: xAxisData, scaleType: 'time' }]}
        series={series}
        height={600}
        margin={{ left: 30, right: 30, top: 30, bottom: 30 }
        }
      />
    </>
  )
}

export default EquipmentAverage