
// メニュー画面にコンフィグへの遷移ボタンと画面サイズ切り替えボタンを設置
// スクリプト参照元「りまねの縦書き小説」さま（https://rimane-novels.net/）

var myobj = {

  // コンフィグ画面遷移用のオブジェクト
  config: function() {
    if (tyrano.plugin.kag.tmp.sleep_game != null) {
      return false;
    }
    tyrano.plugin.kag.ftag.startTag("sleepgame", {
      storage: "../others/plugin/theme_kopanda_12/config.ks",
      next: false
    });
    setTimeout(function() {
      $('.layer.layer_menu').css({
        'display': 'none'
      });
    }, 300);
  },
};

//----------------------------------------------------------------------------

// 近似値を取得する関数
replaceCurrentValue = function(value, array){

  var value = value;
  var array = array;
  var diff  = [];
  var index = 0;

  $(array).each(function(i, val){
    diff[i] = Math.abs(value - val);
    index   = (diff[index] < diff[i] ? index : i);
  });

    return array[index];
}
