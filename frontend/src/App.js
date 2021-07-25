import cutIcon from './assets/cut-solid.svg';
import HistoryItem from './Components/HistoryItem';
import useLocalStorage from './Hooks/useLocalStorage';
import api from './api';

import './App.css';
import { useRef, useState } from 'react';
function App() {
  const inputRef = useRef();

  const [shortenedUrls, setShortenedUrls] = useLocalStorage(
    'shortenedUrls',
    []
  );
  const [urlToShorten, setUrlToShorten] = useState('');

  const handleUrlToShortenChange = (e) => {
    setUrlToShorten(e.target.value.toLowerCase());
  };

  const submitUrl = async (e) => {
    e.preventDefault();
    if (!urlToShorten) {
      inputRef.current.focus();
      return;
    }
    try {
      const {
        data: { shortenedUrl },
      } = await api.post('/', { urlToShorten });
      setShortenedUrls((oldUrls) => [shortenedUrl, ...oldUrls]);
    } catch (err) {
      console.log(err);
      return;
    }
    setUrlToShorten('');
  };

  const handleHistoryDelete = (url) => {
    setShortenedUrls((oldUrls) => oldUrls.filter((oldUrl) => oldUrl !== url));
  };

  return (
    <>
      <div className='container'>
        <img src={cutIcon} className='cuticon' alt='Spinning scissor' />
        <h1 className='title'>URL Shortener</h1>
        <div className='cutter-container'>
          <form>
            <input
              type='text'
              placeholder='Enter URL'
              className='rect'
              value={urlToShorten}
              onChange={handleUrlToShortenChange}
              ref={inputRef}
            />
            <button type='submit' className='rect' onClick={submitUrl}>
              Cut it!
            </button>
          </form>
          {!!shortenedUrls.length && (
            <ul className='history'>
              {shortenedUrls.map((url) => (
                <HistoryItem
                  key={url}
                  url={url}
                  onDelete={() => handleHistoryDelete(url)}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
