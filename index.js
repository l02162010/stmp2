const SMTPServer = require('smtp-server').SMTPServer;

const mailServer = new SMTPServer({
  banner: 'hi',
  secure: false,
  logger: true,
  disabledCommands: ['AUTH'],
  onRcptTo(address, session, callback) {
    console.log(address)
    return callback(); // Accept the address
  },
  onData(stream, session, callback) {
    console.log(session)
    console.log(stream)
    stream.pipe(process.stdout);
    stream.on('end', callback);
  }
});
mailServer.on("error", err => {
  console.log("Error %s", err.message);
});
mailServer.listen(25, () => {
  console.log('Listening for mail..');
});