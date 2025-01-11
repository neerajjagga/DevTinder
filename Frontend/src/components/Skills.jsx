import skills from '../constants/skills';

const Skills = ({ selectedSkills, toogleSkillSelection, loading, handleRegister, setSideArrow }) => {


    return (
        <div className='flex flex-col gap-5 items-center mt-15 px-10 md:px-20 lg:px-30 py-10'>
            <div className='flex items-center justify-center gap-10'>
                <button
                onClick={() => setSideArrow(false)} 
                className='rounded-full transition hover:bg-gray-600 p-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                </button>
                <h1 className='text-4xl font-bold'>Select Skills</h1>
            </div>
            <div className='flex flex-wrap gap-5'>
                {skills.map((skill, index) => (
                    selectedSkills.includes(skill) ? (
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                toogleSkillSelection(skill);
                            }}
                            key={index}
                            className='flex justify-center gap-2 text-white rounded-full py-2 font-semibold bg-blue-500 px-3'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                            </svg>
                            {skill}
                        </button>
                    ) : (
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                toogleSkillSelection(skill);
                            }}
                            key={index}
                            className='flex justify-center gap-2 bg-white text-black rounded-full py-2 font-semibold px-3'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            {skill}
                        </button>
                    )
                ))}
            </div>
            <button
                onClick={(e) => handleRegister(e)}
                disabled={selectedSkills.length < 1}
                className={selectedSkills.length < 1 ? 'bg-gray-200 p-2 w-full text-black rounded-2xl font-semibold' : 'primary flex items-center justify-center gap-4'}>
                Create account {loading ? <span className="loading loading-dots loading-xs"></span> : null}
            </button>
        </div>
    )
}

export default Skills