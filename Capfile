# A very simple capistrano deploy recipe for staticmatic and git

set :user, 'root'
role :web, "abscond.org"
ssh_options[:port] = 2222

set :location, "/var/www/coupde"
set :git, "git://github.com/james/coup-de.git"

task :setup do
  run "mkdir -p #{location}; cd #{location}; git clone #{git} current"
end

task :reset_code do
  run "cd #{location}/current; git reset --hard"
end

task :update_code do
  run "cd #{location}/current; git pull"
end

task :build do
  run "cd #{location}/current; staticmatic build ."
end

task :deploy_remote do
  reset_code
  update_code
  build
end

task :deploy do
  `git push`
  deploy_remote
end

task :build_local do
  `staticmatic build .`
end


task :deploy_gh do
  build_local
  `git checkout gh-pages`
  `git rebase master`
  `git checkout master`
  `git push origin gh-pages`
end