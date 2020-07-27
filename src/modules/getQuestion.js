export default function getQuestion() {
  const form = document.getElementById('form3'),
    questInput = form.querySelector('input'),
    questData = {question: questInput.value.trim()};
  
  return questData;
}