import request from '@/utils/request'

/**
 *
 * @param {String} mobile 手机号
 * @param {String} code 验证码
 * @returns Promise
 */

export const login = (mobile, code) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: {
      mobile,
      code
    }
  })
}

/**
 *
 * @param {string} mobile 手机号
 * @returns Promise
 */
export const sendCodeApi = (mobile) => {
  return request({
    url: '/v1_0/sms/codes/' + mobile
  })
}

/**
 * 获取用户信息
 * @param {String} token 用户token值
 * @returns Promise
 */
export const getUserIofoApi = (token) => {
  return request({
    url: '/v1_0/user',
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
}
