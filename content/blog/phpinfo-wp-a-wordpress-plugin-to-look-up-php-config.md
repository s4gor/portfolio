---
title: "phpinfo() WP; A WordPress Plugin to look up PHP config."
date: "2024-10-26"
excerpt: "I wrote a WordPress plugin in just 2 hours. Though it was not that critical. Initially, it was for showing phpinfo() page in WordPress CMS. Just a sim..."
featuredImage: "https://old.jstales.com/storage/uploads/headerImages/phpinfo-wordpress.jpg"
---

I wrote a [**WordPress**](https://wordpress.org/) plugin in just 2 hours. Though it was not that critical. Initially, it was for showing phpinfo() page in WordPress CMS. Just a simple phpinfo page in the dashboard. Yeah, I know it's very easy to output it just by creating a PHP file at the root folder having `phpinfo();`. But WordPress is maintained by non-tech people also. They might see this easy task in a critical context. So I just came up with this idea to build a simple phpinfo page for Wordpress. And yeah, it worked out somehow and people started using it. I don't remember the exact time I built the first version, maybe it was 2021 or 2022. I don't remember. 

![](https://old.jstales.com/storage/uploads/blobid1730121228814.png "phpinfo() WP")

phpinfo() WP

The current version of this plugin is 6.0. I went through lots of issues from version 1.0 to 5.0, lots of security issues, etc, etc. Ok, I am checking the update log at the time of writing this blog. I added new information in version 1.0.6 to see enabled extensions for PHP on that server. It was a simple page with ticked or unticked with some predefined extensions. I remember I became overwhelmed by the result I was getting from the plugin. So I went for version 2.0 which included a feature to overwrite .htaccess (which is very dangerous) to configure some server values like `max_file_uploads, upload_max_filesize`, etc. At first, I didn't look over the issue of .htaccess being overwritten with bad configuration which can lead the site to 400 error. Without this kind of protection, I ran 2 more versions without any problems. Amazingly, WordPress also didn't check if there was an issue with my plugin or not. 

But it's a problem, right? So I had to add an extra layer for checking edited code for .htaccess before it could cause problems. All I did was request the server with the edited configurations before saving it permanently.

![](https://old.jstales.com/storage/uploads/blobid1730122473401.png "Screenshot from 2024-10-28 19-33-25.png")

I also attached a page for keeping logs of when and what was done by the users in this plugin. And the plugin has 4 pages right now.

*   **1\. phpinfo()**
*   **2\. htaccess editor**
*   **3\. enabled extensions**
*   **4\. logs**

All these things were not present in the plugin initially. However, I developed the idea within 2 hours and ended up submitting it to the WordPress plugin directory. I went through lots of issues like the plugin had no protection over **CSRF attacks**, not using **nonce**, etc. I fixed those one by one. The most interesting part is I had zero knowledge of this project at the time. All I did was research how this could be solved, how that could be solved. After a long period, currently, I have got the stable version of the plugin, 6.00. 

Facing issues one by one made me learn lots of things related to developing WordPress plugins. I still remember I had zero knowledge of **SVN**. I learned it while building and submitting the plugin to the WordPress plugin directory. I faced the problem, and I searched and researched it. That's how one should learn new things. Instead of sticking with video tutorials, one should jump into the project and try to achieve what one is willing for. This will make one go through real-life issues and end with learning lots of real-life solutions. This is how I built one of the best open-source projects, [**phpinfo() WP**](https://wordpress.org/plugins/phpinfo-wp/). I have a plan to implement a feature where I can showcase my project, I will talk about this project there someday!
