import React from "react";
import PropTypes from "prop-types";
import GoalsHome from "./GoalsHome";

const humanize = (str) => {
  return str.replace(/_/g," ")
}
const GoalsList = ({goals, stats}) => {
  const statsDict = {}
  stats.map((stat)=> statsDict[stat.goal_id] = stat)

  const calculateProgress = (stat, target, comparator) => {
    if (comparator == 'less_than'){
      return (Number(target)/Number(stat))
    }
    return stat/target
  }

  return(
    goals.map((goal) => (
      <div className={"p-1 border rounded-lg w-full mt-2"}>
        <h2 className={"text-2xl"}>{goal.title}</h2>
        <h3 className={"text-xl"}> SMART goal: </h3>
        <p>Achieve {humanize(goal.comparator)} {goal.target_value} {goal.target_metric} {goal.interval}</p>
        <h3 className={"text-xl"}> Most recent stat: </h3>
        <p>{statsDict[goal.id] ? `${statsDict[goal.id].activity_value} ${goal.target_metric} on ${statsDict[goal.id].activity_at} UTC` : 'No Stats Logged Yet'}</p>
        <h3 className={"text-xl"}> Progress </h3>
        <progress className={"w-full"} value={statsDict[goal.id] ? calculateProgress(statsDict[goal.id].activity_value, goal.target_value, goal.comparator) : 0}/>
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
      target_value: PropTypes.number.isRequired,
      target_metric: PropTypes.string.isRequired,
      interval: PropTypes.string.isRequired,
      created_at: PropTypes.string.isRequired,
      updated_at: PropTypes.string.isRequired
    })
  )
}

export default GoalsList