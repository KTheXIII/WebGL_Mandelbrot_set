precision mediump float;

attribute vec3 a_position;
attribute vec4 a_color;
attribute vec2 a_uv;

varying vec4 v_color;
varying vec2 v_uv;

uniform vec2 u_resolution;
uniform float u_time;
uniform float u_scale;

void main() {
  v_color = a_color;
  v_uv = a_uv;

  vec3 pos = a_position + vec3(2., 0., 0.);

  gl_Position = vec4(a_position * u_scale, 1.0);
}