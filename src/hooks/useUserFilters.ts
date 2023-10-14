import { useState } from 'react'

import { TEAMS } from '@/lib/constants'
import { ExtendedUser } from '@/lib/validations'

export const useUserFilters = (users: ExtendedUser[]) => {
  const [filters, setFilters] = useState<Record<string, string[]>>({
    team: [],
    country: [],
  })

  const existFilterApplied = Object.keys(filters).some((filterType) => filters[filterType].length > 0)
  const usersCountries = Array.from(new Set(users.map((user) => user.location.country)))

  const filterChildren = {
    team: TEAMS,
    country: usersCountries,
  } as const

  const resetFilters = () => {
    const resetToInitialValue = Object.fromEntries(Object.keys(filters).map((key) => [key, []]))
    setFilters(resetToInitialValue)
  }

  const updateFilter = (filterType: string, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: prevFilters[filterType].includes(value)
        ? prevFilters[filterType].filter((filterValue) => filterValue !== value)
        : [...prevFilters[filterType], value],
    }))
  }

  const filterUsers = (user: ExtendedUser) => {
    return Object.keys(filters).every((filterType) => {
      if (filters[filterType].length === 0) {
        return true
      }

      if (filterType === 'team') {
        return filters[filterType].includes(user.team)
      } else if (filterType === 'country') {
        return filters[filterType].includes(user.location.country)
      }
    })
  }

  const filteredUsers = existFilterApplied ? users.filter(filterUsers) : users

  return {
    filteredUsers,
    filters,
    filterChildren,
    existFilterApplied,
    resetFilters,
    updateFilter,
  }
}
