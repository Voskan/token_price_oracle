import Redis from "ioredis";

const redisClient = new Redis(process.env.REDIS_URI!);

interface Cache {
  get(key: string): Promise<string | null>;
  set(key: string, value: string, ttl: number): Promise<void>;
  del(key: string): Promise<void>;
}

const cache: Cache = {
  /**
   * Get a key from the cache.
   * @param {string} key Key.
   * @returns {Promise<string | null>}
   */
  async get(key: string): Promise<string | null> {
    try {
      const value = await redisClient.get(key);
      return value;
    } catch (err) {
      console.error(`Error getting cache for key ${key}:`, err);
      return null;
    }
  },

  /**
   * Set a key in the cache.
   * @param {string} key Key.
   * @param {string} value Value.
   * @param {number} ttl Time to live in seconds.
   * @returns {Promise<void>}
   */
  async set(key: string, value: string, ttl: number): Promise<void> {
    try {
      await redisClient.set(key, value, "EX", ttl);
    } catch (err) {
      console.error(`Error setting cache for key ${key}:`, err);
    }
  },

  /**
   * Remove a key from the cache.
   * @param {string} key The key to remove.
   * @returns {Promise<void>}
   */
  async del(key: string): Promise<void> {
    try {
      await redisClient.del(key);
    } catch (err) {
      console.error(`Error deleting key ${key} from cache:`, err);
    }
  },
};

export default cache;
