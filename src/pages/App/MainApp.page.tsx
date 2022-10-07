import { Suspense, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RouteContext, { initialRouteContext } from "@/context/route.context";
import { Provider } from "react-redux";
import { store } from "@/redux";
import { SnackbarProvider } from "notistack";
import { SnackbarUtilsConfigurator } from "@/utilities";
import { BasicRoute, ProtectedRoute, SpinnerLoading } from "@/components";
import { AuthProvider } from "@/components";
export default function App() {
  const [routeState] = useState(initialRouteContext);
  return (
    <RouteContext.Provider value={routeState}>
      <SnackbarProvider>
        <SnackbarUtilsConfigurator />
        <Suspense
          fallback={
            <div className="position-absolute top-50 start-50 text-dark">
              <SpinnerLoading />
            </div>
          }
        >
          <Provider store={store}>
            <BrowserRouter>
              <AuthProvider>
                <Routes>
                  {routeState.routes.map((e, i) => (
                    <Route
                      key={i}
                      element={<BasicRoute>{e.element}</BasicRoute>}
                      path={e.path}
                    />
                  ))}
                  {routeState.userRoutes.map((e, i) => (
                    <Route
                      key={i}
                      element={<ProtectedRoute>{e.element}</ProtectedRoute>}
                      path={e.path}
                    />
                  ))}
                </Routes>
              </AuthProvider>
            </BrowserRouter>
          </Provider>
        </Suspense>
      </SnackbarProvider>
    </RouteContext.Provider>
  );
}
