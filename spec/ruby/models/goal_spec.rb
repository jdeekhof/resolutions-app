require 'rails_helper'

RSpec.describe Goal, type: :model do
    describe 'validations' do
      let(:goal) { Goal.create!(**attributes) }
      let(:valid_attributes) do
        {
          title: 'I want to walk more',
          comparator: 1,
          deadline: DateTime.now + 30.days,
          target_value: 8000,
          target_metric: 'steps',
          interval: 'in a day',
        }
      end

      context 'when a title is not passed' do
        let(:attributes) { valid_attributes.reject!{ |key, v| key == :title} }

        it 'is not valid and will raise error' do
          expect{goal}.to raise_error(ActiveRecord::RecordInvalid)
        end
      end

      context 'comparator is not passed' do
        let(:attributes) { valid_attributes.reject!{ |key, v| key == :comparator} }

        it 'is not valid and will raise error' do
          expect{goal}.to raise_error(ActiveRecord::RecordInvalid)
        end
      end

      context 'target_value is not passed' do
        let(:attributes) { valid_attributes.reject!{ |key, v| key == :target_value} }

        it 'is not valid and will raise error' do
          expect{goal}.to raise_error(ActiveRecord::RecordInvalid)
        end
      end

      context 'target_metric is not passed' do
        let(:attributes) { valid_attributes.reject!{ |key, v| key == :target_metric} }

        it 'is not valid and will raise error' do
          expect{goal}.to raise_error(ActiveRecord::RecordInvalid)
        end
      end

      context 'interval is not passed' do
        let(:attributes) { valid_attributes.reject!{ |key, v| key == :interval} }

        it 'is not valid and will raise error' do
          expect{goal}.to raise_error(ActiveRecord::RecordInvalid)
        end
      end

      context 'when all required fields are passed' do
        let(:attributes) { valid_attributes }

        it 'will create a new record' do
          expect{goal}.not_to raise_error
          expect(Goal.count).to eq(1)
        end
      end
      
      context 'when a duplicate title gets passed' do
        let(:attributes) { valid_attributes }

        it 'is not valid and will raise error' do
          expect{goal}.not_to raise_error
          expect(Goal.count).to eq(1)
          expect{Goal.create!(**attributes)}.to raise_error(ActiveRecord::RecordInvalid)
          expect(Goal.count).to eq(1)
        end
      end
    end

    describe 'enums' do
      context 'comparator' do
        it 'will return the correct values' do
          expect(Goal.comparators).to eq({"less_than"=>0, "more_than"=>1})
        end
      end
    end
end
