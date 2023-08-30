let arrow = document.querySelectorAll(".arrow");
for (var i = 0; i < arrow.length; i++) {
  arrow[i].addEventListener("click", (e) => {
    let arrowParent = e.target.parentElement.parentElement; //selecting main parent of arrow
    arrowParent.classList.toggle("showMenu");
  });
}
let sidebar = document.querySelector(".sidebar");
let sidebarBtn = document.querySelector(".bx-menu");
sidebarBtn.addEventListener("click", () => {
  sidebar.classList.toggle("close");
});

// botón de notiifacaiones
function actionToggle() {
  const action = document.querySelector('.action');
  action.classList.toggle('active');

  const nNoti = document.querySelector('#nNoti');

  if (nNoti.innerHTML > 0) {
    if (action.classList.contains('active')) {
      nNoti.style.display = 'none'; // lo oculta
    } else {
      nNoti.style.display = 'inherit'; // lo muestra
    }
  }

}