# frozen_string_literal: true

class GoalsController < ApplicationController
  protect_from_forgery except: [:create]
  def home
    @initial_goals = Goal.all.order(created_at: :desc).to_json
    @initial_stats = Stat.select('DISTINCT ON ("goal_id") *').order(:goal_id, activity_at: :desc, id: :desc).to_json
  end

  def index
    render json: Goal.all.order(created_at: :desc)
  end

  def create
    goal = Goal.create **create_params
    if goal.save
      message = 'Goal succesfully created!'
    else
      message ='Goal Unable to be created'
    end
    render json: {message: message}
  end

  protected
  def create_params
    params[:comparator] = params[:comparator].to_i
    params.permit :title,  :comparator, :target_value, :target_metric, :interval
  end
end
