import React from 'react'
import Link from 'next/link'
import useSWR from 'swr'
import PageTitle from '../components/Page.Title'

const fetcher = (...args) => fetch(...args).then(res => res.json())

const Index = () => {
    const { data, error } = useSWR('/api/get-promo', fetcher)
    return (
        <div>
            <PageTitle title='Home - PalpiteBox' />
            <p className='mt-12 text-center'>
                O restaurante X sempre busca por atender melhor seus clientes.<br />
                Por isso, estamos sempre abertos a ouvir a sua opinião.
            </p>
            <div className='text-center my-12 '>
                <Link href='/pesquisa'>
                    <a className='bg-blue-400 px-14 py-4 font-bold rounded-lg shadow-lg focus:ring-2 focus:ring-blue-500 '>Dar opinião ou sugestão</a>
                </Link>
            </div>
            { !data && <p>Carregando...</p>}
            {!error && data && data.showCoupon &&
                <p className='my-12  text-center'>
                    {data.message}
                </p>
            }
        </div>
    )
}
export default Index
