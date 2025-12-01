import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="w-full max-w-md">
        <SignUp
          path="/sign-up"
          routing="path"
          signInUrl="/sign-in"
          redirectUrl="/dashboard"
          appearance={{
            baseTheme: undefined,
            variables: {
              colorPrimary: "hsl(189 94% 43%)", // cyan-500
            },
            elements: {
              formButtonPrimary: "bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500",
              card: "bg-gray-900 border border-cyan-500/20",
              headerTitle: "text-white",
              headerSubtitle: "text-gray-300",
              socialButtonsBlockButton: "bg-gray-800 border-gray-700 text-white hover:bg-gray-700",
              formFieldLabel: "text-gray-300",
              formFieldInput: "bg-gray-800 border-gray-700 text-white",
              footerActionLink: "text-cyan-400 hover:text-cyan-300",
              dividerLine: "bg-gray-700",
              dividerText: "text-gray-400",
            }
          }}
        />
      </div>
    </div>
  );
}
