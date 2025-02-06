import { Button } from "@mui/material"
import peopleImage from '../assets/people.png';
import { useNavigate } from "react-router-dom";

const IndexPage = () => {
    const navigate = useNavigate();

    return (
        <div className="">
            <div className="flex gap-16 justify-between items-center sm:mx-28 mx-3 py-3 mt-20">
                <section className="">
                    <div className="flex flex-col gap-5 items-start">
                        <div className="flex flex-col gap-5">
                            <h1 className="text-6xl font-extrabold">Connect & Grow with <br /> <span className="text-blue-600">Fellow Developers</span> </h1>
                            <span className="text-xl text-gray-300">
                                Join a thriving community of developers, expand your network, and collaborate on exciting projects. Build, learn, and innovate together!"
                            </span>
                        </div>
                        <Button onClick={() => navigate('/signup')} variant="contained">Get Started</Button>
                    </div>
                </section>

                <section className="hidden md:block">
                    <img src={peopleImage} alt="Profile" />
                </section>
            </div>
        </div>
    )
}

export default IndexPage