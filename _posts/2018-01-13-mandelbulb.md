---
title: "MandelBulb 的绘制方法"
categories:
  - Fractal
date:   2018-01-13 14:43:00 +0800
tags:
  - Fractal
  - Graphics
---

<script type="text/javascript" async src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_CHTML"> </script>

<center><img src="/assets/images/mandelbulb/bulb0.jpg"></center>
<br/>


## Mandelbrot 的 3D 形式
对于找寻 Mandelbrot 的 3D 形式其实是经历了很多年的，2009年，Fractal Forum 上才有人渲染出了当时最接近真实 Mandelbrot 3D 的 MandelBulb。接着就是一次 3D Fractal 渲染的爆发，紧接着的接下来几年内，各种分形的 3D 形式， 包括他们的变种和混合，一个接一个的出现，直到16年底的圣诞节，都还有重大的新发现：[3D Kleinian group limit sets][1]。
这些分形的 3D 绘制，很大程度上都要归功于 Distance Estimation，最早利用 Distance Estimation 绘制 3D Fractal 的是 Hart，他可以说是做 Distance Based Rendering 的祖师爷了，在他 1989 年的 paper：[RayTracing Deterministic 3D Fractals][2] 中就描述了如何使用 Distance Estimation 来绘制 Julia 集的 3D 形式。

从1989年到2009年，分形绘制经历了20年才又热门起来，这其中不仅是硬件的发展使得 3D 分形渲染可以实时进行，而且也要归功于那些不断创造的大神们。

MandelBulb 可以说是 3D 分形里面最为出名的了，即使你从未接触过 3D 分形绘制，相信你也有很大可能早已在大荧幕上见识过 MandelBulb 的风采，比如，2016年《奇异博士》中：
 
<figure>
  <img src="/assets/images/mandelbulb/drstrange0.jpg" alt="what"/>
  <figcaption>电影奇异博士中的 Mandelbulb.</figcaption>
</figure> 

<br/>

<figure>
  <img src="/assets/images/mandelbulb/drstrange1.jpg" alt="what"/>
  <figcaption>从 Mandelbulb 中伸出的无数双手。 </figcaption>
</figure> 

<br/>

其实在这部电影中我们可以看到很多分形的运用，特别是大量的空间折叠， 也许只有魔法这样神秘的东西才能与分形完美的融合。

## Mandelbulb
### 公式的扩展
首先我们还是回顾一下 Mandelbrot set 的公式：

$$z_{n+1} = z_n^2 + c $$

Mandelbrot Set 就是经历上述迭代而不发散的点集， 那么现在的问题在于，如何把它推广到 3D, 要知道 Mandelbrot Set 是定义在复平面上的，而复数只有两个分量，而想要强行再加一个分量形成 3D 的系统实际上是做不到的，我们可以假设
新的分量为$$j$$， 那我们就必须定义$$ij$$的值，但是无论怎么定义$$ij$$，这个系统都不是自洽的。

除非你愿意减弱你的系统，比如牺牲掉交换律，结合律等等，比如我们熟悉的 Quaternions 是 4D 的系统，但是它丢掉了交换律，再往上 8D 的 Octonions，连结合律也没了。

强行加入一个分量来渲染出的图形，离真正的 3D Mandelbrot 差得太远，所以这样行不通。
但是实际上 Quaternions 是可以生成比较有趣的形状的，看起来是这样的:

<center><img src="/assets/images/mandelbulb/bulb1.jpg"></center>
<br/>

还原了 Mandelbrot set 的大致轮廓，但是大量本该有的细节却全都被抹平了。所以我们还是需要探索更加接近 Mandelbrot set 的 3D 形式。

回到 2D 的复平面上来，我们知道虚部$$i$$从几何上可以看做逆时针90度的旋转变换，因为从$$1$$到$$-1$$刚好旋转两次90度，也就是$$i*i=-1$$，那么在复平面上，如果我们对一个复数向量取平方，得到结果向量的长度也即使原长度的平方，与实轴的夹角是原夹角的2倍。那么我们何不在 3D 空间中也模拟相同的操作呢？

由此我们将这个迭代，应用在 3D 球坐标系中，每次迭代将向量的长度平方，将向量的夹角加倍，这样我们就可以渲染出一个看起来更接近 3D Mandelbrot 的形状，但是当我们再进一步，将迭代公式改为：
$$z_{n+1}=z_n^8+c$$
的时候，我们就终于得到了大明星：Mandelbulb。
为什么这里取8次方呢，其实没有其他原因，完全是从美学角度考虑，就是因为8次方的情况下，bulb 的数量不多不少，没有尖锐的拉伸，也不至于臃肿，完全浑然天成。

### Distance Estimation for Mandelbulb
让我们写出 Mandelbulb 在球坐标下的公式：

**公式1：**

$$z_{n+1} = r_n^8 * (sin(8\theta)cos(8\phi) + i cos(8\theta) + j sin(8\theta)sin(8*\theta) + c$$

其中：

\begin{cases}
r = sqrt(x^2 + y^2 + z^2) \\\
\theta = acos({y \over r}) \\\
\phi = atan({z \over x})
\end{cases}

这个公式，根据计算球坐标方式的不同，还有一个变种：

**公式2：**

$$z_{n+1} = r_n^8 * (cos(8\theta)cos(8\phi) + i sin(8\theta)cos(8\phi) + j sin(8\phi)) + c$$

其中：

\begin{cases}
r = sqrt(x^2 + y^2 + z^2) \\\
\theta = atan({y \over x}) \\\ 
\phi = asin({z \over r})
\end{cases}

这两个公式生成的形状略有不同：

公式1：

<center><img src="/assets/images/mandelbulb/bulb2.jpg"></center>
<br/>

公式2：

<center><img src="/assets/images/mandelbulb/bulb3.jpg"></center>
<br/>

公式2生成的 Mandelbulb 顶端更为收缩，并且避免了公式1中如果从球坐标转换到笛卡尔坐标，会出现$$(x, y, z) = (x, -y, z)$$ 的情形。

剩下的就是为 Mandelbulb 找到一个 Distance Estimator，在 Hart 的 paper [RayTracing Deterministic 3D Fractals][2] 中给出了一个经典的 Distance Estimator，也是基于Douady-Hubbard 势函数：

$$d = { { G(c) \over 2*|G'(c)| } logG(z)}$$

其中：

$$G(c) = \lim_{n \to \infty} {1 \over 2^n} \log |z_n|$$

所以展开可以得到:

$$d = \lim_{n \to \infty} {0.5*|z_n| log|z_n| \over |z_n'|} = \lim_{n \to \infty}{0.5*r*logr \over dr}$$

Estimator 还有一些不同形式，涉及到更多的数学推导，由于最常用的还是以上公式，这里就不再赘述。

**核心code**

```
for(int i = 0; i < 7; ++i) 
{
	r = length(z);
	if(r > 2.0) continue;
	theta = atan(z.y / z.x);
    phi = asin(z.z / r);
    // running derivative
	dr = pow(r, power - 1.0) * dr * power + 1.0;  
	r = pow(r, power);
	theta = theta * power;
	phi = phi * power;
	
	z = r * vec3(cos(theta)*cos(phi), sin(theta)*cos(phi), sin(phi)) + p;
}
float dist = 0.5 * log(r) * r / dr;
```


  [1]: ---%20title:%20%22MandelBulb%20%E7%9A%84%E7%BB%98%E5%88%B6%E6%96%B9%E6%B3%95%22%20categories:%20%20%20-%20Fractal%20date:%20%20%202018-01-13%2014:43:00%20+0800%20tags:%20%20%20-%20Fractal%20%20%20-%20Graphics%20---%20%20%3Cscript%20type=%22text/javascript%22%20async%20src=%22https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_CHTML%22%3E%20%3C/script%3E%20%20%3Ccenter%3E%3Cimg%20src=%22/assets/images/mandelbulb/julia0.png%22%3E%3C/center%3E%20%3Cbr/%3E%20%20%20##%20Mandelbrot%20%E7%9A%84%203D%20%E5%BD%A2%E5%BC%8F%20%E5%AF%B9%E4%BA%8E%E6%89%BE%E5%AF%BB%20Mandelbrot%20%E7%9A%84%203D%20%E5%BD%A2%E5%BC%8F%E5%85%B6%E5%AE%9E%E6%98%AF%E7%BB%8F%E5%8E%86%E4%BA%86%E5%BE%88%E5%A4%9A%E5%B9%B4%E7%9A%84%EF%BC%8C2009%E5%B9%B4%EF%BC%8CFractal%20Forum%20%E4%B8%8A%E6%89%8D%E6%9C%89%E4%BA%BA%E6%B8%B2%E6%9F%93%E5%87%BA%E4%BA%86%E5%BD%93%E6%97%B6%E6%9C%80%E6%8E%A5%E8%BF%91%E7%9C%9F%E5%AE%9E%20Mandelbrot%203D%20%E7%9A%84%20MandelBulb%E3%80%82%E6%8E%A5%E7%9D%80%E5%B0%B1%E6%98%AF%E4%B8%80%E6%AC%A1%203D%20Fractal%20%E6%B8%B2%E6%9F%93%E7%9A%84%E7%88%86%E5%8F%91%EF%BC%8C%E7%B4%A7%E6%8E%A5%E7%9D%80%E7%9A%84%E6%8E%A5%E4%B8%8B%E6%9D%A5%E5%87%A0%E5%B9%B4%E5%86%85%EF%BC%8C%E5%90%84%E7%A7%8D%E5%88%86%E5%BD%A2%E7%9A%84%203D%20%E5%BD%A2%E5%BC%8F%EF%BC%8C%20%E5%8C%85%E6%8B%AC%E4%BB%96%E4%BB%AC%E7%9A%84%E5%8F%98%E7%A7%8D%E5%92%8C%E6%B7%B7%E5%90%88%EF%BC%8C%E4%B8%80%E4%B8%AA%E6%8E%A5%E4%B8%80%E4%B8%AA%E7%9A%84%E5%87%BA%E7%8E%B0%EF%BC%8C%E7%9B%B4%E5%88%B016%E5%B9%B4%E5%BA%95%E7%9A%84%E5%9C%A3%E8%AF%9E%E8%8A%82%EF%BC%8C%E9%83%BD%E8%BF%98%E6%9C%89%E6%96%B0%E7%9A%84%E5%8F%91%E7%8E%B0%EF%BC%9A
  [2]: https://graphics.cs.illinois.edu/sites/default/files/rtqjs.pdf
  [3]: https://evil-ryu.github.io/fractal/mandelbrot/