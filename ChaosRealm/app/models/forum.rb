class Forum < ApplicationRecord
  belongs_to :citizen
  has_many :posts, dependent: :destroy
  validates :citizen, presence: true
  validates :title, presence: true
end
