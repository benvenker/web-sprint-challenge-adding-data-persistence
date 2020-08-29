const db = require('./dbConfig');

module.exports = {
  addResources,
  getResources,
  addProject,
  getProjects,
  addTask,
  getTasks,
  // Stretch
  getProjectTasks,
  addResourceToProject,
  getProjectResources,
  getProjectsUsingResource,
};

async function addResources(resource) {
  const { name } = resource;
  try {
    if (name) {
      return await db('resources').insert(resource);
    }
  } catch (err) {
    console.log(err);
  }
}

async function getResources() {
  try {
    return await db('resources');
  } catch (err) {
    console.log(err);
  }
}

async function getProjectsUsingResource(resourceId) {
  try {
    return await db
      .distinct('p.name')
      .from('projects_resources as pr')
      .join('projects as p', 'p.id', 'pr.project_id')
      .where({ resource_id: resourceId });
  } catch (err) {
    console.log(err);
  }
}

async function addProject(project) {
  const { name } = project;

  try {
    if (name) {
      return await db('projects').insert(project);
    } else {
    }
  } catch (err) {
    console.log(err);
  }
}

async function getProjects() {
  try {
    return await db('projects');
  } catch (err) {
    console.log(err);
  }
}

async function addTask(task) {
  const { name, project_id } = task;

  try {
    if (name && project_id) {
      return await db('tasks').insert(task);
    } else {
      throw new Error('You must include a name and a project');
    }
  } catch (err) {
    console.log(err);
  }
}

async function getTasks() {
  try {
    return await db('tasks');
  } catch (err) {
    console.log(err);
  }
}

async function getProjectTasks(projectId) {
  try {
    if (projectId) {
      return await db('tasks').where({ project_id: projectId });
    } else {
      console.log('Please provide a project ID');
    }
  } catch (err) {
    console.log(`An error occurred: ${err}`);
  }
}

async function addResourceToProject(projectId, resourceId) {
  const resource = await db('resources').where({ id: resourceId });
  const project = await db('projects').where({ id: projectId });
  console.log({ resource });
  try {
    if (resource.length > 0 && project.length > 0) {
      return await db('projects_resources').insert({
        project_id: projectId,
        resource_id: resourceId,
      });
    } else {
      console.log('you must include a project and resource that exist');
    }
  } catch (err) {
    console.log(`An error occurred: ${err}`);
  }
}

async function getProjectResources(projectId) {
  try {
    if (projectId) {
      return await db
        .select('r.name', 'r.description')
        .from('projects_resources')
        .join('resources as r', 'r.id', 'projects_resources.resource_id')
        .where({ project_id: projectId });
    }
  } catch (err) {
    console.log(err);
  }
}
