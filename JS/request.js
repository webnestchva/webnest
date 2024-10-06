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
