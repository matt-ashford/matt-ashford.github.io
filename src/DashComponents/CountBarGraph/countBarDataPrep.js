export const countBarDataPrep = (rawData) => {
  const result = rawData.reduce((acc, curr) => {
    const { fy, target, pct_on_time } = curr;
    if (!acc[fy]) {
      acc[fy] = { fy, missedCount: 0, exceededCount: 0 };
    }
    if (pct_on_time > target) {
      acc[fy].exceededCount++;
    } else {
      acc[fy].missedCount++;
    }
    return acc;
  }, {});

  const resultList = Object.values(result);

  return resultList;
};
export default countBarDataPrep;
