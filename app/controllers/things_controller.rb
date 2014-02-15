class ThingsController < ApplicationController
  before_action :set_thing, only: [:show, :edit, :update, :destroy]
  # I18n.locale = :fr

  # GET /things
  # GET /things.json
  def index
    # @things = Thing.where("name = /.*?.*/", params[:name])
    # client coordinates are stored as [ lng, lat ]
    if params[:searchLocation] == 'custom'
      coordinates = JSON.load(params[:customLocation])
    elsif params[:searchLocation] == 'device'
      coordinates = JSON.load(params[:deviceLocation])
    end

    if coordinates.nil?
      # TODO: select the coordinates of the capital city in the country, on a URL domain basis
      coordinates = [ 2.35, 48.853 ]
    end
      
    @things = Thing.where(
      { name: /.*#{params[:name]}.*/,
        position: 
          { "$near" => 
            { "$geometry" =>
              { type: "Point",
                coordinates: coordinates
              }
            }
          }
      }
    )

    @search_string = params[:name]
    @distances = []
    @things.each_index do |i|
      @distances[i] = distance(coordinates, @things[i][:position]["coordinates"]).round(3)
    end
      
    render "results"
  end

  # GET /things/1
  # GET /things/1.json
  def show
    # TODO: accepts an optional origin parameter to compute the distance from origin
  end

  # GET /things/new
  def new
    @thing = Thing.new
    @thing.name = params[:name]
    @thing.build_position
    @coordinates = []
  end

  # GET /things/1/edit
  def edit
  end

  # POST /things
  # POST /things.json
  def create
    thing_params[:position_attributes][:type] = 'Point'
    thing_params[:position_attributes][:coordinates] = JSON.load(thing_params[:position_attributes][:coordinates])
    thing_params[:ip] = request.env['REMOTE_ADDR']
    @coordinates = thing_params[:position_attributes][:coordinates]
    @thing = Thing.new(thing_params)
    # logger.debug "Thing attributes hash: #{@thing.attributes.inspect}"

    respond_to do |format|
      if @thing.save
        format.html { redirect_to @thing, notice: t('thing_form.added') }
        format.json { render action: 'show', status: :created, location: @thing }
      else
        format.html { render action: 'new' }
        format.json { render json: @thing.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /things/1
  # PATCH/PUT /things/1.json
  def update
    respond_to do |format|
      if @thing.update(thing_params)
        format.html { redirect_to @thing, notice: 'Thing was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @thing.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /things/1
  # DELETE /things/1.json
  def destroy
    @thing.destroy
    respond_to do |format|
      format.html { redirect_to things_url }
      format.json { head :no_content }
    end
  end

  def search
    @topThings = Thing.all; #get the first 10 results with the most hits
    @count = Thing.count
    @first_thing_date = Thing.first.created_at || DateTime.now
    # mongoid method created_at returns a TimeWithZone object
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_thing
      @thing = Thing.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def thing_params
      # params.require(:thing)
      params.require(:thing).permit!
      # params.require(:thing).permit(:name, :address, :comments, :position_attributes [ :latitude, :longitude ])
    end

    # Use to compute a distance between two points : [ lat, lng ], [ lat, lng ]
    def distance coordsA, coordsB
      a = [ coordsA[1], coordsA[0] ]
      b = [ coordsB[1], coordsB[0] ]
      rad_per_deg = Math::PI/180  # PI / 180
      rkm = 6371                  # Earth radius in kilometers

      dlon_rad = (b[1]-a[1]) * rad_per_deg  # Delta, converted to rad
      dlat_rad = (b[0]-a[0]) * rad_per_deg

      lat1_rad, lon1_rad = a.map! {|i| i * rad_per_deg }
      lat2_rad, lon2_rad = b.map! {|i| i * rad_per_deg }

      a = Math.sin(dlat_rad/2)**2 + Math.cos(lat1_rad) * Math.cos(lat2_rad) * Math.sin(dlon_rad/2)**2
      c = 2 * Math.asin(Math.sqrt(a))

      rkm * c # Delta in meters
    end
end
