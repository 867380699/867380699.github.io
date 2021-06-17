if ARGV.length == 0
  p 'name required!'
  exit
end

post_name = ARGV[0]
post_date = Time.now.strftime('%Y-%m-%d')

post_content = %(---

layout: post
title: "#{post_name}"
date: #{post_date}

---)

post_file = "./_posts/#{post_date}-#{post_name}.md"

if (!File.file?(post_file))
  open(post_file, 'w') { |file|
    file.puts(post_content)
  }
  p "new post created: #{post_file}"
end