import TypingEffect from "../component/content/typingEffect";
import YouTubeVideo from "../component/content/video";
import Content from "../component/content/content";
import URLParse from 'url-parse';


const HomePage = () => {
    const content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
    const typingSpeed = 50;
    const url = "https://www.youtube.com/watch?v=ijZHRjsGTRM"
    const parsedUrl = new URLParse(url, true);
    const videoId = parsedUrl.query.v;
    console.log(videoId)

    return (
    <div className="m-5">
        <div className="flex flex-row ">
            <h1 className="text-3xl font-bold mb-5">
            VIDEO FACTUAL ACCURACY VERIFICATION
            </h1>

        </div>
        <div className="flex grid grid-cols-3">
            <div className="grid-cols-2 ">
                <Content/>
            </div>
        <div className="absolute top-5 right-5">
             <YouTubeVideo/>
        </div>
        </div>
    </div>
    );
};

export default HomePage;