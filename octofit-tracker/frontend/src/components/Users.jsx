import { useEffect, useState } from 'react'

const endpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/'

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

function Users() {
  const [users, setUsers] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let isMounted = true

    fetch(endpoint)
      .then((response) => response.json())
      .then((payload) => {
        if (isMounted) {
          setUsers(normalizeResponse(payload))
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
        <p className="eyebrow">Profiles</p>
        <h2>Athlete directory</h2>
      </div>
      {status === 'loading' && <p className="text-muted">Loading users...</p>}
      {status === 'error' && <p className="text-danger">Users are unavailable.</p>}
      <div className="resource-grid">
        {users.map((user) => (
          <article className="resource-card" key={user._id ?? user.email}>
            <div className="card-kicker">{user.profile?.level}</div>
            <h3>{user.name}</h3>
            <p>{user.email}</p>
            <p>{user.profile?.fitnessGoal}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Users