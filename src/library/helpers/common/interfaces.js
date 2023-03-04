export function programsPreparation(data) {
    let _data = data.filter(
      item => item.program !== null && typeof item.program_data !== null
    )
    _data = _data.map(function(item) {
      if (
        typeof item.program == 'undefined' &&
        typeof item.program_data == 'undefined' &&
        (typeof item.individual == 'undefined' || !item.individual)
      ) {
        item.id = item.pk
        return item
      }

      let _item = JSON.parse(JSON.stringify(item))
      if (typeof item.program == 'undefined' || item.program == null) {
        _item = { ..._item, ...item.program_data }
      } else {
        _item = { ..._item, ...item.program }
      }
      if (item.recommended_by) {
        _item.recommended_by = item.recommended_by
      }
      if (item.end_date) {
        _item.end_date = item.end_date
      }
      if (item.start_date) {
        _item.start_date = item.start_date
      }
      if (item.individual) {
        _item = { ..._item, ...item.individual }
      }
      if (item.pk) {
        _item.id = item.pk
        _item.pk = item.pk
      }
      return _item
    })
    return _data
  }