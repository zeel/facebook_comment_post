import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:3000');

function subscribeToFeed(cb) {
    socket.on('feed', cb);
    socket.emit('subscribeToFeed');
}
function publishPost(post) {
    socket.emit('publishPost', post);
}
function signUp(profile) {
    socket.emit('signUp', profile);
}
export { subscribeToFeed, publishPost, signUp };