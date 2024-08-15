uniform float angle;

        void main() {
            float colorChangeRate = 3.0;
            float colorMix = sin(angle * colorChangeRate) * 0.5 + 0.5;
            vec3 color = mix(vec3(1.0, 0.0, 0.0), vec3(0.9, 0.35, 0.9), colorMix);
            gl_FragColor = vec4(color, 1.0);
        }