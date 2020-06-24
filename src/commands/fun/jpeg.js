const Command = require('../../classes/Command')

module.exports = new Command(async msg => {
  const jimp = require('jimp')
  if (!msg.attachments[0]) return msg.channel.createMessage('Please upload an image while using this command')
  try {
    const image = await jimp.read(msg.attachments[0].url)
    const buffer = await image.quality(1).getBufferAsync(jimp.MIME_JPEG)
    await msg.channel.createMessage('', {
      file: buffer,
      name: 'needsmore.jpg'
    })
  } catch (e) {
    logger.error(e)
    msg.channel.createMessage('Something went terribly wrong!')
  }
}, {
  clientPerms: {
    channel: ['attachFiles']
  }
})