// Same size and place for every toy, in the Bakugan list and in battles.
// - Size: the closed ball is scaled to `d` across (its wider side, seen from above) and centered on the origin. The toy
//   families come at very different sizes (original game 11.2 units, New Vestroia about 0.38, Billy's tt_ Traps 1.4).
// - Open: the original models open from the ground up (their feet land where the closed ball's bottom was). Billy's tt_
//   models open upward from the ball's center, so they would float half a ball too high: those are lowered as they open,
//   by `lift` x how far open (never raised).
// `at(v)` poses the model's open animation (0 closed, 1 open). Returns { y0, lift }: y = y0 + lift * open.
import * as THREE from 'three';

export function fitToy(obj, at, d) {
  const box = () => {
    obj.updateMatrixWorld(true); obj.traverse(o => { if (o.isSkinnedMesh) o.skeleton.update(); });
    return new THREE.Box3().setFromObject(obj, true);
  };
  obj.scale.setScalar(1); obj.position.set(0, 0, 0);
  at(0);
  const b0 = box(), s = b0.getSize(new THREE.Vector3()), c = b0.getCenter(new THREE.Vector3());
  const k = d / Math.max(s.x, s.z, 1e-9);
  obj.scale.setScalar(k); obj.position.set(-c.x * k, -c.y * k, -c.z * k);
  const bottom = -s.y * k / 2;
  at(1);
  const b1 = box();
  at(0);
  return { y0: obj.position.y, lift: Math.min(0, bottom - b1.min.y), open: b1 };
}
