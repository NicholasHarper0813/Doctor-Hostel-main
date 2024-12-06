const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im55eW96c2pudm5iZ2x1ZHBudmp5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc0MTI1MzUsImV4cCI6MjAwMjk4ODUzNX0.tnGcjAMt7dFMrv5Hib0zUb5EgEyayfn5YnSH13LiAUg";
const url = "https://nyyozsjnvnbgludpnvjy.supabase.co";
const database = supabase.createClient(url, key);

const myArray = new Uint32Array(1);
let uID = crypto.getRandomValues(myArray);
id = uID[0];

let login = document.querySelector("#signin");
var id;
var admin_name;
var admin_profile;
//  Event CRUD operation...
login.addEventListener("click", async (e) => {
    e.preventDefault();
    let email = document.querySelector("#email").value;
    let password = document.querySelector("#password").value;
    // let admin_name = document.querySelector("#admin");

    let success = await database.from("admin")
    .select("*")
    .filter("email", "eq", email)
    .filter("password", "eq", password);    

    if (success.data.length > 0) {

        id = success.data[0]['uID'];
        admin_name = success.data[0]['full_name'];
        admin_profile = success.data[0]['hostel_thumbnail'];
        alert(`Login successful`);
        console.log(id);
        console.log(admin_name);
        console.log(admin_profile);

        location.replace('dashboard.html');
  
    } else {
        alert(`Login failed`);
        console.error(`Login failed ${success}`);
    }

    localStorage.setItem('id', id);
    localStorage.setItem('admin', admin_name);
    localStorage.setItem('adminProfile', admin_profile);
    // console.log(localStorage.getItem('id'));

    let admin_ID = uID[0];
    async function adminID (){
        const res = await database.from("rooms").select("*").filter("admin", "eq", adminID);
        console.log(admin_ID);
    }
    adminID();
});
