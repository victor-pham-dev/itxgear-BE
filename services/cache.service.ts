import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Inject } from '@nestjs/common'
import { Cache } from 'cache-manager'
import { tokenExpireTime } from 'configs/app-config'

export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  authToken = (userId: number) => {
    return `auth-$${userId}`
  }

  async setAuthToken(userId: number, token: string) {
    const data = await this.cacheManager.set(
      this.authToken(userId),
      token,
      tokenExpireTime,
    )
    return data
  }

  async deleteAuthToken(userId: number) {
    await this.cacheManager.del(this.authToken(userId))
  }

  async getAuthToken(userId: number) {
    const data = await this.cacheManager.get(this.authToken(userId))
    return data
  }
}
