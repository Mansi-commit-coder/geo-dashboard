import { useState, useEffect } from 'react'
import { useGeoData } from '../../useGeoData'
import DataTable from '../DataTable'
import MapView from '../MapView'

export default function Dashboard() {
  const {
    data,
    total,
    page,
    setPage,
    PAGE_SIZE,
    search,
    setSearch,
    sortKey,
    setSortKey,
    sortOrder,
    setSortOrder,
  } = useGeoData()

  const [selectedId, setSelectedId] = useState(null)
  const [searchInput, setSearchInput] = useState(search)

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput)
      setPage(0)
      setSelectedId(null)
    }, 300)
    return () => clearTimeout(timer)
  }, [searchInput, setSearch, setPage])

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      {/* 🌌 Galaxy background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'fixed',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: -10,
        }}
      >
        <source src="/galaxy.mp4" type="video/mp4" />
      </video>

      {/* ================= TOP VIDEO SECTION ================= */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: 32,
          marginBottom: -50,
          padding: '0 12px',
        }}
      >
        <div
          style={{
            position: 'relative',
            width: 'clamp(95%, 70%, 40%)',
            height: 260,
          }}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            style={{
              position: 'absolute',
              top: '-100%',
              left: '-5%',
              width: '110%',
              height: '300%',
              objectFit: 'cover',
              zIndex: -1,
            }}
          >
            <source src="/m.mp4" type="video/mp4" />
          </video>

          <div
            style={{
              textAlign: 'center',
              color: '#fff',
              padding: 16,
            }}
          >
            <h2
              style={{
                fontSize: 'clamp(26px, 5vw, 38px)',
                fontWeight: 800,
                marginBottom: 18,
                letterSpacing: '0.5px',
              }}
            >
              Geo Data Dashboard
            </h2>

            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: 8,
                flexWrap: 'wrap',
              }}
            >
              <input
                placeholder="Search project"
                value={searchInput}
                onChange={e => setSearchInput(e.target.value)}
                style={{ padding: 6, minWidth: 160 }}
              />

              <select
                value={sortKey}
                onChange={e => setSortKey(e.target.value)}
                style={{ padding: 6 }}
              >
                <option value="projectName">Project Name</option>
                <option value="status">Status</option>
              </select>

              <button
                onClick={() =>
                  setSortOrder(o => (o === 'asc' ? 'desc' : 'asc'))
                }
                style={{ padding: '6px 12px' }}
              >
                {sortOrder === 'asc' ? '⬆ Asc' : '⬇ Desc'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ================= TABLE ================= */}
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: 16,
          position: 'relative',
          zIndex: 2,
        }}
      >
        <DataTable
          data={data}
          selectedId={selectedId}
          onRowClick={setSelectedId}
        />
      </div>

      {/* ================= PAGINATION (ABOVE MAP) ================= */}
      <div
        style={{
          maxWidth: 1200,
          margin: '12px auto 24px',
          padding: 16,
          textAlign: 'center',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <button
          disabled={page === 0}
          onClick={() => setPage(p => p - 1)}
          style={{ marginRight: 12 }}
        >
          Prev
        </button>

        <span style={{ color: '#e5e7eb' }}>
          Page {page + 1} / {Math.ceil(total / PAGE_SIZE)}
        </span>

        <button
          disabled={(page + 1) * PAGE_SIZE >= total}
          onClick={() => setPage(p => p + 1)}
          style={{ marginLeft: 12 }}
        >
          Next
        </button>
      </div>

      {/* ================= MAP (FULL WIDTH) ================= */}
      <div style={{ width: '100%', position: 'relative', zIndex: 2 }}>
        <MapView
          data={data}
          selectedId={selectedId}
          onMarkerClick={setSelectedId}
        />
      </div>
    </div>
  )
}


