class Goal < ApplicationRecord
  has_many :stats
  enum comparator: {less_than: 0, more_than: 1}, _suffix: true

  validates_presence_of(:title, :comparator, :target_value, :target_metric, :interval)
  validates_uniqueness_of(:title)

end
