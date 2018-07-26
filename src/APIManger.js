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
      }//end of postStudent

    })//end of object.create
    export default ApiManager;
