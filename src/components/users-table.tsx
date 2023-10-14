import { ExtendedUser } from '@/lib/validations'
import Image from 'next/image'

type Props = {
  users: ExtendedUser[]
}

export function UserTable({ users }: Props) {
  return (
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
        {users.map(({ login, name, picture, email, phone, location, registered, team }) => (
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
  )
}
