#!/bin/bash

# Define the input and output files
input_file="src/index.html"
md_content_file="src/text.md"
new_content_file="src/text.html"
temp_file="temp.html"

# convert the md to html
pandoc "$md_content_file" -t html -o "$new_content_file"

# Extract everything before the page content start
sed '/<!-- page content start -->/q' "$input_file" > "$temp_file"

# Append new content
cat "$new_content_file" >> "$temp_file"

# Append everything after the page content end
sed -n '/<!-- page content end -->/,$p' "$input_file" >> "$temp_file"

# Replace the original file with the temp file
mv "$temp_file" "$input_file"

npm run prettier