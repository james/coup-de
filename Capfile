role :web, "abscond.org"
set :location, "/var/www/coupde/current"
set :git, "git@github.com:james/coup-de.git"

task :setup do
  run "cd #{location}; git clone #{git}"
end

task :reset_code do
  run "cd #{location}; git reset --hard HEAD^;"
end

task :update_code do
  run "cd #{location}; git pull"
end

task :build do
  run "cd #{location}; staticmatic build ."
end

task :restart do
  run "sudo /etc/init.d/nginx reload"
end

task :deploy do
  reset_code
  update_code
  build
  restart
end