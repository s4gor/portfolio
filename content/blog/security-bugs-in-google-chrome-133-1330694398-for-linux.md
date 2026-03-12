---
title: "Security bugs in Google Chrome 133 (133.0.6943.98) for Linux!"
date: "2025-02-18"
excerpt: "I am currently using dual-boot. I am still using Windows and Ubuntu because they are relevant! However, I just recently thought th......"
featuredImage: "https://old.jstales.com/storage/uploads/headerImages/1_-_Cover.width-1200.format-webp.webp"
---

I am currently using **dual-boot**. I am still using [**Windows**](https://www.microsoft.com/en-us/windows) and [**Ubuntu**](https://ubuntu.com/) because they are relevant! However, I just recently thought that I needed to shift to **Ubuntu** from **Windows** because of the better developer environment fully instead of relying on dual boot! So I am focusing on Ubuntu properly and learning things like how Linux works! Recently I noticed a very strange thing [**Google Chrome**](https://www.google.com/chrome/) was using so much **CPU** without any reason. Even opening an empty tab was causing so many issues like it was not smooth, eating lots of CPU which is strange! Because I have been using Ubuntu since 2024 and I haven't gone through this kind of experience! Google Chrome was very smooth and ran properly every time! So I thought maybe it's the extension(I use lots of them) that's causing the issue! So disabled some extensions which I used barely and interesting the problem didn't go away! I had no idea why that was happening as I update every package repository when I start the machine! So there's no way that I got any dependencies issue or something! I was facing this issue in Chrome **(133.0.6943.98)**. So I started updating my packages and I saw a new update was available for Chrome (**133.0.6943.121**) and I experienced the problem was gone! 

The problem was from **Chrome** itself! And here's what I found today from [**Chrome Release Blogs**](https://chromereleases.googleblog.com/2025/):

`[TBD][[383465163](https://issues.chromium.org/issues/383465163)] High CVE-2025-1426: Heap buffer overflow in GPU. Reported by un3xploitable && GF on 2024-12-11`

Heap buffer overflow in GPU! So what I found out from my machine is I don't have any GPU, I use a very low-configuration PC. But I was using this feature `Use graphics acceleration when available`. And that's the reason it was using my built-in GPU(actually CPU) so aggressively! But the problem is gone now! Those whoever is still facing this issue, I prefer to rollback to older version!
