function handleFormSubmit(event) {
    event.preventDefault();
    var resumeData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        address: document.getElementById('address').value.trim(),
        skills: document.getElementById('skills').value.split(',').map(function (skill) { return skill.trim(); }),
        education: document.getElementById('education').value.trim(),
        experience: {
            company: document.getElementById('company-name').value.trim(),
            designation: document.getElementById('designation-name').value.trim(),
            details: document.getElementById('experience-details').value.trim(),
        },
        languages: document.getElementById('languages').value.split(',').map(function (lang) { return lang.trim(); }),
    };
    var profilePhotoInput = document.getElementById('profile-photo');
    if (profilePhotoInput.files && profilePhotoInput.files[0]) {
        var reader_1 = new FileReader();
        reader_1.onload = function () {
            resumeData.profilePhoto = reader_1.result;
            generateResumePreview(resumeData);
        };
        reader_1.readAsDataURL(profilePhotoInput.files[0]);
    }
    else {
        generateResumePreview(resumeData);
    }
}
// Function to generate and display the resume preview
function generateResumePreview(data) {
    var previewElement = document.getElementById('resume-preview');
    var profilePhotoPreview = document.getElementById('profile-photo-preview');
    if (!previewElement) {
        console.error('Could not find resume-preview element.');
        return;
    }
    profilePhotoPreview.style.display = data.profilePhoto ? "block" : "none";
    if (data.profilePhoto) {
        profilePhotoPreview.src = data.profilePhoto;
    }
    previewElement.innerHTML = "\n        <div>\n            <section>\n                <h3>".concat(data.name, "</h3>\n                <p><strong>Email:</strong> ").concat(data.email, "</p>\n                <p><strong>Phone:</strong> ").concat(data.phone, "</p>\n                <p><strong>Address:</strong> ").concat(data.address, "</p>\n            </section>\n            <section>\n                <h3>Education</h3>\n                <p>").concat(data.education, "</p>\n            </section>\n            <section>\n                <h3>Experience</h3>\n                <p><strong>Company:</strong> ").concat(data.experience.company, "</p>\n                <p><strong>Designation:</strong> ").concat(data.experience.designation, "</p>\n                <p><strong>Details:</strong> ").concat(data.experience.details, "</p>\n            </section>\n            <section>\n                <h3>Skills</h3>\n                <ul>").concat(data.skills.map(function (skill) { return "<li>".concat(skill, "</li>"); }).join(''), "</ul>\n            </section>\n            <section>\n                <h3>Languages</h3>\n                <ul>").concat(data.languages.map(function (language) { return "<li>".concat(language, "</li>"); }).join(''), "</ul>\n            </section>\n        </div>\n    ");
}
// Initialize form
window.addEventListener('DOMContentLoaded', initializeForm);
function initializeForm() {
    var form = document.getElementById('resume-form');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
    else {
        console.error('Could not find resume-form element.');
    }
}
