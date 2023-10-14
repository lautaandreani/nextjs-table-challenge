'use client'
import Image from 'next/image'

import { ExtendedUser } from '@/lib/validations'
import { Filter } from './filters'
import { useUserFilters } from '../hooks/useUserFilters'
import { FilterSVG } from './ui/icons'

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
        <table className='w-full'>
          <tbody>
            <tr className='sticky top-0 bg-black'>
              <td className='p-3 text-gray-300 border-b-[0.1px] border-soft_gray'>Name</td>
              <td className='p-3 text-gray-300 border-b-[0.1px] border-soft_gray'>Email</td>
              <td className='p-3 text-gray-300 border-b-[0.1px] border-soft_gray'>Hiring date</td>
              <td className='p-3 text-gray-300 border-b-[0.1px] border-soft_gray'>Country</td>
              <td className='p-3 text-gray-300 border-b-[0.1px] border-soft_gray'>Phone</td>
              <td className='p-3 text-gray-300 border-b-[0.1px] border-soft_gray'>Team</td>
            </tr>
            {filteredUsers.map(({ login, name, picture, email, phone, location, registered, team }) => (
              <tr key={login.uuid}>
                <td className='border-t border-soft_gray p-4 flex gap-2 items-center'>
                  <Image src={picture.thumbnail} alt={name.first} width={20} height={20} className='rounded-full' />
                  {name.first} {name.last}
                </td>
                <td className='border-t border-soft_gray p-4'>{email}</td>
                <td className='border-t border-soft_gray p-4'>
                  {Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(new Date(registered.date))}
                </td>
                <td className='border-t border-soft_gray p-4 gap-2'>
                  <div className='flex gap-2 items-center'>
                    {location.flag && <Image src={location.flag} alt='country flag' height={20} width={20} className='w-6 h-auto' />}
                    {location.country}
                  </div>
                </td>
                <td className='border-t border-soft_gray p-4'>{phone}</td>
                <td className='border-t border-soft_gray p-4'>
                  <div className='flex gap-2'>
                    <span className='bg-light_gray rounded py-1 px-2 text-sm'>{team}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredUsers.length === 0 && existFilterApplied ? (
          <p className='flex justify-center text-md mt-2 text-gray-500'>Not found users</p>
        ) : (
          ''
        )}
      </section>
    </>
  )
}
