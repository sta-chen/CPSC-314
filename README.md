# CPSC-314
* [Visibility](#visibility)
* [Texture Mapping](#texture-mapping)
    * [MipMapping](#MipMapping)
* [Lighting](#lighting)
* [Ray-Tracing](#ray-tracing)
* [Color](#color)
# Visibility
* View Volume Culling (for triangles)
    * Initial idea: If all vertices are outside view volume, then cull. (F)
    * Revised idea: Cull if are vertices are outside with respect to the same view volume plane. (T)
* View Volume Culling (for objects)
    * bounding sphere:
        * cull if `dist(center, plane) < -r`
    * bounding box:
        * same as for triangles
* View Volume Clipping
    * Clipping in VCS is fine
    * Never clipping in NDCS
        * we will lose the line segment connectivity
    * Clipping in CCS is fine
* Backface Culling in VCS
    * Initial idea: Cull if $N_z<0$. (F)
    * Revised Idea: Cull if $P_{eye}(0,0,0)$ is below the plane of the polygon; above means the side of normal
* Backface Culling in NDCS
    * Cull if $N_z$ in NDCS is positive
* Occlusion: Z-buffer
* Occlusion: Object culling
    * occlusion queries: virtual render of bounding box
    * precomputed visibility tables: store a list of visible cells
    * horizon maps: for terrain models
---
1. A million-triangle object is outside of the view volume. Describe how we can efficiently avoid rendering it.  
    * build a bounding box (or bounding sphere)  
    * if all the vertices are outside with respect to a specific view volume plane, then we can cull
2. A million-triangle object is inside the view volume, but behind a solid wall. Describe how we can efficiently avoid rendering it.
    * build a bounding box
    * do a virtual render of this box
    * if no pixels passed the z-buffer test then cull
3. What is the advantage of using an early z-buffer test?  
If the z-buffer test fails, then we can skip the called the fragment shader and make rendering faster.
---
# Texture Mapping
**Texture**: to generate realisitic objects, reproduce coloring and normal variations.  
* hide geometric simplicity
    * images convey illusion of geometry
    * map a brick wall texture on a flat polygon
    * create bumpy effect on surface
* usually: 2D information associated with a 3D surface
    * typically r,g,b colors
    * but can be any attributes that you would like to model over a surface  

## Bump Maps
2D texture maps that are used to model the appearance of surface bumps, by adding small perturbations to the surface normals. The rendered geometry does not actually have bumps, it's smooth.  
* object surface often not smooth - to recreate correctly need complex geometry model
* can control shape effect by locally perturbing surface normal 
    * random perturbaion
    * directional change over region

## Volumetric Textures 
* model r,g,b for every point in a volume
* often computed using procedural function
* define texture pattern over 3D domain - 3D space containing the object
* computation often cheaper than memory access

## Basic Texture Map
Texture is an image with coordinates (u,v).  
What if $s$ or $t$ is outside $[0,1]$?  
* `THREE.RepeatWrapping`: the texture will simply repeat to infinity.
* `THREE.ClampToEdgeWrapping`: the last texel stretches to the edge of the mesh.
* `THREE.MirroredRepeatWrapping`: the texture will repeats to infinity, mirroring on each repeat.
## Vertex Shader & Fragment Shader
* javascripte: texture is passed as a **uniform** to the fragment shader
```javascript=
var myTexture = new THREE.TextureLoader().load('textures/crate.gif');
myTexture.wrapS = THREE.RepeatWrapping;
var material = new THREE.MeshbASICmATERIAL({ map: myTexture});
```
* vertex shader: `attribute` can only be used in vertex shader
```javascript=
attribute vec2 uv;
varying vec2 uvCoords;
uvCoords = uv;
```
* fragement shader
```javascript=
uniform sampler2D myTexture;
varying vec2 uvCoords;
```
## Reconstruction
* How to deal with
    * pixels that are much larger than texels?
        * minification  
        `THREE.NearestFilter`  
        `THREE.NearestMipMapNearestFilter`  
        `THREE.NearestMipMapLinearFilter`  
        `THREE.LinearFilter`  
        `THREE.LinearMipMapLinearFilter`  
        `THREE.LinearMipMapNearestFilter`  
            * `Linear`: linear interpolation within pyramid level
            * `Nearest`: use nearest pyramid level  
            e.g. if pixel footprint area is $A=9$, we choose $A=4$ in the pyramid  
    * pixels that are much smaller than texels?
        * magnification  
        `THREE.NearestFilter`  
        `THREE.LinearFilter`
## MipMapping
Use "image pyramid" to precompute averaged versions of the texture.
* Many things in a small place
* $8\times 8$: $A=1$
* $4\times 4$: $A = 4$
* $2\times 2$: $A = 16$
* $1\times 1$: $A=64$
    * prespecify a series of prefiltered texture maps of decreasing resolutions
    * requires more texture storage
    * avoid shimmering and flashing as objects move

## Displacement Mapping
* bump mapping gets silhouettes wrong
    * shadows wrong too
* change surface geometry instead
    * need to subdivide surface 
    * use tesselation shader

## Environment Mapping
* generate image of surrounding or reflection
* sphere map or cube map
---
**Cube Map**: 6 planar textures, sides of cube  
* point camera in 6 different directions, facing out from origin
* direction of vector selects the face of the cube to be indexed
    * co-ordinate with largest magnitude
    * remaining two coordinates select the pixel from the face
* note: viewpoint is always at the center
---
**Sphere Map**
* texture is distorted fish-eye view
    * point camera at mirrored sphere
    * spherical texture mapping creates texture coordinates that correctly index into this texture map

## Basic Texture Mapping Algorithm
```
for each triangle
    interpolate u and v coordinates across triangle
    for each fragment
        sample the texture map at (u,v)
        set fragment color to the sampled value
```

# Lighting
Models the interaction of light with surfaes. Generates a per (pixel/vertex) colour.  
**Factors**:
* Light sources
    * location, type and colour
* Surface materials
    * how surfaces reflect light
* Transport of light
    * how light moves in a scene
* Viewer position
* do lighting/shading in Fragment Shader

## Illumination Models/Algorithms
* Local illumination - Fast
    * assumes single-bounce path: light - surface - eye
* Global illumination - Slow
    * more physically based computation of light transport throughout the scene
---
**The Big Picture**
* **Light**: energy in a range of wavelengths
    * white light: all wavelengths
    * colored (e.g. red light): subset of wavelengths
* **Surface color** - reflected wavelength
    * white: reflects all wavelengths
    * black: absorbs everything
    * colored: absorbs all but the reflected color
* Multiple light sources add (energy sums)
* **Big simplification**: just work with three wavelengths: R, G, B which roughly correspond to the tree types of cone-cells in the human eye
    * white light (1, 1, 1) $\times$ yellow surf (0.8, 0.8, 0) = yellow visible (0.8, 0.8, 0)
    * yellow light (1, 1, 0) $\times$ cyan surf (0, 1, 1) = green visible (0, 1, 0)
---
**Materials**
* Surface reflectance:
    * illuminate surface point with a ray of light from different directions
    * how much light is reflected in each outgoing direction?
---
**Bidirectional Reflectance Distribution Model** (BRDF)  
How much light is reflected in every outgoing direction for each possible incoming direction of light?
## Phong Model
Phong model is a local illumination model.  
`total = ambient + diffuse + specular`  
$I_ak_a+\sum_L (I_Lk_d(N\cdot L))+I_Lk_S(R\cdot V)^n$
### Ambient Term
Simple hack that provides a default minimal illumination. Apply individually to RGB components:  
$I_a$ is scene property: ambient light color  
$k_a$ is surface property: ambient color
### Diffuse Term
Intuition: Brightness depends on the angle of the surface with respect to the incoming light direction. Sharper angles mean that the surface receives less light. Only consider angles from 0 to 90 degrees, if $N$, $L$ are negative, then set to zero.  
The apparent brightness (the reflected radiance) is independent of the viewing direction.
### Specular (Phong) Term
Many surfaces are not perfect mirrors, but still reflect much light in the general direction of the reflected ray. As we get further away from the reflected ray, we see less light being reflected in those directions.  
$R$ is reflected ray  
$V$ is viewing direction  
$n$ is the shininess; larger $n$ means narrower lobe, highly specular  
**Computation**:
* geometry of specular (perfect mirror) reflection
    * Snell's law
    * In GLSL: use `reflect(-l, n)`

## Light Source Types
* Point Light
    * light originates at a point
    * defined by **location** only
* Directional Light (point light at infinity)
    * light rays are parallel
    * rays hit a planar surface at identical angles
    * defined by **direction** only
* Spot Light
    * point light with limitied angles
    * defined by **location, direction, and angle range**
* Light source fall-off: intensity drops with distance squared

## Light and Material Specification
* Light source: amount of RGB light emitted
    * value = intensity per channel  
    e.g. (1,0, 0.5, 0.5)
    * every light source emits ambient, diffuse, and specular light
* Materials: amount of RGB light reflected 
    * value represents percentage reflected
* Interaction: multiply components
    * Red light (1, 0, 0) $\times$ green surface (0, 1, 0) = black (0, 0, 0)

## Notes on Shading
* typically compute lighting model in VCS. Therefore need:  
    * VCS Vertex Coordinates
    * VCS Normals
    * VCS Light Positions
* How often to compute the lighting model?
    * flat shading: per polygon
    * Gouraud shading: per vertex, then interpolate colors
    * per-pixel shading: using interpolated normals

# Ray-Tracing
**Global Illumination**: any method with multiple bounces of light.  
` S: Specular`, `D: Diffuse`, `L: Light`, `E: Eye`
* local illumination: `L(S or D)E`
* radiosity: `L(D)*E`, any number of diffuse bounces
* ray tracing: `L(D)(S)*E`
* path tracing: `L(D or S)*E`

**Overview**
* handles multiple inter-reflections of light
* partly physics-based: geometric optics
* well suited to transparent and reflective objects
* trace light path from the eye bacwards into the scene; recursively apply to reflected and refracted rays

## Ray Generation and Termination
* Ray termination
    * ray hits a diffuse object
    * ray exits the scene
    * when exceeding max recursion depth
    * when final contribution will be too small

# Color
* Shorter wavelength, stronger energy
## Physiology of Vision
* the retina
    * rods
        * black or white, edges
        * cones
            * 3 types
            * color sensors
        * uneven distribution
            * dense fovea
* Center of retina is densely packed region called the **fovea**

## Tristimulus Theory of Color Vision
* Although light sources can have extremely complex spectra, it was empirically determined that colors could be described by only 3 primaries
* Colors that look the same but have different spectra are called **metamers**
* Three types of cones (LMS / RGB) 你妈死了 里妈死了 LMS
    * L or R, most sensitive to red light (610 nm)
    * M or G, most sensitive to green light (560 nm)
    * S or B, most sensitive to blue light (430 nm)
    * color blindness results from missing cone type(s)

**Metamers**
* a given perceptual sensation of color derives from the stimulus of all three cone types
* identical perceptions of color can thus be caused by very different spectra

## Negative Lobes
* sometimes need to point red light to shine on target in order to match colors
    * equivalent mathematically to "remove red"
        * but physically impossible to remove red from CRT phosphors
* can't generate all other wavelengths with any set of three positive monochromatic lights
* solution: convert to new synthetic coordinate system to make the job easy

## CIE Color Space
* CIE defined 3 imaginary lights X, Y, Z
    * any wavelength $\lambda$ can be matched perceptually by positive combinations
    * note that: X~R, Y~G, Z~B

## RGB Color Space (Color Cube)
* define colors with (r, g, b) amounts of red, green, and blue
    * used by OpenGL
    * hardware-centric
    ![](https://i.imgur.com/zU49QPI.png)
* RGB color cube sits within CIE color space
    * subset of perceivable colors
    * scale, rotate, shear cube
* Color transformation matrix:
![](https://i.imgur.com/tfMHpLg.png)
* each monitor has its own RGB-to-XYZ transformation matrix
    * Suppose we have a color $R_AG_AB_A$ on monitor $A$ and wish to view the same color on monitor B: $C_B=M_B^{-1}M_AC_A$
    ![](https://i.imgur.com/842OVKW.png)
![](https://i.imgur.com/HoRtCHT.png)
## CIE Chromaticity Diagram
* produce a 2D color space by projecting onto the plane given by $X+Y+Z=1$
### CIE "Horseshoe" Diagram Facts
* all visible colors lie inside the horseshoe
    * result from color matching experiments
* spectral colors lie around the border
    * straight line between blue and red contains pueple tones
* colors combine linearly, since the xy-plane is a plane from a linear space
### Device Color Gamuts
* gamut is polygon, device primaries at corners
    * defines reproducible color range
    * X, Y, and Z are hypothetical light sources, no device can product entire gamut
* **Gamut Mapping**: how to handle colors outside gamut?
    * one way: construct ray to white point, find closest displayable point within gamut

## The CMY Color Model
* Used mainly in color printing, where light is absorbed by dyes
* Cyan, Magenta and Yellow primaries are complements of Red, Blue, and Green
* Primaries (dyes) subtracted from white paper which absorbs no energy
    * Red = White - Cyan = White - Green - Blue
    * Green = White - Magenta = White - Red - Blue
    * Blue = White - Yellow = White - Red - Green
    * (r, g, b) = (1 - c, 1 - m, 1 - y)

## HSV Color Space
* more intuitive color space for people
    * H = Hue
        * dominant wavelength, "color"
    * S = Saturation
        * how far from grey/white
    * V = Value
        * how far from black/white
        * also: brightness B, intensity I, lightness L

## Color/Lightness Constancy
* color perception depends on surrounding
    * colors in close proximity
        * simultaneous contrast effect
    * illumination under which the scene is viewed
