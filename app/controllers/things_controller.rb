class ThingsController < ApplicationController
  before_action :set_thing, only: [:show, :edit, :update, :destroy]

  # GET /things
  # GET /things.json
  def index
    # @things = Thing.all
    @things = Thing.where(name: params[:name])
    render "results"
  end

  # GET /things/1
  # GET /things/1.json
  def show
    logger.debug "Thing attributes hash: #{@thing.attributes.inspect}"
  end

  # GET /things/new
  def new
    @thing = Thing.new
    @thing.name = params[:name]
    @thing.build_position
  end

  # GET /things/1/edit
  def edit
  end

  # POST /things
  # POST /things.json
  def create
    # @thing = Thing.new(params[:thing])
    @thing = Thing.new(thing_params)
    logger.debug "Thing attributes hash: #{@thing.attributes.inspect}"
    # @thing.coordinates = JSON.load(params[:coordinates])

    respond_to do |format|
      if @thing.save
        format.html { redirect_to @thing, notice: 'Thing was successfully created.' }
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
end
