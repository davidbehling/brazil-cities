class Api::V2::CitiesController < ApplicationController
  def search
    cities = Cities::Search.call(params)
    render json: cities
  end
end