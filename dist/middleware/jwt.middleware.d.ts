import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { CacheService } from 'services/cache.service';
export declare class JwtMiddleware implements NestMiddleware {
    private readonly jwtService;
    private cacheService;
    constructor(jwtService: JwtService, cacheService: CacheService);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
