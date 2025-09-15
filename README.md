To run the application:
1. Download this folder as zip
2. unzip and open folder in vscode
3. install node modules by typing "npm i" on both frontend and backend folder in terminal
4. to run frontend -- npm run dev
5. to run backend -- npm start

Steps to Discard Local Commit and Sync with Remote

Ensure you're on the correct branch (e.g., main)

git checkout main


Fetch the latest data from the remote repo

git fetch origin


Reset your local branch to match the remote (origin/main)

git reset --hard origin/main


This discards all local commits and sets your branch to exactly match the remote one.

All uncommitted changes will also be lost. 