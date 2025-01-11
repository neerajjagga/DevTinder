import { useState } from 'react'
import { Link } from 'react-router-dom';

const BasicForm = ({ heading, buttonText, email, setEmail, password, setPassword, handleSubmit, children = null }) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    function handlePasswordToggle() {
        setIsPasswordVisible(prev => !prev);
    }

    return (
        <div className='text-2xl text-white border-2 border-gray-500 self-center
    p-5 px-10 rounded-2xl flex flex-col gap-5'>
            <h1 className='text-center text-4xl font-semibold'>{heading}</h1>
            <form onSubmit={(e) => handleSubmit(e)} className='flex flex-col gap-2'>
                {children && children}
                <div className='flex flex-col gap-2'>
                    <label className=''>
                        Email <span className='text-red-600'>*</span>
                    </label>
                    <input
                        type="text"
                        className='text-white py-2 px-4 focus:outline-none border-b-2 bg-base-200'
                        placeholder='john@gmail.com'
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className='flex flex-col gap-2 '>
                    <label className=''>
                        Password <span className='text-red-600'>*</span>
                    </label>
                    <div className='relative'>
                        <input
                            className='py-2 pr-10 pl-4 focus:outline-none bg-base-200 border-b-2'
                            type={isPasswordVisible ? "text" : "password"}
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            onClick={(e) => {
                                e.preventDefault()
                                handlePasswordToggle()
                            }}
                            className='absolute bottom-3 right-1'>{isPasswordVisible ? "🐵" : "🙈"}</button>
                    </div>
                </div>
                <p className='text-lg text-gray-400'>Don't have an account. <Link className='text-blue-700 underline' to={'/register'}>Register</Link></p>
                <button className='border-2 bg-base-300 py-2 px-8 self-center rounded-2xl mt-4'>{buttonText}</button>
            </form>
        </div>
    )
}

export default BasicForm