$(document).on('turbolinks:load', function() {

  var search_list = $("#user-search-result");

  function appendUser(user){
    var html = `<div class="chat-group-user clearfix">
                 <p class="chat-group-user__name">
                  ${user.name}
                 </p>
                 <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
                </div>`
    search_list.append(html);
  }
  $(document).on("keyup","#user-search-field", function(e) {
    e.preventDefault();
    var input = $("#user-search-field").val();

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })

    .done(function(users) {
      $("#user-search-result").empty();
      users.forEach(function(user){
        appendUser(user);
      });
    })
    .fail(function(){
      alert('ユーザー検索に失敗しました');
    })
  });

  var result_list = $("#chat-group-users")

  function addUser(name, id){
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                  <input name='group[user_ids][]' type='hidden' value='${id}'>
                  <p class='chat-group-user__name'>${name}</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>`
    result_list.append(html);
  }

  $("#user-search-result").on("click", ".chat-group-user__btn--add", function() {
    var name = $(this).data("user-name")
    var id = $(this).data("user-id")
    addUser(name, id);
    $(this).parent().remove();
  });

  $(".chat-group-form").on("click", ".chat-group-user__btn--remove", function() {
    $(this).parent().remove();
  });
});
