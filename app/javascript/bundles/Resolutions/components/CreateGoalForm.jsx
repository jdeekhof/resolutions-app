import React from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";

const CreateGoalForm = ({refresh, createGoal}) => {
  const { register, handleSubmit, reset ,formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const response = await createGoal(data)
    refresh()
    reset()
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col mt-2 text-xl">
        <div className="col-span-full mt-2">
          <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">Describe Goal</label>
          <div className="mt-2">
            <textarea id="title" {...register("title", { required: "Title is required" })} className="block w-full rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-1.5"></textarea>
            {errors.title && <span className={"text-rose-800 mx-auto"}>{errors.title.message}</span>}
          </div>
        </div>
        <div className="col-span-full mt-2">
          <label htmlFor="comparator" className="block text-sm  min-h-9 font-medium leading-6 text-gray-900">I want to (spend, walk, eat, etc.)</label>
          <select id="comparator" {...register("comparator", { required: "Comparator is required" })} className="block w-full rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-1.5">
            <option value="0">Less Than</option>
            <option value="1">More Than</option>
          </select>
          {errors.comparator && <span className={"text-rose-800 mx-auto"}>{errors.comparator.message}</span>}
        </div>
        <div className={"flex flex-row gap-1"}>
          <div className="mt-2 basis-1/3">
            <input
              type="number"
              placeholder={1}
              {...register("targetValue",
                { required: "Value is required",
                  valueAsNumber: true,
                  min: { value: 1, message: "must be atleast one" }
                })
              }
              className="block w-full min-h-9 rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm leading-6 mx-auto p-1.5"></input>
            {errors.targetValue && <span className={"text-rose-800 mx-auto"}>{errors.targetValue.message}</span>}
          </div>
          <div className="mt-2 basis-2/3">
            <input
              placeholder="steps, pages, etc."
              {...register("targetMetric",
                { required: "Metric is required"})
              }
              className="block w-full min-h-9 rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm leading-6 mx-auto p-1.5"></input>
            {errors.targetMetric && <span className={"text-rose-800 mx-auto"}>{errors.targetMetric.message}</span>}
          </div>
        </div>
        <div className="col-span-full mt-2">
          <label htmlFor="interval" className="block text-sm font-medium leading-6 text-gray-900">Within this interval</label>
          <div className="mt-2">
            <input
              id="interval"
              placeholder="within a week, per day, in under 30 minutes"
              {...register("interval", { required: "Interval is required" })}
              className="block w-full rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-1.5">
            </input>
            {errors.interval && <span className={"text-rose-800 mx-auto"}>{errors.interval.message}</span>}
          </div>
        </div>
        <button className="mt-4 w-full px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm shadow-sm hover:shadow-md transition duration-300 ease-in-out" type="submit">Submit</button>
      </div>
    </form>
  );
}

CreateGoalForm.prototype = {
  refreshGoals: PropTypes.func.isRequired,
  createGoal: PropTypes.func.isRequired
}

export default CreateGoalForm;
