import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import { Box3, Group, Mesh, PerspectiveCamera, Vector3 } from 'three';

export type ViewerProps = {
  group: Group;
};

export const Viewer = ({ group }: ViewerProps) => {
  const camera = useThree((state) => state.camera as PerspectiveCamera);

  useEffect(() => {
    const box = new Box3();

    group.traverse((obj) => {
      if (obj instanceof Mesh) {
        box.expandByObject(obj);
      }
    });

    const center = box.getCenter(new Vector3());

    const initial = [center.x, box.max.y * 1.5, center.z] as const;

    camera.position.set(...initial);
  }, [group]);

  return <primitive object={group} />;
};