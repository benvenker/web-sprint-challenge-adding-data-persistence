const express = require('express');

const db = require('./data/db');

const server = express();

server.use(express.json());

module.exports = server;

// Projects endpoints
server.get('/api/projects', async (req, res) => {
  try {
    const projects = await db.getProjects();
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ message: `Error: ${err}` });
  }
});

server.post('/api/projects', async (req, res) => {
  try {
    const projects = await db.addProject(req.body);
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ message: `Error: ${err}` });
  }
});

server.get('/api/projects/:id/tasks', async (req, res) => {
  try {
    const tasks = await db.getProjectTasks(req.params.id);
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: `Error: ${err}` });
  }
});

server.get('/api/projects/:id/resources', async (req, res) => {
  try {
    const tasks = await db.getProjectResources(req.params.id);
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: `Error: ${err}` });
  }
});

server.post('/api/projects/:id/add-resource', async (req, res) => {
  const projectId = req.params.id;
  const resourceId = req.body.resource_id;
  try {
    const projectResource = await db.addResourceToProject(
      projectId,
      resourceId
    );
    res.status(200).json(projectResource);
  } catch (err) {
    res.status(500).json({ message: `Error: ${err}` });
  }
});

// Tasks Endpoints
server.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await db.getTasks();
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: `Error: ${err}` });
  }
});

server.post('/api/tasks', async (req, res) => {
  try {
    const tasks = await db.addTask(req.body);
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: `Error: ${err}` });
  }
});

// Resources Endpoints
server.get('/api/resources/:id/projects', async (req, res) => {
  try {
    const projects = await db.getProjectsUsingResource(req.params.id);
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ message: `Error: ${err}` });
  }
});

server.get('/api/resources', async (req, res) => {
  try {
    const resources = await db.getResources();
    res.status(200).json(resources);
  } catch (err) {
    res.status(500).json({ message: `Error: ${err}` });
  }
});

server.post('/api/resources', async (req, res) => {
  try {
    const resources = await db.addResources(req.body);
    res.status(200).json(resources);
  } catch (err) {
    res.status(500).json({ message: `Error: ${err}` });
  }
});
