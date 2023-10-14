'use client'

type Props = {
  children: JSX.Element | JSX.Element[]
  label: string
} & React.HTMLAttributes<HTMLDivElement>

export function Filter({ children, label, ...props }: Props) {
  return (
    <div className='relative group' {...props}>
      <label className='flex items-center text-sm rounded-md px-2 py-1'>{label}</label>
      <div className='flex flex-col gap-1 text-sm py-2 pr-3 pl-4 rounded-md top-8 w-fit truncate'>{children}</div>
    </div>
  )
}
