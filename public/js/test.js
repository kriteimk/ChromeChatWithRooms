var connection = new RTCMultiConnection();

console.log('try trigger authorization');
navigator.mediaDevices.getUserMedia({ audio: true, video: false })
.then((mediaStream) => { 
    //in promise will be triggered user permission request                
})
.catch((error) => {
   //manage error
});

// this line is VERY_important
connection.socketURL = 'https://localhost:3000/';

// if you want audio+video conferencing
connection.session = {
    audio: true,
    video: true
};

connection.videosContainer = document.getElementById('videos-container');

connection.openOrJoin('your-room-ids');