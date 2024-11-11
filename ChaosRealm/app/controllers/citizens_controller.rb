class CitizensController < ApplicationController
  #Devise will authorize access to only your citizen
  before_action :authenticate_citizen!, except: [:index, :show]
  before_action :set_citizen, only: %i[ show edit update destroy ]
  before_action :authorize_citizen!, only: [:edit, :update, :destroy]

  # GET /citizens or /citizens.json
  def index
    @citizens = Citizen.all
  end

  # GET /citizens/1 or /citizens/1.json
  def show
  end

  # GET /citizens/new
  def new
    #Thou shalt NOT create a citizen without signing up!
    redirect_to root_path, alert: "You already have a citizen profile." if current_citizen.citizen.present?
  end

  # GET /citizens/1/edit
  def edit
  end

  # POST /citizens or /citizens.json
  def create
    if current_citizen.citizen.present?
      redirect_to root_path, alert: "You already have a citizen profile."
    else
      @citizen = current_citizen.build_citizen(citizen_params)
      if @citizen.save
        redirect_to @citizen, notice: "Citizen profile created successfully."
      else
        render :new
      end
    end
  end

  # PATCH/PUT /citizens/1 or /citizens/1.json
  def update
    respond_to do |format|
      if @citizen.update(citizen_params)
        format.html { redirect_to @citizen, notice: "Citizen was successfully updated." }
        format.json { render :show, status: :ok, location: @citizen }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @citizen.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /citizens/1 or /citizens/1.json
  def destroy
    @citizen.destroy!

    respond_to do |format|
      format.html { redirect_to citizens_path, status: :see_other, notice: "Citizen was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_citizen
      @citizen = Citizen.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def citizen_params
      params.require(:citizen).permit(:display_name, :bio)
    end

    def authorize_citizen!
      # Prevents access if the current citizen is not the owner
      redirect_to root_path, alert: "You are not authorized to access this user." unless @citizen == current_citizen
    end
end
