import assert from "node:assert/strict";
import * as m from "./lotto539.mjs";

assert.equal(m.TOTAL, 575757);
assert.equal(m.comboCount(8, 2), 28);
assert.equal(m.pillarCount(1, 10, 2), 10);
assert.equal(m.pillarCount(0, 10, 2), 0);
assert.ok(Math.abs(1 / m.pHit(2) - 74.1) < 0.05);
assert.ok(Math.abs(1 / m.pHit(3) - 913.9) < 0.05);
assert.ok(Math.abs(1 / m.pHit(4) - 16450.2) < 0.05);
// 包全部 39 碼必中；只選 k 碼時至少中一組 = 單組機率
assert.ok(Math.abs(m.pAtLeastOneCombo(39, 2) - 1) < 1e-12);
assert.ok(Math.abs(m.pAtLeastOneCombo(2, 2) - m.pHit(2)) < 1e-12);
// 1 膽 38 拖的二星：只要膽碼開出就中 = 5/39
assert.ok(Math.abs(m.pAtLeastOnePillar(1, 38, 2) - 5 / 39) < 1e-12);
// 機率總和為 1
let s = 0;
for (let j = 0; j <= 5; j++) s += (m.comb(10, j) * m.comb(29, 5 - j)) / m.TOTAL;
assert.ok(Math.abs(s - 1) < 1e-12);
console.log("ok");
