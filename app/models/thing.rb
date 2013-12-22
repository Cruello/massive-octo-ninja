class Thing
  include Mongoid::Document
  field :name, type: String
  field :address, type: String
  field :comments, type: String
  embeds_one :position
  accepts_nested_attributes_for :position
  validates :name, presence: true
  validates :address, presence: true
end

class Position
  include Mongoid::Document
  field :latitude, type: Float
  field :longitude, type: Float
  embedded_in :thing, :inverse_of => :position 
  validates :latitude, presence: true
  validates :longitude, presence: true
end
