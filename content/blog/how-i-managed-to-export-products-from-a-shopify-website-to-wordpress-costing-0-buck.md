---
title: "How I managed to export products from a Shopify website to WordPress costing 0 buck"
date: "2024-10-19"
excerpt: "One day, my client from the Netherlands asked me if it was possible to duplicate a Shopify website into WordPress. The design concept? Yes!......"
featuredImage: "https://old.jstales.com/storage/uploads/headerImages/02lLbDwVdtIQN2uDFnHeN41-11.webp"
---

One day, my client from the Netherlands asked me if it was possible to duplicate a **Shopify** website into **WordPress**. The design concept? Yes! But what about products? I remember the website I copied into WordPress had 1000+ products—lots of products! I was looking for online sites that provide this kind of service. I found some though. But all of those were not budget-friendly. If you have read my bio, you would know I knew about computer programming because of my curiosity about hacking. **Python** is the most recommended language to learn to write custom scripts. Yes, **Python** is the first language I learned. 

![](https://old.jstales.com/storage/uploads/blobid1729281112141.png "Python.png")

I wrote some small projects while learning **Python**. So I came through real-life project situations in **Python** like its libraries, web frameworks, etc. One library that I still love is [**Pandas**](https://pandas.pydata.org/ "Pandas"). Anyone can access any website's data through **Shopify**'s public API, which returns both **JSON** & **XML** format. I could also use **JavaScript** (my primary language), but at that time, I was comfortable with **Python** more than **JavaScript.**

### **So the process was something like this**

First, I need to hit that specific page I want to scrap data (product data) from. I used **Python**'s simplest library to request a web page, **[requests](https://pypi.org/project/requests/)**.

Second, I need to handle the response (I prefer JSON) from the webpage. So I used **Python**'s built-in library **json**.

Third, I need to process the data and design it in a **WordPress** way. WordPress enables users to upload product data through CSV files. And that's what [**Pandas**](https://pandas.pydata.org/ "Pandas") does. Manipulates the data and casts it to file. I used the built-in **Math** library also for some cases. 

**Shopify** doesn't provide its collection data with products. As **Shopify**'s collections are considered categories, I need to know what collections the site had.

![](https://old.jstales.com/storage/uploads/blobid1729284821661.png "Screenshot 2024-10-19 023316.png")

**Shopify** provides URL parameters to filter the response. The most used filters are `limit`, `publish_status`, `page`. Here's some example:

http://{yoursite}.com/{collection name}.json?limit=250&page=1     // to get the first page's 250 published collection list  
  
http://{yoursite}.com/{collection name}.json?limit=250&page=2     // to get the second page's 250 published collection list if the site has more than 250 collections  
  
http://{yoursite}.com/{collection name}.json?limit=15     // to get the first 15 collection list

The reason why 250 is the limit is that **Shopify** sets it as the limit per request. After getting all collections in a list, I run a loop using these collections. 

for c in collectiondata:  
  proCount = collectionProductCount\[c]\['products_count'] #counting products if we need to go to 2nd or 3rd page  
  proHandle = collectionProductCount\[c]\['handle'] #collection slug  
  if proCount > 250:  
    d = math.ceil(proCount / 250)  
    for u in range(1, d):  
      proURL = f'https://{siteURL}/collections/{proHandle}/products.json?limit=250&page={u}'  
      req = requests.get(proURL)  
      res = req.json()  
  else:  
    proURL = f'https://{siteURL}/collections/{proHandle}/products.json?limit={proCount}'  
    req = requests.get(proURL)  
    res = req.json()

Here, `res` contains all data as a list. I mapped column names that were needed in the CSV file WordPress.  Through another loop, I mapped relevant data to the relevant columns. After manipulating the data, I appended the data to a list and inserted it in [**Pandas**](https://pandas.pydata.org/ "Pandas") data frame, saving it as a CSV file.

product = {  
  'ID': Id,  
  'Type': Type,  
  'Name': Name,  
  'Published': Published,  
  'Is featured?': IsFeatured,  
  'Visibility in catalog': VisibilityInCatalog,  
  'Short description': ShortDescription,  
  'In stock?': InStock,  
  'Allow customer reviews?': AllowCustom,  
  'Regular price': RegularPrice,  
  'Categories': collection,  
  'Images': Images,  
  'Parent': parent_id,  
  'Custom URI': Slug,  
  'Attribute 1 name': SizeAttr,  
  'Attribute 1 value(s)': SizeVal,  
  'Attribute 1 visible': SizeVis,  
  'Attribute 1 global': SizeGlo,  
  'Attribute 1 default': SizeDef,  
  'Attribute 2 name': ColorAttr,  
  'Attribute 2 value(s)': ColorVal,  
  'Attribute 2 visible': ColorVis,  
  'Attribute 2 global': ColorGlo,  
  'Attribute 2 default': ColorDef  
}

It took like 2-3 hours to build but saved my 30 bucks! I have got an idea related to this issue I just shared above, yeah I will write about it soon. I have to say this manipulating data thing is really interesting which gives me self-esteem!
