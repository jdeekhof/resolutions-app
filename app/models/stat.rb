class Stat < ApplicationRecord
  belongs_to :goal

  validates_presence_of(:activity_at, :activity_value, :goal)
end