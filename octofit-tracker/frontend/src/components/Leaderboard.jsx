import { useEffect, useState } from 'react'

const endpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/'

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

function Leaderboard() {
  const [leaders, setLeaders] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let isMounted = true

    fetch(endpoint)
      .then((response) => response.json())
      .then((payload) => {
        if (isMounted) {
          setLeaders(normalizeResponse(payload))
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
        <p className="eyebrow">Leaderboard</p>
        <h2>Weekly standings</h2>
      </div>
      {status === 'loading' && <p className="text-muted">Loading leaderboard...</p>}
      {status === 'error' && <p className="text-danger">Leaderboard is unavailable.</p>}
      <div className="table-responsive">
        <table className="table align-middle leaderboard-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Participant</th>
              <th>Team</th>
              <th>Period</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {leaders.map((leader) => (
              <tr key={leader._id ?? `${leader.period}-${leader.rank}`}>
                <td>#{leader.rank}</td>
                <td>{leader.userEmail}</td>
                <td>{leader.teamName}</td>
                <td>{leader.period}</td>
                <td>{leader.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Leaderboard