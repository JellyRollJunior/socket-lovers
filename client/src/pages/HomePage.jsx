import { Home } from '../components/Home.jsx';
import cheer from '../assets/images/trio-cheer.png';

const HomePage = () => {
  return (
    <div className="flex h-full">
      <aside className="border-r-1 min-w-xs flex-3 md:max-w-sm border-gray-500">
        <Home />
      </aside>
      <div className="flex-8 hidden md:block">
        <main className="flex h-full flex-col items-center justify-center">
          <img
            className="max-w-xs"
            src={cheer}
            alt="Chiikawa, Hachiware, and Usagi cheering with pom poms"
          />
          <h2 className="mt-2 text-center text-2xl font-bold">Your Messages</h2>
          <footer className="mt-2 text-center text-lg">
            Select or Create a chat to send messages.
          </footer>
        </main>
      </div>
    </div>
  );
};

export { HomePage };
