import React from 'react'

export default function DataTable({ data, selectedId, onRowClick }) {
  return (
    <div style={{ overflowX: 'auto', marginTop: 8 }}>
      <table
        style={{
          width: '90%',
          maxWidth: 900,
          margin: '0 auto',
          borderCollapse: 'collapse',

          /* 🌌 Glass table container */
          background: 'rgba(15, 23, 42, 0.85)',
          backdropFilter: 'blur(6px)',
          borderRadius: 10,
          overflow: 'hidden',
          boxShadow: '0 20px 40px rgba(0,0,0,0.6)',

          fontFamily: 'Inter, Arial, sans-serif',
          color: '#e5e7eb',
        }}
      >
        <thead>
          <tr
            style={{
              background: '#0f172a', // dark header
            }}
          >
            <Th>Project Name</Th>
            <Th>Latitude</Th>
            <Th>Longitude</Th>
            <Th>Status</Th>
            <Th>Last Updated</Th>
          </tr>
        </thead>

        <tbody>
          {data.map((item, index) => {
            const isSelected = item.id === selectedId
            const isAlternate = index % 2 !== 0

            return (
              <tr
                key={item.id}
                onClick={() => onRowClick(item.id)}
                style={{
                  cursor: 'pointer',

                  /* 🌓 Dark striped rows */
                  background: isSelected
                    ? 'rgba(56, 189, 248, 0.15)' // blue highlight
                    : isAlternate
                    ? 'rgba(30, 41, 59, 0.9)'
                    : 'rgba(15, 23, 42, 0.9)',

                  transition: 'background 0.2s ease',
                }}
              >
                <Td>{item.projectName}</Td>
                <Td>{item.latitude.toFixed(4)}</Td>
                <Td>{item.longitude.toFixed(4)}</Td>
                <Td>
                  <StatusBadge status={item.status} />
                </Td>
                <Td>{new Date(item.lastUpdated).toLocaleDateString()}</Td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

/* 🔹 Reusable components */

const Th = ({ children }) => (
  <th
    style={{
      padding: '10px',
      textAlign: 'left',
      fontWeight: 600,
      fontSize: 13,
      color: '#e5e7eb',
      borderBottom: '1px solid rgba(255,255,255,0.08)',
    }}
  >
    {children}
  </th>
)

const Td = ({ children }) => (
  <td
    style={{
      padding: '8px 10px',
      fontSize: 12,
      color: '#e5e7eb',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
    }}
  >
    {children}
  </td>
)

const StatusBadge = ({ status }) => {
  const isActive = status === 'Active'

  return (
    <span
      style={{
        padding: '4px 10px',
        borderRadius: 999,
        fontSize: 11,
        fontWeight: 600,

        /* ✅ Subtle emerald / red pills */
        color: isActive ? '#22c55e' : '#ef4444',
        background: isActive
          ? 'rgba(34,197,94,0.15)'
          : 'rgba(239,68,68,0.15)',
      }}
    >
      {status}
    </span>
  )
}
