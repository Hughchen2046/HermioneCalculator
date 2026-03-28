/**
 * ═══════════════════════════════════════════════════════════
 *  Dog-to-Human Age Calculation Utilities
 *
 *  Based on: Wang, T. et al. (2020)
 *  "Quantitative Translation of Dog-to-Human Aging by Conserved
 *   Remodeling of the DNA Methylome." Cell Systems, 11(2), 176–185.
 *  DOI: 10.1016/j.cels.2020.06.006
 *
 *  Formula: human_age = 16 × ln(dog_age) + 31
 * ═══════════════════════════════════════════════════════════
 */

const MS_PER_DAY = 1000 * 60 * 60 * 24;
const MS_PER_YEAR = MS_PER_DAY * 365.25;

/**
 * Calculate full age result from a birth Date to now.
 * @param {Date} birth
 * @returns {object|null} result or null if birth is in the future
 */
export function calculateAge(birth) {
  const now = new Date();
  if (birth > now) return null;

  const dogAgeYears = (now - birth) / MS_PER_YEAR;
  const totalDays = Math.floor((now - birth) / MS_PER_DAY);
  const years = Math.floor(dogAgeYears);
  const months = Math.floor((dogAgeYears - years) * 12);

  // UCSD 2020 formula: 16 * ln(dogAge) + 31
  let humanAge;
  if (dogAgeYears <= 0) {
    humanAge = 0;
  } else if (dogAgeYears < 1) {
    humanAge = dogAgeYears * 31; // linear interpolation for < 1yr
  } else {
    humanAge = 16 * Math.log(dogAgeYears) + 31;
  }
  humanAge = Math.max(0, humanAge);

  // Format dog age display
  let dogAgeStr, dogAgeUnitStr, dogAgeNoteStr;
  if (years === 0 && months === 0) {
    dogAgeStr = totalDays;
    dogAgeUnitStr = ' 天';
    dogAgeNoteStr = '剛出生不久的小寶貝 💛';
  } else if (years === 0) {
    dogAgeStr = months;
    dogAgeUnitStr = ' 個月';
    dogAgeNoteStr = `共 ${totalDays} 天`;
  } else {
    dogAgeStr = years;
    dogAgeUnitStr = months > 0 ? ` 歲 ${months} 個月` : ' 歲';
    dogAgeNoteStr = `共 ${totalDays.toLocaleString()} 天`;
  }

  // Life stage
  let stageText;
  if (dogAgeYears < 0.25) stageText = '🍼 新生兒期 — 妙麗還是超級小嬰兒！';
  else if (dogAgeYears < 0.5)
    stageText = '🌱 幼犬期 — 正在快速成長的小毛球！';
  else if (dogAgeYears < 1)
    stageText = '🐕 青少年期 — 活力滿滿、調皮搗蛋中 😄';
  else if (dogAgeYears < 3)
    stageText = '✨ 年輕成犬 — 正值青春最美好的時光！';
  else if (dogAgeYears < 7)
    stageText = '🌟 成熟成犬 — 穩重而充滿活力的壯年期。';
  else if (dogAgeYears < 10)
    stageText = '🍂 中老年期 — 智慧與溫柔兼具的深秋。';
  else stageText = '🌙 資深長者 — 歷經歲月，滿載愛與記憶。';

  return {
    dogAgeStr,
    dogAgeUnitStr,
    dogAgeNoteStr,
    humanAge: humanAge.toFixed(1),
    stageText,
    // Persist-friendly raw values
    year: birth.getFullYear(),
    month: birth.getMonth() + 1,
    day: birth.getDate(),
  };
}

/**
 * Generate select options for year/month/day
 */
export function getYearOptions() {
  const now = new Date().getFullYear();
  const opts = [];
  for (let yr = now; yr >= now - 30; yr--) {
    opts.push({ value: yr, label: `${yr} 年` });
  }
  return opts;
}

export function getMonthOptions() {
  return Array.from({ length: 12 }, (_, i) => ({
    value: i + 1,
    label: `${i + 1}月`,
  }));
}

export function getDayOptions() {
  return Array.from({ length: 31 }, (_, i) => ({
    value: i + 1,
    label: `${i + 1} 日`,
  }));
}
