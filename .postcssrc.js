// module.exports = {
//   plugins: {
//     'postcss-pxtorem': {
//       rootValue: 37.5,
//       propList: ['*']
//     }
//   }
// }
const pxToRem = require('postcss-pxtorem')
module.exports = {
  plugins: [
    pxToRem({
      rootValue: ({ file }) => (/vant/.test(file) ? 37.5 : 75),
      propList: ['*']
    })
  ]
}
