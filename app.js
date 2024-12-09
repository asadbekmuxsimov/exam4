document.addEventListener("DOMContentLoaded", () => {
    const title = document.querySelector(".titleHome");
    const comment = document.querySelector("p");
    const heroImage = document.querySelector(".user-img");
    const editButton = document.querySelector(".user-btn");

    const localData = JSON.parse(localStorage.getItem("homeData"));

    if (localData) {
        title.textContent = localData.title;
        comment.textContent = localData.description;
        heroImage.src = localData.heroImage;
    } else {
        fetch("http://localhost:3000/home")
            .then((response) => response.json())
            .then((data) => {
                title.textContent = data.title;
                comment.textContent = data.description;
                heroImage.src = data.heroImage;

                localStorage.setItem("homeData", JSON.stringify(data));
            });
    }

    editButton.addEventListener("click", () => {
        const choice = prompt("Nimani o'zgartirmoqchisiz? (title/comment/image)");

        if (choice === "title") {
            const newTitle = prompt("Yangi title kiriting:", title.textContent);
            if (newTitle) {
                title.textContent = newTitle;
                updateLocalStorage({ title: newTitle });
            }
        } else if (choice === "comment") {
            const newComment = prompt("Yangi comment kiriting:", comment.textContent);
            if (newComment) {
                comment.textContent = newComment;
                updateLocalStorage({ description: newComment });
            }
        } else if (choice === "image") {
            const newImage = prompt("Yangi rasm URL kiriting:", heroImage.src);
            if (newImage) {
                heroImage.src = newImage;
                updateLocalStorage({ heroImage: newImage });
            }
        } else {
            alert("Noto'g'ri tanlov qildingiz.");
        }
    });

    function updateLocalStorage(updatedData) {
        const currentData = JSON.parse(localStorage.getItem("homeData")) || {};
        const newData = { ...currentData, ...updatedData };

        localStorage.setItem("homeData", JSON.stringify(newData));

        console.log("LocalStorage yangilandi:", newData);
    }
});










// async function fetchPortfolio() {
//     try {
//         const response = await fetch("http://localhost:3000/portfolio");
//         const data = await response.json();

//         displayPortfolio(data);
//     } catch (error) {
//         console.error("Ma'lumotlarni olishda xatolik yuz berdi:", error);
//     }
// }


// document.addEventListener('DOMContentLoaded', loadFromLocalStorage);

// function loadFromLocalStorage() {
//     const savedData = JSON.parse(localStorage.getItem('portfolioData')) || [];
//     displayPortfolio(savedData);
// }

// function displayPortfolio(data) {
//     const portfolioContainer = document.querySelector('.portfolio .container');
//     portfolioContainer.innerHTML = '';

//     data.forEach(item => {
//         const portfolioItem = document.createElement('div');
//         portfolioItem.classList.add('portfolio-div');

//         portfolioItem.innerHTML = `
//             <div class="portfolio-item">
//                 <img width="602px" height="327px" src="${item.image}" alt="${item.title} Screenshot">
//             </div>
//             <div class="portfolio-divv">
//                 <h3>${item.title}</h3>
//                 <p>${item.description}</p>
//                 <div class="buttons">
//                     <button class="user-btn edit-btn" data-id="${item.id}">Edit</button>
//                     <button class="user-btn delete-btn" data-id="${item.id}">Delete</button>
//                 </div>
//             </div>
//         `;

//         portfolioContainer.appendChild(portfolioItem);
//     });

//     attachButtonListeners();
// }

// function attachButtonListeners() {
//     document.querySelectorAll('.edit-btn').forEach(button =>
//         button.addEventListener('click', handleEdit)
//     );
//     document.querySelectorAll('.delete-btn').forEach(button =>
//         button.addEventListener('click', handleDelete)
//     );
// }

// function handleEdit(event) {
//     const id = event.target.dataset.id;
//     const portfolioItem = event.target.closest('.portfolio-div');
//     const titleElement = portfolioItem.querySelector('h3');
//     const descriptionElement = portfolioItem.querySelector('p');

//     const newTitle = prompt("Enter new title:", titleElement.textContent);
//     const newDescription = prompt("Enter new description:", descriptionElement.textContent);

//     if (newTitle) titleElement.textContent = newTitle;
//     if (newDescription) descriptionElement.textContent = newDescription;

//     saveToLocalStorage();
// }

// function handleDelete(event) {
//     const portfolioItem = event.target.closest('.portfolio-div');
//     portfolioItem.remove();

//     saveToLocalStorage();
// }

// function saveToLocalStorage() {
//     const portfolioData = [];
//     document.querySelectorAll('.portfolio-div').forEach(item => {
//         portfolioData.push({
//             id: item.querySelector('.edit-btn').dataset.id,
//             title: item.querySelector('h3').textContent,
//             description: item.querySelector('p').textContent,
//             image: item.querySelector('img').src,
//         });
//     });

//     localStorage.setItem('portfolioData', JSON.stringify(portfolioData));
// }

// function fetchPortfolio() {
//     const initialData = [
//         {
//             id: 1,
//             title: "E-Commerce Website",
//             description: "A responsive e-commerce platform with user-friendly design and payment integration.",
//             image: "https://s3-alpha-sig.figma.com/img/cde1/ed3f/8fef957d91df8b936cfec57c896c18cd?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=n1qvZeKY6Jp1csAUSh5YdNxgaDUeLVFwuXwgztY-sRb6ND34LjlZgw8HH10cl1QF4YWUyMs8JAhN3QjSPfHC8yELLRi6E~2~cAI3o9Ot8Pc0s04iC8jUTE7p5hUoOlL6EEWvEVeu6jH6H-4XRb6GrPG8E0Ngl22w-NiNpTwdsxN4-gJXdUAXDjU42LSnj8KVK9Af3qJqg4WHCqQk0NqwUxamvnaW13jRwJAq03swvxJomZ7k9~~USTHXkf3KZc9hzuf88Wue3OXoWxhDRDfxiZPpxUw44nbhrRX21wVqk27zJv8tpyhDSOLUllggXqfjH~g6COe-A1NJ6brlsBljNg__",
//         },
//         {
//             id: 2,
//             title: "Portfolio Website",
//             description: "A personal portfolio website built to showcase projects and skills.",
//             image: "https://s3-alpha-sig.figma.com/img/5434/3298/a141a5f4577a33b778bf2014ec405b7f?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=a7xoE9AYL8mduCmmGaC~WtNdGkgxyeSDlS3K3K9ZAxZfknl5VbEYstxV1Ic4lgwtXAzJJmFhMOh8NT2fodc1kkNkKEPSe9-rg2tQEH2nXIfpLYLoZqkuwLRuCUxA12euz9lkUYGPs7cLAdKoc-my4Wt5ToY-60CPKJKUcEr9cf8nryXdY5q1bpy0hLJ8g2obC5u3EUfYSt5NhzI6CjLiZWDjM4FBkLRZqpjBdn08IiPEuhBS57axRLgJ2-wPUA5O1hWUjm468lz-kS8OrqKQmdYqY121P13N4LWhmn6SNCRU6FABs3oimcwdpTlNr1SU7oPvbe4b8~TnyIeuJhDCOw__",
//         }
//     ];

//     localStorage.setItem('portfolioData', JSON.stringify(initialData));
//     loadFromLocalStorage();
// }

// if (!localStorage.getItem('portfolioData')) {
//     fetchPortfolio();
// }









// async function fetchPortfolio() {
//     try {
//         const response = await fetch("http://localhost:3000/portfolio");
//         const data = await response.json();

//         displayPortfolio(data);
//     } catch (error) {
//         console.error("Ma'lumotlarni olishda xatolik yuz berdi:", error);
//     }
// }

// document.addEventListener('DOMContentLoaded', loadFromLocalStorage);

// function loadFromLocalStorage() {
//     const savedData = JSON.parse(localStorage.getItem('portfolioData')) || [];
//     displayPortfolio(savedData);
// }

// function displayPortfolio(data) {
//     const portfolioContainer = document.querySelector('.portfolio .container');
//     portfolioContainer.innerHTML = '';

//     data.forEach(item => {
//         const portfolioItem = document.createElement('div');
//         portfolioItem.classList.add('portfolio-div');

//         portfolioItem.innerHTML = `
//             <div class="portfolio-item">
//                 <img width="602px" height="327px" src="${item.image}" alt="${item.title} Screenshot">
//             </div>
//             <div class="portfolio-divv">
//                 <h3>${item.title}</h3>
//                 <p>${item.description}</p>
//                 <div class="buttons">
//                     <button class="user-btn edit-btn" data-id="${item.id}">Edit</button>
//                     <button class="user-btn delete-btn" data-id="${item.id}">Delete</button>
//                 </div>
//             </div>
//         `;

//         portfolioContainer.appendChild(portfolioItem);
//     });

//     attachButtonListeners();
// }

// function attachButtonListeners() {
//     document.querySelectorAll('.edit-btn').forEach(button =>
//         button.addEventListener('click', handleEdit)
//     );
//     document.querySelectorAll('.delete-btn').forEach(button =>
//         button.addEventListener('click', handleDelete)
//     );
// }

// function handleEdit(event) {
//     const id = event.target.dataset.id;
//     const portfolioItem = event.target.closest('.portfolio-div');
//     const titleElement = portfolioItem.querySelector('h3');
//     const descriptionElement = portfolioItem.querySelector('p');

//     const newTitle = prompt("Enter new title:", titleElement.textContent);
//     const newDescription = prompt("Enter new description:", descriptionElement.textContent);

//     if (newTitle) titleElement.textContent = newTitle;
//     if (newDescription) descriptionElement.textContent = newDescription;

//     saveToLocalStorage();
// }

// function handleDelete(event) {
//     const portfolioItem = event.target.closest('.portfolio-div');
//     const id = event.target.dataset.id;
//     const title = portfolioItem.querySelector('h3').textContent;

//     const confirmDelete = confirm(`Are you sure you want to delete "${title}"?`);
//     if (confirmDelete) {
//         portfolioItem.remove();
//         saveToLocalStorage();
//     }
// }

// function saveToLocalStorage() {
//     const portfolioData = [];
//     document.querySelectorAll('.portfolio-div').forEach(item => {
//         portfolioData.push({
//             id: item.querySelector('.edit-btn').dataset.id,
//             title: item.querySelector('h3').textContent,
//             description: item.querySelector('p').textContent,
//             image: item.querySelector('img').src,
//         });
//     });

//     localStorage.setItem('portfolioData', JSON.stringify(portfolioData));
// }

// function fetchPortfolio() {
//     const initialData = [
//         {
//             id: 1,
//             title: "E-Commerce Website",
//             description: "A responsive e-commerce platform with user-friendly design and payment integration.",
//             image: "https://s3-alpha-sig.figma.com/img/cde1/ed3f/8fef957d91df8b936cfec57c896c18cd?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=n1qvZeKY6Jp1csAUSh5YdNxgaDUeLVFwuXwgztY-sRb6ND34LjlZgw8HH10cl1QF4YWUyMs8JAhN3QjSPfHC8yELLRi6E~2~cAI3o9Ot8Pc0s04iC8jUTE7p5hUoOlL6EEWvEVeu6jH6H-4XRb6GrPG8E0Ngl22w-NiNpTwdsxN4-gJXdUAXDjU42LSnj8KVK9Af3qJqg4WHCqQk0NqwUxamvnaW13jRwJAq03swvxJomZ7k9~~USTHXkf3KZc9hzuf88Wue3OXoWxhDRDfxiZPpxUw44nbhrRX21wVqk27zJv8tpyhDSOLUllggXqfjH~g6COe-A1NJ6brlsBljNg__",
//         },
//         {
//             id: 2,
//             title: "Portfolio Website",
//             description: "A personal portfolio website built to showcase projects and skills.",
//             image: "https://s3-alpha-sig.figma.com/img/5434/3298/a141a5f4577a33b778bf2014ec405b7f?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=a7xoE9AYL8mduCmmGaC~WtNdGkgxyeSDlS3K3K9ZAxZfknl5VbEYstxV1Ic4lgwtXAzJJmFhMOh8NT2fodc1kkNkKEPSe9-rg2tQEH2nXIfpLYLoZqkuwLRuCUxA12euz9lkUYGPs7cLAdKoc-my4Wt5ToY-60CPKJKUcEr9cf8nryXdY5q1bpy0hLJ8g2obC5u3EUfYSt5NhzI6CjLiZWDjM4FBkLRZqpjBdn08IiPEuhBS57axRLgJ2-wPUA5O1hWUjm468lz-kS8OrqKQmdYqY121P13N4LWhmn6SNCRU6FABs3oimcwdpTlNr1SU7oPvbe4b8~TnyIeuJhDCOw__",
//         }
//     ];

//     localStorage.setItem('portfolioData', JSON.stringify(initialData));
//     loadFromLocalStorage();
// }

// if (!localStorage.getItem('portfolioData')) {
//     fetchPortfolio();
// }







async function fetchPortfolio() {
    try {
        const response = await fetch("http://localhost:3000/portfolio");
        const data = await response.json();

        displayPortfolio(data);
    } catch (error) {
        console.error("Ma'lumotlarni olishda xatolik yuz berdi:", error);
    }
}

document.addEventListener('DOMContentLoaded', loadFromLocalStorage);

function loadFromLocalStorage() {
    const savedData = JSON.parse(localStorage.getItem('portfolioData')) || [];
    displayPortfolio(savedData);
}

function displayPortfolio(data) {
    const portfolioContainer = document.querySelector('.portfolio .container');
    portfolioContainer.innerHTML = '';

    data.forEach(item => {
        const portfolioItem = document.createElement('div');
        portfolioItem.classList.add('portfolio-div');

        portfolioItem.innerHTML = `
            <div class="portfolio-item">
                <img width="602px" height="327px" src="${item.image}" alt="${item.title} Screenshot">
            </div>
            <div class="portfolio-divv">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <div class="buttons">
                    <button class="user-btn edit-btn" data-id="${item.id}">Edit</button>
                    <button class="user-btn create-btn" data-id="${item.id}">Create</button>
                </div>
            </div>
        `;

        portfolioContainer.appendChild(portfolioItem);
    });

    attachButtonListeners();
}

function attachButtonListeners() {
    document.querySelectorAll('.edit-btn').forEach(button =>
        button.addEventListener('click', handleEdit)
    );
    document.querySelectorAll('.create-btn').forEach(button =>
        button.addEventListener('click', addPortfolioItem)
    );
}

function handleEdit(event) {
    const id = event.target.dataset.id;
    const portfolioItem = event.target.closest('.portfolio-div');
    const titleElement = portfolioItem.querySelector('h3');
    const descriptionElement = portfolioItem.querySelector('p');

    const newTitle = prompt("Enter new title:", titleElement.textContent);
    const newDescription = prompt("Enter new description:", descriptionElement.textContent);

    if (newTitle) titleElement.textContent = newTitle;
    if (newDescription) descriptionElement.textContent = newDescription;

    saveToLocalStorage();
}

function saveToLocalStorage() {
    const portfolioData = [];
    document.querySelectorAll('.portfolio-div').forEach(item => {
        portfolioData.push({
            id: item.querySelector('.edit-btn').dataset.id,
            title: item.querySelector('h3').textContent,
            description: item.querySelector('p').textContent,
            image: item.querySelector('img').src,
        });
    });

    localStorage.setItem('portfolioData', JSON.stringify(portfolioData));
}

async function addPortfolioItem() {
    const title = prompt("Enter the title for the new portfolio item:");
    const description = prompt("Enter the description for the new portfolio item:");
    const image = prompt("Enter the URL for the image:");

    if (title && description && image) {
        const newItem = {
            id: Date.now().toString(),
            title,
            description,
            image,
        };

        try {
            const response = await fetch("http://localhost:3000/portfolio", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newItem),
            });

            if (response.ok) {
                const savedItem = await response.json();
                addPortfolioToDisplay(savedItem);
            } else {
                console.error("Error adding new item to backend.");
            }
        } catch (error) {
            console.error("Error adding new item to backend:", error);
        }

        saveToLocalStorage();
    } else {
        alert("All fields are required to create a new portfolio item.");
    }
}

function addPortfolioToDisplay(item) {
    const portfolioContainer = document.querySelector('.portfolio .container');

    const portfolioItem = document.createElement('div');
    portfolioItem.classList.add('portfolio-div');

    portfolioItem.innerHTML = `
        <div class="portfolio-item">
            <img width="602px" height="327px" src="${item.image}" alt="${item.title} Screenshot">
        </div>
        <div class="portfolio-divv">
            <h3>${item.title}</h3>
            <p>${item.description}</p>
            <div class="buttons">
                <button class="user-btn edit-btn" data-id="${item.id}">Edit</button>
                <button class="user-btn create-btn" data-id="${item.id}">Create</button>
            </div>
        </div>
    `;

    portfolioContainer.appendChild(portfolioItem);

    attachButtonListeners();
}

function fetchPortfolio() {
    const initialData = [
        {
            id: 1,
            title: "E-Commerce Website",
            description: "A responsive e-commerce platform with user-friendly design and payment integration.",
            image: "https://s3-alpha-sig.figma.com/img/cde1/ed3f/8fef957d91df8b936cfec57c896c18cd?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=n1qvZeKY6Jp1csAUSh5YdNxgaDUeLVFwuXwgztY-sRb6ND34LjlZgw8HH10cl1QF4YWUyMs8JAhN3QjSPfHC8yELLRi6E~2~cAI3o9Ot8Pc0s04iC8jUTE7p5hUoOlL6EEWvEVeu6jH6H-4XRb6GrPG8E0Ngl22w-NiNpTwdsxN4-gJXdUAXDjU42LSnj8KVK9Af3qJqg4WHCqQk0NqwUxamvnaW13jRwJAq03swvxJomZ7k9~~USTHXkf3KZc9hzuf88Wue3OXoWxhDRDfxiZPpxUw44nbhrRX21wVqk27zJv8tpyhDSOLUllggXqfjH~g6COe-A1NJ6brlsBljNg__",
        },
        {
            id: 2,
            title: "Portfolio Website",
            description: "A personal portfolio website built to showcase projects and skills.",
            image: "https://s3-alpha-sig.figma.com/img/5434/3298/a141a5f4577a33b778bf2014ec405b7f?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=a7xoE9AYL8mduCmmGaC~WtNdGkgxyeSDlS3K3K9ZAxZfknl5VbEYstxV1Ic4lgwtXAzJJmFhMOh8NT2fodc1kkNkKEPSe9-rg2tQEH2nXIfpLYLoZqkuwLRuCUxA12euz9lkUYGPs7cLAdKoc-my4Wt5ToY-60CPKJKUcEr9cf8nryXdY5q1bpy0hLJ8g2obC5u3EUfYSt5NhzI6CjLiZWDjM4FBkLRZqpjBdn08IiPEuhBS57axRLgJ2-wPUA5O1hWUjm468lz-kS8OrqKQmdYqY121P13N4LWhmn6SNCRU6FABs3oimcwdpTlNr1SU7oPvbe4b8~TnyIeuJhDCOw__",
        }
    ];

    localStorage.setItem('portfolioData', JSON.stringify(initialData));
    loadFromLocalStorage();
}

if (!localStorage.getItem('portfolioData')) {
    fetchPortfolio();
}

























document.addEventListener('DOMContentLoaded', loadSetupFromLocalStorage);

function loadSetupFromLocalStorage() {
    const savedSetup = JSON.parse(localStorage.getItem('setupData')) || getDefaultSetup();
    displaySetup(savedSetup);
}

function getDefaultSetup() {
    return {
        theme: "dark",
        language: "en",
        primaryColor: "#1e90ff",
        contactEmail: "your-email@example.com",
        socialLinks: {
            github: "https://github.com/username",
            linkedin: "https://linkedin.com/in/username",
            twitter: "https://twitter.com/username"
        }
    };
}

function displaySetup(setup) {
    const setupContainer = document.querySelector('.setup-container');
    setupContainer.innerHTML = `
        <div>
            <h3>Theme: <span>${setup.theme}</span></h3>
            <h3>Language: <span>${setup.language}</span></h3>
            <h3>Primary Color: <span style="color: ${setup.primaryColor};">${setup.primaryColor}</span></h3>
            <h3>Contact Email: <span>${setup.contactEmail}</span></h3>
            <div>
                <h3>Social Links:</h3>
                <ul>
                    <li>GitHub: <a href="${setup.socialLinks.github}" target="_blank">${setup.socialLinks.github}</a></li>
                    <li>LinkedIn: <a href="${setup.socialLinks.linkedin}" target="_blank">${setup.socialLinks.linkedin}</a></li>
                    <li>Twitter: <a href="${setup.socialLinks.twitter}" target="_blank">${setup.socialLinks.twitter}</a></li>
                </ul>
            </div>
        </div>
        <button class="user-btn">Edit</button>
    `;

    document.querySelector('.user-btn').addEventListener('click', handleEditSetup);
}

function handleEditSetup() {
    const currentSetup = JSON.parse(localStorage.getItem('setupData')) || getDefaultSetup();

    const newTheme = prompt("Enter theme (light/dark):", currentSetup.theme) || currentSetup.theme;
    const newLanguage = prompt("Enter language (en/other):", currentSetup.language) || currentSetup.language;
    const newPrimaryColor = prompt("Enter primary color (hex or color name):", currentSetup.primaryColor) || currentSetup.primaryColor;
    const newContactEmail = prompt("Enter contact email:", currentSetup.contactEmail) || currentSetup.contactEmail;

    const newGithub = prompt("Enter GitHub URL:", currentSetup.socialLinks.github) || currentSetup.socialLinks.github;
    const newLinkedIn = prompt("Enter LinkedIn URL:", currentSetup.socialLinks.linkedin) || currentSetup.socialLinks.linkedin;
    const newTwitter = prompt("Enter Twitter URL:", currentSetup.socialLinks.twitter) || currentSetup.socialLinks.twitter;

    const updatedSetup = {
        theme: newTheme,
        language: newLanguage,
        primaryColor: newPrimaryColor,
        contactEmail: newContactEmail,
        socialLinks: {
            github: newGithub,
            linkedin: newLinkedIn,
            twitter: newTwitter
        }
    };

    saveSetupToLocalStorage(updatedSetup);
}

function saveSetupToLocalStorage(setup) {
    localStorage.setItem('setupData', JSON.stringify(setup));
    loadSetupFromLocalStorage();
}

if (!localStorage.getItem('setupData')) {
    saveSetupToLocalStorage(getDefaultSetup());
}






















async function fetchAboutMe() {
    try {
        const savedData = JSON.parse(localStorage.getItem('aboutMeData'));
        if (savedData) {
            displayAboutMe(savedData);
        } else {
            const response = await fetch("http://localhost:3000/aboutme");
            const data = await response.json();
            localStorage.setItem('aboutMeData', JSON.stringify(data)); // Ma'lumotlarni saqlash
            displayAboutMe(data);
        }
    } catch (error) {
        console.error("Ma'lumotlarni olishda xatolik yuz berdi:", error);
    }
}

function displayAboutMe(data) {
    const aboutSection = document.querySelector('.about-div');

    aboutSection.innerHTML = `
      <h2>${data.name}</h2>
      <p>${data.bio}</p>
      <h3>Experience</h3>
    `;

    const experienceList = document.createElement('div');
    data.experience.forEach(exp => {
        const expItem = document.createElement('div');
        expItem.classList.add('experience-item');

        expItem.innerHTML = `
        <h4>${exp.role} at ${exp.company}</h4>
        <p><strong>Duration:</strong> ${exp.duration}</p>
        <ul>
          ${exp.responsibilities.map(task => `<li>${task}</li>`).join('')}
        </ul>
      `;
        experienceList.appendChild(expItem);
    });

    aboutSection.appendChild(experienceList);

    const skillsSection = document.createElement('div');
    skillsSection.innerHTML = `
        <h3>Skills</h3>
        <ul>
            ${data.skills.map(skill => `<li>${skill}</li>`).join('')}
        </ul>
    `;
    aboutSection.appendChild(skillsSection);

    const editButton = document.createElement('button');
    editButton.classList.add('user-btn');
    editButton.textContent = "Edit";
    editButton.addEventListener('click', () => handleEditAboutMe(data));
    aboutSection.appendChild(editButton);
}

function handleEditAboutMe(currentData) {
    const newName = prompt("Enter new name:", currentData.name) || currentData.name;
    const newBio = prompt("Enter new bio:", currentData.bio) || currentData.bio;

    const newExperience = currentData.experience.map((exp, index) => {
        const newRole = prompt(`Edit role for experience #${index + 1} (${exp.role}):`, exp.role) || exp.role;
        const newCompany = prompt(`Edit company for experience #${index + 1} (${exp.company}):`, exp.company) || exp.company;
        const newDuration = prompt(`Edit duration for experience #${index + 1} (${exp.duration}):`, exp.duration) || exp.duration;

        return {
            role: newRole,
            company: newCompany,
            duration: newDuration,
            responsibilities: exp.responsibilities,
        };
    });

    const updatedData = {
        ...currentData,
        name: newName,
        bio: newBio,
        experience: newExperience,
    };

    localStorage.setItem('aboutMeData', JSON.stringify(updatedData));
    displayAboutMe(updatedData);
}

document.addEventListener('DOMContentLoaded', fetchAboutMe);

























// async function fetchTestimonials() {
//     try {
//         const response = await fetch("http://localhost:3000/testimonials");
//         const testimonials = await response.json();

//         displayTestimonials(testimonials);
//     } catch (error) {
//         console.error("Ma'lumotlarni olishda xatolik yuz berdi:", error);
//     }
// }

// function displayTestimonials(testimonials) {
//     const container = document.querySelector(".container1 .title1");

//     const title = document.createElement("h1");
//     title.textContent = "Testimonials";
//     container.appendChild(title);

//     testimonials.forEach(testimonial => {
//         const testimonialDiv = document.createElement("div");
//         testimonialDiv.classList.add("testimonial-item");

//         testimonialDiv.innerHTML = `
//         <img src="${testimonial.image}" alt="${testimonial.name}">
//         <h3>${testimonial.name}</h3>
//         <p><strong>${testimonial.role}</strong></p>
//         <blockquote>${testimonial.message}</blockquote>
//       `;

//         container.appendChild(testimonialDiv);
//     });
// }

// document.addEventListener("DOMContentLoaded", fetchTestimonials);











// async function fetchContactInfo() {
//     try {
//         const response = await fetch("http://localhost:3000/contact");
//         const contact = await response.json();

//         displayContactInfo(contact);
//     } catch (error) {
//         console.error("Contact ma'lumotlarini olishda xatolik yuz berdi:", error);
//     }
// }

// function displayContactInfo(contact) {
//     const container = document.querySelector(".container2 .title2");

//     const contactDiv = document.createElement("div");
//     contactDiv.classList.add("contact-info");

//     contactDiv.innerHTML = `
//       <p><strong>Email:</strong> <a href="mailto:${contact.email}">${contact.email}</a></p>
//       <p><strong>Phone:</strong> <a href="tel:${contact.phone}">${contact.phone}</a></p>
//       <p><strong>Address:</strong> ${contact.address}</p>
//       <p><strong>Location:</strong> <a href="${contact.mapLink}" target="_blank">View on Map</a></p>
//     `;

//     container.appendChild(contactDiv);
// }

// document.addEventListener("DOMContentLoaded", fetchContactInfo);










// Fetch Testimonials
async function fetchTestimonials() {
    try {
        const response = await fetch("http://localhost:3000/testimonials");
        const testimonials = await response.json();

        displayTestimonials(testimonials);
    } catch (error) {
        console.error("Ma'lumotlarni olishda xatolik yuz berdi:", error);
    }
}

function displayTestimonials(testimonials) {
    const container = document.querySelector(".container1 .title1");

    container.innerHTML = ""; 

    const title = document.createElement("h1");
    title.textContent = "Testimonials";
    container.appendChild(title);

    testimonials.forEach(testimonial => {
        const testimonialDiv = document.createElement("div");
        testimonialDiv.classList.add("testimonial-item");

        testimonialDiv.innerHTML = `
        <img src="${testimonial.image}" alt="${testimonial.name}">
        <h3>${testimonial.name}</h3>
        <p><strong>${testimonial.role}</strong></p>
        <blockquote>${testimonial.message}</blockquote>
        <button class="user-btn edit-testimonial" data-id="${testimonial.id}">Edit</button>
        <button class="user-btn delete-testimonial" data-id="${testimonial.id}">Delete</button>
        `;

        container.appendChild(testimonialDiv);
    });

    document.querySelectorAll(".user-btn.delete-testimonial").forEach(button => {
        button.addEventListener("click", async (event) => {
            const id = event.target.getAttribute("data-id");
            await deleteTestimonial(id);
        });
    });

    document.querySelectorAll(".user-btn.edit-testimonial").forEach(button => {
        button.addEventListener("click", async (event) => {
            const id = event.target.getAttribute("data-id");
            const field = prompt("Qaysi elementni o'zgartirmoqchisiz? (name, role, message)");

            if (field && ["name", "role", "message"].includes(field)) {
                const newValue = prompt(`Yangi qiymatni kiriting (${field}):`);
                if (newValue) {
                    await editTestimonial(id, field, newValue);
                }
            } else {
                alert("Noto'g'ri maydon tanlandi.");
            }
        });
    });
}

async function addTestimonial(newTestimonial) {
    try {
        const response = await fetch("http://localhost:3000/testimonials", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newTestimonial)
        });
        if (response.ok) {
            fetchTestimonials(); 
        } else {
            console.error("Yangi testimonialni qo'shishda xatolik yuz berdi.");
        }
    } catch (error) {
        console.error("Yangi testimonialni qo'shishda xatolik:", error);
    }
}

async function editTestimonial(id, field, value) {
    try {
        const response = await fetch(`http://localhost:3000/testimonials/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ [field]: value })
        });
        if (response.ok) {
            fetchTestimonials(); 
        } else {
            console.error("Testimonialni yangilashda xatolik yuz berdi.");
        }
    } catch (error) {
        console.error("Testimonialni yangilashda xatolik:", error);
    }
}

async function deleteTestimonial(id) {
    try {
        const response = await fetch(`http://localhost:3000/testimonials/${id}`, {
            method: "DELETE"
        });
        if (response.ok) {
            fetchTestimonials(); 
        } else {
            console.error("Testimonialni o'chirishda xatolik yuz berdi.");
        }
    } catch (error) {
        console.error("Testimonialni o'chirishda xatolik:", error);
    }
}

document.addEventListener("DOMContentLoaded", fetchTestimonials);












async function fetchContactInfo() {
    try {
        const response = await fetch("http://localhost:3000/contact");
        const contact = await response.json();

        displayContactInfo(contact);
    } catch (error) {
        console.error("Contact ma'lumotlarini olishda xatolik yuz berdi:", error);
    }
}

function displayContactInfo(contact) {
    const container = document.querySelector(".container2 .title2");

    container.innerHTML = ""; 

    const contactDiv = document.createElement("div");
    contactDiv.classList.add("contact-info");

    contactDiv.innerHTML = `
      <p><strong>Email:</strong> <a href="mailto:${contact.email}">${contact.email}</a></p>
      <p><strong>Phone:</strong> <a href="tel:${contact.phone}">${contact.phone}</a></p>
      <p><strong>Address:</strong> ${contact.address}</p>
      <p><strong>Location:</strong> <a href="${contact.mapLink}" target="_blank">View on Map</a></p>
      <button class="user-btn" id="edit-contact">Edit</button>
    `;

    container.appendChild(contactDiv);

    document.getElementById("edit-contact").addEventListener("click", () => {
        editContactInfo(contact);
    });
}

async function editContactInfo(updatedContact) {
    const newContactInfo = {
        email: prompt("Yangi Email:", updatedContact.email) || updatedContact.email,
        phone: prompt("Yangi Telefon:", updatedContact.phone) || updatedContact.phone,
        address: prompt("Yangi Manzil:", updatedContact.address) || updatedContact.address,
        mapLink: prompt("Yangi Xaritaga havola:", updatedContact.mapLink) || updatedContact.mapLink
    };

    try {
        const response = await fetch("http://localhost:3000/contact", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newContactInfo)
        });
        if (response.ok) {
            fetchContactInfo(); 
        } else {
            console.error("Contact ma'lumotlarini yangilashda xatolik yuz berdi.");
        }
    } catch (error) {
        console.error("Contact ma'lumotlarini yangilashda xatolik:", error);
    }
}

document.addEventListener("DOMContentLoaded", fetchContactInfo);
