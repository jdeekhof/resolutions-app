import React from "react";
import PropTypes from "prop-types";
import GoalsHome from "./GoalsHome";

const humanize = (str) => {
  return str.replace(/_/g," ")
}
const GoalsList = ({goals}) => {
  return(
    goals.map((goal) => (
      <div className={"p-1 border rounded-lg w-full mt-2"}>
        <h2 className={"text-2xl"}>{goal.title}</h2>
        <h3 className={"text-xl"}> SMART goal: </h3>
        <p>Achieve {humanize(goal.comparator)} {goal.target_value} {goal.target_metric} {goal.interval}</p>
        <h3 className={"text-xl"}> Most recent stat: </h3>
        <p> 2000 steps on 3/14</p>
        <h3 className={"text-xl"}> Progress </h3>
        <progress className={"w-full"} value={0.5}/>
      </div>
    ))
  )
}

GoalsList.propTypes = {
  goals: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      deadline: PropTypes.string,
      comparator: PropTypes.string.isRequired,
      target_value: PropTypes.string.isRequired,
      target_metric: PropTypes.number.isRequired,
      interval: PropTypes.string.isRequired,
      created_at: PropTypes.string.isRequired,
      updated_at: PropTypes.string.isRequired
    })
  )
}

export default GoalsList