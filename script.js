var random_margin = ["-5px", "1px", "5px", "10px", "7px"];
var random_colors = ["#ffff00","#ff3de8","#3dc2ff","#04e022","#bc83e6","#ebb328"];
var random_degree = ["rotate(3deg)", "rotate(1deg)", "rotate(-1deg)", "rotate(-3deg)", "rotate(-5deg)", "rotate(-8deg)"];
var index = 0;

window.onload = document.querySelector("#user_input").select();

const notes = JSON.parse(localStorage.getItem('notes'))


window.addEventListener("DOMContentLoaded",()=>{
  if(notes) {
    notes.forEach(note => createStickyNote(note))
  }
})


document.querySelector("#add_note").addEventListener("click", () => {
  document.querySelector("#modal").style.display = "block";
});

document.querySelector("#hide").addEventListener("click", () => {
  document.querySelector("#modal").style.display = "none";
});

document.querySelector("#user_input").addEventListener('keydown', (event) => {
  if(event.key === 'Enter'){
    const text = document.querySelector("#user_input");
    createStickyNote(text.value);
    text.value = "";
  }
});

function createStickyNote(text){
  let note = document.createElement("div");
  let details = document.createElement("div");
  let noteText = document.createElement("h1");
  let delBtn = document.createElement("button");
  let editBtn = document.createElement("button");

  delBtn.textContent = "X";
  editBtn.textContent = "edit";


  note.appendChild(delBtn);
  note.appendChild(editBtn);
  note.className = "note";
  details.className = "details";
  noteText.textContent = text;
  noteText.className = "text";
  details.appendChild(noteText);
  note.appendChild(details);
    
 

  if(index > random_colors.length - 1)
    index = 0;

  note.setAttribute("style", `margin:${random_margin[Math.floor(Math.random() * random_margin.length)]}; background-color:${random_colors[index++]}; transform:${random_degree[Math.floor(Math.random() * random_degree.length)]}`);

  document.querySelector("#all_notes").appendChild(note);
  
  delBtn.addEventListener("click",deleteNote)
  function deleteNote(event){
      const newNotes = notes.filter((el) => el !== text); // Filter out the clicked note
      localStorage.setItem('notes', JSON.stringify(newNotes));
    // Remove the note from the DOM
      event.target.parentNode.remove();
  }

  editBtn.addEventListener("click",(event)=>{
    document.querySelector("#modal").style.display = "block";
    const noteText = document.querySelector("#user_input");
    noteText.value = text;
    deleteNote(event);
  })
  updateLS();
}

function updateLS() {
  const notesText = document.querySelectorAll('.text');
  const notesArr = Array.from(notesText).map((note) => note.textContent);
  localStorage.setItem('notes', JSON.stringify(notesArr));
}







