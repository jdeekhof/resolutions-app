class Goal < ApplicationRecord
  has_many :stats
  enum comparator: {less_than: 0, more_than: 1}, _suffix: true

  validates_presence_of(:title, :comparator, :target_value, :target_metric, :interval)
  validates_uniqueness_of(:title)
  def self.create_dummy
    create!(
      title: "I want to walk more+#{(last&.id || 0)+1}",
      comparator: 1,
      deadline: DateTime.now + 30.days,
      target_value: 8000,
      target_metric: 'steps',
      interval: 'in a day',
    )
  end
end
