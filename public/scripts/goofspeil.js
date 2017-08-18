$(document).ready(function(){
  $('.player-card-deck').on('click', function() {
    $(this).animate({
      opacity: 0
    }).removeClass('.player-card-deck');
  })
})

$(document).ready(function(){
    $(".player-card-deck").click(function(){
        $(this).hide(".player-card-deck");
       /* .appendTo(".prize");*/
    });
});

$(document).ready(function() {
  var app = {
    cards: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
    init: function() {
      app.shuffle();
    },
    shuffle: function() {
      var random = 0;
      var temp = 0;
      for (i = 1; i < app.cards.length; i++) {
        random = Math.round(Math.random() * i);
        temp = app.cards[i];
        app.cards[i] = app.cards[random];
        app.cards[random] = temp;
      }
      app.assignCards();
      console.log('Shuffled Card Array: ' + app.cards);
    },
    assignCards: function() {
      $('.card-prize-table').each(function(index) {
        $(this).attr('.card-prize-table', app.cards[index]);
      });
      app.clickHandlers();
    },
    clickHandlers: function() {
      $('.player-card-deck').on('click', function() {
        $(this).html('<p>' + $(this).data('cardValue') + '</p>').addClass('selected');
        app.checkMatch();
      });
    },
    checkMatch: function() {
      if ($('.selected').length === 2) {
        if ($('.selected').first().data('cardValue') == $('.selected').last().data('cardValue')) {
          $('.selected').each(function() {
            $(this).animate({
              opacity: 0
            }).removeClass('unmatched');
          });
          $('.selected').each(function() {
            $(this).removeClass('selected');
          });
          app.checkWin();
        } else {
          setTimeout(function() {
            $('.selected').each(function() {
              $(this).html('').removeClass('selected');
            });
          }, 1000);
        }
      }
    },
    checkWin: function() {
      if ($('.unmatched').length === 0) {
        $('.container').html('<h1>You Won!</h1>');
      }
    }
  };
  app.init();
});
