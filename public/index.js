$(document).ready(function() {
  function getAllPosts() {
    // Retrieve the posts
    $.get('/posts/', function(postsArray) {
      var htmlString = "";
      for (var i=0; i < postsArray.length; i++) {
        var currentPost = postsArray[i];

        // Extract data
        var currentTitle = currentPost.doc.title;
        var currentContent = currentPost.doc.post;
        var currentId = currentPost.id;

        // Create html string for this post
        var postHtml = "<div class='card' id='" + currentId + "'>" +
          "<h3>" + currentTitle + "</h3>" +
          "<p>" + currentContent + "</p>" +
          "<button class='delete-post'>Delete</button>" +
        "</div>";

        // Append to string we're building
        htmlString = htmlString + postHtml;
      }

      // Change the page
      $("#postsWrapper").html(htmlString);

      $(".delete-post").click(function() {
        var id = $(".delete-post").parent().attr('id');

        $.ajax('/posts/' + id, {
          method: 'DELETE'
        }).done(function() {
          getAllPosts();
        });
      });
    });
  }

  getAllPosts();

  // Handle form submission
  $("#post-submit").click(function(e) {
    // Prevent form refresh
    e.preventDefault();

    var titleText = $("#title").val();
    var postText = $("#post").val();

    $.post('/posts/', {
      title: titleText,
      post: postText,
    }, function() {
      getAllPosts();
    });
  });

});
