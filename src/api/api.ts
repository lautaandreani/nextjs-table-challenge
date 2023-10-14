import { User, userSchema } from '@/lib/validations'

const BASE_URL = 'https://randomuser.me/api'
const COUNTRY_URL = 'https://restcountries.com/v3.1/name'

export async function getUsers() {
  const response = await fetch(`${BASE_URL}?results=50`)

  if (!response.ok) throw new Error('Failed to fetch users')

  const { results } = (await response.json()) as { info: any; results: User[] }

  if (results.map((user) => userSchema.safeParse(user).success)) return results
  else throw new Error('Failed to validate users response')
}

export async function getCountryFlagByName(country: string) {
  const response = await fetch(`${COUNTRY_URL}/${country}`)

  if (!response.ok) throw new Error('Failed to fetch country data')

  const countryFlag = await response.json()

  return {
    flag: countryFlag[0].flags.svg,
    alt: countryFlag[0].flags.alt,
  }
}
