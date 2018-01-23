---
title: "Raymarching下的快速抗锯齿算法"
categories:
  - Fractal
date:   2018-01-20 14:43:00 +0800
tags:
  - Fractal
  - Graphics
---

<script type="text/javascript" async src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_CHTML"> </script>

<center><img src="/assets/images/aa/aa0.jpg"></center>
<br/>

## Anti-Aliasing
Raymarching 跟 Raytracing 一样，比起光栅化的管线，抗锯齿并不是那么容易，在光栅化渲染管线下， 简单利用 MSAA 就能做到基本的抗锯齿，并且性能一般不会受到太大影响，因为对 MSAA 来说， fragment shader 仍然只会对每个像素执行一次，再根据 primitive 对像素中采样点的覆盖情况来决定最后像素颜色，在某些架构下，MSAA 的开销甚至可以忽略不计。

而对 Raymaching 来说情况则不同，MSAA 在 Raymarching 下则需要对每个像素发射多条光线，导致求交/光照，甚至多级光线的的计算重复很多次， 计算量可以说是成倍增长，这样的方法，在实时计算中暂时只能在一些简单场景下使用。

本文介绍的方法来自于 eiffie，核心思想是在 Raymarching 的过程中，记录下经过的边，最后计算像素颜色的时候，Blend 所有经过的边和最终相交的点的颜色。这个算法在效果上不及超采样完美，但是速度非常快，更加适合实时的 Demo 中使用。

## 算法步骤

通常 Raymarching 中的求交是采用 Sphere Tracing 的方式，每次光线前进的距离等于当前光线所在点到场景中物体的最近距离，直到所在点到场景中物体表面的距离小于一定值，我们就认为光线击中物体表面：

```

float intersect( in vec3 ro, in vec3 rd )
{
	//当距离小于一个像素的大小，可认为相交
    float pixel_size = 0.5/(iResolution.y);

    float t = 1.0;
    for( int i=0; i<128; i++ )
    {
        float d = f(ro + rd * t);
        if( d < pixel_size * t ) break;
        t += c;
        if( t > 20.0 ) return -1.0;
    }
    return t;
}

```

但是光线不仅可以击中，也可以经过物体表面，最后停留在半空中，或者击中更远的物体，这时候，所经过的表面，就是最后投影到屏幕上的图像的“边”， 如果我们能够在 Marching 的时候检测到这样的边，就可以将边的颜色与背景/远处表面的颜色进行混合，以达到抗锯齿的效果，并且这样做的一个优势是，我们并不需要处理任何不在边上的点，比起超采样来说，可以极大的节省计算量。

如何检测到我们正在经过一条边呢？ 想象一下当我们路过一条边的时候，距离 d 值的变化情况，当我们不断接近物体表面的时候，d 值一定是递减的，如果我们 hit 到物体表面，d 值最终会减为 0 或者负值，但是如果我们路过了一条边，光线会继续前进，这时候会出现 d 值减小到一定程度之后，又开始增大，直到光线开始逼近下一个物体表面，d 又再次递减。由此可以推知，我们只需要记录上一次的 d 值： old\_d， 当我们发现本次的 d > old\_d 时， 表明这时候我们刚刚好经过了一条边。

有了判断边缘的方法，接下来就是选择是否记录边的条件，很简单，只有与 Ray Position 的距离小于一个像素大小的边，我们才需要记录。

于是我们有了新的求交计算：

```
{
	// 最多记录 3 条边
	float edges[3];
	edges[0]=edges[1]=edges[2]=-1.;
	int j = 0;
	float 
	float t=0.01， d=0.0, od=10.0;
	
	// 是否记录当前边
	bool b_record=false;

	for(int i=0;i<78;i++)
	{
		d=DE(ro+rd*t);
		t+=d;
		if(d>od)
		{
		 	// px*t 为距离t下的像素大小
			if(b_record && od<px*t && j<3)
			{
				edges[j]=t-od;
				j++;
				b_record=false;
			}
		}else b_record=true;
		od=d;
		
		// 需要一个足够小的值作为d的bailout条件
		// 否则会出现Banding Effect
		if(t>10.0 || d<0.00001)break;
	}    
}

```

在上面的计算中，我们获得了与物体表面交点的距离 t， 以及 Marching 过程中所经过的至多 3 条边的距离 edges[j]，现在我们只需要将它们的结果 Blend 起来即可：

```
for(i=2;i>=0;i--)
{
	// 存在边被记录
	if(edges[i]>0.0) 
	{
		float t = edges[i];
		col = mix(lighting(ro+rd*t, rd, pixel_size * edges[i]), col,
				clamp(f(ro+rd*t)/(pixel_size * t), 0.0, 1.0)));
				// Blending factor， 也就是点到表面的距离与像素大小的比值
	}
}

```

上面的 code 是对边的处理，对交点的处理类似，甚至可以用同样的 Blending 代码，因为对交点来说，d 值极小，col 就约等于 Lighting 的值。

### 进一步简化
上面的算法记录了3条边，最后最多需要4次 Lighting 计算，比起原始的方法还是增加了不少开销，在实际情况中，大多时候是不需要记录多条边即可取得非常好的效果，只需要记录第一条经过的边即可，也就是离视点最近的那条，这样一来，我们最后只需要计算2次 Lighting 即可。

```
vec4 intersect( in vec3 ro, in vec3 rd )
{
    float d_first = 0.0, t_first = 0.0;
    float old_d = 1000.0;
    float d_max = 1000.0, t_max = 0.0;
    float t = 1.0;
    float d = 100.0;
    
    for(int i = 0; i < 128; ++i) 
    {
        d = f(ro + rd * t);
        if(d_first == 0.0)  // 只记录第一条边
        {
            if(d > old_d)
            {
                if(old_d < pixel_size * (t - old_d))                					{
                    d_first = old_d;
                    t_first = t - old_d;
                }
            }
            old_d = d;
        }
        if(d < d_max) // max 表示 max occluder
        { 
            t_max = t; 
            d_max = d;
        }  
        if(d < 0.00001 || t > 20.0)             
        	break;
        t += d;
    }
    return vec4(t_max, d_max, t_first, d_first);
}

// Blending 示例
{
    if(d_max < pixel_size * t_max) // if the max occluder occludes the pixel
    {
        col = mix(lighting(ro+rd*t_max, rd, pixel_size * t_max), col, 
                  clamp(d_max/(pixel_size * t_max), 0.0, 1.0));
    }
    if(d_first == 0.0 || t_max == t_first)
    {
    	 t_first = t_max;
        d_first = d_max;
    }
    col = mix(lighting(ro + rd * t_first, rd, pixel_size*t_first),
             col, clamp(d_first/(pixel_size*t_first), 0.0, 1.0));
             
}

```

简化版效果，对比无AA的算法：

无 Anti-aliasing：
<center><img src="/assets/images/aa/noaa.png"></center>
<br/>

Anti-aliasing with 1 edge recorded：
<center><img src="/assets/images/aa/withaa.png"></center>
<br/>