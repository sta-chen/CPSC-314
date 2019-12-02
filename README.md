# CPSC-314
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