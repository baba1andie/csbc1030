# Assignment 1 -- Environment Setup

## Goal

The goal of this assignment is to setup your work environments. The tools discussed in the assignment should have already been setup in prior classes, however they may need to be updated.
We will then test the submission flow by setting up a basic NodeJS Application. This submission flow is the same flow for all future assignments and for the final project.

## Instructions

### Setup Git

You may install any git client you wish to use in this course however my recommendation is to install the [Git CLI](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

Configure your git client (CLI or otherwise) to include your name and email on your commits. You may use any Git Client however commands will only be provided for the Git CLI.

Commands for Git CLI:

1. Setup your username:
   `git config --global user.name "FIRST_NAME LAST_NAME"`

2. Setup your email:
   `git config --global user.email "MY_NAME@example.com"`

### Setup Github

If you do not have a [Github](https://github.com/join) account, sign up for one.

Fork this Repository into your own account. If you are unfamiliar with forking please refer to: [Forking a Repository](https://docs.github.com/en/get-started/quickstart/fork-a-repo#forking-a-repository).

After forking this repository, and instantiating it on your machine, create a new branch to work on this assignment. The git command to create a new branch is `git switch -C [NEW_BRANCH_NAME]`.

To switch branches without creating a new one drop the `-C` flag like so `git switch [EXISTING_BRANCH_NAME]`

### NodeJS and NPM

You will need to setup your environment to use the LTS Node 16 version. This should have already been configured during prior classes.
If you do not have it installed please go to [the official NodeJS site](https://nodejs.org/en/) and follow the instructions for your OS. Alternatively you may use [Node Version Manager](https://github.com/nvm-sh/nvm) to install the correct version.

### Code Editor

You may install any editor you wish to install, however my recommendation for this course is to install [Visual Studio Code](https://code.visualstudio.com/) as your code Editor.

### Server-Side Programming and Tools

Create an index.js file that outputs the string `Server-Side Programming and Tools` when run with the command `node index.js`. This file should reside in the assignment1 folder.

### Submission Flow

1. Stage your changes. The CLI commands to stage all files is `git add .`
2. Commit your changes with a descriptive commit message. The CLI command to commit your changes is `git commit -m "[COMMIT_MESSAGE]"`.
3. Go to your fork and [Create a new Pull Request](https://docs.github.com/en/desktop/contributing-and-collaborating-using-github-desktop/working-with-your-remote-repository-on-github-or-github-enterprise/creating-an-issue-or-pull-request#creating-a-pull-request) from your new branch to your forks main branch.
4. Submit a link to your open pull request with the commit id of the latest commit on the course submission platform.
