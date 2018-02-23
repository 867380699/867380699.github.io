#!/usr/bash
date=`date +%Y-%m-%d`
post=./_posts/"$date-$1.md"
touch $post
echo "---\n
layout: post
title: \"$1\"
date: $date\n
---">$post
echo "$1"
