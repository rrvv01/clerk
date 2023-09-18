import { UserButton, auth } from '@clerk/nextjs'
import Link from 'next/link'

const Header = () => {
    const { userId } = auth()
    console.log(userId)
    return (
        <>
        <nav className='bg-red-900 py-4 px-8'>
            <div className='flex items-center justify-between container'>
                <div className='flex items-center font-bold'>
                    <Link href='/'>
                        <div className='text-lg text-white'>Clerk Auth</div>
                    </Link>
                </div>

                <div className='flex items-center font-bold'>
                    { !userId ? (
                        //로그인이 안된 겨우
                        <>
                        <Link
                    href="/sign-in"
                    className='text-yellow-300 hover:text-white mr-4'
                    >
                    sign in
                    </Link>
                    <Link
                    href="/sign-up"
                    className='text-yellow-300 hover:text-white mr-4'
                    >
                    sign up
                    </Link>
                        </>
                    ) : (
                        //로그인된 경우
                        <>
                        <Link
                    href="/dashboard"
                    className='text-blue-300 hover:text-white mr-4'>
                    대시보드
                    </Link>
                        <Link
                    href="/profile"
                    className='text-blue-300 hover:text-white mr-4'>
                    
                    프로필
                    </Link>
                    <div className='ml-auto'>
                        <UserButton afterSignOutUrl='/' />
                    </div>
                        </>
                )
            }   
            </div>    
            </div>
        </nav>
        </>
    )
}
export default Header