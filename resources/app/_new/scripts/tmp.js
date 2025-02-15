// tmp
// とりあえずちょっと動いてくれないとやりづらかったので書いた
// 開くとか切り替えるとかそういうのばっかりです
// とりあえず動いてるだけなんで綺麗に動くようにしてあげてください……

// メインカラムの検索ボックス開閉とそれにあわせてコンポーネントの頭上げ下げする
$('.tb-i-search').click(function() {
  if($('.tb-main-search-box').hasClass('active')) {
    $.when(
      $('.tb-main-search-box').slideUp(30).removeClass('active')
    ).done(
      $('.tb-main-body').animate({top:'42px'},30).removeClass('search-on')
    );
  } else {
    $.when(
      $('.tb-main-search-box').slideDown(30).addClass('active')
    ).done(
      $('.tb-main-body').animate({top:'84px'},30).addClass('search-on')
    );
    $('.tb-main-search-box').find(".search_text").focus();
  }
  
});

// メインカラムの選択中の切り替え
/*
$('.tb-main-cpn').click(function() {
  if(!$(this).hasClass('active')) {
    $('.tb-main-cpn.active').removeClass('active');
    $(this).addClass('active');
    $('.tb-prm-block').removeClass('active');
    if($(this).data('cpn')) {
      var cpn = $(this).data('cpn');
      if(!$('[data-prm=' + cpn + ']').hasClass('active')) {
        $('[data-prm=' + cpn + ']').addClass('active');
      }
    }
  }
});
*/

// メインカラムのコンポーネント全部開閉
/*
$('.tb-main-header [class^=tb-i-chevron-]').click(function() {
  if($(this).hasClass('tb-i-chevron-down')) {
    var cpn = $('.tb-main-body .cpn-header-nav .tb-i-chevron-down');
    cpn.closest('.tb-main-cpn').addClass('open');
    cpn.addClass('tb-i-chevron-up').removeClass('tb-i-chevron-down').attr('title','閉じる');
    $(this).addClass('tb-i-chevron-up').removeClass('tb-i-chevron-down').attr('title','すべて閉じる');
  } else {
    var cpn = $('.tb-main-body .cpn-header-nav .tb-i-chevron-up');
    cpn.closest('.tb-main-cpn').removeClass('open');
    cpn.addClass('tb-i-chevron-down').removeClass('tb-i-chevron-up').attr('title','開く');
    $(this).addClass('tb-i-chevron-down').removeClass('tb-i-chevron-up').attr('title','すべて開く');
  }
});
*/

// メインカラムのコンポーネント開閉（一個ずつ）
/*
$('.cpn-header-nav [class^=tb-i-chevron-]').click(function() {
  if($(this).hasClass('tb-i-chevron-up')) {
    $(this).closest($('.tb-main-cpn.open')).removeClass('open');
    $(this).addClass('tb-i-chevron-down').removeClass('tb-i-chevron-up').attr('title','開く');
  } else {
    $(this).closest($('.tb-main-cpn')).addClass('open');
    $(this).addClass('tb-i-chevron-up').removeClass('tb-i-chevron-down').attr('title','閉じる');
  }
});
*/



// 左カラムのコンポーネント開閉
