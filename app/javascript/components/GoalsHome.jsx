import PropTypes, {checkPropTypes} from "prop-types";
import React, {useEffect, useState} from "react";
import CreateGoalForm from "./CreateGoalForm";
import CreateStatForm from "./CreateStatForm"
import GoalsList from "./GoalsList";
import {CreateGoal, IndexGoals} from "../Api/Goals";
import {CreateStat, IndexStatsByGoal} from "../Api/Stats";

const GoalsHome = ({initialGoals, initialStats}) => {
  const [goals, setGoals] = useState(JSON.parse(initialGoals))
  const [stats, setStats] = useState(JSON.parse(initialStats))
  const refresh = async () => {
    const newGoals = await IndexGoals()
    const newStats = await IndexStatsByGoal()
    if (newGoals.length > 0) {
      setGoals(newGoals)
    }
    if (newStats.length > 0) {
      setStats(newStats)
      console.log(stats)
    }
  }

  return (
    <div className={"lg:flex gap-3 mx-auto"}>
      <div className={"p-6 m-2 mx-auto bg-white rounded-xl shadow-lg shrink-0 basis-1/3"}>
        <button onClick={refresh}>test</button>
        <h1 className={"text-3xl mb-3"}>Current Goals</h1>
        <hr />
        {goals.length > 0 ?
          <GoalsList goals={goals} stats={stats}/> :
          <h2 className={"text-xl mt-2 text-center "}>No Goals Yet</h2>}
      </div>
      <div className={"p-6 m-2 mx-auto bg-white rounded-xl shadow-lg shrink-0 basis-1/3"}>
        <h1 className={"text-3xl mb-3"}> Create New Goal </h1>
        <hr/>
        <CreateGoalForm refresh={refresh} createGoal={CreateGoal}/>
      </div>
      <div className={"p-6 m-2 mx-auto bg-white rounded-xl shadow-lg shrink-0 basis-1/3"}>
        <h1 className={"text-3xl mb-3"}> Log New Stat </h1>
        <hr/>
        {goals.length > 0 ?
          <CreateStatForm goals={goals} refresh={refresh} createStat={CreateStat}/> :
          <h2 className={"text-xl mt-2 text-center "}>Create Goal First</h2>}
      </div>
    </div>

  );
};

GoalsHome.propTypes = {
    initialGoals: PropTypes.string,
    initialStats: PropTypes.string
}

export default GoalsHome;
