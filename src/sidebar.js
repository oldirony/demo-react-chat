class Sidebar {
  constructor(){
    this.button = document.getElementById('sidebar-trigger');
    this.content = document.getElementById('sidebar-content');

    this.addListeners();
  }

  addListeners() {
    this.button.addEventListener('click', e => {
      e.preventDefault();
      this.toggleSidebar();
    })
  }

  toggleSidebar() {
    this.content.classList.toggle('is-open')
  }
}

export default Sidebar;
