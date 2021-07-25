import React from 'react';
import './HistoryItem.css';
import copyIcon from '../assets/copy-solid.svg';
import trashIcon from '../assets/trash-solid.svg';

const HistoryItem = ({ url, onDelete }) => {
  const copyToClipboard = () => navigator.clipboard.writeText(url);

  return (
    <li className='rect item'>
      <a href={url} target='_blank' rel='external noreferrer' className='link'>
        {url.length > 30
          ? `${url.slice(0, 17)}.../${url.split('/').pop()}`
          : url}
      </a>
      <span className='item__icons__wrapper'>
        <img
          src={copyIcon}
          className='item__icon'
          alt='Copy to clipboard icon'
          onClick={copyToClipboard}
        />
        <img
          src={trashIcon}
          className='item__icon'
          alt='Trash can icon'
          onClick={() => onDelete()}
        />
      </span>
    </li>
  );
};

export default HistoryItem;
