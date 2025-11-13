import { generateMetadata } from "@/lib/farcaster-embed";
import Quiz from "@/components/quiz";

export { generateMetadata };

export default function Home() {
  return (
    <main className="flex flex-col gap-4 place-items-center px-4">
      <Quiz />
    </main>
  );
}
