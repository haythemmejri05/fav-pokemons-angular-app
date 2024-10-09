import express from 'express';
import bcrypt from 'bcrypt';
import { createClient } from '@supabase/supabase-js';
const app = express();

import config from './config/config.js';
import setupMiddlewares from './middleware/index.js';

// Setup the global middlewares
setupMiddlewares(app);

// Initialize Supabase
if (!config.supabaseUrl || !config.supabaseKey) {
  throw new Error(
    'Missing Supabase configuration: Ensure SUPABASE_URL and SUPABASE_KEY are defined.'
  );
}
const supabase = createClient(config.supabaseUrl, config.supabaseKey);

// Define the healthcheck route
app.use('/healthcheck', (req, res) => {
  res.send('OK');
});

// Define the route to get all Pokemons
app.get('/api/pokemons', async (req, res) => {
  try {
    const { data: pokemons, error } = await supabase.from('pokemons').select(`
      id,
      name,
      image,
      power,
      life,
      type (id, name)
    `);

    if (error) return res.status(500).json({ error: error.message });
    res.json(pokemons);
  } catch (exception) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Define the route to add a new Pokemon
app.post('/api/pokemons', async (req, res) => {
  try {
    console.log('Request Body:', req.body);
    const { name, type, image, power, life } = req.body;
    // Validate required fields
    if (!name || !type || !power || !life) {
      return res.status(400).json({
        error:
          'Bad Request: Please ensure that all necessary fields are filled: (name, type, power, life)',
      });
    }
    // Validate power field
    if (isNaN(power) || power < 10 || power > 100) {
      return res.status(400).json({
        error: 'Bad Request: Please provide a correct power value',
      });
    }
    // Validate life field
    if (isNaN(life) || life < 50 || life > 100) {
      return res.status(400).json({
        error: 'Bad Request: Please provide a correct life value',
      });
    }

    // Insert into the database
    const { data: pokemon, error } = await supabase
      .from('pokemons')
      .insert([{ name, type, image, power, life }]);

    // Error handling
    if (error) return res.status(400).json({ error: error.message });

    res.status(201).json({
      message: 'A new Pokemon was added successfully!',
      pokemon,
    });
  } catch (exception) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Define the route to update a new Pokemon
app.put('/api/pokemons/:id', async (req, res) => {
  try {
    console.log('Request Body:', req.body);
    const { name, type, image, power, life } = req.body;
    const { id } = req.params;
    // Validate required fields
    if (!name || !type || !power || !life) {
      return res.status(400).json({
        error:
          'Bad Request: Please ensure that all necessary fields are filled: (name, type, power, life)',
      });
    }
    // Validate power field
    if (isNaN(power) || power < 10 || power > 100) {
      return res.status(400).json({
        error: 'Bad Request: Please provide a correct power value',
      });
    }
    // Validate life field
    if (isNaN(life) || life < 50 || life > 100) {
      return res.status(400).json({
        error: 'Bad Request: Please provide a correct life value',
      });
    }

    // Update in the database
    const { data: pokemon, error } = await supabase
      .from('pokemons')
      .update([{ name, type, image, power, life }])
      .eq('id', id);

    // Error handling
    if (error) console.log(error);
    if (error) return res.status(400).json({ error: error.message });

    res.status(200).json({
      message: `The Pokemon with id ${id} was updated successfully!`,
      pokemon,
    });
  } catch (exception) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Define the route to remove Pokemon
app.delete('/api/pokemons/:id', async (req, res) => {
  try {
    console.log('Request Body:', req.body);
    const { id } = req.params;

    // Remove from the database
    const { data: pokemon, error } = await supabase
      .from('pokemons')
      .delete()
      .eq('id', id);

    // Error handling
    if (error) return res.status(400).json({ error: error.message });

    res.status(200).json({
      message: `The Pokemon with id ${id} was updated successfully!`,
      pokemon,
    });
  } catch (exception) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Define the route to get all Pokemon type
app.get('/api/pokemon-types', async (req, res) => {
  try {
    const { data: pokemonTypes, error } = await supabase
      .from('pokemon_types')
      .select(`*`);

    if (error) return res.status(500).json({ error: error.message });
    res.json(pokemonTypes);
  } catch (exception) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Define the route to get teams
app.get('/api/teams', async (req, res) => {
  try {
    const { data: teams, error } = await supabase.from('teams').select(`
        id,
        name,
        user_id,
        pokemon1 (id, name, type, image, power, life),
        pokemon2 (id, name, type, image, power, life),
        pokemon3 (id, name, type, image, power, life),
        pokemon4 (id, name, type, image, power, life),
        pokemon5 (id, name, type, image, power, life),
        pokemon6 (id, name, type, image, power, life)`);

    if (error) return res.status(500).json({ error: error.message });
    res.json(teams);
  } catch (exception) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Define the route to add a new team
app.post('/api/teams', async (req, res) => {
  try {
    console.log('Request Body:', req.body);
    const {
      user_id,
      name,
      pokemon1,
      pokemon2,
      pokemon3,
      pokemon4,
      pokemon5,
      pokemon6,
    } = req.body;
    // Validate required fields
    if (
      !user_id ||
      !name ||
      !pokemon1 ||
      !pokemon2 ||
      !pokemon3 ||
      !pokemon4 ||
      !pokemon5 ||
      !pokemon6
    ) {
      return res.status(400).json({
        error:
          'Bad Request: Please ensure that all necessary fields are filled: (user_id, name, pokemon1, pokemon2, pokemon3, pokemon4, pokemon5, pokemon6)',
      });
    }

    // Insert into the database
    const { data: team, error } = await supabase.from('teams').insert([
      {
        user_id,
        name,
        pokemon1,
        pokemon2,
        pokemon3,
        pokemon4,
        pokemon5,
        pokemon6,
      },
    ]);

    // Error handling
    if (error) return res.status(400).json({ error: error.message });

    res.status(201).json({
      message: 'A new team was added successfully!',
      team,
    });
  } catch (exception) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Define the route to get weakness factors
app.get('/api/weakness', async (req, res) => {
  try {
    const { data: weakness, error } = await supabase.from('weakness').select(`
        id,
        type1 (id, name),
        type2 (id, name),
        factor`);

    if (error) return res.status(500).json({ error: error.message });
    res.json(weakness);
  } catch (exception) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Define the route for sign-in
app.post('/api/sign-in', async (req, res) => {
  try {
    console.log('Request Body:', req.body);
    const { email, password } = req.body;
    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({
        error:
          'Bad Request: Please ensure that all necessary fields are filled: (email, password)',
      });
    }

    // Insert into the database
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    // Error handling
    if (error || !user) return res.status(400).json({ error: error.message });

    // Compare passwords
    const isPasswordMatch = await bcrypt.compareSync(
      password,
      user.password_hash
    );

    isPasswordMatch
      ? res.status(200).json({
          message: 'Sign-in successfully!',
          user,
        })
      : res.status(400).json({ error: 'Bad Request: incorrect credentials' });
  } catch (exception) {
    console.log(exception);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const saltRounds = 10;

// Define the route for sign-up
app.post('/api/sign-up', async (req, res) => {
  try {
    console.log('Request Body:', req.body);
    const { email, password, passwordConfirmation } = req.body;
    // Validate required fields
    if (!email || !password || !passwordConfirmation) {
      return res.status(400).json({
        error:
          'Bad Request: Please ensure that all necessary fields are filled: (email, password, passwordConfirmation)',
      });
    }
    // Validate password confirmation
    if (password !== passwordConfirmation) {
      return res.status(400).json({
        error:
          'Bad Request: Please make sure that password confirmation and password match',
      });
    }

    const passwordHash = await bcrypt.hashSync(password, saltRounds);

    // Insert into the database
    const { data: user, error } = await supabase
      .from('users')
      .insert([{ email, password_hash: passwordHash }]);

    // Error handling
    if (error) return res.status(400).json({ error: error.message });

    res.status(201).json({
      message: 'A new user was added successfully!',
      user,
    });
  } catch (exception) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default app;
