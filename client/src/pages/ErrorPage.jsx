import { Link, useNavigate } from 'react-router';
import scared from '../assets/images/chii-hachi-scared.png';

const ErrorPage = () => {
  const navigate = useNavigate();
  if (!localStorage.getItem('token')) navigate('/login');

  return (
    <>
      <div className="flex h-screen w-screen justify-center bg-blue-100">
        <div className="border-10 mt-32 h-fit flex-col items-center rounded-3xl border-pink-200 bg-pink-100 px-8 py-12 text-xl font-medium text-yellow-800">
          <header className="text-center text-3xl font-bold">
            Ya... Ya.... YAAAA!
            <br />
            404
          </header>
          <main>
            <img
              className="drop-shadow-pink-custom"
              src={scared}
              alt="Chiikawa and Hachiware startled"
            />
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
