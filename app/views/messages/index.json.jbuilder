json.array! @new_message do |message|
  json.text  message.content
  json.image  message.image.url
  json.name   message.user.name
  json.created_at message.created_at.strftime("%Y/%m/%d/ %H:%M")
  json.id  message.id
end
