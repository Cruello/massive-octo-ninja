class Thing
  include Mongoid::Document
  field :name, type: String
  field :address, type: String
  field :comments, type: String
  embeds_one :position
  accepts_nested_attributes_for :position
end

class Position
	include Mongoid::Document
	field :latitude, type: Float
	field :longitude, type: Float
	embedded_in :thing, :inverse_of => :position 
end
