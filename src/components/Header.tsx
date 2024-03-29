import { FormEvent, useEffect, useState } from 'react';
import { FaYoutube } from 'react-icons/fa';
import { GoSearch } from 'react-icons/go'
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function Header() {
    const { keyword } = useParams();
    const navigate = useNavigate();
    const [searchKeyword, setSearchKeyword] = useState('');

    const handleSearch = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        navigate(`/videos/${searchKeyword}`);
    }

    useEffect(() => {
        setSearchKeyword(keyword || '');
    }, [keyword])

    return (
        <header className='w-full flex justify-between items-center px-4 py-3 mb-4'>
            <Link to='/'>
                <div className='flex items-center'>
                    <FaYoutube className='text-4xl text-logo mr-1' />
                    <h1 className='text-white text-2xl font-semibold'>YouTube</h1>
                </div>
            </Link>
            <form onSubmit={handleSearch} className='w-full flex justify-center flex-grow'>
                <input type='text' placeholder='검색' onChange={(e) => setSearchKeyword(e.target.value)} value={searchKeyword} className='w-3/12 min-w-96 py-2 px-3 rounded-tl-full rounded-bl-full border border-borderCorlor bg-mainColor z-10' />
                <button className='bg-searchBtnColor w-16 h-10 rounded-tr-full rounded-br-full'>
                    <GoSearch className='text-subColor text-xl m-auto' />
                </button>
            </form>
        </header >
    )
}
