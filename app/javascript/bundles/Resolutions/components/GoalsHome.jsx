import PropTypes from 'prop-types';
import React, { useState } from 'react';
import style from './Goals.module.css';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import fetchGoals from '../api/Goals'

const GoalsHome = (props) => {
  const queryClient = new QueryClient()
  const [goals, setGoals] = useState(Object.values(props))
  return (
      <QueryClientProvider client={queryClient}>
          <div>
              <h1> Goals </h1>
              <hr/>
              {goals.map((goal) => <h2>{goal.title}</h2>)}
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
