import PropTypes from "prop-types";
import React, {useEffect, useState} from "react";
import CreateGoalForm from "./CreateGoalForm";
import GoalsList from "./GoalsList";
import {Create, Index} from "../Api/Goals";

const GoalsHome = (props) => {
  const [goals, setGoals] = useState(Object.values(props))

  const refreshGoals = async () => {
    const newGoals = await Index()
    if (newGoals.length > 0) {
      setGoals(newGoals)
    }
  }

  return (
    <div className={"lg:flex gap-3 mx-auto"}>
      <div className={"p-6 m-2 mx-auto bg-white rounded-xl shadow-lg shrink-0 basis-1/3"}>
        <button onClick={refreshGoals}>test</button>
        <h1 className={"text-3xl mb-3"}>Current Goals</h1>
        <hr />
        {goals.length > 0 ? <GoalsList goals={goals}/>: <h2 className={"text-xl mt-2 text-center "}>No Goals Yet</h2>}
      </div>
      <div className={"p-6 m-2 mx-auto bg-white rounded-xl shadow-lg shrink-0 basis-1/3"}>
        <h1 className={"text-3xl mb-3"}> Create New Goal </h1>
        <hr/>
        <CreateGoalForm refreshGoals={refreshGoals} createGoal={Create}/>
      </div>
      <div className={"p-6 m-2 mx-auto bg-white rounded-xl shadow-lg shrink-0 basis-1/3"}>
        <h1 className={"text-3xl mb-3"}> Log New Stat </h1>
        <hr/>
      </div>
    </div>

  );
};

GoalsHome.propTypes = {
    props: PropTypes.objectOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            deadline: PropTypes.string,
            comparator: PropTypes.string.isRequired,
            target_value: PropTypes.string.isRequired,
            target_metric: PropTypes.string.isRequired,
            interval: PropTypes.string.isRequired,
            created_at: PropTypes.string.isRequired,
            updated_at: PropTypes.string.isRequired
        })
    )
};

export default GoalsHome;
