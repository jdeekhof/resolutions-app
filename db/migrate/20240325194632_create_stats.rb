class CreateStats < ActiveRecord::Migration[7.0]
  def change
    create_table :stats do |t|
      t.references :goal, null: false
      t.datetime :activity_at, null: false
      t.integer :activity_value, null: false
      t.timestamps
    end
  end
end
