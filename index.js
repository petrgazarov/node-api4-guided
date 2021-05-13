//----------------------------------------------------------------------------//
// DEVOPS AND HEROKU AUTO DEPLOYMENT
//----------------------------------------------------------------------------//
//
// The main motivation of deployment environments is to provide for a consistent
// effort to test the validity of the code before releasing it. Typically, an
// application will have the following environments (though this varies):
//
// * Dev - the environments where developers write and self-test code.
// * Staging - an environment where the deployment is tested.
// * Production - the final environment where customers and users can access the
//   app or service.
//
// Many public cloud services, like Heroku, can be used to host your application's
// environments. You can configure Heroku to automatically deploy your software to
// its environment. To do this:
//
// * Create a Heroku account
// * Log in and create an application
// * On the "Deploy" tab, connect the application to your GitHub account
// * Select the GitHub repo and branch you want to deploy to Heroku from
// * Enable Automatic Deployments
//
// This will configure GitHub to allow Heroku to access your GitHub repo/branch,
// and to notify Heroku when code changes are checked into the branch. Heroku
// will then deploy and run your code.
//
// Don't forget the "start" script in package.json. This is how Heroku starts
// your app.

//----------------------------------------------------------------------------//
//  DOTENV AND BEST PRACTICES FOR USING ENVIRONMENTS TO CONFIGURE APPS
//----------------------------------------------------------------------------//
//  The dotenv package allows you to specify environment variables in a file
//  called ".env", without having to actually create them in your operating
//  system shell environment, but also without preventing you from using the
//  operating system shell environment to create variables that impact how the
//  app works. Using environment variables is a best practice that has existed
//  for a long time, and is a common way to allow system administrators to
//  provide environment-specific config data to an app. That way, sensitive config
//  data (like authentication credentials) don't have to be shared or passed
//  around in an insecure manner. Check out
//  https://en.wikipedia.org/wiki/Environment_variable if you are curious.
//
require('dotenv').config();

const server = require("./api/server.js");

//----------------------------------------------------------------------------//
//  THE PORT ENVIRONMENT VARIABLE
//----------------------------------------------------------------------------//
//  We are using the PORT environment variable name because when our app runs in
//  Heroku's environment, the PORT environment variable will be defined by
//  Heroku, with the value of the port that has been assigned to our app. That
//  way, we can listen on that port.
//
//  Note that the URL to access your app on Heroku doesn't include the port
//  number. The HTTP request will come in on [hostname]:443 (the https port), and
//  Heroku's internet-facing webserver will direct the request to your application
//  server on the port that was assigned to it. This part happens automatically
//  (you don't have to do it yourself), but that is why you need to start the
//  server on port provided in the PORT environment variable, rather on your
//  own port.
//
//  To simulate an environment variable for our dev environment, we can do
//  what Heroku does and define a PORT environment variable (or define one in
//  .env), and access it from process.env.
//
//  The syntax below just checks to see if PORT is defined, and uses its value
//  if it is, and uses 5000 as a default if it's not.
const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`\n*** Server Running on http://localhost:${port} ***\n`);
});

//----------------------------------------------------------------------------//
//  THE HEROKU CLI
//----------------------------------------------------------------------------//
//  Consider installing the Heroku CLI. It is very useful, though you will
//  need to read documentation to know how to use it and what you can do with it.
//
//----------------------------------------------------------------------------//
//  VIEWING HEROKU APP LOGS
//----------------------------------------------------------------------------//
//  You can view console messages (created by your app) and other log entries
//  (created by the Heroku environment) by clicking More | View Logs (in the
//  upper-right corner of the Heroku dashboard).
//
//  You can also use the Heroku CLI to view your apps log files. After you have
//  logged into the Heroku account from the CLI, the following command will
//  allow you to "tail" the log file. The CLI command to view the scrolling log
//  file in real time is:
//
//    heroku logs --tail -a <app_name>
//
