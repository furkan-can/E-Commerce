import {PiShoppingBagOpenBold} from 'react-icons/pi'
import {GoPerson} from 'react-icons/go'
import {SearchBar} from '@/components'

const Header = () => {
  return (
    <div className="flex items-center justify-between w-full h-12 bg-blue-600 px-60">
      <div className="flex items-center gap-40">
        <span className='text-white font-bold text-2xl'>Eteration</span>
        <SearchBar width={"w-80"} height={"h-10"} />
      </div>
      <div className='flex items-center text-white gap-10'>
        <div className='flex items-center gap-2'>
          <PiShoppingBagOpenBold size={20} />
          <span>117.000<span>₺</span></span>
        </div>
        <div className='flex items-center gap-2'>
          <GoPerson size={20} />
          <span>Kerem</span>
        </div>
      </div>
    </div>
  )
}

export default Header
