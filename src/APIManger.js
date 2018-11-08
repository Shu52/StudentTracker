const ApiManager = Object.create({},{

    postUser: {
        value: (theObject) => {
          return fetch("https://nss-student-tracker.herokuapp.com/users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(theObject)
          });
        }
      },//end of postUser
      getAll: {
        value: collectionName => {
          return fetch(`https://nss-student-tracker.herokuapp.com/${collectionName}`).then(e =>
            e.json()
          );
        }
      },//end of getAll
      patchItem: {
        value: (collectionName, itemId, theObject) => {
          return fetch(`https://nss-student-tracker.herokuapp.com/${collectionName}/${itemId}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(theObject)
          });
        }
      },//end of patch
      getOne: {
        value: (collectionName,itemId) => {
          return fetch(`https://nss-student-tracker.herokuapp.com/${collectionName}/${itemId}`).then(e =>
            e.json()
          );
        }
      },
      checkOne: {
        value: (collectionAndJsonSyntax) => {
          return fetch(`https://nss-student-tracker.herokuapp.com/${collectionAndJsonSyntax}`).then(e =>
            e.json()
          );
        }
      },
      postStudentExercises: {
        value: (theObject) => {
          return fetch("https://nss-student-tracker.herokuapp.com/studentExercises", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(theObject)
          }).then(e=>e.json())
        }
      },//end of post studentExercises
      patchFeedback: {
        value: (route, theObject) => {
          return fetch(`https://nss-student-tracker.herokuapp.com/${route}`,
          {
            
            method: "PATCH",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(theObject)
          });
        }
      },//end of patch
      getOneRoute: {
        value: (route) => {
          return fetch(`https://nss-student-tracker.herokuapp.com/${route}`).then(e =>
            e.json()
          );
        }
      },
    })//end of object.create
    export default ApiManager;
