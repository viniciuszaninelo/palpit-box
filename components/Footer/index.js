import React from 'react'

const Footer = () => {
  return (
    <div className='bg-gray-700 p-4'>
      <div className='container mx-auto text-center font-bold text-white'>
        Projeto desenvolvido por : {' '}
        <a > Vinícius Zaninelo </a> /
          <a className='hover:underline' href='https://www.linkedin.com/in/vin%C3%ADcius-zaninelo-4b776a196/'>Linkedin</a> / {' '}
        <a className='hover:underline' href='https://github.com/viniciusmarquezaninelo'>Github</a> {' '}
        <div className='mt-2'>
          <img className='inline p-4' src='/logo_semana_fsm.png' />
          <img className='inline p-4' src='/logo_devpleno.png' />
        </div>
      </div>
    </div>
  )
}
export default Footer 