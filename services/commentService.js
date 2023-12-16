var db = require('../database/database');

  async function findAllUsers(req, res, next) {
    try {
      const { User } = await db();
      const users = await User.findAll();
      res.render('form.twig', { title: 'Chayma Work', users: users });
    } catch (e) {
      console.error(e);
      res.status(500).send('Internal Server Error');
    }
  }
  
  async function createUser(req, res, next) {
      const { User } = await db();
      const { username, password, birthday } = req.body;
      await User.create({ username, password, birthday });
      res.redirect('/forms');
  }
  
  async function displayUpdateForm(req, res, next) {
      try {
          const { User } = await db();
          const { id } = req.params;
          const userToUpdate = await User.findByPk(id);
          if (!userToUpdate) {
              return res.status(404).json({ error: 'User not found' });
          }
          res.render('formupdate.twig', { title: 'Update User', user: userToUpdate });
      } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
      }
  };
  
  async function updateUser(req, res) {
      try {
          const { User } = await db();
          const { username, password, birthday } = req.body;
          const { id } = req.params;
          const userToUpdate = await User.findByPk(id);
          if (!userToUpdate) {
              return res.status(404).json({ error: 'User not found' });
          }
          userToUpdate.username = username;
          userToUpdate.password = password;
          userToUpdate.birthday = birthday;
          await userToUpdate.save();
          res.redirect('/forms');
      } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
      }
  }
  
  async function deleteUser(req, res, next) {
      try {
          const { User } = await db();
          const { id } = req.params;
          const userToDelete = await User.findByPk(id);
          if (!userToDelete) {
              return res.status(404).json({ error: 'User not found' });
          }
          await userToDelete.destroy();
          res.redirect('/forms');
      } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
      }
  }
  
  module.exports = { findAllUsers, createUser, displayUpdateForm, updateUser, deleteUser };
  