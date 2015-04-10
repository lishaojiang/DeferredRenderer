#ifndef GBUFFER_H
#define GBUFFER_H

#include "Shader.h"

class GBuffer {
public:
	GLuint position, normal, color, depth, effect1, effect2;

	GBuffer(int widthIn, int heightIn);
	~GBuffer();
	
	GLuint getFBO() const;
	int getWidth() const;
	int getHeight() const;
	void setDrawBuffers();
	void setDrawEffect();
	//void setReadBuffer();
	void setReadEffect();
	void bind();
	void bindDraw();
	void bindRead();
	void unbind();
	void unbindDraw();
	void unbindRead();
	void setGeomTextures();

private:
	GLenum drawBuffers[4];

	GLuint fbo;	

	int width, height;
};

#endif