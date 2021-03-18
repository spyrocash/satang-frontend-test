import numeral from 'numeral'

export const loadNumeralRegister = () => {
  // load a locale
  if (numeral.locales['th'] === undefined) {
    numeral.register('locale', 'th', {
      delimiters: {
        thousands: ',',
        decimal: '.',
      },
      abbreviations: {
        thousand: 'k',
        million: 'm',
        billion: 'b',
        trillion: 't',
      },
      ordinal: function (number) {
        return 'บาท'
      },
      currency: {
        symbol: '฿',
      },
    })
  }

  numeral.locale('th')
}
