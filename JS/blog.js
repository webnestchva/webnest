// Improved dropdown menu - stays open on click
const dropdown = document.querySelector('.dropdown');
const dropbtn = document.querySelector('.dropbtn');
const dropdownContent = document.querySelector('.dropdown-content');

// Toggle menu on click
dropbtn.addEventListener('click', function(e) {
  e.preventDefault();
  e.stopPropagation();
  dropdown.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', function(e) {
  if (!dropdown.contains(e.target)) {
    dropdown.classList.remove('active');
  }
});

// Keep menu open when hovering
dropdown.addEventListener('mouseenter', function() {
  dropdown.classList.add('active');
});

dropdown.addEventListener('mouseleave', function() {
  dropdown.classList.remove('active');
});
