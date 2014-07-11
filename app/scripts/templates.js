Templates = {};

Templates.score = [
 "<% _.each(earningsData, function(earningsData, index , list) { %>",
"<div data-entryid=\"<%= earningsData._id %>\"class=\"scoreItem\">", 
	"<ul class=\"totalScore\">",
		"<li>Date: <span class=\"date\"><%= earningsData.Date %></span></li>",
		"<li>Hourly Wage: <span class=\"wage\"><%= earningsData.Hourly %></span></li>",
		"<li>Medal: <span class=\"medal\"><%= earningsData.Medal %></span></li>",
		"<li>Remainder:<span class=\"remainder\"><%= earningsData.Remainder%></span></li>",
	"</ul>",
// "<button type=\"button\" class=\"btn btn-primary btn-xs\">Add Entry</button>",

"</div>",
"<br>",
"<% }); %>"

].join("\n");

Templates.scoreCurrent = [

"<div class=\"totalScore\">", 
	"<ul class=\"totalScore\">",
		"<li>Date: <%= earningsObj.Date %></li>",
		"<li>Hourly Wage: <%= earningsObj.Hourly %></li>",
		"<li>Medal: <%= earningsObj.Medal %></li>",
		"<li>Remainder: <%= earningsObj.Remainder %></li>",
	"</ul>",
"</div>"

].join("\n");


Templates.modal = [
	"<div class=\"modal-body\">",
      "<div class=\"form-group\">",
          "<label for=\"editPostTitle\">Edit Title</label>",
          "<input type=\"text\" class=\"form-control editPostTitle\" id=\"editPostTitle\" value=\"<%= post.title %>\">",
      "</div>",
      "<div class=\"form-group\">",
          "<label for=\"editAuthorPostForm\">Author of Post</label>",
          "<input type=\"text\" class=\"form-control editAuthorPostForm\" id=\"authorPostForm\" value=\"<%= post.author %>\">",
      "</div>",
      "<div class=\"form-group\">",
        "<label for=\"editContentForm\">Post</label>",
        "<textarea id=\"editContentForm\" class=\"form-control editContentForm\"><%= post.content %></textarea>",
        "<p class=\"help-block\">Example block-level help text here.</p>",
      "</div>",
  "</div>",
  "<div class=\"modal-footer\" data-postId=\"<%= post._id %>\">",
  	"<input id=\"editPostId\" type=\"hidden\" value=\"<%= post._id %>\">",
    "<button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>",
    "<button type=\"button\" class=\"btn btn-primary submitUpdatePost\">Save changes</button>",
  "</div>"
].join("\n");
