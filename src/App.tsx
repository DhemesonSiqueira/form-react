import { Form } from "@/components";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="bg-zinc-200 h-full p-5 flex items-center justify-center">
        <Form />
      </main>
    </QueryClientProvider>
  );
};

export default App;
