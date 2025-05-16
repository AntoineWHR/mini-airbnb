const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Données des logements (normalement, ces données proviendraient d'une base de données)
const logements = [
  {
    id: 1,
    titre: "Appartement lumineux au centre-ville",
    description: "Bel appartement de 2 chambres, entièrement rénové et idéalement situé en plein cœur de la ville. Cuisine équipée, WiFi haut débit et vue imprenable sur la place principale.",
    prix: 85,
    images: ["appart1.jpg"],
    capacite: 4,
    chambres: 2,
    sallesDeBain: 1,
    equipements: ["WiFi", "Cuisine équipée", "Télévision", "Machine à laver"],
    emplacement: "Centre-ville",
    coordonnees: { lat: 48.8566, lng: 2.3522 } // Paris pour l'exemple
  },
  {
    id: 2,
    titre: "Villa avec piscine proche plage",
    description: "Magnifique villa de 3 chambres avec piscine privée. Située à seulement 5 minutes à pied de la plage. Parfait pour des vacances en famille ou entre amis.",
    prix: 150,
    images: ["villa1.jpg"],
    capacite: 6,
    chambres: 3,
    sallesDeBain: 2,
    equipements: ["Piscine", "WiFi", "Barbecue", "Lave-vaisselle", "Parking"],
    emplacement: "Bord de mer",
    coordonnees: { lat: 43.2965, lng: 5.3698 } // Marseille pour l'exemple
  },
  {
    id: 3,
    titre: "Studio cosy dans quartier historique",
    description: "Charmant studio rénové dans un immeuble ancien du quartier historique. Idéal pour un couple souhaitant découvrir la ville à pied.",
    prix: 65,
    images: ["studio1.jpg"],
    capacite: 2,
    chambres: 1,
    sallesDeBain: 1,
    equipements: ["WiFi", "Cuisine équipée", "Chauffage", "Sèche-cheveux"],
    emplacement: "Quartier historique",
    coordonnees: { lat: 45.7640, lng: 4.8357 } // Lyon pour l'exemple
  },
  {
    id: 4,
    titre: "Maison de campagne au calme",
    description: "Grande maison traditionnelle en pierre au milieu de la campagne. Jardin spacieux, terrasse et vue panoramique sur les collines environnantes.",
    prix: 120,
    images: ["maison1.jpg"],
    capacite: 8,
    chambres: 4,
    sallesDeBain: 2,
    equipements: ["Jardin", "Cheminée", "WiFi", "Cuisine équipée", "Barbecue"],
    emplacement: "Campagne",
    coordonnees: { lat: 44.5721, lng: 6.0872 } // Quelque part dans les Alpes
  }
];

// Configuration du moteur de templates EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware pour servir les fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));

// Route pour la page d'accueil
app.get('/', (req, res) => {
  res.render('accueil', { 
    logements: logements, 
    title: 'Mini-Airbnb - Accueil' 
  });
});

// Route pour la page de détail d'un logement
app.get('/logement/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const logement = logements.find(logement => logement.id === id);
  
  if (!logement) {
    return res.status(404).render('404', { 
      title: 'Logement non trouvé' 
    });
  }
  
  res.render('detail', { 
    logement: logement, 
    title: `${logement.titre} - Mini-Airbnb` 
  });
});

// Route pour la page 404 (non trouvé)
app.use((req, res) => {
  res.status(404).render('404', { 
    title: 'Page non trouvée' 
  });
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});