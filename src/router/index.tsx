import { createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "../components";
import { 
  HomePage, 
  AboutPage, 
  ContactsPage, 
  ErrorBoundary, 
  LoginPage,
  RegisterPage,
  ResetPasswordPage,
  TestPage,
  ExamRulesPage,
  TestSessionPage,
  ForgotPasswordPage,
  ProfilePage,
  ProfileSettingsPage,
  ProfileResultsSession,
  SubjectsIntroPage,
  AdminPage,
} from "../pages";
import { App } from "../App";


export const ROUTE = {
  HOME: "/",
  ABOUT: "/about",
  CONTACTS: "/contacts",
  DEMO: "/demo",
  FORGOTPASSWORD: "/forgot-password",
  LOGIN: "/login",
  LOGOUT: "/logout",
  PROFILEMAIN: "/profile",
  PROFILESETTINGS: "/profile-settings",
  PROFILERESULTS: "/profile-results",
  REGISTRATION: "/register",
  RESETPASSWORD: "/reset-password/:token",
  SUBJECTINTRO: "subject-intro",
  TEST: "/test/:slug/:id",
  TESTEXAMRULES: "exam-rules",
  TESTSESSION: "/test/session/:id/:name",

  // Admin routes
  ADMIN: "/admin",
  // ADMIN_DISCIPLINES: "/admin/disciplines",
  // ADMIN_TOPICS: "/admin/topics",
  // ADMIN_QUESTIONS: "/admin/questions",
  // ADMIN_ANSWEROPTIONS: "/admin/answeroptions",
  // ADMIN_USERS: "/admin/users",
  // ADMIN_USER_CREATE: "/admin/user/create",
  // ADMIN_USER_UPDATE: "/admin/user/update",

};

export const router = createBrowserRouter([
  {
    element: <App />, // общий layout
    children: [
      {
        path: ROUTE.HOME,
        element: ( <ErrorBoundary> <HomePage /> </ErrorBoundary> ),
      },
      {
        path: ROUTE.ABOUT,
        element: (<ErrorBoundary> <AboutPage /> </ErrorBoundary> ),
      },
      {
        path: ROUTE.CONTACTS,
        element: (<ErrorBoundary> <ContactsPage /> </ErrorBoundary> ),
      },
      {
        path: ROUTE.LOGIN,
        element: (<ErrorBoundary> <LoginPage /> </ErrorBoundary> ),
      },
      {
        path: ROUTE.FORGOTPASSWORD,
        element: (<ErrorBoundary> <ForgotPasswordPage /> </ErrorBoundary> ),
      },
      {
        path: ROUTE.PROFILEMAIN,
        element: (<ErrorBoundary> <ProtectedRoute><ProfilePage /></ProtectedRoute> </ErrorBoundary> ),
      },
      {
        path: ROUTE.PROFILESETTINGS,
        element: (<ErrorBoundary> <ProtectedRoute><ProfileSettingsPage /></ProtectedRoute> </ErrorBoundary> ),
      },
      {
        path: ROUTE.PROFILERESULTS,
        element: (<ErrorBoundary> <ProtectedRoute><ProfileResultsSession /></ProtectedRoute> </ErrorBoundary> ),
      },

      {
        path: ROUTE.REGISTRATION,
        element: (<ErrorBoundary> <RegisterPage /> </ErrorBoundary> ),
      },
      {
        path: ROUTE.RESETPASSWORD,
        element: (<ErrorBoundary> <ResetPasswordPage /> </ErrorBoundary> ),
      },
      {
        path: ROUTE.SUBJECTINTRO,
        element: (<ErrorBoundary> <SubjectsIntroPage /> </ErrorBoundary> ),
      },
      {
        path: ROUTE.TEST,
        element: (<ErrorBoundary> <TestPage /> </ErrorBoundary> ),
      },
      {
        path: ROUTE.TESTEXAMRULES,
        element: (<ErrorBoundary> <ProtectedRoute><ExamRulesPage /></ProtectedRoute> </ErrorBoundary> ),
      },
      {
        path: ROUTE.TESTSESSION,
        element: (<ErrorBoundary> <TestSessionPage /> </ErrorBoundary> ),
      },

      {
        path: ROUTE.ADMIN + '/*', // "/admin/*"
        element: (
          <ErrorBoundary>
            <ProtectedRoute requiredRole="Admin">
              <AdminPage /> {/* Весь функционал через React Admin */}
            </ProtectedRoute>
          </ErrorBoundary>
        ),
      }
    ],
  },
]);