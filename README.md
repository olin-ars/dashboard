# OARS Boat Monitor

When launching an autonomous sailboat out into the ocean, it is critical
to maintain contact with that boat as it ventures across the formidable
seas. The OARS boat dashboard allows us and the rest of the world to
keep tabs on our boat, checking its health and plans and altering settings
when necessary.

# Architecture

There are two components to this project:

## Backend Server

The boat communicates with a telemetry server running Node.js. It reports
its whereabouts, its thoughts, and the current environmental conditions
as measured by the boat. This server then stores the data in a MongoDB
database and provides it via a WebSockets API to clients running the web
app.

## Frontend Web App

All of the information collected is displayed using a React web app. It
enables viewing the boat's status as well as sending it commands, if
properly authenticated.

# Setting up a Dev Environment

Getting the code up and running on your computer is easy! Just follow
the steps below.

### Clone This Repo

You first need to clone the code from this repository to your computer.
To do that, run the following:

    git clone https://github.com/olin-robotic-sailing/trans-atlantic-sailboat.git
    cd trans-atlantic-sailboat

### Install Node.js

Then you'll need to install Node.js and a package manager (yarn).

#### On Ubuntu

    curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash
    nvm install node
    nvm use node
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
    sudo apt-get update && sudo apt-get install yarn

#### On macOS

On macOS running [Homebrew](https://brew.sh/), you can install both Node.js
and yarn by running `brew install yarn`.

### Install the Dependencies

Once you have Node installed, you can use `yarn` to install all the
necessary packages (read from `package.json`).

    yarn install

**Note**: You must be in the `trans-atlantic-sailboat` folder when
running the above command.

### Starting the Server

To start a local instance of the server, simply run the following in Terminal:

    yarn run server

### Starting the Web App

In another Terminal, run

    yarn run dev

The web app should now be available at <localhost:8080>. The site will
automatically refresh to reflect any changes you make to files.
