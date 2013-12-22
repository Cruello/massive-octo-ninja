class Thing
  include Mongoid::Document
  field :name, type: String
  field :address, type: String
  field :comments, type: String
  embeds_one :position
  accepts_nested_attributes_for :position
  validates :name, :address, presence: true
  validates :name, length: { minimum: 3, maximum: 100 }
  validates :address, length: { maximum: 200 }
end

class Position
  include Mongoid::Document
  field :latitude, type: Float
  field :longitude, type: Float
  embedded_in :thing, :inverse_of => :position 
  validates :latitude, :longitude, presence: { message: "use the geocode button to record the exact position" }, numericality: true
end
