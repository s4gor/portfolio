---
title: "Telemetry Metrics Plotter using JavaScript"
date: "2024-11-08"
excerpt: "I have been really busy since 30 October. I couldn't focus on my blog because I was going through some real disaster. Two or three days ago, one of my..."
featuredImage: "https://old.jstales.com/storage/uploads/headerImages/telemetry-metrics-plotter.png"
---

I have been really busy since 30 October. I couldn't focus on my blog because I was going through some real disaster. Two or three days ago, one of my clients from the United States asked me if I could help his friend on his friend's website. I said yes, I could. The guy contacted me and asked me if I could help him build something that would lead a user through visual directions and ultimately lead them to buy goods from his website. I saw the project and said yes I can help him. the project was fascinating like one goes through visual directions for one's required services and buys stuff from that company. It's something like a quote but more than that. He sells windshields of cars. So he wanted his customers to select cars, windshields, and everything related to that which resulted in the services section having different prices according to benefits. The project concept was cool and this is the big reason why I was interested in that project. 

While building this project, I found that my IDE, [**JetBrains**](https://www.jetbrains.com/) which I barely use after switching to **Vim**, generates logs related to memory reads, flash queues, read/write, etc. In the log folder, I found an **HTML file** that contains **1700+** lines of code. I was like, seriously! What is it?! The file was a very simple HTML file filled with **JavaScript** codes. The file reads telemetry metrics from a **CSV** file and generates plotter contents. Uploading a **CSV** file results in some beautiful time series like how much heap memory is used, total read/write, and non-blocking reads, looks up counts and durations, etc with some extra features like resetting the axis, downloading a chart, etc. 

![](https://old.jstales.com/storage/uploads/blobid1731185829599.png "Actions: Write, Read, and Non-Blocking-Read")

Actions: Write, Read, and Non-Blocking-Read

This file also manages uploading CSV files. Isn't it cool? generating plotter, time series, I mean everything can be done just using **JavaScript**, nothing else is needed! At least for this kind of stuff! No fancy runtime or frontend series of codes is needed. Even [**OpenTelemetry.js**](https://opentelemetry.io/docs/languages/js/) is not needed. External libraries that are used in the file are:

<script src\="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js" charset\="utf-8"\></script\>
<script src\="https://cdn.plot.ly/plotly-2.17.0.min.js" charset\="utf-8"\></script\>
<script src\="https://cdnjs.cloudflare.com/ajax/libs/jquery.sumoselect/3.4.9/jquery.sumoselect.min.js" charset\="utf-8"\></script\>
<link rel\="stylesheet" href\="https://cdnjs.cloudflare.com/ajax/libs/jquery.sumoselect/3.4.9/sumoselect.min.css"\>

[**JQuery**](https://jquery.com/) is used and I am not shocked because **JQuery** is really handy for manipulating DOM. right? Actually, **JQuery** was used for drag-and-drop features! **JQuery** and [**Plotly**](https://plotly.com/javascript/), amazing! The most interesting part I found from the file is that the code level is bonded to **Object**. 

function Point(time, value) {
      this.time = time
      this.value = value
    }

    Point.prototype = {
      time: null,
      value: null,
      toString() {
        return this.time + ", " + this.value
      }
    }

    function TimeSeries(points) {
      this.points = points.sort((p1, p2) => {
        const t1 = p1.time.getTime()
        const t2 = p2.time.getTime()
        if (t1 > t2) {
          return 1
        }
        else if (t1 < t2) {
          return -1
        }
        else {
          return 0
        }
      })
      const pointByTime = {}
      for (const p of points) {
        pointByTime\[p.time.getTime()] = p
      }
      this.pointByTime = pointByTime
    }

And I love the way the Prototype concept is applied to the program. I mean yeah, this is a real-life example actually how **Prototype** concept of **JavaScript** can be applied. 

TimeSeries.prototype = {
      points: null, //Array(Point{time, value})
      pointByTime: null, // Map{ time => Point(time, value) }
      toString() {
        return this.points.length + " points"
      },

      length() {
        return this.points.length
      },

      timestamps() {
        return this.points.map(p => p.time)
      },

      values() {
        return this.points.map(p => p.value)
      },

      combine(anotherTimeSeries, binaryOp) {
        const points = \[]
        this.points.forEach(p => {
          const ap = anotherTimeSeries.pointByTime\[p.time.getTime()]
          if (ap) {
            points.push(new Point(p.time, binaryOp(p.value, ap.value)))
          }
          else {
            points.push(new Point(p.time, binaryOp(p.value, 0)))
          }
        })
        anotherTimeSeries.points.forEach(p => {
          const ap = this.pointByTime\[p.time.getTime()]
          if (!ap) {
            points.push(new Point(p.time, binaryOp(0, p.value)))
          }
        })
        return new TimeSeries(points)
      },

      plus(anotherTimeSeries) {
        return this.combine(anotherTimeSeries, function (a, b) {
          return a + b
        })
      },
      minus(anotherTimeSeries) {
        return this.combine(anotherTimeSeries, function (a, b) {
          return a - b
        })
      },
      mul(anotherTimeSeries) {
        return this.combine(anotherTimeSeries, function (a, b) {
          return a \* b
        })
      },
      div(anotherTimeSeries) {
        return this.combine(anotherTimeSeries, function (a, b) {
          return a / b
        })
      },
      mulScalar(scalar) {
        return new TimeSeries(this.points.map(p => new Point(p.time, p.value \* scalar)))
      },
      cumSum() {
        let sum = 0
        return new TimeSeries(this.points.map(p => {
          sum += p.value
          return new Point(p.time, sum)
        }))
      }
    }

Every operation for a time series is in one object. I was astonished after watching this file. Can you believe you can generate plotters without any fancy framework or runtime? It's just a single file containing pure **JavaScript**. I have seen lots of **CMS** on the market with these features which most likely have many unnecessary codes. And believe it or not, that's the reason I love **Jetbrain**'s developer so much because of the simplicity of their code. They always keep codes simple and clean.
