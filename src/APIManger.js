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
    })//end of object.create
    export default ApiManager;
