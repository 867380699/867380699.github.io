#!/usr/bin/env python3

'''
tag_generator.py

Copyright 2017 Long Qian
Contact: lqian8@jhu.edu

This script creates tags for your Jekyll blog hosted by Github page.
No plugins required.
'''

import glob
import os
import re

post_dir = '_posts/'
tag_dir = 'tag/'

filenames = glob.glob(post_dir + '*md')

total_tags = []
for filename in filenames:
    f = open(filename, 'r', encoding='utf8')
    crawl = False
    for line in f:
        if crawl:
            current_tags = line.replace('[','').replace(']','').strip().split()
            if current_tags and re.match(r'tags?:', current_tags[0]):
                total_tags.extend(current_tags[1:])
                crawl = False
                break
        if line.strip() == '---':
            if not crawl:
                crawl = True
            else:
                crawl = False
                break
    f.close()
total_tags = set(total_tags)

old_tags = glob.glob(tag_dir + '*.md')
for tag in old_tags:
    os.remove(tag)
    
if not os.path.exists(tag_dir):
    os.makedirs(tag_dir)

template = """---
layout: default
title: "Tag: %s"
tag: %s
---

{%% include tag_page.html %%}"""

for tag in total_tags:
    tag_filename = tag_dir + tag + '.html'
    f = open(tag_filename, 'w')
    write_str = template % (tag, tag)
    f.write(write_str)
    f.close()
print("Tags generated, count", total_tags.__len__())