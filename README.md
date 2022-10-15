# cs348-project

## Instructions for running the backend and frontend

If using powershell:
```
cd app; npm install; npm start; cd ../api; venv/Scripts/activate; flask run;
```

## Instructions to set up the project for the first time
---
Make sure you have node installed on your computer before attemping to set u this repo. `node -v` can be used to verify if you have a working version.

Also make sure you have python3 installed to run the backend. This can be verified by running `python3 --version`.


### Frontend
---
```
cd app
npm install
npm start
```

Navigate to `localhost:3000` where you should see a welcome screen.

### Backend
---
You need to activate a virtual environment to install python packages. Navigate to the `/api` folder and run the commands below. 

If you are on a mac, use these two commands
```
python3 -m venv venv 
source venv/bin/activate
```

For windows, use the commands below.
```
python -m venv venv
venv\Scripts\activate
```

If the above command errors on windows, try the following:
```
python -m venv venv
cd venv/Scripts
./activate
```

With the virtual environment activated, you can now install the requried python packages from the `requirements.txt` file. 

Run the command `pip3 install -r requirements.txt`

To simplify the commands, you can navigate to the /app folder and run the backend using the command below. 

```
npm run start-api
```

If the above errors on windows, then navigate to the /api folder and use the following command.
```
flask run
```

If you see Hello from the API on `http://localhost:3000/`, then you have set up the backend correctly. 

### Database
---
Setting up the DB will be tricky, as the instructions are different based on the machine.

Make sure all packages installed locally are up to date. (Refresh python packages with pip from requirements.txt). If you are getting errors from a package that requires SQL (mysqlclient, etc), please install SQL first.

Firstly, you will need to install MySQL on your computer.`

If you are using a mac, you can use homebrew
```
brew install mysql
```
Make sure that a mysql instance is running by running the command `brew services start mysql`.

For windows, I have no way to test how to start the mySQL instance locally, but you can start [here](https://github.com/PyMySQL/mysqlclient#install) and update this README when you test the install yourself. Two things I've seen mentioned are XAMPP or PHPMyAdmin to start the mySQL db from.

Then you need to log into the running instance of mySQL by running `mysql -u root -p`. There should be no password required for the root user, so press enter when prompted on the next line.

If you see `mysql>` on the next line, you have sucesfully connected. Run the `setup.sql` script by running `source setup.sql` while connected. If there are no errors, navigate to `http://localhost:3000` (assuming the frontend/backend are running). If you see cs348db connected below the first message, you have set up the database correctly. 