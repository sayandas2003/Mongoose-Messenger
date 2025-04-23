const deleteButtons = document.querySelectorAll(".delete-btn");

deleteButtons.forEach(button => {
    button.addEventListener("click", function(event) {
        const confirmed = confirm("Are you sure you want to delete this?");
        if (!confirmed) {
            event.preventDefault(); // stops the form from submitting
        }
    });
});
