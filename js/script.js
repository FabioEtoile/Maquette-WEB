// Fonction pour filtrer les applications via la barre de recherche
document.getElementById("searchApp").addEventListener("keyup", function() {
  const filter = this.value.toLowerCase();
  const apps = document.getElementsByClassName("app-box");

  for (let i = 0; i < apps.length; i++) {
      let app = apps[i];
      let appName = app.textContent || app.innerText;

      if (appName.toLowerCase().indexOf(filter) > -1) {
          app.style.display = "";
      } else {
          app.style.display = "none";
      }
  }
});

// Fonction pour filtrer les profils via la barre de recherche
document.getElementById("searchProfile").addEventListener("keyup", function() {
  const filter = this.value.toLowerCase();
  const profiles = document.querySelectorAll("#profileList li");

  profiles.forEach(profile => {
      const profileName = profile.textContent || profile.innerText;
      if (profileName.toLowerCase().indexOf(filter) > -1) {
          profile.style.display = "";
      } else {
          profile.style.display = "none";
      }
  });
});

// Fonction pour créer un nouveau profil
document.getElementById("createProfileBtn").addEventListener("click", function() {
  const profileName = document.getElementById("profileName").value;

  if (!profileName) {
      alert("Veuillez entrer un nom de profil.");
      return;
  }

  const checkboxes = document.querySelectorAll(".app-rights input[type='checkbox']:checked");
  let selectedRights = [];

  checkboxes.forEach((checkbox) => {
      const label = checkbox.nextSibling.textContent;
      selectedRights.push(label.trim());
  });

  if (selectedRights.length === 0) {
      alert("Veuillez sélectionner au moins un droit.");
      return;
  }

  console.log("Nom du profil :", profileName);
  console.log("Droits sélectionnés :", selectedRights);

  const newProfile = document.createElement("li");
  newProfile.textContent = profileName;
  newProfile.onclick = function() {
    showProfileRights(profileName);
  };
  document.getElementById("profileList").appendChild(newProfile);


  document.getElementById("profileName").value = '';
  checkboxes.forEach((checkbox) => (checkbox.checked = false));
  document.getElementById("createProfileModal").style.display = 'none';

  alert("Profil créé avec succès !");
});

// Fonction pour basculer l'affichage des sections (toggle)
function toggleSection(sectionId) {
  const content = document.getElementById(sectionId);
  const arrow = document.querySelector(`.section-title[onclick="toggleSection('${sectionId}')"] .arrow`);

  content.classList.toggle("w3-hide"); 
  arrow.textContent = content.classList.contains("w3-hide") ? "▼" : "▲"; // Change la flèche
}

// Ferme les sections par défaut sur la page Mes Droits
document.addEventListener("DOMContentLoaded", function() {
  // Vérifie si l'utilisateur est sur la page mes droits
  if (window.location.pathname.includes("mesdroits.html")) {
      // Ferme les sections par défaut
      document.getElementById("frequentApps").classList.add("w3-hide");
      document.getElementById("managementApps").classList.add("w3-hide");
      document.getElementById("adminApps").classList.add("w3-hide");

      
      const arrows = document.querySelectorAll(".section-title .arrow");
      arrows.forEach(arrow => {
          arrow.textContent = "▼";
      });
  }
});

// Fonction pour afficher les droits du profil sélectionné
document.getElementById("profileList").addEventListener("click", function(e) {
  if (e.target && e.target.nodeName === "LI") {
      const selectedProfile = e.target.innerText;

    
      const rights = getProfileRights(selectedProfile);


      document.getElementById("profileRights").innerHTML = `
          <h3>Droits pour le profil : ${selectedProfile}</h3>
          <ul>
              ${rights.map(right => `<li>${right}</li>`).join('')}
          </ul>
      `;


      const profiles = document.querySelectorAll("#profileList li");
      profiles.forEach(profile => profile.classList.remove("active"));
      e.target.classList.add("active");
  }
});

// Fonction simulée pour récupérer les droits d'un profil
function getProfileRights(profile) {
  const rightsMapping = {
      "Administrateur": ["Accès total", "Gestion des utilisateurs", "Gestion des applications"],
      "Gestionnaire": ["Gestion des utilisateurs", "Accès aux statistiques"],
      "Utilisateur Standard": ["Consultation des applications", "Accès restreint"],
      "Invité": ["Consultation des applications"],
      "Technicien Support": ["Accès aux outils de support", "Gestion des incidents"],
      "Développeur": ["Accès aux environnements de développement", "Gestion des versions"]
  };

  return rightsMapping[profile] || ["Aucun droit associé"];
}

// Ouvrir la modale de création de profil
function openCreateProfileModal() {
  document.getElementById('createProfileModal').style.display = 'block';
}

// Fermer la modale de création de profil
function closeCreateProfileModal() {
  document.getElementById('createProfileModal').style.display = 'none';
}

// Créer un profil et l'ajouter à la liste
function createProfile() {
  const profileName = document.getElementById('profileName').value.trim();
  if (profileName === "") {
      alert("Veuillez entrer un nom de profil.");
      return;
  }

  // Crée un nouvel élément de profil
  const newProfile = document.createElement('li');
  newProfile.innerHTML = `<a href="#">${profileName}</a>`;
  newProfile.onclick = function() {
      showProfileRights(profileName);
  };

  // Ajoute le nouveau profil à la liste
  const profileList = document.getElementById('profileList');
  profileList.appendChild(newProfile);

  // Réinitialise le formulaire
  document.getElementById('profileName').value = '';
  const checkboxes = document.querySelectorAll('.app-rights-list input[type="checkbox"]');
  checkboxes.forEach(checkbox => checkbox.checked = false);

  // Ferme la modale
  closeCreateProfileModal();
}

// Afficher les droits associés à un profil
function showProfileRights(profileName) {
  alert(`Affichage des droits pour le profil : ${profileName}`);
}

// Fonction de recherche de profils
function searchProfiles() {
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById('searchProfile');
  filter = input.value.toUpperCase();
  ul = document.getElementById("profileList");
  li = ul.getElementsByTagName('li');

  for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("a")[0];
      txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
          li[i].style.display = "";
      } else {
          li[i].style.display = "none";
      }
  }
}
