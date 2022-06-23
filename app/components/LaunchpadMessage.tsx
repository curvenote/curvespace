import { useEffect, useState } from 'react';
import { formatDistanceToNow, addDays } from 'date-fns';

export default function LaunchpadMessage() {
  if (typeof document === 'undefined') return null;
  const hostname = window.location.hostname;
  const [expiresIn, setExpiresIn] = useState('and will expire in - days.');
  const [show, setShow] = useState(window.sessionStorage.getItem(hostname) !== 'hide');

  const match = hostname.match(/^launchpad-(.*).curve.space$/);

  useEffect(() => {
    if (match == null) return;
    const [, id] = match;
    fetch(`https://api.curvenote.com/launchpad/${id}`).then((resp) => {
      if (resp.ok)
        resp.json().then((json) => {
          console.log('created', json.date_created);
          setExpiresIn(
            `and will expire in ${formatDistanceToNow(
              addDays(new Date(json.date_created), 5),
            )}.`,
          );
        });
      else setExpiresIn('and is temporary.');
    });
  }, []);

  const clickDismiss = () => {
    window.sessionStorage.setItem(hostname, 'hide');
    setShow(false);
  };

  if (!show || match == null) return null;

  return (
    <div className="fixed border text-sm bg-white bottom-2 right-2 p-2 w-[385px] z-20 text-center space-y-2 launchpad-message shadow animate-fadein-fast">
      <p className="mb-1 text-lg font-semibold">🚀 Try Curvenote 🚀</p>
      <p>
        This website was launched using{' '}
        <a href="https://try.curvenote.com">try.curvenote.com</a> {expiresIn}
      </p>
      <div className="text-left px-2 space-y-1">
        <p>What&apos;s Next?</p>
        <ul className="list-inside indent-4">
          <li>
            <a href="https://try.curvenote.com" target="_blank" rel="noreferrer">
              Launch temporary website like this one
            </a>
          </li>
          <li>
            Is this yours?{' '}
            <a
              href="https://docs.curvenote.com/web/launchpad#J7q8FCSPRp"
              target="_blank"
              rel="noreferrer"
            >
              Customize it and make it permanent
            </a>
          </li>
        </ul>
      </div>
      <button
        className="border p-1 px-2 my-4 rounded text-blue-500 hover:text-blue-600 hover:border-blue-500"
        onClick={clickDismiss}
      >
        Dismiss
      </button>
    </div>
  );
}
