class Thing
  include Mongoid::Document
  field :name, type: String
  field :address, type: String
  field :comments, type: String
  field :coordinates, type: Hash
end
