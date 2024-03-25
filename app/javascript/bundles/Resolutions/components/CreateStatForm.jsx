import React, {useState} from "react";
import { Controller, useForm } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";

const CreateStatForm = ({goals, refresh, createStat}) => {
  const {control , handleChange , register, handleSubmit, reset, formState: {errors}} = useForm();
  const [selectedGoal, setSelectedGoal] = useState(goals[0])
  const [activityAt, setActivityAt] = useState()
  const onSubmit = async (data) => {
    const response = await createStat(data)
    refresh()
    reset()
    alert(response.message)
  };
  const onChange = (goal_id) => {
    console.log(goals.filter((goal)=> goal.id === Number(goal_id)))
    setSelectedGoal(goals.filter((goal)=> goal.id === Number(goal_id))[0])
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col mt-2 text-xl">
        <div className="col-span-full mt-2">
          <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">Log Stat For</label>
          <div className="mt-2">
            <select id="goalId"
                    onInput={(e) => onChange(e.target.value)}
                    {...register("goalId", { required: "Goal is required" })}
                    className="block w-full rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-1.5">
              {goals.map((goal)=>
                <option key={goal.id} value={goal.id}>{goal.title.slice(0,50)}</option>)
              }
            </select>
            {errors.goal && <span className={"text-rose-800 mx-auto"}>{errors.goal.message}</span>}
          </div>
        </div>
        <div className="col-span-full mt-2">
          <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">I achieved</label>
        </div>
        <div className={"flex flex-row gap-1"}>
          <div className="mt-2 basis-1/3">
            <input
              type="number"
              placeholder={1}
              {...register("activityValue",
                { required: "Value is required",
                  valueAsNumber: true,
                  min: { value: 1, message: "must be atleast one" }
                })
              }
              className="block w-full min-h-9 rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm leading-6 mx-auto p-1.5"></input>
            {errors.activityValue && <span className={"text-rose-800 mx-auto"}>{errors.activityValue.message}</span>}
          </div>
          <div className="mt-2 basis-2/3">
            <input
              disabled={true}
              placeholder={selectedGoal?.target_metric || ''}
              className="block w-full min-h-9 rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm leading-6 mx-auto p-1.5"></input>
          </div>
        </div>
        <div className="col-span-full mt-2">
          <label htmlFor="activityAt" className="block text-sm font-medium leading-6 text-gray-900">On</label>
        </div>
        <div className={"mt-2"}>
          <Controller
            control={control}
            name='activityAt'
            render={({ field }) => (
              <DatePicker
                placeholderText='Select date'
                onChange={(date) => field.onChange(date)}
                selected={field.value}
                maxDate={Date()}
                required={true}
              />
            )}
          />
          {errors.activityDate && <span className={"text-rose-800 mx-auto"}>{errors.activityDate.message}</span>}
        </div>
      </div>
      <button
        className="mt-4 w-full px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm shadow-sm hover:shadow-md transition duration-300 ease-in-out" type="submit">
        Submit
      </button>
    </form>
  )
}

export default CreateStatForm