class CreateCitizens < ActiveRecord::Migration[7.1]
  def change
    create_table :citizens do |t|
      t.string :display_name
      t.string :bio

      t.timestamps
    end
  end
end
