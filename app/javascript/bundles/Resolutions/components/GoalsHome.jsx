import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import CreateGoalForm from "./CreateGoalForm";
import GoalsList from "./GoalsList";


const GoalsHome = (props) => {
  const queryClient = new QueryClient()
  const [goals, setGoals] = useState(Object.values(props))
  return (
    <QueryClientProvider client={queryClient}>
      <div className={'lg:flex gap-3 mx-auto'}>
        <div className={'p-6 m-2 mx-auto bg-white rounded-xl shadow-lg shrink-0 basis-1/3'}>
          <h1 className={'text-3xl mb-3'}> Current Goals </h1>
          <hr />
          {goals.length > 0 ? <GoalsList goals={goals}/>: <h2 className={'text-xl mt-2 text-center '}>No Goals Yet</h2>}
        </div>
        <div className={'p-6 m-2 mx-auto bg-white rounded-xl shadow-lg shrink-0 basis-1/3'}>
          <h1 className={'text-3xl mb-3'}> Create New Goal </h1>
          <hr/>
          <CreateGoalForm />
        </div>
        <div className={'p-6 m-2 mx-auto bg-white rounded-xl shadow-lg shrink-0 basis-1/3'}>
          <h1 className={'text-3xl mb-3'}> Log New Stat </h1>
          <hr/>
        </div>
      </div>
    </QueryClientProvider>
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
            target_metric: PropTypes.number.isRequired,
            interval: PropTypes.string.isRequired,
            capture_frequency: PropTypes.string.isRequired,
            created_at: PropTypes.string.isRequired,
            updated_at: PropTypes.string.isRequired
        })
    )
};

export default GoalsHome;
