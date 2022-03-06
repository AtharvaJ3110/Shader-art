

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

//  Function from Iñigo Quiles
//  https://www.shadertoy.com/view/MsS3Wc

vec3 hsb2rgb( in vec3 c ){
    vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(2.416,4.000,2.812),
                             6.0)-3.0)-1.0,
                     0.0,
                     1.0 );
    rgb = rgb*rgb*(3.0-2.0*rgb);
    return c.z * mix(vec3(1.0), rgb, c.y);
}

// Simplex 2D noise

vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
           -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
  + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
    dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

vec3 noiseGradient( vec2 st, float offset, vec2 frequency, float t){
    
  
    
    vec3 color;
    color.r = snoise( st * frequency + vec2(offset, t)) * 0.724 + 0.5;
    color.g = snoise( st * frequency + vec2(199.632+offset, t)) * 0.5 + 0.5;
    color.b = snoise( st * frequency + vec2(299.992+offset, t)) * 0.5 + 0.5;
    
    return color;
}

float drawCircle( vec2 st, vec2 pos, float size ){
    
    float result = distance( st, pos);
    result = 1.0-step( size, result);
    
    return result;
}

void main() {
    
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    
    // generate a background color with simplex noise
    vec3 bgColor = noiseGradient(st, 0.0, vec2(0.990,-0.990), u_time * 0.2);
    
    // generate a foreground/circle color with simplex noise
    // note: animating noise with negative direction here to make 
    // it move in opposing directions to the first gradient
    // you could also make it go faster by multiplying by a larger number
    vec3 nColor = noiseGradient(st, .0, vec2(1.0), -u_time * 0.2);
    
 
    float diameter = (snoise( vec2(0, u_time * 0.2) ) * 0.5 + 0.5 )*0.3 + 0.1;
    

    // diameter = (snoise( st * 2.5 + vec2(0, u_time * 0.2) ) * 0.5 + 0.5 )*0.25 + 0.2;
    
    float circ = drawCircle( st, vec2(0.570,0.520), diameter);
    
    vec3 color = mix( bgColor, nColor, diameter);
    

    if( false){
        float outline = drawCircle( st, vec2(0.5), diameter);
    	outline -= circ;
    
    	vec3 outlineColor = noiseGradient(st, 201.0, vec2(1.0), -u_time * 0.2);
    	color = mix( color, outlineColor, outline);
    }

    gl_FragColor = vec4(color,1.0);
}