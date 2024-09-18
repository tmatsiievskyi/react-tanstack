import { useState } from 'react';
import { useProjects } from '../services/queries';

const LIMIT = 3;

export default function Projects() {
  const [page, setPage] = useState(1);

  const { data, isPending, error, isError, isPlaceholderData, isFetching } =
    useProjects({ page, limit: LIMIT });

  return (
    <div>
      {isPending ? (
        <div>loading</div>
      ) : isError ? (
        <div>Error</div>
      ) : (
        <div>
          {data.map((project) => {
            return <p key={project.id}>{project.name}</p>;
          })}
        </div>
      )}
      <span>Current page: {page}</span>
      <button onClick={() => setPage((old) => Math.max(old - 1, 0))}>
        Prev page
      </button>
      <button
        onClick={() => {
          if (!isPlaceholderData) {
            setPage((old) => Math.max(old + 1));
          }
        }}
        disabled={isPlaceholderData}
      >
        Next page
      </button>
      {isFetching ? <span>Loading</span> : null}
    </div>
  );
}
