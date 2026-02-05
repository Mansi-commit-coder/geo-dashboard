import { useEffect, useMemo, useState } from 'react'
import { fetchGeoData } from '../api/geoService'

const PAGE_SIZE = 50

export const useGeoData = () => {
  const [rawData, setRawData] = useState([])
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(0)
  const [selectedId, setSelectedId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [sortKey, setSortKey] = useState('projectName')
  const [sortOrder, setSortOrder] = useState('asc')

  // Fetch data
  useEffect(() => {
    setLoading(true)
    setError(null)

    fetchGeoData()
      .then(data => setRawData(data))
      .catch(() => setError('Failed to load data'))
      .finally(() => setLoading(false))
  }, [])

  // 🔍 Filter
  const filteredData = useMemo(() => {
    return rawData.filter(item =>
      item.projectName.toLowerCase().includes(search.toLowerCase())
    )
  }, [rawData, search])

  // 🔃 Sort (with natural sorting for Project names)
  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      const valA = a[sortKey]
      const valB = b[sortKey]

      if (valA == null || valB == null) return 0

      // ✅ Natural sort for "Project X"
      if (sortKey === 'projectName') {
        const numA = parseInt(valA.replace(/\D/g, ''), 10)
        const numB = parseInt(valB.replace(/\D/g, ''), 10)

        return sortOrder === 'asc'
          ? numA - numB
          : numB - numA
      }

      // String sort
      if (typeof valA === 'string') {
        return sortOrder === 'asc'
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA)
      }

      // Number sort
      return sortOrder === 'asc' ? valA - valB : valB - valA
    })
  }, [filteredData, sortKey, sortOrder])

  // 📄 Pagination
  const paginatedData = useMemo(() => {
    const start = page * PAGE_SIZE
    return sortedData.slice(start, start + PAGE_SIZE)
  }, [sortedData, page])

  const totalPages = Math.ceil(filteredData.length / PAGE_SIZE)

  // Reset page when filters/sort change
  useEffect(() => {
    setPage(0)
  }, [search, sortKey, sortOrder])

  return {
    data: paginatedData,
    total: filteredData.length,
    totalPages,
    page,
    setPage,
    PAGE_SIZE,
    search,
    setSearch,
    sortKey,
    setSortKey,
    sortOrder,
    setSortOrder,
    selectedId,
    setSelectedId,
    loading,
    error,
  }
}
