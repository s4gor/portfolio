---
title: "Bulk discount on Shopify without using any app"
date: "2024-12-01"
excerpt: "Paridhan Couture, where I work as Chief Technology Officer, told me they would cover Black Friday. They told me they wanted to provide sales......"
featuredImage: "https://old.jstales.com/storage/uploads/headerImages/shopify-python.jpg"
---

[**Paridhan Couture**](https://paridhancouture.com/), where I work as **Chief Technology Officer,** told me they would cover **Black Friday**. They told me they wanted to provide sales on category. Interesting fact is there is nothing in [**Shopify**](https://www.shopify.com/). There are collections in Shopify but no categories. Though these two terms seem the same. There are two options for providing sales. Either an appropriate app needs to be used or this criteria needs to be done through CSV. One of the most popular apps is [**Pumper Bundles Volume Discount**](https://apps.shopify.com/pumper-quantity-breaks-product-bundles-discounts) which costs **$9.99** per month. I mean it's only for **Black Friday** but need to pay for the full month? No Way!  
  

So I just came up with a **CSV** manipulator coded in [**Python**](https://www.python.org/). I used [**Pandas**](https://pandas.pydata.org/) to manipulate **CSV** data. **Pandas** is great at the time of manipulating big chunks of data, right? So the conditions were, If a product belongs to this (named the category which would have a 30%), then it would have a 30% discount or if a product belongs to this (named the category which would have a 40%), then it would have a 40% and the rests would go for 50%. So I categorized these into 2 lists. 

tags30 = \[""] \# name of collections which would have 30
tags40 = \[""] \# name of collections which would have 40

except for these two lists' collections, every collection would go through 50% discounts. But now I faced a problem with this. Shopify doesn't provide collection names on its exported CSV of products. Thankfully we were using tags to categorize (putting products in collections) through tags. So now, it's tags that I considered instead of collection names because I didn't have them. I needed to know tags per product so basically I got the full length of the **CSV** and went through a loop for this using **Pandas**.

df = pd.read_csv('products.csv')
count = len(df.index)
for i in range(count):
  if type(df.values\[i]\[6]) == str:
    tag = (df.values\[i]\[6]).split(",")
    tag = \[s.strip() for s in tag]
    containOld = tag
  tag = containOld

Here, `df.values[i][6]` is the column of tags and the `tag` variable has tags of products. `containOld = tag` in if condition and outside of if condition, `tag = containOld`! a little bit strange, right? I did this because in the **CSV**, only the base product contains the information of tags and other things, variant products don't. So before getting new tags for new products, base product information is available in the `containOld` variable. 

price = df.values\[i]\[23]
basePrice = df.values\[i]\[24]

After getting a product's base price and sale price field, I needed to insert discounts according to the conditions. Here, `price` is **Variant Price** column and `basePrice` is **Variant Compare At Price** of **CSV**.

if pd.isnull(df.values\[i]\[24]) or df.values\[i]\[24] == 0:
  mainPrice = price
else:
  mainPrice = basePrice

I applied this condition because some products could have discounts already and I couldn't provide a discount on discount prices, right? So, for discounted products `mainPrice` will be `basePrice` instead of `price`. 

if pd.isnull(price): pass
else:
  if any(e in tag for e in tags30):
    df.loc\[i, 'Variant Price'] = mainPrice / 100 \* 70
  elif any(e in tag for e in tags40):
    df.loc\[i, 'Variant Price'] = mainPrice / 100 \* 60
  else:
    df.loc\[i, 'Variant Price'] = mainPrice / 100 \* 50
  df.loc\[i, 'Variant Compare At Price'] = mainPrice
  df.to_csv("result.csv", index=False)

In the end, I applied the conditions my boss told me for categories (collections) that were in `tags30` and `tags40` lists. `math.ceil()` could be used to get rid of cents issues, but that was pretty ok with the sale price and I just saved **$9.99** of my company. I will talk more about this and how I will reverse these sale prices in a new blog.
