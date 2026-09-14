# frozen_string_literal: true

module Cities
  class Search
    def self.call(params)
      new(params).call
    end

    def initialize(params)
      @query = params[:q].to_s.strip
      @type = params[:type].to_s
    end

    def call
      return City.none if @query.blank? || type.blank?
      return cities_by_name if type == "city"
      cities_by_state_name if type == "state"
    end

    private

    attr_reader :query, :type

    def cities_by_name
      City.search_by_name(@query).order(:name)
    end

    def cities_by_state_name
      City.search_by_state_name(@query).order(:name)
    end
  end
end
