require 'rails_helper'

RSpec.describe 'Stat', type: :model do
  describe 'validations' do
    let(:goal) do
      Goal.create!(**{
        title: 'I want to walk more',
        comparator: 1,
        deadline: DateTime.now + 30.days,
        target_value: 8000,
        target_metric: 'steps',
        interval: 'in a day',
      })
    end
    let(:activity_at) { DateTime.now }
    let(:activity_value) { 5 }
    let(:stat) do
      Stat.create!(
        activity_at: activity_at,
        activity_value: activity_value,
        goal: goal
      )
    end

    context 'when an activity_at is not passed' do
      let(:activity_at) { nil }

      it 'is not valid and will raise error' do
        expect{stat}.to raise_error(ActiveRecord::RecordInvalid)
      end
    end

    context 'when an activity_value is not passed' do
      let(:activity_value) { nil }

      it 'is not valid and will raise error' do
        expect{stat}.to raise_error(ActiveRecord::RecordInvalid)
      end
    end

    context 'when an goal is not passed' do
      let(:goal) { nil }

      it 'is not valid and will raise error' do
        expect{stat}.to raise_error(ActiveRecord::RecordInvalid)
      end
    end
  end
end

