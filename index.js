const SMTPServer = require('smtp-server').SMTPServer;

const mailServer = new SMTPServer({
  authOptional: true,
  secure: false,
  disabledCommands: ['AUTH', 'STARTTLS'],
  onData(stream, session, callback) {
    stream.pipe(process.stdout);
    stream.on('end', callback);
  }
});

mailServer.listen(25, () => {
  console.log('Listening for mail..');
});