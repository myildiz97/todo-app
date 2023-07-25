const todos = JSON.parse(localStorage.getItem("todos")) || [];
const addBtn = document.getElementById("add-btn");

const setList = () => localStorage.setItem("todos", JSON.stringify(todos));
const getList = () => JSON.parse(localStorage.getItem("todos"));

const getHtmlForItem = (item) => {
  return `
    <div class="todo">
      <p class="remove-item">${item}</p>
      <button class="remove-btn" value=${item}>Remove</button>
    </div>
  `;
};

const handleRemove = (e) => {
  todos.splice(todos.indexOf(e.target.value), 1);
  setList();
  render();
};

const render = () => {
  const todoList = document.getElementById("todo-list");
  const parsedList = getList();
  if (parsedList) {
    let html = "";
    parsedList.map(todo => html += getHtmlForItem(todo));
    todoList.innerHTML = html;
    const removeBtns = document.querySelectorAll(".remove-btn");
    for (let btn of removeBtns) btn.addEventListener("click", handleRemove);
  };
};

addBtn.addEventListener("click", () => {
  const textarea = document.getElementById("textarea");
  const todo = textarea.value;
  if (todo && !todos.includes(todo)) {
    todos.push(todo);
    setList();
    render();
    textarea.value = "";
  };
});

render();