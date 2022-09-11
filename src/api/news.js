import request from '@/utils/request'

/**
 *获取文章
 * @param {String |Number} id 频道的id
 * @param {Number} timestamp 请求新的推荐数据传当前的时间戳
 * @returns promise
 */

export const getArticlesAPI = (id, timestamp) => {
  return request({
    url: '/v1_0/articles',
    params: {
      channel_id: id,
      timestamp
    }
  })
}
