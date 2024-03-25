import humps from "humps"
import PropTypes from "prop-types"
const IndexStatsByGoal = async () => {
  const response = await fetch("/stats")
  if (!response.ok) {
    throw new Error(`${response.status} Error, route: ${response.url}, details: ${response.statusText}`);
  }
  else {
    const data = await response.json()
    return data
  }
};

const CreateStat = async (data) => {
  const response = await fetch("/stats", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(humps.decamelizeKeys(data)),
  })
  const r = await response.json()
  return(r)
};

CreateStat.propTypes = {
  data: PropTypes.object.isRequired
}

export {CreateStat, IndexStatsByGoal}