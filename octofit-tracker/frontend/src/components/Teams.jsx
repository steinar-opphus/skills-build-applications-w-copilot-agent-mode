import { useEffect, useState } from 'react'

const endpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/'

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

function Teams() {
  const [teams, setTeams] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let isMounted = true

    fetch(endpoint)
      .then((response) => response.json())
      .then((payload) => {
        if (isMounted) {
          setTeams(normalizeResponse(payload))
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
        <p className="eyebrow">Teams</p>
        <h2>Training groups</h2>
      </div>
      {status === 'loading' && <p className="text-muted">Loading teams...</p>}
      {status === 'error' && <p className="text-danger">Teams are unavailable.</p>}
      <div className="resource-grid">
        {teams.map((team) => (
          <article className="resource-card" key={team._id ?? team.name}>
            <div className="card-kicker">{team.focus}</div>
            <h3>{team.name}</h3>
            <p>Captain: {team.captainEmail}</p>
            <p>{team.memberEmails?.length ?? 0} active members</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Teams