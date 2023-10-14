import { getCountryFlagByName } from '@/api/api'
import { TEAMS } from '@/lib/constants'
import { ExtendedUser, User, extendedUserSchema, userSchema } from '@/lib/validations'

export class Users implements User {
  email: User['email']
  name: User['name']
  picture: User['picture']
  registered: User['registered']
  login: User['login']
  location: User['location']
  phone: User['phone']
  constructor(data: User) {
    const result = userSchema.safeParse(data)

    if (result.success) {
      this.email = data.email
      this.name = data.name
      this.picture = data.picture
      this.registered = data.registered
      this.login = data.login
      this.location = data.location
      this.phone = data.phone
    } else {
      console.error('User schema validation error:', result.error)
      throw new Error('Schema Validation error:')
    }
  }
}

export class ExtendUser extends Users implements ExtendedUser {
  team: ExtendedUser['team']
  location: ExtendedUser['location']
  constructor(data: User) {
    super(data)

    this.team = this.getUserTeam()
    this.getUserFlags(data.location).then((location) => {
      this.location = location
    })
  }

  private getUserTeam(): string {
    const randomNumber = Math.floor(Math.random() * TEAMS.length)
    return TEAMS[randomNumber]
  }

  private async getUserFlags(userLocation: User['location']) {
    const getFlagCountry = await getCountryFlagByName(userLocation.country)
    return { ...userLocation, flag: getFlagCountry.flag, altFlag: getFlagCountry.alt }
  }
}
