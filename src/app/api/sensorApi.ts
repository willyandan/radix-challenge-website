export type SensorChartData = {
  timestamp: string,
  equipments: Array<{ equipmentId: string, average: number }>
}

type AllowedTypes = number | string | Date | undefined

const buildParams = (data: Record<string, AllowedTypes | Array<AllowedTypes>>) => {
  const params = new URLSearchParams();

  Object.keys(data).forEach((key) => {
    const value = data[key]
    if (!value) return
    if (Array.isArray(value)) {
      value.forEach((item) => {
        if (!item) {
          return
        }
        if (item instanceof Date) {
          params.append(key, item.toISOString())
        } else {
          params.append(key, item.toString())
        }
      })
    } else {
      params.append(key, value.toString())
    }
  })

  return params;
};

export const fetchEquipments = async (): Promise<Array<string>> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/sensor/equipments`)
  const result = await response.json()
  return result.equipments
}

export const fetchChartSensorAvg = async (unit?: string, date?: Date): Promise<Array<{ date: string, value: number }>> => {
  const params = buildParams({ unit, date })
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/sensor/chart/sensor-avg?${params.toString()}`)
  const result = await response.json()
  return result.data
}

export const fetchEquipmentStdDev = async (unit?: string, date?: Date): Promise<Array<{ equipmentId: string, deviation: number }>> => {
  const params = buildParams({ unit, date })
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/sensor/chart/equipment-std-dev?${params.toString()}`)
  const result = await response.json()
  return result.data
}

export const fetchEquipmentAvg = async (equipments: Array<string>, unit?: string, date?: Date): Promise<Array<{ timestamp: string, equipmentId: string, average: number }>> => {
  const params = buildParams({ equipments, unit, date })
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/sensor/chart/equipment-avg-time?${params.toString()}`)
  const result = await response.json()
  return result.data
}