

// function getData(form) {
//   var formData = new FormData(form);

//   for (var pair of formData.entries()) {
//     console.log(pair[0] + ": " + pair[1]);
//   }

//   console.log(Object.fromEntries(formData));
//   console.log(JSON.stringify(Object.fromEntries(formData), null, 4));
// }

// document.getElementById("myForm").addEventListener("submit", function (e) {
//   e.preventDefault();
//   getData(e.target);
// });



// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()