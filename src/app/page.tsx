import { getUsers } from '@/api/api'
import DataDisplay from '@/components/data-display'

export default async function Home() {
  const users = await getUsers()

  return (
    <>
      <main className='flex  gap-4 items-start min-w-[70%] max-w-[70%] mx-auto my-6 relative w-[70%]'>
        <DataDisplay users={users} />
      </main>
    </>
  )
}
