import { Link } from 'react-router';
import scared from '../assets/images/chii-hachi-scared.png';

const ErrorPage = () => {
  return (
    <>
      <div className="flex h-screen w-screen justify-center bg-blue-100">
        <div className="mt-32 px-8 py-12 flex-col h-fit items-center rounded-3xl border-10 border-pink-200 bg-pink-100  text-yellow-800 text-xl font-medium">
          <header className="text-center text-3xl font-bold">
            Ya... Ya.... YAAAA!
          </header>
          <main>
            <img src={scared} alt="Chiikawa and Hachiware startled" />
            <p className="mt-2 text-center">
              Oops! We can't find the page you're looking for.
            </p>
          </main>
          <footer className="mt-2 text-center">
            <Link className="text-blue-400 underline">Click here</Link> to head
            back home.
          </footer>
        </div>
      </div>
    </>
  );
};

export { ErrorPage };
