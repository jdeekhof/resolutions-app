class CreateGoals < ActiveRecord::Migration[7.0]
  def change
    create_table :goals do |t|
      t.string :title, null: false, unique: true
      t.datetime :deadline
      t.integer :comparator, null: false
      t.integer :target_value, null: false
      t.string :target_metric, null: false
      t.string :interval, null: false
      t.timestamps
    end
  end
end
