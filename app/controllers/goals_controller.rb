# frozen_string_literal: true

class GoalsController < ApplicationController
  def index
    @hello_world_props = { name: "Stranger" }
  end
end
