import Routes from "./src/routes";
import { Providers } from "./src/context";

export default function App() {
  return (
    <Providers>
      <Routes />
    </Providers>
  );
}
