import Header from "./components/Header/header";
import Movies from "./components/Header/Movies"

export default function Home() {
  return (
    <div className="bg-custom-bg min-h-screen">
      <Header />
      <Movies />
    </div>
  );
}
