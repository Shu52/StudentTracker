const ApiManager = Object.create({},{

    postStudent: {
        value: (theObject) => {
          return fetch("http://localhost:5002/students", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(theObject)
          });
        }
      },//end of postStudent
      getAll: {
        value: collectionName => {
          return fetch(`http://localhost:5002/${collectionName}`).then(e =>
            e.json()
          );
        }
      },//end of getAll
      patchItem: {
        value: (collectionName, itemId, theObject) => {
          return fetch(`http://localhost:5002/${collectionName}/${itemId}`, {
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
          return fetch(`http://localhost:5002/${collectionName}/${itemId}`).then(e =>
            e.json()
          );
        }
      },
      checkOne: {
        value: (collectionAndJsonSyntax) => {
          return fetch(`http://localhost:5002/${collectionAndJsonSyntax}`).then(e =>
            e.json()
          );
        }
      },
      postStudentExercises: {
        value: (theObject) => {
          return fetch("http://localhost:5002/studentExercises", {
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
          return fetch(`http://localhost:5002/${route}`,
          {
            // http://localhost:5002/studentExercises?studentId=3&exerciseId=1
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
          return fetch(`http://localhost:5002/${route}`).then(e =>
            e.json()
          );
        }
      },
    })//end of object.create
    export default ApiManager;
