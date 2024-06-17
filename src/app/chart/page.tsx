import { fetchEquipments } from "../api/sensorApi";
import Chart from "./chart";

export default async function ChartPage() {

  const unitTimeOptions = ['minute', 'hour', 'day', 'week', 'month', 'quarter', 'year']
  const equipments = await fetchEquipments()

  return (
    <main className="flex min-h-screen flex-col p-11">
      <h1 className="text-5xl">Chart</h1>
      <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
      <Chart
        unitTimeOptions={unitTimeOptions}
        equipments={equipments}
      />

    </main>
  );
}
