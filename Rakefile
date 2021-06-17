task default: %w[hello]

task :hello do
  p 'Hello'
end

task :new, [:name] do |task, args|
  ruby "_scripts/new_post.rb #{args.name}"
end