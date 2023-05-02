const renderTweets = function(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  for (const tweet of tweets) {
    const $tweetEl = createTweetElement(tweet);
    $(".all-tweets").prepend($tweetEl);
  }
};

const createTweetElement = (tweetObj) => {

  const $tweet = $(`<article class="tweet"></article>`);
  const $header = $(`<header></header>`);
  const $tweetIconName = $(`<div class="tweet-icon"></div`);

  const $avatar = $(` <img src=${tweetObj.user.avatars} />`);
  const $tweetName = $(`<div class="tweet-name">${tweetObj.user.name}</div>`);
  const $tweetUserName = $(`<div class="tweet-username">${tweetObj.user.handle}</div>`);
  // avoid vulnarability, will pass a string
  const $tweetText = $(`<div class="tweet-text"></div>`);
  const contentElm = $(`<div>${tweetObj.content.text}</div>`);
  $tweetText.append(contentElm.text());
  $(".name").text(tweetObj.user.name);

  const $footer = $(`<footer></footer>`);
  const $tweetDaysAgo = $(`<div class="tweet-days-ago">${timeago.format(tweetObj.created_at)}</div>`);
  const $otherIcons = $(`<div><i class="fa-solid fa-flag fa-2xs icon" style="color: #1151c0;"></i>
    <i class="fa-solid fa-retweet fa-2xs icon" style="color: #1151c0;"></i>
    <i class="fa-solid fa-heart fa-2xs icon"style="color: #1151c0;" ></i></div>`);

  $tweet.append($header);
  $tweet.append($tweetText);
  $tweet.append($footer);
  $header.append($tweetIconName, $tweetUserName);
  $tweetIconName.append($avatar, $tweetName);
  $footer.append($tweetDaysAgo, $otherIcons);

  return $tweet;
};

$(document).ready(function() {

  //bounce icon on hover
  $('.fa-angles-down').hover(function() {
    $(this).addClass('fa-bounce');
  }, function() {
    $(this).removeClass('fa-bounce');
  });

  $("form").submit(function(event) {
    event.preventDefault();
    //show arror messages if empty field of too many chars
    if ($("#tweet-text").val().length === 0) {

      $('.errorMsg1').slideDown();

    } else if ($("#tweet-text").val().length > 140) {

      $('.errorMsg1').slideUp();
      $(".errorMsg2").slideDown();

    } else {

      $('.errorMsg1').slideUp();
      $('.errorMsg2').slideUp();
      //if no errors post the tweet
      let formData = $(this).serialize();
      $.ajax({
        type: "POST",
        url: "/tweets",
        data: formData,
        success: function(res) {
          //clear field
          $("textarea").val("");
          //set char count 140
          $(".counter").text(140);

          loadTweets();
        },
      });
    }
  });

  //display the new tweets
  const loadTweets = () => {
    $.ajax({
      url: "/tweets",
      type: 'GET',

    }).then(res => {
      //empties the html, prevents from refreshing the page
      $(".all-tweets").empty();
      renderTweets(res);
    });
  };
  loadTweets();
  //show form on click and place cursor in textarea
  $(".arrow-button").click(function() {
    $('.new-tweet').slideToggle();
    $("#tweet-text").focus();
  });
  //action on scrolling
  $(window).scroll(function() {
    //changes when scrolling down
    if ($(document).scrollTop() > 50) {
      $(".buttonUp").css("display", "inline");
      const $containerWidth = $(window).width();
      //check the width of the screen for responsive design
      if ($containerWidth <= 1024) {
        $(".write-tweet").css("display", "none");
      }
      if (($containerWidth > 1025)) {
        return;
      }
      //changes when scrolling up
    } else {
      $(".buttonUp").addClass(".display-off");
      $(".write-tweet").css("display", "flex");
    }
  });
  //scroll up on click
  $('.buttonUp').click(function() {
    $('html, body').animate({ scrollTop: 0 }, 800);
    return false;
  });
});