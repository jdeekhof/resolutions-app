import humps from "humps"
import PropTypes from "prop-types"
const IndexGoals = async () => {
  const response = await fetch("/goals")
  if (!response.ok) {
    throw new Error(`${response.status} Error, route: ${response.url}, details: ${response.statusText}`);
  }
  else {
    const data = await response.json()
    return data
  }
};

const CreateGoal = async (data) => {
  const response = await fetch("/goals", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(humps.decamelizeKeys(data)),
  })
  const r = await response.json()
  return(r)
};

CreateGoal.propTypes = {
  data: PropTypes.object.isRequired
}

export {CreateGoal, IndexGoals}