const cache = new Map();

const CACHE_TTL = 60 * 1000;

function cacheMiddleware(req, res, next) {
    const key = req.originalUrl;

    const cached = cache.get(key);

    if (cached) {
        const age = Date.now() - cached.createdAt;

        if (age < CACHE_TTL) {
            res.set("X-Cache", "HIT");
            return res.json(cached.data);
        }

        cache.delete(key);
    }

    res.set("X-Cache", "MISS");

    const originalJson = res.json.bind(res);

    res.json = function(data) {
        if (res.statusCode >= 200 && res.statusCode < 300) {
            cache.set(key, {
                data: data,
                createdAt: Date.now()
            });
        }

        return originalJson(data);
    };

    next();
}

function invalidateCache(req, res, next) {
    const originalJson = res.json.bind(res);

    res.json = function(data) {
        if (res.statusCode >= 200 && res.statusCode < 300) {
            cache.clear();
        }

        return originalJson(data);
    };

    next();
}

module.exports = {
    cacheMiddleware,
    invalidateCache
};