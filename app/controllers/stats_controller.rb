# frozen_string_literal: true

class StatsController < ApplicationController
  protect_from_forgery except: [:create]
  def index
    render json: Stat.latest_by_goal
  end

  def create
    stat = Stat.create **create_params
    if stat.save
      message = 'Stat Succesfully created!'
    else
      message ='Stat Unable to be created'
    end
    render json: {message: message}
  end

  protected
  def create_params
    params.permit :activity_at, :goal_id, :activity_value
  end
end
