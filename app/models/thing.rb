class Thing
  include Mongoid::Document
  include Mongoid::Timestamps
  field :name, type: String
  field :address, type: String
  field :comments, type: String
  field :ip, type: String
  embeds_one :position
  accepts_nested_attributes_for :position
  validates :name, :address, presence: true
  validates :name, length: { minimum: 3, maximum: 100 }
  validates :address, length: { maximum: 200 }
  index({ name: 1, position: "2dsphere" })
end

class Position
  include Mongoid::Document
  field :type, type: String
  field :coordinates, type: Array
  embedded_in :thing, :inverse_of => :position 
  validates :type, :coordinates, presence: { message: "use the geocode button to record the exact position" }
end
