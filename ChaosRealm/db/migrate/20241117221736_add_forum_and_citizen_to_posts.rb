class AddForumAndCitizenToPosts < ActiveRecord::Migration[7.1]
  def change
    add_reference :posts, :forum, null: false, foreign_key: true
    add_reference :posts, :citizen, null: false, foreign_key: true
  end
end
