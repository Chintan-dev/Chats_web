localStorage.clear();

// localStorage.removeItem("first_name")

// localStorage.setItem(key, value) stores the value associated with a key.
// localStorage.getItem(key) retrieves the value associated with the key.



// Local storage — The local storage uses the localStorage object to store data for your entire website on a permanent basis.That means the stored local data will be available on the next day, the next week, or the next year unless you remove it.
// Session storage — The session storage uses the sessionStorage object to store data on a temporary basis, for a single browser window or tab.The data disappears when session ends i.e.when the user closes that browser window or tab.

// Check if the sessionStorage object exists


// if (sessionStorage) {
//           // Store data
//           sessionStorage.setItem("last_name", "Parker");

//           // Retrieve data
//           alert("Hi, " + localStorage.getItem("first_name") + " " + sessionStorage.getItem("last_name"));
// } else {
//           alert("Sorry, your browser do not support session storage.");
// }


          // Store data
          // localStorage.setItem("first_name", "Peter");

          // Retrieve data
          //alert("Hi, " + localStorage.getItem("first_name"));