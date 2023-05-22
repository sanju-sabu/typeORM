
import { createConnection } from 'typeorm';
import express from 'express';
import { User } from './entities/User';
import { Post } from './entities/Post';

async function main() {
  // Create a new database connection
  const connection = await createConnection();

  const app = express();
  // Middleware to parse JSON request bodies
  app.use(express.json());

//User//

  // Define a route to get all users
  app.get('/users', async (req, res) => {
    const userRepository = connection.getRepository(User);
    const users = await userRepository.find();
    res.json(users);
  });

  // Define a route to create a new user
  app.post('/users', async (req, res) => {
    const { name } = req.body;

    const userRepository = connection.getRepository(User);

    // Create a new user entity
    const newUser = userRepository.create({ name });

    // Save the user to the database
    await userRepository.save(newUser);

    res.json(newUser);
  });

  // Define a route to get a user by ID
  app.get('/users/:id', async (req, res) => {
    const id = +req.params.id;

    const userRepository = connection.getRepository(User);

    // Find the user by ID
    const user = await userRepository.findOne({ where: { id } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  });

  // Define a route to delete a user by ID
  app.delete('/users/:id', async (req, res) => {
    const id = +req.params.id;

    const userRepository = connection.getRepository(User);

    // Find the user by ID
    const user = await userRepository.findOne({ where: { id } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Delete the user
    await userRepository.delete(id);

    res.json({ message: 'User deleted successfully' });
  });

  //Post//

   // Define a route to get all users
   app.get('/posts', async (req, res) => {
    const userRepository = connection.getRepository(Post);
    const users = await userRepository.find();
    res.json(users);
  });

  // Define a route to create a new user
  app.post('/posts', async (req, res) => {
    const { title } = req.body;

    const userRepository = connection.getRepository(Post);

    // Create a new user entity
    const newUser = userRepository.create({ title });

    // Save the user to the database
    await userRepository.save(newUser);

    res.json(newUser);
  });

  // Define a route to get a user by ID
  app.get('/posts/:id', async (req, res) => {
    const id = +req.params.id;

    const userRepository = connection.getRepository(Post);

    // Find the user by ID
    const user = await userRepository.findOne({ where: { id } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  });

  // Define a route to delete a user by ID
  app.delete('/posts/:id', async (req, res) => {
    const id = +req.params.id;

    const userRepository = connection.getRepository(Post);

    // Find the user by ID
    const user = await userRepository.findOne({ where: { id } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Delete the user
    await userRepository.delete(id);

    res.json({ message: 'User deleted successfully' });
  });



  // Start the server
  const server = app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });

  // Close the connection when the server is closed
  server.on('close', async () => {
    await connection.close();
  });
}

main().catch((error) => console.error(error));
