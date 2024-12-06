const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im55eW96c2pudm5iZ2x1ZHBudmp5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc0MTI1MzUsImV4cCI6MjAwMjk4ODUzNX0.tnGcjAMt7dFMrv5Hib0zUb5EgEyayfn5YnSH13LiAUg";
const url = "https://nyyozsjnvnbgludpnvjy.supabase.co";
const database = supabase.createClient(url, key);

const myArray = new Uint32Array(1);
let uID = crypto.getRandomValues(myArray);
id = uID[0];

let signup = document.querySelector("#signup");
var id;
//  Event CRUD operation...
// signup.addEventListener("click", async (e) => {
//     e.preventDefault();
//     let full_name = document.querySelector("#full_name").value;
//     let email = document.querySelector("#email").value;
//     let mobile_number = document.querySelector("#mobile_number").value;
//     let password = document.querySelector("#password").value;
//     let hostel_name = document.querySelector("#hostel_name").value;
//     let hostel_location = document.querySelector("#hostel_location").value;
//     let hostel_thumbnail = document.querySelector("#hostel_thumbnail").files[0];
      

//     // Let's create a function to upload the thumbnail to the database
//     async function thumbnail(file){
//       upload = await database
//       .storage
//       .from('hostel_thumbnail')
//       .upload(`hostel_thumbnail/${new Date().getTime()}/${file.name}`,{
//         cacheControl: '3600',
//         upsert: false,
//         contentType: file.type
//       });
//     };
//     thumbnail(hostel_thumbnail);


//     let success = await database.from('admin').insert({
//         created_at: new Date().toLocaleDateString(),
//         full_name: full_name,
//         email: email,
//         mobile_number: mobile_number,
//         password: password,
//         uID: id,
//         hostel_name,
//         hostel_location,
//         hostel_thumbnail
//     });
//     console.log(id);

    

//     if (success.status == 201) {
//     alert(`Upload successful`);
//     console.log(success);
//     location.replace('../rooms.html');

//     } else {
//         console.error(`Upload failed ${success}`);
//     }

//     localStorage.setItem('id', id);
//     console.log(localStorage.getItem('id'));

//     let admin_ID = uID[0];
//     async function adminID (){
//         const res = await database.from("rooms").select("*").filter("admin", "eq", adminID);
//         console.log(admin_ID);
//     }
//     adminID();
// });

signup.addEventListener("click", async (e) => {
    e.preventDefault();
    
    let full_name = document.querySelector("#full_name").value;
    let email = document.querySelector("#email").value;
    let mobile_number = document.querySelector("#mobile_number").value;
    let password = document.querySelector("#password").value;
    let hostel_name = document.querySelector("#hostel_name").value;
    let hostel_location = document.querySelector("#hostel_location").value;


    let hostel_thumbnail = document.querySelector("#hostel_thumbnail").files[0];
    // Upload the thumbnail to the database
    // Upload the thumbnail to the database
    async function thumbnail(file) {
    try {
      const { data, error } = await database
        .storage
        .from('images/thumbnail')
        .upload(`${file.name}${new Date().getDate().toLocaleString()}`, file, {
          cacheControl: '3600',
          upsert: false,
          contentType: file.type
        });
  
      if (error) {
        console.error('Error uploading thumbnail:', error);
        return null;
      }
  
      console.log(data.path);
  
      // Call the getUrl function here
      await getUrl(file);
      return data;
    } catch (error) {
      console.error('Error during thumbnail upload:', error);
      return null;
    }
  }
  // Let's get the thumbnail URL from the database and log it
  var thumbnail_URL;
  async function getUrl(fileData) {
    try {
      const fileUrl = await database.storage
        .from('images/thumbnail') 
        .getPublicUrl(`${fileData.name}${new Date().getDate().toLocaleString()}`);
  
        thumbnail_URL = fileUrl.data['publicUrl'];
      console.log(thumbnail_URL);

      await insertData();
    } catch (error) {
      console.error('Error getting URL:', error);
    }
  }
  thumbnail(hostel_thumbnail);

    // Insert user data into the database
  async function insertData() {
    let { data: success, error } = await database.from('admin').insert({
        created_at: new Date().toLocaleDateString(),
        full_name: full_name,
        email: email,
        mobile_number: mobile_number,
        password: password,
        uID: id, 
        hostel_name: hostel_name,
        hostel_location: hostel_location,
        hostel_thumbnail: thumbnail_URL
      });
    
      if (error) {
        console.error('Error inserting data:', error);
      } else {
        alert(`Registration successful`);

        console.log('Data inserted successfully:', success);
        console.log('ID:', id);
        
        localStorage.setItem('id', id);
        console.log(localStorage.getItem('id'));
    
        let admin_ID = uID[0];
        async function adminID (){
            const res = await database.from("rooms").select("*").filter("admin", "eq", adminID);
            console.log(admin_ID);
        }
        adminID();

        location.replace('dashboard.html');
    }
  }
  
});
  
