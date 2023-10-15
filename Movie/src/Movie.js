const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const movies = [
  { id: 1, title: "Inception", director: "Christopher Nolan", year: 2010 },
  { id: 2, title: "Interstellar", director: "Christopher Nolan", year: 2014 },
  { id: 3, title: "Parasite", director: "Bong Joon-ho", year: 2019 },
  { id: 4, title: "The Matrix", director: "The Wachowskis", year: 1999 }
];


app.get('/', (req, res) => {
  res.send("Welcome to the Movie API! Use /info for guidance.");
});


app.get('/info', (req, res) => {
  res.send("To fetch all movies, use GET /movies. To add a new movie, use POST /movies. To update or delete a movie, use PUT or DELETE on /movies/:id respectively.");
});


app.get('/movies', (req, res) => {
  res.json(movies);
});


app.get('/movies/:id', (req, res) => {
  const movieId = parseInt(req.params.id);
  const movie = movies.find(movie => movie.id === movieId);
  if (movie) {
    res.json(movie);
  } else {
    res.status(404).json({ error: 'Movie not found' });
  }
});


app.delete('/movies/:id', (req, res) => {
  const movieId = parseInt(req.params.id);
  const index = movies.findIndex(movie => movie.id === movieId);
  if (index !== -1) {
    movies.splice(index, 1);
    res.json({ message: 'Movie deleted successfully' });
  } else {
    res.status(404).json({ error: 'Movie not found' });
  }
});


app.post('/movies', (req, res) => {
  const { title, director, year } = req.body;
  if (!title || !director || !year) {
    return res.status(400).json({ error: 'Incomplete data. Please provide title, director, and year.' });
  }

  const id = movies.length + 1;
  const newMovie = { id, title, director, year };
  movies.push(newMovie);
  res.json({ message: 'Movie added successfully', movie: newMovie });
});


app.put('/movies/:id', (req, res) => {
  const movieId = parseInt(req.params.id);
  const { title, director, year } = req.body;
  const index = movies.findIndex(movie => movie.id === movieId);

  if (index !== -1) {
    if (title) movies[index].title = title;
    if (director) movies[index].director = director;
    if (year) movies[index].year = year;

    res.json({ message: 'Movie updated successfully', movie: movies[index] });
  } else {
    res.status(404).json({ error: 'Movie not found' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
