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

Menger Spone就是 Menger Carpet 的 3D 版本，之前一篇关于Menger Spong的2D形式： [Menger Carpet](https://evil-ryu.github.io/fractal/menger-spone-introduction/)的推导给出了一个通过space-folding来实现一类IFS分形的通用方法， 它的公式是：


```
p = scale * p - C * (scale - 1.0);
```

其中C是一个常量，改变C值可以生成不同的形状， 对于Menger Spone / Carpet 来说

```
C = scale
```
<br />
我们将这个公式推广到3D空间中，就自然得到了2D分形的3D形式。

这个公式最初是由Knighty得出的，利用这个通用的公式而生成的分形，被他称为 “Kaleidoscopic IFS“ 也就是 ”万花筒迭代函数系统“， 这个名字非常形象，因为通过这个公式得到分形确实眼花缭乱，千变万化。

比如，当scale=2， C = vec3(1.0)的时候，我们可以得到著名的谢宾斯基三角形的3D形式：

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

又比如，scale = 2.3, C = vec3(3.0, 0.0, 1.0)：
<center><img src="/assets/images/menger/menger_spone1.png"></center>
<br/>

或者：
<center><img src="/assets/images/menger/menger_spone_rotated.png"></center>
<br/>

近距离观察一下：
<center><img src="/assets/images/menger/menger_spone_close.png"></center>
<br/>

当然只是调整这两个参数可能还不够有趣，但是不要忘了我们还有不同的空间折叠的方法，甚至在折叠期间，还可以对坐标进行旋转和缩放变换，旋转变换带来的变化非常之大，例如：
<center><img src="/assets/images/menger/menger_spone_wierd.png"></center>
<br/>
这是在折叠之前之后沿不同坐标轴做了旋转，看起来像是一块外星矿石，注意它表面复杂的细节，这是通常modeling不容易做到的，在构建一些特别的场景中会很有用。

旋转变换并不是都会导致生成的几何体太过不规则，比如下面这个：
<center><img src="/assets/images/menger/menger_tree.png"></center>
<br/>
这是一个在空间折叠前后都沿y轴旋转变换的分形，由于前后都沿同一个轴旋转，所以它对称的特性得到了保留，在这样结构特征明显的分形上继续创作的空间也会比较大。

KIFS在通用的实现思想下，提供了非常了充分的想象空间，在折叠变换固定的情况下，我们其实可以将其余参数设为随时间变化的变量，这样可以遍历不同分形，同时也可以观察到不同分形之间的平滑变换，也是一个搜寻你需要分形的好方法。
