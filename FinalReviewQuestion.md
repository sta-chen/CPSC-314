What is a metamer? 

What is a BRDF? 

Write a fragment shader that implements Phong shading. 

What colours do S,M, and L cones (receptors in the eye) correspond to? 

Describe an experiment that can be used to quantitatively define how humans perceive color. 

Sketch a CIE chromaticity diagram. Describe (a) why RGB are the best primary colours to use in displays; (b) why RGB monitors cannot display some colours. 

Sketch the RGB colour cube and label the colours at the corners. 

What property does the XYZ colour space have, that the RGB colour space does not have? 

What is a colour gamut? What does the gamue of an RGB display look like? 

Given a square with values at the corners given by:
v01 = 1   v11 = 1
v00 = 0   v10 = 2
use bilinear interpolation to compute the value at the fractional coordinates (0.8,0.2). 

Give three examples of materials where a model of the subsurface scattering is likely necessary to achieve realistic rendering. 

A spherical tree ornament is covered by threads that run from the top (N pole) to the bottom (S pole). This produces a unique anisotropic surface reflection. Describe in general terms how this can be implemented in a fragment shader. 

A scene has a set of vertical stripes that alternate between black-and-white, and each stripe has a width of 0.7 pixels. Suppose we render this by simply sampling the colour that immediately lies underneath the center of the pixel. This produces an aliasing pattern. Specifically describe or sketch the resulting pattern. 

Give two examples of caustics. Why do they occur? 

What is ambient occlusion rendering? 

What does a light path described by "LDDSE" refere to? Is this light path modeled by raytracing? A local-illumination model? By pathtracing? 

A ray-sphere intersection produces only one intersection point. Describe the situation that would produce this result. 

A raytracer requires intersecting rays with all objects and triangles in the scene. How can this be done efficiently? 

Is the Phong illumination model physics-based, i.e., does it preserve energy? 

Give two examples of termination conditions for the ray-tracing recursion. 

Why is texture filtering needed? What is a MIPMAP? 

What are the purpose of attribute/uniform/varying variables in shaders? Where is barycentric interpolation used in the graphics pipeline? 