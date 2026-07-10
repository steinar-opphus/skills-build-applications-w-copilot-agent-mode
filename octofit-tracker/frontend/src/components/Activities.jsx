import { useEffect, useState } from 'react'

const endpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
  : 'http://localhost:8000/api/activities/'

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

function Activities() {
  const [activities, setActivities] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let isMounted = true

    fetch(endpoint)
      .then((response) => response.json())
      .then((payload) => {
        if (isMounted) {
          setActivities(normalizeResponse(payload))
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
        <p className="eyebrow">Activity logging</p>
        <h2>Recent movement</h2>
      </div>
      {status === 'loading' && <p className="text-muted">Loading activities...</p>}
      {status === 'error' && <p className="text-danger">Activities are unavailable.</p>}
      <div className="resource-grid">
        {activities.map((activity) => (
          <article className="resource-card" key={activity._id ?? `${activity.userEmail}-${activity.loggedAt}`}>
            <div className="card-kicker">{activity.activityType}</div>
            <h3>{activity.userEmail}</h3>
            <p>{activity.notes}</p>
            <dl className="metric-row">
              <div>
                <dt>Minutes</dt>
                <dd>{activity.durationMinutes}</dd>
              </div>
              <div>
                <dt>Calories</dt>
                <dd>{activity.caloriesBurned}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Activities