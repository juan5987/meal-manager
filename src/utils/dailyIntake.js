export const calculateDailyIntake = (weight, height, age, sex, activity) => {
  let activityRatio;
  switch (activity) {
    case 'Sédentaire':
      activityRatio = 1.375;
      break;
    case 'activité légère':
      activityRatio = 1.56;
      break;
    case 'activité modérée':
      activityRatio = 1.64;
      break;
    case 'activité intense':
      activityRatio = 1.82;
      break;
    default:
      activityRatio = 1;
      break;
  }

  const proteinPC = 15;
  const carbohydratePC = 50;
  const lipidPC = 35;
  const fiber = 30;

  if (sex === 'Homme') {
    const calorie = Math.round(
      1.083 *
        Math.pow(weight, 0.48) *
        Math.pow(height / 100, 0.5) *
        Math.pow(age, -0.13) *
        (1000 / 4.1855) *
        activityRatio
    );
    const protein = Math.round(calorie * (proteinPC / 100 / 4));
    const carbohydrate = Math.round(calorie * (carbohydratePC / 100 / 4));
    const lipid = Math.round(calorie * (lipidPC / 100 / 9));
    return {
      calorie,
      proteinPC,
      protein,
      carbohydratePC,
      carbohydrate,
      lipidPC,
      lipid,
      fiber,
    };
  } else {
    const calorie = Math.round(
      0.963 *
        Math.pow(weight, 0.48) *
        Math.pow(height / 100, 0.5) *
        Math.pow(age, -0.13) *
        (1000 / 4.1855) *
        activityRatio
    );
    const protein = Math.round(calorie * (proteinPC / 100 / 4));
    const carbohydrate = Math.round(calorie * (carbohydratePC / 100 / 4));
    const lipid = Math.round(calorie * (lipidPC / 100 / 9));
    return {
      calorie,
      proteinPC,
      protein,
      carbohydratePC,
      carbohydrate,
      lipidPC,
      lipid,
      fiber,
    };
  }
};

// Basal Metabolic rate
export const calculateBMR = (weight, height, age, sex) => {
  if (sex === 'Homme') {
    const calorieH = Math.round(
      1.083 *
        Math.pow(weight, 0.48) *
        Math.pow(height / 100, 0.5) *
        Math.pow(age, -0.13) *
        (1000 / 4.1855)
    );
    return calorieH;
  } else {
    const calorieF = Math.round(
      0.963 *
        Math.pow(weight, 0.48) *
        Math.pow(height / 100, 0.5) *
        Math.pow(age, -0.13) *
        (1000 / 4.1855)
    );
    return calorieF;
  }
};
