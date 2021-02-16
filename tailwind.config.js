module.exports = {
   purge: [],
   darkMode: false, // or 'media' or 'class'
   theme: {
      extend: {
         height: {
            84: '21rem',
            92: '23rem',
            100: '25rem',
            104: '26rem',
            120: '30rem',
            132: '33rem',
            164: '41rem',
            176: '44rem',
            260: '65rem'
         },
         maxHeight: {
            128: '32rem',
            160: '40rem',
            '1/2': '50%',
            '3/4': '75%'
         },
         width: {

         },
         zIndex: {
            '-10': -10
         },
      },
   },
   variants: {
      extend: {
      },
   },
   plugins: [
      require('@tailwindcss/line-clamp'),
   ],
}
