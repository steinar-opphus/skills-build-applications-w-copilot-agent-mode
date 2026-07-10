import { useEffect, useState } from 'react'

const endpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/'

function normalizeResponse(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (Array.isArray(payload?.data)) {
    return payload.data
  }

  if (Array.isArray(payload?.results)) {
    return payload.results
  }

  return []
}

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let isMounted = true

    fetch(endpoint)
      .then((response) => response.json())
      .then((payload) => {
        if (isMounted) {
          setWorkouts(normalizeResponse(payload))
          setStatus('ready')
        }
      })
      .catch(() => {
        if (isMounted) {
          setStatus('error')
        }
      })

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <section>
      <div className="section-heading">
        <p className="eyebrow">Suggestions</p>
        <h2>Workout library</h2>
      </div>
      {status === 'loading' && <p className="text-muted">Loading workouts...</p>}
      {status === 'error' && <p className="text-danger">Workouts are unavailable.</p>}
      <div className="resource-grid">
        {workouts.map((workout) => (
          <article className="resource-card" key={workout._id ?? workout.name}>
            <div className="card-kicker">{workout.difficulty}</div>
            <h3>{workout.name}</h3>
            <p>{workout.description}</p>
            <p>{workout.durationMinutes} minutes for {workout.targetGoal}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Workouts