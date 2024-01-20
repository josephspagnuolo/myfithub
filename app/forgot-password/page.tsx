export default function ForgotPassword() {
  return (
    <main className="flex grow items-center justify-center">
      <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-600 shadow-xl bg-[#292929]">
        <div className="flex flex-col items-center justify-center space-y-2 border-b border-gray-600 px-4 py-4 pt-5 text-center sm:px-16">
          <h3 className="text-xl font-semibold">Forgot Password</h3>
          <p className="text-sm text-gray-400">
            Enter your email address to reset your password
          </p>

        </div>
        <form className="flex flex-col space-y-3 px-4 py-5 sm:px-16">
          <div>
            <label
              htmlFor="email"
              className="block text-xs text-gray-400"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="mt-1 block w-full appearance-none rounded-md border border-gray-600 bg-[#191919] px-3 py-2 placeholder-gray-400 shadow-sm focus:border-gray-400 focus:outline-none focus:ring-black sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="border-black bg-sky-800 text-gray-300 hover:bg-sky-900 flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none"
          >
            <p>Submit</p>
          </button>
        </form>
      </div>
    </main>
  );
}
