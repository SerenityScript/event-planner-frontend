import { RouterProvider } from "./app/providers/RouterProvider"
import { AppRouter } from "./app/router/AppRouter"
import { ConfirmProvider } from "./shared/ui/Confirm"

function App() {
  
  return (
    <RouterProvider>
      <ConfirmProvider>
        <AppRouter />
      </ConfirmProvider>
    </RouterProvider>
  )
}

export default App
