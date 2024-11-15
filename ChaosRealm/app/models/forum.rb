class Forum < ApplicationRecord
  belongs_to :citizen
  validates :citizen, presence: true
  validates :title, presence: true
end
