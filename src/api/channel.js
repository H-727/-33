import request from '@/utils/request'

export const getChannelAPI = () => {
  return request({
    url: '/v1_0/user/channels'
  })
}
export const getAllChannelAPI = () => {
  return request({ url: '/v1_0/channels' })
}

export const getDelChannelAPI = (id) => {
  return request({
    url: `/v1_0/user/channels/${id}`,
    method: 'DELETE'
  })
}

export const AddChannelAPI = (id, seq) => {
  return request({
    url: '/v1_0/user/channels/',
    method: 'PATCH',
    data: {
      channels: [{ id, seq }]
    }
  })
}
