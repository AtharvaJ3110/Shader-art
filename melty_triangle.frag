#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
#define PI 3.1415926535
#define TWO_PI 6.28318530718

void main(){
  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  st.x *= u_resolution.x/u_resolution.y;
  vec3 color = vec3(0.855,0.793,0.075);
  float d = 0.0;

  // Remap the space to -1. to 1.
  st =  st *2.000-1.;

  // Make the distance field
  d = u_time*length( abs(st)-0.420 );
  // d = length( min(abs(st)-.3,0.) );
  // d = length( max(abs(st)-.3,0.) );
      
    
    int N = 3;

  // Angle and radius from the current pixel
  float a = atan(st.x,st.y)+PI;
  float r = TWO_PI/float(N);

  // Shaping function that modulate the distance
  d = cos(floor(.5+a/r)*r-a)*length(st);

  color = vec3(u_time*0.048-smoothstep(.4,0.202,d));
  // color = vec3(d);

  // gl_FragColor = vec4(color,1.704);

  // Visualize the distance field
  gl_FragColor = vec4(vec3(sin(d*u_time*0.047*color)),0.912);
   
    

  // Drawing with the distance field
  // gl_FragColor = vec4(vec3( step(.3,d) ),1.0);
  // gl_FragColor = vec4(vec3( step(.3,d) * step(d,.4)),1.0);
  // gl_FragColor = vec4(vec3( smoothstep(.3,.4,d)* smoothstep(.6,.5,d)) ,1.0);
}
