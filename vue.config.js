// 該檔案生成的方式可以在 Vue Ui 中的「設定」->「Vue Cli」->「公開路徑」找到。
const path = require('path')
function resolve (dir) {
  return path.join(__dirname, '.', dir)
}

module.exports = {
  // 預設狀況下，部署到 GitHub Pages 可能會無法顯示畫面
  // 因此需要多設置該屬性
  // 官方文件：https://cli.vuejs.org/zh/config/#publicpath
  publicPath: './',
  chainWebpack: config => {
    // 先刪除預設的svg配置
    config.module.rules.delete('svg')
    // 新增 svg-sprite-loader 設定
    config.module
      .rule('svg-sprite-loader')
      .test(/\.svg$/)
      .include
      .add(resolve('src/assets/icon'))
      // .add(resolve('src/components/svg-icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({ symbolId: '[name]' })
    // 修改 images-loader 配置
    config.module
      .rule('images')
      // .exclude.add(resolve('src/components/svg-icons'))
      .exclude.add(resolve('src/assets/icon'))
  }
}
