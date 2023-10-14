import { getCountryFlagByName, getUsers } from '@/api/api'
import { DataDisplay } from '@/components/data-display'
import { TEAMS } from '@/lib/constants'
import { User } from '@/lib/validations'

export default async function Home() {
  const users = await getUsers()

  const fetchCountryFlags = async (user: User) => {
    const getFlagCountry = await getCountryFlagByName(user.location.country)
    return { ...user, location: { ...user.location, flag: getFlagCountry.flag, altFlag: getFlagCountry.alt } }
  }

  const userFlagsPromises = users.map((user) => fetchCountryFlags(user))
  const userFlags = await Promise.all(userFlagsPromises)
  const addUserRandomTeam = userFlags.map((user) => {
    const randomNumber = Math.floor(Math.random() * TEAMS.length)
    return {
      ...user,
      team: TEAMS[randomNumber],
    }
  })

  return (
    <>
      <main className='flex  gap-4 items-start min-w-[70%] max-w-[70%] mx-auto my-6 relative w-[70%]'>
        <DataDisplay users={addUserRandomTeam} />
      </main>
    </>
  )
}
