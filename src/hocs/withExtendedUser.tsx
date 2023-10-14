'use client'

import { DataDisplay } from '@/components/data-display'
import { ExtendUser, Users } from '@/datasource/users'
import { ComponentType } from 'react'

function withExtendUsers<TProps>(WrappedComponent: ComponentType<TProps>) {
  return function WithExtendUsers(props: TProps & { users: Users[] }) {
    const parsedUsers = props.users.map((user) => new ExtendUser(user))
    return <WrappedComponent {...props} users={parsedUsers} />
  }
}

const DataDisplayWithExtendedUser = withExtendUsers<any>(DataDisplay)

export default DataDisplayWithExtendedUser
