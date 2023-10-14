'use client'

import { ExtendedUser } from '@/lib/validations'
import { Filter } from './filters'
import { useUserFilters } from '../hooks/useUserFilters'
import { FilterSVG } from './ui/icons'
import { UserTable } from './users-table'

type Props = {
  users: ExtendedUser[]
}

export function DataDisplay({ users }: Props) {
  const { filteredUsers, filters, filterChildren, existFilterApplied, resetFilters, updateFilter } = useUserFilters(users)

  return (
    <>
      <aside className='flex flex-col gap-2 items-center sticky top-2'>
        <span className='flex text-sm w-full gap-2'>
          <FilterSVG />
          Filters
        </span>
        <hr className='border border-soft_gray w-full' />
        <div className='flex flex-col'>
          {Object.keys(filters).map((filterType) => (
            <Filter label={`By ${filterType}`} key={filterType}>
              {filterChildren[filterType as keyof typeof filterChildren].map((filterValue) => (
                <div className='flex gap-2' key={filterValue}>
                  <input
                    type='checkbox'
                    id={filterValue}
                    className='cursor-pointer flex text-light_gray ring-transparent focus:ring-0 focus-within:ring-offset-0 rounded bg-transparent border-soft_gray focus:ring-offset-0 active:ring-offset-0'
                    onChange={() => updateFilter(filterType, filterValue)}
                    value={filterValue}
                    checked={filters[filterType].some((filter) => filter === filterValue)}
                  ></input>
                  <label htmlFor={filterValue}>{filterValue}</label>
                </div>
              ))}
            </Filter>
          ))}
        </div>
        {existFilterApplied && (
          <button onClick={resetFilters} className='text-xs text-red-400 bg-red-500/25 w-full py-2 rounded-md transition'>
            Clear filters ✕
          </button>
        )}
      </aside>
      <section className='w-full'>
        <UserTable users={filteredUsers} />
        {filteredUsers.length === 0 && existFilterApplied ? (
          <p className='flex justify-center text-md mt-2 text-gray-500'>Not found users</p>
        ) : (
          ''
        )}
      </section>
    </>
  )
}
