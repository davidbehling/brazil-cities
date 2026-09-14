# frozen_string_literal: true

Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :states, only: [:index, :show, :create, :update, :destroy]
      resources :cities, only: [:index, :show, :create, :update, :destroy]
    end

    namespace :v2 do
      get "/search_cities", to: "cities#search"
    end
  end
end
