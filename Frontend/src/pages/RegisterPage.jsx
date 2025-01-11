import { useState } from 'react'
import Skills from '../components/Skills';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import { setUser } from '../store/user.slice';
import { useDispatch } from 'react-redux'

const RegisterPage = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [about, setAbout] = useState('');
    const [sideArrow, setSideArrow] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    function handlePasswordToggle() {
        setIsPasswordVisible(prev => !prev);
    }

    function handleRegister(e) {
        setLoading(true);
        e.preventDefault();
        axios.post('/auth/signup', {
            firstName,
            lastName,
            about,
            password,
            emailId: email,
            skills: selectedSkills
        })
            .then(({ data }) => {
                toast.success(data.message)
                dispatch(setUser(data.user))
                navigate('/')
            })
            .catch(({ response }) => {
                toast.error(response.data.message);
            })
            .finally(() => {
                setLoading(false)
            })
    }

    function toogleSkillSelection(skillName) {
        if(selectedSkills.includes(skillName)) {
            setSelectedSkills([...selectedSkills.filter(skill => skill != skillName)]);
        } else {
            setSelectedSkills([...selectedSkills, skillName]);
        }
    }

    return (
        !sideArrow ? (
              <div className='text-2xl text-white border-2 border-gray-500 self-center
              p-5 px-10 rounded-2xl flex flex-col gap-5'>
                  <h1 className='text-center text-4xl font-semibold'>Register</h1>
                  <form onSubmit={(e) => handleSubmit(e)} className='flex flex-col gap-5'>
                      <div className='flex gap-2'>
                          <label className=''>
                              First Name <span className='text-red-600'>*</span>
                          </label>
                          <input
                              type="text"
                              className='text-white py-2 px-4 focus:outline-none border-b-2 bg-base-200'
                              placeholder='John'
                              required
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                          />
                      </div>
                      <div className='flex gap-2'>
                          <label className=''>
                              Last Name
                          </label>
                          <input
                              type="text"
                              className='text-white py-2 px-4 focus:outline-none border-b-2 bg-base-200'
                              placeholder='Doe'
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)}
                          />
                      </div>
                      <div className='flex gap-2'>
                          <label className=''>
                              About <span className='text-red-600'>*</span>
                          </label>
                          <textarea
                              type="text"
                              className='text-white py-2 px-4 focus:outline-none border-b-2 bg-base-200'
                              placeholder='Remote software engineer'
                              value={about}
                              onChange={(e) => setAbout(e.target.value)}
                              required
                          />
                      </div>
                      <div className='flex gap-2'>
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
                      <div className='flex  gap-2 '>
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
                  </form>
                  <p className='text-lg text-gray-400'>Don't have an account. <Link className='text-blue-700 underline' to={'/login'}>Login</Link></p>
                  <button onClick={(e) => {
                      e.preventDefault()
                      if (!email || !firstName || !password || !about) {
                          return toast.error("Fill all the required fields to continue");
                      } else {
                          setSideArrow(true);
                      }
                  }} className='border-2 bg-base-300 py-4 px-4 self-center rounded-full mt-2'>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                      </svg>
                  </button>
              </div>
        ) :  <Skills selectedSkills={selectedSkills} toogleSkillSelection={toogleSkillSelection} loading={loading} handleRegister={handleRegister} setSideArrow={setSideArrow} />
    )
}

export default RegisterPage