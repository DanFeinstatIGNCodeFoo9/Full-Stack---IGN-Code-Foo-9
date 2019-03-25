# Full-Stack---IGN-Code-Foo-9

This is a real-time chat application with persistent data build on the MERN+websockets stack along with jwt/bcrypt auth and protected chat api.

Note: The audio from a minor novelty feature does not currently function in mobile safari due to their restrictions on autoplay.

Note2: I've purposefully left the .env file off the .gitignore for ease of use, which I would typically never do. In that vein, I also left source maps intact on deployment.

## Getting Started

Clone the repo.

Npm install the dependencies for the package.json inside and outside the client folder.

For local host deployment get your server running with "node server.js" in the root directory, and run "yarn start" in the client.

For heroku deployment, run "heroku create" in the root directory.

Log into the heroku website and add mLab MongoDB to your addons (it's free!) for the created project.

Make sure your commits are up to date, and then run "git push heroku master".

Once the build is complete run "heroku open".
