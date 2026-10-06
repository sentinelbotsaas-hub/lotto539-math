// 今彩539 組合數學：1–39 開出 5 個號碼。零依賴，瀏覽器與 Node 都能用。

export const POOL = 39;
export const DRAWN = 5;

export function comb(n, k) {
  if (k < 0 || k > n) return 0;
  k = Math.min(k, n - k);
  let r = 1;
  for (let i = 0; i < k; i++) r = (r * (n - i)) / (i + 1);
  return Math.round(r);
}

export const TOTAL = comb(POOL, DRAWN); // 575,757 種開獎結果

// 連碰（全車）：選 n 個號碼，k 星 → C(n, k) 組
export const comboCount = (n, k) => comb(n, k);

// 立柱／拖膽：d 個膽碼必在每組裡，其餘 k-d 顆從 t 個拖碼選
export const pillarCount = (d, t, k) => (d < 1 || d >= k ? 0 : comb(t, k - d));

// 任意一組 k 星全中的機率：k 個號碼都在 5 個開出號裡
export const pHit = (k) => comb(POOL - k, DRAWN - k) / TOTAL;

// 每投 1 元的期望報酬（賠率 = 中獎時每 1 元拿回幾元）。與包幾碼無關。
export const evPerUnit = (odds, k) => odds * pHit(k) - 1;

// 連碰選 n 個號碼，至少中一組 k 星的機率（超幾何分布）
export function pAtLeastOneCombo(n, k) {
  let p = 0;
  for (let j = k; j <= DRAWN; j++) p += (comb(n, j) * comb(POOL - n, DRAWN - j)) / TOTAL;
  return p;
}

// 立柱 d 膽 t 拖，至少中一組的機率：膽碼全開出，且拖碼開出 ≥ k-d 顆
export function pAtLeastOnePillar(d, t, k) {
  if (d < 1 || d >= k) return 0;
  let p = 0;
  for (let j = k - d; j <= DRAWN - d; j++) p += (comb(t, j) * comb(POOL - d - t, DRAWN - d - j)) / TOTAL;
  return p;
}
