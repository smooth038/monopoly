import { Controller } from "./components/Controller";
import { Suspense } from "react";

function App() {
  return (
    <Suspense fallback={null}>
      <Controller />
    </Suspense>
  );
}

export default App;
