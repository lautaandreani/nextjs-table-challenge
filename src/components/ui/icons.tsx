export function ChevronDown() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      className='ml-2 h-4 w-4'
    >
      <polyline points='6 9 12 15 18 9'></polyline>
    </svg>
  )
}

export function FilterSVG() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='20'
      height='20'
      fill='none'
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      className='icon icon-tabler icon-tabler-filter'
      viewBox='0 0 24 24'
    >
      <path stroke='none' d='M0 0h24v24H0z'></path>
      <path d='M4 4h16v2.172a2 2 0 01-.586 1.414L15 12v7l-6 2v-8.5L4.52 7.572A2 2 0 014 6.227V4z'></path>
    </svg>
  )
}
