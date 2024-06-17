// 'use client'
// import { LineChart } from "@mui/x-charts";
// import { FunctionComponent } from "react";
// import { SensorChartData } from "../api/fetchSensorChart";

import { LineChart } from "@mui/x-charts"
import { FunctionComponent } from "react"

type ChartProps = {
  sensors: Array<SensorChartData>
}

// const sensorChartDataToSeries = (sensors: Array<SensorChartData>) => {
//   const equipmentsIds = sensors
//     .map((sensor) => {
//       return sensor.equipments.map((equipments) => equipments.equipmentId)
//     })
//   const equipmentMap = sensors
//     .map((sensor) => {
//       return sensor.equipments.map((equipments) => ({ ...equipments, timestamp: sensor.timestamp }))
//     })
//     .reduce((data, sensor) => {
//       return [
//         ...data,
//         ...sensor
//       ]
//     }, [])
//     .reduce((map, sensor) => {
//       const key = `${sensor.equipmentId}@${sensor.timestamp}`
//       return {
//         ...map,
//         [key]: sensor.average
//       }
//     }, {})

//   return equipmentsIds.map(id => {
//     const data = sensors.map(({ timestamp }) => equipmentMap[`${id}@${timestamp}`] || 0)
//     return { data }
//   })

// }

const EquipmentAverage: FunctionComponent<ChartProps> = ({ sensors }) => {

  return (
    <LineChart
      xAxis={[{ data: [] }]}
      series={
        [
          {
            data: [],
          },
        ]}
      height={600}
      margin={{ left: 30, right: 30, top: 30, bottom: 30 }
      }
      grid={{ vertical: true, horizontal: true }}
    />
  )
}

export default EquipmentAverage