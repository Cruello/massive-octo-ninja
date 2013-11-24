json.array!(@users) do |user|
  json.extract! user, :pseudo, :email
  json.url user_url(user, format: :json)
end
