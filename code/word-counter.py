#!/usr/bin/python
f= open("gridlayout.css","r")

text = f.read()

# Cleaning text and lower-casing all words
#for char in '-.,\n':
#    text=text.replace(char,' ')
#text = text.lower()
# split returns a list of words delimited by sequences of whitespace (including tabs, newlines, etc, like re's \s) 
word_list = text.split()

# Initializing Dictionary
d = {}

# Count number of times each word comes up in list of words (in dictionary)
for word in word_list:
    if word not in d:
        d[word] = 0
    d[word] += 1

word_freq = []
for key, value in d.items():
    word_freq.append((value, key))

word_freq.sort(reverse=True) 

for x in word_freq:
  print(x)