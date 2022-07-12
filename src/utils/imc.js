export const IMCResult = (imc) => {
  if (imc < 16) return 'Anorexie';
  else if (imc < 18.5) return 'Maigreur';
  else if (imc <= 25.0) return 'Corpulence normale';
  else if (imc <= 30.0) return 'surpoids';
  else if (imc <= 35.0) return 'Obésité modérée';
  else if (imc <= 40.0) return 'Obésité élevée';
  else return 'Obésité morbide';
};
