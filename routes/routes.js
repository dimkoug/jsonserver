// load up our shiny new route for employees
const employeesRoutes = require('./employees');

const appRouter = (app, fs) => {
  // we've added in a default route here that handles empty routes
  // at the base API url
  app.get('/', (req, res) => {
    res.send('welcome to the development api-server');
  });

  // run our employee route module here to complete the wire up
  employeesRoutes(app, fs);
};

// this line is unchanged
module.exports = appRouter;
