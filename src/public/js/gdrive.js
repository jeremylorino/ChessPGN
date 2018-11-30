// Drive API information needed to identify this app.
const CLIENT_ID =
  '180270745064-uj38u8bmndd27vb5ibf9go6resrjumre.apps.googleusercontent.com';
// Rui3XAYj0C1wvSFqS3yCg9hf
const SCOPES = [
  'https://www.googleapis.com/auth/drive.file',
  'https://www.googleapis.com/auth/drive.install',
  'https://www.googleapis.com/auth/userinfo.profile'
];
const API_KEY = 'AIzaSyD0CvxmJxBCk69o-DEGX8hT7Anm81bRB1U';

function start() {
  // 2. Initialize the JavaScript client library.
  gapi.client
    .init({
      apiKey: API_KEY,
      // Your API key will be automatically added to the Discovery Document URLs.
      discoveryDocs: [
        'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'
      ],
      // clientId and scope are optional if auth is not required.
      clientId: CLIENT_ID,
      scope: SCOPES.join(' ')
    })
    .then(function(a) {
      try {
        start_drive();
      } catch (err) {
        console.error(err);
      }
    })
    .catch(console.error);
}
function handleClientLoad() {
  // Load the API client and auth2 library
  gapi.load('client:auth2', start);
}

// Accept the JSON state variable that is passed along by Google Drive when opening a PGN file
function start_drive() {
  var fileID = null;
  thisRegExp = /(&|\?)(state)=([^&]*)(&|$)/i;
  if (thisParamString.match(thisRegExp) !== null) {
    var stateJSON = unescape(thisParamString.match(thisRegExp)[3]);
    fileID = JSON.parse(stateJSON).ids[0];
  }

  // getAuth(pgnDrive);

  var driveData = { pgnDrive: fileID };
  // var handleRes = handleAuthResult.bind(driveData);

  var loadPgn = getPgn.bind(driveData);
  loadPgn();
}

// Check if we have authorization to the user's Drive account to retrieve the PGN file
// If not, call ask the user for authorization to do so.
// Generally, we only need to ask the user the very first time they access the app.
function getAuth(fileID) {
  var driveData = { pgnDrive: fileID };
  var handleRes = handleAuthResult.bind(driveData);
  // gapi.auth2.authorize(
  //   { client_id: CLIENT_ID, scope: SCOPES, immediate: true },
  //   handleRes
  // );
  handleRes(true);
}

// Called by getAuth to handle the result of checking for authorization,
// asking the user if we don't already have it.
function handleAuthResult(authResult) {
  if (!authResult || authResult.error) {
    // var handleRes = handleAuthResult.bind(this);
    // gapi.auth.authorize(
    //   { client_id: CLIENT_ID, scope: SCOPES, immediate: false },
    //   handleRes
    // );
  } else {
    var loadPgn = getPgn.bind(this);
    // gapi.client.load('drive', 'v3', loadPgn);
    loadPgn();
  }
}
