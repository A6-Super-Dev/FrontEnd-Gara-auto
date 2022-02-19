import React from 'react';
import { useDataFetch } from '../../../common/hooks/DataFeching';
import { clientService } from '../../../services/authServices';
import { TestHookReturn } from '../../../services/types';
import './Home.scss';

export const Home = () => {
  const [loading, setLoading, error, result] = useDataFetch(
    false,
    clientService.test
  );

  function handleOnclick() {
    setLoading(true);
  }

  return (
    <div>
      <button className="test-button">
        <svg
          className="fill-current w-4 h-4 mr-2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
        </svg>
        <span>Download</span>
      </button>
      <ul>
        {loading === false &&
          result?.map((el: TestHookReturn, index: number) => {
            return <li key={index}>{el._id}</li>;
          })}
      </ul>
    </div>
  );
};
