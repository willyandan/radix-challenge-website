import { BarChart } from "@mui/x-charts";
import { FunctionComponent } from "react";

type EquipmentStdDevParams = {
  data: Array<{ equipmentId: string, deviation: number }>
}

const convertDataToSeries = (data: Array<{ equipmentId: string, deviation: number }>) => {
  data.sort((a, b) => a.equipmentId.localeCompare(b.equipmentId))
  const xAxisData = data.map(({ equipmentId }) => equipmentId)
  const series = data.map(({ deviation }) => deviation)
  return {
    xAxisData, series
  }
}

const EquipmentStdDev: FunctionComponent<EquipmentStdDevParams> = ({ data }) => {
  const { xAxisData, series } = convertDataToSeries(data)
  return (
    <div className="pt-10">
      <h3 className="text-center">Standard deviation by equipment</h3>
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

export default EquipmentStdDev