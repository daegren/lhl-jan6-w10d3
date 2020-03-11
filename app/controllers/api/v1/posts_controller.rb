class Api::V1::PostsController < Api::V1::BaseController

  def index
    render json: Post.all
  end

  def show
    render json: Post.find(params[:id])
  end

end
