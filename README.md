# cs348-project


## Instructions to set up the project
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

With the virtual environment activated, you can now install the requried python packages from the `requirements.txt` file. 

Run the command `pip3 install -r requirements.txt`

To simplify the commands, you can navigate to the /app folder and run the backend using the command below. 

```
npm run start-api
```

If you see Hello from the API on `http://localhost:3000/`, then you have set up the backend correctly. 

Database support coming shortly. 
