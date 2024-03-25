class Stat < ApplicationRecord
  belongs_to :goal

  validates_presence_of(:activity_at, :activity_value, :goal)

  def self.latest_by_goal
    Stat.select('DISTINCT ON ("goal_id") *').order(:goal_id, activity_at: :desc, id: :desc)
  end
end