$(function(){
  function buildHTML(message){
    message.image == null ? image_html = `` : image_html = `<div class = "lower-message"><img src ="${message.image}" width="120" height="180"}</div>`
    var html = `<div class="message" data-message-id="${message.id}">
                  <div class="upper-message">
                    <div class="upper-message__user-name">
                      ${message.name}
                    </div>
                    <div class="upper-message__date">
                      ${message.created_at}
                    </div>
                  </div>
                  <div class="lower-message">
                    <p class=lower-message__content>${message.text}</p>
                    ${image_html}
                  </div>
                </div>`
    return html;
  }

  function update(){
    var message_id = $(".message").last().data("message-id");
    $.ajax({
      url: location.href,
      type: 'GET',
      data: {
        id: message_id },
        dataType: 'json'
    })
    .done(function(data){
      data.forEach(function(a){
        var html = buildHTML(a);
        $('.messages').append(html)
        $('.form__mask__image').val('');
        $('.form__message').val('');
        $(".form__submit").attr('disabled', false);
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      });
    });
  }

  $('#new_message').on('submit',function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html)
      $('.form__mask__image').val('');
      $('.form__message').val('');
      $(".form__submit").attr('disabled', false);
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
    })
    .fail(function(){
      alert('error');
    })
  });

  $(function(){
    setInterval(update, 5000);
  });

});
