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

// Workshop Sign-Up Form Handling
document.addEventListener('DOMContentLoaded', function() {
  const workshopForm = document.querySelector('.signup-section form');
  const volunteerForm = document.querySelector('.volunteer-section form');
  
  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  // Validate individual field
  function validateField(field) {
    const value = field.value.trim();
    const fieldType = field.type;
    let isValid = true;
    let errorMessage = '';
    
    // Check if required field is empty
    if (field.hasAttribute('required') && !value) {
      isValid = false;
      errorMessage = 'This field is required';
    }
    // Email validation
    else if (fieldType === 'email' && !emailRegex.test(value)) {
      isValid = false;
      errorMessage = 'Please enter a valid email address';
    }
    
    // Show/hide error
    if (!isValid) {
      field.classList.add('error');
      let errorDiv = field.parentElement.querySelector('.error-message');
      if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        field.parentElement.appendChild(errorDiv);
      }
      errorDiv.textContent = errorMessage;
      errorDiv.style.display = 'block';
    } else {
      field.classList.remove('error');
      const errorDiv = field.parentElement.querySelector('.error-message');
      if (errorDiv) {
        errorDiv.style.display = 'none';
      }
    }
    
    return isValid;
  }
  
  // Validate entire form
  function validateForm(form) {
    let isValid = true;
    const fields = form.querySelectorAll('input[required], select[required], textarea[required]');
    
    fields.forEach(field => {
      if (!validateField(field)) {
        isValid = false;
      }
    });
    
    return isValid;
  }
  
  // Real-time validation
  document.querySelectorAll('input, select, textarea').forEach(field => {
    field.addEventListener('blur', function() {
      validateField(this);
    });
    
    field.addEventListener('input', function() {
      this.classList.remove('error');
      const errorDiv = this.parentElement.querySelector('.error-message');
      if (errorDiv) {
        errorDiv.style.display = 'none';
      }
    });
  });
  
  // Show success message
  function showSuccessMessage(form, message) {
    const successHTML = `
      <div class="form-message success-message" style="display: none;">
        <div class="message-icon">✓</div>
        <h3>Success!</h3>
        <p>${message}</p>
      </div>
    `;
    
    const container = form.closest('.glass-card');
    const existingMessage = container.querySelector('.form-message');
    if (existingMessage) {
      existingMessage.remove();
    }
    
    container.insertAdjacentHTML('afterbegin', successHTML);
    const messageEl = container.querySelector('.success-message');
    
    // Slide down animation
    setTimeout(() => {
      messageEl.style.display = 'block';
      messageEl.style.animation = 'slideDown 0.4s ease-out';
    }, 100);
    
    // Scroll to message
    setTimeout(() => {
      messageEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 200);
    
    // Remove message after 8 seconds
    setTimeout(() => {
      messageEl.style.animation = 'slideUp 0.4s ease-out';
      setTimeout(() => messageEl.remove(), 400);
    }, 8000);
  }
  
  // Show error message
  function showErrorMessage(form, message) {
    const errorHTML = `
      <div class="form-message error-message-box" style="display: none;">
        <div class="message-icon">✕</div>
        <h3>Submission Error</h3>
        <p>${message || 'We encountered an error submitting your form. Please try again or contact us directly at webnestchva@gmail.com'}</p>
      </div>
    `;
    
    const container = form.closest('.glass-card');
    const existingMessage = container.querySelector('.form-message');
    if (existingMessage) {
      existingMessage.remove();
    }
    
    container.insertAdjacentHTML('afterbegin', errorHTML);
    const messageEl = container.querySelector('.error-message-box');
    
    // Slide down animation
    setTimeout(() => {
      messageEl.style.display = 'block';
      messageEl.style.animation = 'slideDown 0.4s ease-out';
    }, 100);
    
    // Scroll to message
    setTimeout(() => {
      messageEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 200);
    
    // Remove message after 8 seconds
    setTimeout(() => {
      messageEl.style.animation = 'slideUp 0.4s ease-out';
      setTimeout(() => messageEl.remove(), 400);
    }, 8000);
  }
  
  // Handle form submission
  function handleFormSubmit(form, successMessage) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Validate form
      if (!validateForm(form)) {
        const firstError = form.querySelector('.error');
        if (firstError) {
          firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
      }
      
      // Get submit button
      const submitButton = form.querySelector('.submit-button');
      const buttonText = submitButton.querySelector('span:first-child');
      const originalText = buttonText.textContent;
      
      // Disable button and show loading state
      submitButton.disabled = true;
      buttonText.textContent = 'Submitting...';
      submitButton.classList.add('loading');
      
      // Get form data
      const formData = new FormData(form);
      const data = new URLSearchParams(formData);
      
      // Submit to Google Apps Script
      fetch(form.action, {
        method: 'POST',
        body: data,
        mode: 'no-cors' // Important for Google Apps Script
      })
      .then(() => {
        // Show success message
        showSuccessMessage(form, successMessage);
        form.reset();
        
        // Re-enable button
        setTimeout(() => {
          submitButton.disabled = false;
          buttonText.textContent = originalText;
          submitButton.classList.remove('loading');
        }, 2000);
      })
      .catch(error => {
        console.error('Error:', error);
        showErrorMessage(form);
        
        // Re-enable button
        submitButton.disabled = false;
        buttonText.textContent = originalText;
        submitButton.classList.remove('loading');
      });
    });
  }
  
  // Initialize forms
  if (workshopForm) {
    handleFormSubmit(
      workshopForm, 
      'Thank you for signing up! We\'ll send you workshop details and meeting links within 24 hours.'
    );
  }
  
  if (volunteerForm) {
    handleFormSubmit(
      volunteerForm, 
      'Thank you for your interest in volunteering! We\'ll contact you within 2 business days to discuss opportunities.'
    );
  }
});
