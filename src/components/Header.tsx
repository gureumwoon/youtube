import { FaYoutube } from 'react-icons/fa';
import { GoSearch } from 'react-icons/go'

export default function Header() {
    return (
        <header>
            <div>
                <FaYoutube />
                <h1 className='text-white'>YouTube</h1>
            </div>
            <form action="">
                <input />
                <button>
                    <GoSearch />
                </button>
            </form>
        </header>
    )
}
