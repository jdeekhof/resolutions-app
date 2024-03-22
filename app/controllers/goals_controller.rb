# frozen_string_literal: true

class GoalsController < ApplicationController
  def home
    @initial_goals = Goal.all.to_json
  end

  def index
    render json: Goal.all
  end
end
