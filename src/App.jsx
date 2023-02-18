// rename the file App.jsx
// delete the React import
import { createRoot } from "react-dom/client";

// delete the Pet component

const App = () => {
  return (
    <div>
      <h1>Adopt Me!</h1>
      <form>
        <div>
          <label htmlFor="task">
            <input id="task" name="task" placeholder="Write your to do." />
          </label>
          <button> Submit</button>
        </div>
      </form>
      <div>
        <ul>
          <h2>List of things to Do</h2>
        </ul>
      </div>
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
