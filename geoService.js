// src/api/geoService.js

export const fetchGeoData = async () => {
  // simulate network delay
  await new Promise(res => setTimeout(res, 300))

  return Array.from({ length: 1000 }).map((_, i) => ({
    id: i + 1,
    projectName: `Project ${i + 1}`,
    latitude: 28.6 + Math.random(),
    longitude: 77.2 + Math.random(),
    status: i % 2 === 0 ? 'Active' : 'Inactive',
    lastUpdated: new Date(
      Date.now() - Math.random() * 1e10
    ).toISOString().split('T')[0],
  }))
}
