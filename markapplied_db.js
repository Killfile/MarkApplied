
const databaseName = "markapplied"


function _delete_database() {
    console.log("Trying to delete database...")
    let req = indexedDB.deleteDatabase(databaseName);
    req.onsuccess = function () {
        console.log("Deleted database successfully");
    };
    req.onerror = function () {
        console.log("Couldn't delete database");
    };
    req.onblocked = function () {
        console.log("Couldn't delete database due to the operation being blocked");
    };
}
//_delete_database()

console.log("markapplied_db.js starting")
var markapplied_db
var applications_table = "applications"
database_version = 2
DBOpenRequest = window.indexedDB.open(databaseName, database_version);
// Register two event handlers to act on the database being opened successfully, or not
DBOpenRequest.onerror = (event) => {
    console.error("Error loading database.");
};

DBOpenRequest.onsuccess = (event) => {
    console.log("Database initialised.");
    // Store the result of opening the database in the db variable. This is used a lot below
     markapplied_db = DBOpenRequest.result;
     make_fetch_happen()
};

DBOpenRequest.onupgradeneeded = (event) => {
    console.log("Upgrade needed...")
    markapplied_db = event.target.result;

    markapplied_db.onerror = (event) => {
        console.log('Error loading database.');
        markapplied_db.deleteDatabase()
    };

    // Create an objectStore for this database
    let objectStore = markapplied_db.createObjectStore(applications_table, {keyPath: "id"});
    //objectStore.createIndex("id", "id", {unique: true});
    objectStore.createIndex("company", "company", { unique: false});
    objectStore.createIndex("company, title", ["company", "title"], {unique: false});
    objectStore.createIndex("title", "title", {unique: false});

    console.log("Object store created.")
};



function create_transaction(tables,access) {
    console.debug("Creating " + access + " transaction for " + tables)
    transaction = markapplied_db.transaction(tables, access)
    transaction.onerror = (event) => { console.error("Transaction failed: " + event)}
    return transaction
}


/*
  transaction = markapplied_db.transaction([applications_table], "readwrite")
  transaction.oncomplete = (event) => { console.log("Transaction done!")}
  transaction.onerror = (event) => { console.error("Transaction failed")}
  trans_objectStore = transaction.objectStore(applications_table)
  fake_app = {company:"foo",title:"bar",date_applied:"today",link:"url"}
  trans_objectStore.add(fake_app)

    transaction = markapplied_db.transaction([applications_table]);
    objectStore = transaction.objectStore(applications_table);
    request = objectStore.get(1);
    request.onerror = (event) => {
        console.error("Read request failed!")
    };
    request.onsuccess = (event) => {
        console.log(`Found record ${request.result.company}`);
        return request
    };

    console.log(request.result.title)
*/


  
