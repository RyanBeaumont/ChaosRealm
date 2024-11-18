class Post < ApplicationRecord
  belongs_to :forum
  belongs_to :citizen
  has_rich_text :text
end
