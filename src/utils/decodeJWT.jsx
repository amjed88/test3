import jwtdecode from 'jwt-decode'
import dayjs from 'dayjs'

export const decodeJWT = token => {
    return new Promise((done, fail) => {
        try {
            if (!token) return null
            let { exp, sub: { username } } = jwtdecode(token)
            if (dayjs().unix() >= exp) {
                return fail("Token expired")
            }
            return done({ username })
        } catch (err) {
            return fail(err)
        }
    })
}