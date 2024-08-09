document.addEventListener('DOMContentLoaded', () => {
  const cursor = document.getElementById('custom-cursor');

  document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.pageX}px`;
    cursor.style.top = `${e.pageY}px`;
    cursor.style.display = 'block';
  });

  document.addEventListener('mouseenter', (e) => {
    cursor.style.display = 'block';
  });

  document.addEventListener('mouseleave', (e) => {
    cursor.style.display = 'none';
  });

  document.addEventListener('mousedown', () => {
    cursor.classList.add('clicked');
  });

  document.addEventListener('mouseup', () => {
    cursor.classList.remove('clicked');
  });
});

function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// Dark / light mode

const btn = document.getElementById("modeToggle");
const btn2 = document.getElementById("modeToggle2");
const themeIcons = document.querySelectorAll(".icon");
const currentTheme = localStorage.getItem("theme");

if (currentTheme === "dark") {
  setDarkMode();
}

btn.addEventListener("click", function () {
  setTheme();
});

btn2.addEventListener("click", function () {
  setTheme();
});

function setTheme() {
  let currentTheme = document.body.getAttribute("theme");

  if (currentTheme === "dark") {
    setLightMode();
  } else {
    setDarkMode();
  }
}

function setDarkMode() {
  document.body.setAttribute("theme", "dark");
  localStorage.setItem("theme", "dark");

  themeIcons.forEach((icon) => {
    icon.src = icon.getAttribute("src-dark");
  });
}

function setLightMode() {
  document.body.removeAttribute("theme");
  localStorage.setItem("theme", "light");

  themeIcons.forEach((icon) => {
    icon.src = icon.getAttribute("src-light");
  });
}


document.getElementById('add-project-btn').addEventListener('click', function() {
  const title = document.getElementById('project-title').value.trim();
  const imgUrl = document.getElementById('project-img-url').value.trim();
  const githubUrl = document.getElementById('github-url').value.trim();
  const liveDemoUrl = document.getElementById('live-demo-url').value.trim();
  
  // Clear previous error messages
  document.getElementById('title-error').innerHTML = '';
  document.getElementById('img-url-error').innerHTML = '';
  document.getElementById('github-url-error').innerHTML = '';
  document.getElementById('live-demo-url-error').innerHTML = '';

  const urlPattern = /^(https?:\/\/[^\s$.?#].[^\s]*)$/;
  const titlePattern = /^[a-zA-Z0-9 ]{3,100}$/;

  let hasError = false;

  if (!titlePattern.test(title)) {
    document.getElementById('title-error').innerHTML = 'Title should be 3-100 characters long<br> and contain only letters, numbers, and spaces.';
    hasError = true;
  }
  if (!urlPattern.test(imgUrl)) {
    document.getElementById('img-url-error').innerHTML = 'Image URL is not valid.';
    hasError = true;
  }
  if (!urlPattern.test(githubUrl)) {
    document.getElementById('github-url-error').innerHTML = 'GitHub URL is not valid.';
    hasError = true;
  }
  if (!urlPattern.test(liveDemoUrl)) {
    document.getElementById('live-demo-url-error').innerHTML = 'Live Demo URL is not valid.';
    hasError = true;
  }

  if (hasError) {
    return;
  }

  const secondExperienceDetailsContainer = document.querySelectorAll('.experience-details-container')[1];
  const aboutContainers = secondExperienceDetailsContainer.querySelector('.about-containers');
  const secondAboutContainer = aboutContainers;

  const detailsContainer = document.createElement('div');
  detailsContainer.className = 'details-container color-container';

  const articleContainer = document.createElement('div');
  articleContainer.className = 'article-container';

  const img = document.createElement('img');
  img.src = imgUrl;
  img.alt = title;
  img.className = 'project-img';

  articleContainer.appendChild(img);

  const projectTitle = document.createElement('h2');
  projectTitle.className = 'experience-sub-title project-title';
  projectTitle.textContent = title;

  const btnContainer = document.createElement('div');
  btnContainer.className = 'btn-container';

  const githubButton = document.createElement('button');
  githubButton.className = 'btn btn-color-2 project-btn';
  githubButton.textContent = 'Github';
  githubButton.onclick = function() {
    window.open(githubUrl, '_blank');
  };

  const liveDemoButton = document.createElement('button');
  liveDemoButton.className = 'btn btn-color-2 project-btn';
  liveDemoButton.textContent = 'Live Demo';
  liveDemoButton.onclick = function() {
    window.open(liveDemoUrl, '_blank');
  };

  btnContainer.appendChild(githubButton);
  btnContainer.appendChild(liveDemoButton);

  detailsContainer.appendChild(articleContainer);
  detailsContainer.appendChild(projectTitle);
  detailsContainer.appendChild(btnContainer);

  // Prepend the new project to the second about-containers inside the second experience-details-container
  secondAboutContainer.insertBefore(detailsContainer, secondAboutContainer.firstChild);
});

document.getElementById('add-Exp-btn').addEventListener('click', function() {
  // Get input values
  const expHeader = document.getElementById('ExpHead').value;
  const erro = document.getElementsByClassName('exp-error')[0]; // Assuming there is only one error element
  let msg = 'Please enter the title';

  // Clear previous error messages
  erro.textContent = '';

  if (expHeader.trim() === '') {
    erro.textContent = msg;
    return; // Exit the function if the header is empty
  }

  const articleInputs = document.querySelectorAll('.txt-inpt');
  const selectInputs = document.querySelectorAll('select');

  // Create a new details container
  const newContainer = document.createElement('div');
  newContainer.className = 'details-container1';

  // Add the header
  const header = document.createElement('h2');
  header.className = 'experience-sub-title';
  header.textContent = expHeader;
  newContainer.appendChild(header);

  // Create the article container
  const articleContainer = document.createElement('div');
  articleContainer.className = 'article-container1';

  // Create the leftart and rightart divs
  const leftArt = document.createElement('div');
  leftArt.className = 'leftart';
  const rightArt = document.createElement('div');
  rightArt.className = 'rightart';

  // Helper function to create article elements
  function createArticle(articleText, experienceLevel) {
    const article = document.createElement('article');
    const img = document.createElement('img');
    img.alt = 'Experience icon';
    img.className = 'icon';
    updateImageSource(img);

    const div = document.createElement('div');
    const h3 = document.createElement('h3');
    h3.textContent = articleText;
    const p = document.createElement('p');
    p.textContent = experienceLevel;

    div.appendChild(h3);
    div.appendChild(p);
    article.appendChild(img);
    article.appendChild(div);

    return article;
  }

  articleInputs.forEach((input, index) => {
    if (input.value.trim() !== '') {
      const experienceLevel = selectInputs[index].value;
      const articleElement = createArticle(input.value, experienceLevel);

      // Add articles to the leftArt or rightArt based on index
      if (index < 3) {
        leftArt.appendChild(articleElement);
      } else {
        rightArt.appendChild(articleElement);
      }
    }
  });

  // Append leftArt and rightArt to the article container
  articleContainer.appendChild(leftArt);
  articleContainer.appendChild(rightArt);

  // Append the article container to the new container
  newContainer.appendChild(articleContainer);

  // Check if aboutContainer is defined
  const experienceDetailsContainer = document.querySelectorAll('.experience-details-container')[0];
  const aboutContainer = experienceDetailsContainer.querySelector('.about-containers');
  if (aboutContainer) {
    aboutContainer.insertBefore(newContainer, aboutContainer.firstChild);
  }

  // Helper function to update image source based on theme
  function updateImageSource(img) {
    const theme = document.body.getAttribute('theme');
    img.src = theme === 'dark' ? './assets/checkmark_dark.png' : './assets/checkmark_light.png';
  }

  // Initially update all icons
  const icons = document.querySelectorAll('.icon');
});
