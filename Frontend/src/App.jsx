
import { AuthProvider } from "./context/AuthContext"
import AppRoutes from "./routes/AppRoutes"
function App() {
  return (
    <div className=" h-screen bg-gray-50 o items-center justify-center ">
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>

    </div>
  )
}

export default App