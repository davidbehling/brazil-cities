class City < ApplicationRecord
  include PgSearch::Model

  pg_search_scope :search_by_name, against: :name, using: {
    tsearch: { prefix: true },
    trigram: { threshold: 0.1 } 
  }

  pg_search_scope :search_by_state_name, 
    associated_against: { state: :name }, 
    using: { 
      tsearch: { prefix: true },
      trigram: { threshold: 0.1 } 
    }

  belongs_to :state
  validates :name, presence: true
end
