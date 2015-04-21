#version 420 core

uniform sampler2D positionMap;
uniform sampler2D normalMap;
uniform sampler2D colorMap;

uniform vec3 lPos;
uniform float radius;
uniform vec3 lightColor;
uniform vec3 lightAttenuation;
uniform vec2 screenSize;

out vec4 fragColor;

const float specularPower = 16.0f;

void main() {
	vec2 coord = gl_FragCoord.xy / screenSize;
	vec3 n = normalize(texture(normalMap, coord).xyz);
	float s = texture(normalMap, coord).w;
	vec3 pos = texture(positionMap, coord).xyz;
	vec3 color = texture(colorMap, coord).xyz;

	float r = length(lPos - pos);
	float attenuation = dot(lightAttenuation, vec3(1, r, r*r));
	vec3 l = (lPos - pos) / r;
	vec3 v = -normalize(pos);
	vec3 h = normalize(v + l);

	float ndotl = dot(n, l);
	vec3 diffuse = max(0.0f, ndotl) * color;

	vec3 specular = vec3(0);
	if (ndotl >= 0) specular = pow(max(0.0f, dot(n, h)), specularPower) * vec3(s);

	fragColor = vec4(lightColor * (diffuse + specular) / attenuation, 1);
}