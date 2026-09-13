import test from 'node:test';
import assert from 'node:assert/strict';
import {panBounds,constrainPan,clamp} from '../lib/viewer-math.ts';

test('unzoomed image cannot pan outside the viewport',()=>{
  assert.deepEqual(panBounds(1000,500,1),{x:0,y:0});
  assert.deepEqual(constrainPan(500,-500,panBounds(1000,500,1)),{x:0,y:0});
});
test('desktop pan respects the contained image, not just the viewport',()=>{
  assert.deepEqual(panBounds(1000,500,2),{x:250,y:250});
  assert.deepEqual(constrainPan(600,-600,panBounds(1000,500,2)),{x:250,y:-250});
});
test('portrait phone only allows vertical panning when the image fills it',()=>{
  const bounds=panBounds(360,500,2);
  assert.deepEqual(bounds,{x:180,y:0});
  assert.deepEqual(constrainPan(-400,300,bounds),{x:-180,y:0});
});
test('reset and shrinking zoom always constrain previous pan',()=>{
  assert.deepEqual(constrainPan(250,-250,panBounds(1000,500,1)),{x:0,y:0});
  assert.equal(clamp(4,1,3),3); assert.equal(clamp(.5,1,3),1);
});
