// Form validation and submission
$(document).ready(function () {
  const form = $('#request-form');
  const submitButton = form.find('.submit-button');
  const buttonText = submitButton.find('.button-text');
  
  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  // Phone validation regex (flexible format)
  const phoneRegex = /^[\d\s\-\(\)]+$/;
  
  // Real-time validation
  form.find('input, select, textarea').on('blur', function() {
    validateField($(this));
  });
  
  // Clear error on input
  form.find('input, select, textarea').on('input change', function() {
    $(this).removeClass('error');
    $(this).siblings('.error-message').hide();
  });
  
  // Validate individual field
  function validateField($field) {
    const value = $field.val().trim();
    const fieldType = $field.attr('type');
    const fieldId = $field.attr('id');
    let isValid = true;
    let errorMessage = '';
    
    // Check if required field is empty
    if ($field.prop('required') && !value) {
      isValid = false;
      errorMessage = 'This field is required';
    }
    // Email validation
    else if (fieldType === 'email' && !emailRegex.test(value)) {
      isValid = false;
      errorMessage = 'Please enter a valid email address';
    }
    // Phone validation
    else if (fieldId === 'phone' && (!phoneRegex.test(value) || value.replace(/\D/g, '').length < 10)) {
      isValid = false;
      errorMessage = 'Please enter a valid phone number (at least 10 digits)';
    }
    // Date validation (must be future date)
    else if (fieldType === 'date' && value) {
      const selectedDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        isValid = false;
        errorMessage = 'Please select a future date';
      }
    }
    
    // Show/hide error
    if (!isValid) {
      $field.addClass('error');
      const $errorMsg = $field.siblings('.error-message');
      if (errorMessage) {
        $errorMsg.text(errorMessage);
      }
      $errorMsg.show();
    } else {
      $field.removeClass('error');
      $field.siblings('.error-message').hide();
    }
    
    return isValid;
  }
  
  // Validate entire form
  function validateForm() {
    let isValid = true;
    form.find('input[required], select[required], textarea[required]').each(function() {
      if (!validateField($(this))) {
        isValid = false;
      }
    });
    return isValid;
  }
  
  // Form submission
  form.submit(function (event) {
    event.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      // Scroll to first error
      const firstError = form.find('.error').first();
      if (firstError.length) {
        $('html, body').animate({
          scrollTop: firstError.offset().top - 100
        }, 500);
      }
      return;
    }
    
    // Disable submit button and show loading state
    submitButton.prop('disabled', true);
    buttonText.text('Submitting...');
    submitButton.addClass('loading');
    
    const formData = $(this).serialize();
    
    // Submit to Google Apps Script
    $.ajax({
      url: "https://script.google.com/macros/s/AKfycbzUzHLdBIRHn-yzJ3uBlixyVWBW_w3TLfkkTm51IggonNYLb0a8dWQaPqfmwUfwTrsm/exec",
      method: "POST",
      data: formData,
      dataType: "json",
      success: function (response) {
        // Success message
        showSuccessMessage();
        form[0].reset();
        $('.progress-bar').css('width', '0%');
        
        // Re-enable button
        setTimeout(() => {
          submitButton.prop('disabled', false);
          buttonText.text('Submit Request');
          submitButton.removeClass('loading');
        }, 2000);
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.error("Error details:", textStatus, errorThrown);
        
        // Sometimes Google Apps Script returns success as "error"
        // Check if we got a response that indicates success
        if (jqXHR.status === 0 || jqXHR.status === 200) {
          showSuccessMessage();
          form[0].reset();
          $('.progress-bar').css('width', '0%');
        } else {
          showErrorMessage();
        }
        
        // Re-enable button
        submitButton.prop('disabled', false);
        buttonText.text('Submit Request');
        submitButton.removeClass('loading');
      }
    });
  });
  
  // Show success message
  function showSuccessMessage() {
    const successHTML = `
      <div class="form-message success-message" style="display: none;">
        <div class="message-icon">✓</div>
        <h3>Request Submitted Successfully!</h3>
        <p>Thank you for your submission. We'll review your request and contact you within 2 business days.</p>
      </div>
    `;
    
    $('.glass-card').prepend(successHTML);
    $('.success-message').slideDown(400);
    
    // Scroll to success message
    $('html, body').animate({
      scrollTop: $('.success-message').offset().top - 100
    }, 500);
    
    // Remove message after 8 seconds
    setTimeout(() => {
      $('.success-message').slideUp(400, function() {
        $(this).remove();
      });
    }, 8000);
  }
  
  // Show error message
  function showErrorMessage() {
    const errorHTML = `
      <div class="form-message error-message-box" style="display: none;">
        <div class="message-icon">✕</div>
        <h3>Submission Error</h3>
        <p>We encountered an error submitting your form. Please try again or contact us directly at webnestchva@gmail.com</p>
      </div>
    `;
    
    $('.glass-card').prepend(errorHTML);
    $('.error-message-box').slideDown(400);
    
    // Scroll to error message
    $('html, body').animate({
      scrollTop: $('.error-message-box').offset().top - 100
    }, 500);
    
    // Remove message after 8 seconds
    setTimeout(() => {
      $('.error-message-box').slideUp(400, function() {
        $(this).remove();
      });
    }, 8000);
  }
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
