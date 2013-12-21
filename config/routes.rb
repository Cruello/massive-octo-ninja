Wtf::Application.routes.draw do
  root 'things#search'
  get "things", to: 'things#index'
  get 'things/new', to: 'things#new'
  post 'things', to: 'things#create'
  get 'things/:id', to: 'things#show'
  # things_path  GET   /things(.:format)   things#search
  # things_new_path  GET   /things/new(.:format)   things#new
  # GET  /things(.:format)   things#index
  # POST   /things(.:format)   things#create
  # new_thing_path   GET   /things/new(.:format)   things#new
  # edit_thing_path  GET   /things/:id/edit(.:format)  things#edit
  # thing_path   GET   /things/:id(.:format)   things#show
  # PATCH  /things/:id(.:format)   things#update
  # PUT  /things/:id(.:format)   things#update
  # DELETE   /things/:id(.:format)   things#destroy
  # is it possible to distinguish a route that has parameters from the same route that has none ?
  # resources :things

  # resources :users

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
