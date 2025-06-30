import jwt from 'jsonwebtoken'

export interface JWTPayload{
  email: string 
}

const secret = process.env.JWT_SECRET!
if (!secret) {
  throw new Error('JWT_SECRET environment variable is not defined!');
}

export function createJWT(payload: object) {
  return jwt.sign(payload, secret, { expiresIn: '7d' })
}

export function verifyJWT(token: string): JWTPayload | null {
  try {
    const decoded = jwt.verify(token, secret) as JWTPayload;
    return decoded;
  } catch(error) {
    console.error('JWT verification failed:', (error as Error).message)
    return null
  }
}
