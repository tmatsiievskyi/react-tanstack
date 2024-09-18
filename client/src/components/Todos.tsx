import {
  useCreateTodo,
  useDeleteTodo,
  useUpdateTodo,
} from '../services/mutations';
import { useTodos, useTodosIds } from '../services/queries';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ITodo } from '../types';

export default function Todos() {
  const todosIdsQuery = useTodosIds();
  //   const isFetching = useIsFetching();
  const todosQueries = useTodos(todosIdsQuery.data);
  const createTodoMutations = useCreateTodo();
  const updateTodoMutations = useUpdateTodo();
  const deleteTodoMutations = useDeleteTodo();
  const handleMarAsDone = (data: ITodo | undefined) => {
    if (data) {
      updateTodoMutations.mutate({ ...data, checked: true });
    }
  };
  const handleDelete = async (id: number) => {
    await deleteTodoMutations.mutateAsync(id);
    console.log('delete sucess');
  };

  const { register, handleSubmit } = useForm<ITodo>();

  const handleCreateTodoSubmit: SubmitHandler<ITodo> = (data) => {
    createTodoMutations.mutate(data);
  };

  if (todosIdsQuery.isPending) {
    return <span>Loading...</span>;
  }

  if (todosIdsQuery.isError) {
    return <span>is an Error</span>;
  }

  return (
    <>
      {/* <p>Query status: {todosIdsQuery.fetchStatus}</p>
      <p>Query data status: {todosIdsQuery.status}</p>
      <p>Global isFetching: {isFetching}</p> */}
      {/* {todosIdsQuery.data.map((id) => (
        <p key={id}>id: {id}</p>
      ))} */}

      <form onSubmit={handleSubmit(handleCreateTodoSubmit)}>
        <h4>New Todo:</h4>
        <input placeholder='Title' {...register('title')} />
        <br />
        <input placeholder='Description' {...register('description')} />
        <br />
        <input
          type='submit'
          disabled={createTodoMutations.isPending}
          value={createTodoMutations.isPending ? 'Creating...' : 'Create todo'}
        />
      </form>

      {todosQueries.map(({ data }) => (
        <li key={data?.id}>
          <div>Id: {data?.id}</div>
          <span>
            <strong>Title:</strong> {data?.title},<strong>Description:</strong>{' '}
            {data?.description}
          </span>
          <div>
            <button
              onClick={() => handleMarAsDone(data)}
              disabled={data?.checked}
            >
              {data?.checked ? 'Done' : 'Mark as done'}
            </button>
            {data && data?.id ? (
              <button onClick={() => handleDelete(data.id!)}>Delete</button>
            ) : null}
          </div>
        </li>
      ))}
    </>
  );
}
