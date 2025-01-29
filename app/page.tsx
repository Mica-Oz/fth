import Hello from "@/app/components/hello";

export default function Home() {
  console.log("What am I? -- server or client?");
  return (
    <>
      <h1>Hello, World!</h1>
      <Hello />
    </>
  );
}
