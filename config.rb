# activate :scss_lint

# activate :autoprefixer, browsers: [
#   'last 2 versions'
# ]

activate :directory_indexes

data.portfolio.categories.each do |category|
  proxy "/portfolio/#{category.slug}/index.html", "/portfolio/category.html", :locals => { :category => category }, :ignore => true
  category.galleries.each do |gallery|
    proxy "/portfolio/#{category.slug}/#{gallery.slug}/index.html", "/portfolio/gallery.html", :locals => { :category => category, :gallery => gallery }, :ignore => true
  end
end

activate :external_pipeline,
  name: :webpack,
  command: build? ? './node_modules/webpack/bin/webpack.js --bail' : './node_modules/webpack/bin/webpack.js --watch -d',
  source: ".tmp/dist",
  latency: 1

# Reload the browser automatically whenever files change
configure :development do
  activate :livereload

  # "Ignore" JS so webpack has full control.
  ignore { |path| path =~ /\/(.*)\.(js|scss|css|sass)$/ && $1 != 'all' }

end

# Build-specific configuration
configure :build do
  # For example, change the Compass output style for deployment
  activate :minify_css

  # "Ignore" JS so webpack has full control.
  ignore { |path| path =~ /\/(.*)\.(js|css)$/ && $1 != 'all' }

  # Minify Javascript on build
  activate :minify_javascript

  activate :minify_html

  activate :gzip

  # Enable cache buster
  activate :asset_hash

  # activate :asset_host, host:'http://assets.nearby.supply'

  # Use relative URLs
  activate :relative_assets

  config[:relative_links] = true

  # Or use a different image path
  # set :http_prefix, "/Content/images/"
end

configure :server do
  ready do
    files.on_change :source do |changed|
      changed_js = changed.select do |f|
        f[:full_path].extname === '.js' && !f[:full_path].to_s.include?('.tmp')
      end

      if changed_js.length > 0
        puts "== Linting Javascript"

        changed_js.each do |file|
          puts `./node_modules/eslint/bin/eslint.js #{file[:full_path]}`
        end
      end
    end
  end
end
