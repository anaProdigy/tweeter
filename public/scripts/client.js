const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];
const renderTweets = function(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container

  for (const tweet of tweets) {
    const $tweetEl = createTweetElement(tweet);
    $(".all-tweets").append($tweetEl);
  }
};

const createTweetElement = (tweetObj) => {
  const $tweet = $(`<article class="tweet"></article>`);
  const $header = $(`<header></header>`);
  const $tweetIconName = $(`<div class="tweet-icon">  </div`);

  //avaar doesnt show
  const $icon = $(` <img src=${tweetObj.user.avatars} />`);
  const $tweetName = $(`<div class="tweet-name">${tweetObj.user.name}</div>`);
  const $tweetUserName = $(`<div class="tweet-username">${tweetObj.user.handle}</div>`);

  const $tweetText = $(`<div class="tweet-text">${tweetObj.content.text}</div>`);

  const $footer = $(`<footer></footer>`);
  const $tweetDaysAgo = $(`<div class="tweet-days-ago">${tweetObj.created_at} days ago</div>`);
  const $otherIcons = $(`<div><i class="fa-solid fa-flag fa-2xs" style="color: #1151c0;"></i>
    <i class="fa-solid fa-retweet fa-2xs" style="color: #1151c0;"></i>
    <i class="fa-solid fa-heart fa-2xs"style="color: #1151c0;" ></i></div>`);

  $tweet.append($header);
  $tweet.append($tweetText);
  $tweet.append($footer);
  $header.append($tweetIconName, $tweetUserName);
  $tweetIconName.append($icon, $tweetName);
  $footer.append($tweetDaysAgo, $otherIcons);


  return $tweet;
};

$(document).ready(function() {
  renderTweets(data);

  $("form").submit(function(event) {
    event.preventDefault();

    //console.log($(this).serialize());
    let formData = $(this).serialize();

    $.ajax({
      type: "POST",
      url: "/tweets",
      data: formData,
      success: function(res) {
        $("textarea").val("")
        $(".counter").text(140)
        //clear field
        //set char count 140
        //display the new tweets
        //clear errors
        console.log("HEllo", res)
      },
      error: function (err) {
        console.log(err)
      }
    });

   

  });
});


