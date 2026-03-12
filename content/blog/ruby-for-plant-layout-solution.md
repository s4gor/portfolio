---
title: "Ruby for Plant Layout Solution"
date: "2024-10-21"
excerpt: "It was 2022. I was at the end of my third year at Jagannath University. I remember I took a course named Operations Management. At that time, my......"
featuredImage: "https://old.jstales.com/storage/uploads/headerImages/Product-Layout.jpg"
---

It was 2022. I was at the end of my third year at Jagannath University. I remember I took a course named **Operations Management**. At that time, my course instructor was [**Prof. Dr. Moniruzzaman**](https://jnu.ac.bd/profile/portal/web/610). During my course, I learned lots of things related to operations management. I remember designing plant layouts being interesting at that time because they required critical thinking and design efficiency!

I was learning **Ruby** then because I heard [**Metasploit**](https://www.metasploit.com/) was being transferred from **Python** to **Ruby**. That's why I started exploring **Ruby**. I also like **Ruby on Rails** because of its features. That is also a big reason to choose **Ruby** over **Python**. So, I started planning to build a simple meta program using Ruby to solve this plant layout. There can be many results of plant layout design but the lowest one is the most efficient. 

At first, I took a CSV file that contained the existing plant layout. 

![](https://old.jstales.com/storage/uploads/blobid1729637663119.png "Screenshot from 2024-10-21 14-56-04.png")

Aggregate Flow Matrix

I could have put everything in one file but I chose to keep files separate. I made a reader file that reads data from CSV and turns it into a 2D array using **Ruby**'s [**roo**](https://rubygems.org/gems/roo/versions/2.10.0?locale=en) gem. 

![](https://old.jstales.com/storage/uploads/blobid1729637695167.png "Screenshot from 2024-10-21 15-00-57.png")

Reader File (reader.rb)

So, I had a CSV containing the existing plant layout. I had a reader system. All I needed to do was to manipulate the 2D array and find out the most efficient layout plant.

# **Here's how I approached the problem.**

first_line =  \[2, 1, 6, 3]  
second_line = \[7, 5, 8, 4]  
  
length = first_line.length  
actual_length = length \* 2  
total = 0  
  
for i in 1..actual_length-1  
  if first_line.include? i  
    main = first_line.index(i)  
  else  
    main = second_line.index(i)  
  end  
  main += 1  
  for j in i+1..actual_length  
    if first_line.include? j  
      second_main = first_line.index(j)  
    else  
      second_main = second_line.index(j)  
    end  
    second_main += 1  
  
    step = (main - second_main).abs  
  
    if step == 0  
      step = 1  
    end  
    data = $plant.cell(i, j-1)  
    puts "#{i} - #{j} -> #{data} x #{step} = #{data \* step}"  
    total += data \* step  
  end  
  if i+1 != 8  
    puts "new line #{i+1}"  
  end  
end

Here, `first_line` and `second_line` represents the initial layout with the value of costing. And this program generates the lowest possible transaction cost of plant layout design. I wrote it in 2022 and forgot about **Ruby**. However, I have got some plans with [**Ruby on Rails**](https://rubyonrails.org/). I will talk about this here someday.
