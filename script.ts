interface ResumeData {
    name: string;
    email: string;
    phone: string;
    address: string;
    skills: string[];
    education: string;
    experience: {
        company: string;
        designation: string;
        details: string;
    };
    languages: string[];
    profilePhoto?: string;
}

function handleFormSubmit(event: Event): void {
    event.preventDefault();

    const resumeData: ResumeData = {
        name: (document.getElementById('name') as HTMLInputElement).value.trim(),
        email: (document.getElementById('email') as HTMLInputElement).value.trim(),
        phone: (document.getElementById('phone') as HTMLInputElement).value.trim(),
        address: (document.getElementById('address') as HTMLInputElement).value.trim(),
        skills: (document.getElementById('skills') as HTMLTextAreaElement).value.split(',').map(skill => skill.trim()),
        education: (document.getElementById('education') as HTMLTextAreaElement).value.trim(),
        experience: {
            company: (document.getElementById('company-name') as HTMLTextAreaElement).value.trim(),
            designation: (document.getElementById('designation-name') as HTMLTextAreaElement).value.trim(),
            details: (document.getElementById('experience-details') as HTMLTextAreaElement).value.trim(),
        },
        languages: (document.getElementById('languages') as HTMLTextAreaElement).value.split(',').map(lang => lang.trim()),
    };

    const profilePhotoInput = document.getElementById('profile-photo') as HTMLInputElement;
    if (profilePhotoInput.files && profilePhotoInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function () {
            resumeData.profilePhoto = reader.result as string;
            generateResumePreview(resumeData);
        };
        reader.readAsDataURL(profilePhotoInput.files[0]);
    } else {
        generateResumePreview(resumeData);
    }
}

// Function to generate and display the resume preview
function generateResumePreview(data: ResumeData): void {
    const previewElement = document.getElementById('resume-preview') as HTMLElement;
    const profilePhotoPreview = document.getElementById('profile-photo-preview') as HTMLImageElement;

    if (!previewElement) {
        console.error('Could not find resume-preview element.');
        return;
    }

    profilePhotoPreview.style.display = data.profilePhoto ? "block" : "none";
    if (data.profilePhoto) {
        profilePhotoPreview.src = data.profilePhoto;
    }

    previewElement.innerHTML = `
        <div>
            <section>
                <h3>${data.name}</h3>
                <p><strong>Email:</strong> ${data.email}</p>
                <p><strong>Phone:</strong> ${data.phone}</p>
                <p><strong>Address:</strong> ${data.address}</p>
            </section>
            <section>
                <h3>Education</h3>
                <p>${data.education}</p>
            </section>
            <section>
                <h3>Experience</h3>
                <p><strong>Company:</strong> ${data.experience.company}</p>
                <p><strong>Designation:</strong> ${data.experience.designation}</p>
                <p><strong>Details:</strong> ${data.experience.details}</p>
            </section>
            <section>
                <h3>Skills</h3>
                <ul>${data.skills.map(skill => `<li>${skill}</li>`).join('')}</ul>
            </section>
            <section>
                <h3>Languages</h3>
                <ul>${data.languages.map(language => `<li>${language}</li>`).join('')}</ul>
            </section>
        </div>
    `;
}

// Initialize form
window.addEventListener('DOMContentLoaded', initializeForm);

function initializeForm(): void {
    const form = document.getElementById('resume-form') as HTMLFormElement;
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    } else {
        console.error('Could not find resume-form element.');
    }
}
