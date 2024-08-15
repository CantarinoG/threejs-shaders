uniform float angle;

    void main() {

        mat4 rotationMatrixX = mat4(
            1.0, 0.0, 0.0, 0.0,
            0.0, cos(-angle), -sin(-angle), 0.0,
            0.0, sin(-angle), cos(-angle), 0.0,
            0.0, 0.0, 0.0, 1.0
          );
        
          // Rotation matrix around the Y axis
          mat4 rotationMatrixY = mat4(
            cos(angle), 0.0, sin(angle), 0.0,
            0.0, 1.0, 0.0, 0.0,
            -sin(angle), 0.0, cos(angle), 0.0,
            0.0, 0.0, 0.0, 1.0
          );

          mat4 rotationMatrixZ = mat4(
            cos(-angle), -sin(-angle), 0.0, 0.0,
            sin(-angle), cos(-angle), 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            0.0, 0.0, 0.0, 1.0
          );

        mat4 rotationMatrix = rotationMatrixX * rotationMatrixY * rotationMatrixZ;

        vec4 rotatedPosition = rotationMatrix * vec4(position, 1.0);

        gl_Position = projectionMatrix * modelViewMatrix * rotatedPosition;
    }