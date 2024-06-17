'use client'

import { FunctionComponent, useEffect, useState } from "react";
import { fetchChartSensorAvg, fetchEquipmentAvg, fetchEquipmentStdDev } from "../api/sensorApi";
import ChartForm from "./chartForm";
import SensorAvgChart from "./charts/sensorAvgChart";
import EquipmentStdDev from "./charts/equipmentStdDev";
import EquipmentAverage from "./charts/equipmentAverage"


type ChartProps = {
  unitTimeOptions: Array<string>
  equipments: Array<string>
}



const Chart: FunctionComponent<ChartProps> = ({ unitTimeOptions, equipments }) => {

  const [sensorAvgData, setSensorAvgData] = useState<Array<{ date: string, value: number }>>([])
  const [equipmentStdDev, setEquipmentStdDev] = useState<Array<{ equipmentId: string, deviation: number }>>([])
  const [equipmentAvg, setEquipmentAvg] = useState<Array<{ timestamp: string, equipmentId: string, average: number }>>([])

  useEffect(() => {
    fetchChartSensorAvg().then((data) => {
      setSensorAvgData(data)
    })

    fetchEquipmentStdDev().then((data) => {
      setEquipmentStdDev(data)
    })
  }, [])

  const handleSearch = async (unit: string, date?: Date, equipments?: Array<string>) => {
    if (equipments) {
      const equipmentAvgData = await fetchEquipmentAvg(equipments, unit, date)
      setEquipmentAvg(equipmentAvgData)
    }
    const equipmentStdDevData = await fetchEquipmentStdDev(unit, date)
    const sensorAvgData = await fetchChartSensorAvg(unit, date)
    setSensorAvgData(sensorAvgData)
    setEquipmentStdDev(equipmentStdDevData)

  }

  return (
    <>
      <ChartForm
        unitTimeOptions={unitTimeOptions}
        equipments={equipments}
        onSearch={handleSearch}
      />
      <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
        <SensorAvgChart data={sensorAvgData} />
        <EquipmentStdDev data={equipmentStdDev} />
        <div className="col-span-2">
          <EquipmentAverage data={equipmentAvg} />

        </div>
      </div>
    </>

  )
}

export default Chart