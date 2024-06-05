function calculerAge() {
  const anneeNaissance = Number(naissance.value);

  const age = new Date().getFullYear() - anneeNaissance;

  const result = document.getElementById('result');
  result.innerHTML = `You are ${age} !`;

  const resultArea = document.querySelector('fieldset');
  resultArea.hidden = false

  
}
