// Author: Atharva Jadhav
// Course: ShaderArt (DIGF-3011, Winter 2022)
// Title: radial three color Gradient

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
    
void main() {
    
    // normalize our canvas
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    
    // normalize our mouse position
    vec2 mouseXY = u_mouse / u_resolution;
    
    // set color #1 manually 
    vec3 col1= vec3(1.000,0.021,0.467);
    
    // pick color #2 manually 
    vec3 col2= vec3(1.000,0.491,0.002);
    
    vec3 col3= vec3(0.555,1.000,0.090);
    //give radial coordiates
    float maxDistance = distance(vec2(0.420,0.220), vec2(0.190,0.080));
    float d = distance( st, vec2(0.530,0.500))/maxDistance;
    	st.r = d;
    // use our x coordinate to mix the two colors

    vec3 color = mix( col1,col2, st.x);
    vec3 tricolor=mix(color,col3,st.x);
    
  
    gl_FragColor = vec4(tricolor,1.0);
}
