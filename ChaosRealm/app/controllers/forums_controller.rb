class ForumsController < ApplicationController
  before_action :authenticate_citizen!, only: [:new, :create, :destroy, :edit, :update]
  before_action :set_forum, only: %i[ show edit update destroy ]

  # GET /forums or /forums.json
  def index
    #@forums = Forum.all
    @forums = Forum.includes(:citizen).all

    if params[:search].present?
      search_term = params[:search].downcase
      @forums = @forums.joins(:citizen).where('LOWER(forums.title) LIKE ? OR LOWER(citizens.display_name) LIKE ?', "%#{search_term}%", "%#{search_term}%")
    end
  end

  # GET /forums/1 or /forums/1.json
  def show
  end

  # GET /forums/new
  def new
    @forum = Forum.new
  end

  # GET /forums/1/edit
  def edit
  end

  # POST /forums or /forums.json
  def create
    @forum = current_citizen.forums.build(forum_params)
    if @forum.save
      redirect_to @forum, notice: 'Forum was successfully created.'
    else
      render :new
    end
  end

  # PATCH/PUT /forums/1 or /forums/1.json
  def update
    respond_to do |format|
      if @forum.update(forum_params)
        format.html { redirect_to @forum, notice: "Forum was successfully updated." }
        format.json { render :show, status: :ok, location: @forum }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @forum.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /forums/1 or /forums/1.json
  def destroy
    @forum.destroy!

    respond_to do |format|
      format.html { redirect_to forums_path, status: :see_other, notice: "Forum was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_forum
      @forum = Forum.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def forum_params
      params.require(:forum).permit(:title, :description)
    end
end
