
module.exports = function(bp) {

  bp.hear(/GET_STARTED|mo|moro|moron|moi|hei/i, (event, next) => {
    event.reply('#welhei')
  })

  bp.hear(/hej/i, (event, next) => {
    event.reply('#welhej')
  })

  bp.hear({ type: 'location' }, (event, next) => {
    event.reply('#where_location', { coordinates: event.raw.payload.coordinates })
  })

}
