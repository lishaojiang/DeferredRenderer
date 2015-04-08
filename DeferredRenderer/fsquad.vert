#version 420 core

in vec2 vertexPos;

out vec2 coord;

void main() {
    coord = 0.5f * vertexPos + 0.5f;
    gl_Position = vec4(vertexPos, -1.0, 1.0);
}