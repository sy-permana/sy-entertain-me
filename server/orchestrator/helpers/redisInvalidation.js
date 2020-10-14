const redis = require('../config/redis')

const redisInvalidation = async (service, type, payload) => {
  switch (type) {
    case 'create': {
        try {
          const data = await redis.get(service)
          const newData = JSON.parse(data).concat(payload)
          await redis.set(service, JSON.stringify(newData))
        } catch (error) {
          await redis.del(service)
        }
    }
    default: {
      await redis.del(service)
    }
  }
}

module.exports = redisInvalidation