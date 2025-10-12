$(document).ready(function () {
  $('#request-form').submit(function (event) {
    event.preventDefault(); // Prevent default form submission
    var formData = $(this).serialize(); // Get form data

    $.ajax({
      url: "https://script.google.com/macros/s/AKfycbzUzHLdBIRHn-yzJ3uBlixyVWBW_w3TLfkkTm51IggonNYLb0a8dWQaPqfmwUfwTrsm/exec", // Replace with your Web App URL
      method: "POST",
      data: formData,
      success: function (response) {
        alert("Form submitted successfully!");
      },
      error: function (error) {
        alert("Error in form submission. Please try again.");
      },
    });
  });
});
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
