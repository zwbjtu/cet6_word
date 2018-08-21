/**
 * 小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
var host = 'https://uwfsgfrn.qcloud.la';
// var host = 'https://280142242.mokao100.cn';
//debug openid https://280142242.mokao100.cn/weapp/get_scoreinfo?openId=oybxV46KRzhumeVBDWczTLP3wtcA
 
var config = {   
    
    // 下面的地址配合云端 Demo 工作
    service: { 
        host,
        appid: 'wx74ea43dd24dd8874',
        // 登录地址，用于建立会话
        loginUrl: `${host}/weapp/login?app_type=cet6`,

        // 获取考题分类及子类
      requestCategory: `${host}/weapp/get_category?app_type=cet6`,

        // 获取练习分类及子类
      requestStudyCategory: `${host}/weapp/get_category?type=1&app_type=cet6`,

        // 获取对战分类及子类
      requestPKCategory: `${host}/weapp/get_category?type=2&app_type=cet6`,

        // 获取考题列表
      requestQuestionList: `${host}/weapp/get_question_detail?app_type=cet6`,
      
        // 获取用户科目排名列表
      getRankingList: `${host}/weapp/get_category_ranking?app_type=cet6`,

        // 获取全球排名列表
      getWorldRankingList: `${host}/weapp/get_ranking_list?app_type=cet6`,

        // 获取用户积分,排名接口
      getScoreInfo: `${host}/weapp/get_scoreinfo?app_type=cet6`,

        // 上传积分更新接口
      updateScoreInfo: `${host}/weapp/update_scoreinfo?app_type=cet6`,

        // 获取积分规则
      getLevelRule: `${host}/weapp/get_level_rule?app_type=cet6`,

        // 解密数据
      getDecodeData: `${host}/weapp/get_decode_data?app_type=cet6`,

        // 测试的信道服务地址
      tunnelUrl: `${host}/weapp/tunnel?app_type=cet6`,

        // 上传图片接口
      uploadUrl: `${host}/weapp/upload?app_type=cet6`,

        // 获取Gid
      getGID: `${host}/weapp/getGId?app_type=cet6`,
    }
};

module.exports = config;