const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.use(express.static('public'));

const logements = [
  {
    id: 1,
    titre: 'Appartement à Paris',
    images: ['parisappart.jpg'],
    emplacement: 'Paris, France',
    capacite: 4,
    chambres: 2,
    prix: 100,
    coordonnees: { lat: 48.8566, lng: 2.3522 },
    description: 'Un bel appartement au cœur de Paris.',
    equipements: ['Wi-Fi', 'Climatisation'],
    hote: {
      nom: 'Antoine',
      photo: 'antoine.jpg',
      description: 'Hôte super accueillant, toujours prêt à aider !'
    }
  },
  {
    id: 2,
    titre: 'Maison à Lyon',
    images: ['lyonmaison.jpg'],
    emplacement: 'Lyon, France',
    capacite: 6,
    chambres: 3,
    prix: 150,
    coordonnees: { lat: 45.7640, lng: 4.8357 },
    description: 'Maison spacieuse avec un grand jardin.',
    equipements: ['Piscine', 'Wi-Fi', 'Climatisation'],
    hote: {
      nom: 'Saad',
      photo: 'saad.jpg',
      description: 'Saad est un hôte amical et toujours disponible pour ses invités.'
    }
  },
  {
    id: 3,
    titre: 'Maison de Shrek',
    images: ['shrekmaison.jpg'],
    emplacement: 'Forêt de Duloc, Royaume de Farquaad',
    capacite: 5,
    chambres: 2,
    prix: 120,
    coordonnees: { lat: 53.3812, lng: 5.0143 },
    description: 'La maison de Shrek, un endroit tranquille en pleine forêt.',
    equipements: ['Télévision', 'Climatisation', 'Bain de boue'],
    hote: {
      nom: 'Shrek',
      photo: 'shrek.jpg',
      description: 'Un ogre généreux qui adore les voyages et la tranquillité.'
    }
  },
  {
    id: 4,
    titre: 'Maison des Simpsons',
    images: ['simpsonsmaison.jpg'],
    emplacement: 'Springfield, USA',
    capacite: 6,
    chambres: 3,
    prix: 150,
    coordonnees: { lat: 39.7392, lng: -94.5207 },
    description: 'La célèbre maison des Simpsons, un endroit idéal pour les familles.',
    equipements: ['Télévision', 'Piscine', 'Garage'],
    hote: {
      nom: 'Homer Simpson',
      photo: 'homer.jpg',
      description: 'Un hôte passionné de donuts et de télévision.'
    }
  },
  {
    id: 5,
    titre: 'Loft à New York',
    images: ['nyloft.jpg'],
    emplacement: 'New York, USA',
    capacite: 4,
    chambres: 2,
    prix: 200,
    coordonnees: { lat: 40.7128, lng: -74.0060 },
    description: 'Un loft moderne au cœur de Manhattan, parfait pour une escapade urbaine.',
    equipements: ['Wi-Fi', 'Climatisation', 'Machine à café'],
    hote: {
      nom: 'John Doe',
      photo: 'john.jpg',
      description: 'John est un passionné d\'architecture et un excellent guide pour découvrir New York.'
    }
  }
];

// Route d'accueil avec pagination
app.get('/', (req, res) => {
  const logementsParPage = 5; // Le nombre de logements à afficher par page
  const page = parseInt(req.query.page) || 1; // Page actuelle, avec une valeur par défaut
  const startIndex = (page - 1) * logementsParPage;
  const endIndex = page * logementsParPage;
  const logementsPage = logements.slice(startIndex, endIndex);

  // Calcul du nombre total de pages
  const totalPages = Math.ceil(logements.length / logementsParPage);

  // Envoyer les données nécessaires à la vue
  res.render('accueil', {
    logements: logementsPage,
    currentPage: page,
    totalPages: totalPages
  });
});

// Route de détail pour chaque logement
app.get('/logement/:id', (req, res) => {
  const id = req.params.id;
  const logement = logements.find(l => l.id == id);
  res.render('detail', { logement });
});

// Route 404
app.use((req, res) => {
  res.status(404).render('404');
});

app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});
