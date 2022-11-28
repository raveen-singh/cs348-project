# cs348-project

## Instructions for running the backend and frontend

If using powershell:
```
cd app; npm install; npm start; cd ../api; venv/Scripts/activate; pip install -r requirements.txt; ./mysql.exe -uroot -p (run setup files); flask run;
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

If you are using windows, make sure to install mysql from this link. Make sure to setup a root without a password. This will make the db setup a lot easier. Once installed, add the bin folder from installation as a PATH variable C:\Program Files\MySQL\MySQL Server 8.0\bin.

Then you need to log into the running instance of mySQL by running `mysql -u root -p`. There should be no password required for the root user, so press enter when prompted on the next line.

If you already had MySQL setup from before and added a password, you can easily change the password from the MySQL terminal as follows:
```SQL
mysql -u root -p
ALTER USER 'root'@'localhost' IDENTIFIED BY '';
FLUSH PRIVILEGES;
```
You can change 'root'@'localhost' if your user is named differently.

If you see `mysql>` on the next line, you have successfully connected. While connected, run the following setup scripts in /api:
```
source cleanup_tables.sql
source create_tables.sql
```

Run the following line in mysql to load the sample dataset:
`source populate_tables.sql`

Run the following line in mysql to load the production dataset:
`source production_data.sql`

If there are no errors, navigate to `http://localhost:3000` (assuming the frontend/backend are running). If you see cs348db connected below the first message, you have set up the database correctly. 

### Implemented features
---
The backend is all under `api/app.py`.

The frontend is all located under the `app` folder
1. Registration - `app/src/components/Register`
2. Posting units - `app/src/components/UnitForm`
3. Reviews - `app/src/components/ReviewCard`, `app/src/components/ReviewForm`
4. Viewing units with sort and filter - `app/src/components/BuildingList`
5. Viewing reviews with sort and filter - `app/src/components/ReviewList`
