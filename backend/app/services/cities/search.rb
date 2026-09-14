# frozen_string_literal: true

module Cities
  class Search
    def self.call(params)
      new(params).call
    end

    def initialize(params)
      @name = params[:name]
      @state_name = params[:state_name]
    end

    def call
      cities_by_name & cities_by_state_name
    end

    private

    attr_reader :name, :state_name

    def cities_by_name
      return City.all if name.blank?

      City.search_by_name(name)
    end

    def cities_by_state_name
      return City.all if state_name.blank?

      City.search_by_state_name(state_name)
    end
  end
end
