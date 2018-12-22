var idx = lunr(function () {
  this.field('title', {boost: 10})
  this.field('excerpt')
  this.field('categories')
  this.field('tags')
  this.ref('id')
});



  
  
    idx.add({
      title: "Menger Carpet 2D 与 Space Folding",
      excerpt: "Menger Carpet 是属于IFS类型的分形，也就是可以通过无穷次迭代变换来产生的分形,对于这类型的分形，我们可以使用 space-folding 算法来生成，这个方法非常巧妙，而且与我们的剪纸异曲同工，这篇文章就以Menger Carpet为例，详细解释Space-Folding算法的推导过程。 Distance Field 基于距离场的绘制方法是本文要讲解的算法的基础，这里简单提一下理解 Space-folding 所需要的基本知识。 如果读者接触过基于距离场的绘制的话，其实已经接触过 Space-folding 了，一个最简单的 Space-folding 函数就是: p.x=abs(p.x) 这个“abs“将空间沿 y 轴折叠，所有只在...",
      categories: ["Fractal"],
      tags: ["Fractal","Graphics"],
      id: 0
    });
    
  
    idx.add({
      title: "从 Menger Spone 到 KIFS",
      excerpt: "Menger Spone就是 Menger Carpet 的 3D 版本，之前一篇关于Menger Spone的2D形式： Menger Carpet的推导给出了一个通过space-folding来实现一类IFS分形的通用方法， 它的公式是： p = scale * p - C * (scale...",
      categories: ["Fractal"],
      tags: ["Fractal","Graphics"],
      id: 1
    });
    
  
    idx.add({
      title: "利用 Circle Inversion 实现 Apollonian Fractal",
      excerpt: "Circle Inversion (圆的反演变换） 反演变换是生成一类 Kleinian Group 分形的关键方法，所以这里首先简单回顾它的数学定义： 假设以为圆心的圆半径为， 对任意点, 如果不在圆心， 的对这个圆的反演落在射线上，并且有。这个圆就称作反演圆，圆心称作反演中心。 圆的反演变换又以下六个性质： 一个不穿过反演中心的圆的反演是一个圆 一个穿过反演中心的圆的反演是一条直线 一条不穿过反演中心的直线的反演是一个穿过反演中心的圆 一个垂直于反演圆的反演是它本身 一条穿过反演中心的直线的反演是它本身 图略 反演变换是保角变换 Apollonian...",
      categories: ["Fractal"],
      tags: ["Fractal","Graphics"],
      id: 2
    });
    
  
    idx.add({
      title: "Mandelbrot Set 的平滑绘制",
      excerpt: "Mandelbrot Set 定义： 对于复平面上任意一点，如果在 orbit 从0开始的二次映射 下 值永远小于等于，那么这个点属于 Mandelbrot Set。 根据定义，我们就可以对平面上所有像素计算这个迭代，从而得到每个像素是否属于Mandelbrot Set. 注：这里定义中所谓的 orbit 表示迭代过程中点的轨迹，每次迭代计算得到的结果，即为 orbit 中的一点。很容易计算得到，Mandelbrot Set 的 orbit...",
      categories: ["Fractal"],
      tags: ["Fractal","Graphics"],
      id: 3
    });
    
  
    idx.add({
      title: "MandelBulb 的绘制方法",
      excerpt: "Mandelbrot 的 3D 形式 对于找寻 Mandelbrot 的 3D 形式其实是经历了很多年的，2009年，Fractal Forum 上才有人渲染出了当时最接近真实 Mandelbrot 3D 的 Mandelbulb。接着就是一次 3D Fractal 渲染的爆发，紧接着的接下来几年内，各种分形的 3D 形式，...",
      categories: ["Fractal"],
      tags: ["Fractal","Graphics"],
      id: 4
    });
    
  
    idx.add({
      title: "Raymarching下的快速抗锯齿算法",
      excerpt: "Anti-Aliasing Raymarching 跟 Raytracing 一样，比起光栅化的管线，抗锯齿并不是那么容易，在光栅化渲染管线下， 简单利用 MSAA 就能做到基本的抗锯齿，并且性能一般不会受到太大影响，因为对 MSAA 来说， fragment shader 仍然只会对每个像素执行一次，再根据 primitive 对像素中采样点的覆盖情况来决定最后像素颜色，在某些架构下，MSAA 的开销甚至可以忽略不计。 而对 Raymaching 来说情况则不同，MSAA 在...",
      categories: ["Fractal"],
      tags: ["Fractal","Graphics"],
      id: 5
    });
    
  
    idx.add({
      title: "Linearly Transformed Cosines 详解与实现",
      excerpt: "简介 近年来最优秀的一个实时面光源光照算法，出自2016年 Eric Heitz 的 paper，这个算法巧妙地解决了难以在 polygon 上计算复杂 BRDF 的积分的问题，让面光源也可以放心地用在 shader demo 中，虽然目前我还没想到非常适合展示面光源的 demo，不过还是先写下这篇笔记，帮助大家快速理解论文中的思想和一些推导的过程。 算法 在实时计算中，面光源的计算一般没法通过采样来做，所以最好就是能找到渲染方程的解析解，无奈的是，对于复杂的 BRDF， 要么解析解也是计算量非常大，要么就根本找不到。所以当前解析解只限于简单的，类似于 cosine 分布的...",
      categories: ["Fractal"],
      tags: ["Lighting","Graphics"],
      id: 6
    });
    
  
    idx.add({
      title: "基于法向量构建本地正交标架的快速算法",
      excerpt: "Local Basis 说到本地正交标架，通常在图形学里就是指 normal，tangent，bitangent 所构成的本地坐标系，在这样的本地坐标系下，很多操作和计算都会更加简单直观。 但是大多数情况下，我们能获得的信息也就只有 normal 而已，所以我们需要一个方法单从 normal 来构造出一个正交标架，最直观的办法就是先任意选取一个不与 normal 重叠向量，然后通过两次叉乘和归一化来获得这个正交标架，这个计算量看起来并不算大，比如在最常见的需要构建一个本地标架的情形：摄像机坐标系（view space）中，每一帧只需要根据相机的当前姿态计算一次即可，但是对于另外一些情形，如 PathTracing，则需要大量计算本地标架，这时候一个更加轻量级的算法就显得有必要了。 下文介绍的是最快的一种算法，来自于Frisvad，这个算法基于四元数（quaternion），通过找到一个 quaternion 将 向量 （也就是本地标架中的 normal）变换到世界坐标中的...",
      categories: ["Fractal"],
      tags: ["Graphics"],
      id: 7
    });
    
  
    idx.add({
      title: "More Space Folding，空间折叠进阶",
      excerpt: "空间折叠回顾 在之前的post中，已经介绍过基本的 Space Folding，通过迭代这些简单的折叠，我们可以生成极为复杂的分形。涉及到的空间折叠包括沿坐标轴，沿任意线性函数，乃至于圆的反演变换， 而本文将介绍一种基于反射的折叠方法，这种方法能将坐标空间折叠到特定的对称图形中，不仅能依靠这种方法直接绘制一系列几何体，而且可以被应用到各种造型中，创造更灵活的形状，值得一提的是，这个折叠方法再一次来源于伟大的 knighty！诶我为什么要说又。 Anyways，无论是三维空间中的三角形： 八边形： 还是五角星： 都能通过简单几次空间折叠直接绘制出来，而不需要借助通常的方法，譬如求到解析函数的距离，或者基于预定义法向量的方法。 分形的一部分，在计算前被折叠到了近似三角形的空间中。 基于反射的折叠 对于任何图形学爱好者来说，对光线反射的计算不能更熟悉了。 对入射向量 I，反射向量 R = I - 2.0...",
      categories: ["Fractal"],
      tags: ["Graphics"],
      id: 8
    });
    
  
    idx.add({
      title: "Voronoi与伪Voronoi Pattern的快速生成算法",
      excerpt: "Voronoi 给定平面中的 N 个采样点 (seeds)， 对于每个 seed：， 平面中存在一个区域，区域中所有点到 的距离，比到除 外其他所有 seeds 的距离都近，那么这个区域被称为一个 voronoi cell。 这 N 个采样点，就按照最邻近原则划分了平面，如果读者接触过 Delaunay Triangulation 的话，Delauney...",
      categories: ["Noise"],
      tags: ["Graphics"],
      id: 9
    });
    
  
    idx.add({
      title: "Log Bisection Tracing",
      excerpt: "Sphere Tracing 的问题 在 SDF 存在 overestimation 的情况下，sphere tracing 得到的距离场出现了扭曲。 由于并非所有 SDF 都是完美的， 在存在距离估计过大，或者 SDF 有奇点等情况，sphere tracing 会存在穿过表面，甚至穿过了比较薄的物体的情况，这时候一个解决办法就是 Bisection， 保存上一次的距离值，跟最后得到的距离值做...",
      categories: ["Raymarching"],
      tags: ["Graphics"],
      id: 10
    });
    
  
    idx.add({
      title: "SIGGRAPH 2018 总结",
      excerpt: "SIGGRAPH 2018 今年的 SIGGRAPH 在加拿大温哥华举办，历史上来说，SIGGRAPH 在洛杉矶举办的次数是最多的，得益于它是好莱坞的所在地，基本上也只有在洛杉矶举办才是赚钱的，恰好温哥华的电影工业也是高度发达，被称为”北方好莱坞”，因此也非常适合 SIGGRAPH 的举办，今年也是温哥华第二次迎来 SIGGRAPH。 第一天 我们早早来到了 Vancouver Convention Centre，会议的举办地，毗邻港口，风景宜人，标志性的像素海豚是众多游客拍照留念的地方。 Convention Centre 港口的游轮，每天都不一样 像素海豚 会议前一天下午就可以注册了，我们抵达的时候已经是排起了长队。 会场入口...",
      categories: ["Conference"],
      tags: ["Graphics"],
      id: 11
    });
    
  
    idx.add({
      title: "Tokyo Demo Fest 2018 见闻",
      excerpt: "Tokyo Demo Fest 简介 Tokyo Demo Fest（http://tokyodemofest.jp/2018） 是一个 Demo Party， 也是亚洲唯一的 Demo Party， 从 2011 年开始， 到今年已经举办了 8 届了。 （如果你不知道什么是...",
      categories: ["Demoscene"],
      tags: ["Demoscene","Graphics"],
      id: 12
    });
    
  


console.log( jQuery.type(idx) );

var store = [
  
    
    
    
      
      {
        "title": "Menger Carpet 2D 与 Space Folding",
        "url": "http://localhost:4000/fractal/menger-spone-introduction/",
        "excerpt": "Menger Carpet 是属于IFS类型的分形，也就是可以通过无穷次迭代变换来产生的分形,对于这类型的分形，我们可以使用 space-folding 算法来生成，这个方法非常巧妙，而且与我们的剪纸异曲同工，这篇文章就以Menger Carpet为例，详细解释Space-Folding算法的推导过程。 Distance Field 基于距离场的绘制方法是本文要讲解的算法的基础，这里简单提一下理解 Space-folding 所需要的基本知识。 如果读者接触过基于距离场的绘制的话，其实已经接触过 Space-folding 了，一个最简单的 Space-folding 函数就是: p.x=abs(p.x) 这个“abs“将空间沿 y 轴折叠，所有只在...",
        "teaser":
          
            null
          
      },
    
      
      {
        "title": "从 Menger Spone 到 KIFS",
        "url": "http://localhost:4000/fractal/menger-spone/",
        "excerpt": "Menger Spone就是 Menger Carpet 的 3D 版本，之前一篇关于Menger Spone的2D形式： Menger Carpet的推导给出了一个通过space-folding来实现一类IFS分形的通用方法， 它的公式是： p = scale * p - C * (scale...",
        "teaser":
          
            null
          
      },
    
      
      {
        "title": "利用 Circle Inversion 实现 Apollonian Fractal",
        "url": "http://localhost:4000/fractal/apollonian/",
        "excerpt": "Circle Inversion (圆的反演变换） 反演变换是生成一类 Kleinian Group 分形的关键方法，所以这里首先简单回顾它的数学定义： 假设以为圆心的圆半径为， 对任意点, 如果不在圆心， 的对这个圆的反演落在射线上，并且有。这个圆就称作反演圆，圆心称作反演中心。 圆的反演变换又以下六个性质： 一个不穿过反演中心的圆的反演是一个圆 一个穿过反演中心的圆的反演是一条直线 一条不穿过反演中心的直线的反演是一个穿过反演中心的圆 一个垂直于反演圆的反演是它本身 一条穿过反演中心的直线的反演是它本身 图略 反演变换是保角变换 Apollonian...",
        "teaser":
          
            null
          
      },
    
      
      {
        "title": "Mandelbrot Set 的平滑绘制",
        "url": "http://localhost:4000/fractal/mandelbrot/",
        "excerpt": "Mandelbrot Set 定义： 对于复平面上任意一点，如果在 orbit 从0开始的二次映射 下 值永远小于等于，那么这个点属于 Mandelbrot Set。 根据定义，我们就可以对平面上所有像素计算这个迭代，从而得到每个像素是否属于Mandelbrot Set. 注：这里定义中所谓的 orbit 表示迭代过程中点的轨迹，每次迭代计算得到的结果，即为 orbit 中的一点。很容易计算得到，Mandelbrot Set 的 orbit...",
        "teaser":
          
            null
          
      },
    
      
      {
        "title": "MandelBulb 的绘制方法",
        "url": "http://localhost:4000/fractal/mandelbulb/",
        "excerpt": "Mandelbrot 的 3D 形式 对于找寻 Mandelbrot 的 3D 形式其实是经历了很多年的，2009年，Fractal Forum 上才有人渲染出了当时最接近真实 Mandelbrot 3D 的 Mandelbulb。接着就是一次 3D Fractal 渲染的爆发，紧接着的接下来几年内，各种分形的 3D 形式，...",
        "teaser":
          
            null
          
      },
    
      
      {
        "title": "Raymarching下的快速抗锯齿算法",
        "url": "http://localhost:4000/fractal/raymarchingAA/",
        "excerpt": "Anti-Aliasing Raymarching 跟 Raytracing 一样，比起光栅化的管线，抗锯齿并不是那么容易，在光栅化渲染管线下， 简单利用 MSAA 就能做到基本的抗锯齿，并且性能一般不会受到太大影响，因为对 MSAA 来说， fragment shader 仍然只会对每个像素执行一次，再根据 primitive 对像素中采样点的覆盖情况来决定最后像素颜色，在某些架构下，MSAA 的开销甚至可以忽略不计。 而对 Raymaching 来说情况则不同，MSAA 在...",
        "teaser":
          
            null
          
      },
    
      
      {
        "title": "Linearly Transformed Cosines 详解与实现",
        "url": "http://localhost:4000/fractal/linearly-transformed-cosines/",
        "excerpt": "简介 近年来最优秀的一个实时面光源光照算法，出自2016年 Eric Heitz 的 paper，这个算法巧妙地解决了难以在 polygon 上计算复杂 BRDF 的积分的问题，让面光源也可以放心地用在 shader demo 中，虽然目前我还没想到非常适合展示面光源的 demo，不过还是先写下这篇笔记，帮助大家快速理解论文中的思想和一些推导的过程。 算法 在实时计算中，面光源的计算一般没法通过采样来做，所以最好就是能找到渲染方程的解析解，无奈的是，对于复杂的 BRDF， 要么解析解也是计算量非常大，要么就根本找不到。所以当前解析解只限于简单的，类似于 cosine 分布的...",
        "teaser":
          
            null
          
      },
    
      
      {
        "title": "基于法向量构建本地正交标架的快速算法",
        "url": "http://localhost:4000/fractal/basis-from-normal/",
        "excerpt": "Local Basis 说到本地正交标架，通常在图形学里就是指 normal，tangent，bitangent 所构成的本地坐标系，在这样的本地坐标系下，很多操作和计算都会更加简单直观。 但是大多数情况下，我们能获得的信息也就只有 normal 而已，所以我们需要一个方法单从 normal 来构造出一个正交标架，最直观的办法就是先任意选取一个不与 normal 重叠向量，然后通过两次叉乘和归一化来获得这个正交标架，这个计算量看起来并不算大，比如在最常见的需要构建一个本地标架的情形：摄像机坐标系（view space）中，每一帧只需要根据相机的当前姿态计算一次即可，但是对于另外一些情形，如 PathTracing，则需要大量计算本地标架，这时候一个更加轻量级的算法就显得有必要了。 下文介绍的是最快的一种算法，来自于Frisvad，这个算法基于四元数（quaternion），通过找到一个 quaternion 将 向量 （也就是本地标架中的 normal）变换到世界坐标中的...",
        "teaser":
          
            null
          
      },
    
      
      {
        "title": "More Space Folding，空间折叠进阶",
        "url": "http://localhost:4000/fractal/space-folding-advanced/",
        "excerpt": "空间折叠回顾 在之前的post中，已经介绍过基本的 Space Folding，通过迭代这些简单的折叠，我们可以生成极为复杂的分形。涉及到的空间折叠包括沿坐标轴，沿任意线性函数，乃至于圆的反演变换， 而本文将介绍一种基于反射的折叠方法，这种方法能将坐标空间折叠到特定的对称图形中，不仅能依靠这种方法直接绘制一系列几何体，而且可以被应用到各种造型中，创造更灵活的形状，值得一提的是，这个折叠方法再一次来源于伟大的 knighty！诶我为什么要说又。 Anyways，无论是三维空间中的三角形： 八边形： 还是五角星： 都能通过简单几次空间折叠直接绘制出来，而不需要借助通常的方法，譬如求到解析函数的距离，或者基于预定义法向量的方法。 分形的一部分，在计算前被折叠到了近似三角形的空间中。 基于反射的折叠 对于任何图形学爱好者来说，对光线反射的计算不能更熟悉了。 对入射向量 I，反射向量 R = I - 2.0...",
        "teaser":
          
            null
          
      },
    
      
      {
        "title": "Voronoi与伪Voronoi Pattern的快速生成算法",
        "url": "http://localhost:4000/noise/voronoi/",
        "excerpt": "Voronoi 给定平面中的 N 个采样点 (seeds)， 对于每个 seed：， 平面中存在一个区域，区域中所有点到 的距离，比到除 外其他所有 seeds 的距离都近，那么这个区域被称为一个 voronoi cell。 这 N 个采样点，就按照最邻近原则划分了平面，如果读者接触过 Delaunay Triangulation 的话，Delauney...",
        "teaser":
          
            null
          
      },
    
      
      {
        "title": "Log Bisection Tracing",
        "url": "http://localhost:4000/raymarching/log-bisection-tracing/",
        "excerpt": "Sphere Tracing 的问题 在 SDF 存在 overestimation 的情况下，sphere tracing 得到的距离场出现了扭曲。 由于并非所有 SDF 都是完美的， 在存在距离估计过大，或者 SDF 有奇点等情况，sphere tracing 会存在穿过表面，甚至穿过了比较薄的物体的情况，这时候一个解决办法就是 Bisection， 保存上一次的距离值，跟最后得到的距离值做...",
        "teaser":
          
            null
          
      },
    
      
      {
        "title": "SIGGRAPH 2018 总结",
        "url": "http://localhost:4000/conference/siggraph2018/",
        "excerpt": "SIGGRAPH 2018 今年的 SIGGRAPH 在加拿大温哥华举办，历史上来说，SIGGRAPH 在洛杉矶举办的次数是最多的，得益于它是好莱坞的所在地，基本上也只有在洛杉矶举办才是赚钱的，恰好温哥华的电影工业也是高度发达，被称为”北方好莱坞”，因此也非常适合 SIGGRAPH 的举办，今年也是温哥华第二次迎来 SIGGRAPH。 第一天 我们早早来到了 Vancouver Convention Centre，会议的举办地，毗邻港口，风景宜人，标志性的像素海豚是众多游客拍照留念的地方。 Convention Centre 港口的游轮，每天都不一样 像素海豚 会议前一天下午就可以注册了，我们抵达的时候已经是排起了长队。 会场入口...",
        "teaser":
          
            null
          
      },
    
      
      {
        "title": "Tokyo Demo Fest 2018 见闻",
        "url": "http://localhost:4000/demoscene/tdf2018/",
        "excerpt": "Tokyo Demo Fest 简介 Tokyo Demo Fest（http://tokyodemofest.jp/2018） 是一个 Demo Party， 也是亚洲唯一的 Demo Party， 从 2011 年开始， 到今年已经举办了 8 届了。 （如果你不知道什么是...",
        "teaser":
          
            null
          
      }
    
  ]

$(document).ready(function() {
  $('input#search').on('keyup', function () {
    var resultdiv = $('#results');
    var query = $(this).val();
    var result = idx.search(query);
    resultdiv.empty();
    resultdiv.prepend('<p class="results__found">'+result.length+' Result(s) found</p>');
    for (var item in result) {
      var ref = result[item].ref;
      if(store[ref].teaser){
        var searchitem =
          '<div class="list__item">'+
            '<article class="archive__item" itemscope itemtype="http://schema.org/CreativeWork">'+
              '<h2 class="archive__item-title" itemprop="headline">'+
                '<a href="'+store[ref].url+'" rel="permalink">'+store[ref].title+'</a>'+
              '</h2>'+
              '<div class="archive__item-teaser">'+
                '<img src="'+store[ref].teaser+'" alt="">'+
              '</div>'+
              '<p class="archive__item-excerpt" itemprop="description">'+store[ref].excerpt+'</p>'+
            '</article>'+
          '</div>';
      }
      else{
    	  var searchitem =
          '<div class="list__item">'+
            '<article class="archive__item" itemscope itemtype="http://schema.org/CreativeWork">'+
              '<h2 class="archive__item-title" itemprop="headline">'+
                '<a href="'+store[ref].url+'" rel="permalink">'+store[ref].title+'</a>'+
              '</h2>'+
              '<p class="archive__item-excerpt" itemprop="description">'+store[ref].excerpt+'</p>'+
            '</article>'+
          '</div>';
      }
      resultdiv.append(searchitem);
    }
  });
});
