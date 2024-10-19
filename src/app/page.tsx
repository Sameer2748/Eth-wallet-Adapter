import Header from "@/components/Header";
import Main from "@/components/Main";
import {BackgroundBeamsWithCollision} from "../components/ui/background-beams-with-collision"
import { Toaster } from 'sonner';

export default function Home() {
  return (
    <div className="w-full h-screen bg-slate-800">
    <BackgroundBeamsWithCollision>
      <div className="w-full h-screen flex flex-col">
      <Header />
      <Main/>
      </div>
      <Toaster />
    </BackgroundBeamsWithCollision>
    </div>
  );
}
