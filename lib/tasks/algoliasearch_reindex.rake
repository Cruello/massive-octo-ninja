namespace :algoliasearch do

  puts 'reindexing Things'
  task :reindex => :environment do
    Thing.reindex
  end
end