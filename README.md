# How to run Landlord Lookup
This code has not been successfully run on a Windows machine, but it runs on Macs.

1. Download all project files and folders.
2. Open a terminal window and go to the compsreact folder.
3. Go to https://nodejs.org/en/download/ and download the appropriate version of Node.js for your computer (I use version 12.18.4 for Mac)
4. In terminal, run the line “npm install” in the compsreact directory, then run “npm install react”.
5. Then go back one directory and go into the server-code folder. Run “npm install” here as well. Once that has completed, run “npm install mongodb” in the same directory.
6. Once you have all of the dependencies installed, you can start the local server by running “node comps-server.js” in the server-code directory.
7. Then, open another terminal window and navigate to the compsreact folder. To run the frontend code,simply  type “npm start”. A browser window will open at your localhost port 3000. Port 3000 must be used in order for the Google login API to function properly, so make sure nothing else is running there.

That’s it! Now you can read information about Eagle Rock properties, read and post reviews, and view tenant resources.

