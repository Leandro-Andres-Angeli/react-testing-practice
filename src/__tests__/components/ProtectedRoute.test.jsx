import { findByText, render, screen, waitFor } from "@testing-library/react"
import { Provider } from "react-redux"
import { MemoryRouter, Route, Routes } from "react-router"
import { setupStore } from "../../store/store"
import { ProtectedRoute } from "../../components/ProtectedRoute"

const MockRouter = ({store})=>{
    
    return( <MemoryRouter  future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }} initialEntries={["/todos"]} >
        <Provider  store={store}>
            <Routes>
                <Route path="/todos" element={
                    <ProtectedRoute>
                    <div>Child Element</div>
                    </ProtectedRoute>
                    } ></Route>
            
            <Route path="/login" element={<div>Login Element</div>} ></Route>
            </Routes>
        </Provider>
    </MemoryRouter>)
}

describe("ProtectedRoute Tests" , ()=>{
    it("should navigate to child element" , ()=>{
         const store =setupStore({
             auth: {
               token: "fake-token-123",
               loading: false,
               error: null,
             },
           });
          render(<MockRouter store={store}></MockRouter> )  
          const childContent = screen.getByText(/Child Element/i)
          expect(childContent).toBeInTheDocument()
    })
    it("should redirect to login" , ()=>{
         const store =setupStore({
             
           });
          
          render(<MockRouter  store={store}></MockRouter>)
           const loginEl =  screen.getByText(/Login Element/i) 
          expect(loginEl).toBeInTheDocument()

           
    })
})