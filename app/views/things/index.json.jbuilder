json.array!(@things) do |thing|
  json.extract! thing, :name, :comments, :coordinates
  json.url thing_url(thing, format: :json)
end
