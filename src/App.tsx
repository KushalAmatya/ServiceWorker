import { useEffect } from "react";
import "./App.css";
import { useFetch } from "./services/useFetch";

function App() {
  const { data, loading, error, fetchData } = useFetch(
    "https://jsonplaceholder.typicode.com/posts"
  );
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div>
        {loading && <p>Loading...</p>}
        {error && <p>Error fetching data</p>}

        {data.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Body</th>
              </tr>
            </thead>
            <tbody>
              {data.map((post) => (
                <tr key={post.id}>
                  <td>{post.id}</td>
                  <td>{post.title}</td>
                  <td>{post.body}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default App;
