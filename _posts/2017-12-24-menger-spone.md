---
title: "从 Menger Spone 到 KIFS"
categories:
  - Fractal
date:   2017-12-10 19:30:42 +0800
tags:
  - Fractal
  - Graphics
---

<script type="text/javascript" async src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_CHTML"> </script>

<center><img src="/assets/images/menger/menger_spone0.png"></center>
<br/>

之前一篇关于Menger Spong的2D形式的： [Menger Carpet](https://evil-ryu.github.io/fractal/menger-spone-introduction/)的推导给出了一个通过space-folding来实现一类IFS分形的通用方法， 它的公式是：


```
p = scale * p - C * (scale - 1.0);
```

其中C是一个常量，改变C值可以生成不同的形状， 对于Menger Spone / Carpet 来说

```
C = scale
```
<br />

这个公式最初是由Knighty得出的，利用这个通用的公式而生成的分形，被他称为 “Kaleidoscopic IFS“ 也就是 ”万花筒迭代函数系统“， 这个名字非常形象，因为通过这个公式得到分形确实眼花缭乱，千变万化。

比如，当scale=2， C = vec3(1.0)的时候，我们可以得到谢宾斯基三角体：

```
float tetrahedron(vec3 p){
	return (max(
            	max( -p.x-p.y-p.z, p.x+p.y-p.z ), 
            	max( -p.x+p.y+p.z, p.x-p.y+p.z ) 
        		)
        	-1.)/sqrt(3.0); 
}


float sierpinski(vec3 z){
    float scale = 2.;
	for (int n = 0; n < iter; n++) {
		// 沿y=-x，z=-x，z=-y 折叠
		if(z.x+z.y<0.){z.xy = -z.yx;}
      	if(z.x+z.z<0.){z.xz = -z.zx;}
      	if(z.y+z.z<0.){z.yz = -z.zy;}
		z = z*2.-1.;
    }
    return tetrahedron(z) * pow(2., -iter);
}
```

<center><img src="/assets/images/menger/sierpinski0.png"></center>
<br/>

