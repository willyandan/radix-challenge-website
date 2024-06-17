import { FormEventHandler, FunctionComponent, useState } from "react";
import ReactSelect from "react-select";

type ChartFormParams = {
  unitTimeOptions: Array<string>
  equipments: Array<string>
  onSearch: (unit: string, date?: Date, equipments?: Array<string>) => void
}

const ChartForm: FunctionComponent<ChartFormParams> = ({ unitTimeOptions = [], equipments, onSearch }) => {
  const [unit, setUnit] = useState<string>(unitTimeOptions[1])
  const [date, setDate] = useState<Date | undefined>()
  const [selectedEquipments, setSelectedEquipments] = useState<Array<{ value: string, label: string }>>()

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    onSearch(unit, date, selectedEquipments?.map(equipment => equipment.value))
  }

  return (
    <form className="flex flex-col rounded-2xl w-[800px] bg-[#ffffff] shadow-xl w-full p-8" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-3">

        <div>
          <label htmlFor="time-spam" className="block text-sm font-medium leading-6 text-gray-900">
            Time Spam
          </label>
          <div className="mt-2">
            <select
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
              onChange={(val) => setUnit(val.target.value)}
              value={unit}
            >
              {unitTimeOptions.map(unit => (<option key={unit} value={unit}>{unit}</option>))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-medium leading-6 text-gray-900">
            Date
          </label>
          <div className="mt-2">
            <input
              type="date"
              name="date"
              id="date"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
              onChange={(val) => setDate(val.target.valueAsDate || undefined)}
              value={date?.toISOString().substring(0, 10)}
            />
          </div>
        </div>

        <div>
          <label htmlFor="equipments" className="block text-sm font-medium leading-6 text-gray-900">
            Equipments
          </label>
          <ReactSelect
            isMulti
            name="equipments"
            options={equipments.map((equipment) => ({ value: equipment, label: equipment }))}
            className="basic-multi-select"
            classNamePrefix="select"
            value={selectedEquipments}
            onChange={(val) => setSelectedEquipments(val.map((val) => ({ ...val })))}
          />
        </div>
      </div>
      <div className="flex justify-end pt-6">
        <button className="bg-[#7e22ce] text-[#ffffff]  font-bold text-lg p-3 rounded-lg hover:bg-purple-800 active:scale-95 transition-transform transform">Search</button>
      </div>
    </form >
  )
}

export default ChartForm