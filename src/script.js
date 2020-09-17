const $note = document.querySelector("article");

window.onload = () => {
  // Load previously saved note
  $note.innerHTML = localStorage.note;
};

$note.onkeypress = (e) => {
  // Save note on edit
  const text = $note.innerHTML;
  localStorage.note = text;
};
