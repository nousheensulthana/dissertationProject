This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Steps for BTP setup
1. Add MongoDB entitlement
2. Assign mongoDB entitlement to subaccount
3. Add Cloud Foundry Runtime Memory
4. Switch to your API endpoint
    ### `cf api https://api.cf.eu12.hana.ondemand.com`
    **Note: Enter the endpoint corresponding to you sbaccount**
5. Login to your BTP account
    ### `cf login`
    **Note: when entering password, append TOTP**
6. Select subacount and space
7. Make sure you are in the root folder of the project
8. To create XSUAA service
    ### `cf create-service xsuaa application jira-dashboard-xsuaa -c security/xs-security.json`
9. Deploy the rest of the app and approuter
    ### `cf push`

## Steps for starting up local dev setup
1. Create .env file with following details:
    JIRA_USER
    JIRA_PASSWORD
2. Install MongoDB using the normal exe installer.
3. Run mongodb server:
    ### `mongod --port 27017 --dbpath C:\MongoDB\data\db`
4. Ensure mongodb service is running
    a. Control Panel->Administrative Tools->Services->MongoDB
5. Run the UI and server separately for dev. Requests from UI to server are proxied to server port 8080(default).
    ### `npm run start`


## VM Specific steps (optional)
1. Set up NSSM - to run the taskboard as a service  (not required anymore after BTP deployment)
    a. Download Featured pre-release from: https://nssm.cc/download
    b. Rename and place the NSSM folder in C: drive
    c. Create a Service for your Nodejs Application
        1. Open cmd here as admin
        2. Run: cd C:\nssm\win64
        3. Run: nssm install jira-taskboard "D:\Program Files\nodejs\node.exe"  // change path in case node installed eslewhere
        4. Run: nssm set jira-taskboard AppDirectory "D:\SAPDevelop\jira-automation"
        5. Run: nssm set jira-taskboard AppParameters server\server.js
        6. Run: nssm.exe set jira-taskboard AppStdout "D:\log\service-output.log"
        7. Run: nssm start jira-taskboard
        8. Optional: nssm remove SERVICE_NAME
    d. Jira-taskboard app will now run as a background Windows service.
    e. Can check this link for referrence: https://www.helpmegeek.com/run-nodejs-application-as-windows-service/
    f.To update code:
        i. Run: npm run build-prod   // this will build the files and copy to the server which serves the static files
        ii. No need to restart service. On build completion, site is automatically updated (only for UI changes).
<!--
## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

### Jira Client used in HANA Tooling
https://github.wdf.sap.corp/hana-tooling/cloud-config/blob/36912832913b48dd97c6ac32e059a1e757e70118/scripts/jira-validator.js -->
