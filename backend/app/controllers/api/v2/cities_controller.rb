class Api::V2::CitiesController < ApplicationController
  def search
    cities = Cities::Search.call(search_params)
    render json: cities
  end
  
  private

  def search_params
    params.require(:search_cities).permit(:state_name, :name)
  end
end