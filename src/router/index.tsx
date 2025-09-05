// Адаптьивний LayOut

import { createBrowserRouter } from "react-router-dom";
import { ProtectedRoute, AppWithoutLayout } from "../components";
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
  TestSelectionPage,
  TestSessionPage,
  ForgotPasswordPage,
  ProfilePage,
  ProfileSettingsPage,
  ProfileResultsSession,
  SubjectsIntroPage,
  AdminPage,
  MessagesPage,
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
  MESSAGES: "/messages",
  PROFILEMAIN: "/profile",
  PROFILESETTINGS: "/profile-settings",
  PROFILERESULTS: "/profile-results",
  REGISTRATION: "/register",
  RESETPASSWORD: "/reset-password/:token",
  SUBJECTINTRO: "subject-intro",
  TEST: "/test/:slug/:id",
  TESTEXAMRULES: "exam-rules",
  TESTSELECTION: "test-selection",
  TESTSESSION: "/test/session/:id/:name",

  // Admin routes
  ADMIN: "/admin",
};

export const router = createBrowserRouter([
  {
    element: <App />, // С Layout
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
        path: ROUTE.MESSAGES,
        element: (<ErrorBoundary> <MessagesPage /> </ErrorBoundary> ),
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
        path: ROUTE.SUBJECTINTRO,
        element: (<ErrorBoundary> <SubjectsIntroPage /> </ErrorBoundary> ),
      },
      {
        path: ROUTE.TEST,
        element: (<ErrorBoundary> <TestPage /> </ErrorBoundary> ),
      },
      {
        path: ROUTE.TESTSELECTION,
        element: (<ErrorBoundary> <TestSelectionPage /> </ErrorBoundary> ),
      },
      {
        path: ROUTE.TESTEXAMRULES,
        element: (<ErrorBoundary> <ProtectedRoute><ExamRulesPage /></ProtectedRoute> </ErrorBoundary> ),
      },
      {
        path: ROUTE.TESTSESSION,
        element: (<ErrorBoundary> <TestSessionPage /> </ErrorBoundary> ),
      },
    ],
  },
  {
    element: <AppWithoutLayout />, // БЕЗ Layout
    children: [
      {
        path: ROUTE.LOGIN,  // --
        element: (<ErrorBoundary> <LoginPage /> </ErrorBoundary> ),
      },
      {
        path: ROUTE.FORGOTPASSWORD, // --
        element: (<ErrorBoundary> <ForgotPasswordPage /> </ErrorBoundary> ),
      },
      {
        path: ROUTE.REGISTRATION, // --
        element: (<ErrorBoundary> <RegisterPage /> </ErrorBoundary> ),
      },
      {
        path: ROUTE.RESETPASSWORD, // --
        element: (<ErrorBoundary> <ResetPasswordPage /> </ErrorBoundary> ),
      },
      {
        path: ROUTE.ADMIN + '/*', // --
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