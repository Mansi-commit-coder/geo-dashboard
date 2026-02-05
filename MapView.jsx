import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'

// Fix default Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

export default function MapView({ data, selectedId, onMarkerClick }) {
  if (!data.length) return null

  const center = [data[0].latitude, data[0].longitude]

  return (
    <div
      style={{
        marginTop: 24,
        padding: 16,

        /* 🌌 Navy glass frame */
        background: 'rgba(15, 23, 42, 0.9)',
        backdropFilter: 'blur(6px)',
        borderRadius: 14,
        boxShadow: '0 20px 40px rgba(0,0,0,0.65)',
      }}
    >
      {/* Title */}
      <h3
        style={{
          marginBottom: 12,
          color: '#e5e7eb',
          fontSize: 16,
          fontWeight: 600,
          letterSpacing: '0.3px',
        }}
      >
        Project Locations
      </h3>

      {/* Map wrapper to clip corners */}
      <div
        style={{
          width: '100%',
          height: 420,
          borderRadius: 10,
          overflow: 'hidden',
        }}
      >
        <MapContainer
          center={center}
          zoom={10}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {data.map(item => (
            <Marker
              key={item.id}
              position={[item.latitude, item.longitude]}
              eventHandlers={{
                click: () => onMarkerClick(item.id),
              }}
            >
              <Popup>
                <strong>{item.projectName}</strong>
                <br />
                Status: {item.status}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  )
}
