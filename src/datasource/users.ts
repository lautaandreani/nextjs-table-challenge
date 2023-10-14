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
  constructor(user: User) {
    const result = userSchema.safeParse(user)

    if (result.success) {
      this.email = user.email
      this.name = user.name
      this.picture = user.picture
      this.registered = user.registered
      this.login = user.login
      this.location = user.location
      this.phone = user.phone
    } else {
      console.error('User schema validation error:', result.error)
      throw new Error('User schema validation error')
    }
  }
}

export class ExtendUser extends Users implements ExtendedUser {
  team: ExtendedUser['team']
  location!: ExtendedUser['location']
  fullName: ExtendedUser['fullName']
  constructor(user: User) {
    super(user)

    this.team = 'Design'
    this.getUserFlags(user.location).then((location) => {
      console.log(location)
      this.location = location
    })
    this.fullName = this.buildFullName()
    this.registered.date = this.sanitizeHiringDate()
  }

  private getRandomTeam(): string {
    const randomNumber = Math.floor(Math.random() * TEAMS.length)
    return TEAMS[randomNumber]
  }

  private async getUserFlags(userLocation: User['location']): Promise<ExtendUser['location']> {
    const getFlagCountry = await getCountryFlagByName(userLocation.country)
    return { ...userLocation, flag: getFlagCountry.flag, altFlag: getFlagCountry.alt }
  }

  private buildFullName(): string {
    return `${this.name.first} ${this.name.last}`
  }

  private sanitizeHiringDate(): string {
    return Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(new Date(this.registered.date))
  }
}
