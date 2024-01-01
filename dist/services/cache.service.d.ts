import { Cache } from 'cache-manager';
export declare class CacheService {
    private cacheManager;
    constructor(cacheManager: Cache);
    authToken: (userId: number) => string;
    setAuthToken(userId: number, token: string): Promise<void>;
    deleteAuthToken(userId: number): Promise<void>;
    getAuthToken(userId: number): Promise<unknown>;
}
