Previously I was pretty much happy with my website which was created using PHP. Mainly,
my website included the information about me and my work. But, eventually PHP did not stand upto me as it had previously. Problems included slower loading time and complex code blocks.

Later on I came to know about [Jekyll](http://jekyllrb.com). Its impressive loading speeds, ease of use left me no option but to try it! This website that you are currently viewing is entirely built using Jekyll.

## Setting up Jekyll

* First and foremost we will need Ruby. If you do not have Ruby installed, install it from [here](https://www.ruby-lang.org/en/downloads/)
* Fork this repository
* Next we will need **bundler** for getting github pages to work. For this type `gem install bundler` in your terminal or command prompt 
* Now, in the root of the forked repo, create a file named `Gemfile` (without any extension) and write these contents in the file
    {% highlight bash %}
        source 'https://rubygems.org'
        gem 'github-pages', group: :jekyll_plugins
    {% endhighlight %}
* Next, just fire the command `bundle install`. This will install all the dependencies required for running the fork
* Lastly, execute the command `bundle exec jekyll serve` to run the Jekyll server on `localhost:4000`
