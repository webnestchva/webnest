document.getElementById('request-form').addEventListener('submit', function(event) {
  event.preventDefault();  // Prevent form submission from reloading the page

  // Collect form data
  const formData = new FormData(this);
  const data = Object.fromEntries(formData.entries());

  // Send form data to the server using Fetch API
  fetch('/submit-form', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
  })
  .then(response => response.text())
  .then(result => alert(result)) // Show result in alert
  .catch(error => console.error('Error:', error));  // Handle error
});
