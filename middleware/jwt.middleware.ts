// jwt.middleware.ts
import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['x-access-token'] as string | undefined
    const originUrl = req.originalUrl

    if (token) {
      try {
        const decoded = this.jwtService.verify(token)

        if (
          !decoded?.roles?.some(
            (role: string) => originUrl?.includes(`/${role}`),
          ) &&
          !originUrl.includes('/auth/me')
        ) {
          throw new UnauthorizedException('No permission')
        }

        req['user'] = decoded
      } catch (error) {
        throw new UnauthorizedException('Invalid token')
      }
    }

    next()
  }
}