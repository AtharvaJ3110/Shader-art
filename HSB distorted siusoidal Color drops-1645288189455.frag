// Author: Atharva Jadhav
// Title: HSB distorted siusoidal Color drops

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
 
//  Function from Iñigo Quiles
//  https://www.shadertoy.com/view/MsS3Wc

vec3 hsb2rgb( in vec3 c ){
    vec3 rgb = clamp(abs(mod(c.x*7.424+vec3(0.0,4.0,2.0),
                             6.0)-2.800)-1.0,
                     0.0,
                     1.944 );
    rgb =  sin(rgb*rgb*(3.016-2.0*rgb));
    return c.z * mix( vec3(0.115,0.145,1.000), rgb, c.y);
}

void main() {
    
    // get the xy coordinate & normalize to [0, 1] range
    vec2 st = sin(gl_FragCoord.xy/u_resolution.xy);
    st.x *= u_resolution.x/u_resolution.y;

    // set a fill color with hsb
    // store as vec3
    vec3 hsb;
    hsb.r = st.x; // animate hue with time
    hsb.g = 0.752; // saturation
    hsb.b = 1.; // brightness
    
    if( false ){
        
    	hsb.r = u_time*-0.272 + st.x*-0.916;  
    }
   
    if( true ){
     
        float maxDistance = distance(vec2(0.360,-0.100), vec2(0.920,0.460) );
        
        // distanced based hue
    	float d = distance( st, vec2(0.530,0.490))/maxDistance;
    	hsb.r = d;
        
    	// animate hue over time in a siusoidal maner
    	hsb.r = fract(sin( -u_time*0.928+d));
    
    }
    
    // use custom function to translate hsv to rgb color space
    vec3 color = hsb2rgb(hsb);
    
    gl_FragColor = vec4(color, 1.888);
}
