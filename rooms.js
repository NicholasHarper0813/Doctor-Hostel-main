const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im55eW96c2pudm5iZ2x1ZHBudmp5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc0MTI1MzUsImV4cCI6MjAwMjk4ODUzNX0.tnGcjAMt7dFMrv5Hib0zUb5EgEyayfn5YnSH13LiAUg";

const url = "https://nyyozsjnvnbgludpnvjy.supabase.co";

const database = supabase.createClient(url, key);
    // Logout button redirection
    let logoutButton = document.getElementById("log-out");
    logoutButton.addEventListener("click", () => {
        window.localStorage.clear();
        location.replace('index.html');
    });

    let admin_ID = localStorage.getItem("id");
    let admin_n = localStorage.getItem("admin");
    let admin_profile = localStorage.getItem("adminProfile");
    console.log(admin_ID);
    console.log(admin_n);
    console.log(admin_profile);
   
    // Check if the admin uID exists, if no, redirect to login page else continue
    if (!admin_ID) {
        location.replace("index.html");
    } else {

        let admin_ = document.getElementById("adminName").innerHTML = admin_n;
        let adminProfile = document.getElementById("adminProfile");
        adminProfile.innerHTML = `<img src = "${admin_profile}"></img>`;

        // A simple query to get the total number of rooms in the room table....
        const getTotalCount = async () => {
            let totalRooms = document.getElementById("totalRooms");
            const res = await database
            .from("rooms")
            .select("*", { count: "exact" })
            .filter("admin", "eq", admin_ID);
            totalRooms.innerText = res.data.length;
        }
        getTotalCount();
    // Total rooms CRUD operation...

    // Let's retrieve the total number of available rooms in the database
    const getAvailableRooms = async () => {
        let availableRooms = document.getElementById("availableRooms");
        const res = await database
        .from("rooms")
        .select("*")
        .filter("admin", "eq", admin_ID)
        .filter("room_status", "eq", true);
        availableRooms.innerText = res.data.length;
    }
    getAvailableRooms();
    // Available rooms CRUD operation...

    // Let's retrieve the total number of booked rooms in the database
    const getTotalBookedRooms = async () => {
        let bookedRooms = document.getElementById("bookedRooms");
        const res = await database
        .from("rooms")
        .select("*")
        .filter("admin", "eq", admin_ID)
        .filter("room_status", "eq", false);
        bookedRooms.innerText = res.data.length;
    }
    getTotalBookedRooms();
    // Booked rooms CRUD operation...
    // Let's retrieve the total income made on booked rooms
    let totalBookedRoomsPrice = 0;
    const getTotalIncome = async () => {
        let totalIncome = document.getElementById("totalIncome");
        const res = await database
        .from("rooms")
        .select("room_price")
        .filter("admin", "eq", admin_ID)
        .filter("room_status", "eq", false);
        for (const key in res.data) {
            if (res.data.hasOwnProperty.call(res.data, key)) {
                const element = res.data[key];
                totalBookedRoomsPrice += element['room_price'];
                console.log(element);
                totalIncome.innerText = `Ghc ${totalBookedRoomsPrice}`;
            }
        }
    }
    getTotalIncome();
    // Booked rooms total income CRUD operation...

    // Let's retrieve the total all the admin's rooms
    const getRooms = async () => {

        let dateAddedDiv = document.getElementById('dateAdded');
        let roomNameDiv = document.getElementById('roomName');
        let roomTypeDiv = document.getElementById('roomType');
        let roomPriceDiv = document.getElementById('roomPrice');

        const res = await database
        .from("rooms")
        .select("*")
        .filter("admin", "eq", admin_ID)

        let dateList = "";
        let nameList = "";
        let typeList = "";
        let priceList = "";
        let statusList = "";
        for (var i in res.data){
            console.log(i);
            dateList += 
            `<ul> 
                <li>${res.data[i]['created_at']}</li>
            </ul>`

            nameList += 
            `<ul> 
                <li>${res.data[i]['room_name']}</li>
            </ul>`

            typeList += 
            `<ul> 
                <li>${res.data[i]['room_type']}</li>
            </ul>`

            priceList += 
            `<ul> 
                <li>Ghc ${res.data[i]['room_price']}</li>
            </ul>`

            statusList += 
            `<ul> 
                <li>${res.data[i]['room_status']}</li>
            </ul>`
        }

        dateAddedDiv.innerHTML = dateList;
        roomNameDiv.innerHTML = nameList;
        roomTypeDiv.innerHTML = typeList;
        roomPriceDiv.innerHTML = priceList;
    }
    getRooms();
    // All admin rooms CRUD operation...


    // Let's retrieve all the admin's rooms
    const getTenantList = async () => {

        let tenantNameDiv = document.getElementById('all-tenants-name');
        let tenantEmailDiv = document.getElementById('all-tenants-email');
        let tenantContactDiv = document.getElementById('all-tenants-contact');
        let tenantBookedDiv = document.getElementById('all-tenants-booked');
        let tenantBookedDateDiv = document.getElementById('all-tenants-booked-date');
        let tenantBookedRoomNameDiv = document.getElementById('all-tenants-booked-room-name');
        let tenantBookedRoomTypeDiv = document.getElementById('all-tenants-booked-room-type');
        let tenantBookedRoomPriceDiv = document.getElementById('all-tenants-booked-room-price');


        const res = await database
        .from("rooms")
        .select("*")
        .filter("admin", "eq", admin_ID)

        let tenantNameList = "";
        let tenantEmailList = "";
        let tenantContactList = "";
        let tenantBookedRoomList = "";
        let statusList = "";
        let tenantBookedRoomDateList = "";
        let tenantBookedRoomNameList = "";
        let tenantBookedRoomTypeList = "";
        let tenantBookedRoomPriceList = "";
        for (var i in res.data){
            console.log(i);
            tenantNameList += 
            `<ul> 
                <li>${res.data[i]['created_at']}</li>
            </ul>`

            tenantEmailList += 
            `<ul> 
                <li>${res.data[i]['room_name']}</li>
            </ul>`

            tenantContactList += 
            `<ul> 
                <li>${res.data[i]['room_type']}</li>
            </ul>`

            tenantBookedRoomList += 
            `<ul> 
                <li>Ghc ${res.data[i]['room_price']}</li>
            </ul>`

            statusList += 
            `<ul> 
                <li>${res.data[i]['room_status']}</li>
            </ul>`

            tenantBookedRoomDateList += 
            `<ul> 
                <li>${res.data[i]['room_status']}</li>
            </ul>`

            tenantBookedRoomNameList += 
            `<ul> 
                <li>${res.data[i]['room_status']}</li>
            </ul>`

            tenantBookedRoomTypeList += 
            `<ul> 
                <li>${res.data[i]['room_status']}</li>
            </ul>`

            tenantBookedRoomPriceList += 
            `<ul> 
                <li>${res.data[i]['room_status']}</li>
            </ul>`
        }

        // tenantNameDiv.innerHTML = tenantNameList;
        // tenantEmailDiv.innerHTML = tenantEmailList;
        // tenantContactDiv.innerHTML = tenantContactList;
        // tenantBookedDiv.innerHTML = tenantBookedRoomList;
        // tenantBookedDateDiv.innerHTML = tenantBookedRoomDateList;
        // tenantBookedRoomNameDiv.innerHTML = tenantBookedRoomNameList;
        // tenantBookedRoomTypeDiv.innerHTML = tenantBookedRoomTypeList;
        // tenantBookedRoomPriceDiv.innerHTML = tenantBookedRoomPriceList;
    }
    getTenantList();
    // All admin rooms CRUD operation...

   
   
   
    // Let's retrieve the all the admin's rooms in the All-Rooms section
    const getAllRooms = async () => {

        let dateAddedDiv = document.getElementById('all-rooms-added');
        let roomNameDiv = document.getElementById('all-rooms-name');
        let roomTypeDiv = document.getElementById('all-rooms-type');
        let roomPriceDiv = document.getElementById('all-rooms-price');
        let roomStatusDiv = document.getElementById('all-rooms-status');
        let roomUpdateDiv = document.getElementById('all-rooms-update');
        let roomDeleteDiv = document.getElementById('all-rooms-delete');

        const res = await database
        .from("rooms")
        .select("*")
        .filter("admin", "eq", admin_ID)

        let vacant = "Vacant";
        let booked = "Booked";

        let dateList = "";
        let nameList = "";
        let typeList = "";
        let priceList = "";
        let statusList = "";
        let updateList = "";
        let deleteList = "";
        for (var i in res.data){
            console.log(i);
            dateList += 
            `<ul> 
                <li>${res.data[i]['created_at']}</li>
            </ul>`

            nameList += 
            `<ul> 
                <li>${res.data[i]['room_name']}</li>
            </ul>`

            typeList += 
            `<ul> 
                <li>${res.data[i]['room_type']}</li>
            </ul>`

            priceList += 
            `<ul> 
                <li>Ghc ${res.data[i]['room_price']}</li>
            </ul>`

            // An if-else block to check if the room status is true or false
            const statusText = res.data[i]['room_status'] ? `<div 
                                                                style="background-color: green;
                                                                    display: flex;
                                                                    align-items: center;
                                                                    justify-content: center;
                                                                    color: white;
                                                                    border-radius: 2px;
                                                                ">${vacant}
                                                        </div>` : `<div
                                                                    style="background-color: orange;
                                                                        display: flex;
                                                                        align-items: center;
                                                                        justify-content: center;
                                                                        color: white;
                                                                        border-radius: 2px;
                                                                    ">${booked}
                                                                </div>`;
            statusList += 
            `<ul>
                <li>${statusText}</li>
            </ul>`
                                                                    

            

            updateList += 
            `<ul> 
                <li>
                    <div
                    onclick='editRoom(${res.data[i].room_id})' 
                    data-bs-target="#editModel"

                        style="background-color: #66b0ff;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            color: white;
                            border-radius: 2px;
                            cursor: pointer;
                        ">Update
                    </div>
                </li>
            </ul>`

            deleteList += 
            `<ul> 
                <li>
                    <div
                        onclick='deleteRoom(${res.data[i].room_id})'

                        style="background-color: red;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            color: white;
                            border-radius: 2px;
                            cursor: pointer;
                            
                        ">Delete
                    </div>
                </li>
            </ul>`
            
        }

        dateAddedDiv.innerHTML = dateList;
        roomNameDiv.innerHTML = nameList;
        roomTypeDiv.innerHTML = typeList;
        roomPriceDiv.innerHTML = priceList;
        roomStatusDiv.innerHTML = statusList;
        roomUpdateDiv.innerHTML = updateList;
        roomDeleteDiv.innerHTML = deleteList;
    }
    getAllRooms();
    // All admin rooms CRUD operation...

    // Let's retrieve the total all the admin's rooms
    const getRecentRooms = async () => {

        let recentRooms = document.getElementById('recentRooms');

        const res = await database
        .from("rooms")
        .select("*")
        .filter("admin", "eq", admin_ID)

        let recentRoomsList = "";
        for (var i in res.data){
            console.log(i);
            recentRoomsList += 
            `<ul 
            style = "display: flex;
                gap: 3%"> 

                <img src="${res.data[i]['room_photos'][0]}" 
                style = "
                    height: 60px;
                    width: 60px;
                    object-fit: cover;
                    border-radius: 12px;
                    margin: 1%;
                    background: #333;
                "></img>

                <li>${res.data[i]['room_name']}</li>
                <li 
                style = "margin-left: 5%;   
                        font-size: 17px;
                        font-weight: 400;
                        color: #333;
                ">Ghc${res.data[i]['room_price']}</li>
            </ul>`
        }

        recentRooms.innerHTML = recentRoomsList;
    }
    getRecentRooms();
    // All admin rooms CRUD operation...


    let admin_name = document.getElementById("#admin_name");
    let save_room = document.querySelector("#save-room");
    save_room.addEventListener("click", async (e) =>{
        e.preventDefault();
        let room_id;
        let room_name = document.querySelector('#room-name').value;
        let room_type = document.querySelector('#room-type').value;
        let room_address = document.querySelector('#room-address').value;
        let room_price = document.querySelector('#room-price').value;

        let room_amenities_text_1 = document.querySelector('#room-amenities-text-1').value;
        let room_amenities_text_2 = document.querySelector('#room-amenities-text-2').value;
        let room_amenities_text_3 = document.querySelector('#room-amenities-text-3').value;
        /*---------------------------------Let's create an array for the room photos---------------------------*/
        // const room_amenities_text_array = [ room_amenities_text_1, room_amenities_text_2, room_amenities_text_3 ];


        let room_photos_1 = document.querySelector('#room-photos-0').files[0];
        let room_photos_2 = document.querySelector('#room-photos-1').files[0];
        let room_photos_3 = document.querySelector('#room-photos-2').files[0];
        /*---------------------------------Let's create an array for the room photos---------------------------*/
        const room_photos_array = [ room_photos_1, room_photos_2, room_photos_3 ];

        // let room_status = document.querySelector('#room-status').value;
        let room_rating = document.querySelector('#room-rating').value;
        let room_description = document.querySelector('#room-description').value;

        let room_amenities_image_1 = document.querySelector('#room-amenities-image-1').files[0];
        let room_amenities_image_2 = document.querySelector('#room-amenities-image-2').files[0];
        let room_amenities_image_3 = document.querySelector('#room-amenities-image-3').files[0];
        /*---------------------------------Let's create an array for the room amenity images--------------------*/
        const image_array = [ room_amenities_image_1, room_amenities_image_2, room_amenities_image_3 ];

        let room_phone_call = document.querySelector('#room-phone-call').value;
        let room_lat = document.querySelector('#room-lat').value;
        let room_long = document.querySelector('#room-long').value;
        //*****************************************************************************************/



        /*----------------Let's create a funtion to upload the room photos to the SUPABASE DATABASE--------------*/
        async function uploadRoomFiles(files) {
            for (const file of files) {
            const { data, error } = await database
                .storage
                .from('images')
                .upload(`room_photos/${file.name}`, file, {
                cacheControl: '3600',
                upsert: false,
                contentType: file.type,
                });
                if (error) {
                    console.error('Error uploading file:', error);
                } else {
                    console.log('File uploaded successfully:', data);
                }
            }
        }
        uploadRoomFiles(room_photos_array);
        console.log(room_photos_array);

        var room_photo_url_1, room_photo_url_2, room_photo_url_3;
        async function getPhotoUrl(fileUrl){
            let room_photo_url_urlArray = [];
            
            for (const file of fileUrl) {
                const imageUrl = database.storage
                .from('images') // Specify the bucket name
                .getPublicUrl(`room_photos/${file.name}`); 
                room_photo_url_urlArray.push(imageUrl.data.publicUrl); // Output the image URL
            }
            [room_photo_url_1, room_photo_url_2, room_photo_url_3] = room_photo_url_urlArray;
        }
        getPhotoUrl(room_photos_array); 
        // let room_photo_url_url = [room_photo_url_1, room_photo_url_2, room_photo_url_3];
        console.log([room_photo_url_1, room_photo_url_2, room_photo_url_3]);

        //*****************************************************************************************/
        //*****************************************************************************************/

        /*----------------Let's create a funtion to upload the room_amenity images to the SUPABASE DATABASE--------------*/
        async function uploadFiles(files) {
            for (const file of files) {
            const { data, error } = await database
                .storage
                .from('images')
                .upload(`room_amenity_images/${file.name}`, file, {
                cacheControl: '3600',
                upsert: false,
                contentType: file.type,
                });
            
            if (error) {
                console.error('Error uploading file:', error);
            } else {
                console.log('File uploaded successfully:', data);
            }
            }
        }

        uploadFiles(image_array);
        console.log(image_array);

        var url1, url2, url3;
        async function getUrl(fileUrl){
            let urlArray = [];
            for (const file of fileUrl) {
                const imageUrl = database.storage
                .from('images') // Specify the bucket name
                .getPublicUrl(`room_amenity_images/${file.name}`); // Replace 'file_name.jpg' with the actual file name
                urlArray.push(imageUrl.data.publicUrl); // Output the image URL
            }
            [url1, url2, url3] = urlArray;
        }
        getUrl(image_array); 
        // let room_amenities_image_url = [url1, url2, url3];
        console.log([url1, url2, url3]);
            
        //*****************************************************************************************/
        //*****************************************************************************************/


        //*****************************************************************************************/
        /*                     Let's save the roo details into the supabase database server       */
        //*****************************************************************************************/
        save_room.innerText = 'Saving...';
        save_room.setAttribute('disabeled', true);
        let res = await database.from('rooms').insert({
            room_id,
            created_at: new Date().toLocaleDateString(),
            room_name: room_name,
            room_type: room_type,
            room_address: room_address,
            room_price: room_price,
            room_amenities_text: [ room_amenities_text_1, room_amenities_text_2, room_amenities_text_3 ], //This array contains the three amenities of the room
            room_photos: [room_photo_url_1, room_photo_url_2, room_photo_url_3], //Newly created to receive the image links from the server...
            room_status: true,
            room_rating: room_rating,
            room_description: room_description,
            room_amenities_image: [url1, url2, url3], //This is used to get the image url from the server redponse...
            room_phone_call: room_phone_call,
            room_lat: room_lat,
            room_long: room_long,
            admin: admin_ID,
        })
        if (res) {
            alert(`${room_name} successfully added!`)
            window.location.reload();
        }
        console.log(`This forms the added room resource: ${res.data}`);
        //*****************************************************************************************/
        //*****************************************************************************************/
        

        //*****************************************************************************************/
        /*                           Let's retrieve and display the uploaded data                 */
        //*****************************************************************************************/
    });

    }

    


