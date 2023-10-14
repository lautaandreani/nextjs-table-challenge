import { z } from 'zod'

export const userSchema = z.object({
  name: z.object({
    first: z.string(),
    last: z.string(),
  }),
  email: z.string().email(),
  picture: z.object({
    thumbnail: z.string().url(),
  }),
  registered: z.object({
    date: z.string().datetime(),
  }),
  login: z.object({
    uuid: z.string().uuid(),
  }),
  location: z.object({
    country: z.string(),
  }),
  phone: z.string(),
})

export type User = z.infer<typeof userSchema>

export const extendedUserSchema = userSchema.merge(
  z.object({
    team: z.string(),
    location: z.object({
      ...userSchema.shape.location.shape,
      flag: z.string(),
      altFlag: z.string(),
    }),
  })
)

export type ExtendedUser = z.infer<typeof extendedUserSchema>
