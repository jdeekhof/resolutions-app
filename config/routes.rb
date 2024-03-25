Rails.application.routes.draw do
  root 'goals#home'
  resources 'goals', only: [:index, :create]
  resources 'stats', only: [:index, :create]
end
