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
  const $tweetIconName = $(`<div class="tweet-icon">  </div`);

  //avaar doesnt show
  const $avatar = $(` <img src=${tweetObj.user.avatars} />`);
  const $tweetName = $(`<div class="tweet-name">${tweetObj.user.name}</div>`);
  const $tweetUserName = $(`<div class="tweet-username">${tweetObj.user.handle}</div>`);
// avoid vulnarability, will pass a string
  const $tweetText = $(`<div class="tweet-text"></div>`);
  const contentElm = $(`<div>${tweetObj.content.text}</div>`);
  $tweetText.append(contentElm.text());


  const $footer = $(`<footer></footer>`);
  const $tweetDaysAgo = $(`<div class="tweet-days-ago">${timeago.format(tweetObj.created_at)}</div>`);
  const $otherIcons = $(`<div><i class="fa-solid fa-flag fa-2xs" style="color: #1151c0;"></i>
    <i class="fa-solid fa-retweet fa-2xs" style="color: #1151c0;"></i>
    <i class="fa-solid fa-heart fa-2xs"style="color: #1151c0;" ></i></div>`);

  $tweet.append($header);
  $tweet.append($tweetText);
  $tweet.append($footer);
  $header.append($tweetIconName, $tweetUserName);
  $tweetIconName.append($avatar, $tweetName);
  $footer.append($tweetDaysAgo, $otherIcons);

  return $tweet;
};

$(document).ready(function() {

  $("form").submit(function(event) {
    event.preventDefault();

    console.log($("#tweet-text").val());
    if ($("#tweet-text").val().length === 0) {
      // const $errorMsg1 = $('form').before('<p>Please type a tweet!</p>')
      // $errorMsg1.slideDown()
      $('.errorMsg1').slideDown();
    } else if ($("#tweet-text").val().length > 140) {
      $('.errorMsg1').slideUp();
      $(".errorMsg2").slideDown();

    } else {
      $('.errorMsg1').slideUp();
      $('.errorMsg2').slideUp();

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
          console.log("HEllo", res);
          loadTweets();

        },
        error: function(err) {
          console.log(err);
        }

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
});


